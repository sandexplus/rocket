<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="bg-container">
      <img src="~assets/bg.svg" alt="" class="bg">
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
.bg-container {
  background-color: $dark;
}

.bg {
  width: 100vw;
  object-fit: cover;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 0;
}
</style>
