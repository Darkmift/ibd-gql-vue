<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="main">
    <RouterView />
  </main>
</template>

<style lang="scss">
.main {
  padding: 0 5vw;
  color: $textColorBlack;
  display: flex;
  flex-direction: column;
}
</style>
