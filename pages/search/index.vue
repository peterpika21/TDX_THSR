<template>
  <section class="mx-auto my-0 h-container">
    <div class="info">
      <div class="d-flex align-items-center">
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

      <ul class="fares">
        <li v-for="(item, index) in fares" :key="index" class="fares__item">
          <div class="fares__type" :class="typeColor(index)">
            {{ item.TicketType }}
          </div>
          <div class="fares__price">
            {{ item.Price | currency }}
          </div>
        </li>
      </ul>
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
  </section>
</template>

<script>
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
    typeColor(i) {
      if (i === 0) {
        return 'bg-primary'
      }

      if (i === 1) {
        return 'bg-info'
      }

      if (i === 2) {
        return 'bg-success'
      }
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

.info {
  margin: 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.fares {
  display: flex;
  width: 200px;

  &__item {
    flex: 1;
  }

  &__type {
    padding: 4px;
    color: #fff;
    font-weight: bold;
    text-align: center;
  }

  &__price {
    padding: 4px;
    background: #fff;
    text-align: center;
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

@include breakpoint('xs') {
  .info {
    display: block;
    margin-left: 18px;
  }

  .fares {
    margin: 12px 0;
  }
}
</style>
