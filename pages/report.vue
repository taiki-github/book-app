<template>
  <div>
    <div v-show="plot">
      <v-container>
        <v-card class="w-25">
        <v-form>
            <v-row>
              <v-card-title>タイトル</v-card-title>
              <v-btn @click="moveSearchPage()" > 本を選ぶ </v-btn>
            </v-row>
            <div>{{ $route.query.title }}</div>
            <v-card-title>あらすじ</v-card-title>
            <v-textarea
              v-model="synopsis"
              rows="4"
              placeholder="あらすじ"
              class="w-25"
            ></v-textarea>
            <v-card-title>この本を選んだ理由</v-card-title>
            <v-row>
              <v-btn @click="selectReason(EASY_TO_READ)" > 読みやすそうだった </v-btn>
              <v-btn @click="selectReason(AT_HOME)" > 家にあったから </v-btn>
              <v-btn @click="selectReason(RECOMMENDED_BY_FRIEND)" > 人の紹介 </v-btn>
            </v-row>
            <v-textarea
              v-model="reason"
              rows="4"
              placeholder="本を選んだ理由"
            ></v-textarea>
            <v-card-title>この本を読んで得たこと</v-card-title>
            <v-textarea
              rows="4"
              placeholder="この本を読んで得たこと"
            ></v-textarea>
          </v-form>
        </v-card>
      </v-container>
    </div>
    <v-btn @click="makeBookReport(index)" class="mt-5"> テンプレート作成 </v-btn>
    <div v-show="temp">
      <div>「{{ $route.query.title }}」を読んで</div>
      <div>{{this.reason}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      EASY_TO_READ:"読みやすそう",
      AT_HOME:"家にあったから",
      RECOMMENDED_BY_FRIEND:"友人に紹介してもらった",
      temp:false,
      plot:true,
      synopsis: this.$route.query.description,
      reason:null
    }
  },
  methods:{
    makeBookReport(){
      this.temp = true
      this.plot = false
    },
    selectReason(reason){
      this.reason = reason
    },
    moveSearchPage(){
      this.$router.push({
        path: `book/search` ,
      });
    }
  }
}
</script>

<style>
</style>