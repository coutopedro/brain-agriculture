import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { deleteProducer } from '../store/features/producerSlice';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ListContainer = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px;
  margin: 80px auto 0; /* Centraliza e dá um espaço superior */
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza título e botão */
`;

const ProducerCard = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza os itens no card */
  max-width: 400px; /* Diminui o tamanho do card */
  margin: 20px auto; /* Adiciona um espaço ao redor do card */
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProducerDetails = styled.div`
  font-size: 14px;
  color: #495057;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza o conteúdo dos detalhes */
  text-align: center; /* Alinha o texto ao centro */

  p {
    margin: 8px 0;
  }

  strong {
    color: #343a40;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center; /* Centraliza os botões */
  gap: 10px;
`;

const DeleteButton = styled.button`
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c9302c;
  }
`;

const EditButton = styled(Link)`
  background-color: #f0ad4e;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ec971f;
  }
`;

const AddProducerButton = styled(Link)`
  display: inline-block;
  background-color: #00524f;
  color: white;
  padding: 12px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
  margin-bottom: 20px; /* Ajusta o espaçamento abaixo do botão */
  text-align: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgb(0, 179, 30);
  }
`;

const ProducerList = () => {
  const producers = useSelector((state: RootState) => state.producers.producers);
  const dispatch = useDispatch();

  const handleDelete = (cpf: string) => {
    dispatch(deleteProducer(cpf));
  };

  return (
    <ListContainer>
      <AddProducerButton to="/add">Adicionar Produtor</AddProducerButton>
      <h2>Lista de Produtores</h2>
      {producers.length === 0 ? (
        <p>Não há produtores cadastrados.</p>
      ) : (
        producers.map((producer) => (
          <ProducerCard key={producer.cpf}>
            <ProducerDetails>
              <h3>{producer.name}</h3>
              {/* Acesso correto aos dados de cada propriedade */}
              {producer.properties && producer.properties.map((property) => (
                <div key={property.farmName}>
                  <p><strong>Fazenda:</strong> {property.farmName}</p>
                  <p><strong>Cidade:</strong> {property.city}</p>
                  <p><strong>Estado:</strong> {property.state}</p>
                  <p><strong>Área Total:</strong> {property.totalArea} hectares</p>
                  <p><strong>Área Agricultável:</strong> {property.farmableArea} hectares</p>
                  <p><strong>Safras:</strong> {property.harvests.join(', ')}</p>
                  <p><strong>Culturas Plantadas:</strong> {property.crops.map((crop) => `${crop.crop} na ${crop.year}`).join(', ')}</p>
                </div>
              ))}
            </ProducerDetails>
            <ButtonGroup>
              <EditButton to={`/edit/${producer.cpf}`}>Editar</EditButton>
              <DeleteButton onClick={() => handleDelete(producer.cpf)}>Excluir</DeleteButton>
            </ButtonGroup>
          </ProducerCard>
        ))
      )}
    </ListContainer>
  );
};

export default ProducerList;
