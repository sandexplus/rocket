<template>
  <q-page class="tw-flex tw-flex-col items-center justify-evenly">
    <div class="tw-relative game">
      <div class="balance tw-flex tw-items-center tw-gap-2.5 bg-menu_button tw-p-1.5 tw-rounded-[8px] tw-h-[32px]">
        <img src="~assets/coin.png">
        <span class="text-white font-elliot">{{ gameStore.balance.toFixed(2) }}</span>
      </div>
      <div ref="gameRef" >
        <GameComponent
          class="tw-max-w-[750px]"
        />
      </div>
    </div>
    <WinDialog
      v-model="gameStore.dialogOpened"
    />
  </q-page>
</template>

<script setup lang="ts">
import GameComponent from 'components/GameComponent.vue';
import {useGameStore} from 'stores/game.store';
import {computed, ref, watch} from 'vue';
import {Screen} from 'quasar';
import WinDialog from 'components/WinDialog.vue';
import {useRoute} from 'vue-router';
import {encodeString, getParams} from 'src/shared/const';

const route = useRoute()
const gameStore = useGameStore()
const gameRef = ref<HTMLDivElement | null>(null)

const decodedData = computed(() => route.query.data as string)
const encodedData = computed(() => getParams(encodeString(decodedData.value)))

watch(encodedData, () => {
  gameStore.promo = encodedData.value?.promo || ''
  gameStore.redirectLink = encodedData.value?.link || ''
}, {immediate: true})

const scaleValue = computed(() => {
  if (!gameRef.value) return 'scale(1)'

  const targetWidth = Screen.width > 800 ? Screen.width * 0.45 : Screen.width * 0.8
  const elementWidth = gameRef.value.offsetWidth

  const scale = targetWidth / elementWidth

  return `scale(${scale})`
})
</script>

<style lang="scss" scoped>
.balance {
  @apply tw-absolute tw-top-0 tw-right-0;
  translate: calc(100% + 60px) 0;

  @media (max-width: 800px) {
    translate: 0 calc(-100% - 20px);
  }
}

.game {
  transform: v-bind(scaleValue);
  //transform-origin: left;

  //@media (max-width: 800px) {
  //  transform: scale(1);
  //}
}
</style>
