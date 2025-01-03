import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../store/store'; // Certifique-se de que a store está configurada corretamente
import ProducerForm from '../components/ProducerForm';

// Função de utilitário para renderizar o componente com o Redux Provider
const renderWithStore = (ui: React.ReactElement) => {
    return render(
        <Provider store={store}>
            <Router>{ui}</Router>
        </Provider>
    );
};

describe('ProducerForm', () => {
    it('deve renderizar o formulário de produtor', () => {
        renderWithStore(<ProducerForm />);

        expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/nome da fazenda/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/cidade/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/estado/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/área total/i)).toBeInTheDocument();
    });

    it('deve exibir uma mensagem de erro se o CPF for inválido', async () => {
        renderWithStore(<ProducerForm />);

        const cpfInput = screen.getByLabelText(/cpf/i) as HTMLInputElement;
        const submitButton = screen.getByRole('button', { name: /salvar/i });

        fireEvent.change(cpfInput, { target: { value: '123456789' } }); // CPF inválido
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/cpf inválido/i)).toBeInTheDocument(); // Mensagem de erro
        });
    });

    it('não deve permitir o envio do formulário se a soma das áreas for inválida', async () => {
        renderWithStore(<ProducerForm />);

        const totalAreaInput = screen.getByLabelText(/área total/i) as HTMLInputElement;
        const farmableAreaInput = screen.getByLabelText(/área agricultável/i) as HTMLInputElement;
        const vegetationAreaInput = screen.getByLabelText(/área de vegetação/i) as HTMLInputElement;
        const submitButton = screen.getByRole('button', { name: /salvar/i });

        fireEvent.change(totalAreaInput, { target: { value: '100' } });
        fireEvent.change(farmableAreaInput, { target: { value: '60' } });
        fireEvent.change(vegetationAreaInput, { target: { value: '50' } }); // A soma das áreas ultrapassa a área total
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/atencao! a soma da área agricultável/i)).toBeInTheDocument(); // Verifica a mensagem de alerta
        });
    });

    it('deve atualizar o estado do formulário quando o usuário digitar nos campos', () => {
        renderWithStore(<ProducerForm />);

        const nameInput = screen.getByLabelText(/nome/i) as HTMLInputElement;

        fireEvent.change(nameInput, { target: { value: 'Fazenda Teste' } });
        expect(nameInput.value).toBe('Fazenda Teste');
    });
});
