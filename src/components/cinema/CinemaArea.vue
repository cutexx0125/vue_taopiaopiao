<template>
  <div style="margin-top: 40px;" :class="{mask: showArea}" @click="cancelArea">
    <header class="cm-header pf">
			<div class="mint-1px-r" @click="showCityList">
				<span>{{ cityName }}</span>
				<span class="city-arrow-icon vm"></span>
			</div>
			<div @click="showAreaAction">
				<span>{{ area }}</span>
				<span class="city-arrow-icon vm"></span>
			</div>
		</header>

    <ul class="area-item"  v-show='showArea' @click="selectAreaAction">
			<li>全部区域（{{allArea.length}}）</li>
			<li v-for="item in regionOrder" :key="item.id">
				{{ item }}（{{regionCinemas[item].length}}）
			</li>
		</ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'CinemaArea',
  data() {
    return {
      // 区
      area: '全部区域',
      showArea: false,
      // 某个区有的电影院
      allArea: [],
      // 某个城市的所有区
      regionOrder: [],
      // 每个区有的电影院
      regionCinemas: {}
    }
  },
  computed: {
    ...mapGetters(['cityName'])
  },
  methods: {
    ...mapMutations(['pushLoadStack', 'completeLoad', 'showCityList', 'updateAreaData']),
    // 当点击别的地方时，不显示选择区域部分
    cancelArea (event) {
			if (event.target.className === 'mask') {
				this.showArea = false
				document.documentElement.style.overflow = 'scroll'
			}
    },
    // 显示选择区域部分
    showAreaAction () {
			this.showArea = true
			document.documentElement.style.overflow = 'hidden'
    },
    selectAreaAction (event) {
      // str为选择的区域
      let str = event.target.innerHTML.trim()
      // 中文（的形式
			let reg = /([\u4e00-\u9fa5]*)\（/
			this.area = reg.exec(str)[1]
			this.showArea = false
			document.documentElement.style.overflow = 'scroll'
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
    getAreaData(cityName) {
      this.pushLoadStack()
      let cityStr = this.matchCityStr(cityName)
      this.allArea = []
      this.$axios.get(`/movie/cinema/?city=${cityStr}`).then(res => {
        let data = res.data
        let regionOrder = data.data.data.returnValue.regionOrder
        let regionCinemas = data.data.data.returnValue.regionCinemas
        this.regionOrder = regionOrder
        this.regionCinemas = regionCinemas
        regionOrder.forEach(item => {
          regionCinemas[item].forEach(cinema => {
            this.allArea.push(cinema)
          })
        })
        this.completeLoad()
      })
    }
  },
  created() {
    this.getAreaData(this.$store.state.city.name)
    setTimeout(() => {
      this.updateAreaData({area: this.allArea})
    }, 0)
  },
  watch: {
    // 当区域改变时
		area () {
			if (this.area === '全部区域') {
				this.updateAreaData({area: this.allArea})
			} else {
				this.updateAreaData({area: this.regionCinemas[this.area]})
			}
    },
    // 当城市改变时
		cityName () {
			this.getAreaData(this.cityName)
			this.area = '全部区域'
			setTimeout(() => {
				this.updateAreaData({area: this.allArea})
			}, 0)
		}
	}
}
</script>

<style lang="less">
.cm-header {
	background: #fafafa;
    color: #333;
    height: 40px;
    line-height: 26px;
    font-size: 14px;
    left: 0px;
    right: 0px;
    top: 0px;
    display: -webkit-box;
    box-sizing: border-box;
    padding: 8px 0;
    border-bottom: 1px solid #ebebeb;
}
.cm-header>div {
	-moz-box-flex: 1.0;
	-webkit-box-flex: 1.0;
	text-align: center;
	box-sizing: border-box;
}
.area-item {
	background-color: #fff;
	font-size: 14px;
	color: #222;
	box-sizing: border-box;
	max-height: 70%;
	padding-left: 15px;
	overflow-y: scroll;
}
.area-item {
  li {
    padding: 14px 0;
    border-bottom: 1px solid #ebebeb;
  }
}
.city-arrow-icon {
  margin-left: 4px;
  width: 12px;
  height: 12px;
  display: inline-block;
}
.city-arrow-icon:after {
  content: "";
  display: block;
  width: 6px;
  height: 6px;
  margin-left: 0;
  border: 1px solid #50505a;
  border-top: 0 none;
  border-left: 0 none;
  margin-left: 2px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>