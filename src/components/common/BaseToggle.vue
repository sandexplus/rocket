<template>
  <q-toggle
    v-model="_modelValue"
    class="toggle"
    dense
  >
    <span class="text-white tw-text-[17px] text-bold">{{ label }}</span>
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
    width: 15px;
    height: 15px;
    top: 4px;
    color: #13151D !important;
  }

  & .q-toggle__inner {
    width: 31px !important;
    min-width: 17px !important;
  }

  & .q-toggle__inner.q-toggle__inner--truthy .q-toggle__thumb {
    left: 15px !important;
  }

  & .q-toggle__track {
    width: 31px;
    height: 17px;
    background: linear-gradient(180deg, #F88A25 0%, #FAB42D 50.52%, #F8B025 100%) !important;
    opacity: 1 !important;
  }

  & .q-toggle__label {
    padding-top: 4px;
    padding-left: 8px !important;
  }
}
</style>
