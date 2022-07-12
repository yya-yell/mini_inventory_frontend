import {store} from '@/store'
export default function(to , from , next) {
    if (store.state.auth.token) {
        return next({
            name : 'Dashboard'
        })
    }
    next()
}