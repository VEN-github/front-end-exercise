<template>
  <footer class="self-end py-8">
    <BaseContainer>
      <div class="flex items-center justify-center gap-x-1 text-custom-foreground">
        <Copyright :size="18" />
        <p class="text-sm sm:text-lg">
          2024&nbsp;<RouterLink to="/" class="font-medium tracking-tighter sm:text-xl"
            >Fake <span class="text-amber-600">Store</span></RouterLink
          >. All rights reserved.
        </p>
      </div>
    </BaseContainer>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

import BaseContainer from '@/components/ui/base/BaseContainer.vue';
import { Copyright } from 'lucide-vue-next';
</script>
