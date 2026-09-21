@echo off
REM @titulo: Ativar plano de energia de alto desempenho
REM @categoria: energia
REM @descricao: Troca o plano de energia ativo do Windows para o plano nativo Alto Desempenho.
REM @admin: sim
REM @reversivel: sim
REM @tempo: 5s
REM @arquivogithub: Ativar_Plano_Alto_Desempenho.bat
chcp 65001 >nul
setlocal EnableExtensions
title Santos FPS - Ferramenta Segura

net session >nul 2>&1
if errorlevel 1 (
  echo [ERRO] Execute como administrador.
  pause
  exit /b 1
)

powercfg.exe /setactive SCHEME_MIN
if errorlevel 1 (
  echo Não foi possível ativar o plano Alto Desempenho neste dispositivo.
) else (
  echo Plano Alto Desempenho ativado.
  echo Em notebook, isso pode aumentar consumo, temperatura e ruído.
)
pause
