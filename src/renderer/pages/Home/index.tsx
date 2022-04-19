import MainContent from './components/MainContent';
import styles from './index.module.scss';

export default () => {
  return (
    <div className={styles.homePage}>
      <header>Hi,header</header>
      <MainContent />
    </div>
  );
};
