import Http from '../script/http'
const http = new Http({})
http.initHttp({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/ddd',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

http.delete('/portal/jwt/role/page', {
  systemCode: 'PORTAL11111'
}, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Bearer-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJAdHlwZVwiOlwiY24ueXRvLnBvcnRhbC5hdXRob3JpdHkudm8uVXNlclZvXCIsXCJiZWxvbmdPcmdDb2RlXCI6XCI5OTk5OTlcIixcImJlbG9uZ09yZ05hbWVcIjpcIuaAu-WFrOWPuFwiLFwiYmVsb25nT3JnVHlwZVwiOlwiSEVBRFwiLFwib3JnQ29kZVwiOlwiOTk5OTk5XCIsXCJvcmdOYW1lXCI6XCLmgLvlhazlj7hcIixcIm9yZ1R5cGVcIjpcIkhFQURcIixcInN5c3RlbUNvZGVcIjpcIlBPUlRBTF9WVUVcIixcInVzZXJDb2RlXCI6XCIwMTY4NTI0NlwiLFwidXNlck5hbWVcIjpcIuS-r-aWjOmjnlwifSIsImp0aSI6ImQyZTEzZGUzLWRkMzktNDYxOS1hNjJjLTU2YzllNDAyY2FlYiIsImlhdCI6MTU4Njc2NDQxMiwiZXhwIjoxNTg2NzcxNjEyfQ.iar8PT7llT-x1ZT4C80UKgdqJLc4xsvulssS1Abd0XxshL67MKcTfj8PrOotviclY4P4GpM39AUXB4rNxQdu7g'
  }
})
