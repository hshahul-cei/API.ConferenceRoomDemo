@echo off
echo Manual Build Start
"C:\Program Files\Microsoft Visual Studio\18\Insiders\MSBuild\Current\Bin\MSBuild.exe" "..\API.ConferenceRoom.sln" /t:Build /p:Configuration=Debug
echo Manual Build End
