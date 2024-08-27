<template>
  <div class="tw-flex tw-gap-3 tw-items-center tw-bg-[#20232DE5] tw-py-4 tw-px-7 tw-rounded-[15px]">
    <div
      v-for="(item, index) in gameStore.previousWins"
      :key="index"
      class="tw-rounded-[7px] tw-flex tw-justify-center tw-items-center tw-w-[85px] tw-h-[45px] tw-border tw-border-solid tw-font-medium"
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
    if (index % 4 === 0) {
      return 'tw-border-[#E21E4D] text-negative';
    } else if (index % 4 === 1) {
      return 'tw-border-white text-white';
    } else if (index % 4 === 2) {
      return 'tw-border-[#1BCD49] text-positive';
    } else {
      return 'tw-border-[#E5B300] text-warning';
    }
  }).toReversed()
})
</script>

<style scoped lang="scss">
</style>
