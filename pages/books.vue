<template>
    <Books />
  </template>
  
  <script>
  import Books from '@/components/Books.vue';
  import { mapGetters } from 'vuex';
  
  export default {
    components: {
      Books
    },
    computed: {
      ...mapGetters(['loggedInUser'])
    },
    middleware: 'auth',
  };
  </script>
  