<script setup>
defineProps({ modelValue: Boolean, disabled: Boolean })
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form_toggle" :class="{ disabled }">
    <div class="toggle_button">
      <input
        type="checkbox"
        class="toggle_checkbox"
        :checked="modelValue"
        @click="$emit('update:modelValue', !modelValue)"
      />
      
      <div class="toggle_knobs"></div>
      <div class="toggle_layer"></div>
    </div>

    <div class="toggle_title">
      <slot name="label"></slot>
    </div>
  </div>
</template>

<style scoped>
.form_toggle {
  display: flex;
  gap: 0.5rem;
  align-items: center;
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

.toggle_button {
  position: relative;
  width: 40px;
  height: 20px;
  overflow: hidden;
  border-radius: 100px;
}

.toggle_checkbox {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
}

.toggle_knobs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  transition: 0.3s ease all;
}

.toggle_layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #e6e6e6;
  transition: 0.3s ease all;
  z-index: 1;
}

.toggle_knobs:before {
  content: '';
  position: absolute;
  top: 10%;
  left: 6%;
  width: 40%;
  height: 80%;
  background-color: #fff;
  border-radius: 50%;
  transition: 0.3s ease all;
}

.toggle_checkbox:checked + .toggle_knobs:before {
  left: 55%;
  background-color: #fff;
}

.toggle_checkbox:checked ~ .toggle_layer {
  background-color: #2095f3;
}
</style>
