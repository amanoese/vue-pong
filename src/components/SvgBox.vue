<template>
  <rect :x="rectX" :y="rectY" :width="width" :height="height" :fill="color"  stroke-width="0"/>
</template>

<script>
export default {
  props: {
    x      : Number,
    y      : Number,
    width  : Number,
    height : Number,
    color  : { type: String , default : 'white'}
  },
  computed : {
    widthHerf() {
      return this.width / 2
    },
    heightHerf() {
      return this.height / 2
    },
    rectX(){
      return this.x - this.widthHerf
    },
    rectY(){
      return this.y - this.heightHerf
    }
  }
}
</script>
