#!/usr/bin/env python3
"""Servidor local HTTP + SQLite para o Painel de Estudos IFG."""

from __future__ import annotations

import datetime as dt
import json
import os
import shutil
import sqlite3
import sys
import threading
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent

HOST = os.environ.get("IFG_HOST", "127.0.0.1")
PORT = int(os.environ.get("IFG_PORT", "8765"))
DB_PATH = Path(os.environ.get("IFG_DB_PATH", str(Path.home() / ".local/share/ifg-2026/estudos.db"))).expanduser()
HTML_PATH = Path(os.environ.get("IFG_HTML_PATH", str(PROJECT_DIR / "painel-aprovacao-ifg-2026.html"))).expanduser()
BACKUP_PATH = Path(os.environ.get("IFG_BACKUP_PATH", str(PROJECT_DIR / "dados/estudos-backup.db"))).expanduser()
STATIC_FILES = {
    "painel.css": "text/css; charset=utf-8",
    "agenda.js": "application/javascript; charset=utf-8",
    "agenda-data.js": "application/javascript; charset=utf-8",
    "biblioteca.js": "application/javascript; charset=utf-8",
    "edital-dados.js": "application/javascript; charset=utf-8",
    "8ff48c83-7e97-4366-9376-1205e69dbab6.pdf": "application/pdf",
}
DEFAULT_AGENDA = {"weeklyHours": 8, "weeklyQuestions": 30, "sessions": {}}

DB_LOCK = threading.RLock()
LAST_BACKUP_AT: str | None = None
LAST_BACKUP_ERROR: str | None = None

DEFAULT_SIM = {"esp": 16, "port": 8, "leg": 8, "rlm": 4, "inf": 5}
DEFAULT_IQ = {"pct": "0", "pre": False}
STARTER_ERRORS = [
    (
        "ex-1",
        "TI",
        "Backup Incremental vs Diferencial",
        "Confundir qual limpa o bit de arquivo (archive bit) e quantas fitas precisa no restore.",
        "Incremental LIMPA bit (restore = Full + TODOS incrementais); Diferencial NÃO limpa bit (restore = Full + ÚLTIMO diferencial).",
        0,
    ),
    (
        "ex-2",
        "LEG",
        "Lei 8.112/90 — Posse e Exercício",
        "Inverter os prazos de 15 e 30 dias.",
        "Posse = 30 dias da publicação (admite procuração); Exercício = 15 dias da posse (ato personalíssimo).",
        0,
    ),
]


def now_iso() -> str:
    return dt.datetime.now().astimezone().isoformat(timespec="seconds")


