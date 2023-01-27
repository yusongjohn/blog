import Vue from 'Vue'
import App from './App.vue'

var app = new Vue({
    el: '#app',
    // 这里的 h 是 createElement 方法
    render: h => h(App) // tag 就是 App
})