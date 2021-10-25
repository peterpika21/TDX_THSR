<template>
  <section class="bg-white">
    <div class="wrap h-container">
      <h2>
        {{ info.Title }}
      </h2>

      <div class="weight-l font-l">
        {{ info.StartTime }}
      </div>
      <div class="line"></div>

      <div class="content" v-html="info.Description"></div>
    </div>
  </section>
</template>

<script>
import { Base64 } from 'js-base64'

export default {
  data() {
    return {
      info: {}
    }
  },
  created() {
    this.info = { ...JSON.parse(Base64.decode(this.$route.query.data)) }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  margin: 12px auto;
  padding: 12px;
}

.line {
  margin: 12px 0;
  padding: 1px;
  background: #c4c4c4;
  border: 0;
  border-radius: 18px;
}

.content {
  line-height: 30px;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
}
</style>