def get_conn() -> sqlite3.Connection:
    conn = sqlite3.connect(str(DB_PATH), timeout=30.0, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL;")
    conn.execute("PRAGMA synchronous=NORMAL;")
    conn.execute("PRAGMA foreign_keys=ON;")
    return conn


def perform_backup_locked(source_conn: sqlite3.Connection | None = None) -> tuple[bool, str | None]:
    global LAST_BACKUP_AT, LAST_BACKUP_ERROR
    ext4_tmp = DB_PATH.with_name(".estudos-backup.tmp.db")
    own_conn = False
    try:
        if source_conn is None:
            source_conn = get_conn()
            own_conn = True

        if ext4_tmp.exists():
            ext4_tmp.unlink()

        dest_conn = sqlite3.connect(str(ext4_tmp), timeout=30.0)
        try:
            source_conn.backup(dest_conn)
        finally:
            dest_conn.close()

        BACKUP_PATH.parent.mkdir(parents=True, exist_ok=True)
        win_tmp = BACKUP_PATH.with_name(BACKUP_PATH.name + ".tmp")
        shutil.copy2(ext4_tmp, win_tmp)
        os.replace(win_tmp, BACKUP_PATH)

        LAST_BACKUP_AT = now_iso()
        LAST_BACKUP_ERROR = None
        return True, None
    except Exception as exc:
        LAST_BACKUP_ERROR = str(exc)
        print(f"[WARN] Falha ao gerar backup em {BACKUP_PATH}: {exc}", file=sys.stderr)
        return False, str(exc)
    finally:
        if own_conn and source_conn is not None:
            source_conn.close()
        try:
            if ext4_tmp.exists():
                ext4_tmp.unlink()
        except OSError:
            pass


def init_db() -> None:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with DB_LOCK:
        if not DB_PATH.exists() and BACKUP_PATH.is_file():
            shutil.copyfile(BACKUP_PATH, DB_PATH)
        conn = get_conn()
        try:
            conn.executescript(
                """
                CREATE TABLE IF NOT EXISTS settings (
                    key TEXT PRIMARY KEY,
                    value TEXT NOT NULL,
                    updated_at TEXT NOT NULL
                );
                CREATE TABLE IF NOT EXISTS topic_progress (
                    topic_id TEXT PRIMARY KEY,
                    theory INTEGER NOT NULL DEFAULT 0,
                    r24 INTEGER NOT NULL DEFAULT 0,
                    r7 INTEGER NOT NULL DEFAULT 0,
                    r30 INTEGER NOT NULL DEFAULT 0,
                    q_total INTEGER NOT NULL DEFAULT 0,
                    q_right INTEGER NOT NULL DEFAULT 0,
                    updated_at TEXT NOT NULL
                );
                CREATE TABLE IF NOT EXISTS week_progress (
                    week_id INTEGER PRIMARY KEY,
                    done INTEGER NOT NULL DEFAULT 0,
                    updated_at TEXT NOT NULL
                );
                CREATE TABLE IF NOT EXISTS checklists (
                    kind TEXT NOT NULL,
                    item_id TEXT NOT NULL,
                    checked INTEGER NOT NULL DEFAULT 0,
                    updated_at TEXT NOT NULL,
                    PRIMARY KEY (kind, item_id)
                );
                CREATE TABLE IF NOT EXISTS cycle_state (
                    id INTEGER PRIMARY KEY CHECK (id = 1),
                    current_index INTEGER NOT NULL DEFAULT 0,
                    laps INTEGER NOT NULL DEFAULT 0,
                    total_hours REAL NOT NULL DEFAULT 0,
                    updated_at TEXT NOT NULL
                );
                CREATE TABLE IF NOT EXISTS study_sessions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    block_id INTEGER,
                    disc TEXT NOT NULL,
                    label TEXT NOT NULL,
                    hours REAL NOT NULL,
                    created_at TEXT NOT NULL
                );
                CREATE TABLE IF NOT EXISTS error_notebook (
                    id TEXT PRIMARY KEY,
                    disc TEXT NOT NULL,
                    topic TEXT NOT NULL,
                    mistake TEXT NOT NULL,
                    rule TEXT NOT NULL,
                    mastered INTEGER NOT NULL DEFAULT 0,
                    created_at TEXT NOT NULL,
                    updated_at TEXT NOT NULL
                );
                """
            )
            ts = now_iso()
            row = conn.execute("SELECT value FROM settings WHERE key = 'initialized'").fetchone()
            if row is None:
                conn.execute(
                    "INSERT OR IGNORE INTO cycle_state (id, current_index, laps, total_hours, updated_at) VALUES (1, 0, 0, 0.0, ?)",
                    (ts,),
                )
                for err_id, disc, topic, mistake, rule, mastered in STARTER_ERRORS:
                    conn.execute(
                        """
                        INSERT OR IGNORE INTO error_notebook (id, disc, topic, mistake, rule, mastered, created_at, updated_at)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                        """,
                        (err_id, disc, topic, mistake, rule, mastered, ts, ts),
                    )
                for k, v in (
                    ("theme", json.dumps("dark")),
                    ("expandAll", json.dumps(True)),
                    ("sim", json.dumps(DEFAULT_SIM)),
                    ("iq", json.dumps(DEFAULT_IQ)),
                    ("initialized", "1"),
                ):
                    conn.execute(
                        "INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, ?)",
                        (k, v, ts),
                    )
                conn.commit()
            else:
                conn.execute(
                    "INSERT OR IGNORE INTO cycle_state (id, current_index, laps, total_hours, updated_at) VALUES (1, 0, 0, 0.0, ?)",
                    (ts,),
                )
                conn.commit()

            perform_backup_locked(conn)
        finally:
            conn.close()


def fetch_sessions_locked(conn: sqlite3.Connection, limit: int = 30) -> list[dict]:
    rows = conn.execute(
        "SELECT id, block_id, disc, label, hours, created_at FROM study_sessions ORDER BY id DESC LIMIT ?",
        (limit,),
    ).fetchall()
    return [
        {
            "id": r["id"],
            "blockId": r["block_id"],
            "disc": r["disc"],
            "label": r["label"],
            "hours": r["hours"],
            "createdAt": r["created_at"],
        }
        for r in rows
    ]


def build_state_payload() -> dict:
    with DB_LOCK:
        conn = get_conn()
        try:
            settings_rows = conn.execute("SELECT key, value FROM settings").fetchall()
            settings_map = {r["key"]: r["value"] for r in settings_rows}

            def parse_setting(key: str, default):
                raw = settings_map.get(key)
                if raw is None:
                    return default
                try:
                    return json.loads(raw)
                except Exception:
                    return default

            topics = {}
            for r in conn.execute("SELECT * FROM topic_progress").fetchall():
                topics[r["topic_id"]] = {
                    "theory": bool(r["theory"]),
                    "r24": bool(r["r24"]),
                    "r7": bool(r["r7"]),
                    "r30": bool(r["r30"]),
                    "qTotal": int(r["q_total"]),
                    "qRight": int(r["q_right"]),
                }

            weeks = {}
            for r in conn.execute("SELECT week_id, done FROM week_progress").fetchall():
                weeks[str(r["week_id"])] = bool(r["done"])

            admin_chk = {}
            diad_chk = {}
            for r in conn.execute("SELECT kind, item_id, checked FROM checklists").fetchall():
                if r["kind"] == "admin":
                    admin_chk[r["item_id"]] = bool(r["checked"])
                elif r["kind"] == "diad":
                    diad_chk[r["item_id"]] = bool(r["checked"])

            c_row = conn.execute("SELECT current_index, laps, total_hours FROM cycle_state WHERE id = 1").fetchone()
            cycle = {
                "currentIndex": int(c_row["current_index"]) if c_row else 0,
                "laps": int(c_row["laps"]) if c_row else 0,
                "hours": float(c_row["total_hours"]) if c_row else 0.0,
            }

            errors = [
                {
                    "id": r["id"],
                    "disc": r["disc"],
                    "topic": r["topic"],
                    "mistake": r["mistake"],
                    "rule": r["rule"],
                    "mastered": bool(r["mastered"]),
                }
                for r in conn.execute(
                    "SELECT id, disc, topic, mistake, rule, mastered FROM error_notebook ORDER BY rowid ASC"
                ).fetchall()
            ]

            sessions = fetch_sessions_locked(conn)
            return {
                "theme": parse_setting("theme", "dark"),
                "agenda": parse_setting("agenda", DEFAULT_AGENDA),
                "expandAll": bool(parse_setting("expandAll", True)),
                "sim": parse_setting("sim", DEFAULT_SIM),
                "iq": parse_setting("iq", DEFAULT_IQ),
                "topics": topics,
                "weeks": weeks,
                "adminChk": admin_chk,
                "diadChk": diad_chk,
                "cycle": cycle,
                "errors": errors,
                "sessions": sessions,
            }
        finally:
            conn.close()


def write_cycle_state(conn: sqlite3.Connection, values: dict, ts: str) -> dict:
    cycle = {
        "currentIndex": max(0, int(values.get("currentIndex", 0) or 0)),
        "laps": max(0, int(values.get("laps", 0) or 0)),
        "hours": round(max(0.0, float(values.get("hours", 0.0) or 0.0)), 2),
    }
    conn.execute(
        """
        INSERT OR REPLACE INTO cycle_state (id, current_index, laps, total_hours, updated_at)
        VALUES (1, ?, ?, ?, ?)
        """,
        (cycle["currentIndex"], cycle["laps"], cycle["hours"], ts),
    )
    return cycle


def save_state_payload(payload: dict) -> dict:
    if not isinstance(payload, dict):
        raise ValueError("JSON raiz precisa ser um objeto.")

    ts = now_iso()
    theme = payload.get("theme", "dark")
    if theme not in ("dark", "light"):
        theme = "dark"
    expand_all = bool(payload.get("expandAll", True))

    sim_in = payload.get("sim") if isinstance(payload.get("sim"), dict) else {}
    sim = {
        "esp": max(0, min(20, int(sim_in.get("esp", DEFAULT_SIM["esp"])))),
        "port": max(0, min(10, int(sim_in.get("port", DEFAULT_SIM["port"])))),
        "leg": max(0, min(10, int(sim_in.get("leg", DEFAULT_SIM["leg"])))),
        "rlm": max(0, min(5, int(sim_in.get("rlm", DEFAULT_SIM["rlm"])))),
        "inf": max(0, min(5, int(sim_in.get("inf", DEFAULT_SIM["inf"])))),
    }

    iq_in = payload.get("iq") if isinstance(payload.get("iq"), dict) else {}
    iq = {
        "pct": str(iq_in.get("pct", "0")),
        "pre": bool(iq_in.get("pre", False)),
    }
    agenda_in = payload.get("agenda")
    agenda = agenda_in if isinstance(agenda_in, dict) else None

    topics_in = payload.get("topics") if isinstance(payload.get("topics"), dict) else {}
    weeks_in = payload.get("weeks") if isinstance(payload.get("weeks"), dict) else {}
    admin_in = payload.get("adminChk") if isinstance(payload.get("adminChk"), dict) else {}
    diad_in = payload.get("diadChk") if isinstance(payload.get("diadChk"), dict) else {}
    cycle_in = payload.get("cycle") if isinstance(payload.get("cycle"), dict) else {}
    errors_in = payload.get("errors") if isinstance(payload.get("errors"), list) else []

    with DB_LOCK:
        conn = get_conn()
        try:
            existing_created = {
                r["id"]: r["created_at"]
                for r in conn.execute("SELECT id, created_at FROM error_notebook").fetchall()
            }

            conn.execute("BEGIN IMMEDIATE;")
            for k, v in (
                ("theme", json.dumps(theme)),
                ("expandAll", json.dumps(expand_all)),
                ("sim", json.dumps(sim)),
                ("iq", json.dumps(iq)),
                ("initialized", "1"),
            ):
                conn.execute(
                    "INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, ?)",
                    (k, v, ts),
                )
            if agenda is not None:
                conn.execute(
                    "INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('agenda', ?, ?)",
                    (json.dumps(agenda, allow_nan=False), ts),
                )

            conn.execute("DELETE FROM topic_progress;")
            for tid, tval in topics_in.items():
                if not isinstance(tval, dict):
                    continue
                qt = max(0, int(tval.get("qTotal", 0) or 0))
                qr = min(qt, max(0, int(tval.get("qRight", 0) or 0)))
                conn.execute(
                    """
                    INSERT INTO topic_progress (topic_id, theory, r24, r7, r30, q_total, q_right, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        str(tid),
                        int(bool(tval.get("theory"))),
                        int(bool(tval.get("r24"))),
                        int(bool(tval.get("r7"))),
                        int(bool(tval.get("r30"))),
                        qt,
                        qr,
                        ts,
                    ),
                )

            conn.execute("DELETE FROM week_progress;")
            for wid, done in weeks_in.items():
                try:
                    wid_int = int(wid)
                except (TypeError, ValueError):
                    continue
                conn.execute(
                    "INSERT INTO week_progress (week_id, done, updated_at) VALUES (?, ?, ?)",
                    (wid_int, int(bool(done)), ts),
                )

            conn.execute("DELETE FROM checklists;")
            for kind, source in (("admin", admin_in), ("diad", diad_in)):
                for item_id, checked in source.items():
                    conn.execute(
                        "INSERT INTO checklists (kind, item_id, checked, updated_at) VALUES (?, ?, ?, ?)",
                        (kind, str(item_id), int(bool(checked)), ts),
                    )

            write_cycle_state(conn, cycle_in, ts)

            conn.execute("DELETE FROM error_notebook;")
            for item in errors_in:
                if not isinstance(item, dict):
                    continue
                eid = str(item.get("id") or f"e-{ts}")
                conn.execute(
                    """
                    INSERT INTO error_notebook (id, disc, topic, mistake, rule, mastered, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        eid,
                        str(item.get("disc", "TI")),
                        str(item.get("topic", "")),
                        str(item.get("mistake", "")),
                        str(item.get("rule", "")),
                        int(bool(item.get("mastered", False))),
                        existing_created.get(eid, ts),
                        ts,
                    ),
                )

            conn.commit()
            perform_backup_locked(conn)
            return {"ok": True, "savedAt": ts, "lastBackupAt": LAST_BACKUP_AT}
        except Exception:
            conn.rollback()
            raise
        finally:
            conn.close()


def add_session(payload: dict) -> dict:
    if not isinstance(payload, dict):
        raise ValueError("Payload inválido para sessão.")
    block_id = payload.get("blockId")
    disc = str(payload.get("disc", "TI")).strip() or "TI"
    label = str(payload.get("label", "Bloco de Estudo")).strip() or "Bloco de Estudo"
    hours = round(max(0.0, float(payload.get("hours", 0.0) or 0.0)), 2)
    cycle_in = payload.get("cycle")
    ts = now_iso()

    with DB_LOCK:
        conn = get_conn()
        try:
            conn.execute("BEGIN IMMEDIATE;")
            conn.execute(
                "INSERT INTO study_sessions (block_id, disc, label, hours, created_at) VALUES (?, ?, ?, ?, ?)",
                (int(block_id) if block_id is not None else None, disc, label, hours, ts),
            )
            cycle = write_cycle_state(conn, cycle_in, ts) if isinstance(cycle_in, dict) else None
            conn.commit()
            perform_backup_locked(conn)
            sessions = fetch_sessions_locked(conn)
            return {"ok": True, "sessions": sessions, "cycle": cycle, "lastBackupAt": LAST_BACKUP_AT}
        except Exception:
            conn.rollback()
            raise
        finally:
            conn.close()


def reset_state() -> dict:
    ts = now_iso()
    with DB_LOCK:
        conn = get_conn()
        try:
            conn.execute("BEGIN IMMEDIATE;")
            for tbl in ("topic_progress", "week_progress", "checklists", "study_sessions", "error_notebook"):
                conn.execute(f"DELETE FROM {tbl};")
            conn.execute(
                "INSERT OR REPLACE INTO cycle_state (id, current_index, laps, total_hours, updated_at) VALUES (1, 0, 0, 0.0, ?)",
                (ts,),
            )
            conn.execute("DELETE FROM settings;")
            for k, v in (
                ("theme", json.dumps("dark")),
                ("expandAll", json.dumps(True)),
                ("sim", json.dumps(DEFAULT_SIM)),
                ("iq", json.dumps(DEFAULT_IQ)),
                ("initialized", "1"),
            ):
                conn.execute(
                    "INSERT INTO settings (key, value, updated_at) VALUES (?, ?, ?)",
                    (k, v, ts),
                )
            conn.commit()
            perform_backup_locked(conn)
            return {"ok": True, "resetAt": ts, "lastBackupAt": LAST_BACKUP_AT}
        except Exception:
            conn.rollback()
            raise
        finally:
            conn.close()


def get_health_payload() -> dict:
    with DB_LOCK:
        conn = get_conn()
        try:
            sessions_count = conn.execute("SELECT COUNT(*) FROM study_sessions").fetchone()[0]
            topics_saved = conn.execute("SELECT COUNT(*) FROM topic_progress WHERE theory = 1").fetchone()[0]
            errors_count = conn.execute("SELECT COUNT(*) FROM error_notebook").fetchone()[0]
        finally:
            conn.close()

        backup_exists = BACKUP_PATH.exists()
        backup_bytes = BACKUP_PATH.stat().st_size if backup_exists else 0
        return {
            "ok": True,
            "dashboard": "ifg-401",
            "engine": f"SQLite {sqlite3.sqlite_version}",
            "dbPath": str(DB_PATH),
            "backupPath": str(BACKUP_PATH),
            "backupExists": backup_exists,
            "backupBytes": backup_bytes,
            "lastBackupAt": LAST_BACKUP_AT,
            "lastBackupError": LAST_BACKUP_ERROR,
            "sessionsCount": sessions_count,
            "topicsSaved": topics_saved,
            "errorsCount": errors_count,
        }


class PainelHandler(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def log_message(self, format: str, *args) -> None:
        return

    def _send_bytes(self, status: int, content_type: str, data: bytes) -> None:
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(data)

    def _send_json(self, status: int, obj: dict) -> None:
        raw = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self._send_bytes(status, "application/json; charset=utf-8", raw)

    def _read_json_body(self) -> dict:
        length = int(self.headers.get("Content-Length", "0") or "0")
        if length <= 0:
            raise ValueError("Corpo da requisição vazio.")
        if length > 5 * 1024 * 1024:
            raise ValueError("Payload excede o limite de 5 MB.")
        raw = self.rfile.read(length)
        return json.loads(raw.decode("utf-8"))

    def do_GET(self) -> None:
        path = unquote(urlparse(self.path).path)
        try:
            if path in ("/", "/index.html"):
                if not HTML_PATH.exists():
                    self._send_json(HTTPStatus.NOT_FOUND, {"ok": False, "error": f"HTML não encontrado: {HTML_PATH}"})
                    return
                data = HTML_PATH.read_bytes()
                self._send_bytes(HTTPStatus.OK, "text/html; charset=utf-8", data)
                return
            name = path.lstrip("/")
            content_type = STATIC_FILES.get(name)
            directory = HTML_PATH.parent
            if not content_type and name.startswith("Aulas- Gran Cursos/") and name.endswith(".pdf"):
                directory = directory / "Aulas- Gran Cursos"
                name = name.removeprefix("Aulas- Gran Cursos/")
                content_type = "application/pdf"
            if content_type:
                file_path = (directory / name).resolve()
                if file_path.is_relative_to(directory.resolve()) and file_path.is_file():
                    self._send_bytes(HTTPStatus.OK, content_type, file_path.read_bytes())
                    return
            if path == "/api/health":
                self._send_json(HTTPStatus.OK, get_health_payload())
                return
            if path == "/api/state":
                self._send_json(HTTPStatus.OK, build_state_payload())
                return
            self._send_json(HTTPStatus.NOT_FOUND, {"ok": False, "error": "Rota não encontrada."})
        except Exception as exc:
            self._send_json(HTTPStatus.INTERNAL_SERVER_ERROR, {"ok": False, "error": str(exc)})

    def do_PUT(self) -> None:
        path = urlparse(self.path).path
        if path != "/api/state":
            self._send_json(HTTPStatus.NOT_FOUND, {"ok": False, "error": "Rota não encontrada."})
            return
        try:
            body = self._read_json_body()
            result = save_state_payload(body)
            self._send_json(HTTPStatus.OK, result)
        except (ValueError, json.JSONDecodeError) as exc:
            self._send_json(HTTPStatus.BAD_REQUEST, {"ok": False, "error": str(exc)})
        except Exception as exc:
            self._send_json(HTTPStatus.INTERNAL_SERVER_ERROR, {"ok": False, "error": str(exc)})

    def do_POST(self) -> None:
        path = urlparse(self.path).path
        try:
            if path == "/api/sessions":
                body = self._read_json_body()
                result = add_session(body)
                self._send_json(HTTPStatus.CREATED, result)
                return
            if path == "/api/backup":
                with DB_LOCK:
                    ok, err = perform_backup_locked()
                if not ok:
                    self._send_json(HTTPStatus.INTERNAL_SERVER_ERROR, {"ok": False, "error": err})
                    return
                self._send_json(HTTPStatus.OK, get_health_payload())
                return
            self._send_json(HTTPStatus.NOT_FOUND, {"ok": False, "error": "Rota não encontrada."})
        except (ValueError, json.JSONDecodeError) as exc:
            self._send_json(HTTPStatus.BAD_REQUEST, {"ok": False, "error": str(exc)})
        except Exception as exc:
            self._send_json(HTTPStatus.INTERNAL_SERVER_ERROR, {"ok": False, "error": str(exc)})

    def do_DELETE(self) -> None:
        path = urlparse(self.path).path
        if path != "/api/state":
            self._send_json(HTTPStatus.NOT_FOUND, {"ok": False, "error": "Rota não encontrada."})
            return
        try:
            result = reset_state()
            self._send_json(HTTPStatus.OK, result)
        except Exception as exc:
            self._send_json(HTTPStatus.INTERNAL_SERVER_ERROR, {"ok": False, "error": str(exc)})


def main() -> None:
    with ThreadingHTTPServer((HOST, PORT), PainelHandler) as server:
        init_db()
        print(f"Painel IFG 2026 ativo em http://{HOST}:{PORT} | DB: {DB_PATH} | Backup: {BACKUP_PATH}", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()

