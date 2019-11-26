import React from 'react';

import { DotWrapper, Dot } from './style';

const Loading = () => {
  return (
    <DotWrapper>
      <Dot delay="0s" />
      <Dot delay=".1s" />
      <Dot delay=".2s" />
    </DotWrapper>
  );
};

export default Loading;
