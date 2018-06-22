/**
* Created by qqwan on 2018/4/26.
*/
<template>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.name">
        <span v-if="index==breadcrumbs.length-1">{{item.name}}</span>
        <router-link v-else :to="item.path">{{item.name}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      breadcrumbs: []
    }
  },
  methods: {
    getBreadcrumb () {
      this.breadcrumbs = []
      let route = this.$route
      let matched = this.$route.matched
      // 要求：需按面包屑层级构建路由层级，当前路由页面isBreadcrumb为true则显示面包屑
      if (matched.length > 2 && route.meta.isBreadcrumb !== undefined && route.meta.isBreadcrumb) {
        for (let index in matched) {
          // 路由层级中可以设置中间层级isBreadcrumb为false，故只有为true才显示面包屑,去除/根层级和导航层级，index从2开始显示面包屑
          if (index > 1 && matched[index].meta.isBreadcrumb !== undefined && matched[index].meta.isBreadcrumb) {
            let bread = {}
            bread.name = matched[index].name
            bread.path = matched[index].path
            bread.matchIndex = index
            this.breadcrumbs.push(bread)
          }
        }
        // 此前只push了isBreadcrumb为true的层级，不包含导航，这里将导航层级加在数组最前面
        if (this.breadcrumbs.length > 0) {
          let bread = {}
          for (let index in matched) {
            if (index <= this.breadcrumbs[0].matchIndex && matched[index].meta.isMenu !== undefined && matched[index].meta.isMenu) {
              bread.name = matched[index].name
              bread.path = matched[index].path
            }
          }
          if (bread.name !== undefined) {
            this.breadcrumbs.unshift(bread)
          }
        }
      }
    }
  },
  mounted () {
    this.getBreadcrumb() // 请输入路由par6_2_1_1作参考
  },
  watch: {
    '$route': 'getBreadcrumb'
  }
}
</script>
