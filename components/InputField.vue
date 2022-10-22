<script setup>
import { useField } from 'vee-validate'

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  value: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
})

const name = toRef(props, 'name')
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(name, undefined, {
  initialValue: props.value,
})
</script>

<template>
  <div class="form-control">
    <label class="label label-text text-accent" :for="name">{{ label }}</label>
    <input
      :id="name"
      class="input input-bordered"
      :name="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    >
    <div v-show="errorMessage" class="tooltip tooltip-open tooltip-bottom tooltip-error" :data-tip="errorMessage" />
  </div>
</template>

<style scoped></style>
