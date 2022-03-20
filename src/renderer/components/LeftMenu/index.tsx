/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import homeIcon from './icon/homeIcon.svg';
import internateIcon from './icon/internate.svg';
import './index.scss';

export default () => {
  const navigate = useNavigate();
  const [linkGroup, setLinkGroup] = useState([
    {
      name: 'home',
      path: '/',
      active: true,
      icon: homeIcon,
      text: '概览',
    },
    {
      name: 'internate',
      path: 'internate',
      active: false,
      icon: internateIcon,
      text: '网络',
    },
  ]);

  return (
    <aside>
      <ul>
        {linkGroup.map((link) => (
          <li
            className={`${link.name} ${link.active ? 'active' : ''}`}
            onClick={() => {
              navigate(link.path);
              setLinkGroup((prev) =>
                prev.map((prevItem) => {
                  return {
                    ...prevItem,
                    active: link.name === prevItem.name,
                  };
                })
              );
            }}
            key={link.name}
          >
            <img src={link.icon} alt={link.name} />
            <span>{link.text}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};
