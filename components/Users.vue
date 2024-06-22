<template>
    <section class="section">
      <div class="container">
        <h2 class="title">Users</h2>
        <hr>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
            </tr>
          </tbody>
        </table>
        <div class="pagination-view"> 
          <Pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          :showPerPageOptions="[1, 5, 10, 20, 50]"
          :showPerPage="limit"
          :total="totalUsers"
          @page-change="fetchUsers"
          @show-per-page-change="onLimitChange"
        />
        </div>
       
      </div>
    </section>
  </template>
  
  <script>
  import Pagination from '@/components/shared/pagination.vue'; // Update the path accordingly
  import ToasterService from '@/services/ToasterService';
  import SpinnerService from '@/services/SpinnerService';
  

  export default {
    components: {
      Pagination,
    },
    data() {
      return {
        users: [],
        currentPage: 1,
        totalPages: 1,
        limit: 5,
        totalUsers: 0,
      };
    },
    async mounted() {
      await this.fetchUsers(this.currentPage);
    },
    methods: {
        async fetchUsers(page) {
          SpinnerService.show();
  try {
    const response = await this.$axios.get('/users', {
      params: {
        page: page,
        limit: this.limit,
      },
    });
    this.users = response.data.users;
    this.currentPage = response.data.pagination.currentPage;
    this.totalPages = response.data.pagination.totalPages;
    this.totalUsers = response.data.pagination.totalItems;
    ToasterService.success('Fetched the Users Successfully');
    SpinnerService.hide();
  } catch (error) {
    SpinnerService.hide();
    console.error('Error fetching users:', error);
    // Handle error gracefully, show an error message or log it
  }
},
      onLimitChange(limit) {
        this.currentPage = 1;
        this.limit = limit;
        this.fetchUsers(this.currentPage);
      },
    },
  };
  </script>
  
  <style scoped>
  .section {
    margin-left: 220px; /* Space for the sidebar */
    padding: 1rem;
  }
  th, td {
  border: 1px solid #ddd;
  padding: 0.5rem;
}
th {
  background-color: #f2f2f2;
}
table {
  width: 90%;
  border-collapse: collapse;
}
.pagination-view{
  margin-top: 40px; display: flex; justify-content: flex-end; margin-right: 5px; width: 90%;
}
  </style>
  