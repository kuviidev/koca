// See the Electron documentation for details on how to use preload scripts:

import { contextBridge } from "electron";
import { readdir, readFile } from 'fs';
import { join } from "path";
import { spawn } from "child_process";
import { promisify } from "util";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
contextBridge.exposeInMainWorld('filesystem', {
    readDir: (path, callback) => readdir(path, callback),
    readFile: (path, callback) => readFile(path, 'utf-8', callback),
    joinPath: (...segments: string[]) => join(...segments),
});

contextBridge.exposeInMainWorld('util', {
    promisify: (fn) => promisify(fn),
});

contextBridge.exposeInMainWorld('child_process', {
    spawn: (command, options) => spawn(command, options),
})