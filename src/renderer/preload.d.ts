declare global {
  interface Window {
    electron: IpcContextBridgeApi;
  }
}

export interface IpcContextBridgeApi {
  ipcRenderer: {
    myPing(): void;
    vpnOpen(): void;
    vpnClose(): void;
    on(
      channel: IpcChannelsList,
      func: (...args: unknown[]) => void
    ): (() => void) | undefined;
    once(channel: IpcChannelsList, func: (...args: unknown[]) => void): void;
  };
}

export type IpcChannelsList = 'vpn-open' | 'vpn-close' | 'ipc-example';
