<template>
  <div class="register">
  <h1>Register New User</h1><br><br>
    <div class="container">
      <form @submit.prevent="register">
        <div class="form-group">
          <input type="text" v-model="name" class="form-control" placeholder="Name" aria-describedby="sizing-addon1" required>
        </div>
        <div class="form-group">
          <input type="text" v-model="email" class="form-control" placeholder="Email" aria-describedby="sizing-addon1" required>
        </div>
        <div class="form-group">
          <input type="password" v-model="password" class="form-control" placeholder="Password" aria-describedby="sizing-addon1" required>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-success btn-lg">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data() {
      return {
        name: "",
        email: "",
        password: ""

      }
    },
    computed: {},
    methods: {
      register() {
        this.$store.dispatch('register', {
          name: this.name,
          email: this.email,
          password: this.password
        })
      }
    },
    components: {

    }
    }

</script>


<style scoped>
.form-group {
  width: 50%;
}
</style>