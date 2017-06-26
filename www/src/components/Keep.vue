<template>
  <div class="keep">
  {{keep.title}}


  </div>
</template>


<script>
export default {
  name: 'keep',
  data(){
    return {

    }
  },
  computed:{
    keeps(){
      return this.$store.state.keeps
    }
  },
  methods:{},
  components:{}
}
</script>


<style scoped>

</style>