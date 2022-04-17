import { useState } from 'react';
import Switch from 'renderer/components/Switch';

import './index.scss';

export default () => {
  const [cmdRes, setCmdRes] = useState('');

  return (
    <>
      <div className="mainContent">
        <div className="action">
          <span>VPN 网络</span>
          <button
            type="button"
            onClick={() => {
              window.electron.ipcRenderer.on('vpn-open', (args) => {
                console.log(args);
                setCmdRes(args as string);
              });
              window.electron.ipcRenderer.vpnOpen();
            }}
          >
            vpn open
          </button>
          <button
            type="button"
            onClick={() => {
              window.electron.ipcRenderer.on('vpn-close', (args) => {
                console.log(args);
                setCmdRes(args as string);
              });
              window.electron.ipcRenderer.vpnClose();
            }}
          >
            vpn close
          </button>

          <Switch
            onOpen={async () => {
              console.log('open switching...');
              await new Promise<void>((resolve) => {
                setTimeout(() => {
                  resolve();
                }, 2000);
              });
              console.log('open end');
            }}
            onClose={async () => {
              console.log('close switching...');
              console.log('close end');
            }}
          />
        </div>

        <div className="divide" />

        <div className="setting">
          <span>时长：</span>
          <span>11:22:01</span>
        </div>
      </div>

      <div className="tmp">{cmdRes}</div>
    </>
  );
};
