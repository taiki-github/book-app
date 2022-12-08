<template>
  <div>
    <div class="pc">
      <v-row>
        <v-col cols="6">
          <div class="appDiscription">
            <h1>R&W</h1>
            <h4>
              このアプリケーションは読書感想文作成アプリです。
              例文の提案などがあり読書感想文の作成に役立ちます。
              また、他のユーザーの投稿した感想文の閲覧も出来ます。            </h4>
          </div>
        </v-col>
        <v-col cols="6">
          <v-card class="loginCard">
            <h1 class="loginCardTitle">R&W</h1>

            <v-text-field v-model="email" label="メールアドレス" />
            <v-text-field v-model="password" label="パスワード" />
            <v-row>
              <v-col cols="3">
                <v-btn @click="signUp" color="primary">ユーザー登録する</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="mobile">
      <div class="appDiscription">
        <h1>R&W</h1>
        <h4>
          このアプリケーションは読書感想文作成アプリです。
              例文の提案などがあり読書感想文の作成に役立ちます。
              また、他のユーザーの投稿した感想文の閲覧も出来ます。
        </h4>
      </div>
      <v-card class="loginCard">
        <h1 class="loginCardTitle">R&W</h1>
        <v-text-field v-model="email" label="メールアドレス" />
        <v-text-field v-model="password" label="パスワード" />
        <v-row>
          <v-col cols="3">
            <v-btn @click="signUp" color="primary">ユーザー登録する</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    async signUp() {
      try {
        const auth = getAuth(this.$firebase);
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        const db = getFirestore(this.$Firestore);
        setDoc(doc(db, "userName", this.email), {
          name: "未登録",
          email: this.email,
        });
        await setDoc(doc(db, "memoNumber", this.email), {
        number: 10000,
      });
      await setDoc(doc(db, 'postNumber', this.email), {
          number: 10000,
        })

        this.$router.push(`/auth/login`);
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style>
@media screen and (min-width: 481px) {
  .loginCard {
    width: 400px;
    height: 400px;
    /* margin-left: 150px; */
    margin-top: 200px;
  }

  .centerLoginCard {
    text-align: center;
    font-family: serif;
  }
  .loginCardTitle {
    text-align: center;
    font-family: serif;
  }
  .loginBtn {
    margin-bottom: 15px;
    margin-top: 30px;
  }
  .loginTextField {
    padding: 10px;
  }
  .appDiscription {
    margin-top: 250px;
    margin-left: 30px;
  }
  .mobileSize {
    display: none;
  }
}
@media screen and (max-width: 481px) {
  .loginCard {
    width: 300px;
    margin-top: 50px;
    margin-left: 40px;
  }
  .loginTextField {
    padding: 10px;
  }
  .pcSize {
    display: none;
  }
  .centerLoginCard {
    text-align: center;
    font-family: serif;
  }
  .loginCardTitle {
    text-align: center;
    font-family: serif;
  }
  .loginBtn {
    margin-bottom: 15px;
    /* margin-top: 30px; */
  }
  .appDiscription {
    margin-top: 20px;
    margin-left: 30px;
  }
}
</style>