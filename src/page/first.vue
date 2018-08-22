<template>
    <div class="first">
          测试环境的界面，数据接口测试在控制台中展示
    </div>
</template>
<script>
import { checkType } from '@/api/index'
export default {
  data () {
    return {

    }
  },
  created () {
    // this.inList()
  },
  methods: {
      // inList() {
      //     checkType().then(res => {
      //       console.log(res)
      //     })
      // }
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
</style>