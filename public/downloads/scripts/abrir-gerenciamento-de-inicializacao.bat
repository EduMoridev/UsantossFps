@echo off
REM @titulo: Abrir gerenciamento de inicialização
REM @categoria: manutencao
REM @descricao: Abre as telas nativas do Windows para revisar programas de inicialização (Configurações, Gerenciador de Tarefas e pastas de Inicialização). Não altera nada sozinho.
REM @admin: nao
REM @reversivel: sim
REM @tempo: 10s
REM @arquivogithub: Abrir_Gerenciamento_de_Inicializacao.bat
chcp 65001 >nul
setlocal EnableExtensions
title Santos FPS - Ferramenta Segura

echo Abrindo os locais seguros para revisar a inicialização...
start "" ms-settings:startupapps
start "" taskmgr.exe
start "" explorer.exe "shell:startup"
start "" explorer.exe "shell:common startup"
echo.
echo Desative somente programas que você reconhece.
echo Não desative antivírus, drivers, áudio, touchpad ou utilitários essenciais.
pause
