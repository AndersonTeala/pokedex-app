<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card
      class="my-card bg-"
      v-for="(pokemons, index) in pokemons"
			:key="++ index"
      >
        <img
          :src="pokemonsImages + index + '.svg'"
        />
        <q-card-section>
          <div class="text-subtitle2">{{ pokemons.name }}</div>
          <div class="text-subtitle2">#{{ index }}</div>
          <div class="text-subtitle2">Color: {{ species + index }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>

export default {

  name: 'PageIndex',
  data () {
    return {
      index: [],
      pokemons: [],
      colorUrl: [],
      species: 'https://pokeapi.co/api/v2/pokemon-species/',
      pokemonsImages: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/',
      images: [],
    }
  },
  mounted(){
    this.getPokemon()
    this.getColor()
  },
  methods: {
    getPokemon(){
      this.$axios.get('https://pokeapi.co/api/v2/pokemon')
      .then((response) => {
        //console.log(response)
        //CAMINHO DOS POKEMONS
        this.pokemons = response.data.results
        //console.log(this.pokemons)
      }).catch((err) => {
        console.log(err)
      })
    },
    getColor(){
      this.$axios.get(this.species + this.index)
      .then((response) => {
        //this.color =
        this.colorUrl = response.data.results
        console.log(this.colorUrl)
      }).catch((error) => {
        console.log(error)
      })
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