<template>
  <div :style="{'width':width}">
    <div class="goods" :style="{'height':height,'width':width,'background':backgroundColor}">
      <img :src="imgsrc" :style="{'height':imgHeight,'width':imgWidth}" />
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
</style>
