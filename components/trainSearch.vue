<template>
  <section class="mx-auto my-0 h-container">
    <div class="title">
      <div class="title__line"></div>
      <h2 class="title__tx">
        時刻表與票價
      </h2>
      <div class="title__line"></div>
    </div>

    <div class="wrap">
      <div class="wrap__col">
        <label class="wrap__label" for="startStation">起程站</label>
        <select id="startStation" v-model="startStation" class="wrap__select">
          <option v-for="item in stationData" :key="item.StationID" :value="item.StationID">
            {{ item.StationName.Zh_tw }}
          </option>
        </select>
      </div>

      <div class="wrap__col">
        <label class="wrap__label" for="endStation">到達站</label>
        <select id="endStation" v-model="endStation" class="wrap__select">
          <option v-for="item in stationData" :key="item.StationID" :value="item.StationID">
            {{ item.StationName.Zh_tw }}
          </option>
        </select>
      </div>

      <div class="wrap__col">
        <label class="wrap__label" for="date">去程日期</label>
        <input id="date" v-model="goDate" class="wrap__input" type="date" />
      </div>

      <div class="wrap__col">
        <button class="wrap__btn" @click="search">
          查詢
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import dayjs from 'dayjs'
import jsSHA from 'jssha'

export default {
  data() {
    return {
      stationData: [],
      startStation: '0990',
      endStation: '1070',
      goDate: dayjs().format('YYYY-MM-DD')
    }
  },
  created() {
    this.getStationData()
  },
  methods: {
    search() {
      this.$router.push({
        path: '/search',
        query: {
          startStation: this.startStation,
          endStation: this.endStation,
          goDate: this.goDate
        }
      })
    },
    getStationData() {
      const vm = this

      this.$axios
        .get(`/v2/Rail/THSR/Station`, {
          headers: this.getAuthorizationHeader()
        })
        .then(function(res) {
          let str = JSON.parse(JSON.stringify(res.data))

          vm.stationData = str
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

.wrap {
  padding: 36px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__col {
    width: 18%;
    display: flex;
    flex-direction: column;
  }

  &__label {
    font-size: 14px;
    color: #666;
  }

  &__select,
  &__input {
    padding: 4px 12px;
    font-weight: bold;
    border-radius: 0;
    border: none;
    border-bottom: 2px solid #ccc;
    outline: none;
  }

  &__btn {
    padding: 12px 20px;
    color: #fff;
    background: #ca4f0f;
    font-size: 18px;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: #333;
      background: lighten($color: #ca4f0f, $amount: 10%);
    }
  }
}

@include breakpoint('md') {
  .wrap {
    display: block;

    &__col {
      width: 100%;
      margin-bottom: 12px;
    }
  }
}
</style>
