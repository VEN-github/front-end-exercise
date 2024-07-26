<template>
  <section class="min-h-screen grid place-items-center">
    <BaseContainer>
      <Card class="mx-auto max-w-md shadow-sm">
        <CardHeader>
          <CardTitle class="text-xl"> Sign Up </CardTitle>
          <CardDescription> Enter your information to create an account </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div class="grid gap-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="grid gap-2">
                  <Label for="first-name">First name</Label>
                  <Input id="first-name" placeholder="John" required />
                </div>
                <div class="grid gap-2">
                  <Label for="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Doe" required />
                </div>
              </div>
              <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div class="grid gap-2">
                <Label for="password">Password</Label>
                <Input id="password" type="password" password />
              </div>
              <div class="grid gap-2">
                <Label for="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" password />
              </div>
              <Button type="submit" class="w-full"> Create an account </Button>
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
import { RouterLink } from 'vue-router';

import BaseContainer from '@/components/ui/base/BaseContainer.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
</script>
