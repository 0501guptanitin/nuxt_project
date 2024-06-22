<template>
    <div class="pagination-row">
      <div>
        <label>Items per page: </label>
        <select v-model="showPerPage" @change="handleShowPerPageChange" class="form-select">
          <option v-for="option in showPerPageOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
      <span style="margin-right: 20px;">{{ paginationInfo }}</span>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link"  @click="handleButtonClick('‹')" :disabled="currentPage === 1">‹</a>
          </li>
          <li v-for="page in paginationRange" :key="page" :class="{ 'page-item': true, 'active': page === currentPage }">
            <a class="page-link"  @click="fetchPage(page)">{{ page }}</a>
          </li>
          <li class="page-item">
            <a class="page-link"  @click="handleButtonClick('›')" :disabled="currentPage === totalPages">›</a>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      },
      showPerPageOptions: {
        type: Array,
        required: true
      },
      showPerPage: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      }
    },
    computed: {
        paginationInfo() {
  console.log("Current Page:", this.currentPage);
  console.log("Show Per Page:", this.showPerPage);
  console.log("Total:", this.total);
  const startIndex = Math.min((this.currentPage - 1) * this.showPerPage + 1, this.total);
  const endIndex = Math.min(this.currentPage * this.showPerPage, this.total);
  console.log("Start Index:", startIndex);
  console.log("End Index:", endIndex);
  return `${startIndex} - ${endIndex} of ${this.total}`;
},
      paginationRange() {
        const range = [];
        for (let i = Math.max(1, this.currentPage - 2); i <= Math.min(this.currentPage + 2, this.totalPages); i++) {
          range.push(i);
        }
        return range;
      }
    },
    methods: {
      handleButtonClick(type) {
        if (type === "‹") {
          this.fetchPage(this.currentPage - 1);
        } else if (type === "›") {
          this.fetchPage(this.currentPage + 1);
        }
      },
      fetchPage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.$emit('page-change', page);
        }
      },
      handleShowPerPageChange(event) {
        const showPerPage = parseInt(event.target.value, 10);
        this.$emit('show-per-page-change', showPerPage);
      }
    }
  };
  </script>
  
  <style scoped>
  .pagination-row {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    padding: 0;
    /* margin-top: -23px !important; */
  }

  .pagination-row span{
    margin-left: 20px;
  }

  .pagination{
    list-style:none;
    display: flex;
  }

  
  .pagination .page-item {
    margin: 0;
  }
  
  .pagination .page-link {
    color: #007bff;
    text-decoration: none;
    padding: 0.5rem 0.75rem;
    border: 1px solid #dee2e6;
    margin: 0 2px;
  }
  
  .pagination .page-link:hover {
    background-color: #e9ecef;
  }
  
  .pagination .page-item.active .page-link {
    background-color: #007bff;
    color: #fff;
    border-color: #007bff;
  }
  
  .pagination .page-item.disabled .page-link {
    pointer-events: none;
    background-color: #f8f9fa;
    color: #6c757d;
    border-color: #dee2e6;
  }

  .pagination-select {
    /* display: flex; */
    justify-content: space-between;
    align-items: center;

  }

  </style>
  