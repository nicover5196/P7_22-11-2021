<template>
    <div id="navigation">
        <div id="nav">
            <router-link to="/">Inscription</router-link> |
            <router-link to="/Connexion">Connexion</router-link>
        </div>
    </div>
</template>
<script>

export default {
    name: "Navigation"
}
</script>
<style>
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