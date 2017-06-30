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
      <h1>{{activeVault.name}}</h1>
      <hr class="keep-line">
      <div class="keeps">
        <div class="container">
          <div class='row'>
            <div v-for="keep in keeps" class='col-sm-3 keep'>
              <h3>{{keep.title}}</h3>
              <p>By: {{keep.author}}</p>
              <img :src="keep.imgUrl" class="keepImage" /><br>
              <div class="container-fluid">
                <div class="row">
                  <div class="col-xs-2">
                    <button type="button" class="btn btn-default btn-xs">+ Save</button>
                  </div>
                  <div class="col-sm-4">
                    <div class="dropdown">
                      <button class="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown">Add To Vault 
                      <span class="caret"></span>
                      </button>
                      <ul class="dropdown-menu">
                        <li v-for= "vault in vaults"><a @click="addToVault(keep, vault._id)">{{vault.name}}</a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-xs-1">
                    <button v-if="activeVault.name != 'My Keeps'" type="button" class="btn btn-default btn-xs">-</button>
                  </div>
                </div>
              </div>
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
          keptBy: []

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
      },
      vaults() {
        return this.$store.state.vaults
      },
      activeVault() {
        return this.$store.state.activeVault
      }
    },
    methods: {
      createKeep() {
        debugger
        this.keep.keptBy.push(this.$store.state.user._id)
        this.keep.creatorId = this.$store.state.user._id;
        this.keep.author = this.$store.state.user.name;
        this.$store.dispatch('createKeep', this.keep)

      },
      keepFormToggle() {
        this.keepForm = true;
      },
      keepFormToggleBack() {
        this.keepForm = false;
      },
      addToVault(keep, vaultId) {
        debugger
        keep.vaultIds.push(vaultId)
        keep.keepCount += 1
        this.$store.dispatch('addVaultIdToKeep', {keep: keep, vaultId: vaultId})
        this.$store.dispatch('addToVault', {keep: keep, vaultId: vaultId} )
      },
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
    height: 100%;
    margin-left: 15%;
    background-color: #161615;
  }
  .body {
    background-color: #161615;
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

  .keep-line {
    width: 25%;
  }
</style>