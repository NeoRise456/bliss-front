import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../public/pages/home.component.vue";
import ScheduleComponent from "../public/pages/schedule.component.vue";
import ClientServicesComponent from "../service-management/pages/client-services.component.vue";
import ClientServiceDetailComponent from "../service-management/pages/client-service-detail.component.vue";
import BusinessServicesComponent from "../service-management/pages/business-services.component.vue";
import CreateBusinessServiceComponent from "../service-management/components/create-business-service.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/home', name:'Home', component: HomeComponent, meta: {title: 'Home'}},
        {path: '/client-services', name:'Services', component: ClientServicesComponent, meta: {title: 'Services'}},
        {path: '/schedule', name:'Schedule', component: ScheduleComponent, meta: {title: 'Schedule'}},
        {path: '/service-management/:id', name: 'Service', component: ClientServiceDetailComponent, meta: {title: 'ServiceDetail'}},
        {path: '/business-services', name:'My Services', component: BusinessServicesComponent, meta:{title:'My Services'}},
        {path: '/business-service-management/create-service', name:'Create Service', component: CreateBusinessServiceComponent, meta:{title:'Create Service'}},
        {path: '/', redirect: '/home'}
    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'Bliss';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

export default router;