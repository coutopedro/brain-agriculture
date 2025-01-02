import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a interface Property, que descreve uma propriedade de produtor
interface Property {
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  farmableArea: number;
  vegetationArea: number;
  harvests: string[];
  crops: { crop: string; year: string }[];  // Certifique-se de que crops está correto
}

export interface Producer {
  cpf: string;
  name: string;
  properties: Property[];  // A lista de propriedades de um produtor
}


interface ProducerState {
  producers: Producer[];  // Lista de todos os produtores
}

// Aqui você define o estado inicial do slice
const initialState: ProducerState = {
  producers: [],  // Inicialmente não temos produtores, é um array vazio
};

// Cria a slice do Redux para os produtores
const producerSlice = createSlice({
  name: 'producers',  // Nome da slice
  initialState,  // O estado inicial que você acabou de definir
  reducers: {
    addProducer: (state, action: PayloadAction<Producer>) => {
      state.producers.push(action.payload);  // Adiciona um novo produtor ao array
    },
    editProducer: (state, action: PayloadAction<Producer>) => {
      const index = state.producers.findIndex((p) => p.cpf === action.payload.cpf);
      if (index !== -1) {
        state.producers[index] = action.payload;  // Atualiza o produtor no array
      }
    },
    deleteProducer: (state, action: PayloadAction<string>) => {
      state.producers = state.producers.filter((producer) => producer.cpf !== action.payload);  // Remove o produtor pelo CPF
    },
  },
});

// Exporta as ações para usar em outros arquivos
export const { addProducer, editProducer, deleteProducer } = producerSlice.actions;

// Exporta o reducer para ser usado na configuração da store
export default producerSlice.reducer;
