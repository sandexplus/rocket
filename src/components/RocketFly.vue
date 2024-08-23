<template>
  <div class="tw-pointer-events-none tw-select-none">
    <AstronautState v-if="gameStore.gameStatus === GAME_STATUS.RESTARTING" />
    <RocketState v-else />
  </div>
</template>

<script setup lang="ts">
import AstronautState from 'components/AstronautState.vue';
import {GAME_STATUS} from 'src/shared/const';
import RocketState from 'components/RocketState.vue';
import {useGameStore} from 'stores/game.store';
import {watch} from 'vue';

const gameStore = useGameStore()

watch(() => gameStore.gameStatus, () => {

})
</script>

<style scoped lang="scss">

</style>
