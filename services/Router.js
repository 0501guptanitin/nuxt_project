import Vue from 'vue';
import Router from 'vue-router';
import Users from '@/components/Users.vue';
import Books from '@/components/Books.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/users'
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/books',
      name: 'books',
      component: Books
    }
  ]
});

export default router;
