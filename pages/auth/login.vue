<template>
  <div>
    <div class="pc">
      <v-row>
        <v-col cols="6">
          <div class="appDiscription">
            <h1>R&W
            </h1>
            <h4>
              このアプリケーションは読書感想文作成アプリです。
              例文の提案などがあり読書感想文の作成に役立ちます。
              また、他のユーザーの投稿した感想文の閲覧も出来ます。
            </h4>
          </div>
        </v-col>
        <v-col cols="6">
          <v-card class="loginCard">
            <h1 class="loginCardTitle">R&W</h1>
            <div>
              <div class="mx loginTextField">
                <v-text-field v-model="email" label="メールアドレス" />
                <v-text-field v-model="password" label="パスワード" />
              </div>
            </div>
            <div class="centerLoginCard">
              <v-btn @click="signUp" color="warning" class="loginBtn"
                >ログイン</v-btn
              >
            </div>
            <div class="centerLoginCard">
              <v-btn to="/auth/register" color="success"
                >アカウント新規作成</v-btn
              >
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="mobile">
      <div class="appDiscription">
        <h1>R&W
            </h1>
            <h4>
              このアプリケーションは読書感想文作成アプリです。
              例文の提案などがあり読書感想文の作成に役立ちます。
              また、他のユーザーの投稿した感想文の閲覧も出来ます。
            </h4>
      </div>
      <v-card class="loginCard">
        <h1 class="loginCardTitle">R&W</h1>

        <div>
          <div class="mx loginTextField">
            <v-text-field v-model="email" label="メールアドレス" />
            <v-text-field v-model="password" label="パスワード" />
          </div>
        </div>
        <div class="centerLoginCard">
          <v-btn @click="signUp" color="warning" class="loginBtn"
            >ログイン</v-btn
          >
        </div>
        <div class="centerLoginCard">
          <v-btn to="/auth/register" color="success" class="loginBtn"
            >アカウント新規作成</v-btn
          >
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    signUp() {
      try {
        this.$store.dispatch("auth/login", {
          email: this.email,
          password: this.password,
        });
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