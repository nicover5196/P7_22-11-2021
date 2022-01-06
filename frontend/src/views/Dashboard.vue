<template>
    <div>
        <NavigationHome></NavigationHome>
        <form>
            <router-link to="/CreatePublication"><button class="btn btn-primary" type="button">Créer une publication</button></router-link>
        </form>
        <main>
            <section class="Publication">
                <h3>Publications : </h3>
                <div class="articlePublication" v-for="post in posts" :key="post.id">
                    <Publication v-bind:post="post"></Publication>
                </div>  
            </section>
        </main>
    </div>
</template>
<script>
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
            // console.log(localStorage.getItem("token"))
            this.posts = response.data;
            console.log(response.data);
        })
        .catch((error)=>{
            //   console.log(localStorage.getItem("token"));
            alert(error + "mon erreur")
        })
    },
}
}
</script>
<style scoped>
main{
    margin: 0 auto;
    width:400px;
    background-color:rgba(255, 255, 255, 0.5);
    border-radius:5px;
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