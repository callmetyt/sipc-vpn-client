/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import styles from './index.module.scss';

interface FCProps {
  onOpen: () => Promise<boolean>;
  onClose: () => Promise<void>;
}

export default ({ onOpen, onClose }: FCProps) => {
  const [checked, setChecked] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  return (
    <div
      className={`${styles.switch} ${checked ? styles.checked : ''} ${
        isLoad ? styles.loading : ''
      }`}
      onClick={async () => {
        // 加载状态下不作反应
        if (isLoad) return;

        // 开始加载
        setIsLoad(true);
        if (!checked) {
          // 打开
          const openRes = await onOpen();
          if (openRes) {
            // 打开成功
            setChecked(true);
          } else {
            // 打开失败
            await onClose();
            setChecked(false);
          }
        } else {
          // 关闭
          await onClose();
          setChecked(false);
        }
        setIsLoad(false);
      }}
    >
      <div className={`${styles.word} ${checked ? styles.checked : ''}`}>
        {checked ? '开' : '关'}
      </div>
      <div className={`${styles.circle} ${checked ? styles.checked : ''}`} />
    </div>
  );
};
