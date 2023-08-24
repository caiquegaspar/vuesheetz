<script setup>
import { ref, watch } from 'vue'

const props = defineProps({ modelValue: String, label: String, rules: Array, disabled: Boolean })
const emits = defineEmits(['update:modelValue', 'onError', 'onBlurError'])

const inputError = ref(false)
const errorMsg = ref('')

const validateRules = (val, onError) => {
  const rulesArr = props.rules.map((rule) => rule(val))
  const found = rulesArr.find((item) => typeof item !== 'boolean')

  if (found) {
    errorMsg.value = found
    inputError.value = true

    if (onError) onError()

    return
  }

  inputError.value = false
}

const resetValidation = () => {
  inputError.value = false
  errorMsg.value = ''
}

const updateValue = ({ target: { value } }) => (
  validateRules(value, () => emits('onError')), emits('update:modelValue', value)
)

const blurInput = ({ target: { value } }) => {
  validateRules(value)

  if (inputError.value) emits('onBlurError')
}

watch(
  () => props.modelValue,
  (newVal) => validateRules(newVal)
)

defineExpose({ resetValidation })
</script>

<template>
  <div :class="['form_input', { disabled, input_error: inputError }]">
    <label class="input">
      <input
        class="input_area"
        type="text"
        :value="modelValue"
        required
        @input="updateValue"
        @blur="blurInput"
      />

      <span class="input_placeholder"> {{ label }} </span>

      <span :class="['input_warning', { active_warning: inputError }]"> {{ errorMsg }} </span>

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

.input_error {
  color: #c10015;
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
  padding: 0 0 0.3rem;
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
  transition: all 0.4s;
}

.input_warning {
  position: absolute;
  pointer-events: none;
  top: 50%;
  transform: translateY(-50%);
  left: 0.1rem;
  opacity: 0;
  font-size: 0.8rem;
  transition: all 0.3s;
}

.active_warning {
  transform: translateY(60%);
  opacity: 1;
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
