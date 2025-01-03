import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editProducer } from '../store/features/producerSlice';
import { RootState } from '../store/store';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 80px;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  gap: 20px; /* Espaçamento entre as colunas */
  max-width: 1200px;
  margin: 0 auto;
  flex: 1;
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; /* Espaçamento entre os campos dentro de cada coluna */
  flex: 1;
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
                    harvests: property.harvests || [],
                    crops: property.crops || [],
                }))
            });
        }
    }, [producerFromState]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedProperties = producer.properties.map((property: Property) => ({
            ...property,
            harvests: property.harvests.map((item) => item.trim()),
            crops: property.crops.map((item) => {
                const crop = item.crop.trim();
                const year = item.year.trim();
                return { crop, year };
            })
        }));

        const updatedProducer: Producer = {
            cpf: producer.cpf,
            name: producer.name,
            properties: updatedProperties,
        };

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
                    <FormColumn>
                        <InputField>
                            <label>Nome da Fazenda:</label>
                            <input
                                type="text"
                                name="farmName"
                                value={producer.properties[0]?.farmName || ''}
                                onChange={(e) => handlePropertyChange(0, e)}
                            />
                        </InputField>
                        <InputField>
                            <label>Cidade:</label>
                            <input
                                type="text"
                                name="city"
                                value={producer.properties[0]?.city || ''}
                                onChange={(e) => handlePropertyChange(0, e)}
                            />
                        </InputField>
                        <InputField>
                            <label>Estado:</label>
                            <input
                                type="text"
                                name="state"
                                value={producer.properties[0]?.state || ''}
                                onChange={(e) => handlePropertyChange(0, e)}
                            />
                        </InputField>
                        <InputField>
                            <label>Área Total:</label>
                            <input
                                type="number"
                                name="totalArea"
                                value={producer.properties[0]?.totalArea || 0}
                                onChange={(e) => handlePropertyChange(0, e)}
                            />
                        </InputField>
                    </FormColumn>
                    <FormColumn>
                        <InputField>
                            <label>Área Agricultável:</label>
                            <input
                                type="number"
                                name="farmableArea"
                                value={producer.properties[0]?.farmableArea || 0}
                                onChange={(e) => handlePropertyChange(0, e)}
                            />
                        </InputField>
                        <InputField>
                            <label>Área de Vegetação:</label>
                            <input
                                type="number"
                                name="vegetationArea"
                                value={producer.properties[0]?.vegetationArea || 0}
                                onChange={(e) => handlePropertyChange(0, e)}
                            />
                        </InputField>
                        <InputField>
                            <label>Safras:</label>
                            <input
                                type="text"
                                name="harvests"
                                value={producer.properties[0]?.harvests.join(', ') || ''}
                                onChange={(e) => handleHarvestsChange(0, e)}
                            />
                        </InputField>
                        <InputField>
                            <label>Culturas:</label>
                            <input
                                type="text"
                                name="crops"
                                value={producer.properties[0]?.crops.map((crop: Crop) => `${crop.crop} na ${crop.year}`).join(', ') || ''}
                                onChange={(e) => handleCropsChange(0, e)}
                            />
                        </InputField>
                    </FormColumn>
                </FormWrapper>

                <ButtonWrapper>
                    <button type="submit">Salvar</button>
                </ButtonWrapper>
            </form>
        </AppContainer>
    );
};

export default ProducerEdit;
