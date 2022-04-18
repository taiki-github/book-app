<template>
  <div>
      <v-btn @click="logout">
          ログアウト
      </v-btn>
  </div>
</template>

<script>
export default {
    methods:{
      logout(){
        this.$store.dispatch('auth/logout')
          
      }
    }

}
</script>

<style>

</style>