<template>
    <Users />
  </template>
  
  <script>
  import Users from '@/components/Users.vue';
  import { mapGetters } from 'vuex'
  
  export default {
    components: {
      Users
    }, 
    computed: {
      ...mapGetters(['loggedInUser'])
    },
    middleware: 'auth',
  };
  </script>
  