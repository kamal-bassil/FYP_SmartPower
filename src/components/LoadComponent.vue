<template>
  <div :class="[load.state? 'ON' : 'OFF','loadContainer']">
    <div class="disc">
      <h3>{{load.loadName}}</h3>
    </div>
    <div class="disc" >
      <p>Expected start: {{load.userSchedule.Thursday.Start}}</p>
      <p>Expected finish: {{load.userSchedule.Thursday.End}}</p>
      <button class="edit-btn" @click="changeSchedule" v-show="displayDelete">Change Schedule</button>
    </div>
    <div class="disc">
      <h3>load priority: {{load.priority}}</h3>
    </div>
    <button class="delete-button" @click="deleteLoad" v-if="displayDelete">
      <font-awesome-icon icon="times" />
    </button>
  </div>

</template>


<script>

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTimes)


export default {
  components: {
    FontAwesomeIcon
  },
  name: 'LoadComponent',
  props:{
    load: Object,
    displayDelete: Boolean

  },
  methods:{
    deleteLoad(){
      console.log(this.load.loadName, 'wants to be deleted')
      console.log(this.load.id, 'wants to be deleted')
      if (window.confirm('Are you sure you want to delete this load?')) {
        // User clicked OK, proceed with delete operation
        this.$emit('delete-load', this.load.id)
      }

    },
    changeSchedule(){
      this.$emit('change-schedule', this.load.id)
    }
  }

}
</script>

<style scoped>
.loadContainer{
  margin: 2px;
  padding: 4px;
}
.ON{
  border: 3px outset green;
}
.OFF{
  border: 3px outset grey;
}
.disc{
  width: 30%;
  display: inline-block;

}
.delete-button {
  position: ;
  top: 10px;
  right: 10px;
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #ff3333;
}
.edit-btn{

  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  border-radius: 25px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;

}
</style>