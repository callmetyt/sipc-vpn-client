declare global {
  interface Window {
    electron: IpcContextBridgeApi;
  }
}

export interface IpcContextBridgeApi {
  ipcRenderer: {
    myPing(): void;
    shellCmd(): void;
    on(
      channel: IpcChannelsList,
      func: (...args: unknown[]) => void
    ): (() => void) | undefined;
    once(channel: IpcChannelsList, func: (...args: unknown[]) => void): void;
  };
}

export type IpcChannelsList = 'shell-cmd' | 'ipc-example';
