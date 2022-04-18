<template>
   
   <div>
        
       <v-footer :absolute="!fixed" app>
          <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
   </div>
</template>

<script>
export default {
      data(){
          return {
              fixed:false,
          }
      },
       computed: {
    isLoggedin() {
      return this.$store.state.auth.isLoggedIn
    },
  },
}
</script>

<style>
   
</style>