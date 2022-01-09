<template>
    <div>
        <NavigationHome></NavigationHome>
        <form>
            <router-link to="/CreatePublication"><button class="btn btn-primary" type="button">Créer une publication</button></router-link>
            <button class="btn btn-danger" type="button" @click.prevent="disconnect()">Déconnexion</button>
        </form>
        <main>
            <section class="Publication">
                <h3>Dernières publications : </h3>
                <div class="articlePublication" v-for="post in posts" :key="post.id">
                    <Publication v-bind:post="post"></Publication>
                </div>  
            </section>
        </main>
    </div>
</template>
<script>
import router from "../router";
import Publication from "../components/Publication";
import axios from "axios"
import NavigationHome from "../components/NavigationHome";
export default {
    name:'dashboard',
    components: { NavigationHome, Publication }, 
    data(){
    return {
    userId: localStorage.getItem('userId'),
    isAdmin: localStorage.getItem('isAdmin'),
    posts: [],
    content:'',
    id:'',
    }
  },
  created(){
      this.getPost();
  },
  createdComment(){
      this.getComment();
  },

methods:{
    //Récuperer mes publications
    getPost(){
        axios.get('http://localhost:3000/api/post/',{headers: { "Authorization":"Bearer " + localStorage.getItem("token")}
        })
        .then(response => {
            this.posts = response.data;
            console.log(response.data);
        })
        .catch((error)=>{
            alert(error + "mon erreur")
        })
    },
    disconnect(){
            localStorage.clear();
            alert('Déconnexion : Retour vers le formulaire de connexion')
            router.push({ path : '/Connexion'});
        },
}
}
</script>
<style scoped>
main{
    margin: 0 auto;
    width:600px;
    max-width:100%;
    border-radius:5px;
   }
   h3{
       padding:20px;
   }
form{
    display:flex;
    justify-content:center;
}
.btn{
    margin:10px;
}
.articlePublication{
    padding:20px;
}
</style>