import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeadCont, LogoutButton, BtnProfile, LinkNav } from './Header.styled';
import Modal from '../modal/Modal';
// eslint-disable-next-line import/no-cycle
import { TokenContext } from '../../../navigation';
import MyProfile from '../myProfile/MyProfile';
import { removeAuthTokenAndContext } from '../../../utills/localStorage';

const Header = (): JSX.Element => {
  const { token, setToken } = useContext(TokenContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();
  const handleToggle = () => {
    setIsOpen((pS) => !pS);
  };
  const handleLogout = () => {
    navigation('/login');
    removeAuthTokenAndContext(setToken);
  };
  return (
    <>
      <HeadCont>
        <div>
          <LinkNav to="/">Home</LinkNav>
        </div>
        <div>
          <LinkNav to="/todos">Todos</LinkNav>
        </div>
        {token.length === 0 ? (
          <div>
            <LinkNav to="/login">Auth</LinkNav>
          </div>
        ) : (
          <>
            <div style={{ width: '90px' }}>
              <BtnProfile onClick={handleToggle}>My Profile</BtnProfile>
            </div>
            <div>
              <LogoutButton onClick={handleLogout} type="button">
                Logout
              </LogoutButton>
            </div>
          </>
        )}
      </HeadCont>
      {isOpen && (
        <Modal onClose={handleToggle}>
          <MyProfile />
        </Modal>
      )}
    </>
  );
};

export default Header;
