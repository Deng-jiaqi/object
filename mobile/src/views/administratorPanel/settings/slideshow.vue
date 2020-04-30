<template>
  <div class="slideshow">
    <header>
      <h1>{{$t('slideShow.header.title')}}</h1>
      <el-button type="primary" @click="openBanner">{{$t('slideShow.header.btn')}}</el-button>
    </header>
    <main>
      <div class="banner">
        <div class="banner-content" :style="{backgroundImage: 'url(' + this.bannerImg + ')'}">
          <h1>{{bannerTitle}}</h1>
          <h2>{{bannerText}}</h2>
        </div>
      </div>
      <div class="content-list">
        <p>{{$t('slideShow.main.text1')}}</p>
        <el-row :gutter="20">
          <el-col :span="8" v-for="(item, index) in listData" :key="index">
            <div class="img-box">
              <div>
                <img :src="item.img" alt="">
              </div>
              <p>{{item.text1}}</p>
              <p>{{item.price}}</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </main>
    <!--    轮播上传-->
    <el-dialog
        :title="$t('slideShow.elDialog.title')"
        :visible.sync="dialogVisibleImg"
        width="100%">
      <div>
        <div class="disContent">
          <div v-for="(item, index) in imgs" :key="index" class="img-div"
               @click="switcherCss(item, index)"
               :class="{'pitchCss':active === index}">
            <img :src="item.picture" alt="">
            <div class="disContent-hide">
              <el-tooltip class="item" effect="dark" :content="$t('addShop.proImg.content1')" placement="top">
                <span class="iconfont iconfangdajing yuLan">
                    <viewer :images="imgs">
                        <img :src="item.picture" alt="" class="yuLanImg">
                    </viewer>
                </span>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="$t('addShop.proImg.content2')" placement="top">
                <span class="Delete" @click="deleteImg(item,index)"><i class="el-icon-delete"></i></span>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="$t('slideShow.elDialog.text1')" placement="top">
                <span class="editCss" @click="editTitle(item, index)"><i class="el-icon-edit"></i></span>
              </el-tooltip>
            </div>
          </div>
          <div class="img-file" v-if='imgs.length < maxCount'>
            <input type="file" id='files' @change='fileChange($event)' multiple="multiple"
                   ref="FileValue">
            <label for="files" class="labelCss">
              <i class="el-icon-plus"></i>
            </label>
          </div>
        </div>
        <el-dialog
            width="100%"
            :title="$t('slideShow.elDialog.title2')"
            :visible.sync="innerVisible"
            append-to-body>
          <div>
            <el-form label-width="80px" :model="ruleForm" v-for="(item, index) in titleData" :key="index">
              <el-form-item :label="$t('slideShow.elDialog.label1')">
                <el-input v-model="item.title"></el-input>
              </el-form-item>
              <el-form-item :label="$t('slideShow.elDialog.label2')">
                <el-input v-model="item.content" type="textarea"
                          :rows="4"></el-input>
              </el-form-item>
              <el-form-item :label="$t('slideShow.elDialog.label3')">
                <el-input v-model="item.url"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="innerVisible = false">{{$t('productLineDetail.elDialogPro.btn1')}}</el-button>
            <el-button @click="saveTitle" type="primary">{{$t('slideShow.elDialog.btn1')}}</el-button>
          </div>
        </el-dialog>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleImg = false">{{$t('productLineDetail.elDialogPro.btn1')}}</el-button>
        <el-button @click="saveUp"
                   type="primary">{{$t('productLineDetail.elDialogPro.btn2')}}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { editBanner, delBanner, bannerList } from '../../../common/api/api'

