<template lang="pug">
  q-page
    iframe(name="gate" style="display: none;")
    .flex.full-width
      transition-group(
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut" )
        q-card.absolute-center(v-if='user' key="x1")
          q-card-section
            .text-grey-8 Пользователь авторизован
            .text-h6 {{user.first_name}} {{user.last_name}}
          q-card-section.text-grey-7 Активность авторизаций
            ul.text-grey-5
              li(v-for="time in user.activityList.slice(0,5)") {{new Date(time).toLocaleString()}}
          q-list
            q-item(clickable @click="$actions.session.logout()")
                q-item-section(avatar)
                  q-icon(color="primary" name="logout" )
                q-item-section
                  q-item-label Завершить сеанс
                  q-item-label(caption) Выйти из учётной записи
            q-item(clickable to="/")
              q-item-section(avatar)
                q-icon(color="secondary" name="home" )
              q-item-section
                q-item-label На главную

        q-card.absolute-center(v-else key="x2")
          q-card-section
            .text-h6 Авторизация
          q-card-section Телеграм должен быть установлен на этом устройстве.
            p После нажатия на &nbsp;
              a(:href="link" target="gate") Start
              span &nbsp; в открывшимся клиенте телеграм нажмите на
              b &nbsp;Start
          q-list
            a.link(:href="link" target="gate")
              q-item(clickable @click="")
                q-item-section(avatar)
                  q-icon(color="primary" name="play_arrow" )
                q-item-section
                  q-item-label Start
                  q-item-label(caption) @legend_abot
            q-item(clickable @click="show=false")
              q-item-section(avatar)
                q-icon(color="secondary" name="close" )
              q-item-section
                q-item-label Close
</template>


<style lang="stylus" scoped>
  .opacity5
    opacity 0.5 !important
    padding-top 20px

  .link
    text-decoration none

  b
    text-decoration underline
</style>


<script>


  export default {
    name: 'auth',

    from({ session }) {
      session.sessionRune.as('link', v => 'tg://resolve?domain=legend_abot&start=' + v)
      session.user.asIs()
    }
  }
</script>
