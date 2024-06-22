<template>
    <aside class="sidebar">
      <ul>
        <li>
          <router-link to="/users">
            <span class="icon">👤</span> Users
          </router-link>
        </li>
        <li>
          <router-link to="/books">
            <span class="icon">📚</span> Books
          </router-link>
        </li>
      </ul>
    </aside>
  </template>
  
  <script>
  export default {
    name: 'Sidebar'
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 200px;
    background-color: #f8f9fa;
    padding: 1rem;
    position: fixed;
    height: 100%;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    cursor: pointer;
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
  }
  .icon {
    margin-right: 0.5rem;
  }
  </style>
  