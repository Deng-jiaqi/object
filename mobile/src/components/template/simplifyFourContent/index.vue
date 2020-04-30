<template>
  <main>
    <div class="nav-box">
      <el-carousel trigger="click" height="430px">
        <p>订单超过150英镑</p>
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-row class="main-content">
      <el-col :span="14">
        <p>图像与文本</p>
        <p>将大文本与图像配对，以便将焦点放在所选产品，集合或博客文章上。添加有关可用性，样式的详 细信息，甚至提供评论。</p>
        <el-button>阅读更多</el-button>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="6" class="product-img">
        <img src="../../../assets/administratorPanel/templateImg/198.png" alt="">
      </el-col>
    </el-row>
    <div class="main-footer">
      <p>精选系列</p>
      <p>查看全部</p>
      <div>
        <el-row :gutter="20" class="main-content-row">
          <el-col :span="4" v-for="(item, index) in setData" :key="index">
            <div class="col-div">
              <div>
                <img :src="item.src" alt="">
              </div>
              <p>{{item.text}}</p>
              <p>{{item.price}}</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      setData: [
        {
          src: require('../../../assets/administratorPanel/templateImg/198.png'),
          text: '示例产品标题',
          price: '$ 19.99'
        },
        {
          src: require('../../../assets/administratorPanel/templateImg/252.png'),
          text: '示例产品标题',
          price: '$ 19.99'
        },
        {
          src: require('../../../assets/administratorPanel/templateImg/26.png'),
          text: '示例产品标题',
          price: '$ 19.99'
        },
        {
          src: require('../../../assets/administratorPanel/templateImg/1.png'),
          text: '示例产品标题',
          price: '$ 19.99'
        },
        {
          src: require('../../../assets/administratorPanel/templateImg/198.png'),
          text: '示例产品标题',
          price: '$ 19.99'
        },
        {
          src: require('../../../assets/administratorPanel/templateImg/252.png'),
          text: '示例产品标题',
          price: '$ 19.99'
        }
      ]
    }
  }
}
</script>

<style scoped lang="less">
  @import '../../../common/css/common';
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .imgBoxCss{
    background: #F0F1F1;
    border:2px solid rgba(212,215,216,1);
    .flexCss;
    img{
      height: 100%;
      width: 100%;
    }
  }
  .main-footer{
    background: #F5F5F5;
    margin: 59px auto 37px auto;
    .flexCss;
    flex-direction: column;
    .main-content-row{
      width:50.625rem;
      .flexCss;
      flex-wrap: wrap;
      .col-div{
        margin-top: 20px;
        >div{
          width:8.03125rem;
          height:8.03125rem;
          .imgBoxCss;
          border: none;
          background: white;
        }
      }
    }
  }
  main{
    overflow: hidden;
    background:#F2F2F2;
    .nav-box{
      width: 100%;
      height:456px;
    }
    .main-content{
      width: 42rem;
      margin: 60px auto auto auto;
      .flexBetween;
    }
    .product-img{
      width:11.34375rem;
      height:11.34375rem;
      .imgBoxCss;
      border: none;
      background: white;
    }
  }
</style>
