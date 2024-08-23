<template>
  <div class="tw-relative tw-pt-10 tw-flex tw-flex-col tw-items-center tw-gap-4">
    <div class="coefficient-container tw-flex tw-flex-col tw-items-center tw-relative">
      <span class="coefficient tw-text-[48px] tw-leading-[55px]" :class="gameStore.gameStatus === GAME_STATUS.FAILED ? 'text-negative' : 'text-primary'">x{{ gameStore.coefficient.toFixed(2) }}</span>
      <span
        v-if="gameStore.gameStatus === GAME_STATUS.FAILED"
        class="tw-uppercase tw-text-[20px] tw-leading-[22px] tw-absolute -tw-bottom-[50%] text-white"
      >
        Взорвался
      </span>
    </div>
    <div class="rocket-container">
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
.coefficient {
  text-shadow: 0 0 16px rgba(255, 44, 82, .35);
}

@keyframes moveInArc {
  0% {
    transform: translate(0, 0) rotate(20deg);
  }
  50% {
    transform: translate(250px, -35%) rotate(10deg);
  }
  100% {
    transform: translate(550px, -110%) rotate(-5deg);
    bottom: -95px;
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
  bottom: -90px;
  left: 0;
  animation: moveInArc 4s linear forwards;

  &_paused {
    animation-play-state: paused;
  }
}

.rocket-ship {
  rotate: 15deg;
}

.rocket-fire {
  position: absolute;
  height: 80px;
  rotate: -120deg;
  left: -41px;
  bottom: 1px;
}

.blow-animation {
  width: 133px;
  height: 133px;
  position: absolute;
  right: -15px;
  top: 20px;
}

.rocket-line {
  width: 100%;
  position: absolute;
}
</style>
