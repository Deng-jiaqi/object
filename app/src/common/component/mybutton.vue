<template>
  <div :class="myclass" class="mybutton" :style="{width,height}">{{text}}</div>
</template>

<script>
export default {
  name: 'Mybutton',
  props: {
    width: {
      type: String,
      required: true
    },
    height: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    myclass: {
      type: String,
      required: false
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
.mybutton {
  border-radius: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 34px;
  color: #fff;
  background-color: rgba(253, 194, 88, 1);
  box-shadow:0px 30px 60px 0px rgba(255,204,111,0.65);
}
.mybutton:hover {
  cursor: pointer;
}
.mybutton:active {
  background-color: rgba(239, 187, 93, 1);
}
.cantclick {
  cursor: not-allowed !important;
  background-color: #f3d19e;
}
</style>
