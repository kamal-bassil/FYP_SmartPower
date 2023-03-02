<template>
  <div class="head">
    <h1 > Loads dashboard </h1>
  </div>
  <button :class="{'edit-btn':!edit, 'stop-edit':edit}" @click="editClick">{{ edit? 'Finish':'Edit' }}</button>
  <AddLoadComponent v-if="addLoadPage" @externalDivClick="exitAddLoadPage"/>

  <div :key="load.id" v-for="load in loads">
    <LoadComponent :load="load" :displayDelete="edit" @change-schedule="editSchedule" @delete-load="deleteLoad"/>
  </div>
  <button class="edit-btn" @click="enterAddLoadPage" v-if="edit">Add Load</button>

  <changeSchedule v-if="loadID!==0"  @schedule-submitted="handleScheduleSubmitted" :load="loads[loadID-1]" v-show="loadID!==0" @externalDivClick="exitAddLoadPage"/>
</template>

<script>
import LoadComponent from "./LoadComponent";
import AddLoadComponent from "@/components/AddLoadComponent";
import changeSchedule from "@/components/changeSchedule";


export default {
  name: 'LoadsDashboard',
  props:{
    loads: Array,
  },
  data(){
    return{
      addLoadPage: false,
      edit: false,
      loadID: 0,
    }
  },
  components: {
    AddLoadComponent,
    LoadComponent,
    changeSchedule
  },
  methods:{
    editClick(){
      this.edit=!this.edit
      console.log(this.edit)
      this.$emit('editClick')
    },
    enterAddLoadPage(){
      this.addLoadPage = true
    },
    exitAddLoadPage(){
      this.loadID=0
      this.addLoadPage = false
    },
    editSchedule(ID){
      // console.log(ID)
      // this.$emit('change-schedule', ID)
      this.loadID=ID
    },
    handleScheduleSubmitted(userSchedule, load){
      // console.log(userSchedule)
      // console.log(load.loadName)
      this.exitAddLoadPage()
      this.$emit('load-change-schedule', userSchedule, load)
    },
    deleteLoad(ID){
      this.$emit('delete-load', ID)
    }
  },

}

</script>

<style scoped>
.head{
  display: inline-block;
  position: relative;
  width:80%;
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
.stop-edit{
  background-color: darkred;
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