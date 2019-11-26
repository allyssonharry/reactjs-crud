import styled from 'styled-components';

export const Aside = styled.aside`
  border-right: 0 solid #eaeaea;
  min-height: calc(100vh - 6em);
  width: 13em;
  order: 2;
  overflow-y: auto;
  background: #f5f5f7;
  padding: 0;
  @media (max-width: 568px) {
    width: 100%;
    min-height: 0;
  }
  nav {
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 568px) {
      flex-wrap: initial;
      flex-direction: row;
    }
    a {
      width: 100%;
      display: block;
      padding: 1rem;
      text-decoration: none;
      font-weight: normal;
      color: inherit;
      border-bottom: 1px solid #e8e8e8;
      transition: all 0.2s ease-in-out;
      &:hover {
        background-color: #fff;
        transition: all 0.1s ease-in;
      }
      &:last-child {
        border-bottom: 0;
      }
      &.active {
        box-shadow: 1px 1px 2px #eee;
        background-color: #fff;
      }
      svg {
        color: #3897f0;
        @media (max-width: 568px) {
          margin: 0 auto;
          width: 1.3rem;
          height: 1.3rem;
        }
      }
      @media (max-width: 568px) {
        padding: 10px;
        font-size: 12px;
        text-align: center;
        display: grid;
      }
    }
  }
  @media screen and (max-width: 568px) {
    position: fixed;
    bottom: 0;
  }
`;
