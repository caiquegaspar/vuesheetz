<script setup>
import { ref } from 'vue'

import data from '../demo-data'

import RangeComponent from './RangeComponent.vue'
import ToggleComponent from './ToggleComponent.vue'
import SelectComponent from './SelectComponent.vue'
import InputComponent from './InputComponent.vue'
import NumberComponent from './NumberComponent.vue'

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
    'text',
    '##/##/####',
    'check',
    'text',
    'progress',
    'rating',
    'text',
    'text',
    (val) =>
      Number(val).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
  ]
}
const alignmentOptions = ['left', 'center', 'right']
const formatOptions = [
  { label: 'text', value: 'text' },
  { label: 'check', value: 'check' },
  { label: 'progress', value: 'progress' },
  { label: 'rating', value: 'rating' },
  {
    label: 'currency',
    value: (val) =>
      Number(val).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
  }
]

const formParams = ref(deepClone(defaultParams))
const headerIdx = ref(null)
const columnName = ref(null)

function deepClone(val) {
  return JSON.parse(JSON.stringify(val))
}

const toggleColConfig = () => {
  if (formParams.value.colHeaders) {
    formParams.value.colHeaders = null
    headerIdx.value = null

    queueMicrotask(() => columnName.value.resetValidation())

    return
  }

  formParams.value.colHeaders = deepClone(defaultParams.colHeaders)
}
</script>

<template>
  <div>
    <form class="spreadsheet_controls">
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

      <ToggleComponent v-model="formParams.colSorting">
        <template #label> Column Sorting </template>
      </ToggleComponent>

      <ToggleComponent :modelValue="!!formParams.colHeaders" @update:modelValue="toggleColConfig">
        <template #label> Custom Columns </template>
      </ToggleComponent>

      <SelectComponent
        :modelValue="formParams.colHeaders?.[headerIdx]"
        @update:modelValue="(_, idx) => (headerIdx = idx)"
        :options="formParams.colHeaders"
        label="Select a column"
        :disabled="!formParams.colHeaders"
      />
    </form>

    <div>Column Configuration:</div>

    <form class="header_controls">
      <InputComponent
        :modelValue="formParams.colHeaders?.[headerIdx]"
        @update:modelValue="(val) => (formParams.colHeaders[headerIdx] = val)"
        ref="columnName"
        label="Column Name"
        :disabled="headerIdx === null"
        :rules="[(val) => !!val || 'Field is required']"
        @onBlurError="
          () => (formParams.colHeaders[headerIdx] = defaultParams.colHeaders[headerIdx])
        "
      />

      <NumberComponent
        v-model="formParams.colWidths[headerIdx]"
        :min="0"
        :max="200"
        label="Column width"
        :disabled="headerIdx === null"
      />

      <SelectComponent
        v-model="formParams.colsAlignment[headerIdx]"
        :options="alignmentOptions"
        label="Alignment"
        floatLabel
        :disabled="headerIdx === null"
      />

      <SelectComponent
        :modelValue="formParams.colsFormat[headerIdx]"
        @update:modelValue="(format) => (formParams.colsFormat[headerIdx] = format.value)"
        :options="formatOptions"
        label="Format"
        floatLabel
        :disabled="headerIdx === null"
      >
        <template #label="modelValue">
          {{ typeof modelValue.label === 'function' ? 'currency' : modelValue.label }}
        </template>
      </SelectComponent>
    </form>

    <VueSheetzComponent v-bind="formParams" />
  </div>
</template>

<style scoped>
.spreadsheet_controls {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  margin: 30px 0;
  touch-action: none;
}

.header_controls {
  display: grid;
  gap: 1.9rem 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  margin: 30px 0;
  touch-action: none;
}
</style>
