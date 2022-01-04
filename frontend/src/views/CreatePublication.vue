<template>
    <div>
        <NavigationHome></NavigationHome>
        <section>
            <form @submit.prevent="sendPost">
                <div class="formCreatePublication">
                    <label for="title"></label>
                    <input type="text" name="title" id="title" placeholder="Titre de Publication" v-model="title">
                </div>
                <div class="formCreatePublication">
                    <label for="content"></label>
                    <textarea rows="10" cols="50" name="content" placeholder="Votre message ..." v-model="content"></textarea>
                </div>
                <!-- <div class="formCreatePublication">
                    <label for="File">Ajouter une photo</label>
                    <input @change="selectFile()" type="file" ref="file" name="image" class="form-control-file" id="File" accept=".jpg, .jpeg, .gif, .png">
                </div> -->
                <div class="formCreatePublication">
                    <button class="btn btn-primary" type="submit">Publier</button>
                </div>
            </form>
        </section>
    </div>
</template>
<script>
import router from "../router";
import axios from "axios"
import NavigationHome from "../components/NavigationHome";
export default {
    name:'CreatePublication',
    components: { NavigationHome},
    data(){
        return{
            title:'',
            content:'',
           } 
        },
        methods:{
            sendPost(){
                const formData = new FormData()
                formData.append("Username", localStorage.getItem('username'))
                formData.append("UserId", localStorage.getItem('userId'))
                formData.append("content", this.content.toString())
                formData.append("title", this.title.toString())
                axios.post('http://localhost:3000/api/post/',formData, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
                .then(response =>{
                console.log(response)
                this.content = response.data.bpi
                this.title = response.data.bpi
                alert('Votre publication à bien été créer')
                router.push({ path : '/dashboard'});
            })
            .catch(error =>{
                console.log(error +' je suis erreur createPost')
                alert('Merci de vous connecter')
                router.push({ path : '/connexion'});
            })
            },
        }
    }
</script>
<style>
section{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.formCreatePublication{
    margin:10px;
}
</style>
