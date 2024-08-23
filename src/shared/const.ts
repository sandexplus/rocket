export enum GAME_STATUS {
  FAILED = '__FAILED__',
  PLAYING = '__PLAYING__',
  RESTARTING = '__RESTARTING__'
}

export function randomResult() {
  const randomNumber = Math.random();
  if (randomNumber <= 0.2) {
    return Math.random() * (2 - 1 + 1) + 1;
  } else if (randomNumber > 0.2 && randomNumber <= 0.7) {
    return Math.random() * (4 - 2 + 1) + 2;
  } else if (randomNumber > 0.7 && randomNumber <= 0.9) {
    return Math.random() * (20 - 4 + 1) + 4;
  } else {
    return Math.random() * (300 - 20 + 1) + 20;
  }
}

export const encodeString = (str: string) => {
  if (!str) return ''
  return atob(str.replace(/_/g, '/').replace(/-/g, '+'))
}

export const getParams = (str: string) => {
  if (!str) return

  const params = str.split('&')
  const promo = params[0].split('=')[1]
  const link = params[1].split('=')[1]
  return {
    promo,
    link
  }
}

