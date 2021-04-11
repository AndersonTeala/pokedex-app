<template>
  <q-page padding>
      <q-input
        class="bg-yellow"
        v-model="busca"
        debounce="500"
        filled
        placeholder="Pesquisar pokemon"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div class="col">
        <div v-for="(poke, index) in resultadoBusca" :key="poke.url" >
          <Pokemon :name="poke.name" :url="poke.url" :num="index+1"/>
        </div>
      </div>
  </q-page>
</template>

<script>
import Pokemon from '../components/Pokemon.vue'

//import Pokemon from './components/Pokemon'

export default {
  components: { Pokemon },

  name: 'PageIndex',
  data () {
    return {
      pokemons: [],
      busca: ''
    }
  },
  mounted(){
    this.getPokemon()
  },
  methods: {
    getPokemon(){
      this.$axios.get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
      .then((response) => {
        //console.log(response)
        this.pokemons = response.data.results
      }).catch((err) => {
        console.log(err)
      })
    },
  },
  computed: {
    resultadoBusca() {
      if(this.busca == '' || this.busca == ' '){
        return this.pokemons
      }else{
        return this.pokemons.filter(pokemon => pokemon.name == this.busca)
      }
    }
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