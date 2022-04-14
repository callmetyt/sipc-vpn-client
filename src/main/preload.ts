import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { IpcChannelsList, IpcContextBridgeApi } from 'renderer/preload';

const ipcContentBridgeApi: IpcContextBridgeApi = {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    shellCmd() {
      ipcRenderer.send('shell-cmd');
    },
    on(channel, func) {
      const validChannels: IpcChannelsList[] = ['ipc-example', 'shell-cmd'];
      if (validChannels.includes(channel)) {
        const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
          func(...args);
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, subscription);

        return () => ipcRenderer.removeListener(channel, subscription);
      }

      return undefined;
    },
    once(channel, func) {
      const validChannels: IpcChannelsList[] = ['ipc-example', 'shell-cmd'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (_event, ...args) => func(...args));
      }
    },
  },
};

contextBridge.exposeInMainWorld('electron', ipcContentBridgeApi);
