<template>
  <div>
    <!-- 看板 -->
    <banner></banner>

    <!-- 時刻表 -->
    <trainSearch id="trainSearch"></trainSearch>

    <!-- 最新消息 -->
    <newMessage id="newMessage"></newMessage>
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
