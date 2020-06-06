<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Awesome Exercise 4
        </q-toolbar-title>

        <div>Firebase</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Navigation</q-item-label>
        <q-item clickable to="/" exact>
          <q-item-section avatar>
            <q-icon name="fastfood" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Foods</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="!loggedIn" clickable to="/auth" exact>
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section>
            <q-item-label >Login</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-else clickable @click="logoutUser" exact>
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section>
            <q-item-label >Logout {{ userEmail }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    ...mapState('auth', [
      'loggedIn', 'userEmail'
    ]),
  },
  methods: {
    ...mapActions('auth', [
      'logoutUser'
    ]),
    openURL
  }
}
</script>

<style>
</style>
