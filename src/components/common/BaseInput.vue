<template>
  <q-input
    v-model.number="_modelValue"
    outlined
    input-class="number-input"
    class="input"
    color="input_black"
    bg-color="input_black"
    hide-bottom-space
  />
</template>

<script setup lang="ts">
import {useVModel} from '@vueuse/core';

const props = defineProps<{
  modelValue: string | number
  fontSize: string
}>()
const emits = defineEmits(['update:modelValue'])

const _modelValue = useVModel(props, 'modelValue', emits)
</script>

<style lang="scss">
.number-input::-webkit-outer-spin-button,
.number-input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

.number-input[type=number] {
  -moz-appearance:textfield; /* Firefox */
}

.number-input {
  color: white;
  font-size: v-bind('props.fontSize');
}

.input {
  & .q-field__prefix {
    color: white;
    padding-right: 0;
  }
}
</style>
