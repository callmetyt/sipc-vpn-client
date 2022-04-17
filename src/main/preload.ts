import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { IpcChannelsList, IpcContextBridgeApi } from 'renderer/preload';

const validChannels: IpcChannelsList[] = [
  'vpn-open',
  'vpn-close',
  'ipc-example',
];

const ipcContentBridgeApi: IpcContextBridgeApi = {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    vpnOpen() {
      ipcRenderer.send('vpn-open');
    },
    vpnClose() {
      ipcRenderer.send('vpn-close');
    },
    on(channel, func) {
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
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (_event, ...args) => func(...args));
      }
    },
  },
};

contextBridge.exposeInMainWorld('electron', ipcContentBridgeApi);
