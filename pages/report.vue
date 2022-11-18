<template>
  <div>
    <v-btn @click="outputPDF()"></v-btn>
    <div v-show="plot">
      <v-container>
        <v-form class="make-report-element">
          <v-card-title>タイトル</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="9">
                <v-text-field
                  v-model="title"
                  class="make-report-element"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-btn @click="moveSearchPage()" color="success">
                  本を選ぶ
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-title>あらすじ</v-card-title>
          <v-card-text>
            <v-textarea
              v-model="synopsis"
              rows="4"
              placeholder="あらすじ"
              class="make-report-element"
            ></v-textarea>
          </v-card-text>
          <v-card-title>この本を選んだ理由</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="9">
                <v-combobox
                  outlined
                  dense
                  :items="reasonItems"
                  v-model="selectedReason"
                  class="make-report-element ml-5"
                ></v-combobox>
              </v-col>
              <v-col cols="3">
                <div>
                  <v-btn @click="selectReason()"> 入力 </v-btn>
                </div>
              </v-col>
            </v-row>
            <v-textarea
              v-model="reason"
              rows="4"
              placeholder="本を選んだ理由"
              class="make-report-element"
            ></v-textarea>
          </v-card-text>
          <v-card-title>この本を読んで学んだこと</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="9">
                <v-combobox
                  outlined
                  dense
                  :items="learningItems"
                  v-model="selectedLearning"
                  class="make-report-element ml-5"
                ></v-combobox>
              </v-col>
              <v-col cols="3">
                <div>
                  <v-btn @click="selectLearning()"> 入力 </v-btn>
                </div>
              </v-col>
            </v-row>
            <v-textarea
              rows="4"
              placeholder="この本を読んで学んだこと"
              class="make-report-element"
              v-model="learning"
            ></v-textarea>
          </v-card-text>
        </v-form>
      </v-container>
    </div>
    <v-btn @click="makeBookReport(index)" class="mt-5">
      テンプレート作成
    </v-btn>
    <div v-show="temp">
      <div>「{{ $route.query.title }}」を読んで</div>
      <div>{{this.synopsis}}</div>
      <div>{{ this.reason }}</div>
      <div>{{this.learning}}</div>
    </div>
  </div>
</template>
<script src='/js/jspdf.min.js' type='text/javascript'></script>
<script >
import jsPDF from 'jspdf'

// 本を選んだ理由
const EASY_TO_READ = "   私が、この本を選んだ理由は、読みやすそうだと感じたからです。私は普段本を読むことが少なく、読書感想文の課題が出たとき憂鬱になりました。しかし、この本のタイトルやあらすじを見て、この本なら、本を読む習慣のない私でも読むことが出来そうだと感じ選びました。"
const AT_HOME = '  家にあったから'
const RECOMMENDED_BY_FRIEND = '  友人に紹介してもらった'

// 学んだこと
const IMPORTANCE_OF_TEAMWORK = "   この本を読んで私はチームワークの大切さを学びました。これからは人と協力していこうと思いました。"
const MULTIPLE_PERSPECTIVES = "   この本を読んで私は多角的な視点で見るこの大切さを学びました。これからは一度立ち止まり違う視点から物事を見ていこうと思いました。"


export default {
  data() {
    return {
      temp: false,
      plot: true,
      title: this.$route.query.title,
      synopsis: this.$route.query.description,
      reason: null,
      learning:null,
      selectedReason: null,
      selectedLearning:null,
      reasonItems:['読みやすそうだった', '家にあった', '友人の紹介'],
      learningItems:["チームワークの大切さ","多角的な視点でみること"]
    }
  },
  methods: {
    makeBookReport() {
      this.temp = true
      this.plot = false
    },
    selectReason() {
      switch (this.selectedReason) {
        case '読みやすそうだった':
          this.reason = EASY_TO_READ
          break

        case '家にあった':
          this.reason = AT_HOME
          break

        case '友人の紹介':
          this.reason = RECOMMENDED_BY_FRIEND
          break
      }
    },
    selectLearning(){
      switch (this.selectedLearning) {
        case 'チームワークの大切さ':
          this.learning = IMPORTANCE_OF_TEAMWORK
          break

        case '多角的な視点でみること':
          this.learning = MULTIPLE_PERSPECTIVES
          break

      }
    },
    moveSearchPage() {
      this.$router.push({
        path: `book/search`,
      })
    },
   
  },
}
</script>

<style>
@media screen and (min-width: 481px) {
  .make-report-element {
    width: 80%;
    margin: auto;
  }
}
</style>