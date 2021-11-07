<template>
  <div>My component</div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ['pokemon'],
  data () {
    return {
      evolu: []
    }
  },
  mounted(){
    this.formatEvolu()
  },
  methods: {
    formatEvolu(){
      this.evolu = [
        {
          name_1: this.pokemon.name,
          image_1: this.pokemon.image
        }
      ]
      if(this.pokemon.evolu_2.legth == 0){
        this.evolu.push({
          name_2: this.pokemon.evolu_3,
          image_2: this.pokemon.evolu_2_image
        })
      }else{
        this.evolu.push({
          name_2: this.pokemon.evolu_3,
          image_2: this.pokemon.evolu_2_image
        })
      }
    }
  }
}
</script>
