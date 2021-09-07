<template>
  <div class="pf fadeInDown" id="select-city" ref="city"
  v-if="$store.state.city.show">
    <!-- 头部 -->
    <header class="city-header mint-1px-b pr">
      <span class="fb">选择城市</span>
      <span class="close-city pa" @click="cancelCityList">×</span>
    </header>
    <!-- 内容 -->
    <div @click="selectCity">
      <mt-index-list>
        <mt-index-section v-for="city in cityList" :key="city.id"
        :index="city.sort">
          <mt-cell v-for="name in city.data" :key="name.id"
          :title="name.regionName"></mt-cell>
        </mt-index-section>
      </mt-index-list>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'City',
  data() {
    return {
      // 城市列表数据
      cityList: []
    }
  },
  created() {
    this.$store.dispatch('updateCityAsync', {city: {}})
    this.getCityList()
  },
  methods: {
    ...mapMutations(['pushLoadStack', 'completeLoad']),
    ...mapActions(['updataCityAsync']),
    getCityList() {
      this.pushLoadStack()
      this.$axios.get('/movie/city').then(res => {
        let data = res.data
        let cityObj = data.data.data.returnValue
        // 拿到A B C D...
        let citySort = Object.keys(cityObj)
        this.cityList.push({
          sort:'热门',
          data: [
            {
              regionName: '北京',
              id: 1,
              rN: 'bj'
            },
            {
              regionName: '上海',
              id: 2,
              rN: 'sh'
            },
            {
              regionName: '广州',
              id: 2,
              rN: 'gz'
            }
          ]
        })
        citySort.forEach((item) => {
          this.cityList.push({
            sort: item,
            data: cityObj[item]
          })
        })
      }).then(this.completeLoad)
    },
    cancelCityList() {
      this.changeCityData({city : {}})
    },
    changeCityData(data) {
      this.pushLoadStack()
      this.$refs.city.className = 'pf fadeOutTop'
      this.$store.dispatch('updateCityAsync', data).then(this.completeLoad)
    },
    matchCityStr (str) {
			let randomList = ['bj', 'sh', 'gz']
			let randomCity = randomList[Math.floor(3*Math.random())]
			switch (str) {
				case '北京': return 'bj'
				case '上海': return 'sh'
				case '广州': return 'gz'
				default: return randomCity
			}
		},
    selectCity(event) {
      let ele = event.target
      let className = ele.className
      let name = ''
      if (className === "mint-indexsection-index" || className ==="mint-indexlist-nav" || className === "mint-indexlist-navitem") {
				name = ''
			} else if (className === 'mint-cell-wrapper') {
				name = ele.children[0].children[0].innerHTML
			} else if (className === "mint-cell-title") {
				name = ele.children[0].innerHTML
			} else {
				name = ele.innerHTML 
      }
			if (name) {
				this.changeCityData({
					city: {
						name: name,
						rN: this.matchCityStr(name)
					}
				}) 
			} else {
				return false
			}
    }
  }
}
</script>

<style lang="less">
#select-city {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 9999;
  background-color: #fff;
  .city-header {
    height: 46px;
    line-height: 46px;
    text-align: center;
    color: #000;
    font-size: 16px;
    background-color: #fff;
    .close-city {
      font-size: 28px;
      color: #666;
      display: inline-block;
      height: 46px;
      width: 50px;
      text-align: center;
      right: 0;
    }
  }
}
@keyframes fadeInDown {
  0% {
    opacity: .7;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform:translateY(0);
  }
}
.fadeInDown {
  animation: fadeInDown .3s;
}
@keyframes fadeOutTop {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-50px);
  }
}
.fadeOutTop {
  animation: fadeOutTop .35s;
}
</style>