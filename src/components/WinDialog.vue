<template>
  <q-dialog v-model="_modelValue">
    <q-card class="tw-relative !tw-max-w-none tw-w-[800px] tw-py-[78px] tw-pt-[113px] !tw-overflow-visible tw-flex tw-flex-col tw-items-center modal">
      <div class="tw-absolute tw-left-0 tw-top-0">
        <img class="dice left bottom" src="~assets/dialog_dice/left_bottom.png" alt="">
        <img class="dice left center" src="~assets/dialog_dice/left_center.png" alt="">
        <img class="dice left corner" src="~assets/dialog_dice/left_corner.png" alt="">
        <img class="dice left top" src="~assets/dialog_dice/left_top.png" alt="">
      </div>
      <div class="tw-absolute tw-right-0 tw-bottom-0">
        <img class="dice right center" src="~assets/dialog_dice/right_center.png" alt="">
        <img class="dice right corner" src="~assets/dialog_dice/right_corner.png" alt="">
        <img class="dice right top" src="~assets/dialog_dice/right_top.png" alt="">
      </div>
<!--      <div class="tw-absolute tw-right-0 tw-bottom-0 tw-pointer-events-none tw-select-none coins">-->
<!--        <img src="~assets/flying%20coins.png">-->
<!--      </div>-->
      <div class="tw-mb-6 tw-uppercase text-white tw-text-[33px] text-center text">Ваш <span class="tw-text-[#00FFD9]">бонус</span> к депозиту <span class="tw-text-[#00FFD9]">+30%</span><br> к пополнению и <span class="tw-text-[#00FFD9]">+ 100FS</span></div>
      <div class="tw-flex tw-items-center tw-mb-10 tw-gap-1 timer-container">
        <span class="tw-uppercase text-white tw-text-[16px] text-mini">время на активацию:</span>
        <span ref="timerRef" class="timer text-white tw-text-[34px] tw-p-1">15:00</span>
      </div>
      <q-btn
        no-caps
        class="button"
        :href="gameStore.redirectLink"
        target="_blank"
      >
        <span class="text-white tw-text-[24px] button-text">Играть сейчас</span>
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
  @apply tw-bg-[linear-gradient(94.53deg,_#FF4B96_0%,_#DA4AFF_51.04%,_#8A55FF_100%)] tw-w-[300px] tw-h-[80px] tw-rounded-[72px];

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
  box-shadow: 0px 0px 20px 0px #00A6FF6E;
  border-radius: 31px;

  background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
  ),
    /* bottom, image */
  url('assets/dialog_bg.jpg');

  background-size: cover;
  background-position: 0 0;
  background-repeat: no-repeat;

  & div {
    line-height: 1;
  }

  @media (max-width: 1000px) {
    padding: 20px;
    max-width: 280px !important;
  }
}

.dice {
  position: absolute;
  pointer-events: none;

  &.left {
    &.corner {
      top: 0;
      left: 0;
      translate: -50% -50%;
      width: 360px;
    }

    &.top {
      top: 0;
      left: 0;
      translate: 100% -50%;
    }

    &.center {
      top: 0;
      left: 0;
      translate: -50% 20%;
    }

    &.bottom {
      top: 0;
      left: 0;
      translate: 50% 200%;
    }
  }

  &.right {
    &.corner {
      right: 0;
      bottom: 0;
      translate: 40% 40%;
    }

    &.top {
      right: 0;
      bottom: 0;
      translate: 50% -10%;
    }

    &.center {
      right: 0;
      bottom: 0;
      translate: -50% 0%;
    }
  }
}

@media (max-width: 1000px) {
  .modal {
    border-radius: 11px;
  }

  .dice {
    &.left {
      &.corner {
        width: 120px;
      }

      &.top {
        width: 35px;
      }

      &.center {
        width: 50px;
      }

      &.bottom {
        width: 29px;
      }
    }

    &.right {
      &.corner {
        width: 80px;
      }

      &.top {
        width: 100px;
      }

      &.center {
        width: 49px;
      }
    }
  }
}
</style>
