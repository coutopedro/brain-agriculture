import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store'; 
import ProducerList from '../components/ProducerList';
import { BrowserRouter as Router } from 'react-router-dom'; 

// Mock do estado global 
const mockProducers = [
    {
        cpf: '12345678900',
        name: 'Produtor 1',
        properties: [
            {
                farmName: 'Fazenda A',
                city: 'Cidade A',
                state: 'Estado A',
                totalArea: 500,
                farmableArea: 300,
                crops: [
                    { crop: 'Soja', year: 2021 },
                    { crop: 'Milho', year: 2022 },
                ],
            },
        ],
    },
    {
        cpf: '98765432100',
        name: 'Produtor 2',
        properties: [
            {
                farmName: 'Fazenda B',
                city: 'Cidade B',
                state: 'Estado B',
                totalArea: 700,
                farmableArea: 500,
                crops: [
                    { crop: 'Arroz', year: 2021 },
                    { crop: 'Feijão', year: 2022 },
                ],
            },
        ],
    },
];

// Teste de renderização
describe('ProducerList', () => {
    it('deve renderizar a lista de produtores corretamente', () => {
        render(
            <Provider store={store}>
                <Router>
                    <ProducerList />
                </Router>
            </Provider>
        );

        // Verifica se os nomes dos produtores 
        expect(screen.getByText('Produtor 1')).toBeInTheDocument();
        expect(screen.getByText('Produtor 2')).toBeInTheDocument();
    });

    it('deve exibir a mensagem "Não há produtores cadastrados." quando não houver produtores', () => {
        
        render(
            <Provider store={store}>
                <Router>
                    <ProducerList />
                </Router>
            </Provider>
        );

        // Verificando a ausência de produtores
        expect(screen.getByText('Não há produtores cadastrados.')).toBeInTheDocument();
    });

    it('deve disparar a função handleDelete ao clicar no botão Excluir', () => {
        // Mock da função handleDelete
        const mockHandleDelete = jest.fn();

        // Renderizando o componente
        render(
            <Provider store={store}>
                <Router>
                    <ProducerList />
                </Router>
            </Provider>
        );

        // Clique no botão Excluir
        fireEvent.click(screen.getByText('Excluir'));

        // Verifica se a função handleDelete foi chamada
        expect(mockHandleDelete).toHaveBeenCalled();
    });

    it('deve alternar a exibição do gráfico quando o botão "Mostrar Gráfico/Ocultar Gráfico" for clicado', () => {
        render(
            <Provider store={store}>
                <Router>
                    <ProducerList />
                </Router>
            </Provider>
        );

        // Verificando se o gráfico não está visível inicialmente
        expect(screen.queryByText('Ocultar Gráfico')).not.toBeInTheDocument();

        // Clicando no botão "Mostrar Gráfico"
        fireEvent.click(screen.getByText('Mostrar Gráfico'));

        // Verificando se o gráfico foi exibido
        expect(screen.getByText('Ocultar Gráfico')).toBeInTheDocument();
    });
});
