import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editProducer } from '../store/features/producerSlice';
import { RootState } from '../store/store';
import styled from 'styled-components';

// Certifique-se de que o tipo `Producer` seja o correto
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 80px;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  gap: 40px;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  flex: 1;
`;

const FormColumn = styled.div`
  flex: 1;
  min-width: 300px;
  padding-right: 20px;
`;

const InputField = styled.div`
  margin-bottom: 20px;

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 5px;
  }

  span {
    color: red;
    font-size: 12px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    background-color: #00524F;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #003d3b;
    }
  }
`;

// Adicione a tipagem explícita para os parâmetros no mapeamento

// Importe ou defina os tipos no topo do arquivo
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

const ProducerEdit = () => {
    const { cpf } = useParams<{ cpf: string }>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const producerFromState = useSelector((state: RootState) =>
        state.producers.producers.find((p) => p.cpf === cpf)
    );

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
            crops: []
        }]
    });

    const addProperty = () => {
        setProducer({
            ...producer,
            properties: [
                ...producer.properties,
                { farmName: '', city: '', state: '', totalArea: 0, farmableArea: 0, vegetationArea: 0, harvests: [], crops: [] }
            ]
        });
    };

    const removeProperty = (index: number) => {
        setProducer({
            ...producer,
            properties: producer.properties.filter((_, i) => i !== index)
        });
    };

    const handlePropertyChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedProperties = [...producer.properties];
        updatedProperties[index] = {
            ...updatedProperties[index],
            [e.target.name]: e.target.value
        };
        setProducer({
            ...producer,
            properties: updatedProperties
        });
    };

    const handleHarvestsChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedProperties = [...producer.properties];
        updatedProperties[index].harvests = e.target.value.split(',').map((val) => val.trim());
        setProducer({
            ...producer,
            properties: updatedProperties
        });
    };

    const handleCropsChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedProperties = [...producer.properties];
        updatedProperties[index].crops = e.target.value.split(',').map((val) => {
            const [crop, year] = val.split(' na ').map((val) => val.trim());
            return { crop, year };
        });
        setProducer({
            ...producer,
            properties: updatedProperties
        });
    };

    useEffect(() => {
        if (producerFromState) {
            setProducer({
                cpf: producerFromState.cpf,
                name: producerFromState.name,
                properties: producerFromState.properties.map((property: Property) => ({
                    ...property,
                    harvests: property.harvests || [],  // Garantir que seja um array
                    crops: property.crops || [],  // Garantir que seja um array
                }))
            });
        }
    }, [producerFromState]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Corrige o mapeamento de `harvests` e `crops`
        const updatedProperties = producer.properties.map((property: Property) => ({
            ...property,
            harvests: property.harvests.map((item) => item.trim()), // Apenas removendo espaços extras
            crops: property.crops.map((item) => {
                const crop = item.crop.trim();  // Usa 'crop' de 'Crop'
                const year = item.year.trim();  // Usa 'year' de 'Crop'
                return { crop, year };  // Cria um array de objetos { crop, year }
            })
        }));

        const updatedProducer: Producer = {
            cpf: producer.cpf,
            name: producer.name,
            properties: updatedProperties,
        };

        // Envia o produtor atualizado
        dispatch(editProducer(updatedProducer));
        navigate('/');
    };

    if (!producerFromState) {
        return <p>Produtor não encontrado!</p>;
    }

    return (
        <AppContainer>
            <form onSubmit={handleSubmit}>
                <FormWrapper>
                    {producer.properties.map((property: Property, index: number) => (  // Adicionando os tipos aqui
                        <div key={index}>
                            <FormColumn>
                                <InputField>
                                    <label>Nome da Fazenda:</label>
                                    <input
                                        type="text"
                                        name="farmName"
                                        value={property.farmName}
                                        onChange={(e) => handlePropertyChange(index, e)}
                                    />
                                </InputField>
                            </FormColumn>
                            <FormColumn>
                                <InputField>
                                    <label>Cidade:</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={property.city}
                                        onChange={(e) => handlePropertyChange(index, e)}
                                    />
                                </InputField>
                            </FormColumn>
                            <FormColumn>
                                <InputField>
                                    <label>Estado:</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={property.state}
                                        onChange={(e) => handlePropertyChange(index, e)}
                                    />
                                </InputField>
                            </FormColumn>
                            <FormColumn>
                                <InputField>
                                    <label>Área Total:</label>
                                    <input
                                        type="number"
                                        name="totalArea"
                                        value={property.totalArea}
                                        onChange={(e) => handlePropertyChange(index, e)}
                                    />
                                </InputField>
                            </FormColumn>
                            <FormColumn>
                                <InputField>
                                    <label>Área Agricultável:</label>
                                    <input
                                        type="number"
                                        name="farmableArea"
                                        value={property.farmableArea}
                                        onChange={(e) => handlePropertyChange(index, e)}
                                    />
                                </InputField>
                            </FormColumn>
                            <FormColumn>
                                <InputField>
                                    <label>Área de Vegetação:</label>
                                    <input
                                        type="number"
                                        name="vegetationArea"
                                        value={property.vegetationArea}
                                        onChange={(e) => handlePropertyChange(index, e)}
                                    />
                                </InputField>
                            </FormColumn>
                            <FormColumn>
                                <InputField>
                                    <label>Safras:</label>
                                    <input
                                        type="text"
                                        name="harvests"
                                        value={property.harvests.join(', ')}  // Exibe como string para o usuário
                                        onChange={(e) => handleHarvestsChange(index, e)}
                                    />
                                </InputField>
                            </FormColumn>
                            <FormColumn>
                                <InputField>
                                    <label>Culturas:</label>
                                    <input
                                        type="text"
                                        name="crops"
                                        value={property.crops.map((crop: Crop) => `${crop.crop} na ${crop.year}`).join(', ')}  // Exibe como string para o usuário
                                        onChange={(e) => handleCropsChange(index, e)}
                                    />
                                </InputField>
                            </FormColumn>
                            <ButtonWrapper>
                                <button type="button" onClick={() => removeProperty(index)}>Remover Propriedade</button>
                            </ButtonWrapper>
                        </div>
                    ))}

                    <ButtonWrapper>
                        <button type="button" onClick={addProperty}>Adicionar Propriedade</button>
                    </ButtonWrapper>
                </FormWrapper>

                <ButtonWrapper>
                    <button type="submit">Salvar</button>
                </ButtonWrapper>
            </form>
        </AppContainer>
    );
};


export default ProducerEdit;
