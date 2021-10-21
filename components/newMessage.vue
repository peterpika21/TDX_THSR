<template>
  <section class="mx-auto mb-12 h-container">
    <div class="title">
      <div class="title__line"></div>
      <h2 class="title__tx">
        最新消息
      </h2>
      <div class="title__line"></div>
    </div>

    <table class="table">
      <thead>
        <th>類別</th>
        <th>標題</th>
        <th>日期</th>
      </thead>
      <tbody>
        <tr v-for="item in msgData" :key="item.NewsID">
          <td class="align-center">
            {{ item.NewsCategory }}
          </td>
          <td>
            <a href="#" class="table__link">{{ item.Title }}</a>
          </td>
          <td class="align-center">
            {{ item.StartTime }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import dayjs from 'dayjs'
import jsSHA from 'jssha'

export default {
  data() {
    return {
      msgData: []
    }
  },
  created() {
    this.getMessageData()
  },
  methods: {
    getMessageData() {
      const vm = this

      this.$axios
        .get(`/v2/Rail/THSR/News`, {
          headers: this.getAuthorizationHeader()
        })
        .then(function(res) {
          let str = JSON.parse(JSON.stringify(res.data))
          str.forEach(e => {
            e.StartTime = dayjs(e.StartTime).format('YYYY/MM/DD')
          })
          vm.msgData = str
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

.table {
  width: 100%;
  border-collapse: collapse;

  &__link {
    text-decoration: none;
  }

  th {
    padding: 6px 10px;
    background: #f3f3f3;
  }

  th,
  td {
    padding: 15px 10px;
    border: 1px solid #dee2e6;
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
