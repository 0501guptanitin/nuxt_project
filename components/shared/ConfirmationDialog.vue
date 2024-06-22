<template>
    <div class="modal1" v-if="show">
      <div class="modal-content1">
        <p>{{ message }}</p>
        <div class="actions1">
          <button @click="confirmAction">Yes</button>
          <button @click="$emit('close')">No</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>

import '@/components/shared/ConfirmationDialog.css'

  export default {
    name: 'ConfirmationDialog',
    props: {
      show: Boolean,
      message: {
        type: String,
        default: 'Are you sure you want to proceed?'
      }
    },
    methods: {
      confirmAction() {
        this.$emit('confirm');
      }
    }
  };
  </script>
  
  <!-- <style scoped>
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
    width: 300px;
    position: relative;
    text-align: center;
  }
  .actions {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:first-child {
    background-color: #3498db;
    color: white;
  }
  button:last-child {
    background-color: #e74c3c;
    color: white;
  }
  button:hover {
    opacity: 0.9;
  }
  </style> -->
  