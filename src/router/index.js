import Vue from 'vue'
import VueRouter from 'vue-router'

//import Home from '@/pages/home/Home'
import Main from '@/pages/main/Main' 
//import Detail from '@/components/management/Detail' 
//import Foundapp from '@/components/management/Foundapp'
//import Personal from '@/components/user/Personal'
//import Usercenter from '@/components/user/Usercenter'
//import Manage from '@/components/user/Manage'
//import Usecontrol from '@/components/user/Usecontrol'
//import Center from '@/components/management/Center'
//import Changepassword from '@/components/user/Changepassword'
//const Home = resolve => require.ensure(['./pages/home/Home.vue'], ()=> resolve(require('./pages/home/Home.vue')));
Vue.use(VueRouter);
const routes = [

  {
    path: '/',
//  component: Home,
    name: 'Home',
    component:  resolve => require(['../pages/home/Home.vue'], resolve)
  },
  {
    path: '/main',
    component: Main,
//  component:  resolve => require(['../pages/main/Main.vue'], resolve),
    name: 'Main',
    children: [{
        path: 'personal',
//      component: Personal,
   		 component:  resolve => require(['../components/user/Personal.vue'], resolve),
        name:'Personal'
      },
      {
        path: 'manage',
//      component: Manage,
   		 component:  resolve => require(['../components/user/Manage.vue'], resolve),
        name:'Manage'
      },
      {
        path: 'usecontrol',
//      component: Usecontrol,
   		 component:  resolve => require(['../components/user/Usecontrol.vue'], resolve),
        name:'Usecontrol'
      },
      {
        path: 'center',
//      component: Center
   		 component:  resolve => require(['../components/management/Center.vue'], resolve),
      },
      {
        path: 'foundapp',
//      component: Foundapp
   		 component:  resolve => require(['../components/management/Foundapp.vue'], resolve),

      },

      {
        path: 'detail',
//      component: Detail
   		 component:  resolve => require(['../components/management/Detail.vue'], resolve),

      },
      {
        path: 'usercenter',
//      component: Usercenter
   		 component:  resolve => require(['../components/user/Usercenter.vue'], resolve),
      }, {
        path: 'changepassword',
//      component: Changepassword
   		 component:  resolve => require(['../components/user/Changepassword.vue'], resolve),
      }
    ]
  },
  {
    path: '*',
    redirect: '/home'
  }
]

var __dirname = process.env.DIR_NAME;

const router = new VueRouter({
  base: __dirname,
  routes
});

export default router;
