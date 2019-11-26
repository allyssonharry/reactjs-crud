import styled from 'styled-components';

export const Main = styled.main`
  min-height: 100vh;
  display: flex;
  flex-flow: row wrap;
`;

export const Content = styled.div`
  width: calc(100% - 18em);
  min-height: calc(100vh - 6em);
  padding: 1rem;
  flex: 1;
  order: 3;
  display: flex;
  flex-flow: column wrap;
  > div {
    width: 100%;
  }
`;
