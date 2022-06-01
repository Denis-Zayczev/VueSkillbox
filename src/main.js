import Vue from 'vue';
import App from './App.vue';
import { message, message2 } from './file1';
import MessageSend from './file2';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

MessageSend(message, message2);
