declare interface Window {
  assApi: {
    xd: boolean,
  }
  filesystem: {
    readDir: (dir: string, callback: (err, files) => any) => string[];
    readFile: (file: string, callback: (err, idk) => any) => string;
    joinPath: (...segments: string[]) => string;
    send: (channel: string, ...args: any[]) => void;
    on: (channel: string, listener: (...args: any[]) => void) => void;
  };
  child_process: {
    spawn: {
      (command: string, options: any): any;
      (command: string, args: string[], options: any): any;
    }
  }
}