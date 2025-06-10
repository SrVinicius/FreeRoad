import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
  background-color: transparent;
`;

export const Logo = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #000; /* Texto preto */
`;

export const AccessLink = styled.span`
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
  color: #000; /* Texto preto */

  &:hover {
    color: #555; /* Cor ao passar o mouse */
  }
`;