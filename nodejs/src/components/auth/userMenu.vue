<template lang="pug">
  .full-width
    iframe(name="gate" style="display: none;")
    .flex.full-width
      transition-group(
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut" )
        .card(v-if='user' key="x1")
          pre {{speed}}
          //q-list
            q-item(clickable to="/vicast")
              q-item-section(avatar)
                q-icon(color="primary" name="add" )
              q-item-section
                q-item-label Новое видеовещание
                q-item-label(caption) Создать канал
            //q-item(clickable)
              q-item-section(avatar)
                q-icon(color="primary" name="list" )
              q-item-section
                q-item-label Расписание занятий
                q-item-label(caption) Список доступных классов
            //q-item(clickable)
              q-item-section(avatar)
                q-icon(color="primary" name="forum" )
              q-item-section
                q-item-label Обсуждения
                q-item-label(caption) Живое общение
            q-item(clickable @click="$actions.session.logout()")
              q-item-section(avatar)
                q-icon(color="primary" name="logout" )
              q-item-section
                q-item-label Завершить сеанс
                q-item-label(caption) Выйти из учётной записи
            //q-item(clickable to="/")
              q-item-section(avatar)
                q-icon(color="secondary" name="home" )
              q-item-section
                q-item-label На главную
        q-card(v-else key="x2")
          q-card-section
            .text-h6 Пользователь не авторизован
</template>

<script>
  export default {
    name: "userMenu",
    from({ session , players}) {
      session.user.asIs()
      players.speed.asIs()
    }
  }
</script>

<style scoped>

</style>
