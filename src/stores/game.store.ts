import {defineStore} from 'pinia';
import {ref} from 'vue';
import {GAME_STATUS, randomResult} from 'src/shared/const';
import {useLocalStorage} from '@vueuse/core';
import {Notify} from 'quasar';
import TrophySVG from 'assets/trophy.svg';
import CoinPNG from 'assets/coin.png';

export const useGameStore = defineStore('game', () => {
  const promo = ref('')
  const redirectLink = ref('')

  const dialogOpened = ref(false)
  const winsCount = ref(0)

  const balance = useLocalStorage<number>('balance', 10000)
  const previousWins = useLocalStorage('previousWins', [1.35, 2.16, 13.3, 3.37, 1.16, 5.32, 6.13, 5.32, 4.32, 3.32])

  const gameStatus = ref<GAME_STATUS>(GAME_STATUS.RESTARTING)

  const coefficient = ref(0)
  const maxCoefficient = ref(randomResult())

  const win = ref(0)
  const bet = ref(1000)
  const betMade = ref(false)

  const autoStop = ref(true)
  const autoStopCoefficient = ref(2)

  const resetStore = () => {
    coefficient.value = 0
    maxCoefficient.value = randomResult()
  }

  const takeBet = (customCoefficient?: number) => {
    const win = bet.value * (customCoefficient || coefficient.value)

    balance.value += win
    betMade.value = false

    Notify.create({
      message: `
        <div class="tw-flex tw-items-center tw-gap-3.5 tw-px-4 tw-py-3">
          <div><img src="${TrophySVG}" class="tw-w-[36px]" alt=""></div>
          <div class="tw-flex tw-flex-col">
            <div class="text-primary tw-text-[18px]">x${coefficient.value.toFixed(2)}</div>
            <div class="font-elliot tw-text-[14px] tw-flex tw-items-center tw-gap-1">Ваш выигрыш: <img src="${CoinPNG}" class="tw-w-[16px]" alt="">${win.toFixed(2)} ₽</div>
          </div>
        </div>
      `,
      html: true,
      color: '#252339',
      progress: true,
      classes: 'win-notify',
      progressClass: 'bg-primary tw-opacity-100',
      position: 'top',
      actions: [
        { icon: 'close', color: '#504E68', round: true, flat: true, dense: true, class: 'tw-absolute tw-top-3 -tw-right-1 tw-text-[#504E68]' }
      ]
    })
  }

  return {
    promo,
    redirectLink,
    winsCount,
    dialogOpened,
    previousWins,
    gameStatus,
    balance,
    coefficient,
    maxCoefficient,
    win,
    bet,
    betMade,
    autoStop,
    autoStopCoefficient,
    resetStore,
    takeBet
  }
});
