import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: 'home', icon: 'dashboard' }
    }]
  },

  {
    path: '/lesson',
    component: Layout,
    redirect: '/lesson/lessons',
    name: 'lesson',
    meta: { title: '课程管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'lessons',
        name: 'lessons',
        component: () => import('@/views/lessons/index'),
        meta: { title: '课程列表', icon: 'table' }
      },
      {
        path: 'issuelesson',
        name: 'issuelesson',
        component: () => import('@/views/issuelesson/index'),
        meta: { title: '发布课程', icon: 'tree' }
      }
    ]
  },

  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/teachers',
    name: 'teacher',
    meta: { title: '老师管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'teachers',
        name: 'teachers',
        component: () => import('@/views/teachers/index'),
        meta: { title: '老师列表', icon: 'table' }
      },
      {
        path: 'addteacher',
        name: 'addteacher',
        component: () => import('@/views/addteacher/index'),
        meta: { title: '添加老师', icon: 'tree' }
      }
    ]
  },

  {
    hidden: true,
    path: '/editlesson',
    component: Layout,
    children: [
      {
        path: 'index/:lid',
        name: 'editlesson',
        component: () => import('@/views/editlesson/index'),
        meta: { title: '修改课程信息', icon: 'form' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
