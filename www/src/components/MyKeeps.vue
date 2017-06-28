<template>
  <div class="body">
    <div class="myKeeps well">
      <div class="nav container-fluid">
        <div class="row">
          <div class="col-xs-4">
            <!--<span class="glyphicon glyphicon-search form-control-feedback"></span>-->
            <input type="search" class="form-control search" placeholder="search Keeps" />
          </div>
          <div class="col-xs-1">
            <p>-</p>
          </div>
          <div class="col-xs-2">
            <a>Browse Keeps</a>
          </div>
          <div class="col-xs-1">
            <p>-</p>
          </div>
          <div class="col-xs-2">
            <a @click="keepFormToggle">+ New Keep</a>
          </div>
        </div>
      </div>
      <hr>
      <hr>
      <div class="keeps">
        <div class="container">
          <div class='row'>
            <div v-for="keep in keeps" class='col-sm-3 keep'>
              <h3>{{keep.title}}</h3>
              <img :src="keep.imgUrl" class="keepImage" /><br>

            </div>
          </div>
        </div>
      </div>
    </div>
    <Vaults></Vaults>
    <KeepForm v-show="keepForm"></KeepForm>
  </div>
</template>


<script>
  import Vaults from '@/components/Vaults'
  import KeepForm from '@/components/KeepForm'
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
        keepForm: false
      }
    },
    mounted() {
      this.$store.dispatch('getKeeps', this.$route.params.id)
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      keeps() {
        return this.$store.state.keeps
      }
    },
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
    components: { Vaults, KeepForm }
  }

</script>


<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .keepImage {
    height: 220px;
    width: 150px;
  }

  .form-body {
    height: 150px;
  }

  .form-group {
    padding: 10px;
  }

  .form-control {
    width: 200%;
    margin-left: -50%;
  }

  .myKeeps {
    width: 85%;
    margin-left: 15%;
  }

  .well {
    background-color: #404144;
  }

  .keep {
    padding: 0px;
  }

  .search {
    width: 80%;
    margin-left: 5px;
  }
</style>