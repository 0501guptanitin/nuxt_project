<template>
  <div class="books">
    <h2 class="title">Books</h2>
    <hr>
    <div class="addBooksButton">
      <button @click="openAddBookForm">Add Book</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Book Name</th>
          <th>Author Name</th>
          <th>Published On</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.bookName }}</td>
          <td>{{ book.authorName }}</td>
          <td>{{ formatDate(book.publishedOn) }}</td>
          <td>
            <button @click="openEditBookForm(book)">Edit</button>
            <button @click="openDeleteConfirmation(book)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination-view"> <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      :showPerPageOptions="[1, 5, 10, 20, 50]"
      :showPerPage="limit"
      :total="totalBooks"
      @page-change="fetchBooks"
      @show-per-page-change="onLimitChange"
    /></div>

    <BookFormModal
      :show="showBookForm"
      :isEditing="isEditing"
      :book="currentBook"
      @close="closeBookForm"
      @submit="submitBookForm"
    />

    <ConfirmationDialog
      :show="showConfirmationDialog"
      :message="`Are you sure you want to delete the book '${bookNameToDelete}'?`"
      @confirm="confirmDelete"
      @close="closeDeleteConfirmation"
    />
  </div>
</template>

<script>
import Pagination from '@/components/shared/pagination.vue';
import BookFormModal from '@/components/BookFormModal.vue';
import ConfirmationDialog from '@/components/shared/ConfirmationDialog.vue';
import ToasterService from '@/services/ToasterService';
import SpinnerService from '@/services/SpinnerService';

export default {
  name: 'Books',
  components: {
    Pagination,
    BookFormModal,
    ConfirmationDialog
  },
  data() {
    return {
      books: [],
      showBookForm: false,
      isEditing: false,
      currentBook: {
        id: null,
        bookName: '',
        authorName: '',
        publishedOn: ''
      },
      showConfirmationDialog: false,
      bookIdToDelete: null,
      bookNameToDelete: '',
      currentPage: 1,
      totalPages: 1,
      limit: 5,
      totalBooks: 0,
    };
  },
  methods: {
    async fetchBooks(page = 1) {
      SpinnerService.show(); // Show the spinner
      try {
        const response = await this.$axios.get('/books', {
          params: {
            page: page,
            limit: this.limit,
          },
        });
        this.books = response.data.books;
        this.currentPage = response.data.pagination.currentPage;
        this.totalPages = response.data.pagination.totalPages;
        this.totalBooks = response.data.pagination.totalItems;
        ToasterService.success('Fetched the Books Successfully');
      } catch (error) {
        console.error('Error fetching books:', error);
        ToasterService.error('Error fetching books');
      } finally {
        SpinnerService.hide(); // Hide the spinner
      }
    },
    openAddBookForm() {
      this.isEditing = false;
      this.currentBook = {
        id: null,
        bookName: '',
        authorName: '',
        publishedOn: ''
      };
      this.showBookForm = true;
    },
    openEditBookForm(book) {
      this.isEditing = true;
      this.currentBook = { 
        ...book, 
        publishedOn: this.formatDateForInput(book.publishedOn) // Format the date for the input field
      };
      this.showBookForm = true;
    },
    closeBookForm() {
      this.showBookForm = false;
    },
    submitBookForm(book) {
      if (this.isEditing) {
        this.updateBook(book);
      } else {
        this.addBook(book);
      }
    },
    async addBook(book) {
      SpinnerService.show(); // Show the spinner
      try {
        await this.$axios.post('/books', book);
        this.fetchBooks(this.currentPage);
        this.closeBookForm();
        ToasterService.success('Book added successfully');
      } catch (error) {
        console.error('Error adding book:', error);
        ToasterService.error('Error adding book');
      } finally {
        SpinnerService.hide(); // Hide the spinner
      }
    },
    async updateBook(book) {
      SpinnerService.show(); // Show the spinner
      try {
        await this.$axios.put(`/books/${book.id}`, book);
        this.fetchBooks(this.currentPage);
        this.closeBookForm();
        ToasterService.success('Book updated successfully');
      } catch (error) {
        console.error('Error updating book:', error);
        ToasterService.error('Error updating book');
      } finally {
        SpinnerService.hide(); // Hide the spinner
      }
    },
    async deleteBook(bookId) {
      SpinnerService.show(); // Show the spinner
      try {
        await this.$axios.delete(`/books/${bookId}`);
        this.fetchBooks(this.currentPage);
        ToasterService.success('Book deleted successfully');
      } catch (error) {
        console.error('Error deleting book:', error);
        ToasterService.error('Error deleting book');
      } finally {
        SpinnerService.hide(); // Hide the spinner
      }
    },
    openDeleteConfirmation(book) {
      this.bookIdToDelete = book.id;
      this.bookNameToDelete = book.bookName;
      this.showConfirmationDialog = true;
    },
    closeDeleteConfirmation() {
      this.showConfirmationDialog = false;
      this.bookIdToDelete = null;
      this.bookNameToDelete = '';
    },
    confirmDelete() {
      if (this.bookIdToDelete !== null) {
        this.deleteBook(this.bookIdToDelete);
        this.closeDeleteConfirmation();
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    },
    formatDateForInput(dateString) {
      return dateString.split('T')[0];
    },
    onLimitChange(limit) {
      this.currentPage = 1;
      this.limit = limit;
      this.fetchBooks(this.currentPage);
    },
  },
  mounted() {
    this.fetchBooks();
  }
};
</script>

<style scoped>
.books {
  margin-left: 220px; /* Space for the sidebar */
  padding: 1rem;
}
.addBooksButton {
  display: flex;
  justify-content: flex-end;
  margin-right: 4px;
}
.addBooksButton button {
  text-align: center;
  padding: 5px;
  background-color: black;
  color: white;
  font-weight: 600;
  margin-bottom: 20px;
  border-radius: 5px;
  cursor: pointer;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 0.5rem;
}
th {
  background-color: #f2f2f2;
}
.pagination-view{
  margin-top: 40px; display: flex; justify-content: flex-end; margin-right: 5px;
}
</style>
