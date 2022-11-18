<template>
  <div>
    <div class="postPage">
      <v-card class="postTextCard">
        <v-textarea
          v-model="text"
          rows="4"
          counter="300"
          placeholder="ここに投稿を入力"
          class="postTextArea"
        ></v-textarea>
        <v-btn @click="postReport()"> 投稿 </v-btn>
      </v-card>
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";
export default {
  data() {
    return {
      tasks: [],
      memo: "",
      user: this.$store.state.auth.email,
      dbNumber: 10000,
      userName:"",
      userName2:"",
      text:""

    };
  },

  methods: {
    async postReport() {
      try{
        const db = getFirestore(this.$Firestore);
        const user = this.user;
        const id = 1
        await setDoc(doc(db, "posts", user + id), {
            user:this.user,
            text:this.text
          });
        this.text = ""
      }catch(e){

      }
  }
}
}
</script>

<style>

</style>