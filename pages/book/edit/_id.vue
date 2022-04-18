<template>
  <div>
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-row>
            <v-col cols="4">
              <v-img :src="book.image"></v-img>
            </v-col>
            <v-col cols="8">
              <v-card-title>{{ book.title }}</v-card-title>
              {{book. authors}}
             
              メモ: <v-textarea
               v-model="book.memo"
               >
               {{ book.memo }}</v-textarea>
              <v-card-actions>
                <v-btn 
                  color="info"
                  @click="updateBookInfo()"
                  to="/book"
                  >保存する</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next){
    next( vm => {
      vm.book = vm.books[vm.$route.params.id]
    })
  },
  props: {
    books: {
      type: Array,
      default: () => {}
    }
  },
  data(){
    return {
      book: '',
      date: '',
      menu: false,
    }
  },
  methods:{
   updateBookInfo(){
          this.$emit("update-book-info")
          console.log("aaa")
   }
  }
}
</script>

<style>
</style>