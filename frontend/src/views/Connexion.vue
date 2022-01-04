<template>
  <div>
    <Navigation></Navigation>
    <div class="inscrit">
      <form @submit.prevent="login">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Username" v-model="username">
        </div>
        <div class="form-group">
          <input type="email" class="form-control" placeholder="Email" v-model="email">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Password" v-model="password">
        </div>
        <button type="submit" class="btn btn-primary">Se connecter</button>
      </form>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
import router from "../router";
import axios from "axios";
export default {
  components: { Navigation },
  name: 'Connexion',
  data(){
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
login(){
      axios
      .post('http://localhost:3000/api/user/login',{
        username: this.username,
        email: this.email,
        password: this.password
      })
      .then(response =>{
        console.log(response)
        this.info = response.data.bpi
        localStorage.setItem('token',response.data.token)
        localStorage.setItem("userId",  response.data.userId)
        localStorage.setItem("username",response.data.username)
         localStorage.setItem("isAdmin",response.data.isAdmin)
         alert('Connexion réussi : Bonjour ' + this.username + ' !')
         router.push({ path : '/dashboard'});
      })
      .catch(error =>{
        console.log(error)
         alert('Connexion refusée : Merci de vérifier vos champs de connexion')
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