<template>
  <header class="header">
    <div class="mx-auto my-0 h-container d-flex justify-content-between">
      <h1 class="header__logo">
        <a href="/">
          <img src="https://www.thsrc.com.tw/Event/Logo.svg" alt="台灣高鐵" />
        </a>
      </h1>

      <ul class="d-flex justify-content-between align-items-center">
        <li>
          <a href="" class="header__link">最新消息</a>
        </li>
        <li>
          <a href="" class="header__link">時刻表與票價</a>
        </li>
        <li>
          <a href="" class="header__link">相關說明</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.header {
  &__logo {
    margin: 0;
    width: 210px;
  }

  &__link {
    margin: 12px;
    padding-bottom: 8px;
    color: #333333;
    font-size: 22px;
    font-weight: bold;
    text-decoration: none;
    transition: all 0.3s;

    &:hover {
      border-bottom: 4px solid #ca4f0f;
    }
  }
}
</style>
