<template>
  <q-page class="flex flex-center">
    <div class="row q-pa-md justify-center">
			<div class="row row-sm-8 justify-center q-gutter-sm">
        <q-card
        style="width: 150px;"
        class="card-post q-mb-md"
        flat bordered
        v-for="(pokemons, index) in pokemons"
        :key="++ index"
        >
          <img
            style="height: 200px;"
            :src="pokemonsImages + index + '.svg'"
          />
          <q-card-section>
            <div class="text-subtitle2">{{ pokemons.name }}</div>
            <div class="text-subtitle2">#{{ index }}</div>
          </q-card-section>
        </q-card>
      </div>
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

}
</style>