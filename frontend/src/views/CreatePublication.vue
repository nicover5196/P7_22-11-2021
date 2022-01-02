<template>
    <div>
        <NavigationHome></NavigationHome>
        <section>
            <form>
                <!-- <div class="formCreatePublication">
                    <label for="title"></label>
                    <input type="text" id="title" placeholder="Titre de Publication" v-model="title">
                </div> -->
                <div class="formCreatePublication">
                    <label for="content"></label>
                    <textarea rows="10" cols="50" name="content" placeholder="Votre message ..." v-model="content"></textarea>
                </div>
                <!-- <div class="formCreatePublication">
                    <label for="File">Ajouter une photo</label>
                    <input @change="selectFile()" type="file" ref="file" name="image" class="form-control-file" id="File" accept=".jpg, .jpeg, .gif, .png">
                </div> -->
            </form>
            <button @click.prevent="sendPost()" class="btn btn-primary" type="submit">Publier</button>
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
            content:'',
           } 
        },
        methods:{
            sendPost(){
                const formData = new FormData()
                formData.append("Username", localStorage.getItem('username'))
                formData.append("UserId", localStorage.getItem('userId'))
                formData.append("content", this.content.toString())
                axios.post('http://localhost:3000/api/post/',formData, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
                .then(response =>{
                console.log(response)
                this.content = response.data.bpi
                alert('Votre publication à bien été créer')
                router.push({ path : '/dashboard'});
            })
            .catch(error =>{
                console.log(error +' je suis erreur createPost')
                alert('Merci de vous connecter')
                router.push({ path : '/connexion'});
            })
            }
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
.btn{
    margin-top: 40px;
    display:flex;
    justify-content: center;
}
</style>
