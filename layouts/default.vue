<template>
  <div>
    <Navbar/>
    <Sidebar v-if="$store.state.auth.loggedIn" />
    <Spinner />
    <nuxt/>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import Sidebar from '@/components/Sidebar.vue';
import Spinner from '@/components/Spinner.vue';

export default {
  components: {
    Navbar,
    Sidebar,
    Spinner,
  }
}
</script>