<script setup>
import SpreadsheetLike from './components/SpreadsheetLike.vue'

const data = Array(10)
  .fill(null)
  .map((_, row) =>
    Array(10)
      .fill(null)
      .map((_, column) => `${row + 1}, ${String.fromCharCode(column + 65)}`)
  )
</script>

<template>
  <main>
    <SpreadsheetLike :data="data" height="90%" width="90%" />
  </main>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
