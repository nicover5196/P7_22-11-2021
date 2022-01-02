<template>
  <div id="app">
     <Home></Home>
      <router-view></router-view>
  </div>
</template>
<script>

import Home from "./components/Home";

export default {
    name: "App",
    components: {
      Home
    }
}
</script>
