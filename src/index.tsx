import ReactDOM from 'react-dom/client'; // Importa o ReactDOM para renderizar a aplicação na DOM
import { Provider } from 'react-redux'; // Importa o Provider para integrar o Redux com o React
import { store } from './store/store'; // Importa a store configurada do Redux
import App from './App'; // Importa o componente principal da aplicação

// Obtém a referência do elemento root na DOM onde a aplicação será renderizada
const root = ReactDOM.createRoot(document.getElementById('root')!); 

root.render(
  
  <Provider store={store}>
    <App /> 
  </Provider>
);

