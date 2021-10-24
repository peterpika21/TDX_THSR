<template>
  <footer class="footer">
    <div class="mx-auto my-0 px-3 pt-3 h-container">
      <h2 class="tx-white">
        相關版權與聲明
      </h2>
      <ul class="footer__list">
        <li v-for="(item, index) in listData" :key="index" class="footer__item">
          <p>{{ index + 1 }}. {{ item.content }}</p>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      listData: [
        { content: '相關資料由中華民國交通部 TDX API 提供' },
        { content: '網站介面為參考台灣高鐵 https://www.thsrc.com.tw/ 仿作練習' },
        { content: '網站 LOGO 為台灣高速鐵路股份有限公司所有' },
        { content: '網站為私人網頁，作為展示用途，絕無任何商業行為' }
      ]
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '~assets/css/helpers/_variables.scss';

.footer {
  height: $footer-hight;
  background: #6b6a6f;

  &__list {
    color: #fff;
    font-weight: bold;
    letter-spacing: 1px;
  }

  &__item {
    margin-bottom: 4px;
  }
}
</style>
