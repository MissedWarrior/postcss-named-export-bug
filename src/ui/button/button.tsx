import React, { FC } from 'react';

import s from './button.module.scss';

export const SomeFancyButton: FC = props => {
  return (
    <button className={ s.default }>
      { props.children }
    </button>
  );
};
