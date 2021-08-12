import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import axios from 'axios'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.prototype.$http = axios.create({
    baseURL: 'http://192.168.137.1:8080'
})
Vue.config.productionTip = false;
Vue.use(Message);
Vue.prototype.$message = Message;


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')