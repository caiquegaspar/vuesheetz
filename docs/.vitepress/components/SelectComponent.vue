<script setup>
defineProps({
  modelValue: [Number, String, Object, Function],
  options: Array,
  label: String,
  floatLabel: Boolean,
  disabled: Boolean
})
const emits = defineEmits(['update:modelValue'])

const selectOption = (option, idx) => emits('update:modelValue', option, idx)
</script>

<template>
  <div :class="['form_select', { disabled }]">
    <label class="select">
      <input v-if="!disabled" class="select_input" type="checkbox" />

      <div class="select_label">
        <template v-if="floatLabel">
          <span :class="{ float_label: !!modelValue }">
            {{ label || 'Select an option' }}
          </span>

          <span>
            <slot name="label" :label="modelValue"> {{ modelValue?.label || modelValue }} </slot>
          </span>
        </template>

        <span class="select_label" v-else>
          {{ modelValue?.label || modelValue || label || 'Select an option' }}
        </span>
      </div>

      <ul class="select_options">
        <li
          class="select_option"
          v-for="(option, idx) in options"
          :key="option"
          @click="selectOption(option, idx)"
        >
          {{ option.label || option }}
        </li>
      </ul>

      <svg class="select_icon" viewBox="0 0 490 490" width="14">
        <g transform="rotate(180)" style="transform-origin: center" fill="currentColor">
          <polygon
            points="0,332.668 245.004,82.631 490,332.668 413.507,407.369 245.004,235.402 76.493,407.369"
          />
        </g>
      </svg>
    </label>
  </div>
</template>

<style scoped>
.form_select {
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

.select {
  display: flex;
  justify-content: start;
  position: relative;
  width: 100%;
  min-height: 1.5rem;
  height: 100%;
  border-radius: 8px;
  border: 1px solid currentColor;
}

.select_input {
  display: none;
}

.select_label {
  display: flex;
  align-items: center;
  position: relative;
}

.select_label span {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0.5rem;
  pointer-events: none;
  opacity: 1;
  transition: all 0.3s;
}

span.float_label {
  font-size: 0.8rem;
  opacity: 0.5;
  top: -0.7rem;
  left: 0.1rem;
}

.hidden_label {
  display: none;
}

.select_options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  transform: translateY(-0.8rem);
  padding: 0;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
  list-style: none;
  background-color: #fff;
  border: 1px solid #cdcdcd;
  border-radius: 8px;
  color: #3c3c43;
  overflow: hidden;
  z-index: 999;
}

.select_option {
  margin: 0;
  padding: 0 10px;
  line-height: 1.7rem;
}

.select_option:hover {
  background-color: #2095f3;
  color: #fff;
}

.select_icon {
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  right: 0.5rem;
  transition: all 0.3s;
}

.select_input:checked ~ .select_options {
  opacity: 1;
  pointer-events: all;
}

.select_input:checked ~ .select_icon {
  transform: rotate(180deg);
}
</style>
