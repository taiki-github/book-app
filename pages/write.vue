<template>
  <div>
    <v-container>
      <div>
        <v-text-field v-model="title"></v-text-field>
        <div v-for="(list, index) in underTitleFieldList" :key="index">
          <v-row>
            <v-textarea
              rows="2"
              class="ml-2"
              v-model="list.script"
              counter
            ></v-textarea>
            <v-btn
              x-small
              class="mt-5"
              color="error"
              @click="removeInput(underTitleFieldList, index)"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-btn
          x-small
          class="ml-5"
          plain
          @click="addInput(underTitleFieldList)"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-textarea v-model="synopsis" rows="3" counter> </v-textarea>
        <div v-for="(list, index) in underSynopsisFieldList" :key="index">
          <v-row>
            <v-textarea
              rows="2"
              class="ml-2"
              v-model="list.script"
              counter
            ></v-textarea>
            <v-btn
              x-small
              class="mt-5"
              color="error"
              @click="removeInput(underSynopsisFieldList, index)"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-btn
          x-small
          class="ml-5"
          plain
          @click="addInput(underSynopsisFieldList)"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
        <v-textarea v-model="reason" rows="3" counter> </v-textarea>
        <div v-for="(list, index) in underReasonFieldList" :key="index">
          <v-row>
            <v-textarea
              rows="2"
              class="ml-2"
              v-model="list.script"
              counter
            ></v-textarea>
            <v-btn
              small
              class="mt-5"
              color="error"
              @click="removeInput(underReasonFieldList, index)"
            >
              <v-icon dark>mdi-minus</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-btn
          x-small
          class="ml-5"
          plain
          @click="addInput(underReasonFieldList)"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>

        <v-textarea v-model="reason" rows="3" counter> </v-textarea>
        <div v-for="(list, index) in underImpressionFieldList" :key="index">
          <v-row>
            <v-textarea
              rows="2"
              class="ml-2"
              v-model="list.script"
              counter
            ></v-textarea>
            <v-btn
              small
              class="mt-5"
              color="error"
              @click="removeInput(underImpressionFieldList, index)"
            >
              <v-icon dark>mdi-minus</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-btn
          x-small
          class="ml-5"
          plain
          @click="addInput(underImpressionFieldList)"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>

        <v-textarea v-model="learning" rows="2" counter> </v-textarea>
        <div v-for="(list, index) in underLearnFieldList" :key="index">
          <v-row>
            <v-textarea
              rows="2"
              class="ml-2"
              v-model="list.script"
              counter
            ></v-textarea>
            <v-btn
              small
              class="mt-5"
              color="error"
              @click="removeInput(underLearnFieldList, index)"
            >
              <v-icon dark>mdi-minus</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-btn
          class="ml-5"
          x-small
          plain
          @click="addInput(underLearnFieldList)"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
        <div class="box mt-5">
          <div class="vertical sample">
            <div class="titleSpace">
              <span class="space"></span> <span class="space"></span
              ><span class="space"></span>
              {{ title }}
            </div>
            <div></div>
            <div v-for="(list, index) in underTitleFieldList" :key="index">
              <span class="space"></span>{{ list.script }}
            </div>
            <div><span class="space"></span> {{ synopsis }}</div>
            <div v-for="(list, index) in underSynopsisFieldList" :key="index">
              <span class="space"></span>{{ list.script }}
            </div>
            <div><span class="space"></span> {{ reason }}</div>
            <div v-for="(list, index) in underReasonFieldList" :key="index">
              <span class="space"></span>{{ list.script }}
            </div>
            <div><span class="space"></span> {{ impression }}</div>
            <div v-for="(list, index) in underImpressionFieldList" :key="index">
              <span class="space"></span>{{ list.script }}
            </div>
            <div><span class="space"></span> {{ learning }}</div>
            <div v-for="(list, index) in underLearnFieldList" :key="index">
              <span class="space"></span>{{ list.script }}
            </div>
          </div>
        </div>
        <v-btn @click="makeReport()">保存</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
export default {
  data() {
    return {
      user: this.$store.state.auth.email,
      memoId: 10000,
      title: '「' + this.$route.query.title + '」' + 'を読んで',
      synopsis: this.$route.query.synopsis + '',
      image: this.$route.query.image + '',
      reason: this.$route.query.reason + '',
      impression: this.$route.query.impression + '',
      learning: this.$route.query.learning + '',
      underTitleFieldList: [],
      underSynopsisFieldList: [],
      underReasonFieldList: [],
      underImpressionFieldList: [],
      underLearnFieldList: [],
    }
  },
  methods: {
    addInput(newTextField) {
      newTextField.push({ script: '' })
    },
    removeInput(deleteTextField, id) {
      deleteTextField.splice(id, 1)
    },
    async makeReport() {
      const db = getFirestore(this.$Firestore)
      const user = this.user
      const Id = await getDoc(doc(db, 'memoNumber', user))
      if (Id.data().number) {
        this.memoId = Id.data().number
      }
      await setDoc(doc(db, 'memoBooks', user + this.memoId), {
        user: this.user,
        memoId: this.memoId,
        image: this.image,
        title: this.title,
        synopsis: this.synopsis,
        reason: this.reason,
        impression: this.impression,
        learning: this.learning,
        underTitleFieldList: this.underTitleFieldList,
        underSynopsisFieldList: this.underSynopsisFieldList,
        underReasonFieldList: this.underReasonFieldList,
        underImpressionFieldList: this.underImpressionFieldList,
        underLearnFieldList: this.underLearnFieldList,
      })
      await setDoc(doc(db, 'memoNumber', user), {
        number: this.memoId + 1,
      })
      this.$router.push({
        path: `memoBooks`,
      })
    },
  },
}
</script>


<style>
.space {
  margin-top: 20px;
}
.titleSpace {
  margin-left: 20px;
}
</style>