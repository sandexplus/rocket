<template>
  <div>
    <q-input
      v-model.number="_modelValue"
      outlined
      input-class="number-input"
      class="input"
      color="input_black"
      bg-color="input_black"
      hide-bottom-space
      borderless
    >
      <template #prepend>
        <q-btn
          :disable="_modelValue === 0"
          color="dark"
          @click="_modelValue--"
        >
          <span class="tw-text-[24px]">-</span>
        </q-btn>
      </template>
      <template #append>
        <q-btn
          color="dark"
          @click="_modelValue++"
        >
          <span class="tw-text-[24px]">+</span>
        </q-btn>
      </template>
    </q-input>
    <div v-if="buttons" class="tw-flex tw-gap-2 tw-justify-between tw-bg-[#13151D] tw-p-3">
      <q-btn
        v-for="button in addButtons"
        :key="button"
        dense
        color="dark"
        unelevated
        @click="addBetMoney(button)"
      >
        <span class="button-add">+{{ button }}</span>
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useVModel} from '@vueuse/core';
import {ref} from 'vue';
import {useGameStore} from 'stores/game.store';

const props = defineProps<{
  modelValue: number
  fontSize: string
  buttons?: boolean
}>()
const emits = defineEmits(['update:modelValue'])

const _modelValue = useVModel(props, 'modelValue', emits)
const gameStore = useGameStore()

const addButtons = ref([10, 50, 100, 200])

const addBetMoney = (sum: number) => {
  if (!gameStore.bet) gameStore.bet = 0

  if (sum !== 0) {
    gameStore.bet += sum

    if (gameStore.bet > gameStore.balance) {
      gameStore.bet = gameStore.balance
    }

    return
  }

  gameStore.bet = gameStore.balance
}
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
  & .q-field__control {
    align-items: center;
    height: 55px !important;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;

    &:before {
      border: none !important;
    }
  }

  & .q-field__prefix {
    color: white;
    font-size: 20px;
    padding-right: 0;
  }
}

.button-add {
  font-size: 16px;
  background: linear-gradient(180deg, #F88A25 0%, #FAB42D 50.52%, #F8B025 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
