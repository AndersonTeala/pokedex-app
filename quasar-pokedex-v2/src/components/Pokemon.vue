<template padding>
<div>
  <q-card
    :class="'card-post bg-' + pokemon.color"
    @click="test(pokemon)"
  >
    <img
      style="height: 160px; width: 160px"
      :src="pokemon.image"
    />
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
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-btn size="md" dense flat icon="arrow_back" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Pokemon</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Dados pokemon
        </q-card-section>
      </q-card>
    </q-dialog>
</div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['url', 'num', 'name'],
  data(){
    return {
      pokemon: {
        id: '',
        type: '',
        image: '',
        species: '',
        color: '',
        name: this.name
      },
      dialog: false,
      maximizedToggle: true
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
      // console.log(this.pokemon.stats)
    })
    //
  },
  methods: {
    getSpecies(url){
      axios.get(url)
      .then((res) => {
        this.pokemon.color = res.data.color.name
      })
    },
    test(pokemon){
      this.dialog = true
      console.log(pokemon)
    }
  }
}
</script>