import { useState } from 'react';
import Switch from 'renderer/components/Switch';

import styles from './index.module.scss';

const vpnOpenSuccessFlag = 'Initialization Sequence Completed';
const vpnOpenTimeLimit = 30000; // 30秒开启时限

export default () => {
  const [cmdRes, setCmdRes] = useState('');

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.action}>
          <span>VPN 网络</span>

          <Switch
            onOpen={() => {
              return new Promise((resolve) => {
                // 超时后去关闭vpn
                const vpnOpenFlaseFlag = setTimeout(() => {
                  console.log('vpn开启超时');
                  setCmdRes('vpn开启超时!');
                  resolve(false);
                }, vpnOpenTimeLimit);
                window.electron.ipcRenderer.on('vpn-open', (args) => {
                  console.log(args);
                  setCmdRes(args as string);
                  // 如果打开vpn的回显出现成功字眼，视为成功
                  if ((args as string).indexOf(vpnOpenSuccessFlag) !== -1) {
                    setCmdRes((prev) => prev.concat('vpn开启成功!'));
                    // 取消超时关闭
                    clearTimeout(vpnOpenFlaseFlag);
                    resolve(true);
                  }
                });
                window.electron.ipcRenderer.vpnOpen();
              });
            }}
            onClose={() => {
              return new Promise((resolve) => {
                window.electron.ipcRenderer.on('vpn-close', (args) => {
                  console.log(args);
                  setCmdRes(args as string);
                  resolve();
                });
                window.electron.ipcRenderer.vpnClose();
              });
            }}
          />
        </div>

        <div className={styles.divide} />

        <div className={styles.setting}>
          <span>时长：</span>
          <span>11:22:01</span>
        </div>
      </div>

      <div className={styles.tmp}>{cmdRes}</div>
    </>
  );
};
