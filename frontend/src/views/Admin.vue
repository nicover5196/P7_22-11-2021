<template>
    <div>
        <NavigationHome></NavigationHome>
        <main>
            <h3>Listes des utilisateurs :</h3>
            <section class="listUser">
                <div class="User" v-for="user in users" :key="user.id">
                    <h4>Pseudo : {{ user.username}}</h4>
                    <p>Email : {{ user.email }}</p>
                    <button v-if="isAdmin == 'true' || user.id == userId"  class="btn btn-primary" @click.prevent="deleteUser(user.id)" type="submit">Supprimer</button>
                </div>
            </section>
        </main>
    </div>
</template>
<script>
import NavigationHome from "../components/NavigationHome";
import axios from "axios";
import router from "../router";
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
    deleteUser(id){
        const userId = localStorage.getItem("userId")
        const isAdmin = localStorage.getItem("isAdmin")
        axios.delete('http://localhost:3000/api/user/'+ id,{headers: { "Authorization":"Bearer " + localStorage.getItem("token")}
        })
        .then((res)=>{
            console.log(res)
            console.log(isAdmin)
            if(isAdmin == 'true'){
                alert("Suppresion du compte")
                location.reload();
            }else if(userId == id);{
                alert("Suppresion de votre compte")
                console.clear()
                localStorage.clear();
                router.push({ path : '/inscription'});
            }
        })
        .catch((error)=>{
            alert(error + " : " +  "Vous n'êtes pas autorisé à supprimer ce compte")
        })
    },
    
},
}
</script>
<style>
h3{
    text-align:center;
}
.listUser{
    display:flex;
    justify-content: center;
    flex-wrap: wrap;
}
.User{
    margin:10px;
    padding:10px;
    border:black solid 1px;
}
</style>