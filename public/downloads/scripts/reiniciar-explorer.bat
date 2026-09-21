@echo off
REM @titulo: Reiniciar o Windows Explorer
REM @categoria: manutencao
REM @descricao: Encerra e reinicia o processo explorer.exe para resolver travamentos de área de trabalho, barra de tarefas ou ícones sem precisar reiniciar o PC.
REM @admin: nao
REM @reversivel: sim
REM @tempo: 5s
REM @arquivogithub: Reiniciar_Explorer.bat
chcp 65001 >nul
setlocal EnableExtensions
title Santos FPS - Ferramenta Segura

echo Reiniciando o Windows Explorer...
taskkill /f /im explorer.exe >nul 2>&1
timeout /t 2 /nobreak >nul
start explorer.exe
echo Concluído.
timeout /t 2 /nobreak >nul
