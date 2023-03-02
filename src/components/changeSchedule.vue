<template>
  <div class="overlay" @click="this.$emit('externalDivClick')">
    <div class="addLoad-container" @click.stop>

      <div class="header">
        <h1>Change Load Schedule {{load.id}}</h1>

      </div>
      <form @submit.prevent>
        <div class="form-input">
          <div class="weekdays">
            <button v-for="day in days" :key="day" @click="selectedDay = day" :class="{ 'weekdays__day--active': day === selectedDay }">{{ day }}</button>
          </div>
<!--          v-for="day in days" :key="day" v-show="day === selectedDay"-->
          <div :v-show="selectedDay!==''">



            <div v-for="day in days" :key="day" v-show="day === selectedDay">
              <h2>{{ day }}</h2>
              <div>
                <label for="start-time">Start time:</label>
                <input type="time" id="start-time" v-model="userSchedule[day].start">
              </div>
              <div>
                <label for="end-time">End time:</label>
                <input type="time" id="end-time" v-model="userSchedule[day].end">
              </div>
            </div>


<!--
            <div>
              <label for="start-time">Start time:</label>
              <input type="time" id="start-time" v-if="selectedDay!==''"  :v-model="userSchedule[selectedDay].start">
            </div>
            <div>
              <label for="end-time">End time:</label>
              <input type="time" id="end-time"  v-if="selectedDay!==''" :v-model="userSchedule[selectedDay].end">
            </div>-->


          </div>
        </div>


        <button class="submit-button"  type="submit" @click="handleClick">Submit Schedule</button>
      </form>
  </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      selectedDay: '',
      userSchedule: {
        Monday: { start: '', end: '' },
        Tuesday: { start: '', end: '' },
        Wednesday: { start: '', end: '' },
        Thursday: { start: '', end: '' },
        Friday: { start: '', end: '' },
        Saturday: { start: '', end: '' },
        Sunday: { start: '', end: '' },
      }

    }
  },
  name: "changeSchedule",
  methods: {
    handleClick() {
    this.$emit('schedule-submitted', this.userSchedule, this.load)
      // Add your custom logic here

    },

  },
  props:{
    load:{
      type: Object,
      required:true
    }

  },
  created(){
    this.userSchedule=this.load.schedule

  }

}

</script>


<style scoped>

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.addLoad-container {
  position: absolute;
  width: 60%;
  height: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  z-index: 9999;
}
.form-input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;
}
.submit-button {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}
.weekdays {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.weekdays__day--active {
  background-color: #007aff;
  color: #fff;
}

.weekdays button {
  padding: 10px;
  border: none;
  background-color: #fff;
  color: #007aff;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
}

.weekdays button:hover:not(.weekdays__day--active) {
  background-color: #ddd;
}
</style>