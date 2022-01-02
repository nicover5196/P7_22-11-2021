<template>
    <div>
        <NavigationHome></NavigationHome>
        <form>
            <router-link to="/CreatePublication"><button class="btn btn-primary" type="button">Créer une publication</button></router-link>
        </form>
        <main>
            <section class="Publication">
                <article>
                    <h2>titre</h2>
                    <p>Content</p>
                </article>
                <div class="AddComment">
                    <textarea id="CreateComment" type="text" placeholder="Votre commentaire ..."></textarea>
                    <button @click.prevent="getPost()" class="btn btn-primary" type="submit">Ajouter un commentaire</button>
                </div>
            </section>
            <section class="Commentaire">
                <h5>Commentaire :</h5>
                <div>
                    <p>mon commentaire ...</p>
                </div>
            </section>
        </main>
    </div>
</template>
<script>
import axios from "axios"
import NavigationHome from "../components/NavigationHome";
export default {
    name:'dashboard',
    components: { NavigationHome },
    data(){
    return {
      CreateComment:'',
    }
  },
methods:{
    // Post ID pas encore défini... besoin du post com
    sendComment(){
    let postId = localStorage.getItem('postId')
    axios
    .post('http://localhost:3000/api/post/' + postId, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        })
         .then((res) => {
            console.log(res)
        })
        .catch((error)=>{
            alert(error)
        })
    },
    getPost(){
        axios.get('http://localhost:3000/api/post/',{headers:{"Authorization": "Bearer"+ localStorage.getItem("token")}
        })
        .then((res)=>{
            console.log(res)
        })
        .catch((error)=>{
            alert(error + "mon erreur")
        })
    },
    // faire les chemin (route pour delete)
    deletePost(){
        axios.delete('http://localhost:3000/api/post/',{headers:{"Authorization": "Bearer"+ localStorage.getItem("token")}
        })
        .then((res)=>{
            console.log(res)
        })
        .catch((error)=>{
            alert(error + "mon erreur")
        })
    },
    deleteComment(){
        axios.delete('http://localhost:3000/api/post/',{headers:{"Authorization": "Bearer"+ localStorage.getItem("token")}
        })
        .then((res)=>{
            console.log(res)
        })
        .catch((error)=>{
            alert(error + "mon erreur")
        })
    }
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
.AddComment{
    display:flex;
    flex-direction: column;
    align-items: center;
}
textarea{
    height:100px;
    width:300px;
}
section{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>