<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <img src="~assets/bg.png" alt="" class="bg">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MainLayout'
});
</script>

<style lang="scss">
.bg {
  width: 100vw;
  object-fit: cover;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
