<template>
  <section class="mx-auto my-0 h-container"></section>
</template>

<script>
import dayjs from 'dayjs'
import jsSHA from 'jssha'

export default {
  data() {
    return {
      startStation: '0990',
      endStation: '1070',
      goDate: dayjs().format('YYYY-MM-DD')
    }
  },
  created() {
    this.getTicket()
  },
  methods: {
    getTicket() {
      const vm = this

      this.$axios
        .get(`/v2/Rail/THSR/ODFare/${vm.startStation}/to/${vm.endStation}`, {
          headers: this.getAuthorizationHeader()
        })
        .then(function(res) {
          let str = JSON.parse(JSON.stringify(res.data))
          console.log(str)
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

<style lang="scss" scoped></style>
