<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="main container">
    <RouterView />
  </main>
</template>

<style lang="scss">
.main {
  color: $textColorBlack;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
