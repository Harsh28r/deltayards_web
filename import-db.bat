@echo off
REM Import production MySQL dump from cPanel/phpMyAdmin export
REM Usage: import-db.bat path\to\backup.sql

set MYSQL_BIN=C:\Program Files\MySQL\MySQL Server 8.4\bin
set DB=deltayar_ds
set USER=deltayar_ds
set PASS=DeltaNew@975

if "%~1"=="" (
    echo Usage: import-db.bat your_backup.sql
    exit /b 1
)

call "%~dp0start-mysql.bat"
"%MYSQL_BIN%\mysql.exe" -u %USER% -p%PASS% %DB% < "%~1"
echo Import finished. Restart Django and refresh the site.
