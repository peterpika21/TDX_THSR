<template>
  <div>
    <!-- 看板 -->
    <banner></banner>

    <section>
      <!-- <fa :icon="['fas', 'file-image']" /> -->
    </section>
  </div>
</template>

<script>
import jsSHA from 'jssha'
import banner from '~/components/banner.vue'

export default {
  components: { banner },
  data() {
    return {
      northData: [],
      southData: []
    }
  },
  created() {},
  methods: {
    getBannerData() {
      const vm = this

      this.$axios
        .get(``, {
          headers: this.getAuthorizationHeader()
        })
        .then(function(res) {
          let str = JSON.parse(JSON.stringify(res.data.AvailableSeats))

          vm.southData = str.filter(e => e.Direction === 0)
          vm.northData = str.filter(e => e.Direction === 1)
          console.log(vm.southData)
          console.log(vm.northData)
        })
    },
    getAuthorizationHeader() {
      let AppID = '4a642955ffbe4621967b643c51372922'
      let AppKey = 'f_cWs8Qm3fXmoY5H8jrA4aWbcog'

      let GMTString = new Date().toGMTString()
      let ShaObj = new jsSHA('SHA-1', 'TEXT')
      ShaObj.setHMACKey(AppKey, 'TEXT')
      ShaObj.update('x-date: ' + GMTString)
      let HMAC = ShaObj.getHMAC('B64')
      let Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`

      return { Authorization: Authorization, 'X-Date': GMTString }
    }
  }
}
</script>
