// imports
import * as vscode from "vscode";
import { platform as osPlatform } from 'os';
// constants
export const appName = "coderadio";
 

// functions
/**
 * Searches for the vlc path according to the OS and overrides the default path with the "vlc_path" variable.
 * @returns The path of the vlc media player
 */
export function getMediaPlayer() {
    let vlcPath = "";
    if (osPlatform().startsWith('win')) {
        vlcPath = "C:\\Program Files\\VideoLAN\\VLC\\vlc.exe"; //win
    } else if (osPlatform().startsWith('darwin')) {
        vlcPath = "/Applications/VLC.app/Contents/MacOS/VLC"; //mac
    } else {
        vlcPath = "/snap/bin/vlc"; //linux
    }
    return vscode.workspace.getConfiguration(appName).get("vlc_path") || vlcPath;
}