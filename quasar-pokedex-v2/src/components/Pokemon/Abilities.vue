<template>
  <div>
    <q-card-section v-for="(poke, index) in pokemon.abilities" :key="index">
      <div class="text-h6 text-capitalize text-weight-bolder text-white">{{ poke.ability.name }}</div>
      <div v-for="(en, index) in poke" :key="index" class="text-subtitle2">
        <div v-for="(pot, index) in en.data" :key="index">
          <div v-for="(fex, index) in pot" :key="index">
            <div class="text-subtitle2">{{ fex.effect }}</div>
            <div class="text-subtitle2">{{ fex.short_effect }}</div>
          </div>
        </div>
      </div>
    </q-card-section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['pokemon'],
  data () {
    return {
      mode: false
    }
  },
  mounted(){
    this.ab()
  },
  methods: {
    ab(){
      for (let index = 0; index < this.pokemon.abilities.length; index++) {
        this.pokemon.abilities[index].ability.data = this.getAbilities(this.pokemon.abilities[index].ability.url, [index])
      }
    },
    getAbilities(url, index){
      axios.get(url)
      .then((res) => {
        this.pokemon.abilities[index].ability.data = res.data
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        // this.mode = true
      })
    }
  }
}
</script>
