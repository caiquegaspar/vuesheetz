<script setup>
import { ref } from 'vue'

import data from '../demo-data'

import RangeComponent from './RangeComponent.vue'
import ToggleComponent from './ToggleComponent.vue'

const defaultParams = {
  data: data,
  height: '400px',
  width: '100%',
  colSorting: true,
  colWidths: [140, 192, 100, 80, 60, 110, 97, 100, 126, 100],
  colHeaders: [
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
  ],
  colsAlignment: [
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
  ],
  colsFormat: [
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
  ]
}

const formParams = ref(defaultParams)
</script>

<template>
  <div>
    <form class="controller_btns">
      <ToggleComponent v-model="formParams.colSorting">
        <template #label> Column Sorting </template>
      </ToggleComponent>

      <RangeComponent
        :modelValue="parseFloat(formParams.width)"
        @update:modelValue="(newValue) => (formParams.width = `${newValue}%`)"
        :min="0"
        :max="100"
      >
        <template #label="{ modelValue }"> Width {{ parseFloat(modelValue) }}% </template>
      </RangeComponent>

      <RangeComponent
        :modelValue="parseFloat(formParams.height)"
        @update:modelValue="(newValue) => (formParams.height = `${newValue}px`)"
        :min="0"
        :max="500"
      >
        <template #label="{ modelValue }"> Height {{ parseFloat(modelValue) }}px </template>
      </RangeComponent>
    </form>

    <VueSheetzComponent v-bind="formParams" />
  </div>
</template>

<style scoped>
.controller_btns {
  width: 100%;
  display: flex;
  gap: 15px;
  margin: 20px 0;
}
</style>
