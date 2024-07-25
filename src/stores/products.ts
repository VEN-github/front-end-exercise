import { defineStore } from 'pinia';
import api from '@/services/api';
import type { AxiosError } from 'axios';
import { handleApiError } from '@/composables/handleApiError';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    product: null,
    relatedProducts: [],
    categories: [],
  }),
  actions: {
    async getProducts({
      page = 0,
      limit = 10,
      search = null,
      category = null,
      min_price = null,
      max_price = null,
    }) {
      try {
        const { data } = await api.get('/products', {
          params: {
            offset: page,
            limit: limit,
            title: search,
            categoryId: category,
            price_min: min_price,
            price_max: max_price,
          },
        });
        this.products = data;
      } catch (error) {
        const _error = error as AxiosError<string>;
        handleApiError(_error.response?.status);
      }
    },
    async getProduct(id: number) {
      try {
        const { data } = await api.get(`/products/${id}`);
        this.product = data;
        await this.getProducts({ page: 0, limit: 4 });
        this.relatedProducts = this.products.filter(product => product.id !== this.product?.id);
      } catch (error) {
        const _error = error as AxiosError<string>;
        handleApiError(_error.response?.status);
      }
    },
    async getCategories() {
      try {
        const { data } = await api.get('/categories');
        this.categories = data;
      } catch (error) {
        const _error = error as AxiosError<string>;
        handleApiError(_error.response?.status);
      }
    },
  },
});
