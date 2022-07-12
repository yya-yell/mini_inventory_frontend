import { createRouter, createWebHistory } from 'vue-router'
import Inventories from '@/views/InventoryCRUD'
import History from '@/views/History'
import TodayHistory from '@/views/TodayHistory'
import Dashboard from '@/views/Dashboard'
import DailyRecords from '@/views/DailyRecords'
import todayinventory from '@/views/TodayInventory'
import MonthlyRecords from '@/views/MonthlyRecords'
import Login from '@/views/Login'
import middleware from '@/middleware'
import beforeLogin from '@/middleware/beforeLogin'
const routes = [
  {
    path: '/',
    name: 'Inventories',
    component: Inventories,
    beforeEnter : middleware
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter : beforeLogin
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    beforeEnter : middleware
  },
  {
    path: '/todayhistory',
    name: 'TodayHistory',
    component: TodayHistory,
    beforeEnter : middleware
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter : middleware
  },
  {
    path: '/dailyrecords',
    name: 'Dailyrecords',
    component: DailyRecords,
    beforeEnter : middleware
  },
  {
    path: '/todayinventory',
    name: 'todayinventory',
    component: todayinventory,
    beforeEnter : middleware
  },
  {
    path: '/montlyrecords',
    name: 'MonthlyRecords',
    component: MonthlyRecords,
    beforeEnter : middleware
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
