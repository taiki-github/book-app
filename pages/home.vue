<template>
  <div>
    <!-- timtLineのデザイン変更 -->
    <v-container class="pc">
      <v-timeline>
        <v-timeline-item
          v-for="(post, index) in posts"
          :key="index"
          fill-dot
          :color="color"
        >
          <template v-slot:opposite>
            <span  class="headline font-weight-bold postLabel">
              投稿者：{{post.userName}}
            </span>
          </template>
          <v-card dark :color="color" elevation="24">
            <v-row>
              <v-col cols="9">
                <v-card-title class="text-h6">
                  {{ post.title }}
                </v-card-title>
              </v-col>
              <v-col cols="3">
                <v-img :src="post.image"></v-img>
              </v-col>
            </v-row>
            <v-card-text class="white text--primary">
              <v-btn
                @click="readReport(index)"
                :color="color"
                outlined
                class="mt-5 mx-0"
                >見る</v-btn
              >
            </v-card-text>
            <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
        icon
          @click="post.show = !post.show"
        >
          <v-icon>{{ post.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>
            <v-expand-transition>
              <div v-show="post.show">
          <v-card-text>
            <div>{{ post.comment }}</div>

          </v-card-text>
        </div>
        
      </v-expand-transition>

          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-container>
    <v-container class="mobile">
      <v-timeline>
        <v-timeline-item
          v-for="(post, index) in posts"
          :key="index"
          fill-dot
          :color="color"
        >
          <v-card dark :color="color">
            <v-card-title class="text-h6">
              {{ post.title }}
            </v-card-title>
            <!-- <v-img :src="post.image"></v-img> -->
            <v-card-text class="white text--primary">
              <v-btn
                @click="readReport(index)"
                :color="color"
                outlined
                class="mt-5 mx-0"
                >見る</v-btn
              >
            </v-card-text>
            <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
        icon
          @click="post.show = !post.show"
        >
          <v-icon>{{ post.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>
            <v-expand-transition>
              <div v-show="post.show">
          <v-card-text>
            <div>{{ post.comment }}</div>

          </v-card-text>
        </div>
        
      </v-expand-transition>

          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-container>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from 'firebase/firestore'
export default {
  data() {
    return {
      text: '',
      posts: [],
      color: 'orange lighten-2',
    }
  },
  async created() {
    try {
      const db = getFirestore(this.$firebase)
      const querySnapshot = await getDocs(collection(db, 'posts'))
      querySnapshot.forEach((doc) => {
        this.posts.push(doc.data())
      })
      this.posts.reverse();
    } catch (e) {
      console.error('error:', e)
    }
  },
  methods: {
    readReport(index) {
      this.$router.push({
        path: `read`,
        query: {
          user: this.user,
          postId: this.posts[index].postId,
          title: this.posts[index].title,
          image: this.posts[index].image,
          synopsis: this.posts[index].synopsis,
          reason: this.posts[index].reason,
          impression: this.posts[index].impression,
          learning: this.posts[index].learning,
          underTitleFieldList: this.posts[index].underTitleFieldList,
          underSynopsisFieldList: this.posts[index].underSynopsisFieldList,
          underReasonFieldList: this.posts[index].underReasonFieldList,
          underImpressionFieldList: this.posts[index].underImpressionFieldList,
          underLearnFieldList: this.posts[index].underLearnFieldList,
        },
      })
    },
  },
}
</script>

<style>
 .postLabel{
  color: orange;
 }
</style>
