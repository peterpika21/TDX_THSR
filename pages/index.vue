<template>
  <div>
    <!-- 看板 -->
    <banner></banner>

    <!-- 時刻表 -->
    <trainSearch></trainSearch>

    <!-- 最新消息 -->
    <newMessage></newMessage>

    <section>
      <!-- <fa :icon="['fas', 'file-image']" /> -->
    </section>
  </div>
</template>

<script>
import banner from '~/components/banner.vue'
import trainSearch from '~/components/trainSearch.vue'
import newMessage from '~/components/newMessage.vue'

export default {
  components: { banner, trainSearch, newMessage },
  data() {
    return {}
  }
}
</script>
