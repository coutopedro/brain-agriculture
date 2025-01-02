import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  padding: 20px;
  background-color: #00524f;
  color: white;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  margin-right: 40px; /* Aumentando o espaço entre o título e a navegação */
`;

const Navigation = styled.nav`
  display: flex;
  gap: 30px; /* Aumentando o espaço entre os links */
  margin-left: 0; /* Garante que o container de navegação comece da borda esquerda */

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 16px;
  position: relative;
  transition: color 0.3s, transform 0.3s;

  /* Efeito de hover para mudar a cor e adicionar um sublinhado */
  &:hover {
    color: #f4f4f4; /* Cor de texto mais clara */
    transform: translateY(-2px); /* Leve movimento para cima */
  }

  &:hover::after {
    content: '';
    position: absolute;
    bottom: -5px; /* Ajusta a posição do sublinhado */
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #f4f4f4;
    transform: scaleX(0);
    animation: underlineAnimation 0.3s forwards;
  }

  @keyframes underlineAnimation {
    0% {
      transform: scaleX(0);
    }
    100% {
      transform: scaleX(1);
    }
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Header = () => {
    return (
        <HeaderContainer>
            <Title>Cadastro de Produtores</Title>
            <Navigation>
                <NavLink to="/">Lista de Produtores</NavLink>
                <NavLink to="/add">Adicionar Produtor</NavLink>
            </Navigation>
        </HeaderContainer>
    );
};

export default Header;
