<template>
  <div class="tw-flex tw-gap-3 tw-items-center">
    <div
      v-for="(item, index) in gameStore.previousWins"
      :key="index"
      class="tw-rounded-[5px] tw-flex tw-justify-center tw-items-center tw-w-[64px] tw-h-[32px]"
      :class="colors[index]"
    >
      {{ item }}x
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useGameStore} from 'stores/game.store';

const gameStore = useGameStore()

const colors = computed(() => {
  const oppositeData = gameStore.previousWins.toReversed()

  return oppositeData.map((_, index) => {
    if (index % 3 === 0) {
      return 'bg-primary text-white';
    } else if (index % 3 === 1) {
      return 'bg-accent text-white';
    } else {
      return 'bg-warning text-black';
    }
  }).toReversed()
})
</script>

<style scoped lang="scss">

</style>
