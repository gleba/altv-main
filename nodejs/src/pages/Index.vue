<template lang="pug">
  q-page.page1
    logo(size="200")
    .title {{title}}
    .auth
      user-menu(v-if="user")
      auth-base(v-else)
    .footer
      .app © 2019
</template>

<style lang="stylus">
  .page1
    padding 1em
    padding-top 2em
    display flex
    flex-direction column
    align-items center

  .auth
    max-width 600px

  .title
    text-align center
    font-weight bold
    font-size 24px
    padding-bottom 1em
    color gray

  .footer
    position fixed
    width 100%
    bottom 0
    font-weight 100
    display flex
    justify-content center
    padding 5px
</style>


<script lang="ts">
  import Vue from 'vue'
  import AuthBase from "~/components/auth/authBase.vue";
  import Logo from "~/components/logo.vue";
  import UserMenu from "~/components/auth/userMenu.vue";

  export default Vue.extend({
    name: 'PageIndex',
    components: {UserMenu, Logo, AuthBase},
    from({session}) {
      session.user.asIs()
    },
    computed:{
      title(){
        return this.user
          ? this.user.first_name + " " + this.user.last_name
          : "G5Guard"
      }
    }
  })
</script>
