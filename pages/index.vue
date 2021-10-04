<template>
  <div>
    <fa :icon="['fas', 'file-image']" />
  </div>
</template>

<script>
import jsSHA from 'jssha'

export default {
  data() {
    return {}
  },
  created() {
    this.api()
  },
  methods: {
    api() {
      this.$axios
        .get('/v2/Tourism/ScenicSpot?$top=30&$format=JSON', {
          headers: this.getAuthorizationHeader()
        })
        .then(function(res) {
          console.log(res.data)
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
