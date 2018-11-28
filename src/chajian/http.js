import axios from 'axios'
const MyHttpServer = {}
MyHttpServer.install = (Vue)=> {
    axios.defaults.baseURL='http://localhost:8888/api/private/v1/'
    // 设置请求头 进行设置
    axios.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      if (config.url !== 'login') {
        config.headers.common['Authorization'] = localStorage.getItem('token')
      }
      
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });
  
    // 4. 添加实例方法
    Vue.prototype.$http = axios
  }
  export default MyHttpServer;