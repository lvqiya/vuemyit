import axios from 'axios'
const MyHttpServer = {}
MyHttpServer.install = (Vue)=>{
   
    // 4. 添加实例方法
    Vue.prototype.$http = axios
  }
  export default MyHttpServer;