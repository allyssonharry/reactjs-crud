import styled from 'styled-components';
import { Link } from 'react-router-dom';

import avatarUrl from './assets/img/batman_profile.jpg';

export const ProfileContent = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

export const Avatar = styled.img.attrs({
  src: avatarUrl,
})`
  width: 150px;
  height: 150px;
  border: 1px solid #ddd;
  border-radius: 50%;
  margin: 0 auto 1rem;
`;

export const ProfileName = styled.h2`
  word-break: break-word;
`;

export const ProfileEmail = styled.a`
  text-decoration: none;
  font-size: 14px;
`;

export const Badge = styled.span`
  background: none;
  padding: 2px 5px;
  border-radius: 2px;
  color: #006fc9;
  vertical-align: middle;
  border: 1px solid rgba(0, 111, 201, 0.15);
  font-size: 12px;
`;

export const EditButton = styled(Link)`
  font-size: 13px;
  font-weight: bold;
  line-height: 26px;
  outline: 0;
  overflow: hidden;
  user-select: none;
  white-space: nowrap;
  -webkit-appearance: none;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  padding: 0 10px;
  cursor: pointer;
  text-decoration: none;
  background-color: #0070c9;
  color: #fff;
  min-width: 10em;
  margin: 1rem auto 0;
`;
