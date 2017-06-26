<template>
  <div class="homepage">
    <h1>Welcome to Keepr</h1>
    <p>Get Started</p>
    <ul>
      <li>
        <router-link to="login">Login</router-link>
      </li>
      <li>
        <router-link to="register">Register</router-link>
      </li>
    </ul>
    <hr>
    <div class="keeps">
      <div class="container">
        <div class='row'>
          <div v-for="keep in keeps" class='col-sm-3 well'>
            <h3>{{keep.title}}</h3>
            <img :src="keep.imgUrl" class="keepImage"/><br>
            
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Keep from '@/components/Keep'
  export default {
    name: 'homepage',
    data() {
      return {

      }
    },
    computed: {
      keeps() {
        return this.$store.state.keeps
      }
    },
    components: {
      Keep
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  .keepImage{
    height: 275px;
    width: auto;
  }
</style>