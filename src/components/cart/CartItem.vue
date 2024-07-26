<template>
  <li class="flex py-6">
    <div class="flex-shrink-0">
      <img
        :src="cart.images[0]"
        :alt="cart.title"
        class="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
      />
    </div>
    <div class="ml-4 flex flex-1 flex-col sm:ml-6">
      <div>
        <div class="flex justify-between">
          <h4 class="text-sm">
            <RouterLink
              :to="`/products/${slug}/${cart.product_id}`"
              class="font-medium text-gray-700 hover:text-gray-800"
              >{{ cart.title }}</RouterLink
            >
          </h4>
          <p class="ml-4 text-sm font-medium text-gray-900">{{ price }}</p>
        </div>
        <div class="mt-1 text-sm max-w-xs line-clamp-3 text-gray-500">
          {{ cart.description }}
        </div>
      </div>
      <div class="mt-4 flex flex-1 items-end justify-between">
        <div class="flex items-center gap-1">
          <Button variant="outline" size="icon" class="h-8 w-8" @click="decreaseQuantity">
            <Minus class="w-4 h-4" />
          </Button>
          <input :value="quantity" class="w-12 h-8 pointer-events-none text-center sm:text-sm" />
          <Button variant="outline" size="icon" class="h-8 w-8" @click="increaseQuantity">
            <Plus class="w-4 h-4" />
          </Button>
        </div>
        <div class="ml-4">
          <button
            type="button"
            class="text-sm font-medium text-red-500 hover:text-red-300"
            @click="removeItem"
          >
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useCurrentUser, useFirestore, useCollection } from 'vuefire';
import { collection, updateDoc, doc, deleteDoc } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-vue-next';

const props = defineProps({
  cart: {
    type: Object,
    required: true,
  },
});

const db = useFirestore();
const user = useCurrentUser();
const quantity = ref<number>(1);

const slug = computed(() => {
  return props.cart?.title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '');
});

const price = computed(() => {
  return props.cart
    ? new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
      }).format(props.cart?.price)
    : null;
});

const myCartCollection = useCollection(collection(db, 'cart'));

const selectedProductInCart = computed(() => {
  if (myCartCollection.value) {
    return myCartCollection.value?.find(
      cart => cart.product_id == props.cart.product_id && cart.user_id == user.value?.uid
    );
  }

  return null;
});

watch(quantity, () => {
  updateQuantity();
});

onMounted(() => {
  quantity.value = props.cart?.quantity;
});

function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}

function increaseQuantity() {
  quantity.value++;
}

async function updateQuantity() {
  if (selectedProductInCart.value) {
    await updateDoc(doc(db, 'cart', selectedProductInCart.value.id), {
      quantity: quantity.value,
    });
  }
}

async function removeItem() {
  if (selectedProductInCart.value) {
    await deleteDoc(doc(db, 'cart', selectedProductInCart.value.id));
  }
}
</script>
