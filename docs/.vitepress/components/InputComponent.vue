<script setup>
defineProps({ modelValue: String, disabled: Boolean })
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form_input" :class="{ disabled }">
    <label class="input">
      <input
        class="input_area"
        type="text"
        :value="modelValue"
        required
        @input="$emit('update:modelValue', $event.target.value)"
      />

      <span class="input_placeholder"> Column Name </span>

      <span class="focus_border"></span>
    </label>
  </div>
</template>

<style scoped>
:focus {
  outline: none;
}

.form_input {
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

.input {
  position: relative;
  width: 100%;
}

.input_area {
  color: currentColor;
  width: 100%;
  font-size: 1rem;
  border: 0;
  padding: 0 0 .3rem;
  border-bottom: 1px solid currentColor;
}

.input_placeholder {
  position: absolute;
  pointer-events: none;
  top: 50%;
  transform: translateY(-50%);
  left: 0.1rem;
  opacity: 0.5;
  font-size: 0.8rem;
  transition: all 0.3s;
}

.focus_border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #2095f3;
  transition: all 0.4s;
}

.input_area:focus ~ .input_placeholder {
  top: -0.7rem;
}

.input_area:valid ~ .input_placeholder {
  top: -0.7rem;
}

.input_area:focus ~ .focus_border {
  width: 100%;
}
</style>
