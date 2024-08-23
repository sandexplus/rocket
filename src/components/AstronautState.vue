<template>
  <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-9 tw-h-[361px]">
    <div class="circle tw-relative">
      <LottieAnimation
        :animation-data="AstronautJSON"
        auto-play
        loop
        class="tw-absolute tw-w-[140px]"
      />
      <div class="loader-container tw-w-[144px] tw-h-[144px]">
        <img src="~assets/loader.svg" class="loader">
        <img src="~assets/inner-loader.svg" class="inner-loader">
        <img src="~assets/outer-loader.svg" class="outer-loader">
      </div>
    </div>
    <span class="text-center tw-text-[24px] tw-uppercase text-white">Заправляем шаттл...</span>
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

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotate-reverse {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

.loader-container {
  position: relative;

  & .outer-loader {
    position: absolute;
    top: -18px;
    left: -18px;
    width: 180px;
    height: 180px;
    z-index: 3;
    animation: rotate-reverse 2s infinite linear;
  }

  & .loader {
    position: absolute;
    top: -12px;
    left: -12px;
    width: 168px;
    height: 168px;
    animation: rotate 2s infinite linear;
    z-index: 2;
  }

  & .inner-loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
}
</style>
