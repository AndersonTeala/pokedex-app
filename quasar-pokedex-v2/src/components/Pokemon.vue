<template padding>
<div>
  <q-card
    :class="'card-post bg-' + pokemon.color"
    @click="test(pokemon)"
  >
    <q-card-section class="col q-pa-sm">
      <img
        style="width: 160px"
        :src="pokemon.image"
    />
    </q-card-section>
    <q-card-section class="col q-pa-sm">
      <div class="text-capitalize text-white">{{ name }}</div>
    </q-card-section>
  </q-card>
  <q-dialog
    v-model="dialog"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card :class="'bg-' + pokemon.color + '-12 text-white'">
      <q-bar>
        <q-btn size="md" dense flat icon="arrow_back" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="text-h6 text-weight-bolder">#{{ pokemon.order }}</div>
        <div class="text-h4 text-capitalize text-weight-bolder">{{ name }}</div>
      </q-card-section>


      <q-card-section class="row justify-center">
        <img
          style="width: 280px"
          :src="pokemon.image"
        />
      </q-card-section>

      <q-card-section class="row justify-center">
        <q-chip class="text-capitalize text-weight-bolder text-white" size="15px" :color="pokemon.color + '-9'" v-for="(type, index) in pokemon.type" :key="index" >{{ type.type.name }}</q-chip>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-h6 text-capitalize text-weight-bolder">Dados Pokemon</div>
      </q-card-section>

      <!-- TABS/STATS/HABILITY/EVOLUTION -->
      <q-card-section class="q-pt-none">
        <q-tabs
          v-model="tab"
          indicator-color="dark"
         :class="'bg-' + pokemon.color + '-9 text-white'"
        >
          <q-tab name="stats" icon="catching_pokemon" label="Status" />
          <q-tab name="hab" icon="catching_pokemon" label="Habilidades" />
          <!-- <q-tab name="evo" icon="catching_pokemon" label="Evolução" /> -->
        </q-tabs>
      </q-card-section>

      <!-- TABS PANELS -->
      <q-card-section class="q-pa-none">
        <q-tab-panels v-model="tab" animated>
          <!-- TAB STATS -->
          <q-tab-panel :class="'bg-' + pokemon.color + '-9'" name="stats">
            <Stats
              :pokemon="pokemon"/>
          </q-tab-panel>
          <!-- TAB HAB -->
          <q-tab-panel :class="'bg-' + pokemon.color + '-9'" name="hab">
            <Abilities
              :pokemon="pokemon"/>
          </q-tab-panel>
          <!-- TAB EVO -->
          <!-- <q-tab-panel :class="'bg-' + pokemon.color + '-9'" name="evo">
            <Evolu
              :pokemon="pokemon"/>
          </q-tab-panel> -->
        </q-tab-panels>
      </q-card-section>

    </q-card>
  </q-dialog>
</div>
</template>

<script>
import axios from 'axios'
import Stats from 'components/Pokemon/Stats'
import Abilities from 'components/Pokemon/Abilities'
import Evolu from 'components/Pokemon/Evolu'
export default {
  props: ['url', 'num', 'name'],
  components: {
    Stats,
    Abilities,
    Evolu
  },
  data(){
    return {
      pokemon: {
        id: null,
        type: '',
        image: '',
        species: '',
        color: '',
        name: this.name,
        order: null,
        type: [],
        evolu_1: '',
        evolu_2: '',
        evolu_1_image: '',
        evolu_2_image: ''
      },
      dialog: false,
      maximizedToggle: true,
      tab: 'stats'
    }
  },
  created() {
    axios.get(this.url)
    .then((response) => {
      this.pokemon.id = response.data.id
      this.pokemon.type = response.data.types[0].type.name
      // this.pokemon.image =  response.data.sprites.other.home.front_default
      this.pokemon.image =  response.data.sprites.other['official-artwork'].front_default
      this.getSpecies(response.data.species.url)
      this.pokemon.stats = response.data.stats
      this.pokemon.order = response.data.order
      this.pokemon.type = response.data.types
      this.pokemon.abilities = response.data.abilities
      if(this.pokemon.order == 1){
        // console.log(response)
      }
    })
    //
  },
  methods: {
    getSpecies(url){
      axios.get(url)
      .then((res) => {
        switch (res.data.color.name) {
          case 'white':
            this.pokemon.color = 'blue'
            break;
          case 'yellow':
            this.pokemon.color = 'orange'
            break;
          case 'gray':
            this.pokemon.color = 'blue-grey'
            break;
          default:
            this.pokemon.color = res.data.color.name
            break;
        }
        // this.getEvolution(res.data.evolution_chain.url)
        if(this.pokemon.order == 1){
          // console.log(res)
        }
      })
    },
    getEvolution(url){
      axios.get(url)
      .then((res) => {
        this.pokemon.evolu = res.data
        if(res.data.chain.evolves_to.length > 0){
          this.pokemon.evolu_2 = res.data.chain.evolves_to[0].species.name
          this.pokemon.evolu_3 = res.data.chain.evolves_to[0].evolves_to[0].species.name
        }
        this.pokemon.evolu_2_image = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
        let lhu = this.pokemon.image.replace('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/', '')
        let lhu_2 = lhu.replace('.png', '')
        this.pokemon.evolu_2_image = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + (parseInt(lhu_2) + parseInt(1)) +'.png'
        this.pokemon.evolu_3_image = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + (parseInt(lhu_2) + parseInt(2)) +'.png'
        if(this.pokemon.order == 2){
          // console.log(this.pokemon)
        }
      })
    },
    test(pokemon){
      this.dialog = true
    }
  }
}
</script>