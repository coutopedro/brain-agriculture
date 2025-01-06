import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Bangers', cursive, sans-serif; /* Aplica a fonte Bangers ao corpo */
    background-color: #f4f4f4;
    color: #333;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    flex-direction: column;
  }

  h1, h2, h3, p {
    font-family: 'Bangers', cursive, sans-serif; /* Aplica a fonte Bangers aos títulos e parágrafos */
    color: #00524F;
  }

  h1, h2 {
    font-weight: 600;
    margin-bottom: 10px;
  }

  h3 {
    font-weight: 500;
    color: #555;
  }

  label {
    font-size: 14px;
    color: #555;
  }

  input, button {
    font-size: 14px;
  }

  button {
    cursor: pointer;
    transition: background-color 0.3s;
  }

  @media (max-width: 768px) {
    body {
      padding: 10px;
    }

    h1, h2 {
      font-size: 20px;
    }

    h3 {
      font-size: 18px;
    }

    input, button {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
    }
  }

  @media (min-width: 1024px) {
    body {
      padding: 40px;
    }
  }
`;
