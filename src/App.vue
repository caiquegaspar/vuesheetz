<script setup>
import data from '../docs/.vitepress/demo-data'

// import { VueSheetzComponent } from 'vuesheetz';
// import 'vuesheetz/dist/style.css';

import { VueSheetzComponent } from '../lib/main'
</script>

<template>
  <main>
    <VueSheetzComponent
      :data="data"
      height="90%"
      width="90%"
      :colSorting="true"
      :colWidths="[140, 192, 100, 80, 60, 110, 97, 100, 126, 100]"
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
      :colsFormat="[
        'text',
        ,
        '##/##/####',
        'check',
        ,
        'progress',
        'rating',
        ,
        ,
        (val) =>
          Number(val).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })
      ]"
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
