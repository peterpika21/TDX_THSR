<template>
  <div id="app">
    <vHeader></vHeader>
    <nuxt class="container" />
    <vFooter></vFooter>
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
@import '~assets/css/helpers/_variables.scss';

#app {
  height: 100%;
  overflow-x: hidden;
}

.container {
  min-height: $container-height;
}
</style>
