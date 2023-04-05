<template>


    <span style="text-align: center"><h1 >MAIN PAGE</h1></span>
    <div class="content" >
      <div class="sourcesContainer">
        <EnergySourcesDashboard :energySources="energySources" />
      </div>
      <div class="loadsContainer">
        <loadsDashboard :loads="loads" @editClick="editClick" @load-change-schedule="handleScheduleSubmitted" @delete-load="deleteLoad" @addNewLoad="addNewLoad"/>
      </div>
    </div>



</template>

<script>
  import LoadsDashboard from '../components/LoadsDashboard';
  import EnergySourcesDashboard from '../components/EnergySourcesDashboard';
  // import axios from 'axios';
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
      this.fetchSources()
      this.fetchLoads()
      this.energySources=[]
      this.loads=[];
      this.fetchSources();
      this.fetchLoads();


    },
    methods:{
      goToSettings(){
        this.$router.push("/settingspage");
      },
      editClick(){
        this.edit =!this.edit
      },
      handleScheduleSubmitted(userSchedule, load){
        console.log(userSchedule.Monday.Start, load.id)
        console.log(load.loadName)

        const url = 'http://localhost:5000/adduserrule';
        const data = {ID: load.id, Schedule: userSchedule};
        console.log(data)

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
              this.fetchLoads();
            })
            .catch((error) => {
              console.error('Error in post:', error);
            });



        // let loadIndex;
        // loadIndex = this.loads.findIndex(item => item.id === load.id)
        // this.loads.splice(loadIndex, 1, load)
      },
      deleteLoad(Identity){
        console.log(Identity)
        const url = 'http://localhost:5000/loads/remove';
        const data = {ID: Identity};
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
              this.fetchLoads();
            })
            .catch((error) => {
              console.error('Error in post:', error);
            });
        },
      addNewLoad(load){

        console.log(load.priority)
        const url = 'http://localhost:5000/loads/add';
        const data = {IP: load.ipAddress , Name: load.loadName , Type: load.loadType, Priority: load.priority, Power: load.powerRequirement};
        // const data = "IP: " + load.ipAddress + ", Name: " +  load.loadName + ", Type: " + load.loadType;
        console.log(data)

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
              this.fetchLoads();
            }).then(data => {
          console.log('Success:', data);
          this.handleScheduleSubmitted(load.userSchedule, this.loads[this.loads.length - 1]);
        })
            .catch((error) => {
              console.error('Error in post:', error);
            });

        console.log(load)
        console.log(load.loadType)
        console.log(load.userSchedule.Monday.Start)
      },


      async fetchSources(){
        const response = await fetch('http://localhost:5000/sources');
        const data = await response.json();
        this.energySources=[];
        let obj;
        for (let i = 0; i < data.length; i++) {

          obj={
              id: '1',
              ipAddress:'192.168.1.10',
              sourceName: 'Battery',
              available:true,
              charge:82

          };
          this.backToFrontSource(data[i], obj);
          this.energySources.push(obj)

        }


      },
      backToFrontSource(backendSource, frontEndSource){
        frontEndSource.sourceName = backendSource.Name;
        frontEndSource.id = backendSource.ID
        // frontEndSource.na = backendSource.Type
        frontEndSource.available = backendSource.CurrentStatus==2?true:false;

      },
      async fetchLoads(){
        const response = await fetch('http://localhost:5000/loads');
        const data = await response.json();
        console.log("I am fetching the loads: ", data)
        this.loads=[]
        var obj
        for (let i = 0; i < data.length; i++) {
          obj={
              id:1,
                  ipAddress:'192.168.1.31',
                  loadName:'Car',
                  powerRequirement:3000,
                  priority:1,
                  state: true,
                  userSchedule:{

                    Monday: { Start: '', End: '' },
                    Tuesday: { Start: '', End: '' },
                    Wednesday: { Start: '', End: '' },
                    Thursday: { Start: '', End: '' },
                    Friday: { Start: '', End: '' },
                    Saturday: { Start: '', End: '' },
                    Sunday: { Start: '', End: '' },
              }

            };
          this.backToFrontLoad(data[i], obj);
          this.loads.push(obj)

        }

      },
      backToFrontLoad(backendLoad, frontendLoad){
        frontendLoad.loadName=backendLoad.Name;
        frontendLoad.id=backendLoad.ID;
        frontendLoad.powerRequirement=backendLoad.Rating.SteadyStatePower;
        // console.log(frontendLoad.powerRequirement)
        frontendLoad.state=backendLoad.CurrentStatus==1?true:false;
        console.log(frontendLoad.state)

      },
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


//name IP type