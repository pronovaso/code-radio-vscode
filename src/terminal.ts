// imports
import { platform as osPlatform } from 'os';
import * as vscode from "vscode";
import { appName, getMediaPlayer } from './utilities';

// constants
const windowsTerminal = "C:\\Windows\\System32\\cmd.exe";
const linuxTerminal = "/bin/bash";
const codeRadioUrl = "https://coderadio-admin.freecodecamp.org/radio/8010/radio.mp3";
const startCommand = `"${getMediaPlayer()}" "${codeRadioUrl}" --intf dummy`;
// variables
let terminal: vscode.Terminal;

// functions
/**
 * Starts the terminal and plays the radio.
 */
export async function startTerminal() {
  terminal?.dispose(); // if there is a running instance
  terminal = vscode.window.createTerminal({
    shellPath: osPlatform().includes('win') ? windowsTerminal : linuxTerminal,
    name: appName,
    hideFromUser: true
  });
  terminal.sendText(startCommand);
  if (osPlatform().includes('win')) {
    setTimeout(() => terminal.dispose(), 3000); // it's not necessary to keep the terminal open in windows
  }
}

/**
 * Stops the terminal and the radio.
 */
export function stopTerminal() {
  terminal?.dispose();
  // for some reason, dispose in windows doesnt kill its child processes
  // so we manually kill vlc with taskkill command
  let shellPath, killCmd;
  if (osPlatform().includes('win')) {
    shellPath = windowsTerminal;
    killCmd = 'taskkill /im "vlc.exe" /f';
  } else { // mac/linux
    shellPath = linuxTerminal;
    killCmd = 'kill -9 $(pgrep -n vlc)';
  }
  terminal = vscode.window.createTerminal({
    shellPath: shellPath,
    name: appName,
    hideFromUser: true
  });
  terminal.sendText(killCmd);
  if (osPlatform().includes('win')) {
    setTimeout(() => terminal.dispose(), 3000); // it's not necessary to keep the terminal open in windows
  }
}