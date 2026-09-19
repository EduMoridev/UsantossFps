@echo off
REM @titulo: Voltar ao plano de energia equilibrado
REM @categoria: energia
REM @descricao: Troca o plano de energia ativo do Windows de volta para o plano nativo Equilibrado.
REM @admin: sim
REM @reversivel: sim
REM @tempo: 5s
REM @arquivogithub: Voltar_Plano_Equilibrado.bat
chcp 65001 >nul
setlocal EnableExtensions
title Santos FPS - Ferramenta Segura

net session >nul 2>&1
if errorlevel 1 (
  echo [ERRO] Execute como administrador.
  pause
  exit /b 1
)

powercfg.exe /setactive SCHEME_BALANCED
if errorlevel 1 (
  echo Não foi possível ativar o plano Equilibrado.
) else (
  echo Plano Equilibrado ativado.
)
pause
