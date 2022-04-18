<template>
    <div >
      <v-app >
       <Header/>
        <v-main class="backgroundcolor">
            <v-container >
              <Nuxt
              />
            </v-container>
        </v-main>
      
      </v-app>
    </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
    }
  },
}
</script>
<style >
</style>