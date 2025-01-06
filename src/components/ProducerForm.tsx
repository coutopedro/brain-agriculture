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
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const GridForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
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
  padding: 12px 24px;  
  border: none;
  border-radius: 4px;
  font-size: 16px;  
  cursor: pointer;
  display: block;  
  width: fit-content;  
  margin: 20px auto;  

  &:hover {
    background-color: rgb(0, 179, 30);
  }
`;

function validateCPF(cpf: string): boolean {
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
      crops: [{ crop: '', year: '' }],
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

    const { totalArea, farmableArea, vegetationArea } = producer.properties[0];

    // Validação de áreas no envio
    if (farmableArea + vegetationArea > totalArea) {
      alert('ATENÇÃO! A soma da área agricultável e da área de vegetação não pode ser maior que a área total da fazenda.');
      return; // Impede o envio do formulário se a condição não for atendida
    }

    const updatedProducer = {
      cpf: producer.cpf,
      name: producer.name,
      properties: [producer.properties[0]],  // Atualiza as propriedades
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

    // Verifica se o campo é numérico (totalArea, farmableArea ou vegetationArea)
    const isNumericField = name === "totalArea" || name === "farmableArea" || name === "vegetationArea";

    let newValue: string | number = value; // Permitir tanto string quanto número

    // Se for numérico e não vazio, converta para número
    if (isNumericField) {
      newValue = value === "" ? "" : Number(value);
    }

    // Atualiza o estado
    setProducer((prevState) => {
      const updatedProducer = {
        ...prevState,
        properties: [{
          ...prevState.properties[0],
          [name]: newValue,  // Atualiza o valor
        }],
      };

      // Se o campo alterado for uma área, faça a verificação
      if (name === "totalArea" || name === "farmableArea" || name === "vegetationArea") {
        const { totalArea, farmableArea, vegetationArea } = updatedProducer.properties[0];

        // Verifique se a soma das áreas não ultrapassa a área total
        if (farmableArea + vegetationArea > totalArea) {
          alert('A soma da área agricultável e da área de vegetação não pode ser maior que a área total da fazenda.');
          return prevState; // Não atualiza o estado caso a soma ultrapasse
        }
      }

      return updatedProducer;  // Atualiza o estado caso a validação passe
    });
  };

  // Atualização da função de cultivo e safra:
  const handleCropChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string) => {
    const { value } = e.target;

    setProducer((prevState) => ({
      ...prevState,
      properties: [{
        ...prevState.properties[0],
        crops: prevState.properties[0].crops.map((crop, i) =>
          i === index ? { ...crop, [field]: value } : crop
        ),
      }],
    }));
  };

  const addCrop = () => {
    setProducer((prevState) => ({
      ...prevState,
      properties: [{
        ...prevState.properties[0],
        crops: [...prevState.properties[0].crops, { crop: '', year: '' }], // Adiciona um novo objeto de safra e cultivo vazio
      }],
    }));
  };

  return (
    <AppContainer>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <GridForm>
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
              <label>Safra:</label>
              {producer.properties[0].crops.map((crop, index) => (
                <div key={index}>
                  <input
                    type="text"
                    name="year"
                    value={crop.year}
                    onChange={(e) => handleCropChange(e, index, 'year')}
                  />
                </div>
              ))}
              <button type="button" onClick={addCrop}>Adicionar Safra</button>
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
              <label>Cultivo:</label>
              {producer.properties[0].crops.map((crop, index) => (
                <div key={index}>
                  <input
                    type="text"
                    name="crop"
                    value={crop.crop}
                    onChange={(e) => handleCropChange(e, index, 'crop')}
                  />
                </div>
              ))}
              <button type="button" onClick={addCrop}>Adicionar Cultivo</button>
            </InputField>
            <InputField>
              <label>Área Total:</label>
              <input
                type="number"
                name="totalArea"
                value={producer.properties[0].totalArea || ''}  // Permite valor vazio
                onChange={handleChange}
              />
            </InputField>
            <InputField>
              <label>Área Agricultável:</label>
              <input
                type="number"
                name="farmableArea"
                value={producer.properties[0].farmableArea || ''}  // Permite valor vazio
                onChange={handleChange}
              />
            </InputField>

            <InputField>
              <label>Área de Vegetação:</label>
              <input
                type="number"
                name="vegetationArea"
                value={producer.properties[0].vegetationArea || ''}  // Permite valor vazio
                onChange={handleChange}
              />
            </InputField>
          </GridForm>
          <SubmitButton type="submit">Salvar</SubmitButton>
        </form>
      </FormContainer>
    </AppContainer>
  );
};

export default ProducerForm;
