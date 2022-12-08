
<template>
  <div>
    <div class="pc">
      <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
    class="mt-5 mx-3"

  >
    <v-carousel-item
    v-for="(memo, index) in memos" :key="index"
    >
      <v-sheet
        height="100%"
        color="orange lighten-2"

      >
      <v-row>
              <v-col cols="3">
                <v-img :src="memo.image"></v-img>
              </v-col>
              <v-col cols="9">
                <v-card-title>{{ memo.title }}</v-card-title>
                <v-row class="mt-3 mb-3">
                  <div>
                    <v-btn color="success" @click="viewBookMemo(index)"> 編集</v-btn>
                    <v-btn  @click="selectReport(index)"> 投稿</v-btn>
                  </div>
                </v-row>
              </v-col>
            </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
  </div>
    <div class="mobile">
      <v-row>
          <v-card v-for="(memo, index) in memos" :key="index" class="mt-5 mx-2">
            <v-row>
              <v-col cols="3">
                <v-img :src="memo.image"></v-img>
              </v-col>
              <v-col cols="9">
                <v-card-title>{{ memo.title }}</v-card-title>
                <v-row class="mt-3 mb-3">
                  <div>
                    <v-btn color="success" @click="viewBookMemo(index)"> 編集</v-btn>
                    <v-btn color="primary" @click="selectReport(index)"> 投稿</v-btn>
                  </div>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
      </v-row>
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from 'firebase/firestore'
export default {
  data() {
    return {
      user: this.$store.state.auth.email,
      memos: [],
      colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
      color: 'brown',

    }
  },
  async created() {
    try {
      const db = getFirestore(this.$firebase)
      const memoBooks = await query(
        collection(db, 'memoBooks'),
        where('user', '==', this.user)
      )
      const querySnapshot = await getDocs(memoBooks)
      querySnapshot.forEach((doc) => {
        this.memos.push(doc.data())
      })
      this.memos.reverse()
    } catch (e) {
      console.error('error:', e)
    }
  },
  methods: {
    viewBookMemo(index) {
      this.$router.push({
        path: `./edit/` + this.memos[index].memoId,
        query: {
          user: this.user,
          memoId:this.memos[index].memoId,
          title: this.memos[index].title,
          image: this.memos[index].image,
          synopsis: this.memos[index].synopsis,
          reason: this.memos[index].reason,
          impression: this.memos[index].impression,
          learning: this.memos[index].learning,
          underTitleFieldList: this.memos[index].underTitleFieldList,
          underSynopsisFieldList: this.memos[index].underSynopsisFieldList,
          underReasonFieldList: this.memos[index].underReasonFieldList,
          underImpressionFieldList: this.memos[index].underImpressionFieldList,
          underLearnFieldList: this.memos[index].underLearnFieldList,
        },
      })
    },
    selectReport(index){
      this.$router.push({
        path: `post` ,
        query: {
          user: this.user,
          memoId:this.memos[index].memoId,
          title: this.memos[index].title,
          image: this.memos[index].image,
          synopsis: this.memos[index].synopsis,
          reason: this.memos[index].reason,
          impression: this.memos[index].impression,
          learning: this.memos[index].learning,
          underTitleFieldList: this.memos[index].underTitleFieldList,
          underSynopsisFieldList: this.memos[index].underSynopsisFieldList,
          underReasonFieldList: this.memos[index].underReasonFieldList,
          underImpressionFieldList: this.memos[index].underImpressionFieldList,
          underLearnFieldList: this.memos[index].underLearnFieldList,          },
      });
    }
  },
}
</script>

<style>
</style> 
