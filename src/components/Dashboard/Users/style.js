import styled from 'styled-components';

export const TableResponsive = styled.div`
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

export const Table = styled.table`
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  border-collapse: collapse;
  @media (max-width: 568px) {
    font-size: 14px;
  }
  thead {
    tr {
      border-bottom: 0 solid #f5f5f7;
      th {
        vertical-align: bottom;
        border: 0;
        padding: 13px;
        text-align: left;
        font-weight: normal;
        color: #333;
        font-size: 16px;
        width: 100%;
        svg {
          width: 18px;
          height: 18px;
          color: #888;
        }
      }
    }
  }
  tbody {
    td {
      padding: 0.75rem;
      border-top: 1px solid #f5f5f7;
      white-space: pre;
      &:last-child {
        text-align: right;
      }
      a {
        text-decoration: underline;
        color: inherit;
      }
    }
    tr {
      &:hover {
        color: #086fc9;
        background-color: #f9f9f9;
      }
    }
  }
`;

export const ButtonGroup = styled.div`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  button {
    position: relative;
    flex: 1 1 auto;
    background: none;
    border: 0;
    color: #fff;
    &:hover {
      svg {
        color: #bf4800;
      }
    }
    svg {
      width: 18px;
      height: 18px;
      color: #3897f0;
    }
    &:first-child {
      margin-right: 10px;
    }
  }
`;

export const Search = styled.div`
  input {
    display: block;
    width: 25%;
    height: calc(1.5em + 1rem + 1px);
    padding: 0.75rem;
    font-weight: normal;
    line-height: 1.5;
    color: #495057;
    background-color: #efefef;
    background-clip: padding-box;
    border: 0;
    border-radius: 4px;
    transition: all 0.2s ease-out;
    margin-bottom: 10px;
    &:focus {
      width: 100%;
      transition: all 0.2s ease-in;
    }
    @media screen and (max-width: 568px) {
      width: 50%;
    }
  }
`;
