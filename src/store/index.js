import Vue from 'vue'
import Vuex from 'vuex'
import cityMutaions from './city/mutations'
import cityActions from './city/actions'
import loadingMutations from './loading/mutations'
import videoMutations from './video/mutations'
import comingMutations from './coming/mutations'
import cinemaMutations from './cinema/mutations'

Vue.use(Vuex)

const city = {
  state: {
    name: '北京',
    show: false,
    rN: 'bj',
    data: []
  },
  actions: cityActions,
  mutations: cityMutaions,
  getters: {
    hotLists: state => state.data,
    cityName: state => state.name
  }
}

const loading = {
  state: {
    stack: []
  },
  mutations: loadingMutations
}

const video = {
  state: {
    url: '',
    cover: '',
    playStatus: false
  },
  mutations: videoMutations,
  getters: {
    showMask: state => state.playStatus
  }
}

const coming = {
  state: {
    lists: []
  },
  mutations: comingMutations
}

const cinema = {
  state: {
    area: []
  },
  mutations: cinemaMutations
}

export default new Vuex.Store({
  modules: {
    city,
    loading,
    video,
    coming,
    cinema
  }
})
