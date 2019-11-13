<template lang="pug">
  q-page
    .flex.full-width(style="backgroundColor:red")
      transition-group(
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut")
        .progressCon(key="x1" v-if="checking").flex.flex-center
          q-circular-progress(
            indeterminate
            size="75px"
            :thickness="0.6"
            color="lime-3"
            center-color="grey-8"
            class="q-ma-md")
        .flex.flex-center(v-else key="x2")
          q-card.absolute-center
            q-card-section
              h5 Эта ссылка для входа не действительна.
              p Возможно вы уже ранее воспользовались этой ссылкой, либо истекло её время жизни.
              p Попробуйте заново или иначе.
              q-btn(label="Попробовать иначе" no-caps to="/auth").full-width
</template>

<style lang="stylus">
  .progressCon
    position absolute
    width 100%


  .opacity5
    opacity 0.5 !important
    padding-top 20px

  .pad
    padding
</style>

<script>
  export default {
    name: 'auth',
    data() {
      let data = {
        checking: true,
        isValidRune: true
      }
      this.$actions.session.checkAuthRune(this.$route.params.authRune)
          .then(isValidRune => {
            data.checking = false
            data.isValidRune = isValidRune
            if (isValidRune) {
              this.$router.push('/auth')
            }
          })
      return data
    },
    from(f) {
      f.session.user.as('user')
    }
  }
</script>
