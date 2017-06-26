import Vue from 'vue';
import Router from 'vue-router';
import Datepicker from '../components/Datepicker.vue';

import VueScroller from 'vue-scroller';

Vue.use(VueScroller);
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/datepicker',
            name: 'Datepicker',
            component: Datepicker
        }
    ]
});
