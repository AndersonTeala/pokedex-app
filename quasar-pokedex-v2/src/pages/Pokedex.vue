<template>
  <q-page padding style="background-color: #282a36">
      <q-input
        class="bg-yellow"
        v-model="busca"
        debounce="500"
        filled
        placeholder="Pesquisar pokemon"
        @input="resultadoBusca"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div class="row justify-center items-center text-center q-col-gutter-sm q-mt-sm">
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6" v-for="(poke, index) in resultadoBusca" :key="poke.url" >
          <Pokemon :name="poke.name" :url="poke.url" :num="index+1"/>
        </div>
      </div>
      <div class="q-pa-md">
        <q-btn-group spread>
          <q-btn :disabled="previous === null" color="yellow-10" label="Voltar" icon="arrow_back" @click="nextPrevious('previous')" />
          <q-btn color="red-10" label="Próximo" icon="arrow_forward" @click="nextPrevious('next')" />
        </q-btn-group>
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
      busca: '',
      next: null,
      previous: null
    }
  },
  mounted(){
    this.getPokemon('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
  },
  methods: {
    getPokemon(url){
      this.$axios.get(url)
      .then((response) => {
        // this.pokemons = []
        this.pokemons = response.data.results
        this.next = response.data.next
        this.previous = response.data.previous
        // console.log(this.pokemons)
      }).catch((err) => {
        // console.log(err)
      })
    },
    nextPrevious(get){
      if(get === 'next'){
        this.getPokemon(this.next)
        window.scrollTo(0, 0);
        this.busca = ''
      }else{
        this.getPokemon(this.previous)
        window.scrollTo(0, 0);
        this.busca = ''
      }
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