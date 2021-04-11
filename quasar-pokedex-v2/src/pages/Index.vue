<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card
      class="my-card"
      v-for="post in pokeName"
			:key="post.pokeName"
      >
        <!-- <img
          :src="pokemonsImages + index + '.svg'"
        /> -->
        <q-card-section>
          <div class="text-subtitle2">name: {{ pokeName }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>

var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

export default {

  name: 'PageIndex',
  data () {
    return {
      index: [],
      pokeName: [],
      pokemons: [],
      pokemonsImages: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/',
      images: [],
    }
  },
  mounted(){
    //this.getPokemon()
    this.pokemonsGet()
  },
  methods: {
    getPokemon(){
      this.$axios.get('https://pokeapi.co/api/v2/pokemon')
      .then((response) => {
        //console.log(response)
        //CAMINHO DOS POKEMONS
        //console.log(response)
        this.pokemons = response.data.results
        console.log(pokemons)
      }).catch((err) => {
        console.log(err)
      })
    },
    pokemonsGet(){
      let id = this.index
      for(let i=0; i<20; i++){
        P.getEvolutionChainById(i)
        .then((response) => {
          //console.log(response)
          this.pokeName = response.chain.species
          this.pokeUrl = response.chain.species.url
          //this.diego = response.id
          console.log(this.pokeName)
          this.$axios.get(this.pokeUrl)
          .then((response) => {
            this.pokeId = response.data.id
            console.log(this.pokeId)
          })
          //console.log(this.pokeUrl)
        })
        .catch((error) => {
          console.log('There was an ERROR: ', error);
        });
      }
    },
  }
}
</script>
<style>
.my-card {
   width: 100%;
  max-width: 100%;
}

.my-card img {
  width: 150px;
}
</style>