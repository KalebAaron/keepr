<template>
  <div class="keepform well" v-show="keepForm">
    <h2>Your New Keep:</h2><br><br>
    <form class="form-inline keep-form" @submit.prevent="createKeep">
      <div class="form-group">
        <input type="text" class="form-control" v-model="keep.title" placeholder="Keep Title" /><br>
        <input type="text" class="form-control form-body" v-model="keep.body" placeholder="Body" /><br>
        <input type="url" class="form-control" v-model="keep.imgUrl" placeholder="www.yourpic.com" /><br>
        <button type="submit" class="btn btn-primary" @click="keepFormToggleBack">Add Your Keep</button>
        <button type="button" class="btn btn-primary" @click="keepFormToggleBack">Cancel</button>
      </div>
    </form>

  </div>
</template>


<script>
  export default {
    name: 'keepform',
    data() {
      return {
        keep: {
          title: '',
          body: '',
          imgUrl: '',
          creatorId: '',
          author: '',
        },
        keepForm: true
      }

    },
    computed: {},
    methods: {
      createKeep() {
        this.keep.creatorId = this.$store.state.user._id;
        this.keep.author = this.$store.state.user.name;
        this.$store.dispatch('createKeep', this.keep)

      },
      keepFormToggle() {
        this.keepForm = true;
      },
      keepFormToggleBack() {
        this.keepForm = false;
      }
    },
    components: {}
  }

</script>


<style scoped>
  .keepform {
    color: #595955;
    background-color: #c4c4b6;
    width: 40%;
    position: absolute;
    top: 40%;
    left: 30%
  }
  .form-control{
    width: 150%;
    margin-left: -20%;
  }
  .form-body{
    height: 200px;
  }
</style>