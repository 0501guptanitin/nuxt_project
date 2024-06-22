<template>
  <div>
    <section class="section" v-if="!isAuthenticated">
      <div class="container">
        <div class="welcome-message">
          <h1 class="title">Welcome to Nuxt Auth Project</h1>
          <p class="subtitle">Experience seamless authentication with our project.</p>
          <div class="actions">
            <button class="btn" @click="navigateToLogin">Login</button>
            <button class="btn" @click="navigateToSignUp">Register</button>
          </div>
        </div>
        <div class="info-sections">
          <div class="info-card">
            <h2>Feature One: API Creation and Authentication</h2>
            <p>
              Learn how to create APIs and integrate authentication using our project. 
              This feature covers setting up authentication tokens, securing endpoints, 
              and managing user sessions. Follow our comprehensive guides to ensure 
              your APIs are secure and efficient.
            </p>
          </div>
          <div class="info-card">
            <h2>Feature Two: Component Creation and Integration</h2>
            <p>
              Discover how to create and integrate reusable components within your 
              application. This feature includes detailed instructions on setting up 
              components for forms, modals, and tables, and integrating them with 
              backend APIs for seamless data management and interaction.
            </p>
          </div>
          <div class="info-card">
            <h2>Feature Three: Common Functionalities</h2>
            <p>
              Explore the implementation of common functionalities such as pagination, 
              spinners, and toaster services. Our project provides built-in services 
              for displaying spinners during data fetches, paginating data sets for 
              better user experience, and showing toast notifications for various 
              user actions.
            </p>
          </div>
        </div>
      </div>
    </section>
    <Sidebar v-if="isAuthenticated" />
    <router-view v-else />
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Sidebar,
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.auth.loggedIn;
    },
  },
  methods: {
    navigateToLogin() {
      this.$router.push('/login');
    },
    navigateToSignUp() {
      this.$router.push('/register');
    },
  },
};
</script>

<style scoped>
.section {
  padding-top: 4rem;
  text-align: center;
}

.welcome-message {
  margin-bottom: 2rem;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #369970;
}

.info-sections {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.info-card {
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 2rem;
  width: 350px;
  height: 350px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s, box-shadow 0.3s;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.info-card h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-card p {
  font-size: 1rem;
  color: #666;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
}
</style>


