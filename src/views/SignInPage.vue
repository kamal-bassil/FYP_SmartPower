<template>
  <div class="container">
    <form @submit.prevent="login">
      <h2 class="mb-3">Login</h2>
      <div class="input">
        <label for="email">Email Address</label>
        <input
            class="form-control"
            type="text"
            name="email"
            placeholder="email@adress.com"
            v-model="email"
        />
      </div>
      <div class="input">
        <label for="password">Password</label>
        <input
            class="form-control"
            type="password"
            name="password"
            placeholder="password123"
            v-model="password"
        />
      </div>
      <div class="alternative-option mt-4 ">
        You don't have an account? 
        <router-link to="/SignUpPage">
        <span @click="moveToRegister">Register</span>
        </router-link>
      </div>
      <!--        fix the position of the below button-->
      <button type="submit" class="mt-4 btn-pers " id="login_button" @click="moveToMainPage">
        Login
      </button>

    </form>
  </div>
</template>

<script>
/*import { getAuth, signInWithEmailAndPassword } from "firebase/auth";*/

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login(submitEvent) {
      this.email = submitEvent.target.elements.email.value;
      this.password = submitEvent.target.elements.password.value;

     /* const auth = getAuth();*/
     /* signInWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            /!*this.$router.push("/dashboard");*!/
            console.log(auth, this.email, this.password)
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            /!*watch out for the below in bug testing*!/
            let alert_1 = document.querySelector("#alert_1");
            alert_1.classList.remove("d-none");
            alert_1.innerHTML = errorMessage;
            console.log(alert_1);
          });*/
    },
    moveToRegister() {
      console.log('moveToRegister is called from register button')
      this.$router.push("/signuppage");

    },
    moveToMainPage() {
      console.log('moveToMainPage is called from login')
      console.log(this.email, this.password)
      this.$router.push("/mainpage");
    },
  },
};
</script>
<!--
ADD styling at the bottom of the doc-->
<style scoped>
.container{

  width: 500px;

}
.btn-pers{
  top: 15px;
}
</style>
