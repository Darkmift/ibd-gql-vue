<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss">
body,
html {
  @apply font-gordita m-0 flex h-full w-full bg-[theme(colors.background.white)] p-0;
}
main {
  @apply font-gordita mx-auto flex flex-col bg-[theme(colors.background.primary)] text-black;
}
</style>
