<script lang="ts" setup>
import GraphComponent from '@/components/GraphComponent.vue'
import TableComponent from '@/components/TableComponent.vue'
</script>
<template>
  <div class="container">
    <h1>Builds</h1>
    <GraphComponent />
    <TableComponent />
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 26px;
}
</style>
