<template>
  <div class="c-navigationPane" :class="open?'isOpen':'isClose'">
    <ul class="navs">
      <li>
        <p @click="linkVisible=!linkVisible">订单</p>
        <el-collapse-transition>
          <div class="c-links" v-show="linkVisible">
            <router-link
              :to="'/administratorPanel/orderManagement/indexOfAllOrders/allOrdersTable'"
            >所有订单</router-link>
            <router-link :to="'/administratorPanel/orderManagement/indexOfAbandonedOrders'">弃单</router-link>
          </div>
        </el-collapse-transition>
      </li>
      <p>111111</p>
      <p>111111</p>
      <p>111111</p>
    </ul>
    <!-- <p>111111111111111</p> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'NavigationPane',
  data () {
    return {
      // ui
      open: false,
      linkVisible: false
    }
  },
  computed: {
    ...mapState(['forAdministratorPanelNavigation'])
  },
  watch: {
    forAdministratorPanelNavigation: {
      handler (val) {
        if (val === 'close') {
          this.open = false
        }
        if (val === 'open') {
          this.open = true
        }
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang='less'>
.isOpen {
  z-index: 1;
  display: block;
}
.isClose {
  z-index: -1;
  display: none;
}
.c-navigationPane {
  left: 120px;
  right: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  .navs {
    margin-bottom: 0;
    margin-top: 80px;
    padding-left: 100px;
  }
  .c-links {
    a {
      display: block;
      color: rgb(51, 51, 51);
      margin-bottom: 40px;
    }
    a:last-child {
      margin-bottom: 0;
    }
  }
}
p {
  margin: 0;
}
</style>
