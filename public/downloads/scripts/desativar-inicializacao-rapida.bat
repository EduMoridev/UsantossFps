@echo off
REM @titulo: Desativar inicialização rápida
REM @categoria: energia
REM @descricao: Desliga a Inicialização Rápida do Windows (HiberbootEnabled) mantendo a hibernação disponível.
REM @admin: sim
REM @reversivel: sim
REM @tempo: 5s
REM @arquivogithub: Desativar_Inicializacao_Rapida.bat
chcp 65001 >nul
setlocal EnableExtensions
title Santos FPS - Ferramenta Segura

net session >nul 2>&1
if errorlevel 1 (
  echo [ERRO] Execute como administrador.
  pause
  exit /b 1
)

reg add "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Power" /v HiberbootEnabled /t REG_DWORD /d 0 /f >nul
echo Inicialização Rápida desativada.
echo A hibernação foi mantida disponível.
pause
