/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import styles from './index.module.scss';

interface FCProps {
  onOpen: () => Promise<void>;
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
        if (isLoad) return;

        setIsLoad(true);
        if (checked) await onOpen();
        else await onClose();
        setIsLoad(false);

        setChecked((prev) => !prev);
      }}
    >
      <div className={`${styles.word} ${checked ? styles.checked : ''}`}>
        {checked ? '开' : '关'}
      </div>
      <div className={`${styles.circle} ${checked ? styles.checked : ''}`} />
    </div>
  );
};
