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

export default {
  name: 'MeRow'
}
</script>
