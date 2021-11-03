<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      absolute
      temporary
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Klasseur
          </v-list-item-title>
          <v-list-item-subtitle>
            {{$auth.user.username}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="item.onClick"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "RootMenu",
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-monitor-dashboard',
          title: 'Tableau de bord',
          onClick: () => this.$router.push('/root/dashboard')
        },
        {
          icon: 'mdi-account-supervisor',
          title: 'Utilisateurs',
          onClick: () => this.$router.push('/root/users')
        },
        {
          icon: 'mdi-logout',
          title: 'Déconnexion',
          onClick: () => {
            this.$auth.logout().then(() => this.$router.go(0))
          }
        }
      ],
      miniVariant: false,
      title: 'Klasseur'
    }
  }
}
</script>