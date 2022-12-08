<template>
    <div>
      <v-container>
        <div>
          <v-text-field v-model="title"></v-text-field>
          <div v-for="member in underTitleFieldList" :key="member.id">
            <v-row>
              <v-textarea
                rows="2"
                class="ml-2"
                v-model="member.script"
                counter
              ></v-textarea>
              <v-btn
                x-small
                class="mt-5"
                color="error"
                @click="removeInput(underTitleFieldList, member.id)"
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
          <div v-for="member in underSynopsisFieldList" :key="member.id">
            <v-row>
              <v-textarea
                rows="2"
                class="ml-2"
                v-model="member.script"
                counter
              ></v-textarea>
              <v-btn
                x-small
                class="mt-5"
                color="error"
                @click="removeInput(underSynopsisFieldList, member.id)"
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
          <div v-for="member in underReasonFieldList" :key="member.id">
            <v-row>
              <v-textarea
                rows="2"
                class="ml-2"
                v-model="member.script"
                counter
              ></v-textarea>
              <v-btn
                small
                class="mt-5"
                color="error"
                @click="removeInput(underReasonFieldList, member.id)"
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


          <v-textarea v-model="impression" rows="3" counter> </v-textarea>
        <div v-for="member in underImpressionFieldList" :key="member.id">
          <v-row>
            <v-textarea
              rows="2"
              class="ml-2"
              v-model="member.script"
              counter
            ></v-textarea>
            <v-btn
              small
              class="mt-5"
              color="error"
              @click="removeInput(underImpressionFieldList, member.id)"
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
          <div v-for="member in underLearnFieldList" :key="member.id">
            <v-row>
              <v-textarea
                rows="2"
                class="ml-2"
                v-model="member.script"
                counter
              ></v-textarea>
              <v-btn
                small
                class="mt-5"
                color="error"
                @click="removeInput(underLearnFieldList, member.id)"
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
              <div v-for="member in underTitleFieldList" :key="member.id">
                <span class="space"></span>{{ member.script }}
              </div>
              <div><span class="space"></span> {{ synopsis }}</div>
              <div v-for="member in underSynopsisFieldList" :key="member.id">
                <span class="space"></span>{{ member.script }}
              </div>
              <div><span class="space"></span> {{ reason }}</div>
              <div v-for="member in underReasonFieldList" :key="member.id">
                <span class="space"></span>{{ member.script }}
              </div>
              <div><span class="space"></span> {{ impression }}</div>
              <div v-for="member in underImpressionFieldList" :key="member.id">
                <span class="space"></span>{{ member.script }}
              </div>
              <div><span class="space"></span> {{ learning }}</div>
              <div v-for="member in underLearnFieldList" :key="member.id">
                <span class="space"></span>{{ member.script }}
              </div>
            </div>
          </div>
          <v-btn @click="editReport()">保存</v-btn>
          <v-btn color="error" @click="deleteNewsMemo(index)" class="ml-2"> 削除</v-btn>

        </div>
      </v-container>
    </div>
  </template>
  
  <script>
  import { getFirestore, doc, setDoc , deleteDoc } from 'firebase/firestore'
  export default {
    data() {
      return {
        user: this.$store.state.auth.email,
        memoId:this.$route.query.memoId,
        title: this.$route.query.title,
        image:this.$route.query.image + "",
        synopsis: this.$route.query.synopsis + "",
        reason: this.$route.query.reason + "",
        impression: this.$route.query.impression + "",
        learning: this.$route.query.learning + "",
        underTitleFieldList: this.$route.query.underTitleFieldList ,
        underSynopsisFieldList: this.$route.query.underSynopsisFieldList ,
        underReasonFieldList: this.$route.query.underReasonFieldList ,
        underImpressionFieldList: this.$route.query.underImpressionFieldList ,
        underLearnFieldList: this.$route.query.underLearnFieldList ,
      }
    },
    methods: {
      addInput(newTextField) {
        newTextField.push({ id: newTextField.length, script: '' })
      },
      removeInput(deleteTextField, id) {
        deleteTextField.splice(id, 1)
        // idの振り直し
        for (let i = 0; i < deleteTextField.length; i++) {
          deleteTextField[i].id = i
        }
      },
      async editReport() {
        const db = getFirestore(this.$Firestore)
        const user = this.user
        await setDoc(doc(db, 'memoBooks', user + this.memoId), {
          user: this.user,
          memoId:this.memoId,
          title: this.title,
          image:this.image,
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
        this.$router.push({
          path: `../memoBooks`,
        })
      },
      async deleteNewsMemo(){
      try {
        const db = getFirestore(this.$Firestore);
        const user = this.user;
        await deleteDoc(doc(db, "memoBooks", user + this.$route.query.memoId));
        this.$router.push("../memoBooks");
      } catch (e) {
        console.error("error", e);
      }
    }
    },
  }
  </script>
  
  <style>
  </style>
  
  <style type="text/css">
  .box {
    margin: auto;
    max-width: 800px;
    height: 410px;
    border: 2px solid #b4610d;
    background-color: #ffffff;
    overflow: scroll;
  }
  </style>
  
  
  <style>
  .vertical {
    writing-mode: vertical-rl;
    font-family: serif;
    font-size: 20px;
  }
  .space {
    margin-top: 20px;
  }
  .titleSpace {
    margin-left: 20px;
  }
  </style>