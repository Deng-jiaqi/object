<template>
  <div>
    <button @click="toLoginAdmin">管理员登录</button>
    <br />
    <br />
    <button @click="toLoginEmployees">员工登录</button>
    <br />
    <br />
    <br />
    <br />
    <button @click="toEnglish">英文</button>
    <button @click="toChinese">中文</button>
  </div>
</template>

<script>
export default {
  name: 'Dashbord',
  methods: {
    toLoginAdmin () {
      if (this.$cookies.get('ALoginInfoSuccessList')) {
        this.$router.push({
          path: '/loginAndRegister/loginOfRecent',
          query: { isWho: 'admin' }
        })
      } else {
        this.$router.push({ path: '/loginAndRegister/ALogin' })
      }
    },
    toLoginEmployees () {
      if (this.$cookies.get('ELoginInfoSuccess')) {
        this.$router.push({
          path: '/loginAndRegister/loginOfRecent',
          query: { isWho: 'employees' }
        })
      } else {
        this.$router.push({ path: '/loginAndRegister/ELoginOfMall' })
      }
    },
    toChinese () {
      if (this.$i18n.locale === 'zh-CN') {
      } else {
        this.$i18n.locale = 'zh-CN'
      }
    },
    toEnglish () {
      if (this.$i18n.locale === 'en-US') {
      } else {
        this.$i18n.locale = 'en-US'
      }
    }
  },
  created () {
    console.log(this.$cookies.get('ALoginInfoSuccessList'))
    console.log(this.$cookies.get('ELoginInfoSuccess'))
  }
}
</script>

<style scoped lang="less">
</style>
