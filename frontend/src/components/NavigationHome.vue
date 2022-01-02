<template>
    <div id="navigation">
        <nav>
            <ul>
                <li><router-link to="/Dashboard">Accueil</router-link></li>
                <li><router-link to="/">Inscription</router-link></li>
                <li><router-link to="/Connexion">Connexion</router-link></li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: "NavigationHome"
}
</script>
<style>
ul {
    display:flex;
    justify-content: center;
    list-style-type: none;
    margin: 0;
    padding: 0;
}
li{
    margin:10px;
}
a{
    color:#fff;
}
#navigation {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    }
    #navigation {
    padding: 30px;
    }

    #navigation a {
    font-weight: bold;
    /* color: #2c3e50; */
    color:#fff;
    }

    #navigation a.router-link-exact-active {
    /* color: #42b983; */
    color:black;
    }
</style>