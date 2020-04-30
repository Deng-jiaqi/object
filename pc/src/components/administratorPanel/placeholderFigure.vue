<template>
  <div :style="{'width':width}">
    <div class="goods" :style="{'height':height,'width':width,'background':backgroundColor}">
      <img :src="imgsrc" :style="{'height':imgHeight,'width':imgWidth}" />
    </div>
    <div v-if='goodName' class="goodInfo" :style="{'width':width}">
      <p class="goodName">{{goodName}}</p>
      <span>{{price}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaceholderFigure',
  props: {
    width: {
      type: String,
      require: true
    },
    height: {
      type: String,
      require: true
    },
    imgsrc: {
      type: String,
      require: true
    },
    imgWidth: {
      type: String,
      require: true
    },
    imgHeight: {
      type: String,
      require: true
    },
    goodName: {
      type: String,
      require: false
    },
    price: {
      type: String,
      require: false
    },
    backgroundColor: {
      type: String,
      require: false,
      default: 'rgba(240, 241, 241, 1)'
    }
  }
}
</script>

<style scoped lang='less'>
.goods {
  display: flex;
  justify-content: center;
  align-items: center;
}
.goodInfo {
  margin-bottom: 56px;
  .goodName {
    font-size: 24px;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 12px;
  }
}
</style>
