<template lang="pug">
  .full-width
    //.flex.full-width
    .vibox {{showSettings}}
    vi-property-menu
    //q-item(clickable @click="showSettings=!showSettings")


    //q-item(clickable @click="showSettings=!showSettings")
      q-item-section(avatar)
        q-icon(color="primary" name="music_note" )
      q-item-section
        q-item-label Настройки канала
        q-item-label(caption) Администрирование
</template>

<style lang="stylus">
  .vibox
    background-color skyblue
    width 100%
    height 42vh

</style>

<script>
  import ViProperty from "../components/vicast/ViProperty"
  import ViPropertyMenu from "../components/vicast/ViPropertyMenu"
  export default {
    name: 'vicast',
    components: {ViPropertyMenu, ViProperty},
    data:()=>({
      showSettings:false
    })
  }
</script>
