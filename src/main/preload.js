const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    shellCmd() {
      ipcRenderer.send('shell-cmd');
    },
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel, func) {
      const validChannels = ['ipc-example', 'shell-cmd'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (_event, ...args) => {
          func(...args);
        });
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example', 'shell-cmd'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (_event, ...args) => {
          func(...args);
        });
      }
    },
  },
});
