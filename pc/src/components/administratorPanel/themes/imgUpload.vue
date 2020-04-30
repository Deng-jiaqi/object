<template>
  <div class="c-img-upload">
    <input
      @input="choosedImg"
      class="upload-input"
      type="file"
      ref="uploadImgInput"
      accept="image/*"
    />
    <div class="box-upload" @click.stop="uploadClick" :style="imgsrc?'borderStyle:solid':''">
      <img v-show="imgsrc" :src="imgsrc" />
      <i class="el-icon-plus"></i>
      <div class="mask" @click.stop="deleteImg" v-show="imgsrc">
        <i class="el-icon-delete"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Uploadimg',
  props: {
    imgsrc: {

    },
    index: { // 编辑的下标

    }
  },
  methods: {
    choosedImg () {
      let fileList = this.$refs.uploadImgInput.files
      let file = fileList[0]
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file) // 读取图片
      let uploadImgSrc
      fileReader.addEventListener('load', () => {
        uploadImgSrc = fileReader.result
        this.$emit('success', uploadImgSrc, this.index)
      })
    },
    uploadClick () {
      this.$refs.uploadImgInput.click()
    },
    deleteImg () {
      this.$refs.uploadImgInput.value = null // fileList不能直接操作，把input值为空达到同样的效果
      this.$emit('success', '', this.index)
    }
  }
}
</script>
<style scoped lang='less'>
.c-img-upload {
  position: relative;
  display: inline-block;
  .box-upload {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    cursor: pointer;
    line-height: 146px;
    // vertical-align: top;
    margin: auto;
    text-align: center;
    position: relative;
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      .el-icon-delete {
        color: #fff;
      }
    }
    .mask:hover {
      opacity: 1;
    }
  }
  .upload-input {
    position: absolute;
    z-index: -100;
    opacity: 0;
    width: 0;
  }
}
</style>
