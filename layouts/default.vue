<template>
  <div id="app">
    <vHeader></vHeader>
    <nuxt class="container" />
    <vFooter id="footer"></vFooter>
  </div>
</template>

<script>
import vHeader from '~/components/vHeader.vue'
import vFooter from '~/components/vFooter.vue'

export default {
  components: {
    vHeader,
    vFooter
  }
}
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

.container {
  flex-grow: 1;
}
</style>
