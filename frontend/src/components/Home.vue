<template>
    <header id="home">
        <nav id="navHome">
            <img class="logoGroupomania" alt="logo_Groupomania" src="../assets/img/icon-left-font-monochrome-black.png"/><br>
        </nav>
    </header>
</template>
<script>

export default {
    name: "Home"
}
</script>
<style>
#navHome{
    display:flex;
    justify-content: center;
}
.logoGroupomania{
    margin-left:0px;
    margin-right:0px;
    width:260px;
    height: 80px;
    object-fit: cover;
    }
    body{
    background:linear-gradient(#9198e5,#e66465);
    margin: 0;
    min-height: 100vh;
    }
    
</style>