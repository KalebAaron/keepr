<template>
  <div class="vaults well">
  <h3>My Vaults</h3>
  <a @click="vaultFormToggle()">+ New Vault</a>
    <form class="form-inline keep-form" @submit.prevent="createVault" v-show="vaultForm">
      <div class="form-group">
        <input type="text" class="form-control" v-model="vault.name" placeholder="Vault Name" /><br>
        <button type="submit" class="btn btn-default btn-xs" @click="vaultFormToggleBack">+</button>
        <button type="button" class="btn btn-default btn-xs" @click="vaultFormToggleBack">Cancel</button>
      </div>
    </form>
    <h2><a @click="getMyKeeps">My Keeps</a></h2>
    <hr>
    <div v-for="vault in vaults" class='vault-name'>
      <a @click="showVaultKeeps(vault)" class="vault-anchor">{{vault.name}}</a><hr>
      </div>
  </div>
</template>


<script>
export default {
  name: 'vaults',
  data(){
    return {
      vault: {
        name: '',
        keeps: [],
        creatorId: ''
      },
      vaultForm: false
    }
  },
  mounted(){
    this.$store.dispatch('getVaults', this.$route.params.id)
  },
  computed:{
      vaults() {
        return this.$store.state.vaults
      }
  },
  methods:{
    createVault() {
        debugger
        this.vault.creatorId = this.$store.state.user._id;
        this.$store.dispatch('createVault', this.vault)

      },
      vaultFormToggle(){
        this.vaultForm = true;
      },
      vaultFormToggleBack(){
        this.vaultForm = false;
      },
      showVaultKeeps(vault){
        debugger
        this.$store.dispatch('showVaultKeeps', vault)
      },
      getMyKeeps(){
        this.$store.dispatch("getMyKeeps", this.$route.params.id)
      }
  },
  components:{}
}
</script>


<style scoped>
.vaults{
  text-align: left;
  width: 15%;
  height: 400px;
  margin-top: -42%;
  background-color: #787a66;
  overflow: auto;
  position: absolute;
}
.vault-anchor{
  font-size: 25px;
}
h3{
  text-align: center;
}
a{
  color: #b2b2b0;
}
a:hover { 
    color: white;
    text-decoration: none;
}
.form-control{
  width: 75%;
}
</style>