import btnIcon from './icon/btn.svg';

import './index.scss';

export default () => {
  return (
    <div className="internatePage">
      <header>网络</header>
      <main>
        <button
          type="button"
          onClick={() => {
            console.log('click!');
          }}
        >
          <img src={btnIcon} alt="button" />
          <span>未连接</span>
        </button>
      </main>
    </div>
  );
};
