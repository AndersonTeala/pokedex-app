<template>
  <div>
    <!-- <q-card :class="'card-post bg-' + pokemon.color + '-9'"> -->
      <q-card-section v-for="(poke, index) in pokemon.abilities" :key="index">
        <div class="text-h6 text-capitalize text-weight-bolder text-white">{{ poke.ability.name }}</div>
        <div v-for="(en, index) in poke.ability.data.effect_entries" :key="index" class="text-subtitle2">{{ en.effect }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
      </q-card-section>
    <!-- </q-card> -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['pokemon'],
  data () {
    return {}
  },
  mounted(){
    for (let index = 0; index < this.pokemon.abilities.length; index++) {
      this.pokemon.abilities[index].ability.data = this.getAbilities(this.pokemon.abilities[index].ability.url, [index])
    }
    console.log(this.pokemon.abilities)
  },
  methods: {
    getAbilities(url, index){
      axios.get(url)
      .then((res) => {
        this.pokemon.abilities[index].ability.data = res.data
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
