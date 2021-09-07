<template>
  <div class="me">
    <mt-cell
		  title="我的电影票"
		  to="/no"
		  is-link
		  value="">
		</mt-cell>
		<mt-cell
		  title="优惠券"
		  to="/no"
		  is-link
		  value="">
		</mt-cell>
		<mt-cell
		  title="兑换券"
		  to="/no"
		  is-link
		  value="">
		</mt-cell>
		<mt-cell
		  title="帮助中心"
		  to="/no"
		  is-link
		  value="">
		</mt-cell>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Me',
  methods: {
		...mapMutations([
		  'pushLoadStack',
		  'completeLoad'
		])
	}
}
</script>

<style lang="less" scoped>
.me {
	padding-top: 10px;
}
</style>