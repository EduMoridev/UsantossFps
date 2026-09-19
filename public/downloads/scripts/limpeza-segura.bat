@echo off
REM @titulo: Limpeza segura de temporários
REM @categoria: limpeza
REM @descricao: Remove arquivos temporários do usuário e do Windows, esvazia a Lixeira e limpa componentes substituídos do sistema. Ação irreversível: nenhum desses itens volta depois de removido.
REM @admin: sim
REM @reversivel: nao
REM @tempo: 1-5min
REM @arquivogithub: Limpeza_Segura.bat
chcp 65001 >nul
setlocal EnableExtensions
title Santos FPS - Ferramenta Segura

net session >nul 2>&1
if errorlevel 1 (
  echo [ERRO] Execute como administrador.
  pause
  exit /b 1
)

echo.
echo Esta limpeza remove temporários desbloqueados, esvazia a Lixeira
echo e executa a limpeza segura de componentes do Windows.
echo Ela NÃO apaga Prefetch, logs de eventos, Windows Update ou navegadores.
echo.
choice /c SN /n /m "Continuar? [S/N]: "
if errorlevel 2 exit /b 0

echo.
echo [1/3] Limpando temporários do usuário...
del /f /s /q "%TEMP%\*" >nul 2>&1
for /d %%D in ("%TEMP%\*") do rd /s /q "%%D" >nul 2>&1

echo [2/3] Limpando temporários do Windows...
del /f /s /q "%WINDIR%\Temp\*" >nul 2>&1
for /d %%D in ("%WINDIR%\Temp\*") do rd /s /q "%%D" >nul 2>&1
powershell -NoProfile -Command "Clear-RecycleBin -Force -ErrorAction SilentlyContinue"

echo [3/3] Limpando componentes substituídos do Windows...
DISM.exe /Online /Cleanup-Image /StartComponentCleanup

echo.
echo Limpeza concluída. Arquivos em uso foram ignorados automaticamente.
pause
