<template>
  <div :class="[source.available? 'available' : 'notAvailable','sourceContainer']">
    <div class="disc">
      <h3>{{source.sourceName}}</h3>
    </div>
    <div class="disc">
      <h3>state: {{source.state? 'ON' : 'OFF'}}</h3>
    </div>
    <div class="disc">
      <h3>{{source.sourceName==='Battery' ? ('charge: ' + source.charge + '%') : ''}}</h3>
    </div>
  </div>

</template>

<!--disc has no meaning, I put it so as a description for now-->

<script>
export default {
  name: 'EnergySource',
  props:{
    source: Object,
  },
}
</script>

<style scoped>
.sourceContainer{
  margin: 2px;
  padding: 4px;
}
.available{
  border: 3px outset green;
}
.notAvailable{
  border: 3px outset red;
}
.disc{
  width: 30%;
  display: inline-block;

}
</style>