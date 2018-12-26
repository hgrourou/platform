import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    // redirect: '/dashboard',
    redirect: '/rule/preselection',
    name: 'Dashboard',
    hidden: true,
    children: [{
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/rule',
    component: Layout,
    children: [
      {
        path: 'preselection',
        component: () => import('@/views/rule/preselection.vue'),
        name: 'preselection',
        meta: { title: 'preselection', icon: 'icon-guizeyinqing' }
      }
    ]
  },
  {
    path: '/rule',
    component: Layout,
    children: [
      {
        path: 'casemarking',
        component: () => import('@/views/rule/casemarking.vue'),
        name: 'casemarking',
        meta: { title: 'casemarking', icon: 'icon-guize1' }
      },
    ]
  },
  // {
  //   path: '/rule',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'test',
  //       component: () => import('@/views/rule/test.vue'),
  //       name: 'test',
  //       meta: { title: 'test', icon: 'icon-guize1' }
  //     },
  //   ]
  // },
  {
    path: '/config',
    component: Layout,
    children: [
      {
        path: 'variables',
        component: () => import('@/views/help/index.vue'),
        name: 'config',
        meta: { title: '配置', icon: 'icon-config-rule' }
      },
    ]
  },
  // {
  //   path: '/rule',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'allocationCasemodel',
  //       component: () => import('@/views/rule/allocationCasemodel.vue'),
  //       name: 'allocationCasemodel',
  //       meta: { title: 'allocation casemodel', icon: 'icon-xinfengtianchong' }
  //     },
  //   ]
  // },
  // {
  //   path: '/rule',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'groupDecisionmaker',
  //       component: () => import('@/views/rule/groupDecisionmaker.vue'),
  //       name: 'groupDecisionmaker',
  //       meta: { title: 'group decisionmaker', icon: 'icon-xinfengtianchong' }
  //     },
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
];
export default new Router({
  mode: "history",
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
