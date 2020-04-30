<template>
  <div class="optionalModule">
    <header class="module-header">
      <h1>{{$t('optionalModule.title')}}</h1>
      <div></div>
    </header>
    <div class="protection" v-if="hideDiv">
      <div>
        <h2>{{$t('optionalModule.text1')}}</h2>
        <p>{{$t('optionalModule.text2')}}</p>
        <el-button type="primary">{{$t('optionalModule.text3')}}</el-button>
      </div>
    </div>
    <el-row class="moduleChoose">
      <el-col :span="7">
        <h2>{{$t('optionalModule.text4')}}</h2>
        <p>{{$t('optionalModule.text5')}}</p>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="15" class="moduleChoose-content">
        <div class="moduleChoose-header">
          <div>
            <!-- <h2>{{temName}}</h2> -->
            <p>{{$t('optionalModule.text6')}}</p>
          </div>
          <div class="optionalModule-popover">
            <el-popover popper-class='optionalModule-template-operation-popover' placement="bottom" width="80px" trigger="click">
              <div class="btn1-bianJi">
                <ul>
                  <router-link tag="a" target="_blank" :to="linkData">
                    <li>{{$t('optionalModule.text7')}}</li>
                  </router-link>
                </ul>
              </div>
              <!-- 编辑 -->
              <el-button slot="reference">
                {{$t('optionalModule.text8')}}
                <i class="el-icon-caret-bottom"></i>
              </el-button>
            </el-popover>
            <!-- 自定义 -->
            <el-button
              @click="toCustomTemplate"
              type="primary"
              class="moduleChoose-btn"
            >{{$t('optionalModule.text9')}}</el-button>
          </div>
        </div>
        <div class="moduleChoose-imgBox">
          <img :src="temImg" alt />
        </div>
      </el-col>
    </el-row>
    <!-- <el-row class="freeTemplate">
      <el-col :span="7">
        <h2>{{$t('optionalModule.text10')}}</h2>
        <p>{{$t('optionalModule.text11')}}</p>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="15" class="freeTemplate-content">
        <div>
          <div class="freeTemplate-icon"></div>
          <div>
            <h2>{{$t('optionalModule.text12')}}</h2>
            <p>{{$t('optionalModule.text13')}}</p>
            <el-button @click="dialogVisible = true">{{$t('optionalModule.text14')}}</el-button>
          </div>
        </div>
      </el-col>
    </el-row>-->
    <!--    选择模板-->
    <el-dialog
      :title="$t('optionalModule.text14')"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="70%"
    >
      <el-row :gutter="20" class="dialog-row">
        <el-col :span="8" class="dialog-col" v-for="(item, index) in imgData" :key="index">
          <div @click="routerModule(item)">
            <img class="col-module-img" :src="item.img" alt />
            <div class="col-div">
              <p>
                {{item.name}}
                <span></span>
              </p>
            </div>
            <div class="selectModule" v-if="item.default === true">
              <img src="../../../assets/product/chenggong.png" alt />
            </div>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('addShop.elDialogSite.btn1')}}</el-button>
        <el-button type="primary" @click="notarizeMb">{{$t('addShop.elDialogSite.btn2')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { exsitingMoudel, saveMoudel, showMoudel } from '../../../common/api/api'
export default {
  name: 'optionalModule',
  data () {
    return {
      hideDiv: false,
      temName: '',
      temImg: require('../../../assets/administratorPanel/templateImg/moduleDef.png'),
      linkData: '/templateFive', // 模板
      getUrl: '', // 图片地址
      dialogVisible: false,
      imgData: [],
      gitId: '', // 模板id
      gitname: '', // 模板名字
      getItem: {} // 获取当前选中的对象
    }
  },
  methods: {
    routerModule (item) {
      for (let v of this.imgData) {
        v.default = false
      }
      item.default = true
      this.getUrl = item.href
      this.gitId = item.Id
      this.getItem = item
      console.log(this.gitname)
    },
    // 确认模板
    notarizeMb () {
      saveMoudel({
        templateid: this.gitId
      }).then(resp => {
        console.log(resp)
        if (resp.data.code === 1) {
          this.linkData = this.getUrl
          this.dialogVisible = false
          this.temName = this.getItem.name
          this.temImg = this.getItem.img
        }
        this.linkData = this.getUrl
        this.dialogVisible = false
      })
    },
    toCustomTemplate () {
      this.$router.push({
        path: '/administratorPanel/themes'
      })
    }
  },
  created () {
    exsitingMoudel({}).then(resp => {
      console.log(resp)
      this.imgData = resp.data.data
      this.imgData.forEach(item => {
        if (item.default === true) {
          this.temName = item.name
          this.linkData = item.href
          this.temImg = item.img
          console.log(item)
        }
      })
      console.log(this.imgData)
    })
  }
}
</script>
<style lang="less">
@import "../../../common/css/elementCommon";
.optionalModule-template-operation-popover {
  min-width: 100px;
}
.btn1-bianJi {
  background-color: white;
  border-radius: 8px;
  ul {
    li {
      cursor: pointer;
      text-align: center;
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
    }
  }
  li:hover {
    background-color: #5c6ac4;
    color: white;
  }
}
</style>
<style scoped lang="less">
@import "../../../common/css/common";
.optionalModule {
  max-width: 1000px;
  margin: auto;
}
.module-header {
  .flexBetween;
  border-bottom: 1px solid #e3e3e3;
}
.protection {
  background-color: #fdf7e3;
  border: 1px solid #d5d5d5;
  border-top: 7px solid #fdddaf;
  margin-top: 20px;
  > div {
    padding: 30px 0 20px 60px;
  }
}
.moduleChoose {
  display: flex;
  margin-top: 30px;
  margin-bottom: 30px;
  .moduleChoose-content {
    border: 1px solid #d5d5d5;
    background-color: white;
    padding: 0;
    .moduleChoose-header {
      .flexBetween;
      margin: 30px 34px;
      > div:nth-child(2) {
        display: flex;
      }
    }
    .moduleChoose-btn {
      margin-left: 20px;
    }
  }
}
.freeTemplate {
  display: flex;
  border-top: 1px solid #d5d5d5;
  margin-bottom: 50px;
  padding-top: 20px;
  .freeTemplate-content {
    background-color: white;
    border: 1px solid #d5d5d5;
    > div {
      display: flex;
      margin: 30px auto 30px 30px;
      h2 {
        margin-top: 0;
      }
      .freeTemplate-icon {
        width: 70px;
        height: 70px;
        border-radius: 4px;
        background-color: #4267b2;
        margin-right: 20px;
      }
    }
  }
}
.dialog-row {
  padding: 20px;
  .dialog-col {
    > div {
      border-radius: 4px;
      border: 1px solid #d5d5d5;
      position: relative;
      cursor: pointer;
      overflow: hidden;
      width: 100%;
      height: 10.375rem;
      .flexCss;
      margin-bottom: 20px;
      .col-module-img {
        transition: 0.5s all;
        max-width: 100%;
        max-height: 100%;
      }
      .col-div {
        position: absolute;
        bottom: 0;
        margin: 4px auto auto auto;
        background-color: white;
        box-shadow: 0 -4px 8px -4px rgba(0, 0, 0, 0.15);
        width: 100%;
        > p {
          margin-left: 20px;
        }
      }
      .selectModule {
        width: 30px;
        height: 30px;
        position: absolute;
        bottom: 0;
        right: 0;
        > img {
          max-height: 100%;
          max-width: 100%;
        }
      }
    }
  }
  .dialog-col:hover img {
    transform: scale(1.1, 1.1);
  }
}
.moduleChoose-imgBox {
  width: 294px;
  margin: auto;
  > img {
    width: 100%;
    height: 100%;
  }
}
</style>
