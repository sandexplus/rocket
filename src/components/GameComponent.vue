<template>
  <div class="tw-flex tw-flex-col tw-items-center tw-w-full">
    <PreviousScores />
    <RocketFly />
    <BetMenu class="tw-max-w-[60%]" />
  </div>
</template>

<script setup lang="ts">

import RocketFly from 'components/RocketFly.vue';
import PreviousScores from 'components/PreviousScores.vue';
import BetMenu from 'components/BetMenu.vue';
</script>

<style scoped lang="scss">

</style>
