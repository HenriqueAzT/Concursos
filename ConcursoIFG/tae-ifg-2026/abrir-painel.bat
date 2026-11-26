@echo off
setlocal
set "IFG_PANEL_ROOT=%~dp0"
if not defined IFG_DB_PATH set "IFG_DB_PATH=%LOCALAPPDATA%\PainelIFG\estudos.db"
if not defined IFG_PORT set "IFG_PORT=8765"

powershell -NoProfile -Command "$panelUrl = 'http://127.0.0.1:' + $env:IFG_PORT; function Test-Panel { try { (Invoke-RestMethod -Uri ($panelUrl + '/api/health') -TimeoutSec 1).dashboard -eq 'ifg-401' } catch { $false } }; if (Test-Panel) { Start-Process $panelUrl; exit 0 }; $runtime = Get-Command python.exe -ErrorAction SilentlyContinue; if (-not $runtime) { $runtime = Get-Command py.exe -ErrorAction SilentlyContinue }; if ($runtime) { $entry = Join-Path $env:IFG_PANEL_ROOT 'backend\server.py'; try { Start-Process -FilePath $runtime.Source -ArgumentList ([char]34 + $entry + [char]34) -WindowStyle Hidden; for ($attempt = 0; $attempt -lt 8; $attempt++) { if (Test-Panel) { Start-Process $panelUrl; exit 0 }; Start-Sleep -Milliseconds 250 } } catch {} }; exit 1"
if errorlevel 1 start "" "%~dp0painel-aprovacao-ifg-2026.html"
endlocal

