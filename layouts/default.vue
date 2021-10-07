<template>
  <div id="app">
    <vHeader></vHeader>
    <nuxt />

    <!-- <footer>
      <div class="mx-auto my-0 h-container">
        footer
      </div>
    </footer> -->
  </div>
</template>

<script>
import vHeader from '~/components/vHeader.vue'

export default {
  components: {
    vHeader
  }
}
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  overflow-x: hidden;
}
</style>
