import { defineStore } from 'pinia';
import api from '@/services/api';
import type { AxiosError } from 'axios';
import { handleApiError } from '@/composables/handleApiError';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
  }),
  actions: {
    async getProducts() {
      try {
        const { data } = await api.get('/products');
        this.products = data;
      } catch (error) {
        const _error = error as AxiosError<string>;
        handleApiError(_error.response?.status);
      }
    },
  },
});
