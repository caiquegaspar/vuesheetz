<script setup>
import { data } from './constants'

import VueSheetzComponent from './components/VueSheetzComponent.vue'
</script>

<template>
  <main>
    <VueSheetzComponent
      :data="data"
      height="90%"
      width="90%"
      :colSorting="true"
      :colWidths="[140, 192, 100, 90, 90, 110, 97, 100, 126, 100]"
      :colHeaders="[
        'Company name',
        'Name',
        'Sell date',
        'In stock',
        'Qty',
        'Progress',
        'Rating',
        'Order ID',
        'Country',
        'Value'
      ]"
      :colsAlignment="[
        'left',
        'left',
        'center',
        'center',
        'right',
        'center',
        'center',
        'left',
        'left',
        'center'
      ]"
      :colsFormat="[,,,'check',,,'rating',,,,]"
    />
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
