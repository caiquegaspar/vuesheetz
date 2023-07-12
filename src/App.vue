<script setup>
import SpreadsheetLike from './components/SpreadsheetLike.vue'

const data = Array(100)
  .fill(null)
  .map((_, row) =>
    Array(26)
      .fill(null)
      .map((_, column) => `${row}, ${column}`)
  )
</script>

<template>
  <main>
    <SpreadsheetLike :data="data" />
  </main>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
