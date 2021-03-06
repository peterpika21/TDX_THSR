import axios from 'axios'

export default function(ctx, inject) {
  axios.defaults.baseURL = 'https://ptx.transportdata.tw/MOTC/'
  axios.defaults.headers.common['Authorization'] = 'YUOR_AUTH_TOKEN'
  axios.defaults.headers.post['Content-Type'] = 'application/json'

  /* 注入 Nuxt Instance Property */
  ctx.$axios = axios
  inject('axios', axios)
}
