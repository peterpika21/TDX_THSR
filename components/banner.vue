<template>
  <!-- 看板 -->
  <section>
    <div class="banner">
      <!-- 南下 -->
      <div class="banner__north">
        <p class="p-2 font-l weight-l align-center bg-gray-100">
          南下車次
        </p>
        <table class="width-20">
          <thead class="tx-white">
            <th class="font-l">
              車次
            </th>
            <th class="font-l">
              起程站
            </th>
            <th class="font-l">
              到達站
            </th>
            <th width="210px" class="font-l">
              發車時間
            </th>
            <th width="80px" class="font-l">
              狀況
            </th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in southData" :key="`sourth${index}`">
              <td class="font-l align-center tx-primary weight-l">
                {{ item.TrainNo }}
              </td>
              <td class="font-l align-center tx-info weight-l">
                {{ item.StationName.Zh_tw }}
              </td>
              <td class="font-l align-center tx-danger weight-l">
                {{ item.EndingStationName.Zh_tw }}
              </td>
              <td>
                <electronicClock :time="item.DepartureTime"></electronicClock>
              </td>
              <td class="font-l align-center tx-success weight-l">
                準點
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 北上 -->
      <div class="banner__north">
        <p class="p-2 font-l weight-l align-center bg-gray-100">
          北上車次
        </p>
        <table class="width-20">
          <thead class="tx-white">
            <th class="font-l">
              車次
            </th>
            <th class="font-l">
              起程站
            </th>
            <th class="font-l">
              到達站
            </th>
            <th width="210px" class="font-l">
              發車時間
            </th>
            <th width="80px" class="font-l">
              狀況
            </th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in northData" :key="`north${index}`">
              <td class="font-l align-center tx-primary weight-l">
                {{ item.TrainNo }}
              </td>
              <td class="font-l align-center tx-info weight-l">
                {{ item.StationName.Zh_tw }}
              </td>
              <td class="font-l align-center tx-danger weight-l">
                {{ item.EndingStationName.Zh_tw }}
              </td>
              <td>
                <electronicClock :time="item.DepartureTime"></electronicClock>
              </td>
              <td class="font-l align-center tx-success weight-l">
                準點
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import dayjs from 'dayjs'
import jsSHA from 'jssha'
import electronicClock from '~/components/electronicClock.vue'

export default {
  components: { electronicClock },
  data() {
    return {
      northData: [],
      southData: []
    }
  },
  created() {
    this.getBannerData()
  },
  methods: {
    getBannerData() {
      const vm = this
      const time = dayjs().format('HH:mm')

      this.$axios
        .get(
          `/v2/Rail/THSR/AvailableSeatStatusList?&$orderby=DepartureTime%20asc&$top=50&&$format=JSON&$filter=DepartureTime%20ge%20'${time}'`,
          {
            headers: this.getAuthorizationHeader()
          }
        )
        .then(function(res) {
          let str = JSON.parse(JSON.stringify(res.data.AvailableSeats))

          vm.southData = str.filter(e => e.Direction === 0).filter((e, i) => i < 7)
          vm.northData = str.filter(e => e.Direction === 1).filter((e, i) => i < 7)
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

<style lang="scss" scoped>
@import '~assets/css/helpers/_mixin.scss';

.banner {
  background: #202124;
  display: flex;
  justify-content: space-between;

  &__north {
    flex: 1;
  }

  &__sourth {
    flex: 1;
  }
}

@include breakpoint('xs') {
  .banner {
    display: none;
  }
}
</style>
