import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #00524f;
  color: white;
  padding: 20px 0;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;

  @media (max-width: 768px) {
    padding: 15px 0;
  }
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FooterText>Teste de gerenciamento de produtores rurais.</FooterText>
        </FooterContainer>
    );
};

export default Footer;
