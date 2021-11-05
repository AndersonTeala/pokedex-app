<template>
  <q-page class="wall">
    <div class="fixed-bottom q-ma-md">
      <q-btn label="Iniciar" color="blue" size="xl" to="/pokedex" />
    </div>
  </q-page>
</template>

<script>

export default {
  // name: 'PageIndex',
  data () {
    return {
      pokemons: [],
      busca: ''
    }
  },
}
</script>
<style scoped>
  .wall {
    display: block;
    width: 100vw;
    height: 100vh;
    padding: 0;
    text-align: center;
    color: white;
    background-position: 30% 45%;
    background-color: black;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-size: cover;
    -o-background-size: cover;
    background-image: url("../../public/images/wallpaper.jpg");
  }
</style>