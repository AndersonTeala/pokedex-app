<template padding>
    <div class="row q-pa-sm">
      <div class="col">
          <q-card
            class="card-post q-ma-sm"
            >
            <img
              style="height: 150px; width: 150px"
              :src="pokemon.image"
            />
          <q-card-section class="col q-pa-sm">
            <div># {{ pokemon.id }}</div>
            <div class="text-capitalize">Nome: {{ name }}</div>
            <div class="text-capitalize">Tipo: {{ pokemon.type }}</div>
          </q-card-section>
          </q-card>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      pokemon: {
        id: '',
        type: '',
        image: '',
        species: '',
      },
    }
  },
  created() {
    axios.get(this.url)
    .then((response) => {
      this.pokemon.id = response.data.id
      this.pokemon.type = response.data.types[0].type.name
      this.pokemon.image =  response.data.sprites.other['official-artwork'].front_default
      this.pokemon.species =  response.data.species.url
      //console.log(this.pokemon)
    })
    axios.get(this.pokemon.species)
    .then((res) => {
      //console.log(res)
    }).catch((error) => {
      console.log(error)
    })
  },
  props: {
    num: Number,
    name: String,
    url: String,
  },
}
</script>