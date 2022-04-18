<template>
  <div>
        <h1> <v-icon>mdi-moon-waxing-crescent</v-icon>
     Reading Maneger</h1>
    <v-card class="loginCard">
       <h2> 
        <v-icon>mdi-moon-waxing-crescent</v-icon>
     Reading Manegerにログイン
     </h2>
          <v-col cols="10">
              <div class="mx">
                  <v-text-field v-model="email" label="メールアドレス" />
                  <v-text-field v-model="password" label="パスワード" />
              </div>
          </v-col>
          <div class="center">
              <v-btn color="dark" @click="signUp">ログイン</v-btn>
          </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },

  methods: {
    signUp() {
      try {
        this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password,
        })
        this.$store.state.isLoggedIn = true
      } catch (error) {
        alert(error)
      }
    },
  },
}
</script>

<style>
.loginCard {
  width: 500px;
  height: 400px;
  margin-left: 250px;
  margin-top: 200px;
}

.center{
    text-align: center;
}
</style>