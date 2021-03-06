import axios from 'axios'
import { store } from './index'

store.subscribe((mutation) => {
    if (mutation.type == 'SET_TOKEN') {
        if (mutation.payload) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
            localStorage.setItem('token' , mutation.payload)
        } else {
            axios.defaults.headers.common['Authorization'] = null
            localStorage.setItem('token' , null)
        }
    }
})