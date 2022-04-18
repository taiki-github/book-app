<template>
  <div>
      <NuxtChild
      @add-book-list="addBook"
      @update-book-info="updateBook"
      @delete-local-storage="removeBook"
      :books="books"
      />
  </div>
</template>

<script>
const STORAGE_KEY = 'books'
// これはグローバル変数、booksは配列の名前
export default {
  data(){
    return {
      books: [],
      value:0
    }
  },
  created() {
    if (localStorage.getItem(STORAGE_KEY)) {
      try {
        this.books = JSON.parse(localStorage.getItem(STORAGE_KEY));
      } catch(e) {
        // localStorage.removeItem(STORAGE_KEY);
      }
    }
  },
  methods: {
    addBook(e) {
      this.books.push({
        id: this.books.length,
        title: e.title,
        authors:e.authors,
        image: e.image,
        description: e.description,
         memo:"" 
      });
      this.saveBooks();
      this.goToEditPage(this.books.slice(-1)[0].id)
    },
    removeBook(key) {
      for(let i=key;i<this.books.length;i++){
        this.books[i].id=this.books[i].id-1
      }
        this.books.splice(key,1);
      this.saveBooks();
    },
    
    saveBooks() {
      const parsed = JSON.stringify(this.books);
      localStorage.setItem(STORAGE_KEY, parsed);
    },
    updateBook(){
         this.saveBooks() 
      },
    
    goToEditPage(id){
      this.$router.push(`/book/edit/${id}`)
    },
  }
}
</script>

<style>

</style>