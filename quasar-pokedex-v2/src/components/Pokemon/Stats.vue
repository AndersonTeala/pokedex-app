<template>
  <div>
    <q-card-section v-for="(stats, index) in pokemon.stats" :key="index" class="q-pt-none">
      <q-linear-progress rounded size="30px" :value="valueProgress(stats.base_stat)" class="bg-dark" :color="colorProgress(stats.stat.name)">
        <div class="absolute-full flex flex-center">
          <q-badge color="white" text-color="dark" :label="valueName(stats.stat.name) + ' ' + progressLabel(stats.base_stat)" />
        </div>
      </q-linear-progress>
    </q-card-section>
  </div>
</template>

<script>
export default {
  props: ['pokemon'],
  data () {
    return {
      //
    }
  },
  methods: {
    progressLabel(base){
      let y = parseInt(0)
      let p = parseInt(base)
      return ((y + '.' + p) * 100).toFixed(2) + '%'
    },
    valueProgress(base){
      let y = parseInt(0)
      let p = parseInt(base)
      return parseFloat(y + '.' + p)
    },
    valueName(base){
      switch (base) {
        case 'hp':
          return 'HP'
        break;

        case 'attack':
          return 'ATK'
        break;

        case 'defense':
          return 'DEF'
        break;

        case 'special-attack':
          return 'SPA'
        break;

        case 'special-defense':
          return 'SPD'
        break;

        case 'speed':
          return 'VEL'
        break;

        default:
          return base
        break;
      }
    },
    colorProgress(base){
      switch (base) {
        case 'hp':
          return 'red'
        break;
        case 'attack':
          return 'yellow'
        break;
        case 'defense':
          return 'blue'
        break;
        case 'special-attack':
          return 'indigo-6'
        break;
        case 'special-defense':
          return 'green'
        break;
        case 'speed':
          return 'orange'
        break;
        default:
          return base
        break;
      }
    }
  }
}
</script>
