<template>
  <div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.state.auth.email,
      memoId: this.$route.query.memoId + '',
      title: this.$route.query.title + '',
      synopsis: this.$route.query.synopsis + '',
      reason: this.$route.query.reason + '',
      impression: this.$route.query.impression + '',
      learning: this.$route.query.learning + '',
      underTitleFieldList: this.$route.query.underTitleFieldList ,
      underSynopsisFieldList: this.$route.query.underSynopsisFieldList ,
      underReasonFieldList: this.$route.query.underReasonFieldList ,
      underImpressionFieldList: this.$route.query.underImpressionFieldList ,
      underLearnFieldList: this.$route.query.underLearnFieldList ,
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
