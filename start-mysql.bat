@echo off
set MYSQL_BIN=C:\Program Files\MySQL\MySQL Server 8.4\bin
set MYSQL_DATA=C:\ProgramData\MySQL\MySQL Server 8.4\Data
tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I "mysqld.exe" >NUL
if %ERRORLEVEL%==0 (
    echo MySQL is already running.
    exit /b 0
)
start "" "%MYSQL_BIN%\mysqld.exe" --datadir="%MYSQL_DATA%"
echo MySQL started.
