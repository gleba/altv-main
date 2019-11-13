<template lang="pug">
    a-flow
      q-list
        q-item(clickable to="/vicast")
          q-item-section(avatar)
            q-icon(color="primary" name="music_note" )
          q-item-section
            q-item-label Настройки канала
            q-item-label(caption) Администрирование
        q-item(clickable to="/vicast")
          q-item-section(avatar)
            q-icon(color="primary" name="person_add" )
          q-item-section
            q-item-label Добавить участников
            q-item-label(caption) Отправить приглашения

</template>

<script>
  import AFlow from "./a-flow"
  export default {
    name: "ViProperty",
    components: {AFlow}
  }
</script>

<style scoped>

</style>
