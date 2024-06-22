<template>
    <section class="section">
      <div class="container">
        <h2 class="title">My Profile</h2>
        <div class="content">
          <p>
            <strong>Username:</strong>
            {{ loggedInUser.username }}
          </p>
          <p>
            <strong>Email:</strong>
            {{ loggedInUser.email }}
          </p>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  
  export default {
    computed: {
      ...mapGetters(['loggedInUser'])
    },
    middleware: 'auth',
  }
  </script>

  <style>
  .section{
    margin-left: 220px; /* Space for the sidebar */
    padding: 1rem;
  }
</style>