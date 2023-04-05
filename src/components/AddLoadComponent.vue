<template>

  <div class="overlay" @click="this.$emit('externalDivClick')">
    <div class="addLoad-container" @click.stop>

      <div class="header">
        <h1>Add Load Device</h1>
      </div>

      <form class="form-container" @submit.prevent>
        <div class="form-input">
          <label for="ip-address">IP Address</label>
          <input type="text" id="ip-address" v-model="ipAddress" required pattern="\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}" placeholder="e.g., 192.168.1.34">
        </div>

        <div class="form-input">
          <label for="load-name">Load Name</label>
          <input type="text" id="load-name" v-model="loadName" required>
        </div>

        <div class="form-input">
          <label for="load-priority">Load priority:</label>
          <select id="load-priority" v-model="priority">
            <option value="1">Priority 1</option>
            <option value="2">Priority 2</option>
            <option value="3">Priority 3</option>
          </select>
        </div>

        <div class="form-input">
          <label for="power-usage">Power Usage (W)</label>
          <input type="number" id="power-usage" v-model="powerRequirement" required>
        </div>

        <div class="form-input">
          <label for="loadType">Select your load type:</label>
          <select id="loadType" v-model="loadType" class="form-control">
            <option value="1">Heater</option>
            <option value="2">Water Heater</option>
            <option value="3">AC</option>
            <option value="4">Electric Car</option>
          </select>
        </div>


        <div class="form-input">
          <label for="expected-time-on">Expected Time On</label>
          <div class="weekdays">
            <button v-for="day in days" :key="day" @click="selectedDay = day" :class="{ 'weekdays__day--active': day === selectedDay }">{{ day }}</button>
          </div>
          <div v-for="day in days" :key="day" v-show="day === selectedDay">
            <h2>{{ day }}</h2>
            <div>
              <label for="start-time">Start time:</label>
              <input type="time" id="start-time" v-model="userSchedule[day].Start">
            </div>
            <div>
              <label for="end-time">End time:</label>
              <input type="time" id="end-time" v-model="userSchedule[day].End">
            </div>
          </div>
        </div>


        <button :class="{'submit-button':isFormReady, 'disabled-button':!isFormReady}"  type="submit" :disabled="!isFormReady" @click="handleClick">Submit</button>
      </form>



    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      ipAddress: '',
      loadName: '',
      loadType: 0,
      powerRequirement: null,
      priority: null,
      userSchedule: {
        Monday: { Start: '', End: '' },
        Tuesday: { Start: '', End: '' },
        Wednesday: { Start: '', End: '' },
        Thursday: { Start: '', End: '' },
        Friday: { Start: '', End: '' },
        Saturday: { Start: '', End: '' },
        Sunday: { Start: '', End: '' },
      },

      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      selectedDay: null,
    }
  },
  name: "AddLoadComponent",
  methods: {
    handleClick() {
      console.log('Button clicked');
      console.log(this.userSchedule.Monday.Start, typeof this.userSchedule.Monday.Start);
      let newLoad = {
        id: null,
        ipAddress: this.ipAddress,
        loadName: this.loadName,
        powerRequirement: this.powerRequirement,
        priority: this.priority,
        state: false,
        userSchedule: this.userSchedule,
        loadType: this.loadType
      }
      this.$emit('addLoad', newLoad)
      this.$emit('externalDivClick')
      // Add your custom logic here

    },

  },
  computed:{
    isFormReady() {
      return  (this.ipAddress!=='') && (this.loadName!=='')   && (this.powerRequirement!==null) && (this.priority!==null) && (this.loadType!==0)
    }
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
.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}


/* Style for form input fields */
.form-input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;
}


/* Style for submit button */
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
.disabled-button{
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: grey;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.header {
  background-color: #2980b9;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
}

.header h1 {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.submit-button:hover {
  background-color: #3e8e41;
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

h2 {
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
}

input[type="time"] {
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  color: #555;
  background-color: #fff;
  cursor: pointer;
}
</style>