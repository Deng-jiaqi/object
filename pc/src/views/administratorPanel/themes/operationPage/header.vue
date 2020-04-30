<template>
  <transition
    :duration="{enter:1000,leave:1000}"
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight"
  >
    <div class="option-page option-page-header" v-show="optionVisible">
      <p class="option-page-title">
        <span @click="optionVisible=false" class="iconfont icon-fanhui1"></span>{{$t('customHeaders.text1')}}
      </p>
      <div class="content-option-page-header">
        <div class="c-custom-logo">
          <p class="logo-text1">{{$t('customHeaders.text2')}}</p>
          <!-- 上传 -->
          <div class="c-upload">
            <Uploadimg @success="getUploadImgSrc" :imgsrc='header_set.imgSrc'/>
          </div>
          <!-- 图片宽度 -->
          <p class="img-width-text1">{{$t('customHeaders.text3')}} (px)</p>
          <el-input @blur='changeHeaderLogoWidth' type='number' @input="checkInput" v-model.number="header_set.imgWidth"></el-input>
          <div class="line"></div>
        </div>
        <div class="c-custom-color">
          <p class="color-text1">{{$t('customHeaders.text4')}}</p>
          <div class="color-header">
            <el-color-picker v-model="header_set.background"></el-color-picker>
            <span>{{$t('customHeaders.text5')}}</span>
          </div>
          <div class="color-header">
            <el-color-picker v-model="header_set.textColor"></el-color-picker>
            <span>{{$t('customHeaders.text6')}}</span>
          </div>
          <div class="color-header">
            <el-color-picker v-model="header_set.cartAndInputBackgroundColor"></el-color-picker>
            <span>{{$t('customHeaders.text7')}}</span>
          </div>
          <div class="color-header color-header-active-link">
            <el-color-picker v-model="header_set.activeLinkColor"></el-color-picker>
            <span>{{$t('customHeaders.text8')}}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Uploadimg from '@/components/administratorPanel/themes/imgUpload'
import { cloneDeep, isEqual } from 'lodash'
export default {
  name: 'Header',
  components: {
    Uploadimg
  },
  data () {
    return {
      // 变量
      compId: null,
      initializeChange: true, // 初始化时候改变
      originalSettings: null, // 初始化设置
      // header的设置
      header_set: {
        imgSrc: '',
        imgWidth: '90',
        background: '#182e49',
        textColor: '#fff',
        cartAndInputBackgroundColor: '#0f243d',
        activeLinkColor: '#fda506'
      },
      //   ui
      optionVisible: false
    }
  },
  watch: {
    'header_set.background': {
      handler (val) {
        if (val) {
          this.$emit('operationSuccess', {
            cmd: 'setHeaderBackground',
            params: {
              background: this.header_set.background
            }
          })
        }
      }
    },
    'header_set.textColor': {
      handler (val) {
        if (val) {
          this.$emit('operationSuccess', {
            cmd: 'setHeaderTextColor',
            params: {
              textColor: this.header_set.textColor
            }
          })
        }
      }
    },
    'header_set.cartAndInputBackgroundColor': {
      handler (val) {
        if (val) {
          this.$emit('operationSuccess', {
            cmd: 'setHeaderCartAndInputBackgroundColor',
            params: {
              cartAndInputBackgroundColor: this.header_set.cartAndInputBackgroundColor
            }
          })
        }
      }
    },
    'header_set.activeLinkColor': {
      handler (val) {
        if (val) {
          this.$emit('operationSuccess', {
            cmd: 'setHeaderActiveLinkColor',
            params: {
              activeLinkColor: this.header_set.activeLinkColor
            }
          })
        }
      }
    },
    header_set: {
      handler (newValue, oldValue) {
        if (this.initializeChange) {
          console.log('第一次')
          this.initializeChange = false
          this.originalSettings = cloneDeep(newValue)
        } else {
          if (!isEqual(this.originalSettings, newValue)) {
            this.$emit('customSettingsChange', 'change', this.compId, newValue)
          } else {
            this.$emit('customSettingsChange', 'delete', this.compId)
          }
        }
      },
      deep: true
    }
  },
  methods: {
    changeHeaderLogoWidth () {
      this.$emit('operationSuccess', {
        cmd: 'setLogoWidth',
        params: {
          logoWidth: this.header_set.imgWidth
        }
      })
    },
    checkInput () {

    },
    getUploadImgSrc (imgbase64) {
      this.header_set.imgSrc = imgbase64
      // 获取上传的图片的base64编码
      this.$emit('operationSuccess', {
        cmd: 'setHeaderImg',
        params: {
          imgSrc: imgbase64
        }
      })
    },
    getParentComponentData (parentComponentData, compId) {
      this.header_set = parentComponentData
      this.compId = compId
    }
  },
  created () {

  }
}
</script>
<style lang="less" scoped>
.option-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(249, 250, 251, 1);
  z-index: 10;
  .option-page-title {
    font-size: 19px;
    line-height: 67px;
    height: 67px;
    padding-left: 15px;
    box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
      0 1px 3px 0 rgba(63, 63, 68, 0.15);
    .icon-fanhui1 {
      font-size: 16px;
      margin-right: 5px;
      cursor: pointer;
    }
  }
}
.option-page-header {
  .content-option-page-header {
    margin-top: 18px;
    padding-left: 29px;
    padding-right: 29px;
    .c-custom-logo {
      padding-bottom: 24px;
      position: relative;
      .logo-text1 {
        margin-bottom: 18px;
        font-size: 16px;
      }
      .c-upload {
        text-align: center;
      }
      .box-upload:hover {
        border-color: #4267b2;
        color: #4267b2;
      }
      .img-width-text1 {
        font-size: 15px;
        margin-top: 24px;
        margin-bottom: 11px;
      }
      .line {
        width: calc(100% + 58px);
        height: 2px;
        background-color: rgba(234, 235, 236, 1);
        position: absolute;
        left: -29px;
        bottom: 0;
      }
    }
    .c-custom-color {
      .color-text1 {
        font-size: 16px;
        margin-top: 24px;
        margin-bottom: 20px;
      }
      .color-header {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        /deep/ .el-color-picker__trigger {
          width: 56px;
          margin-right: 15px;
        }
        /deep/ .el-color-picker__empty::before {
          display: none;
        }
        /deep/ .el-color-picker__icon {
          display: none;
        }
      }
      .color-header-active-link {
        margin-bottom: 0;
      }
    }
  }
}
p {
  margin: 0;
}
ul {
  margin: 0;
}
</style>
