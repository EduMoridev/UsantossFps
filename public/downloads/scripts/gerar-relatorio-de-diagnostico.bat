@echo off
REM @titulo: Gerar relatório de diagnóstico do PC
REM @categoria: diagnostico
REM @descricao: Reúne informações do sistema, drivers, DirectX e relatórios de energia (incluindo bateria) em uma pasta na Área de Trabalho. Não altera nada, só lê e salva relatórios.
REM @admin: sim
REM @reversivel: sim
REM @tempo: 2min
REM @arquivogithub: Gerar_Relatorio_de_Diagnostico.bat
chcp 65001 >nul
setlocal EnableExtensions
title Santos FPS - Ferramenta Segura

net session >nul 2>&1
if errorlevel 1 (
  echo [ERRO] Execute como administrador.
  pause
  exit /b 1
)

for /f "usebackq delims=" %%D in (`powershell -NoProfile -Command "[Environment]::GetFolderPath('Desktop')"`) do set "DESKTOP=%%D"
for /f %%T in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd_HHmmss"') do set "TS=%%T"
set "DEST=%DESKTOP%\Relatorio_PC_%TS%"
mkdir "%DEST%" >nul 2>&1

echo [1/6] Informações do sistema...
systeminfo > "%DEST%\systeminfo.txt"
msinfo32.exe /report "%DEST%\msinfo32.txt"

echo [2/6] Drivers instalados...
driverquery.exe /v /fo csv > "%DEST%\driverquery.csv"
pnputil.exe /enum-drivers > "%DEST%\drivers_pnputil.txt"

echo [3/6] Diagnóstico DirectX...
dxdiag.exe /whql:off /t "%DEST%\dxdiag.txt"

echo [4/6] Planos de energia...
powercfg.exe /list > "%DEST%\planos_energia.txt"
powercfg.exe /requests > "%DEST%\solicitacoes_energia.txt"

echo [5/6] Relatório de energia por 60 segundos...
powercfg.exe /energy /duration 60 /output "%DEST%\energy-report.html"

echo [6/6] Relatório de bateria, quando compatível...
powercfg.exe /batteryreport /output "%DEST%\battery-report.html" >nul 2>&1

echo.
echo Relatórios salvos em:
echo %DEST%
start "" "%DEST%"
pause
