import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
  height: 30px;
  background: green;
`;

const Main = styled.div`
  display: flex;
`;
const SideMenu = styled.section`
  width: 160px;
  background: #fea;
`;

const Contents = styled.section`
  border-radius: 10px;
`;

const Footer = styled.footer`
  height: 30px;
  background: gray;
`;

const Layout = ({ loginUser, logout, children }) => (
  <div>
    <Header>
      You are
      {' '}
      {loginUser.name}
      <button type="button" onClick={() => logout()}>Logout</button>
    </Header>
    <Main>
      <SideMenu>
        <p>サイドメニュー</p>
        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/mypage">MyPage</Link>
          </li>
          <li>
            <Link to="/user">User</Link>
          </li>
        </ul>
      </SideMenu>
      <Contents>{children}</Contents>
    </Main>
    <Footer>Footer</Footer>
  </div>
);
export default Layout;
