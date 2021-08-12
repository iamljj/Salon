import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main.vue'
import Department from '../views/Administration/Department.vue'
import Staff from '../views/Administration/Staff.vue'
import Custmers from '../views/Customer/customers.vue'
import Potential from '../views/Customer/Potential.vue'
import Pool from '../views/Customer/Pool.vue'
import Regular from '../views/Customer/Regular.vue'
import Failed from '../views/Customer/Failed.vue'
import PotentialCustomers from '../views/Statistics/PotentialCustomers.vue'
import Lost from '../views/Customer/Lost.vue'
import Transfer from '../views/TransferHistory/transfer.vue'
import Bzt from '../views/Statistics/bzt.vue'
import login from '../views/login/login.vue'

Vue.use(VueRouter)

const routes = [{

        path: '/main',
        name: 'Main',
        component: Main,
        children: [{
            path: '/Administration/department',
            component: Department
        }, {
            path: '/Administration/staff',
            component: Staff
        }, {
            path: '/Customer/customers',
            component: Custmers
        }, {
            path: '/Customer/potential',
            component: Potential
        }, {
            path: '/Customer/pool',
            component: Pool
        }, {
            path: '/Customer/regular',
            component: Regular
        }, {
            path: '/Customer/failed',
            component: Failed
        }, {
            path: '/Statistics/PotentialCustomers',
            component: PotentialCustomers
        }, {
            path: '/Customer/lost',
            component: Lost
        }, {
            path: '/TransferHistory/transfer',
            component: Transfer
        }, {
            path: '/bzt',
            component: Bzt
        }],
    },
    {
        path: '/',
        name: '登录',
        component: login
    }

]

const router = new VueRouter({
    routes
})

export default router