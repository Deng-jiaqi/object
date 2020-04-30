<template>
  <transition
    :duration="{enter:1000,leave:1000}"
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight"
  >
    <div class="option-page option-page-footer" v-show="optionVisible">
      <p class="option-page-title">
        <span @click="optionVisible=false" class="iconfont icon-fanhui1"></span>{{$t('customFooter.text1')}}
      </p>
      <p class="title-content">{{$t('customFooter.text2')}}</p>
      <div class="c-content-item">
        <!-- 链接 -->
        <div class="content-item" @click="linkVisible=!linkVisible">
          <span class="iconfont icon-sanjiaoxing-xia"></span>{{footer_set.quickLinks_set.quickLinksTitle}}
        </div>
        <el-collapse-transition>
          <div class="content-item-hide" v-show="linkVisible">
            <div class="c-content-input">
              <p class="label-content-input">{{$t('customFooter.text3')}}</p>
              <el-input @blur="titleChange('quickLinks')" v-model="footer_set.quickLinks_set.quickLinksTitle"></el-input>
            </div>
            <div class="link-list">
              <div class="link-item">
                <el-checkbox @change="linkVisibleChange('home')" v-model="footer_set.quickLinks_set.WhetherDisplayhomePageLink">{{$t('customFooter.text4')}}</el-checkbox>
              </div>
              <div class="link-item">
                <el-checkbox @change="linkVisibleChange('shoppingCart')" v-model="footer_set.quickLinks_set.WhetherDisplayCatalogLink">{{$t('customFooter.text5')}}</el-checkbox>
              </div>
            </div>
          </div>
        </el-collapse-transition>
        <!-- 简介 -->
        <div class="content-item" @click="introduceVisible=!introduceVisible">
          <span class="iconfont icon-sanjiaoxing-xia"></span>{{footer_set.getInTouch_set.getInTouchTitle}}
        </div>
        <el-collapse-transition>
          <div class="content-item-hide" v-show="introduceVisible">
            <div class="c-content-input">
              <p class="label-content-input">{{$t('customFooter.text6')}}</p>
              <el-input @blur="titleChange('getInTouch')" v-model="footer_set.getInTouch_set.getInTouchTitle"></el-input>
            </div>
            <div class="c-content-input">
              <p class="label-content-input">{{$t('customFooter.text7')}}</p>
              <el-input @blur="textChange('getInTouch')" v-model="footer_set.getInTouch_set.text" type="textarea" :rows="4" maxlength="80" :show-word-limit="true"></el-input>
            </div>
          </div>
        </el-collapse-transition>
        <!-- 邮件 -->
        <div class="content-item" @click="emailVisible=!emailVisible">
          <span class="iconfont icon-sanjiaoxing-xia"></span>{{footer_set.newsletter_set.newsletterTitle}}
        </div>
        <el-collapse-transition>
          <div class="content-item-hide" v-show="emailVisible">
            <div class="c-content-input">
              <p class="label-content-input">{{$t('customFooter.text8')}}</p>
              <el-input v-model="footer_set.newsletter_set.newsletterTitle" @blur="titleChange('newsletter')" ></el-input>
            </div>
            <div class="c-content-input">
              <p class="label-content-input">{{$t('customFooter.text9')}}</p>
              <el-input v-model="footer_set.newsletter_set.text" @blur="textChange('newsletter')" type="textarea" :rows="4" maxlength="60" :show-word-limit="true"></el-input>
            </div>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </transition>
</template>
<script>
import { cloneDeep, isEqual } from 'lodash'
export default {
  name: 'Footer',
  data () {
    return {
      footer_set: {
        quickLinks_set: {
          quickLinksTitle: 'Quick links',
          WhetherDisplayhomePageLink: false,
          WhetherDisplayCatalogLink: false
        },
        getInTouch_set: {
          getInTouchTitle: 'Get in touch',
          text: 'Use this text to share information about your brand with your customers.'
        },
        newsletter_set: {
          newsletterTitle: 'Newsletter123',
          text: 'Promotions,new products and sales,Directly to your inbox.'
        }
      },
      // 变量
      initializeChange: true, // 初始化时候改变
      originalSettings: null, // 初始化设置
      // ui
      optionVisible: false,
      linkVisible: false, // 底部链接
      introduceVisible: false, // 底部简介
      emailVisible: false // 底部邮箱
    }
  },
  watch: {
    footer_set: {
      handler (newValue, oldValue) {
        if (this.initializeChange) {
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
    titleChange (type) { // footer标题改变
      switch (type) {
        case 'quickLinks':
          this.$emit('operationSuccess', {
            cmd: 'quickLinksTitleChange',
            params: {
              quickLinksTitle: this.footer_set.quickLinks_set.quickLinksTitle
            }
          })
          break
        case 'getInTouch':
          this.$emit('operationSuccess', {
            cmd: 'getInTouchTitleChange',
            params: {
              getInTouchTitle: this.footer_set.getInTouch_set.getInTouchTitle
            }
          })
          break
        case 'newsletter':
          this.$emit('operationSuccess', {
            cmd: 'newsletterTitleChange',
            params: {
              newsletterTitle: this.footer_set.newsletter_set.newsletterTitle
            }
          })
          break
        default:
          break
      }
    },
    linkVisibleChange (type) {
      switch (type) {
        case 'home':
          this.$emit('operationSuccess', {
            cmd: 'quickLinksHomeVisibleChange',
            params: {
              WhetherDisplayhomePageLink: this.footer_set.quickLinks_set.WhetherDisplayhomePageLink
            }
          })
          break
        case 'shoppingCart':
          this.$emit('operationSuccess', {
            cmd: 'quickLinksCatalogVisibleChange',
            params: {
              WhetherDisplayCatalogLink: this.footer_set.quickLinks_set.WhetherDisplayCatalogLink
            }
          })
          break
        default:
          break
      }
    },
    textChange (type) {
      switch (type) {
        case 'getInTouch':
          this.$emit('operationSuccess', {
            cmd: 'getInTouchTextChange',
            params: {
              text: this.footer_set.getInTouch_set.text
            }
          })
          break
        case 'newsletter':
          this.$emit('operationSuccess', {
            cmd: 'newsletterTextChange',
            params: {
              text: this.footer_set.newsletter_set.text
            }
          })
          break
        default:
          break
      }
    },
    getParentComponentData (parentComponentData, compId) {
      this.footer_set = parentComponentData
      this.compId = compId
    }
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
.option-page-footer {
  .title-content {
    line-height: 67px;
    height: 67px;
    padding-left: 32px;
    border-bottom: 1px solid rgb(232, 233, 234);
  }
  .c-content-item {
    .c-content-input {
      margin-bottom: 20px;
      .label-content-input {
        margin-bottom: 10px;
      }
    }
    .content-item {
      height: 60px;
      border-bottom: 1px solid rgb(232, 233, 234);
      background: #fff;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 9px;
      padding-right: 29px;
      cursor: pointer;
      .icon-sanjiaoxing-xia {
        transform: rotate(-90deg);
        margin-right: 10px;
        color: #798c9c;
        font-size: 8px;
      }
    }
    .content-item-hide {
      padding: 25px 29px 25px 29px;
      border-bottom: 1px solid #e8e9ea;
      .link-list {
        .link-item {
          margin-bottom: 10px;
        }
        .link-item:last-child {
          margin-bottom: 0px;
        }
      }
    }
  }
}
</style>
