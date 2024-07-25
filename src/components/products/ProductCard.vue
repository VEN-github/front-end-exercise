<template>
  <div>
    <RouterLink
      to="/"
      class="group relative mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3"
    >
      <img
        :src="highlightedImage"
        loading="lazy"
        :alt="product.title"
        class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
      />
    </RouterLink>
    <div class="flex items-start justify-between gap-2 px-2">
      <div class="flex flex-col">
        <RouterLink
          to="/"
          :title="product.title"
          class="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 line-clamp-2"
          >{{ product.title }}</RouterLink
        >
      </div>
      <div class="flex flex-col items-end">
        <span class="font-bold text-gray-600 lg:text-lg">{{ price }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const highlightedImage = computed(() => {
  return props.product?.images?.length
    ? props.product.images[0]
    : 'https://placehold.co/185x280?text=' + encodeURIComponent('No\nImage\nAvailable');
});

const price = computed(() => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(props.product.price);
});
</script>
