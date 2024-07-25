<template>
  <section class="pt-44 pb-16">
    <BaseContainer>
      <div>
        <div class="mb-10 md:mb-16">
          <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Products
          </h2>
          <p class="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam officia veniam minus
            animi voluptas quae tenetur modi commodi facilis in? Impedit tenetur assumenda aliquam
            aperiam.
          </p>
        </div>
        <div class="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProductsStore } from '@/stores/products';
import { useToast } from '@/components/ui/toast/use-toast';

import BaseContainer from '@/components/ui/base/BaseContainer.vue';
import ProductCard from '@/components/products/ProductCard.vue';

const productsStore = useProductsStore();
const products = ref([]);
const { toast } = useToast();

onMounted(async () => {
  await getProducts();
});

async function getProducts() {
  try {
    await productsStore.getProducts({ page: 0, limit: 0 });
    products.value = productsStore.products;
  } catch (error) {
    toast({
      title: 'Error',
      variant: 'destructive',
      description: error.message,
    });
  }
}
</script>
