<template>
  <section v-if="isLoading" class="h-screen grid place-items-center">
    <LoaderCircle class="animate-spin w-16 h-16" />
  </section>
  <template v-else>
    <section class="pt-44 pb-8">
      <BaseContainer>
        <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <div class="flex flex-col-reverse">
            <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <div class="grid grid-cols-4 gap-6">
                <button
                  v-for="image in product?.images"
                  :key="image"
                  class="relative flex h-32 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none"
                  :class="selectedImage === image ? 'ring-2 ring-slate-900' : 'ring-transparent'"
                  role="tab"
                  type="button"
                  @click="selectedImage = image"
                >
                  <span class="absolute inset-0 overflow-hidden rounded-md">
                    <img
                      :src="image"
                      :alt="product?.title"
                      class="h-full w-full object-cover object-center"
                    />
                  </span>
                </button>
              </div>
            </div>
            <div class="aspect-h-1 aspect-w-1 w-full">
              <div>
                <img
                  :src="selectedImage"
                  :alt="product?.title"
                  class="h-full w-full object-cover object-center sm:rounded-lg"
                />
              </div>
            </div>
          </div>
          <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ product?.title }}</h1>
            <div class="mt-3">
              <p class="text-3xl tracking-tight text-gray-900">{{ price }}</p>
            </div>
            <div class="mt-10 flex items-center gap-6">
              <TooltipProvider v-if="!user">
                <Tooltip>
                  <TooltipTrigger>
                    <Button class="text-base h-12 px-16" @click="addToCart">
                      <ShoppingCart class="mr-4" />
                      Add to Cart
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Please login to add product to cart</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button v-else class="text-base h-12 px-16" @click="addToCart">
                <ShoppingCart class="mr-4" />
                Add to Cart
              </Button>
              <Button variant="ghost" size="icon">
                <Heart />
              </Button>
            </div>
            <div class="mt-6">
              <div class="space-y-6 text-base text-gray-700">
                <p>{{ product?.description }}</p>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi labore
                  doloribus alias ad placeat, quis aperiam enim temporibus, deserunt vitae quibusdam
                  eos laudantium commodi iure. Tempore reprehenderit dolore facilis officiis
                  dolorem, minima saepe quos, eligendi debitis impedit unde! Illum, id!
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad itaque soluta,
                  voluptates libero, consectetur est illo esse alias in laborum at? Quam ducimus
                  repellendus odit deleniti dolorem dolore molestiae repudiandae laborum, doloribus
                  sapiente tempore culpa. Eveniet molestiae rem ea. Temporibus totam ipsam et ipsum,
                  quam nemo numquam! Porro quis hic ab soluta sit, dolores perspiciatis maiores
                  iure? Fugit, rem dicta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </BaseContainer>
    </section>
    <section class="mt-10 pb-16">
      <BaseContainer>
        <div class="border-t pt-12 border-gray-200">
          <h2 class="text-xl font-bold text-gray-900">Related Products</h2>
          <div
            class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          >
            <ProductCard
              v-for="relatedProduct in relatedProducts"
              :key="relatedProduct.id"
              :product="relatedProduct"
            />
          </div>
        </div>
      </BaseContainer>
    </section>
  </template>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useProductsStore } from '@/stores/products';
import { useToast } from '@/components/ui/toast/use-toast';
import { ShoppingCart, Heart, LoaderCircle } from 'lucide-vue-next';
import { useCurrentUser } from 'vuefire';

import BaseContainer from '@/components/ui/base/BaseContainer.vue';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/products/ProductCard.vue';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const props = defineProps<{
  id: string;
}>();

const user = useCurrentUser();
const productsStore = useProductsStore();
const { toast } = useToast();
const product = ref(null);
const relatedProducts = ref([]);
const selectedImage = ref(null);
const isLoading = ref<boolean>(false);

const price = computed(() => {
  return product.value
    ? new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
      }).format(product.value?.price)
    : null;
});

watch(
  () => props.id,
  async () => {
    await getProduct();
  }
);

onMounted(async () => {
  await getProduct();
});

async function getProduct() {
  isLoading.value = true;
  try {
    await productsStore.getProduct(props.id);
    product.value = productsStore.product;
    relatedProducts.value = productsStore.relatedProducts;
    selectedImage.value = product.value?.images[0];
  } catch (error) {
    toast({
      title: 'Error',
      variant: 'destructive',
      description: error.message,
    });
  } finally {
    isLoading.value = false;
  }
}

function addToCart() {
  if (user.value === null) {
    toast({
      description: 'Please login to add product to cart',
    });
    return;
  }
}
</script>
