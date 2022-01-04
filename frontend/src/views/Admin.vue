<template>
    <div>
        <NavigationHome></NavigationHome>
    </div>
</template>
<script>
import NavigationHome from "../components/NavigationHome";
import axios from "axios";
export default{
    name:"Admin",
    components: { NavigationHome },
    created(){
      this.getUser();
  },
    methods:{
        //Récuperer mes utilisateurs
        getUser(){
        axios.get('http://localhost:3000/api/user/',{headers: { "Authorization":"Bearer " + localStorage.getItem("token")}
        })
        .then(response => {
            this.user = response.data;
        })
        .catch((error)=>{
            alert(error + "mon erreur")
        })
    },
    }
}
// router.get('/:id', auth, userCtrl.getUserProfile);
// router.delete('/:id', auth, userCtrl.deleteAccount);


</script>
<style>

</style>