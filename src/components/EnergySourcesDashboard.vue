<template>

  <h1> Sources dashboard </h1>
  <div :key="energySource.id" v-for="energySource in energySources">
    <EnergySource :source="energySource"/>
  </div>

</template>

<script>
import EnergySource from "@/components/EnergySource";
export default {
  name: 'EnergySourcesDashboard',
  components: {EnergySource},
  props:{
    energySources: Array,
  },
}
</script>