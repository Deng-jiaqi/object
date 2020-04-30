<template>
  <el-checkbox
    :class="{square:shape==='square',round:shape==='round'}"
    ref="checkbox"
    :checked="value"
    @change="change"
  ></el-checkbox>
</template>
<script>
export default {
  name: 'EdgCheckbox',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    shape: {
      type: String,
      default: 'square'
    }
  },
  methods: {
    change () {
      this.$emit('input', this.$refs.checkbox.isChecked)
    }
  }
}
</script>
<style lang="less" scoped>
.round {
  // checkbox的样式修改
  /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: rgba(204, 204, 204, 1);
  }
  /deep/ .el-checkbox__inner {
    background-color: rgba(238, 238, 238, 1);
  }
  /deep/ .el-checkbox__inner:hover {
    border-color: rgba(56, 92, 165, 1);
  }
  /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
    background: linear-gradient(
      90deg,
      rgba(0, 159, 255, 1) 0%,
      rgba(0, 198, 255, 1) 100%
    );
    border-color: rgba(204, 204, 204, 1);
  }
  /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background: #fff;
    border-color: rgba(56, 92, 165, 1);
  }
  /deep/ .el-checkbox__inner::after {
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    width: 10px;
    left: 9px;
    height: 15px;
  }
  /deep/ .el-checkbox__inner {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #fff;
  }
  .el-checkbox {
    margin-right: 6px;
  }
}
.square {
  /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: rgba(0, 159, 255, 1);
  }
  /deep/ .el-checkbox__inner {
    // background-color: rgba(238, 238, 238, 1);
  }
  /deep/ .el-checkbox__inner:hover {
    border-color: rgba(0, 159, 255, 1);
  }
  /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #fff;
    border-color: rgba(0, 159, 255, 1);
  }
  /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background: #fff;
    border-color: rgba(0, 159, 255, 1);
  }
  /deep/ .el-checkbox__inner::after {
    border-right: 2px solid rgba(0, 159, 255, 1);
    border-bottom: 2px solid rgba(0, 159, 255, 1);
    width: 10px;
    left: 9px;
    height: 15px;
  }
  /deep/ .el-checkbox__inner {
    width: 30px;
    height: 30px;
  }
}
  .el-checkbox {
    margin-right: 6px;
  }
</style>
