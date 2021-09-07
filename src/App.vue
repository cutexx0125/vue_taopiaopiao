<template>
  <div id="app">
    <router-view></router-view>
    <footer-nav :showNav="showNav"></footer-nav>
  </div>
</template>

<script>
import FooterNav from './components/FooterNav.vue'


export default {
  name: 'App',
  components: {
    FooterNav
  },
  watch: {
     // 如果路由有变化，会执行该方法
    '$route': function() {
      this.routeChange()
    }
  },
  methods: {
    routeChange () {
      let path = this.$route.path
      if (path === '/' || path === '/cinema' || path === '/me') {
        this.showNav = true
      } else {
        this.showNav = false
      }
    }
  },
  created () {
    this.routeChange()
  },
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
body {
    background: #f5f5f5;
  }
</style>
