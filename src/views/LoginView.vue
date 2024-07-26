<template>
  <section class="min-h-screen grid place-items-center">
    <BaseContainer>
      <Card class="mx-auto max-w-md shadow-sm">
        <CardHeader>
          <CardTitle class="text-2xl"> Login </CardTitle>
          <CardDescription> Enter your email below to login to your account </CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="login">
            <div class="grid gap-4">
              <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input
                  v-model="models.email"
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div class="grid gap-2">
                <Label for="password">Password</Label>
                <Input v-model="models.password" id="password" type="password" required />
              </div>
              <Button type="submit" class="w-full" :disabled="isSubmitting">
                <LoaderCircle v-if="isSubmitting" class="w-5 h-5 animate-spin mr-2" />
                {{ isSubmitting ? 'Please wait...' : 'Login' }}
              </Button>
            </div>
          </form>
          <div class="mt-4 text-center text-sm">
            Don't have an account?
            <RouterLink to="/sign-up" class="underline">Sign up</RouterLink>
          </div>
        </CardContent>
      </Card>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useFirebaseAuth } from 'vuefire';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { LoaderCircle } from 'lucide-vue-next';
import { useToast } from '@/components/ui/toast/use-toast';

import BaseContainer from '@/components/ui/base/BaseContainer.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const auth = useFirebaseAuth();
const router = useRouter();
const models = reactive({
  email: '',
  password: '',
});
const { toast } = useToast();
const isSubmitting = ref<boolean>(false);

async function login() {
  isSubmitting.value = true;
  try {
    await signInWithEmailAndPassword(auth, models.email, models.password);
    router.push('/');
  } catch (error) {
    let message = '';
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/invalid-credential') {
        message = 'Email or password is incorrect.';
      } else if (error.code === 'auth/user-not-found') {
        message = 'User not found.';
      } else {
        message = error.message;
      }
    } else {
      message = 'An unknown error occurred.';
    }

    toast({
      title: 'Error',
      variant: 'destructive',
      description: message,
    });
  } finally {
    isSubmitting.value = false;
  }
}
</script>
