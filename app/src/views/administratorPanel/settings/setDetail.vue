<template>
  <div v-loading="loading">
    <p class="add-black" @click="backTop"><span class="el-icon-arrow-left"></span>
      <span>{{$t('setDetail.header.back')}}</span></p>
    <div class="flexBetween">
      <h2>{{$t('setDetail.header.title')}}</h2>
      <el-button type="primary" @click="addSite" v-if="unuse.length + SiteData.length < 4">
        {{$t('setDetail.header.btn1')}}
      </el-button>
    </div>
    <el-row>
      <el-col :span="8">
        <h3>{{$t('setDetail.content.title')}}</h3>
        <p>{{$t('setDetail.content.text1')}}</p>
        <p>{{$t('setDetail.content.text2')}}{{unuse.length + SiteData.length}}{{$t('setDetail.content.slot1')}}
          <el-link type="primary" :underline="false">{{$t('setDetail.content.text3')}}</el-link>
        </p>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="15">
        <ul class="setUl">
          <li class="setUl-li" v-for="(item, index) in getLocation" :key="index" @click="clickDetail(item)">
            <div>
              <i class="el-icon-location-information"></i>
            </div>
            <div>
              <p>{{item.name}}</p>
              <p>
                <span>{{item.address}}</span>，
                <span>{{item.city}}</span>，
                <span>{{item.country}}</span>,
                <span>{{item.postcode}}</span></p>
              <p v-if="item.phone !== ''">+{{item.code}} {{item.phone}}</p>
            </div>
          </li>
          <template v-if="unuse.length > 0">
            <li v-if="hideClick">
              <p style="margin-left: 20px;color: black">{{$t('setDetail.content.li1')}}</p>
            </li>
            <template v-for="item in unuse">
              <li class="setUl-li2" @click="clickDetail(item)" :key="item.Id" v-if="hideClick">
                <div>
                  <i class="el-icon-location-information"></i>
                </div>
                <div>
                  <p>{{item.name}}</p>
                  <p>
                    <span>{{item.address}}</span>，
                    <span>{{item.city}}</span>，
                    <span>{{item.country}}</span>,
                    <span>{{item.postcode}}</span></p>
                  <p v-if="item.phone !== ''">+{{item.code}} {{item.phone}}</p>
                </div>
              </li>
            </template>
            <li class="setUl-li-hide">
              <el-row>
                <el-col :span="16">&nbsp;</el-col>
                <el-col :span="8">
                  <p>
                    <el-link @click="hideClick = !hideClick" type="primary" :underline="false">
                      {{hideClick === false ?
                      $t('setDetail.content.span1') + unuse.length
                      + $t('setDetail.content.span2') : $t('setDetail.content.span3')
                      + unuse.length + $t('setDetail.content.span4')}}
                    </el-link>
                  </p>
                </el-col>
              </el-row>
            </li>
          </template>
        </ul>
      </el-col>
    </el-row>
    <el-row class="set-twoBox" v-if="getLocation.length > 1">
      <el-col :span="8">
        <h3>{{$t('setDetail.content.text4')}}</h3>
        <p>{{$t('setDetail.content.text5')}}</p>
        <p>{{$t('setDetail.content.text6')}}
          <el-link type="primary" :underline="false">{{$t('setDetail.content.text7')}}</el-link>
        </p>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="15" class="set-two-right">
        <div>
          <h3>{{$t('setDetail.content.text8')}}</h3>
          <ul class="set-two-ul">
            <li v-for="(item, index) in SiteData" :key="item.name">
              <span>{{index + 1}}. </span>{{item.name}}
            </li>
          </ul>
        </div>
        <div>
          <el-link type="primary" :underline="false" @click="clickOrder">{{$t('setDetail.content.text9')}}</el-link>
        </div>
      </el-col>
    </el-row>
    <!--    排序-->
    <el-dialog
        :title="$t('setDetail.elDialog.title')"
        :visible.sync="dialogVisibleEdit"
        width="40%">
      <div class="diaBox">
        <p>{{$t('setDetail.elDialog.text1')}}</p>
        <div>
          <ul class="diaSet-order">
            <draggable
                v-model="getData"
                @update="datadragEnd1"
                :options="{animation:500}">
              <li v-for="(item, index) in getData" :key="index">
                <span>{{index +1}}.  </span>{{item.name}}
              </li>
            </draggable>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisibleEdit = false">{{$t('setDetail.elDialog.btn1')}}</el-button>
      <el-button type="primary" @click="saveOrder">{{$t('setDetail.elDialog.btn2')}}</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { Slocation, Seditsort } from '../../../common/api/api'

