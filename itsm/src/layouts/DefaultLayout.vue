<template>
  <q-layout view="hHh lPR fFf">
    <q-layout-header>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round @click="rightDrawerOpen = !rightDrawerOpen" aria-label="Menu">
          <q-icon name="menu"/>
        </q-btn>
        <q-toolbar-title>
          ITSM
          <div slot="subtitle">سامانه مدیریت خدمات فناوری اطلاعات &nbsp; 0.1.1</div>
        </q-toolbar-title>
        <!-- <q-toolbar-title>{{isLoggedIn?currentUser.attributes.username:''}} is logged in:{{isLoggedIn}}</q-toolbar-title> -->
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>
<script>
import { openURL } from 'quasar'
// import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainLayout',

  data () {
    return {
      rightDrawerOpen: this.$q.platform.is.desktop,
      miniState: true
    }
  },
  methods: {
    // ...mapActions({ logOut: 'auth/logOut' }),
    openURL
  },
  computed: {
    // ...mapGetters({
    //   currentUser: 'auth/currentUser',
    //   isLoggedIn: 'auth/isLoggedIn'
    // })
  }
}
</script>

<style>
</style>
