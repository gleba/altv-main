<template lang="pug">
  .full-width
    iframe(name="gate" style="display: none;")
    .flex.full-width
      transition-group(
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut" )
        q-card(v-if='user' key="x1")
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

        q-card(v-else key="x2")
          q-card-section
            .text-h6 Авторизация через телеграм
          q-card-section Телеграм должен быть установлен на этом устройстве.
            p
            p Нажмите на &nbsp;
              a(:href="link" target="gate") Запуск бота
              span &nbsp; в открывшимся клиенте телеграм нажмите на &nbsp;
              b Start
              span &nbsp; и вернитесь в приложение.
          q-list
            a.link(:href="link" target="gate")
              q-item(clickable @click="")
                q-item-section(avatar)
                  q-icon(color="primary" name="play_arrow" )
                q-item-section
                  q-item-label Запуск бота
                  q-item-label(caption) @{{botName}}
            //q-item(clickable @click="show=false")
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
  //tg://resolve?domain=legend_abot
  const botName = process.env.TG_BOT_NAME
  import Logo from "~/components/logo"

  export default {
    name: 'authBase',
    components: {Logo},
    data: () => ({botName}),
    from({session}) {
      session.sessionRune.as('link', v => `tg://resolve?domain=${botName}&start=` + v)
      session.user.asIs()
    }
  }
</script>
