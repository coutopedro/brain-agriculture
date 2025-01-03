import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../store/store'; // Ajuste o caminho conforme sua estrutura de pastas
import ProducerEdit from '../components/ProducerEdit'; // Ajuste o caminho conforme sua estrutura de pastas
import { editProducer } from '../store/features/producerSlice'; // Ajuste o caminho conforme sua estrutura de pastas

jest.mock('../store/features/producerSlice', () => ({
    ...jest.requireActual('../store/features/producerSlice'),
    editProducer: jest.fn(),
}));

describe('ProducerEdit Component', () => {
    it('should render the producer edit form', async () => {
        // Simule os dados de um produtor
        const mockProducer = {
            cpf: '12345678901',
            name: 'Produtor Teste',
            properties: [
                {
                    farmName: 'Fazenda Teste',
                    city: 'Cidade Teste',
                    state: 'Estado Teste',
                    totalArea: 1000,
                    farmableArea: 800,
                    vegetationArea: 200,
                    harvests: ['Safra 2021'],
                    crops: [{ crop: 'Soja', year: '2021' }],
                },
            ],
        };

        // Mock da seleção de estado
        store.dispatch = jest.fn();

        // Renderize o componente com as dependências necessárias
        render(
            <Provider store={store}>
                <Router>
                    <ProducerEdit />
                </Router>
            </Provider>
        );

        // Verifique se o formulário foi renderizado com os campos preenchidos
        expect(screen.getByLabelText(/Nome da Fazenda:/)).toHaveValue('Fazenda Teste');
        expect(screen.getByLabelText(/Cidade:/)).toHaveValue('Cidade Teste');
        expect(screen.getByLabelText(/Estado:/)).toHaveValue('Estado Teste');
        expect(screen.getByLabelText(/Área Total:/)).toHaveValue(1000);
        expect(screen.getByLabelText(/Área Agricultável:/)).toHaveValue(800);
        expect(screen.getByLabelText(/Área de Vegetação:/)).toHaveValue(200);
        expect(screen.getByLabelText(/Safras:/)).toHaveValue('Safra 2021');
        expect(screen.getByLabelText(/Culturas:/)).toHaveValue('Soja na 2021');
    });

    it('should handle form submission', async () => {
        // Mock da função de envio
        const mockDispatch = jest.fn();
        store.dispatch = mockDispatch;

        // Renderize o componente com as dependências necessárias
        render(
            <Provider store={store}>
                <Router>
                    <ProducerEdit />
                </Router>
            </Provider>
        );

        // Preencha os campos do formulário
        fireEvent.change(screen.getByLabelText(/Nome da Fazenda:/), { target: { value: 'Nova Fazenda' } });
        fireEvent.change(screen.getByLabelText(/Cidade:/), { target: { value: 'Nova Cidade' } });
        fireEvent.change(screen.getByLabelText(/Estado:/), { target: { value: 'Novo Estado' } });
        fireEvent.change(screen.getByLabelText(/Área Total:/), { target: { value: 1500 } });
        fireEvent.change(screen.getByLabelText(/Área Agricultável:/), { target: { value: 1200 } });
        fireEvent.change(screen.getByLabelText(/Área de Vegetação:/), { target: { value: 300 } });
        fireEvent.change(screen.getByLabelText(/Safras:/), { target: { value: 'Safra 2023' } });
        fireEvent.change(screen.getByLabelText(/Culturas:/), { target: { value: 'Soja na 2023' } });

        // Submeta o formulário
        fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));

        // Verifique se o dispatch foi chamado com os dados atualizados
        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: editProducer.type, // Não é necessário chamar como função, pois 'type' é uma constante
                    payload: {
                        cpf: '12345678901', // O CPF deve ser mantido
                        name: 'Produtor Teste', // Nome do produtor
                        properties: [
                            {
                                farmName: 'Nova Fazenda', // Dados preenchidos
                                city: 'Nova Cidade',
                                state: 'Novo Estado',
                                totalArea: 1500,
                                farmableArea: 1200,
                                vegetationArea: 300,
                                harvests: ['Safra 2023'],
                                crops: [{ crop: 'Soja', year: '2023' }],
                            },
                        ],
                    },
                })
            );
        });
    });

    it('should show an error message if the producer is not found', () => {
        // Renderize o componente sem dados
        render(
            <Provider store={store}>
                <Router>
                    <ProducerEdit />
                </Router>
            </Provider>
        );

        // A mensagem de erro deve ser exibida se o produtor não for encontrado
        expect(screen.getByText(/Produtor não encontrado!/)).toBeInTheDocument();
    });
});
