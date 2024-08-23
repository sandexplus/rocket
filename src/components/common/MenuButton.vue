<template>
  <q-btn
    color="menu_button"
    class="tw-py-0 tw-rounded-[6px]"
    dense
  >
    <span class="text-toggle_text_grey label">{{ label }}</span>
  </q-btn>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<style scoped lang="scss">
.label {
  font-family: "FS Elliot", sans-serif;
}
</style>
