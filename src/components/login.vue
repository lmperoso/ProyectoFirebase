<template lang="html">

  <section class="login">
      <h2>Firebase</h2>
     <div class="row mt-5">
       <div class="col-sm-4">
      </div>
       <div class="col-sm-4">
        <div class="card">
          <div class="car-header"><br>
           <h3>Registrate</h3>
          </div>
          <div class="car-body">
              <form>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="email"
                  placeholder="Email" >
                </div>
                <div class="form-group">
                  <input  type="password"  class="form-control" v-model="password"
                  placeholder="password" >
                </div>
                <div class="form-group">
                  <button class="form-control btn btn-primary"
                  v-on:click="login"
                  >Entrar</button><br><br>

                   <p><router-link to="/registro">
                   Registrar
                  </router-link></p>
                </div>
                <section id="iconos" ></section>
                

              </form>
          </div>
        </div>

      </div>
      <div class="col-sm-4">
      </div>
     </div>
  </section>

</template>


<script lang="js">
import firebase from 'firebase';
var firebaseui = require('firebaseui');
  export default  {
    name: 'login',
    props: [],
    mounted () {
       let ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(firebase.auth());
      }
        var uiConfig = {
            signInSuccessUrl: "/privado",
            signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            /* firebase.auth.GoogleAuthProvider.PROVIDER_ID */]
        };
        ui.start("#iconos", uiConfig)
  

    },
    data () {
      return {
        email: "",
        password: ""
      }
    },
    methods: {
          login () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
          this.$router.replace('privado')
        }).catch((err) => {
          alert(err.message)
        })
      },
 

    },
    computed: {

    }
}


</script>

<style scoped >
  .login {

  }
   form-group, input{
    margin:1em;
    width: 90%
  }
   button{
    width: 35%;
  }
  #iconos{
    width:90%;
    height: 50%;
  }
 
</style>
