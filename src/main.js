import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.config.productionTip = false

import firebase from 'firebase';

/* var firebase = require('firebase');
var firebaseui = require('firebaseui'); */

import login from "./components/login.vue"
import privado from "./components/privado.vue"
import registro from "./components/registro.vue"
import './registerServiceWorker'


const routes = [
  { path: '/login', component: login },
  { path: '/registro', component: registro },
  { path: '/privado', component: privado, meta: {
    requiresAuth: true
  } },
  { path: '*', component: login }
]
const router = new VueRouter({
  routes // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  
  else next()
})

window.firebase = firebase

firebase.auth().onAuthStateChanged(function(user) {
let x= user;
x="";
console.log(x);
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
});


