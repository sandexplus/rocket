<template>
  <div class="tw-w-full">
    <div class="menu-block menu-block_top tw-grid tw-grid-cols-[1.35fr_1fr] tw-gap-x-2 tw-gap-y-1.5 bg-dark-bg tw-px-3 tw-pt-1.5 tw-pb-[20px]">
      <BaseToggle
        v-model="gameStore.autoStop"
        label="АВТОСТОП"
      />
      <BaseInput
        v-model.number="gameStore.autoStopCoefficient"
        dense
        prefix="x"
        type="number"
        font-size="15px"
      />
      <BaseInput
        v-model.number="gameStore.bet"
        type="number"
        font-size="20px"
      />
      <q-btn
        v-if="gameStore.gameStatus === GAME_STATUS.RESTARTING"
        label="Поставить"
        :disable="gameStore.betMade || !gameStore.bet"
        unelevated
        class="tw-h-full tw-shadow-[0px_3.75px_10px_0px_#6DCAFF_inset]"
        color="primary"

        @click="makeBet"
      />
      <template v-else>
        <q-btn
          v-if="gameStore.gameStatus === GAME_STATUS.PLAYING && gameStore.betMade"
          unelevated
          class="tw-h-full tw-shadow-[0px_3px_8px_0px_#FFF975_inset]"
          color="warning"

          @click="takeWin"
        >
          <div class="tw-flex tw-flex-col tw-items-center">
            <span>{{ (gameStore.bet * gameStore.coefficient).toFixed(2) }} ₽</span>
            <span class="font-elliot tw-text-[#7B5925]">Забрать</span>
          </div>
        </q-btn>
        <q-btn
          v-else-if="gameStore.gameStatus === GAME_STATUS.FAILED || !gameStore.betMade"
          label="Ожидание"
          unelevated
          color="menu_button"
          class="tw-h-full"
          disable
        />
      </template>
    </div>
    <div class="menu-block menu-block_bottom bg-dark-bg tw-justify-between tw-flex tw-items-center tw-gap-3 tw-pt-3 tw-px-3 tw-pb-7">
      <MenuButton
        v-for="(add, index) in addButtons"
        :key="index"
        :label="`+${add}`"

        @click="addBetMoney(add)"
      />
      <MenuButton
        label="На все"
        no-caps

        @click="addBetMoney(0)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {GAME_STATUS} from 'src/shared/const';
import {useGameStore} from 'stores/game.store';
import BaseInput from 'components/common/BaseInput.vue';
import BaseToggle from 'components/common/BaseToggle.vue';
import MenuButton from 'components/common/MenuButton.vue';

const gameStore = useGameStore()

const addButtons = ref([50, 100, 200, 500, 1000, 2000])

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
  @apply tw-rounded-[15px];
  border: 1px solid $menu-border;

  &_top {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  &_bottom {
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    clip-path: polygon(0 0, 0 100%, 35% 100%, 40% 75%, 60% 75%, 65% 100%, 100% 100%, 100% 0);
  }
}
</style>
