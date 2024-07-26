<template>
  <header
    class="fixed top-0 left-0 w-full bg-white shadow-sm z-50 py-8 transition-transform duration-300"
    :class="[isShow ? 'translate-y-0' : '-translate-y-96']"
  >
    <BaseContainer>
      <div class="flex items-center justify-between">
        <RouterLink to="/" class="inline-flex items-center gap-2">
          <img src="@/assets/images/logo.svg" alt="Logo" />
          <p class="text-base font-semibold sm:text-3xl">
            Fake<span class="text-amber-600">Store</span>
          </p>
        </RouterLink>
        <div class="inline-flex items-center" :class="[user ? 'gap-6' : 'gap-4']">
          <TooltipProvider v-if="!user">
            <Tooltip>
              <TooltipTrigger
                ><p><ShoppingCart /></p
              ></TooltipTrigger>
              <TooltipContent>
                <p>Please login to view cart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <RouterLink v-else to="/cart" class="relative">
            <ShoppingCart />
            <p
              class="absolute -top-1.5 -right-2.5 text-xs h-5 w-5 rounded-full bg-black flex items-center justify-center text-white"
            >
              {{ cartCount }}
            </p>
          </RouterLink>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div v-if="user" class="flex items-center gap-2">
                {{ user.displayName }}<ChevronDown class="h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem class="cursor-pointer" @click="logout">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button v-if="!user" @click="onNavigate">Login</Button>
        </div>
      </div>
    </BaseContainer>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { ShoppingCart, ChevronDown } from 'lucide-vue-next';
import { FirebaseError } from 'firebase/app';
import { signOut } from 'firebase/auth';
import { useFirebaseAuth, useCurrentUser, useFirestore, useCollection } from 'vuefire';
import { useToast } from '@/components/ui/toast/use-toast';
import { collection } from 'firebase/firestore';

import BaseContainer from '@/components/ui/base/BaseContainer.vue';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const db = useFirestore();
const auth = useFirebaseAuth();
const user = useCurrentUser();
const { toast } = useToast();
const router = useRouter();
const isShow = ref<boolean>(true);
const lastScrollTop = ref<number>(0);
let timeout: undefined | number;

const myCartCollection = useCollection(collection(db, 'cart'));

const filteredCartCollection = computed(() => {
  return myCartCollection.value?.filter(cart => cart.user_id === user.value?.uid);
});

const cartCount = computed(() => {
  return filteredCartCollection.value?.reduce((total, cart) => total + cart.quantity, 0);
});

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

function onNavigate() {
  router.push('/login');
}

async function logout() {
  try {
    await signOut(auth);
    router.push('/login');
  } catch (error) {
    let errorMessage = 'An unknown error occurred.';

    if (error instanceof FirebaseError) {
      errorMessage = error.message;
    } else {
      errorMessage = error.message;
    }

    toast({ title: 'Error', description: errorMessage, variant: 'destructive' });
  }
}
</script>
