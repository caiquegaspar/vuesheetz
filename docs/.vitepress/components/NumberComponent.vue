<script setup>
defineProps({
  modelValue: { type: Number, default: 0 },
  min: Number,
  max: Number,
  label: String,
  disabled: Boolean
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form_number" :class="{ disabled }">
    <div class="number_btn">
      <svg width="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 12L18 12"
          stroke="#444"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <div class="number_input">
      <input
        type="number"
        :min="min"
        :max="max"
        step="1"
        :value="modelValue"
        @input="$emit('update:modelValue', ~~$event.target.value)"
      />
    </div>

    <div class="number_btn">
      <svg width="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 12H20M12 4V20"
          stroke="#444"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <div class="number_label">
      <span>
        {{ label }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.form_number {
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);
  position: relative;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(116, 116, 116, 0.25);
  user-select: none;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.disabled * {
  pointer-events: none;
}

.number_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  color: #444;
}

.number_input {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #444;
}

.number_input input {
  font-size: 1rem;
  text-align: center;
}

.number_input input:focus {
  outline: 0;
  box-shadow: 0px;
}

input[type='number'] {
  appearance: textfield;
  -moz-appearance: textfield;
}

.number_label {
  position: absolute;
  pointer-events: none;
  top: -0.7rem;
  transform: translateY(-50%);
  left: 0.1rem;
  opacity: 0.5;
  font-size: 0.8rem;
  transition: all 0.3s;
}
</style>
