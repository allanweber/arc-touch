# ArcTouch Challenge Project

##After clone this project, install and run ionic projects:
Install ionic: **npm install -g ionic**

Download packages: **npm i**

Run: **ionic serve**

## Runnning with ionic serve command

To run properly with ionic serve command, uncomment the line **translate.use('en-US');** in the **app.component.ts** file. This is a workaroud to cordova running with ionic serve.

## To simulate with the browser run:

**ionic cordova platform add browser**

and run it:

**ionic cordova run browser**

## Generate APK

Build app: **ionic cordova build android --prod --release**

Go to the build folder to be easier to run the next commands: **navigate to the APK folder resulted from que previous command**

This should me runned only the first time to create a certificate to sign the APK : **keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000**

To sign the unsigned APK: **jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name**

Finally, the zip align tool must be ran to optimize the APK : **<Android Instalation Folder>\build-tools\28.0.3\zipalign -v 4 app-release-unsigned.apk Movies.apk**'

**All this tools should be available, or you must install the enviroment for windows: https://ionicframework.com/docs/v3/developer-resources/platform-setup/windows-setup.html**
