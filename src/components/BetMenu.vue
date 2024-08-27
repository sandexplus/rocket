<template>
  <div class="tw-w-full">
    <div class="menu-block menu-block_top tw-flex tw-items-center tw-justify-between tw-gap-y-1.5 bg-dark-bg tw-mb-1 tw-px-3 tw-py-2 tw-gap-x-3">
      <BaseInput
        v-model.number="gameStore.autoStopCoefficient"
        dense
        prefix="x"
        type="number"
        font-size="20px"
        class="tw-w-[230px]"
      />
      <BaseToggle
        v-model="gameStore.autoStop"
        label="Автостоп"
      />
    </div>
    <div class="menu-block menu-block_bottom tw-flex tw-px-3 tw-py-2 tw-gap-x-3">
      <BaseInput
        v-model.number="gameStore.bet"
        type="number"
        font-size="20px"
        buttons
        class="tw-w-[230px] tw-min-w-[230px]"
      />
      <q-btn
        v-if="gameStore.gameStatus === GAME_STATUS.RESTARTING"
        :disable="gameStore.betMade || !gameStore.bet"
        unelevated
        class="tw-w-full !tw-bg-[linear-gradient(180deg,_#F88A25_0%,_#FAB42D_50.52%,_#F8B025_100%)] !tw-rounded-[7px]"
        stretch

        @click="makeBet"
      >
        <span class="text-black tw-text-[20px] tw-uppercase">Поставить</span>
      </q-btn>
      <template v-else>
        <q-btn
          v-if="gameStore.gameStatus === GAME_STATUS.PLAYING && gameStore.betMade"
          unelevated
          class="tw-w-full !tw-bg-[linear-gradient(180deg,_#F88A25_0%,_#FAB42D_50.52%,_#F8B025_100%)] !tw-rounded-[7px]"
          color="warning"
          stretch
          no-caps

          @click="takeWin"
        >
          <span class="tw-text-black tw-text-[20px]">Забрать</span>
        </q-btn>
        <q-btn
          v-else-if="gameStore.gameStatus === GAME_STATUS.FAILED || !gameStore.betMade"
          label="Ожидание"
          unelevated
          color="menu_button"
          class="tw-w-full !tw-rounded-[7px]"
          disable
          stretch
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {GAME_STATUS} from 'src/shared/const';
import {useGameStore} from 'stores/game.store';
import BaseInput from 'components/common/BaseInput.vue';
import BaseToggle from 'components/common/BaseToggle.vue';

const gameStore = useGameStore()

const takeWin = () => {
  gameStore.takeBet(0)
  gameStore.winsCount++

  if (gameStore.winsCount === 1 || gameStore.winsCount % 5 === 0) {
    gameStore.dialogOpened = true
  }
}

const makeBet = () => {
  gameStore.balance -= gameStore.bet
  gameStore.betMade = true
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
</style>

<style scoped lang="scss">
.menu-block {
  @apply tw-rounded-[15px] tw-bg-[#22252F];

  &_top {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  &_bottom {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}
</style>
