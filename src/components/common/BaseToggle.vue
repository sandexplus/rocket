<template>
  <q-toggle
    v-model="_modelValue"
    class="toggle"
    dense
    color="light_grey"
    icon-color="white"
  >
    <span class="text-toggle_text_grey tw-text-[14px] text-bold">{{ label.toUpperCase() }}</span>
  </q-toggle>
</template>

<script setup lang="ts">
import {useVModel} from '@vueuse/core';

const props = defineProps<{
  modelValue: boolean
  label: string
}>()
const emits = defineEmits(['update:modelValue'])

const _modelValue = useVModel(props, 'modelValue', emits)
</script>

<style lang="scss">
.toggle {
  & .q-toggle__thumb {
    width: 7px;
    height: 7px;
    top: 6px;
    color: #858CAB !important;
  }

  & .q-toggle__inner {
    width: 17px !important;
    min-width: 17px !important;
  }

  & .q-toggle__inner.q-toggle__inner--truthy .q-toggle__thumb {
    left: 0.2em !important;
  }

  & .q-toggle__track {
    width: 17px;
    height: 13px;
  }

  & .q-toggle__label {
    padding-left: 6px !important;
  }
}
</style>
