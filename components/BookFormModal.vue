<template>
    <div class="modal" v-if="show">
      <div class="modal-content">
        <span class="close" @click="$emit('close')">&times;</span>
        <h2 class="title">{{ isEditing ? 'Edit Book' : 'Add Book' }}</h2>
        <hr>
        <form @submit.prevent="submitForm">
          <label for="bookName">Book Name:</label>
          <input type="text" v-model="book.bookName" @input="validateField('bookName')" required />
          <span v-if="errors.bookName">Book's Name is Required</span>
          
          <label for="authorName">Author Name:</label>
          <input type="text" v-model="book.authorName" @input="validateField('authorName')" required />
          <span v-if="errors.authorName">Author's Name is Required</span>
          
          <label for="publishedOn">Published On:</label>
          <input type="date" v-model="book.publishedOn" @input="validateField('publishedOn')" required />
          <span v-if="errors.publishedOn">Published On Date is Required</span>
          
         <div style="justify-content:space-between">
            <button type="submit">{{ isEditing ? 'Update' : 'Add' }} Book</button>
            <button type="close" @click="$emit('close')">Cancel</button>
         </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BookFormModal',
    props: {
      show: Boolean,
      isEditing: Boolean,
      book: Object
    },
    data() {
      return {
        errors: {}
      };
    },
    methods: {
      validateField(field) {
        if (!this.book[field]) {
          this.errors[field] = `${field} is required`;
        } else {
          this.errors[field] = '';
        }
      },
      submitForm() {
        const fields = ['bookName', 'authorName', 'publishedOn'];
        let valid = true;
  
        fields.forEach(field => {
          if (!this.book[field]) {
            this.errors[field] = `${field} is required`;
            valid = false;
          } else {
            this.errors[field] = '';
          }
        });
  
        if (valid) {
          this.$emit('submit', this.book);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    display: flex;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal-content {
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    border-radius: 8px;
    width: 400px;
    position: relative;
  }
  .close {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 24px;
    cursor: pointer;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  label {
    margin-bottom: 5px;
  }
  input[type="text"], input[type="date"] {
    margin-bottom: 15px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button[type="submit"] {
    background-color: #3498db;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button[type="submit"]:hover {
    background-color: #2980b9;
  }
  span {
    color: red;
    font-size: 0.9em;
  }
  </style>
  