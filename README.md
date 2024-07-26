# Front-End Exercise

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Tech Stack

- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn-vue](https://www.shadcn-vue.com/)
- [VueFire](https://vuefire.vuejs.org/)
- [Firebase](https://firebase.google.com/)
- [Axios](https://axios-http.com/docs/intro)
- [Lucide Icon](https://lucide.dev/)

## Project Setup

### Clone the project

```bash
git clone https://github.com/VEN-github/front-end-exercise.git
```

### Go to the project directory

```bash
cd front-end-exercise
```

### Copy the `.env.example` and named it `.env`.

> This contains the environment variables such as **API Endpoint**, **API Key**, and **API Access Token** from [Firebase](https://firebase.google.com/) & [Platzi Fake Store API](https://fakeapi.platzi.com/).

```terminal
cp .env.example .env
```

### Install dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
