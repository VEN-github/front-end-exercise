<template>
  <header
    class="fixed top-0 left-0 w-full z-10 py-10 transition-transform duration-300"
    :class="[isShow ? 'translate-y-0' : '-translate-y-96']"
  >
    <BaseContainer>
      <div class="flex items-center justify-between">
        <RouterLink to="/" class="inline-flex items-center gap-2">
          <img src="@/assets/images/logo.svg" alt="Logo" />
          <p class="text-base font-semibold sm:text-3xl">
            Fake <span class="text-amber-600">Store</span>
          </p>
        </RouterLink>
        <div class="inline-flex items-center gap-8">
          <RouterLink to="/cart" class="relative">
            <ShoppingCart />
            <p
              class="absolute -top-1.5 -right-2.5 text-xs h-5 w-5 rounded-full bg-black flex items-center justify-center text-white"
            >
              0
            </p>
          </RouterLink>
          <Button>Login</Button>
        </div>
      </div>
    </BaseContainer>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import { ShoppingCart } from 'lucide-vue-next';

import BaseContainer from '@/components/ui/base/BaseContainer.vue';
import { Button } from '@/components/ui/button';

const isShow = ref<boolean>(true);
const lastScrollTop = ref<number>(0);
let timeout: undefined | number;

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function handleScroll() {
  clearTimeout(timeout);

  if (window.scrollY > lastScrollTop.value) {
    isShow.value = false;
  } else if (window.scrollY < lastScrollTop.value) {
    isShow.value = true;
  }
  lastScrollTop.value = window.scrollY <= 0 ? 0 : window.scrollY;

  timeout = setTimeout(() => {
    isShow.value = true;
  }, 500);
}
</script>
