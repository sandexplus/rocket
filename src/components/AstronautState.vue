<template>
  <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-9 tw-h-[458px]">
    <div class="tw-relative tw-flex tw-flex-col tw-items-center tw-gap-2">
<!--      <LottieAnimation-->
<!--        :animation-data="AstronautJSON"-->
<!--        auto-play-->
<!--        loop-->
<!--        class="tw-absolute tw-w-[140px]"-->
<!--      />-->
      <img src="~/assets/loading-rocket.svg" class="tw-w-[70px] tw-block">
      <span class="text-center tw-text-[24px] tw-uppercase text-white">Заправляем шаттл...</span>
      <div class="loader-container tw-w-[323px] tw-h-[13px]">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LottieAnimation } from 'lottie-web-vue'
import AstronautJSON from 'assets/astronaut.json'
import {useGameStore} from 'stores/game.store';
import {GAME_STATUS} from 'src/shared/const';

const gameStore = useGameStore()

setTimeout(() => {
  gameStore.gameStatus = GAME_STATUS.PLAYING
}, 5000)
</script>

<style scoped lang="scss">

@keyframes loading {
  0% {
    width: 0;
  }
  100% {
    width: 323px;
  }
}

.loader-container {
  position: relative;
  background: #22252F;
  border-radius: 13px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: #F99728;
    animation: loading 5s linear infinite;
    border-radius: 13px;
  }
}
</style>
