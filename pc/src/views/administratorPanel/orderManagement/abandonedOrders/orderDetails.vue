<template>
  <div class="c-orderDetails">
    <div class="content-orderDetails">
      <!-- top -->
      <div class="top">
        <div class="left">
          <span class="title">订单</span>
          <span class="order-number">123456789</span>
        </div>
        <div class="right" @click="back">返回</div>
      </div>
      <!-- 发送邮件 -->
      <div class="box-send-email">
        <p class="title">将此链接发送给客户，以便客户继续购物</p>
        <div class="clearfix">
          <div class="email-adress">http:12546...556565656565654</div>
        </div>
        <div class="clearfix">
          <div @click="openSendEmailModalWindow" class="send-email">发送邮件以恢复购物车</div>
        </div>
      </div>
      <!-- 商品信息 -->
      <div class="c-good-info">
        <p class="title">结账详情</p>
        <div class="good clearfix">
          <img src="../../../../assets/loginAndRegister/admin-login-image.png" alt />
          <div class="info">
            <p class="title">好看的衣服好看的衣服</p>
            <p class="detail">尺寸：大</p>
            <p class="detail">颜色：黄色</p>
            <p class="detail">材料：但是但是多所多多</p>
          </div>
          <span class="good-number">x1</span>
          <span class="good-price">$100</span>
        </div>
      </div>
      <!-- 统计 -->
      <div class="box-statistical">
        <div class="row subtotal">
          <span>小计</span>
          <span>$5.00</span>
        </div>
        <div class="row Taxes-and-fees">
          <span>VAT 17%</span>
          <span>$5.00</span>
        </div>
        <div class="row total">
          <span>总计</span>
          <span>$110.00</span>
        </div>
      </div>
      <!-- 备注 -->
      <div class="box-note clearfix">
        <p class="title">其他详细信息</p>
        <span class="input-label">备注</span>
        <el-input></el-input>
        <div class="btn-save">保存</div>
      </div>
      <!-- 用户信息 -->
      <div class="box-name">
        <p class="title">客户</p>
        <p class="name">xxxxx</p>
        <p class="email">306100341@qq.com</p>
        <div class="c-img"></div>
      </div>
      <!-- 收货地址 -->
      <div class="c-shipping-adress">
        <div class="shipping-adress-top">
          <span class="title">收货地址</span>
          <span class="editor" @click="openShippingModalWindow">编辑</span>
        </div>
        <div class="adress">xxxxxxxxx</div>
      </div>
    </div>
    <!-- 编辑收货地址模态窗 -->
    <AddressModalWindow :title="'编辑收货地址'" ref="shippingModalWindow" />
    <!-- 发送邮件模态窗 -->
    <el-dialog
      class="modal-send-email"
      title="发送邮件以恢复购物车"
      :show-close="false"
      :visible.sync="sendEmailVisible"
      width="37%"
    >
      <div class="box-btm">
        <div class="row-one">
          <div class="email-to">
            <p>至</p>
            <el-input />
          </div>
          <div class="email-from">
            <p>发件人</p>
            <el-select v-model="userEmail" :placeholder="'11'">
              <el-option
                v-for="item in userEmails"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <p class="subject">Subject</p>
        <div class="c-subject-input">
          <el-input :placeholder="'Complete your Purchase'"></el-input>
        </div>
        <p class="custom-message">为此客户自定义消息</p>
        <el-input class="textarea" type="textarea" :rows="4" placeholder="请输入内容"></el-input>
        <div class="copy">
          <span>秘密抄送至：</span>
          <el-checkbox></el-checkbox>
          <span>929198063@qq.com</span>
        </div>
        <div class="c-btn clearfix">
          <div class="btn btn-preview" @click="emailPreviewVisible=true">预览邮件</div>
          <div class="btn btn-cancel" @click="sendEmailVisible=false">取消</div>
        </div>
      </div>
      <!--预览 -->
      <transition name="el-zoom-in-top">
        <div v-show="emailPreviewVisible" class="box-email-preview">
          <p class="title">发送邮件以恢复购物车</p>
          <div class="email-info">
            <div>
              <span>发件人：</span>&nbsp;
              <span>929198063@qq.com</span>
            </div>
            <div>
              <span>收件人：</span>&nbsp;
              <span>929198063@qq.com</span>
            </div>
          </div>
          <div class="content-btm">
            <div class="theme">
              <span>主题:</span>&nbsp;
              <span>xxxxxxxxxxxxxxxxxxxxx</span>
            </div>
            <div class="email"></div>
            <div class="c-btn clearfix">
              <div class="btn btn-preview" @click="emailPreviewVisible=false">发送通知</div>
              <div class="btn btn-cancel" @click="emailPreviewVisible=false">取消</div>
            </div>
          </div>
        </div>
      </transition>
    </el-dialog>
  </div>
