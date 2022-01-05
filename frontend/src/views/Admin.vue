<template>
    <div>
        <NavigationHome></NavigationHome>
        <main>
            <div class="listUser" v-for="user in users" :key="user.id">
                <h2>{{ user.username }}</h2>
                <p>{{ user.email }}</p>
                <button v-if="user.userId == userId || isAdmin" class="btn btn-primary"  type="submit">Supprimer</button>
            </div>
        </main>
    </div>
</template>
<script>
import NavigationHome from "../components/NavigationHome";
import axios from "axios";
export default{
    name:"Admin",
    components: { NavigationHome },
    data(){
        return{
            userId: localStorage.getItem('userId'),
            isAdmin: localStorage.getItem('isAdmin'),
            user:[],
            users:'',
            // id:'',
        } 
    },
    created(){
      this.getUser();
  },
    methods:{
        //Récuperer mes utilisateurs
        getUser(){
        axios.get('http://localhost:3000/api/user/',{headers: { "Authorization":"Bearer " + localStorage.getItem("token")}
        })
        .then(response => {
            this.users = response.data;
            console.log(response);
            })
        .catch((error)=>{
            alert(error + "mon erreur")
        })
    },
    
    // Supression d'un utilisateur
    // deleteUser(id){
    //     const userId = id;
    //     axios.delete('http://localhost:3000/api/user/' + userId, {headers:{"Authorization":"Bearer " + localStorage.getItem("token")}
    //     })
    //     .then((res)=>{
    //         console.log(res)
    //         alert("La publication a bien été supprimée")
    //         location.reload();
    //     })
    //     .catch((error)=>{
    //         console.log(id);
    //         alert(error + "mon erreur delete post")
    //     })
    // },
},
}
</script>
<style>

</style>