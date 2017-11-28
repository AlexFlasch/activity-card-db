import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: require('@/pages/Home.vue'),
        },
        {
            path: '/view/:filename',
            name: 'view',
            component: require('@/pages/YearData.vue'),
        },
        // {
        //     path: '/print',
        //     name: 'print',
        //     component: require('@/components/ActivityCard.vue'),
        //     props(route) {
        //         return route.query || {};
        //     },
        // },
        {
            path: '*',
            redirect: '/',
        },
    ],
});
