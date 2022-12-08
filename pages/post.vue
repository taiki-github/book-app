<template>
  <div>
    <div class="pc">
      <v-card class="mt-5" color="grey lighten-3">
        <v-row>
          <v-col cols="3">
            <v-img :src="image" ></v-img>
          </v-col>
          <v-col cols="9">
            <v-row>
              <v-card-title class="mt-3">{{ title }}</v-card-title>
            </v-row>
            <v-text-field
              v-model="text"
              placeholder="コメント"
              class="mt-5"
            ></v-text-field>
            <v-btn @click="moveReportPage()" class="mt-5" color="success">
              選択
            </v-btn>
            <v-btn @click="postReport()" class="mt-5" color="primary">
              投稿
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
        <v-card-title class="mt-5" color="red">過去の投稿</v-card-title>
        <v-spacer></v-spacer>
          <v-row>
            <v-col cols="6" v-for="(post, index) in posts" :key="index" class="mt-5">
              <v-card color="grey lighten-4">
                <v-row>
                  <v-col cols="3">
                    <v-img :src="post.image" ></v-img>
                  </v-col>
                  <v-col cols="9">
                    <v-card-title class="mt-3">{{ post.title }}</v-card-title>
                    <v-btn @click="deletePost(index)" color="error">削除</v-btn>
                  </v-col>
                </v-row>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="post.show = !post.show">
                    <v-icon>{{
                      post.show ? 'mdi-chevron-up' : 'mdi-chevron-down'
                    }}</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="post.show">
                    <v-divider></v-divider>
                    <v-card-text>
                      <div>{{ post.comment }}</div>
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
    </div>

    <div class="mobile">
      <v-card class="mt-5">
        <v-row>
          <v-col cols="3">
            <v-img :src="image"></v-img>
          </v-col>
          <v-col cols="9">
            <v-row>
              <v-card-title class="mt-3">{{ title }}</v-card-title>
            </v-row>

            <v-text-field
              v-model="text"
              placeholder="コメント"
              class="mt-5 mb-5"
            ></v-text-field>
            <v-btn @click="moveReportPage()" class="mt-5" color="success">
              選択
            </v-btn>
            <v-btn @click="postReport()" class="mt-5" color="primary">
              投稿
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
      <v-card-title class="mt-5">過去の投稿</v-card-title>
      <v-row>
        <v-card v-for="(post, index) in posts" :key="index" class="mt-5 mx-2">
          <v-row>
            <v-col cols="3">
              <v-img :src="post.image"></v-img>
            </v-col>
            <v-col cols="9">
              <v-card-title class="mt-3">{{ post.title }}</v-card-title>
              <v-btn @click="deletePost(index)" color="error">削除</v-btn>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="post.show = !post.show">
              <v-icon>{{
                post.show ? 'mdi-chevron-up' : 'mdi-chevron-down'
              }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="post.show">
              <v-divider></v-divider>

              <v-card-text>
                <div>{{ post.comment }}</div>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-row>
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
  deleteDoc,
} from 'firebase/firestore'
export default {
  data() {
    return {
      posts: [],
      memo: '',
      text: '',
      userName: this.$store.state.auth.userName,
      user: this.$store.state.auth.email,
      image: this.$route.query.image + '',
      postId: 10000,
      title: this.$route.query.title,
    }
  },
  async created() {
    try {
      const db = getFirestore(this.$firebase)
      const posts = await query(
        collection(db, 'posts'),
        where('user', '==', this.user)
      )
      const querySnapshot = await getDocs(posts)
      querySnapshot.forEach((doc) => {
        this.posts.push(doc.data())
      })
      this.posts.reverse()
    } catch (e) {
      console.error('error:', e)
    }
  },
  methods: {
    moveReportPage() {
      this.$router.push({
        path: `memoBooks`,
      })
    },
    async deletePost(index) {
      try {
        const db = getFirestore(this.$Firestore)
        await deleteDoc(doc(db, 'posts',this.posts[index].postId))
        this.$router.push('home')
      } catch (e) {
        console.error('error', e)
      }
    },
    async postReport() {
      try {
        if (this.title) {
          const db = getFirestore(this.$Firestore)
          const Id = await getDoc(doc(db, 'memoNumber', "postNumber"))
          if (Id.data().number) {
            this.postId = Id.data().number
          }
          console.log("aa");
          await setDoc(doc(db, 'posts', ""+this.postId), {
            user: this.user,
            userName: this.userName,
            postId: this.postId,
            show: false,
            title: this.$route.query.title,
            image: this.image,
            comment: this.text,
            synopsis: this.$route.query.synopsis + '',
            reason: this.$route.query.reason + '',
            impression: this.$route.query.impression + '',
            learning: this.$route.query.learning + '',
            underTitleFieldList: this.$route.query.underTitleFieldList,
            underSynopsisFieldList: this.$route.query.underSynopsisFieldList,
            underReasonFieldList: this.$route.query.underReasonFieldList,
            underImpressionFieldList:
              this.$route.query.underImpressionFieldList,
              underLearnFieldList: this.$route.query.underLearnFieldList,
            })
            await setDoc(doc(db, 'memoNumber', "postNumber"), {
              number: this.postId + 1,
            })

          this.$router.push({
            path: `home`,
          })
        }
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>

<style>
 .post-image{
  height: 50%;
 }
</style>