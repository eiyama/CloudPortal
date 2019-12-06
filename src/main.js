import Vue from 'vue'
import router from './router'
import center from './common/notificationCenter.js'
import store from './store'
import App from './App.vue'
import axios from './http.js'
import {Tooltip,MessageBox,Steps,Step,Message,Checkbox,Collapse,Container,Select,Option,Header,Main,Footer,Form,FormItem,Input,Button,Loading,Dropdown,DropdownMenu,DropdownItem,Dialog,Radio,Table,TableColumn,Pagination,} from 'element-ui';
Vue.use(Steps);
Vue.use(Step);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Loading);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Loading);
Vue.use(Dialog);
Vue.use(Radio);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Select);
Vue.use(Option);
Vue.use(Tooltip);
Vue.use(Checkbox);
Vue.use(Collapse);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
import VueClipboard from 'vue-clipboard2'
import 'element-ui/lib/theme-chalk/index.css' 
import '../static/css/index.css'  
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$event = center
Vue.prototype.$api = process.env.API_ROOT
Vue.prototype.$hapi = process.env.HAPI_ROOT
Vue.prototype.$site = process.env.SITE_NAME
Vue.prototype.$corp = process.env.CORP_NAME
Vue.prototype.$domain = process.env.DOMAIN 
Vue.use(VueClipboard)
require ("../static/css/" + process.env.DOMAIN + ".css")
new Vue({
  el: '#app',
  axios,
  router,
  store,
  render: (handle) => handle(App)
})
