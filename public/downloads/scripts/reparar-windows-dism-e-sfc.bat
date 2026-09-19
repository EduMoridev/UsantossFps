@echo off
REM @titulo: Reparar Windows com DISM e SFC
REM @categoria: manutencao
REM @descricao: Roda DISM /RestoreHealth seguido de sfc /scannow para reparar a imagem do sistema e os arquivos protegidos do Windows. Pode precisar de internet se a imagem local estiver corrompida.
REM @admin: sim
REM @reversivel: sim
REM @tempo: 10-30min
REM @arquivogithub: Reparar_Windows_DISM_e_SFC.bat
chcp 65001 >nul
setlocal EnableExtensions
title Santos FPS - Ferramenta Segura

net session >nul 2>&1
if errorlevel 1 (
  echo [ERRO] Execute como administrador.
  pause
  exit /b 1
)

echo O processo pode demorar e precisa de internet caso o DISM precise baixar arquivos.
echo.
echo [1/2] Reparando a imagem do Windows com DISM...
DISM.exe /Online /Cleanup-Image /RestoreHealth
set "DISM_RESULT=%ERRORLEVEL%"

echo.
echo [2/2] Verificando arquivos protegidos com SFC...
sfc /scannow
set "SFC_RESULT=%ERRORLEVEL%"

echo.
echo Código DISM: %DISM_RESULT%
echo Código SFC:  %SFC_RESULT%
echo Consulte também: C:\Windows\Logs\DISM\dism.log e C:\Windows\Logs\CBS\CBS.log
pause
