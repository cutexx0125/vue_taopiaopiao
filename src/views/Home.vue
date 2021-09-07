<template>
  <div>
    <city></city>
    <header class="home-header border-bottom">
      <div class="city fl" @click="showCityList">
        <span class="vm city-name f14">{{$store.state.city.name}}</span>
        <span class="city-arrow-icon vm"></span>
      </div>
      <div class="sel-lists f14" @click="moveTab">
        <div :class="{selnav: selnav}" hot="sel">正在热映</div>
        <div :class="{selnav: !selnav}">即将上映</div>
        <span class="move pa" :style="{left: moveDistance}"></span>
      </div>
    </header>
    <!-- 正在热映 -->
    <div v-show="selnav" class="content">
      <swiper :imgs="imgs"></swiper>
      <hot :hotLists="hotLists"></hot>
    </div>
    <!-- 即将上映 -->
    <div v-show="!selnav" class="content">
      <coming :comingLists="comingLists"></coming>
      <div class="click-load-more" @click="clickLoadMore">
        <span v-show="clickLoadStatus === 'start'">点击查看更多</span>
        <div v-show="clickLoadStatus === 'loading'" class="loading-icon">
          <span>加载中</span>
          <mt-spinner style="display: inline-block" type="fading-circle" color="rgb(100, 100, 100)" :size="19"></mt-spinner>
        </div>
        <span v-show="clickLoadStatus === 'complete'">已经全部显示</span>
      </div>
    </div>
    <play-viedo></play-viedo>
  </div>
</template>

<script>
import City from '../components/home/City.vue'

import { mapGetters, mapMutations } from 'vuex'
import Swiper from '../components/home/Swiper.vue'
import Hot from '../components/home/Hot.vue'
import Coming from '../components/home/Coming.vue'
import PlayViedo from '../components/PlayViedo'

export default {
  components: { City, Swiper, Hot, Coming, PlayViedo },
  name: 'Home',
  data() {
    return {
      selnav: true,
      imgs: [],
      moveDistance: '5%',
      comingLists: [],
      loadingLists: [],
      limit: 20,
      offset: 0,
      total: 0,
      clickLoadStatus: 'start'
    }
  },
  created() {
    this.pushComingList({list: []})
    this.getImgs()
    this.getComingLists()
  },
  computed: {
    ...mapGetters(['hotLists'])
  },
  methods: {
    ...mapMutations(['pushLoadStack', 'completeLoad', 'showCityList', 'pushComingList']),
    // tab发生变化
    moveTab (event) {
      event.target.getAttribute('hot') ? this.selectHotTab() : this.slectComingTab()
    },
    // 点击正在热映
    selectHotTab () {
      this.selnav = true
      this.moveDistance = '5%'
      this.pushComingList({lists: []})
    },
    // 点击即将上映
    slectComingTab () {
      this.selnav = false
      this.moveDistance = '55%'
      this.pushComingList({lists: this.loadingLists})
    },
    // 获取轮播图的图片
    getImgs() {
      this.$axios.get('/movie/swiper').then(res => {
        let data = res.data
        this.imgs = data.data.data.returnValue
      })
    },
    // 获取ComingList
    getComingLists() {
      this.$axios.get(`/movie/coming/?limit=${this.limit}&offset=${this.offset}`).then(res => {
        let data = res.data
        let lists = data.data.data.returnValue
        //模拟索引数据的id号
        lists.forEach((item, index) => {
          item.mID = index  
        })
        this.loadingLists = lists
        this.total = data.total
        this.comingLists = this.sortComingData(lists)
        this.offset = this.offset + this.limit
      })
    },
    // 整合ComingLists
    sortComingData(lists) {
      let comingLists = []
      lists.forEach((item) => {
        let hasItem = false
        for (let i = 0; i < comingLists.length; i++) {
          if (item.openTime === comingLists[i].openTime) {
            comingLists[i].movies.push(item)
            hasItem = true 
            break
          }
        }
        if (!hasItem) {
          let comingItem = {
            openTime: '',
            day: '',
            movies: []
          }
          comingItem.openTime = item.openTime
          comingItem.day = this.getWeekDay(new Date(item.openTime).getDay())
          comingItem.movies.push(item)
          comingLists.push(comingItem)
        }
      })
      return comingLists
    },
    // 转换成星期
    getWeekDay (num) {
      let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      return weeks[num]
    },
    // 点击加载更多
    clickLoadMore () {
      if (this.clickLoadStatus != 'complete') {
        this.clickLoadStatus = 'loading'
        setTimeout(() => {
          this.$axios.get(`/movie/coming/?limit=${this.limit}&offset=${this.offset}`).then((res) => {
            let data = res.data
            let lists = data.data.data.returnValue
            this.loadingLists = this.loadingLists.concat(lists)
            //模拟索引数据的id号
            this.loadingLists.forEach((item, index) => {
              item.mID = index  
            })
            this.pushComingList({lists: this.loadingLists})
            this.comingLists = this.sortComingData(this.loadingLists)
            this.offset = this.offset + this.limit
            if (this.offset < this.total) {
              this.clickLoadStatus = 'start'
            } else {
              this.clickLoadStatus = 'complete'
            }
          })
        }, 500)
      }
    },
  }
}
</script>

<style lang="less">
.home-header {
  height: 40px;
  font-size: 0;
  background-color: #fff;
}
.selnav {
  color: #ff4d64;
}
.city {
  width: 35%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
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
}
.sel-lists {
  position: relative;
  width: 65%;
  height: 40px;
  display: flex;
  float: left;
  div {
    height: 40px;
    flex: 1;
    line-height: 40px;
    text-align: center;
  }
}
.move {
  display: inline-block;
  bottom: 0px;
  width: 40%;
  border-bottom: 3px solid #ff4d64;
  -webkit-transition: left 0.7s ease-in-out;
  transition: left 0.7s ease-in-out;
}
.content {
  margin-bottom: 58px;
}
.click-load-more {
  height: 42px;
  line-height: 42px;
  text-align: center;
  color: #333;
  font-size: 15px;
  background-color: #fff;
  margin: 5px 0 8px;
}
.loading-icon span {
  vertical-align: middle;
}
</style>