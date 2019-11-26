import styled from 'styled-components';

export const TopBar = styled.header`
  background-color: #fff;
  color: #333;
  flex: 1 100%;
  order: 1;
  border-bottom: 1px solid #eee;
  padding: 0 1rem;
  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    ul {
      li {
        display: inline-block;
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    label {
      display: inline-block;
      margin-right: 10px;
      padding: 4px 10px;
      color: white;
      background: orangered;
      border-radius: 5px;
      vertical-align: middle;
    }
    span {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
`;
