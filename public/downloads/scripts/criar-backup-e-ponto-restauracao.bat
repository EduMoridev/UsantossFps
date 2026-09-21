@echo off
REM @titulo: Criar backup e ponto de restauração
REM @categoria: manutencao
REM @descricao: Exporta chaves do Registro (Explorer, Temas, GameDVR, GameConfigStore, Políticas) para .reg na Área de Trabalho e tenta criar um ponto de restauração do sistema antes de qualquer ajuste.
REM @admin: sim
REM @reversivel: sim
REM @tempo: 1-3min
REM @arquivogithub: Criar_Backup_e_Ponto_Restauracao.bat
chcp 65001 >nul
setlocal EnableExtensions
title Santos FPS - Ferramenta Segura

net session >nul 2>&1
if errorlevel 1 (
  echo.
  echo [ERRO] Clique com o botão direito e escolha "Executar como administrador".
  pause
  exit /b 1
)

for /f "usebackq delims=" %%D in (`powershell -NoProfile -Command "[Environment]::GetFolderPath('Desktop')"`) do set "DESKTOP=%%D"
for /f %%T in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd_HHmmss"') do set "TS=%%T"
set "DEST=%DESKTOP%\Backup_SantosFPS_%TS%"
mkdir "%DEST%" >nul 2>&1

echo Criando exportações do Registro...
reg export "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer" "%DEST%\HKCU_Explorer.reg" /y >nul 2>&1
reg export "HKCU\Software\Microsoft\Windows\CurrentVersion\Themes" "%DEST%\HKCU_Themes.reg" /y >nul 2>&1
reg export "HKCU\Software\Microsoft\Windows\CurrentVersion\GameDVR" "%DEST%\HKCU_GameDVR.reg" /y >nul 2>&1
reg export "HKCU\System\GameConfigStore" "%DEST%\HKCU_GameConfigStore.reg" /y >nul 2>&1
reg export "HKLM\SOFTWARE\Policies\Microsoft\Windows" "%DEST%\HKLM_Policies_Windows.reg" /y >nul 2>&1

echo Tentando criar ponto de restauração...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
 "try { Enable-ComputerRestore -Drive ($env:SystemDrive + '\') -ErrorAction SilentlyContinue; Checkpoint-Computer -Description 'Antes_Tweaks_SantosFPS' -RestorePointType 'MODIFY_SETTINGS' -ErrorAction Stop; 'Ponto de restauração criado.' } catch { 'Não foi possível criar o ponto de restauração. As exportações do Registro foram mantidas.' }"

echo.
echo Backup salvo em:
echo %DEST%
pause
