
  <template>
  <div>
    <input type="text" v-model="keyword" />
    <button @click="search(keyword)">検索するzikkenn</button>
  </div>
</template>
  
  
    <script>
export default {
     data(){
        return {
          keyword:'',
          searchResults:[]
        }
      },
      methods:{
        async search(keyword){
          this.searchResults = []
        // クエリーストリングを作成
        const baseUrl = 'https://www.googleapis.com/books/v1/volumes?'
          const params = {
            q: `intitle:${keyword}`,
            maxResults:40
          }
          const queryParams = new URLSearchParams(params)
          console.log(baseUrl + queryParams)

        // fetchでJSON取得、JSONは文字列
        const response = await fetch(baseUrl + queryParams)
        .then( response => response.json())
        console.log(response.items)
        // fetchはhtppリクエスト的なことが出きる
        for(const book of response.items){
          const title = book.volumeInfo.title
          const img = book.volumeInfo.imageLinks
          // const description = book.volumeInfo.description
          this.searchResults.push({
            title,
            img,
          })
        }
          console.log(this.searchResults[0])
      }
      }
}
</script> 