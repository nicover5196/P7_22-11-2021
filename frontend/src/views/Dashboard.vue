<template>
    <div>
        <NavigationHome></NavigationHome>
        <form>
            <router-link to="/CreatePublication"><button class="btn btn-primary" type="button">Créer une publication</button></router-link>
        </form>
        <main>
            <section class="Publication">
                <div class="articlePublication" v-for="post in posts" :key="post.id">
                    <h2>{{ post.title }}</h2>
                    <p>{{ post.content }}</p>
                    <button v-if="post.userId == userId || isAdmin" class="btn btn-primary" @click.prevent="deletePost(post.id)" type="submit">Supprimer</button>
                    <div class="commentPublication" v-for="comment in comments" :key="comment.id">
                        <h5>{{ comment.userId}}</h5>
                        <p>{{ comment.content }}</p>
                    </div>
                    <form @submit.prevent="sendComment(post.id)" class="AddComment" >
                        <textarea v-model="content" id="CreateComment" type="text" placeholder="Votre commentaire ..."></textarea>
                        <button  class="btn btn-primary" type="submit">Ajouter un commentaire</button>
                    </form>
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
    userId: localStorage.getItem('userId'),
    isAdmin: localStorage.getItem('isAdmin'),
    post: [],
    posts: '',
    content:'',
    comment:[],
    comments:'',
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
            // console.log(response.data);
        })
        .catch((error)=>{
            //   console.log(localStorage.getItem("token"));
            alert(error + "mon erreur")
        })
    },
    // Supression d'un post
    deletePost(id){
        const postId = id;
        axios.delete('http://localhost:3000/api/post/' + postId, {headers:{"Authorization":"Bearer " + localStorage.getItem("token")}
        })
        .then((res)=>{
            console.log(res)
            alert("La publication a bien été supprimée")
            location.reload();
        })
        .catch((error)=>{
            console.log(id);
            alert(error + "mon erreur delete post")
        })
    },
    // Créer un commentaire
    sendComment(id){
    const postId = id;
    const formDataComment = new FormData()
        formDataComment.append("postId", localStorage.getItem('postId'))
        formDataComment.append("UserId", localStorage.getItem('userId'))
        formDataComment.append("content", this.content.toString())
    axios
    .post('http://localhost:3000/api/comment/' + postId, formDataComment, { 
        headers: { "Authorization":"Bearer " + localStorage.getItem("token"),'Content-Type': 'application/json'}})
         .then((res) => {
            console.log(res)
            this.content = res.data.bpi
            alert('réussi!')
        })
        .catch((error)=>{
            console.log(this.content)
            alert(error + 'error comment')
        })
    },
    // Suppresion d'un commentaire
    deleteComment(id){
        const commentId = id;
        axios.delete('http://localhost:3000/api/comment/' + commentId, {headers:{"Authorization": "Bearer "+ localStorage.getItem("token")}
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
    height:50px;
    width:300px;
}
section{
    display: flex;
    flex-direction: column;
}
h2{
    text-align: center;
}
.articlePublication{
    border:solid black 1px; 
}
</style>