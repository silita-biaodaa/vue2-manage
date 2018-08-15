<template>
    <div class="home">
          只是登录接口的测试而已的   
    </div>
</template>
<script>
import { province } from '@/api/index';

export default {
  data () {
    return {

    }
  },
  created () {
    this.inlist()
  },
  methods: {
    inlist() {
      province().then(res => {
         console.log(res)
        }
      )
    }
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
</style>