</template>
<script>
import AddressModalWindow from '@/components/administratorPanel/addressModalWindow'
export default {
  components: {
    AddressModalWindow
  },
  data () {
    return {
      // ui
      sendEmailVisible: false,
      emailPreviewVisible: false,
      // 变量
      userEmail: null,
      // data
      userEmails: [
        {
          value: 1,
          label: '顺丰'
        },
        {
          value: 2,
          label: '邮政'
        },
        {
          value: 3,
          label: '和大家'
        },
        {
          value: 4,
          label: '打打'
        }
      ]
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    openShippingModalWindow () {
      this.$refs.shippingModalWindow.addressModalWindowVisible = true
    },
    openSendEmailModalWindow () {
      this.sendEmailVisible = true
    }
  }
}
</script>
<style lang="less" scoped>
.c-orderDetails {
  max-width: 772px;
  margin: auto;
  padding-top: 107px;
  padding-bottom: 275px;
  .content-orderDetails {
    .top {
      margin-bottom: 29px;
      display: flex;
      justify-content: space-between;
      .left {
        .title {
          font-size: 30px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
          margin-right: 16px;
        }
        .order-number {
          font-size: 22px;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          margin-right: 12px;
        }
      }
      .right {
        font-size: 18px;
        padding-right: 20px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        display: flex;
        align-items: center;
      }
      .right:hover {
        cursor: pointer;
      }
    }
    .box-send-email {
      background: rgba(252, 247, 242, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      border-radius: 10px;
      padding-top: 30px;
      padding-left: 38px;
      padding-bottom: 26px;
      margin-bottom: 19px;
      .title {
        font-size: 16px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        margin-bottom: 19px;
      }
      .email-adress {
        padding: 16px 41px 16px 15px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(149, 149, 149, 1);
        border-radius: 4px;
        margin-bottom: 26px;
        float: left;
      }
      .send-email {
        padding: 19px 41px 16px 19px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(149, 149, 149, 1);
        border-radius: 4px;
        float: left;
      }
      .send-email:hover {
        cursor: pointer;
      }
    }
    .c-good-info {
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      border-radius: 10px;
      margin-bottom: 14px;
      padding: 33px 36px 22px 29px;
      .title {
        font-size: 18px;
        margin-bottom: 15px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      .good {
        background: rgba(252, 252, 252, 1);
        border: 1px solid rgba(239, 239, 239, 1);
        border-radius: 4px;
        padding-top: 45px;
        padding-bottom: 45px;
        display: flex;
        align-items: center;
        img {
          width: 80px;
          height: 80px;
          margin-left: 24px;
          margin-right: 20px;
        }
        .info {
          float: left;
          margin-right: 230px;
          p {
            margin-bottom: 13px;
          }
          p:last-child {
            margin-bottom: 0;
          }
          .title {
            font-size: 16px;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
          }
          .detail {
            font-size: 14px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
          }
        }
        .good-number {
          margin-right: 88px;
          font-size: 16px;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
        }
        .good-price {
          font-size: 14px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
        }
      }
    }
    .box-statistical {
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      border-radius: 10px;
      padding: 32px 40px 29px 40px;
      margin-bottom: 18px;
      font-size: 18px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      .row {
        display: flex;
        justify-content: space-between;
      }
      .subtotal {
        margin-bottom: 33px;
      }
      .Taxes-and-fees {
        margin-bottom: 35px;
      }
      .total {
        font-size: 18px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
    }
    .box-note {
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      border-radius: 10px;
      padding: 31px 43px 16px 30px;
      margin-bottom: 17px;
      /deep/ .el-input {
        width: 648px;
      }
      /deep/ .el-input__inner {
        background: #fff;
        border: 1px solid rgba(149, 149, 149, 1);
        border-radius: 4px;
        outline: rgba(56, 92, 165, 1);
        padding-left: 17px;
        height: 54px;
      }
      /deep/ .el-input__inner:focus {
        border: 1px solid rgba(56, 92, 165, 1);
      }
      /deep/ .el-input__inner:hover {
        border-color: rgba(56, 92, 165, 1);
      }
      .title {
        font-size: 18px;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
        margin-bottom: 23px;
      }
      .input-label {
        font-size: 16px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        margin-right: 19px;
      }
      .btn-save {
        padding: 19px 24px 19px 24px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        background: rgba(56, 92, 165, 1);
        border-radius: 4px;
        float: right;
        margin-top: 18px;
      }
      .btn-save:hover {
        cursor: pointer;
      }
    }
    .box-name {
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      border-radius: 10px;
      position: relative;
      padding: 33px 0 30px 42px;
      margin-bottom: 21px;
      .title {
        font-size: 20px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        margin-bottom: 27px;
      }
      .name {
        font-size: 16px;
        font-weight: 400;
        color: rgba(66, 103, 178, 1);
        margin-bottom: 27px;
      }
      .email {
        font-size: 16px;
        font-weight: 400;
        color: rgba(66, 103, 178, 1);
      }
      .c-img {
        position: absolute;
        width: 45px;
        height: 45px;
        background: rgba(238, 238, 238, 1);
        border-radius: 50%;
        right: 19px;
        top: 24px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .c-shipping-adress {
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      border-radius: 10px;
      margin-bottom: 24px;
      padding: 30px 25px 39px 40px;
      .shipping-adress-top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 31px;
        .title {
          font-size: 20px;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
        }
        .editor {
          font-size: 16px;
          font-weight: 400;
          color: rgba(66, 103, 178, 1);
        }
        .editor:hover {
          cursor: pointer;
        }
      }
    }
  }
}
p {
  margin: 0;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.modal-send-email {
  /deep/ .el-dialog {
    margin-top: 15vh !important;
    background: rgba(255, 255, 255, 1);
    border: 0px solid rgba(112, 70, 16, 1);
    box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
    border-radius: 10px;
    padding-top: 39px;
  }
  /deep/ .el-dialog__header {
    font-size: 20px;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    border-bottom: 2px solid rgba(238, 238, 238, 1);
    padding: 0;
    padding-left: 34px;
    padding-bottom: 22px;
  }
  .box-btm {
    .row-one {
      display: flex;
      justify-content: space-between;
      .email-to {
        /deep/ .el-input {
          width: 287px;
        }
        /deep/ .el-input__inner {
          background: #fff;
          border: 1px solid rgba(149, 149, 149, 1);
          border-radius: 4px;
          outline: rgba(56, 92, 165, 1);
          padding-left: 17px;
          height: 49px;
        }
        /deep/ .el-input__inner:focus {
          border: 1px solid rgba(56, 92, 165, 1);
        }
        /deep/ .el-input__inner:hover {
          border-color: rgba(56, 92, 165, 1);
        }
        p {
          margin-bottom: 15px;
        }
      }
      .email-from {
        p {
          margin-bottom: 15px;
        }
        // select框样式修改
        .el-select {
          width: 287px;
        }
        /deep/ .el-input__suffix {
          display: none;
        }
        /deep/ .el-input::after {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border: 6px solid transparent;
          border-top: 6px solid rgba(109, 109, 109, 1);
          right: 10px;
          top: calc(50% - 4px);
          transition: all 0.3s;
          cursor: pointer;
        }
        /deep/ .el-select .el-input.is-focus .el-input__inner {
          border-color: #385ca5;
        }
        /deep/ .el-select .el-input__inner:focus {
          border-color: #385ca5;
        }
        /deep/ .el-select .el-input__inner:hover {
          border-color: #385ca5;
        }
        .el-select-dropdown__item.selected {
          color: #385ca5;
        }
        /deep/ .el-input__inner {
          height: 49px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(137, 137, 137, 1);
          border: 1px solid #959595;
          border-radius: 4px;
        }
      }
    }
    .subject {
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-top: 18px;
      margin-bottom: 15px;
    }
    .c-subject-input {
      /deep/ .el-input {
        // width: 613px;
      }
      /deep/ .el-input__inner {
        background: #fff;
        border: 1px solid rgba(149, 149, 149, 1);
        border-radius: 4px;
        outline: rgba(56, 92, 165, 1);
        padding-left: 17px;
        height: 49px;
      }
      /deep/ .el-input__inner:focus {
        border: 1px solid rgba(56, 92, 165, 1);
      }
      /deep/ .el-input__inner:hover {
        border-color: rgba(56, 92, 165, 1);
      }
    }
    .custom-message {
      margin-top: 30px;
      margin-bottom: 12px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    /deep/ .el-textarea__inner:focus {
      border-color: #385ca5;
    }
    /deep/ .el-textarea__inner {
      border: 1px solid rgba(181, 181, 181, 1);
      border-radius: 4px;
    }
    .textarea {
      margin-bottom: 28px;
    }
    .copy {
      font-size: 16px;
      font-weight: 400;
      margin-bottom: 35px;
      color: rgba(51, 51, 51, 1);
    }
    .c-btn {
      .btn:hover {
        cursor: pointer;
      }
      .btn-cancel {
        padding: 20px 24px 20px 24px;
        font-size: 16px;
        color: rgba(255, 255, 255, 1);
        border: 1px solid rgba(160, 160, 160, 1);
        border-radius: 4px;
        background-color: #fff;
        float: right;
        color: rgba(51, 51, 51, 1);
      }
      .btn-preview {
        padding: 20px 24px 20px 24px;
        font-size: 16px;
        color: rgba(255, 255, 255, 1);
        border: 1px solid rgba(160, 160, 160, 1);
        border-radius: 4px;
        background-color: rgba(66, 103, 178, 1);
        float: right;
        margin-left: 20px;
      }
    }
  }
}
.box-email-preview {
  background: rgba(255, 255, 255, 1);
  border: 0px solid rgba(112, 70, 16, 1);
  box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
  border-radius: 10px;
  width: 100%;
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  .title {
    font-size: 20px;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    padding: 47px 0 35px 36px;
    border-bottom: 2px solid rgba(238, 238, 238, 1);
  }
  .email-info {
    display: flex;
    justify-content: space-between;
    padding: 37px 50px 37px 50px;
    font-size: 16px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    border-bottom: 2px solid rgba(238, 238, 238, 1);
  }
  .content-btm {
    padding: 32px 43px 30px 43px;
    .theme {
      margin-bottom: 34px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .email {
      padding: 23px 22px 23px 22px;
      width: 571px;
      height: 210px;
      border: 1px solid rgba(181, 181, 181, 1);
      border-radius: 4px;
      overflow-y: auto;
      margin: 0;
      margin-bottom: 29px;
    }
    .c-btn {
      .btn:hover {
        cursor: pointer;
      }
      .btn-cancel {
        padding: 20px 24px 20px 24px;
        font-size: 16px;
        color: rgba(255, 255, 255, 1);
        border: 1px solid rgba(160, 160, 160, 1);
        border-radius: 4px;
        background-color: #fff;
        float: right;
        color: rgba(51, 51, 51, 1);
      }
      .btn-preview {
        padding: 20px 24px 20px 24px;
        font-size: 16px;
        color: rgba(255, 255, 255, 1);
        border: 1px solid rgba(160, 160, 160, 1);
        border-radius: 4px;
        background-color: rgba(66, 103, 178, 1);
        float: right;
        margin-left: 20px;
      }
    }
  }
}
</style>
