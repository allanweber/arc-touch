# ArcTouch Challenge Project

## Runnning with ionic serve command

To run properly with ionic serve command, uncomment the line **translate.use('en-US');** in the **app.component.ts** file. This is a workaroud to cordova running with ionic serve.

## To simulate with the browser run:

**ionic cordova platform add browser**

and run it:

**ionic cordova run browser**

## Generate APK

keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name

<Android Instalation Folder>\build-tools\28.0.3\zipalign -v 4 app-release-unsigned.apk Movies.apk
