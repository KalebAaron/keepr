<template>
  <div class="myKeeps"><hr>
    <button type="button" class='btn btn-primary' @click="keepFormToggle" v-show="addKeepButton">Create a Keep</button>
            <form class="form-inline keep-form" @submit.prevent="createKeep" v-show="newKeep">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="keep.title" placeholder="Keep Title" /><br>
                    <input type="text" class="form-control form-body" v-model="keep.body" placeholder="Body" /><br>
                    <input type="url" class="form-control" v-model="keep.imgUrl" placeholder="www.yourpic.com" /><br>
                    <button type="submit" class="btn btn-primary" @click="keepFormToggleBack">Add Your Keep</button>
                </div>
            </form><hr>

  </div>
</template>


<script>
export default {
  name: 'myKeeps',
  data() {
    return {
        keep: {
          title: '',
          body: '',
          imgUrl: '',
          creatorId: '',
          author: '',

        },
        addKeepButton: true,
        newKeep: false
      }
  },
  mounted() {
      this.$store.dispatch('getKeeps', this.$route.params.id)
    },
  computed:{
    user(){
      return  this.$store.state.user
    }
  },
  methods:{
    createKeep(){
      debugger
      this.keep.creatorId = this.$store.state.user._id;
      this.keep.author = this.$store.state.user.name;
      this.$store.dispatch('createKeep', this.keep)

    },
    keepFormToggle() {
            this.newKeep = true;
            this.addKeepButton = false;
        },
    keepFormToggleBack() {
        this.newKeep = false;
        this.addKeepButton = true;
    }
  },
  components:{}
}
</script>


<style scoped>
.form-body{
  height: 150px;
},
.form-group{
  padding: 10px;
},
.form-control{
  width: 77%;
  margin-left: 8%;
}
.btn-primary{
  width: 20%
}
</style>