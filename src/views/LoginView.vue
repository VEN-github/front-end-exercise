<template>
  <section class="min-h-screen grid place-items-center">
    <BaseContainer>
      <Card class="mx-auto max-w-md shadow-sm">
        <CardHeader>
          <CardTitle class="text-2xl"> Login </CardTitle>
          <CardDescription> Enter your email below to login to your account </CardDescription>
        </CardHeader>
        <CardContent>
          <form action="">
            <div class="grid gap-4">
              <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" required />
              </div>
              <div class="grid gap-2">
                <Label for="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" class="w-full"> Login </Button>
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
import { RouterLink } from 'vue-router';

import BaseContainer from '@/components/ui/base/BaseContainer.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
</script>
