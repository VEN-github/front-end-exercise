<template>
  <section class="min-h-screen grid place-items-center">
    <BaseContainer>
      <Card class="mx-auto max-w-md shadow-sm">
        <CardHeader>
          <CardTitle class="text-xl"> Sign Up </CardTitle>
          <CardDescription> Enter your information to create an account </CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="onSubmit">
            <div class="grid gap-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="grid gap-2">
                  <Label for="first-name">First name</Label>
                  <Input v-model="models.firstName" id="first-name" placeholder="John" required />
                </div>
                <div class="grid gap-2">
                  <Label for="last-name">Last name</Label>
                  <Input v-model="models.lastName" id="last-name" placeholder="Doe" required />
                </div>
              </div>
              <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input
                  v-model="models.email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div class="grid gap-2">
                <Label for="password">Password</Label>
                <Input v-model="models.password" id="password" type="password" password />
              </div>
              <div class="grid gap-2">
                <Label for="confirm-password">Confirm Password</Label>
                <Input
                  v-model="models.confirmPassword"
                  id="confirm-password"
                  type="password"
                  password
                />
              </div>
              <Button type="submit" class="w-full" :disabled="isSubmitting">
                <LoaderCircle v-if="isSubmitting" class="w-5 h-5 animate-spin mr-2" />
                {{ isSubmitting ? 'Please wait...' : 'Create an account' }}
              </Button>
            </div>
          </form>
          <div class="mt-4 text-center text-sm">
            Already have an account?
            <RouterLink to="/login" class="underline">Login</RouterLink>
          </div>
        </CardContent>
      </Card>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useToast } from '@/components/ui/toast/use-toast';
import { useFirebaseAuth } from 'vuefire';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { LoaderCircle } from 'lucide-vue-next';

import BaseContainer from '@/components/ui/base/BaseContainer.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const auth = useFirebaseAuth();
const router = useRouter();
const models = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
});
const { toast } = useToast();
const isSubmitting = ref<boolean>(false);

async function onSubmit() {
  if (models.password !== models.confirmPassword) {
    toast({
      title: 'Error',
      variant: 'destructive',
      description: 'Password does not match.',
    });
    return;
  }

  isSubmitting.value = true;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      models.email,
      models.password
    );
    const user = userCredential.user;
    updateProfile(user, {
      displayName: `${models.firstName} ${models.lastName}`,
    });
    router.push('/');
  } catch (error) {
    toast({
      title: 'Error',
      variant: 'destructive',
      description: 'Something went wrong. Please try again.',
    });
  } finally {
    isSubmitting.value = false;
  }
}
</script>
