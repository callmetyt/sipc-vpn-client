export interface ElectronExposeApi {
  ipcRenderer: IpcRendererExposeApi;
}

interface IpcRendererExposeApi {
  on: (channel: IpcChannels, func: (args: any[]) => void) => void;
  once: (channel: IpcChannels, func: (args: any[]) => void) => void;
  myPing: () => void;
  shellCmd: () => void;
}

type IpcChannels = 'ipc-example' | 'shell-cmd';
