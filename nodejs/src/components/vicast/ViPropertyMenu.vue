<template lang="pug">
  .vi-property-menu →{{$flow.viCast.showNames.v}}←
    q-btn-dropdown(
      dropdown-icon="explore" label="Управление"
      flat outline color="primary" )
      q-list
        q-item(clickable v-close-popup @click="")
          q-item-section
            q-item-label Изменить название
        q-item(clickable v-close-popup )
          q-item-section
            q-item-label Пригласить участников

</template>

<script >
    export default {
        name: "vi-property-menu",
      mounted(){
          this.$flows
      }
    }
</script>

<style scoped lang="stylus">
    .vi-property-menu
        color orange
</style>