export default {
  name: 'setDetail',
  components: {
    draggable
  },
  data () {
    return {
      hideClick: false, // 显示隐藏
      hideText: '',
      hideText1: '',
      dialogVisibleEdit: false,
      num: 1,
      loading: true,
      SiteData: [], // 排序地址信息
      getData: [], // 复制模态框地址信息
      unuse: [], // 显示停用位置的信息
      count: 0,
      useLength: 0, // 用户地址长度
      getLocation: [] // 可使用的位置信息
    }
  },
  methods: {
    // 返回产品页面
    backTop () {
      this.$router.push({
        path: '/administratorPanel/settings/set'
      })
    },
    // 添加仓库位置
    addSite () {
      this.$router.push({
        path: '/settings/addSet',
        query: {
          field: 'addSet'
        }
      })
    },
    // 打开模态框
    clickOrder () {
      this.dialogVisibleEdit = true
      this.getData = JSON.parse(JSON.stringify(this.SiteData))
    },
    datadragEnd1 (evt) {
    },
    // 编辑发货顺序保存
    saveOrder () {
      let data = []
      this.getData.forEach(val => {
        data.push(val.Id)
      })
      Seditsort({
        data: data
      }).then(resp => {
        this.SiteData = resp.data.data
        this.dialogVisibleEdit = false
        this.$message({
          message: resp.data.msg,
          type: 'success'
        })
      })
    },
    // 跳转仓库详情
    clickDetail (item) {
      this.$router.push({
        path: '/settings/addSet',
        query: {
          field: 'detail',
          Id: item.Id,
          len: this.useLength
        }
      })
    }
  },
  created () {
    Slocation({}).then(resp => {
      this.loading = false
      this.getLocation = resp.data.data.use
      this.unuse = resp.data.data.unuse
      this.useLength = resp.data.data.use.length
      this.SiteData = resp.data.data.sort
    })
  }
}
</script>
<style lang="less">
  @import "../../../common/css/elementCommon";
</style>
<style scoped lang="less">
  @import "../../../common/css/common";
  .setUl {
    margin: 0;
    border: 1px solid #e3e3e3;
    border-style: none solid solid solid;
    border-radius: 4px;
    > .setUl-li {
      width: 100%;
      word-wrap: break-word;
      word-break: break-all;
      border-top: 1px solid #e3e3e3;
      background-color: white;
      display: flex;
      align-items: center;
      > div:nth-child(1) {
        font-size: 40px;
        margin: auto 12px auto 12px;
      }
      > div:nth-child(2) {
        > p:nth-child(1) {
          color: #4267B2;
        }
      }
    }
    > .setUl-li:hover {
      cursor: pointer;
      background-color: #e3e3e3;
    }
    .setUl-li2 {
      .setUl-li;
      border-top: 0;
      border-bottom: 1px solid #e3e3e3;
      background-color: #f5f6f8;
    }
    .setUl-li2:hover {
      cursor: pointer;
      background-color: #e3e3e3;
    }
    .setUl-li-hide {
      background-color: white;
    }
  }
  .set-twoBox {
    border-top: 1px solid #e3e3e3;
    margin: 30px auto 150px auto;
    padding-top: 30px;
    .set-two-right {
      border: 1px solid #e3e3e3;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      background-color: white;
      > div:nth-child(2) {
        padding-top: 20px;
      }
    }
  }
  .set-two-ul {
    li {
      width: 100%;
      word-wrap: break-word;
      word-break: break-all;
      padding: 10px 0;
    }
  }
  .diaBox {
    > p {
      font-size: 14px;
    }
    font-size: 16px;
    color: black;
    .diaSet-order {
      .set-two-ul;
      li {
        width: 100%;
        word-wrap: break-word;
        cursor: pointer;
        padding: 16px 0;
        border-bottom: 1px solid #e3e3e3;
      }
    }
  }
</style>
