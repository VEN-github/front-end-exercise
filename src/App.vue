<script setup lang="ts">
import { RouterView } from 'vue-router';

import AppHeader from '@/layouts/AppHeader.vue';
import AppFooter from '@/layouts/AppFooter.vue';
import Toaster from '@/components/ui/toast/Toaster.vue';
</script>

<template>
  <AppHeader />
  <main>
    <RouterView />
  </main>
  <AppFooter />
  <Toaster />
</template>
