<template>
  <section class="pt-44 pb-16">
    <BaseContainer>
      <h1 class="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Shopping Cart
      </h1>
      <div class="mt-12 max-w-3xl mx-auto">
        <ul role="list" class="divide-y divide-gray-200 border-b border-t border-gray-200">
          <CartItem v-for="cart in filteredCartCollection" :key="cart.id" :cart="cart" />
        </ul>
        <div class="mt-10">
          <div class="flex items-center justify-between">
            <p class="text-base font-medium text-gray-900">Subtotal</p>
            <p class="ml-4 text-base font-medium text-gray-900">{{ total }}</p>
          </div>
          <div class="mt-10">
            <Button class="w-full py-6 text-base">Checkout</Button>
          </div>

          <div class="mt-6 text-center text-sm text-gray-500">
            <p>
              or
              <RouterLink to="/" class="font-medium inline-flex items-center gap-2 hover:underline">
                Continue Shopping
                <MoveRight :size="12" />
              </RouterLink>
            </p>
          </div>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useFirestore, useCollection, useCurrentUser } from 'vuefire';
import { collection } from 'firebase/firestore';

import CartItem from '@/components/cart/CartItem.vue';
import BaseContainer from '@/components/ui/base/BaseContainer.vue';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-vue-next';

const db = useFirestore();
const user = useCurrentUser();

const myCartCollection = useCollection(collection(db, 'cart'));

const filteredCartCollection = computed(() => {
  return myCartCollection.value?.filter(cart => cart.user_id === user.value?.uid);
});

const total = computed(() => {
  const totalPrice = filteredCartCollection.value?.reduce(
    (acc, cart) => acc + cart.price * cart.quantity,
    0
  );

  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(totalPrice);
});
</script>
