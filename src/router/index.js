import { createRouter, createWebHistory } from 'vue-router'
import SignInPage from '../views/SignInPage'
import SignUpPage from '../views/SignUpPage'
import MainPage from '../views/MainPage'
import SettingsPage from '../views/SettingsPage'

const routes = [
    {
        path: '/',
        name: 'SignInPage',
        component: SignInPage,

    },
    {
        path: '/signuppage',
        name: 'SignUpPage',
        component: SignUpPage,

    },
    {
        path: '/mainpage',
        name: 'MainPage',
        component: MainPage,

    },
    {
        path: '/SettingsPage',
        name: 'SettingsPage',
        component: SettingsPage,

    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
