/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import Switch from 'renderer/components/Switch';

import styles from './index.module.scss';

const vpnOpenSuccessFlag = 'Initialization Sequence Completed';
const vpnOpenTimeLimit = 15000; // 15秒开启时限
const vpnCloseSuccessString = 'vpn进程已关闭';

export default () => {
  const [cmdRes, setCmdRes] = useState<string[]>([]);

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.action}>
          <span>VPN 网络</span>

          <Switch
            onOpen={() => {
              return new Promise((resolve) => {
                // 首先清空 cmdRes
                setCmdRes([]);
                // 超时后去关闭vpn
                const vpnOpenFlaseFlag = setTimeout(() => {
                  console.log('vpn开启超时');
                  setCmdRes((prev) => prev.concat('vpn开启超时!'));
                  // 删除 ipcListener
                  if (ipcListenerRemove) ipcListenerRemove();
                  resolve(false);
                }, vpnOpenTimeLimit);
                const ipcListenerRemove = window.electron.ipcRenderer.on(
                  'vpn-open',
                  (args) => {
                    console.log(args);
                    setCmdRes((prev) => prev.concat(args as string));
                    // 如果打开vpn的回显出现成功字眼，视为成功
                    if ((args as string).indexOf(vpnOpenSuccessFlag) !== -1) {
                      setCmdRes((prev) => prev.concat('vpn开启成功'));
                      // 取消超时关闭
                      clearTimeout(vpnOpenFlaseFlag);
                      // 删除 ipcListener
                      if (ipcListenerRemove) ipcListenerRemove();
                      resolve(true);
                    }
                  }
                );
                window.electron.ipcRenderer.vpnOpen();
              });
            }}
            onClose={() => {
              return new Promise((resolve) => {
                const ipcListenerRemove = window.electron.ipcRenderer.on(
                  'vpn-close',
                  (args) => {
                    console.log(args);
                    setCmdRes((prev) => prev.concat(args as string));
                    if ((args as string) === vpnCloseSuccessString) {
                      // 删除 ipcListener
                      if (ipcListenerRemove) ipcListenerRemove();
                      // 关闭成功
                      resolve();
                    }
                  }
                );
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

      <div className={styles.tmp}>
        {cmdRes.map((str, i) => {
          return <p key={i}>{str}</p>;
        })}
      </div>
    </>
  );
};
