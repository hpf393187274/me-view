<template>
  <div class="me-row">
    <slot />
  </div>
</template>

<script>
// import { http } from '@assets/script/common'

// http.initHttp({
//   baseURL: '/api',
//   headers: {
//     'Content-Type': 'application/json',
//     'X-Requested-With': 'XMLHttpRequest'
//   }
// })

// // // sort=1&sortType=1&beginDate=2020-03-06%2000%3A00%3A00&endDate=2020-03-06%2023%3A59%3A59&pageNum=1&pageSize=10&total=true
// http.post('/analysis/userAction/queryAnalysisBySystem', {
//   sort: 1,
//   sortType: 1,
//   beginDate: '2020-03-05 00:00:00',
//   endDate: '2020-03-06',
//   pageNum: 1,
//   pageSize: 10
// })
// import { Socket } from '@assets/script/common'
// const socket = new Socket('localhost', 8088)
export default {
  name: 'MeRow',
  created () {
    // this.$type.isString('22222222222222')
    // socket.registerEvent('message', data => {
    //   console.log('event -> message', data)
    // })
    // socket.registerEvent('message-1', data => {
    //   console.log('event -> message-1-1', data)
    // })
    // socket.registerEvent('message-1', data => {
    //   console.log('event -> message-1-2', data)
    // })
    // socket.registerEvent('message-2', data => {
    //   console.log('event -> message-2', data)
    // })
    // socket.registerEvent('message-3', data => {
    //   console.log('event -> message-3', data)
    // })
  }
}
</script>
