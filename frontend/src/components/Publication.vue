<template>
    <div>
        <div class="Publication">
            <h5>{{ post.title }}</h5>
            <p>{{ post.content }}</p>
            <button v-if="post.userId == userId || isAdmin == 'true'" class="btn btn-primary" @click.prevent="deletePost(post.id)" type="submit">Supprimer ma publication</button>
        </div>
        <h3>Commentaire : </h3>
        <div class="commentPublication" v-for="comment in post.Comments" :key="comment.id">
            <h5>Utilisateur numéro {{ comment.userId}}</h5>
            <p>{{ comment.content }}</p><button v-if="comment.userId == userId || isAdmin == 'true' " class="btn btn-primary" @click.prevent="deleteComment(comment.id)" type="submit">Supprimer Com</button>
        </div>
        <form @submit.prevent="sendComment(post.id)" class="AddComment" >
            <textarea class="form-control" v-model="content" id="CreateComment" type="text" placeholder="Votre commentaire ..."></textarea>
            <button  class="btn btn-primary" type="submit">Ajouter un commentaire</button>
        </form>
    </div>
</template>
<script>
import axios from "axios"
export default {
    name:'Publication',
    props:["post"],
    data(){
    return {
    userId: localStorage.getItem('userId'),
    isAdmin: localStorage.getItem('isAdmin'),
    content:'',
    id:'',
    }
  },
  createdComment(){
      this.getComment();
  },
  
methods:{
 
    // Créer un commentaire
          sendComment(postId) {
                axios.post('http://localhost:3000/api/comment/' + postId, {
                    content: this.content,
                },{
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    window.location.reload()                    
                })
                .catch(error => {
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                })
            },
    
    // Suppresion d'un commentaire
    deleteComment(commentId){
        axios.delete('http://localhost:3000/api/comment/' + commentId, {headers:{"Authorization": "Bearer "+ localStorage.getItem("token")}
        })
        .then((res)=>{
            console.log(res)
            alert('Commentaire supprimée')
            location.reload();
        })
        .catch((error)=>{
            alert(error + "mon erreur")
            console.log(commentId)
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
.Publication{
    border-bottom:solid black 1px;
    margin-bottom:20px;
}
</style>