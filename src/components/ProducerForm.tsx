import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addProducer, editProducer } from '../store/features/producerSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

import styled from 'styled-components';

// Tipando o estado do produtor
interface Crop {
  crop: string;
  year: string;
}

interface Property {
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  farmableArea: number;
  vegetationArea: number;
  harvests: string[];
  crops: Crop[];
}

interface Producer {
  cpf: string;
  name: string;
  properties: Property[];
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 80px;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const InputField = styled.div`
  margin-bottom: 16px;
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 8px;
`;

const SubmitButton = styled.button`
  background-color: #00524F;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  
  &:hover {
    background-color: #003c3a;
  }
`;

// Função de validação de CPF
function validateCPF(cpf: string): boolean {
  // Implementação simples para validar se o CPF tem 11 caracteres.
  // Ajuste a lógica conforme necessário
  return cpf.length === 11;
}

const ProducerForm = () => {
  const { cpf } = useParams();
  const [producer, setProducer] = useState<Producer>({
    cpf: '',
    name: '',
    properties: [{
      farmName: '',
      city: '',
      state: '',
      totalArea: 0,
      farmableArea: 0,
      vegetationArea: 0,
      harvests: [],
      crops: [],
    }],
  });

  const [cpfError, setCpfError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const producers = useSelector((state: RootState) => state.producers.producers);

  useEffect(() => {
    if (cpf) {
      const producerToEdit = producers.find((prod: Producer) => prod.cpf === cpf);
      if (producerToEdit) {
        setProducer({
          cpf: producerToEdit.cpf,
          name: producerToEdit.name,
          properties: [{
            farmName: producerToEdit.properties[0].farmName,
            city: producerToEdit.properties[0].city,
            state: producerToEdit.properties[0].state,
            totalArea: producerToEdit.properties[0].totalArea,
            farmableArea: producerToEdit.properties[0].farmableArea,
            vegetationArea: producerToEdit.properties[0].vegetationArea,
            harvests: producerToEdit.properties[0].harvests,
            crops: producerToEdit.properties[0].crops,
          }],
        });
      }
    }
  }, [cpf, producers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCPF(producer.cpf)) {
      setCpfError('CPF inválido. Verifique e tente novamente.');
      return;
    }

    setCpfError('');

    const updatedProducer = {
      cpf: producer.cpf,
      name: producer.name,
      properties: [{
        farmName: producer.properties[0].farmName,
        city: producer.properties[0].city,
        state: producer.properties[0].state,
        totalArea: producer.properties[0].totalArea,
        farmableArea: producer.properties[0].farmableArea,
        vegetationArea: producer.properties[0].vegetationArea,
        harvests: producer.properties[0].harvests,
        crops: producer.properties[0].crops,
      }],
    };

    if (cpf) {
      dispatch(editProducer(updatedProducer));
    } else {
      dispatch(addProducer(updatedProducer));
    }

    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProducer((prevState) => ({
      ...prevState,
      properties: [{
        ...prevState.properties[0],
        [name]: value,
      }],
    }));
  };

  return (
    <AppContainer>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <InputField>
            <label>Nome:</label>
            <input
              type="text"
              name="name"
              value={producer.name}
              onChange={(e) => setProducer({ ...producer, name: e.target.value })}
            />
          </InputField>

          <InputField>
            <label>CPF:</label>
            <input
              type="text"
              name="cpf"
              value={producer.cpf}
              onChange={(e) => setProducer({ ...producer, cpf: e.target.value })}
            />
            {cpfError && <ErrorMessage>{cpfError}</ErrorMessage>}
          </InputField>

          <InputField>
            <label>Nome da Fazenda:</label>
            <input
              type="text"
              name="farmName"
              value={producer.properties[0].farmName}
              onChange={(e) => setProducer({ ...producer, properties: [{ ...producer.properties[0], farmName: e.target.value }] })}
            />
          </InputField>

          <InputField>
            <label>Cidade:</label>
            <input
              type="text"
              name="city"
              value={producer.properties[0].city}
              onChange={(e) => setProducer({ ...producer, properties: [{ ...producer.properties[0], city: e.target.value }] })}
            />
          </InputField>

          <InputField>
            <label>Estado:</label>
            <input
              type="text"
              name="state"
              value={producer.properties[0].state}
              onChange={(e) => setProducer({ ...producer, properties: [{ ...producer.properties[0], state: e.target.value }] })}
            />
          </InputField>

          <InputField>
            <label>Área Total:</label>
            <input
              type="number"
              name="totalArea"
              value={producer.properties[0].totalArea}
              onChange={(e) => setProducer({ ...producer, properties: [{ ...producer.properties[0], totalArea: Number(e.target.value) }] })}
            />
          </InputField>

          <InputField>
            <label>Área Agricultável:</label>
            <input
              type="number"
              name="farmableArea"
              value={producer.properties[0].farmableArea}
              onChange={(e) => setProducer({ ...producer, properties: [{ ...producer.properties[0], farmableArea: Number(e.target.value) }] })}
            />
          </InputField>

          <InputField>
            <label>Área de Vegetação:</label>
            <input
              type="number"
              name="vegetationArea"
              value={producer.properties[0].vegetationArea}
              onChange={(e) => setProducer({ ...producer, properties: [{ ...producer.properties[0], vegetationArea: Number(e.target.value) }] })}
            />
          </InputField>

          <SubmitButton type="submit">Salvar</SubmitButton>
        </form>
      </FormContainer>
    </AppContainer>
  );
};

export default ProducerForm;
