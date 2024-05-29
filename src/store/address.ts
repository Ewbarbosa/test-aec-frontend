import { create } from "zustand"; // lib para gerenciamento de estado

import { api } from "@/services/apiClient";

interface AddressProps {
  id: number;
  street: string;
  complement: string;
  zip_code: string;
  district: string;
  city: string;
  state: string;
}

interface AddressStore {
  address: AddressProps[];
  getAddress: () => Promise<void>;
}

export const useAddressSotre = create<AddressStore>((set) => ({
  address: [],
  getAddress: async () => {

    try {

      const response = await api.get('/address');      

      const data = response.data;

      //console.log(data);

      set({address: data})

    } catch (err) {
      console.log('Erro: ' + err);
    }
  }  
}));