<template>
  <div id="cinema">
    <city></city>
    <cinema-area></cinema-area>
    <cinema-list></cinema-list>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import CinemaArea from '../components/cinema/CinemaArea.vue'
import CinemaList from '../components/cinema/CinemaList.vue'
import City from '../components/home/City.vue'

export default {
  name: 'Cinema',
  components: {
    City,
    CinemaArea,
    CinemaList,
  }
}
</script>

<style lang="less" scoped>
  
</style>