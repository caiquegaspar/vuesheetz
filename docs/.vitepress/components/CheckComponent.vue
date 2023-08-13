<script setup>
defineProps({ modelValue: Boolean })
defineEmits(['update:modelValue'])
</script>

<template>
  <label class="form_check">
    <input
      type="checkbox"
      class="form_checkbox"
      :checked="modelValue"
      @input="$emit('update:modelValue', !modelValue)"
    />

    <span>
      <slot name="label"></slot>
    </span>
  </label>
</template>

<style scoped>
.form_check {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  white-space: nowrap;
  user-select: none;
}

.form_checkbox {
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #d9d9d9;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
}

.form_checkbox::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 0 0 calc(20px / 2.5) #1677ff;
  border-radius: inherit;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
}

.form_checkbox::before {
  top: 40%;
  left: 50%;
  content: '';
  position: absolute;
  width: 4px;
  height: 7px;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: translate(-50%, -50%) rotate(45deg) scale(0);
  opacity: 0;
  transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
}

.form_checkbox:hover {
  border-color: #1677ff;
}

.form_checkbox:checked {
  background: #1677ff;
  border-color: transparent;
}

.form_checkbox:checked::before {
  opacity: 1;
  transform: translate(-50%, -50%) rotate(45deg) scale(1.2);
  transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
}

.form_checkbox:active:not(:checked)::after {
  box-shadow: none;
  transition: none;
  opacity: 1;
}
</style>
