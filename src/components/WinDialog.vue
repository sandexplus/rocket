<template>
  <q-dialog v-model="_modelValue">
    <q-card class="tw-relative !tw-max-w-none tw-w-[800px] tw-py-[60px] !tw-overflow-visible tw-flex tw-flex-col tw-items-center modal">
      <div class="font-helvard tw-absolute tw-w-full tw-h-full tw-top-0 tw-left-0 tw-z-[0]">
        <img src="~assets/promo-bg.png" alt="" class="tw-w-full tw-h-full tw-object-cover tw-rounded-[31px] bg-win">
      </div>
      <div class="font-helvard tw-absolute tw-right-0 tw-bottom-0 tw-pointer-events-none tw-select-none coins tw-z-1">
        <img src="~assets/flying%20coins.png">
      </div>
      <div class="font-helvard tw-mb-8 tw-uppercase text-white tw-text-[24px] text-center text tw-z-1 tw-relative">Вы выиграли максимальный бонус к пополнению по  промокоду </div>
      <div class="font-helvard tw-px-3 promo tw-mb-3 tw-z-1 tw-relative" v-if="gameStore.promo">
        <div class="font-helvard tw-font-extrabold tw-text-[80px] text-white promo-text">{{ gameStore.promo }}</div>
      </div>
      <div class="font-helvard tw-flex tw-items-center tw-mb-6 tw-gap-1 timer-container tw-z-1 tw-relative">
        <span class="font-helvard tw-uppercase text-white tw-text-[16px] text-mini">время на активацию:</span>
        <span ref="timerRef" class="font-elliot timer text-white tw-text-[34px] tw-p-1 tw-bg-[#1F1F1F]">15:00</span>
      </div>
      <q-btn
        no-caps
        class="button"
        :href="gameStore.redirectLink"
        target="_blank"
      >
        <span class="text-black tw-text-[24px] button-text font-elliot tw-font-bold">Продолжить</span>
      </q-btn>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useVModel} from '@vueuse/core';
import {useGameStore} from 'stores/game.store';

const props = defineProps<{
  modelValue: boolean
}>()
const emits = defineEmits(['update:modelValue'])

const gameStore = useGameStore()

const _modelValue = useVModel(props, 'modelValue', emits)
const timerRef = ref<null | HTMLElement>(null)

const startCountdown = (duration: number) => {
  let timer = duration, minutes, seconds;

  const countdown = setInterval(function () {
    if (!timerRef.value) return
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timerRef.value!.textContent = minutes + ':' + seconds;

    if (--timer < 0) {
      clearInterval(countdown);
    }
  }, 1000);
}

startCountdown(15 * 60)
</script>

<style scoped lang="scss">
.coins {
  translate: 40% 40%;

  & img {
    @media (max-width: 1000px) {
      width: 160px;
    }
  }
}

.text {
  @media (max-width: 1000px) {
    font-size: 10px;
    margin-bottom: 9px;
  }
}

.text-mini {
  @media (max-width: 1000px) {
    font-size: 6px;
  }
}

.timer {
  font-variant-numeric: tabular-nums;

  @media (max-width: 1000px) {
    font-size: 12px;
  }
}

.timer-container {
  @media (max-width: 1000px) {
    margin-bottom: 7px;
  }
}

.button {
  @apply tw-w-[300px] tw-h-[80px] tw-rounded-[12px];
  background: linear-gradient(94.53deg, #D3791D 0%, #FAAA2C 50%, #D58D00 100%);

  @media (max-width: 1000px) {
    font-size: 8px;
    width: 106px;
    height: 30px;
    border-radius: 5px;
  }
}

.button-text {
  @media (max-width: 1000px) {
    font-size: 8px;
  }
}

.promo {
  display: inline-block;
  position: relative;
  z-index: 0;
  font-style: italic;

  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    padding: 3px;
    border-radius: 15px;
    background: linear-gradient(to right, #74DEFF, #FFFFFF);
    mask:
      linear-gradient(#000 0 0) exclude,
      linear-gradient(#000 0 0) content-box;
  }

  @media (max-width: 1000px) {
    margin-bottom: 5px;

    &:before {
      border-radius: 6px;
      padding: 1px;
    }
  }
}

.promo-text {
  @media (max-width: 1000px) {
    font-size: 28px;
  }
}

.modal {
  box-shadow: 0px 0px 250px 0px #03293A94;
  box-shadow: 0px 0px 20px 0px #A3A3A3;
  background: linear-gradient(251deg, #1B1D32 15.13%, #0F1019 80.14%);
  border-radius: 31px;

  & div {
    line-height: 1;
  }

  @media (max-width: 1000px) {
    border-radius: 10px;
    padding: 20px;
    max-width: 280px !important;
  }
}

.bg-win {
  @media (max-width: 1000px) {
    border-radius: 10px;
  }
}
</style>
