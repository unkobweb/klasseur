<template>
  <v-app>
    <UserMenu/>
    <Nuxt/>
  </v-app>
</template>

<style>
html {
  font-size: 21px;
}
.v-application--wrap{
  display: flex;
  flex-direction: row;
}
</style>

<script>
import UserMenu from '~/components/menus/UserMenu'

export default {
  middleware: 'auth',
  components: {UserMenu},
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
