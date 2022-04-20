<template>
  <div>
    <div v-show="isLoggedin">
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          @click.stop="drawer = !drawer"
        >
          <v-list-item-action >
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
      <v-app-bar fixed app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-icon>mdi-moon-waxing-crescent</v-icon>
        <v-toolbar-title v-text="title"  />
        <v-spacer />
      </v-app-bar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'マイリスト',
          to: '/book',
        },
        {
          icon: 'mdi-magnify',
          title: '検索',
          to: '/book/search',
        },
        {
          icon: 'mdi-account',
          title: 'ログアウト',
          to: '/account',
        },
      ],
      title: 'Reading Maneger',
    }
  },
  computed: {
    isLoggedin() {
      return this.$store.state.auth.isLoggedIn
    },
  },
}
</script>

<style>
</style>