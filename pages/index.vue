<template>
  <div>
    <div v-for="item in listData" :key="item.ID">
      <img :src="item.Picture.PictureUrl1" :alt="item.Picture.PictureDescription1" />
    </div>
    <fa :icon="['fas', 'file-image']" />
  </div>
</template>

<script>
import jsSHA from 'jssha'

export default {
  data() {
    return {
      listData: []
    }
  },
  created() {
    this.api()
  },
  methods: {
    api() {
      const vm = this

      this.$axios
        .get('/v2/Tourism/ScenicSpot?$top=30&$format=JSON', {
          headers: this.getAuthorizationHeader()
        })
        .then(function(res) {
          vm.listData = JSON.parse(JSON.stringify(res.data))
          console.log(vm.listData)
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
