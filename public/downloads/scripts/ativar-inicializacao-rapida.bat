@echo off
REM @titulo: Ativar inicialização rápida
REM @categoria: energia
REM @descricao: Liga a hibernação e ativa a Inicialização Rápida do Windows (HiberbootEnabled) para reduzir o tempo de boot.
REM @admin: sim
REM @reversivel: sim
REM @tempo: 5s
REM @arquivogithub: Ativar_Inicializacao_Rapida.bat
chcp 65001 >nul
setlocal EnableExtensions
title Santos FPS - Ferramenta Segura

net session >nul 2>&1
if errorlevel 1 (
  echo [ERRO] Execute como administrador.
  pause
  exit /b 1
)

powercfg.exe /hibernate on
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Power" /v HiberbootEnabled /t REG_DWORD /d 1 /f >nul
echo Inicialização Rápida ativada.
echo Observação: ela pode não ser adequada para dual boot ou certos problemas de driver.
pause
