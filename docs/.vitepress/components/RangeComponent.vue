<script setup>
const props = defineProps({
  modelValue: Number,
  min: Number,
  max: Number,
  disabled: Boolean
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form_range" :class="{ disabled }">
    <input
      type="range"
      :value="modelValue"
      :min="min"
      :max="max"
      class="form_slider"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    
    <div class="form_output">
      <slot name="label" v-bind="props"> {{ modelValue }} </slot>
    </div>
  </div>
</template>

<style scoped>
.form_range {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  user-select: none;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.disabled * {
  pointer-events: none;
}

input[type='range'] {
  /* removing default appearance */
  -webkit-appearance: none;
  appearance: none;
  /* creating a custom design */
  width: 100%;
  cursor: pointer;
  outline: none;
  /*  slider progress trick  */
  overflow: hidden;
  border-radius: 16px;
}

/* Track: webkit browsers */
input[type='range']::-webkit-slider-runnable-track {
  height: 20px;
  background: #ccc;
  border-radius: 16px;
}

/* Track: Mozilla Firefox */
input[type='range']::-moz-range-track {
  height: 20px;
  background: #ccc;
  border-radius: 16px;
}

/* Thumb: webkit */
input[type='range']::-webkit-slider-thumb {
  /* removing default appearance */
  -webkit-appearance: none;
  appearance: none;
  /* creating a custom design */
  height: 20px;
  width: 20px;
  background-color: #fff;
  border-radius: 50%;
  border: 2px solid #2095f3;
  /*  slider progress trick  */
  box-shadow: -410px 0 0 400px #2095f3;
}

/* Thumb: Firefox */
input[type='range']::-moz-range-thumb {
  height: 20px;
  width: 20px;
  background-color: #fff;
  border-radius: 50%;
  border: 2px solid #2095f3;
  /*  slider progress trick  */
  box-shadow: -410px 0 0 400px #2095f3;
}
</style>
