<template>
  <div>
    <Navigation></Navigation>
    <div class="inscrit">
      <form @submit.prevent="signup">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Username" v-model="username">
        </div>
        <div class="form-group">
          <input type="email" class="form-control" placeholder="Email" v-model="email">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Password" v-model="password">
        </div>
        <button type="submit" class="btn btn-primary">S'inscrire</button>
      </form>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
import axios from "axios";
import router from "../router";
export default {
  components: { Navigation, },
  name: 'Inscription',
  data(){
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signup(){
      axios
      .post('http://localhost:3000/api/user/signup',{
        username: this.username,
        email: this.email,
        password: this.password
      })
       .then(response => {
        console.log(response)
        this.info = response.data.bpi
        alert('Inscription réussi ! Redirection vers connexion')
        router.push({ path : '/connexion'});
      })
      .catch(error => {
        console.log(error)
        alert('Inscription échouée ! Vérifier vos champs d\'inscription')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inscrit{
  display:flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  width: auto;
  border-bottom-left-radius: 5%;
  border-bottom-right-radius: 5%;
  padding:20px;
}
button{
margin:auto;
display:flex;
justify-content: center;
}
</style>
