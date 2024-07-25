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
        <div class="mb-8 flex items-center justify-between">
          <Input v-model="search" type="search" placeholder="Search..." class="w-96" />
          <div class="flex gap-8">
            <div class="relative">
              <details class="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                  class="flex cursor-pointer items-center gap-2 text-gray-900 transition hover:border-gray-600"
                >
                  <span class="text-sm font-medium"> Category </span>
                  <span class="transition group-open:-rotate-180">
                    <ChevronDown class="h-4 w-4" />
                  </span>
                </summary>
                <div
                  class="z-20 group-open:absolute group-open:end-0 group-open:top-auto group-open:mt-2"
                >
                  <div class="w-96 rounded border border-gray-200 bg-white">
                    <div class="flex items-center justify-end p-4">
                      <button
                        type="button"
                        class="text-sm text-gray-900 underline underline-offset-4"
                        @click="selectedCategory = null"
                      >
                        Reset
                      </button>
                    </div>
                    <ul class="space-y-1 border-t border-gray-200 p-4">
                      <li v-for="category in categories" :key="category.id">
                        <button
                          type="button"
                          class="font-medium capitalize"
                          :class="
                            selectedCategory === category.id
                              ? 'text-gray-900 underline'
                              : 'text-gray-500'
                          "
                          @click="selectedCategory = category.id"
                        >
                          {{ category.name }}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </details>
            </div>
            <div class="relative">
              <details class="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                  class="flex cursor-pointer items-center gap-2 text-gray-900 transition hover:border-gray-600"
                >
                  <span class="text-sm font-medium"> Price </span>
                  <span class="transition group-open:-rotate-180">
                    <ChevronDown class="h-4 w-4" />
                  </span>
                </summary>
                <div
                  class="z-20 group-open:absolute group-open:end-0 group-open:top-auto group-open:mt-2"
                >
                  <div class="w-96 rounded border border-gray-200 bg-white">
                    <div class="flex items-center justify-end p-4">
                      <button
                        type="button"
                        class="text-sm text-gray-900 underline underline-offset-4"
                        @click="resetPrice"
                      >
                        Reset
                      </button>
                    </div>
                    <div class="border-t border-gray-200 p-4">
                      <div class="flex justify-between gap-4">
                        <label for="min-price" class="flex items-center gap-2">
                          <span class="text-sm text-gray-600">PHP</span>
                          <Input
                            v-model="price.from"
                            type="number"
                            id="min-price"
                            placeholder="From"
                            class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                          />
                        </label>
                        <label for="max-price" class="flex items-center gap-2">
                          <span class="text-sm text-gray-600">PHP</span>
                          <Input
                            v-model="price.to"
                            type="number"
                            id="max-price"
                            placeholder="To"
                            class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
        <div class="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
          <template v-if="isLoading">
            <ProductSkeleton v-for="i in 8" :key="i" />
          </template>
          <template v-if="!isLoading && products.length">
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
          </template>
          <div v-else class="col-span-full py-16">
            <ArchiveX :size="64" class="mx-auto" />
            <p class="text-center text-2xl text-gray-500">No products found.</p>
          </div>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useProductsStore } from '@/stores/products';
import { useToast } from '@/components/ui/toast/use-toast';
import { ChevronDown, ArchiveX } from 'lucide-vue-next';

import BaseContainer from '@/components/ui/base/BaseContainer.vue';
import ProductCard from '@/components/products/ProductCard.vue';
import { Input } from '@/components/ui/input';
import ProductSkeleton from '@/components/products/ProductSkeleton.vue';

const productsStore = useProductsStore();
const categories = ref([]);
const products = ref([]);
const { toast } = useToast();
const search = ref('');
const selectedCategory = ref(null);
const price = reactive({ from: '', to: '' });
const isLoading = ref<boolean>(false);

const filters = computed(() => {
  return {
    search: search.value || null,
    category: selectedCategory.value,
    min_price: price.from || null,
    max_price: price.to || null,
  };
});

watch(filters, async () => {
  isLoading.value = true;
  await getProducts();
  isLoading.value = false;
});

onMounted(async () => {
  isLoading.value = true;
  await getCategories();
  await getProducts();
  isLoading.value = false;
});

async function getCategories() {
  try {
    await productsStore.getCategories();
    categories.value = productsStore.categories;
  } catch (error) {
    toast({
      title: 'Error',
      variant: 'destructive',
      description: error.message,
    });
  }
}

async function getProducts() {
  try {
    await productsStore.getProducts(filters.value);
    products.value = productsStore.products;
  } catch (error) {
    toast({
      title: 'Error',
      variant: 'destructive',
      description: error.message,
    });
  }
}

function resetPrice() {
  price.from = '';
  price.to = '';
}
</script>
