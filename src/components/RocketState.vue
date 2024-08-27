<template>
  <div class="tw-relative tw-pt-10 tw-flex tw-flex-col tw-items-center tw-gap-4">
    <div class="coefficient-container tw-flex tw-flex-col tw-items-center tw-relative">
      <span class="coefficient tw-text-[102px] tw-leading-1" :class="gameStore.gameStatus === GAME_STATUS.FAILED ? 'gradient-failure' : 'gradient-success'">x{{ gameStore.coefficient.toFixed(2) }}</span>
    </div>
    <div class="rocket-container">
      <div class="history">
        <img src="~assets/history.svg">
      </div>
      <div class="rocket-line">
        <img src="~assets/line.svg">
      </div>
      <div class="rocket" :class="{ 'rocket_paused': gameStore.gameStatus === GAME_STATUS.FAILED }">
        <div v-if="gameStore.gameStatus === GAME_STATUS.PLAYING">
          <img class="rocket-ship" src="~assets/rocket.png">
          <LottieAnimation
            :animation-data="FireJSON"
            auto-play
            loop
            class="rocket-fire"
          />
        </div>
        <div v-else-if="gameStore.gameStatus === GAME_STATUS.FAILED" class="blow">
          <div>
            <LottieAnimation
              :animation-data="BlowJSON"
              auto-play
              loop
              class="blow-animation"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useGameStore} from 'stores/game.store';
import {GAME_STATUS} from 'src/shared/const';
import FireJSON from 'assets/fire.json';
import BlowJSON from 'assets/blow.json';
import {LottieAnimation} from 'lottie-web-vue';

const gameStore = useGameStore()
gameStore.resetStore()

function exponentialGrowth(initialValue: number, growthRate: number, maxWin: number, maxIncreasePerFrame: number, updateCallback: (value: number, isMaxWin?: boolean) => void) {
  let currentValue = initialValue;

  function update() {
    let increase = Math.exp(growthRate) - 1;

    increase = Math.min(increase, maxIncreasePerFrame)

    currentValue += currentValue * increase

    if (currentValue < maxWin) {
      updateCallback(currentValue)
      requestAnimationFrame(update)
    } else {
      updateCallback(maxWin, true)
    }
  }

  update()
}

onMounted(() => {
  exponentialGrowth(1, 0.005, gameStore.maxCoefficient, 0.1, (value, done) => {
    gameStore.coefficient = value

    if (gameStore.betMade && gameStore.autoStop && gameStore.autoStopCoefficient <= value) {
      gameStore.takeBet(gameStore.autoStopCoefficient)
    }

    if (done) {
      gameStore.gameStatus = GAME_STATUS.FAILED
      gameStore.coefficient = gameStore.maxCoefficient
      gameStore.previousWins.unshift(Number(value.toFixed(2)))
      if (gameStore.previousWins.length > 10) {
        gameStore.previousWins.pop()
      }
      setTimeout(() => {
        gameStore.gameStatus = GAME_STATUS.RESTARTING
        gameStore.betMade = false
      }, 3000)
    }
  })
})
</script>

<style scoped lang="scss">
@keyframes moveInArc {
  0% {
    transform: translate(0, 0) rotate(30deg);
  }
  60% {
    transform: translate(250px, -35%) rotate(25deg);
    bottom: -150px;
  }
  100% {
    transform: translate(550px, -110%) rotate(-5deg);
    bottom: -125px;
  }
}

.rocket-container {
  height: 250px;
  width: 680px;
}

.rocket {
  width: 171px;
  height: 187px;
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  bottom: -120px;
  left: 0;
  animation: moveInArc 4s linear forwards;

  &_paused {
    animation-play-state: paused;
  }
}

.rocket-ship {
  width: 100%;
}

.rocket-fire {
  position: absolute;
  height: 80px;
  rotate: -130deg;
  left: -31px;
  bottom: 27px;
}

.blow-animation {
  width: 133px;
  height: 133px;
  position: absolute;
  right: -15px;
  top: -20px;
}

.rocket-line {
  width: 100%;
  position: absolute;

  & img {
    width: 100%;
  }
}

.history {
  position: absolute;
  right: -50px;
  bottom: -20%;
  height: 100%;

  & img {
    height: 100%;
  }
}

.gradient {
  &-success {
    background: linear-gradient(0deg, #51B12F 36.21%, #7BEB53 97.41%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  &-failure {
    background: linear-gradient(0deg, #B12F2F 36.21%, #EB8153 97.41%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
