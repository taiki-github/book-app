<template>
  <div>
    
      <v-col cols="6">
        <v-text-field v-model="keyword" label="タイトルで探す" />
        <v-btn  @click="search(keyword)"> 検索 </v-btn>
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="authorname" label="作者で探す" />
          <v-btn  @click="searchAuthor(authorname)"> 検索 </v-btn>
      </v-col>
  

    <div v-show="!isFound">検索結果がありません:{{this.keyword}}
      <br>別のキーワードを試してみてください

    </div>
    <v-row>
      <v-col
        v-for="(book, index) in searchResults"
        :key="index"
        cols="12"
        md="6"
      >
        <!-- keyとitemsが思っているのと逆。keyは必須 -->
        <v-card class="mt-5">
          <v-row>
            <v-col cols="4">
              <v-img :src="book.image"></v-img>
            </v-col>
            <v-col cols="8">
              <v-card-title>{{ book.title }}</v-card-title>
              <v-card-text>{{book.authors}}</v-card-text>
              <v-card-text>{{ book.description }}</v-card-text>
              <v-btn 
              fab dark color="indigo"
              @click="addBookList(index)"
              >

                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
             <v-btn 
              @click="makeReport(index)"
              class="ml-3"
              >
              感想文作成
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
 
export default {
  data() {
    return {
      keyword: '',
      authorname:"",
      searchResults: [],
      isFound: true,
    }
  },
  methods: {
      addBookList(index){
          this.$emit("add-book-list",this.searchResults[index])
      },
    async search(keyword) {
      if (keyword) {
        try{
        this.isFound=true 
        this.searchResults = []
        // クエリーストリングを作成
        const baseUrl = 'https://www.googleapis.com/books/v1/volumes?'
        const params = {
          q: `title:${keyword}`,
          maxResults: 30,
        }
        const queryParams = new URLSearchParams(params)
        console.log(baseUrl + queryParams)

        // fetchでJSON取得、JSONは文字列
        const response = await fetch(baseUrl + queryParams).then((response) =>
          response.json()
        )
        console.log(response.items)
        // fetchはhtppリクエスト的なことが出きる
        for (const book of response.items) {
          const title = book.volumeInfo.title
          const authors = book.volumeInfo.authors
          const image = book.volumeInfo.imageLinks // eslint-disable-line
          const description = book.volumeInfo.description
          this.searchResults.push({
            title: title ? title : '', // eslint-disable-line
            authors:authors?authors:"",// eslint-disable-line
            image: image ? image.thumbnail : '',
            description: description ? description.slice(0, 100) : '',
          })
        }
        }catch{
          this.isFound=false
        }
      }
    },



    async searchAuthor(authorname) {
      if (authorname) {
        try{
        this.isFound=true 
        // this.authorname="" 
        this.searchResults = []
        // クエリーストリングを作成
        const baseUrl = 'https://www.googleapis.com/books/v1/volumes?'
        const params = {
          q: `authors:${authorname}`,
          maxResults: 30,
        }
        const queryParams = new URLSearchParams(params)
        console.log(baseUrl + queryParams)

        // fetchでJSON取得、JSONは文字列
        const response = await fetch(baseUrl + queryParams).then((response) =>
          response.json()
        )
        console.log(response.items)
        // fetchはhtppリクエスト的なことが出きる
         for (const book of response.items) {
          const title = book.volumeInfo.title
          const authors = book.volumeInfo.authors
          const image = book.volumeInfo.imageLinks // eslint-disable-line
          const description = book.volumeInfo.description
          this.searchResults.push({
            title: title ? title : '', // eslint-disable-line
            authors:authors?authors:"",// eslint-disable-line
            image: image ? image.thumbnail : '',
            description: description ? description.slice(0, 100) : '',
          })
        }
        }catch{
          this.isFound=false
        }
      }
    },
    makeReport(index){
      this.$router.push({
        path: `../report` ,
        query: {
          title: this.searchResults[index].title,
          description:this.searchResults[index].description
        },
      });
    }

  },
}
</script>

<style>
</style>