  <template>
    <div>
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
                  <v-btn @click="moveSearchPage()" :color="color">
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
                    <v-btn @click="selectReason()" :color="color"> 入力 </v-btn>
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

            <v-card-title>印象に残った部分</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="9">
                  <v-combobox
                    outlined
                    dense
                    :items="impressionItems"
                    v-model="selectedImpression"
                    class="make-report-element ml-5"
                  ></v-combobox>
                </v-col>
                <v-col cols="3">
                  <div>
                    <v-btn @click="selectImpression()" :color="color"> 入力 </v-btn>
                  </div>
                </v-col>
              </v-row>
              <v-textarea
                v-model="impression"
                rows="4"
                placeholder="印象に残った部分"
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
                    <v-btn @click="selectLearning()" :color="color"> 入力 </v-btn>
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
            <diz>
              <v-btn @click="makeBookReport(index)" class="mt-5 ml-5" :color="color">
                テンプレート作成
              </v-btn>
            </diz>
          </v-form>
        </v-container>
    </div>
  </template>
  <script >

  // 本を選んだ理由
  const EASY_TO_READ = "私が、この本を選んだ理由は、読みやすそうだと感じたからです。私は普段本を読むことが少なく、読書感想文の課題が出たとき憂鬱になりました。しかし、この本のタイトルやあらすじを見て、この本なら、本を読む習慣のない私でも読むことが出来そうだと感じ選びました。"
  const AT_HOME = '私は家族ととても仲が良く、一緒に出かけたりなどします。この本は家の本棚で見つけた本でタイトルが目につきました。家族がどんな本が好きなのか気になりこの本を読み始めました。'
  const RECOMMENDED_BY_FRIEND = '私には本が好きな友人がいます。この本はその友人のお気に入りの本で、'

  // 印象に残った部分
  const HAPPY = "私がこの本で印象に残ったシーンは～のシーンです。私はこのシーンで心が軽くなり、思わず走り出したくなるような気分になりました。読んでいるうちに夢中になっていき、気が付いたら食事をとるのも忘れて読み続けてしまいました。"
  const SAD = '私がこの本で印象に残ったシーンは～のシーンです。読んでいて胸が締め付けられるような気持になりました。ページをめくるのも辛かったですが何とか読み進めました。'
  const ANGER = '私がこの本で印象に残ったシーンは～のシーンです。私は強い憤りを感じ、つい本を持つ手に力が入ってしまいました。本を読み終わってもなかなか怒りの感情が消えず、常にこの本の内容が頭から離れませんでした。'
  const SURPRISE = '私がこの本で印象に残ったシーンは～のシーンです。私はこのシーンを読んだとき頭が呆然としました。本を読んでいてここまでの衝撃を受けたことは初めてで、しばらくの間何も考えられず止まってしまいました。'

  // 学んだこと
  const IMPORTANCE_OF_TEAMWORK = "この本を読んで私はチームワークの大切さを学びました。これからは自分一人で何とかしすぎることなく適切に周りと協力していこうと思いました。"
  const MULTIPLE_PERSPECTIVES = "この本を読んで私は多角的な視点で見るこの大切さを学びました。これからは一度立ち止まり違う視点から物事を見ていこうと思いました。"


  export default {
    data() {
      return {
        temp: false,
        plot: true,
        text: null,
        title: this.$route.query.title,
        synopsis: this.$route.query.description,
        image: this.$route.query.image,
        reason: null,
        impression:null,
        learning:null,
        selectedReason: null,
        selectedImpression: null,
        selectedLearning:null,
        color: 'orange lighten-2',
        reasonItems:['読みやすそうだった', '家にあった', '友人の紹介'],
        impressionItems:["楽しい","悲しい","怒り","驚き"],
        learningItems:["チームワークの大切さ","多角的な視点でみること"]
      }
    },
    methods: {
      makeBookReport() {
        this.$router.push({
          path: `/write` ,
          query: {
            title:this.title,
            synopsis:this.synopsis,
            reason: this.reason,
            impression:this.impression,
            learning:this.learning,
            image:this.image
          },
        });
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
      selectImpression() {
        switch (this.selectedImpression) {
          case '楽しい':
            this.impression = HAPPY
            break

          case '悲しい':
            this.impression = SAD
            break

          case '怒り':
            this.impression = ANGER
            break
          
            case '驚き':
            this.impression = SURPRISE
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