export default {
  name: 'slideshow',
  data () {
    return {
      bannerImg: require('../../../assets/administratorPanel/templateImg/27rectangle.png'), // banner背景图
      bannerTitle: this.$t('slideShow.main.bannerTitle'),
      bannerText: this.$t('slideShow.main.bannerText'),
      imgs: [], // 轮播图数据
      imgfiles: [],
      maxCount: 5, // 上传最大限制
      innerVisible: false, // 编辑标题和Url
      dialogVisibleImg: false,
      listData: [
        {
          img: require('../../../assets/administratorPanel/templateImg/198.png'),
          text1: this.$t('slideShow.main.text2'),
          price: '¥19.99'
        },
        {
          img: require('../../../assets/administratorPanel/templateImg/252.png'),
          text1: this.$t('slideShow.main.text2'),
          price: '¥19.99'
        },
        {
          img: require('../../../assets/administratorPanel/templateImg/27.png'),
          text1: this.$t('slideShow.main.text2'),
          price: '¥19.99'
        },
        {
          img: require('../../../assets/administratorPanel/templateImg/198.png'),
          text1: this.$t('slideShow.main.text2'),
          price: '¥19.99'
        },
        {
          img: require('../../../assets/administratorPanel/templateImg/252.png'),
          text1: this.$t('slideShow.main.text2'),
          price: '¥19.99'
        },
        {
          img: require('../../../assets/administratorPanel/templateImg/27.png'),
          text1: this.$t('slideShow.main.text2'),
          price: '¥19.99'
        }
      ],
      ruleForm: {},
      index: '', // 获取图标下标
      imgData: '', // 图片数据
      titleData: [], // 编辑文本的数据
      active: 0, // 切换选中样式
      getItem: {} // 获取当前选择的item数据
    }
  },
  methods: {
    // 打开轮播编辑
    openBanner () {
      bannerList({
      }).then(resp => {
        this.imgs = resp.data.data
      })
      this.dialogVisibleImg = true
    },
    // 加入图片
    fileChange (e) {
      var _this = this
      var file = e.target.files
      var leng = file.length
      if (leng + _this.imgs.length > _this.maxCount) {
        alert(this.$t('addShop.hint.text1') + _this.maxCount + this.$t('addShop.hint.text2'))
        return
      }
      for (var i = 0; i < leng; i++) {
        var reader = new FileReader() // 使用 FileReader 来获取图片路径及预览效果
        _this.imgfiles.push(file[i])
        reader.readAsDataURL(file[i])
        reader.onload = function (e) {
          let obj = {
            title: '',
            content: '',
            url: '',
            picture: e.target.result
          }
          _this.imgs.push(obj) // base64 图片地址形成预览
        }
      }
      this.$refs.FileValue.value = ''
    },
    // 删除图片
    deleteImg (item, index) {
      if (item.id === undefined) {
        this.imgfiles.splice(index, 1)
        this.imgs.splice(index, 1)
      } else {
        delBanner({
          id: item.id
        }).then(resp => {
          if (resp.data.code === 1) {
            this.imgfiles.splice(index, 1)
            this.imgs.splice(index, 1)
            this.$message(resp.data.msg)
          }
        })
      }
    },
    // 打开编辑文本框
    editTitle (item, index) {
      this.innerVisible = true
      this.index = index
      this.imgData = item.data
      this.$set(this.titleData, 0, JSON.parse(JSON.stringify(item)))
    },
    // 保存图片文字编辑
    saveTitle () {
      let obj = JSON.parse(JSON.stringify(this.titleData[0]))
      this.$set(this.imgs, this.index, obj)
      this.innerVisible = false
    },
    // 切换显示banner
    switcherCss (item, index) {
      this.active = index
      this.getItem = JSON.parse(JSON.stringify(item))
    },
    // 保存上传图片
    saveUp () {
      if (this.imgs.length > 0) {
        editBanner({
          data: this.imgs
        }).then(resp => {
          if (resp.data.code === 1) {
            if (JSON.stringify(this.getItem) === '{}') {
              let obj = JSON.parse(JSON.stringify(this.imgs[0]))
              this.bannerImg = obj.picture
              this.bannerTitle = obj.title
              this.bannerText = obj.content
              this.$message(resp.data.msg)
              this.dialogVisibleImg = false
            } else {
              this.bannerImg = this.getItem.picture
              this.bannerTitle = this.getItem.title
              this.bannerText = this.getItem.content
              this.$message(resp.data.msg)
              this.dialogVisibleImg = false
            }
          } else {
            this.$message(resp.data.msg)
          }
        })
      } else {
        this.$message(this.$t('slideShow.hint.text1'))
        return false
      }
    }
  },
  created () {
    bannerList({
    }).then(resp => {
      this.imgs = resp.data.data
    })
  }
}
</script>
<style lang='less'>
  .el-dialog__header {
    min-height: 40px;
  }
  @import '../../../common/css/elementCommon';
</style>
<style lang='less' scoped>
  @import "../../../common/css/common";
  .slideshow {
    padding: 0 10px;
    header {
      .flexBetween;
      margin-top: 60px;
      border-bottom: 1px solid #e3e3e3;
    }
    main {
      margin-top: 44px;
      margin-bottom: 44px;
      background: white;
      border-radius: 4px;
      .banner {
        width: 100%;
        height: 320px;
        background: #F0F1F1;
        .flexCss;
        > div {
          background-image: url("../../../assets/administratorPanel/templateImg/27rectangle.png");
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: center center;
          height: 300px;
          width: 100%;
          margin: auto;
          .flexCss;
          flex-direction: column;
        }
      }
      .content-list {
        padding: 0 20px 20px 20px;
        > p:nth-child(1) {
          margin: 40px auto;
          text-align: center;
          font-weight: bold;
          font-size: 21px;
        }
        .img-box {
          > div {
            border: 1px solid #e3e3e3;
            background: #F0F1F1;
            width: 80px;
            height:80px;
            .flexCss;
            >img{
      height: 100%;
      width: 100%;
            }
          }
        }
      }
    }
  }
  #files {
    display: none;
  }
  .banner-content{
    >h2{
      width: 80%;
      text-align: center;
    }
  }
  .labelCss {
    width: 100%;
    height: 100%;
    font-size: 40px;
    cursor: pointer;
    .flexCss;
  }
  .disContent {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .img-div {
      position: relative;
      margin: auto 10px 10px 10px;
      width: 120px;
      height: 120px;
      border-radius: 4px;
      .flexCss;
      border: 1px solid #e3e3e3;
      > img {
      height: 100%;
      width: 100%;
      }
      .disContent-hide {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 4px;
        background-color: rgba(48, 48, 48, 0.59);
        display: none;
      }
      .Delete {
        position: absolute;
        bottom: 14px;
        right: 8px;
        font-size: 16px;
        color: white;
        cursor: pointer;
      }
      .editCss {
        .Delete;
        font-size: 16px;
        right: 74px;
      }
      .yuLan {
        .Delete;
        font-size: 16px;
        right: 40px;
      }
      .yuLanImg {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
    .img-div:hover .disContent-hide {
      display: block;
    }
    .img-file {
      .img-div;
    }
    .pitchCss {
      border: 1px solid #202e78;
      transition: all linear 0.1s;
      margin: auto 10px 10px 10px;
      width: 118px;
      height: 118px;
    }
  }
</style>
