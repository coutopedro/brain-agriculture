import React, { useState } from 'react'; // Importa o React e o hook useState para gerenciar estados locais
import { useDispatch, useSelector } from 'react-redux'; // Importa os hooks do Redux 
import { RootState } from '../store/store'; // Importa o tipo RootState para tipagem do estado global
import { deleteProducer } from '../store/features/producerSlice'; // Importa a ação de exclusão do slice de produtores
import styled from 'styled-components'; // Importa styled-components para estilização de componentes
import { Link } from 'react-router-dom'; // Importa o Link para navegação entre páginas
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'; // Importa os componentes de gráfico da biblioteca Recharts

// Container principal da lista de produtores
const ListContainer = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px;
  margin: 80px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Estilo dos cartões de cada produtor
const ProducerCard = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px); // Efeito ao passar o mouse
  }
`;

// Estilo dos detalhes de cada produtor
const ProducerDetails = styled.div`
  font-size: 14px;
  color: #495057;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  p {
    margin: 8px 0;
  }

  strong {
    color: #343a40;
  }
`;

// Grupo de botões de ação
const ButtonGroup = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

// Estilo para botões de ação
const ActionButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

// Estilo para o botão de excluir
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

// Estilo para o botão de editar
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

// Botão para adicionar produtores
const AddProducerButton = styled(Link)`
  display: inline-block;
  background-color: #00524f;
  color: white;
  padding: 12px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgb(0, 179, 30);
  }
`;

// Paleta de cores para o gráfico
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384'];

// Componente para exibir a lista de produtores
const ProducerList = () => {
  const producers = useSelector((state: RootState) => state.producers.producers); // Obtém a lista de produtores do estado global
  const dispatch = useDispatch(); // Obtém o dispatch para despachar ações
  const [showChart, setShowChart] = useState<string | null>(null); // Estado para gerenciar a exibição de gráficos por produtor

  // Função para excluir um produtor
  const handleDelete = (cpf: string) => {
    dispatch(deleteProducer(cpf));
  };

  // Alterna a exibição do gráfico para o produtor selecionado
  const toggleChart = (cpf: string) => {
    setShowChart((prev) => (prev === cpf ? null : cpf));
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
              {producer.properties &&
                producer.properties.map((property) => (
                  <div key={property.farmName}>
                    <p><strong>Fazenda:</strong> {property.farmName}</p>
                    <p><strong>Cidade:</strong> {property.city}</p>
                    <p><strong>Estado:</strong> {property.state}</p>
                    <p><strong>Área Total:</strong> {property.totalArea} hectares</p>
                    <p><strong>Área Agricultável:</strong> {property.farmableArea} hectares</p>
                    <p><strong>Culturas Plantadas:</strong> {property.crops.map((crop) => `${crop.crop} na ${crop.year}`).join(', ')}</p>
                  </div>
                ))}
            </ProducerDetails>
            <ButtonGroup>
              <EditButton to={`/edit/${producer.cpf}`}>Editar</EditButton>
              <DeleteButton onClick={() => handleDelete(producer.cpf)}>Excluir</DeleteButton>
              <ActionButton onClick={() => toggleChart(producer.cpf)}>
                {showChart === producer.cpf ? 'Ocultar Gráfico' : 'Mostrar Gráfico'}
              </ActionButton>
            </ButtonGroup>
            {showChart === producer.cpf && (
              <PieChart width={300} height={300}>
                <Pie
                  data={producer.properties.flatMap((property) =>
                    property.crops.map((crop) => ({ name: crop.crop, value: 1 }))
                  )}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {producer.properties.flatMap((property) =>
                    property.crops.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))
                  )}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            )}
          </ProducerCard>
        ))
      )}
    </ListContainer>
  );
};

export default ProducerList;
