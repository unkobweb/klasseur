<template>
  <v-app>
    <RootMenu/>
    <v-main>   
        <Nuxt/>
    </v-main>
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
import RootMenu from '~/components/menus/RootMenu'

export default {
  middleware: ['auth','isRoot'],
  components: {RootMenu},
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Klasseur'
    }
  }
}
</script>
