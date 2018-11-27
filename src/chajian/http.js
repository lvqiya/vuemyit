import axios from 'axios'
const MyHttpServer = {}
MyHttpServer.install = (Vue)=> {
    axios.defaults.baseURL='http://localhost:8888/api/private/v1/'
    // 设置请求头 进行设置
    
    // 4. 添加实例方法
    Vue.prototype.$http = axios
  }
  export default MyHttpServer;