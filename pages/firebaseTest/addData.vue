<template>
  <div>
      <v-btn @click="addData()">
          追加
      </v-btn>
  </div>
</template>

<script>
  import { getFirestore , collection , addDoc }from 'firebase/firestore'
export default {
   data(){
       return{
       title:'テスト',
       id:'1'
       }
   },
   methods:{
  async addData(){
       try{
           const db = getFirestore(this.$Firestore)
           //  ここでfirestore(データベース)全体を取得  
         await addDoc(collection(db,"tasks"),{
           // tasksは任意の名前をつけているだけ
               title: this.title,
               id: this.id
           })
       }catch(e){
          console.error("error",e)
       }
   }
   }
}
</script>

<style>

</style>