import { useState } from 'react';

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
              window.electron.ipcRenderer.on('shell-cmd', (args) => {
                console.log(args);
                setCmdRes(''.concat(...args));
              });
              window.electron.ipcRenderer.shellCmd();
            }}
          >
            shell cmd test
          </button>
        </div>

        <div className="divide" />

        <div className="setting">
          <span>时长</span>
          <span>模式</span>
          <span>当前服务器</span>
        </div>
      </div>
      <div className="tmp">{cmdRes}</div>
    </>
  );
};
