<template>
  <section class="pt-32">{{ products }}</section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProductsStore } from '@/stores/products';
import { useToast } from '@/components/ui/toast/use-toast';

const productsStore = useProductsStore();
const products = ref([]);
const { toast } = useToast();

onMounted(async () => {
  await getProducts();
});

async function getProducts() {
  try {
    await productsStore.getProducts();
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
