<template>


    <span style="text-align: center"><h1 >MAIN PAGE</h1></span>
    <div class="content" >
      <div class="sourcesContainer">
        <EnergySourcesDashboard :energySources="energySources" />
      </div>
      <div class="loadsContainer">
        <loadsDashboard :loads="loads" @editClick="this.edit=!this.edit" @load-change-schedule="handleScheduleSubmitted" @delete-load="deleteLoad"/>
      </div>
    </div>



</template>

<script>
  import LoadsDashboard from '../components/LoadsDashboard';
  import EnergySourcesDashboard from '../components/EnergySourcesDashboard';

  export default{
    name: 'MainPage',
    components:{
      LoadsDashboard,
      EnergySourcesDashboard,
    },
    data() {
      return {
        energySources: [],
        loads: [],
        edit: false,
        changeSchedule:false,
      }
    },
    created(){
      this.energySources=[{
        id: 1,
        sourceName: 'Battery',
        available:true,
        state:true,
        charge:82
      },
        {
          id: 2,
          sourceName: 'Solar',
          available:true,
          state:true,
        },
        {
          id: 3,
          sourceName: 'EDL',
          available:true,
          state:false
        },
        {
          id: 4,
          sourceName: 'Subscription generator',
          available:false,
          state:false
        }
      ];
      this.loads=[
          {
        id:1,
        loadName:'Car',
        powerRequirement:3000,
        priority:1,
        schedule:{

          Monday: { start: '12:00', end: '14:00' },
          Tuesday: { start: '', end: '' },
          Wednesday: { start: '', end: '' },
          Thursday: { start: '12:00', end: '14:00' },
          Friday: { start: '', end: '' },
          Saturday: { start: '', end: '' },
          Sunday: { start: '', end: '' },
        }
      },
        {
          id:2,
          loadName:'Hot water',
          powerRequirement:4000,
          priority:1,
          state:false,
          scheduled: new Date(2022,10,18,14,0,0,0),
          schedule:{

            Monday: { start: '', end: '' },
            Tuesday: { start: '', end: '' },
            Wednesday: { start: '', end: '' },
            Thursday: { start: '', end: '' },
            Friday: { start: '', end: '' },
            Saturday: { start: '', end: '' },
            Sunday: { start: '', end: '' },
          }
        },
        {
          id:3,
          loadName:'AC',
          powerRequirement:3500,
          priority:2,
          state:false,
          scheduled: new Date(2022,10,18,18,0,0,0),
          schedule:{

            Monday: { start: '', end: '' },
            Tuesday: { start: '', end: '' },
            Wednesday: { start: '', end: '' },
            Thursday: { start: '', end: '' },
            Friday: { start: '', end: '' },
            Saturday: { start: '', end: '' },
            Sunday: { start: '', end: '' },
          }
        },
        {
          id:4,
          loadName:'Laundry',
          powerRequirement:500,
          priority:3,
          state:false,
          scheduled: new Date(2022,10,18,20,0,0,0),
          schedule:{

            Monday: { start: '', end: '' },
            Tuesday: { start: '', end: '' },
            Wednesday: { start: '', end: '' },
            Thursday: { start: '', end: '' },
            Friday: { start: '', end: '' },
            Saturday: { start: '', end: '' },
            Sunday: { start: '', end: '' },
          }
        },
      ];
    },
    methods:{
      goToSettings(){
        this.$router.push("/settingspage");
      },
      handleScheduleSubmitted(userSchedule, load){
        console.log(userSchedule)
        console.log(load.loadName)
        let loadIndex;
        loadIndex = this.loads.findIndex(item => item.id === load.id)
        this.loads.splice(loadIndex, 1, load)
      },
      deleteLoad(ID){
        let indexToDelete;
        indexToDelete = this.loads.findIndex(obj => obj.id === ID);
        if (indexToDelete !== -1) {
          this.loads.splice(indexToDelete, 1);
        }
      }
    },
  }
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;
}

.sourcesContainer{

  width: 40%;
  display: inline-block;
}
.loadsContainer{
  position:sticky;
  vertical-align: top;
  width: 40%;
  display: inline-block;
}
.content{
  display: flex;
  justify-content: center;
}
.content p {
  margin: 0 10px; /* Add margin between the items */
}

</style>