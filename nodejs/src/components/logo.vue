<template lang="pug">
  .logo-con(:height="size+'px'" :width="size+'px'")
    q-icon(name='fingerprint' size='xl')
</template>

<script>

  const TAU = Math.PI * 2;


  export default {
    name: "logo",
    props:['size'],
    mounted(){

    }
  }
</script>

<style scoped lang="stylus">
#logoCan
  /*height 250px*/
  /*width 250px*/
  /*background-color rebeccapurple*/
.logo-con
  text-align center
  //display flex
  //justify-content center
  //background-color red
</style>
