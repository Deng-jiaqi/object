<template>
  <transition
    :duration="{enter:1000,leave:1000}"
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight"
  >
    <div class="option-page option-page-slide" v-show="optionVisible">
      <p class="option-page-title">
        <span @click="optionVisible=false" class="iconfont icon-fanhui1"></span>{{$t('customSlide.text1')}}
      </p>
      <!-- 所有图片的操作 -->
      <div class="c-slide-overall-set">
        <p class="c-slide-overall-set-title">{{$t('customSlide.text2')}}</p>
        <div class="content-slide-overall-set">
          <p class="lable-slide-fontchoose">{{$t('customSlide.text3')}}</p>
          <el-select v-model="slide_set.slideFontSize">
            <el-option
              v-for="item in $t('customSlide.slideFontSizeList')"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <p class="lable-slide-fontposition">{{$t('customSlide.text4')}}</p>
          <el-select v-model="slide_set.slideFontPosition">
            <el-option
              v-for="item in  $t('customSlide.slideFontPositionList')"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <el-checkbox class="slideAutoPlay" v-model="slide_set.slideAutoPlay">幻灯片自动播放</el-checkbox>
          <div class="slideAutoPlay-time">
            <p class="lable-slide-autoPlaytime">自动播放时间间隔</p>
            <el-select v-model="slide_set.slideAutoPlayTimeInterval">
              <el-option
                v-for="item in slideAutoPlayTimeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div> -->
        </div>
      </div>
      <!-- 单个图片的编辑 -->
      <div class="c-img-edit">
        <p class="img-edit-title">{{$t('customSlide.text5')}}</p>
        <ul class="ul-img-edit-item">
          <li v-for="(item,index) in slide_set.slideImgs" :key="index">
            <div
              class="img-edit-item"
              @click="imgListVisible[index].hideVisible=!imgListVisible[index].hideVisible"
            >
              <span class="iconfont icon-sanjiaoxing-xia"></span>
              <div class="c-img"></div>
              <span>{{$t('customSlide.text6')}}</span>
            </div>
            <el-collapse-transition>
              <div v-if="imgListVisible.length>0">
                <div class="img-edit-item-hide" v-show="imgListVisible[index].hideVisible">
                  <p class="upload-hide-text1">{{$t('customSlide.text7')}}</p>
                  <div class="c-uploadimg-slide">
                    <Uploadimg :imgsrc="item.imgsrc" :index='index' @success="getUploadImgSrc" />
                  </div>
                  <div class="input-item">
                    <p>{{$t('customSlide.text8')}}</p>
                    <el-input @blur='modifySlideItemTitle(item.title,index)' v-model="item.title"></el-input>
                  </div>
                  <div class="input-item">
                    <p>{{$t('customSlide.text9')}}</p>
                    <el-input @blur='modifySlideItemSubtitle(item.subtitle,index)' v-model="item.subtitle"></el-input>
                  </div>
                  <div class="input-item">
                    <p>{{$t('customSlide.text10')}}</p>
                    <el-input @blur='modifySlideItemImageLinks(item.imageLinks,index)' v-model="item.imageLinks" :placeholder="$t('customSlide.text11')"></el-input>
                  </div>
                  <div
                    class="delete-slideimg"
                    v-show="slide_set.slideImgs.length>2"
                    @click="deleteSlideImgItem(index)"
                  >
                    <span class="iconfont icon-shanchu2"></span>{{$t('customSlide.text12')}}
                  </div>
                </div>
              </div>
            </el-collapse-transition>
          </li>
        </ul>
        <div class="addslideimgItem" @click="addslideimgItem" v-show="slide_set.slideImgs.length<6">
          <span class="iconfont icon-jiahao"></span>{{$t('customSlide.text13')}}
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Uploadimg from '@/components/administratorPanel/themes/imgUpload'
import { cloneDeep, isEqual, remove } from 'lodash'
export default {
  name: 'Slide',
  components: {
    Uploadimg
  },
  data () {
    return {
      slide_set: {
        slideFontSize: 1,
        slideFontPosition: 1,
        slideAutoPlay: false,
        slideAutoPlayTimeInterval: '',
        slideImgs: [
          {
            imgsrc: '',
            title: '',
            subtitle: '',
            imageLinks: ''
          }
        ]
      },
      // 变量
      compId: null,
      initializeChange: true, // 初始化时候改变
      originalSettings: null, // 初始化设置
      // ui
      optionVisible: false,
      imgListVisible: [], // 幻灯片list的开关显示
      //   data
      slideAutoPlayTimeList: [
        {
          value: 3,
          label: '3'
        },
        {
          value: 4,
          label: '4'
        },
        {
          value: 5,
          label: '5'
        },
        {
          value: 6,
          label: '6'
        },
        {
          value: 7,
          label: '7'
        },
        {
          value: 8,
          label: '8'
        }
      ]
    }
  },
  watch: {
    'slide_set.slideFontSize': {
      handler (val) {
        this.$emit('operationSuccess', {
          cmd: 'setSlideFontSize',
          params: {
            slideFontSize: this.slide_set.slideFontSize
          }
        })
      }
    },
    'slide_set.slideFontPosition': {
      handler (val) {
        this.$emit('operationSuccess', {
          cmd: 'setSlideFontPosition',
          params: {
            slideFontPosition: this.slide_set.slideFontPosition
          }
        })
      }
    },
    'slide_set.slideAutoPlay': {
      handler (val) {
        this.$emit('operationSuccess', {
          cmd: 'setSlideAutoPlay',
          params: {
            autoPlay: val
          }
        })
      }
    },
    'slide_set.slideAutoPlayTimeInterval': {
      handler (val) {
        if (val) {
          this.$emit('operationSuccess', {
            cmd: 'setSlideAutoPlayTimeInterval',
            params: {
              slideAutoPlayTimeInterval: this.slide_set
                .slideAutoPlayTimeInterval
            }
          })
        } else {
          this.$emit('operationSuccess', {
            cmd: 'setSlideAutoPlayTimeInterval',
            params: {
              slideAutoPlayTimeInterval: this.slide_set
                .slideAutoPlayTimeInterval
            }
          })
        }
      }
    },
    slide_set: {
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
    deleteSlideImgItem (index) {
      // 根据下标删除某一项
      this.slide_set.slideImgs = remove(
        this.slide_set.slideImgs,
        (value, idx) => {
          return idx !== index
        }
      )
      this.imgListVisible = remove(
        this.imgListVisible,
        (value, idx) => {
          return idx !== index
        }
      )
      this.$emit('operationSuccess', {
        cmd: 'deleteSlideImgItem',
        params: {
          index: index
        }
      })
    },
    addslideimgItem () {
      this.slide_set.slideImgs.push({
        imgsrc: '',
        title: '',
        subtitle: '',
        imageLinks: ''
      })
      this.imgListVisible.push({ hideVisible: false })
      this.$emit('operationSuccess', {
        cmd: 'addSlideImgItem',
        params: {
        }
      })
    },
    modifySlideItemTitle (title, index) { // 修改轮播标题
      this.$emit('operationSuccess', {
        cmd: 'modifySlideItemTitle',
        params: {
          title: title,
          index: index
        }
      })
    },
    modifySlideItemSubtitle (subtitle, index) { // 修改轮播副标题
      this.$emit('operationSuccess', {
        cmd: 'modifySlideItemSubtitle',
        params: {
          subtitle: subtitle,
          index: index
        }
      })
    },
    modifySlideItemImageLinks (imageLinks, index) { // 修改轮播图片链接
      this.$emit('operationSuccess', {
        cmd: 'modifySlideItemImageLinks',
        params: {
          imageLinks: imageLinks,
          index: index
        }
      })
    },
    getUploadImgSrc (imgbase64, index) {
      if (!imgbase64) {
        imgbase64 = ''
      }
      this.slide_set.slideImgs[index].imgsrc = imgbase64
      // 获取上传的图片的base64编码
      this.$emit('operationSuccess', {
        cmd: 'modifySlideImg',
        params: {
          imgsrc: imgbase64,
          index: index
        }
      })
    },
    pushSomeTimes () {
      let length = this.slide_set.slideImgs.length
      for (let i = 0; i < length; i++) {
        this.imgListVisible.push({ hideVisible: false })
      }
    },
    getParentComponentData (parentComponentData, compId) {
      this.slide_set = parentComponentData
      this.compId = compId
      this.pushSomeTimes()
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
.option-page-slide {
  .c-slide-overall-set {
    .c-slide-overall-set-title {
      line-height: 67px;
      height: 67px;
      padding-left: 32px;
      box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
        0 1px 3px 0 rgba(63, 63, 68, 0.15);
    }
    .content-slide-overall-set {
      background: #fff;
      padding: 25px 29px 25px 29px;
      box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
        0 1px 3px 0 rgba(63, 63, 68, 0.15);
      .lable-slide-fontchoose {
        margin-bottom: 10px;
      }
      .lable-slide-fontposition {
        margin-top: 15px;
        margin-bottom: 10px;
      }
      .slideAutoPlay {
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .slideAutoPlay-time {
        .lable-slide-autoPlaytime {
          margin-bottom: 10px;
        }
      }
    }
  }
  .c-img-edit {
    .img-edit-title {
      line-height: 67px;
      height: 67px;
      padding-left: 32px;
      box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
        0 1px 3px 0 rgba(63, 63, 68, 0.15);
    }
    .ul-img-edit-item {
      border-top: 1px solid rgb(223, 227, 232);
      .img-edit-item {
        height: 60px;
        border-bottom: 1px solid rgb(223, 227, 232);
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
      .img-edit-item-hide {
        padding-left: 29px;
        padding-right: 29px;
        padding-bottom: 25px;
        padding: 25px 29px 25px 29px;
        border-bottom: 1px solid rgb(232, 233, 234);
        .upload-hide-text1 {
          margin-bottom: 10px;
          font-size: 14px;
        }
        .c-uploadimg-slide {
          text-align: center;
          margin-bottom: 25px;
        }
        .input-item {
          margin-bottom: 15px;
          p {
            margin-bottom: 10px;
          }
        }
        .delete-slideimg {
          color: #007ace;
          cursor: pointer;
          display: flex;
          align-items: center;
          .icon-shanchu2 {
            font-size: 8px;
            margin-right: 10px;
          }
        }
      }
    }
    .addslideimgItem {
      height: 64px;
      display: flex;
      align-items: center;
      color: #5c6ac4;
      padding-left: 60px;
      border-bottom: 1px solid #dfe3e8;
      cursor: pointer;
      background: #fff;
      .icon-jiahao {
        font-size: 14px;
        margin-right: 10px;
        font-weight: bold;
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
