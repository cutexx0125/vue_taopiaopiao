<template>
  <div class="swiper-container" id="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in imgs" :key="item.id">
        <img :src="'https://gw.alicdn.com/tfs/' + item.smallPicUrl" class="img">
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from '../../assets/js/swiper.min.js'

export default {
  name: 'Swiper',
  props: {
    imgs: {
      type: Array,
      defalut: () => []
    }
  },
  watch: {
  	imgs() {
  		this.$nextTick(() => {
		  	new Swiper ('.swiper-container', {
			    loop: true,
			    pagination: '.swiper-pagination',
			    paginationClickable: true,
			    autoplay : 2000,
				  autoplayDisableOnInteraction : false,		    
			}) 
  		})
  	}
  }
}
</script>

<style lang="less">
#swiper {
  width: 320px;
  height: 134px;
}
img {
  width: 100%;
  height: auto;
}
#swiper .swiper-pagination-bullet {
  background: #e5e8e8;
  opacity: 1;
}
#swiper .swiper-pagination-bullet-active {
  background: #ff5733;
}
</style>