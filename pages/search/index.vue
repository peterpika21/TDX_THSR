<template>
  <section class="mx-auto my-0 h-container">
    <div class="my-3 d-flex align-items-center">
      <span class="mr-3 font-xl weight-l">
        {{ startName }}
      </span>
      <span class="goto">
        去程
      </span>
      <span class="ml-6 font-xl weight-l">
        {{ endName }}
      </span>
      <span class="ml-12 font-l">
        {{ goDate }}
      </span>
    </div>

    <table class="table">
      <thead>
        <th>車次</th>
        <th>出發時間</th>
        <th>抵達時間</th>
        <th>備註</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in timeTable" :key="index">
          <td class="align-center">
            {{ item.trainNo }}
          </td>
          <td class="align-center">
            {{ item.startTime }}
          </td>
          <td class="align-center">
            {{ item.endTime }}
          </td>
          <td class="align-center"></td>
        </tr>
      </tbody>
    </table>

    <div class="title">
      <div class="title__line"></div>
      <h2 class="title__tx">
        車廂票價參考
      </h2>
      <div class="title__line"></div>
    </div>
  </section>
</template>

<script>
// import dayjs from 'dayjs'
import jsSHA from 'jssha'

export default {
  data() {
    return {
      startName: '',
      endName: '',
      fares: [],
      timeTable: [],
      startStation: this.$route.query.startStation,
      endStation: this.$route.query.endStation,
      goDate: this.$route.query.goDate
    }
  },
  created() {
    this.getTicket()
    this.getTimetable()
  },
  methods: {
    getTicket() {
      const vm = this

      this.$axios
        .get(`/v2/Rail/THSR/ODFare/${vm.startStation}/to/${vm.endStation}`, {
          headers: this.getAuthorizationHeader()
        })
        .then(function(res) {
          let str = JSON.parse(JSON.stringify(res.data[0]))
          vm.startName = str.OriginStationName.Zh_tw
          vm.endName = str.DestinationStationName.Zh_tw
          vm.fares = [...str.Fares]
          console.log(vm.fares)
        })
    },
    getTimetable() {
      const vm = this

      this.$axios
        .get(`/v2/Rail/THSR/DailyTimetable/OD/${vm.startStation}/to/${vm.endStation}/${vm.goDate}`, {
          headers: this.getAuthorizationHeader()
        })
        .then(function(res) {
          let str = JSON.parse(JSON.stringify(res.data))

          vm.timeTable = str.map(e => ({
            trainNo: e.DailyTrainInfo.TrainNo,
            start: e.OriginStopTime.StationName.Zh_tw,
            startTime: e.OriginStopTime.ArrivalTime,
            end: e.DestinationStopTime.StationName.Zh_tw,
            endTime: e.DestinationStopTime.ArrivalTime
          }))
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
.title {
  margin: 60px 0 12px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &__tx {
    margin: 0;
    color: #333333;
    font-size: 24px;
    letter-spacing: 4px;
  }

  &__line {
    width: 80px;
    height: 4px;
    margin: 0 12px;
    background: #ca4f0f;
    border: 0;
    border-radius: 24px;
  }
}

.goto {
  display: inline-block;
  padding: 4px 8px;
  color: #fff;
  background: #ca4f0f;
  font-size: 14px;
  font-weight: bold;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-right: 18px solid transparent;
    border-bottom: 30px solid #ca4f0f;
    right: -16px;
    bottom: 0;
  }
}

.table {
  width: 100%;
  border-collapse: collapse;

  th {
    padding: 6px 10px;
    background: #f3f3f3;
  }

  th,
  td {
    padding: 15px 10px;
    border-bottom: 1px solid #dee2e6;
  }

  tr {
    background: #fff;
  }

  th:first-child,
  td:first-child {
    border-left: none;
  }

  th:last-child,
  td:last-child {
    border-right: none;
  }
}
</style>
