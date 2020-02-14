<template lang="html">

  <section class="registro">
     <div class="row mt-5">
       <div class="col-sm-4">
      </div>
      <div class="col-sm-4">
        <div class="card">
           <div class="car-header">
           <h3>Registrate</h3> <hr>
          </div>
    <form @submit.prevent="signup">
                <div class="form-group">
                  <input type="text" class="form-control" v-model="email" placeholder="Email">
                </div>
                <div class="form-group">
                  <input type="password" class="form-control" v-model="password" placeholder="Password">
                </div>
                 <div class="form-group">
                  <button type="submit" class="btn btn-primary">Registrar</button>
                  </div>
    </form>
    </div>
      </div>
      <div class="col-sm-4">
      </div>
    </div>
    
  </section>

</template>

<script lang="js">
 import  firebase  from 'firebase'
  export default  {
    name: 'registro',
    props: [],
    mounted () {
    },
    data () {
      return {
        email:"",
        password:""
      }
    },
    methods: {
      signup () {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() => {
          this.email=""
          this.password=""
          this.$router.replace('login')
        }).catch((err) => {
          alert(err.message)
        })
      }
    },
    computed: {
    }
}
</script>

<style scoped >
  .registro {
  }
  button{
    width: 35%;
  }
  input{
    width: 80%;
    margin-top: 2rem;
    margin-left: 3rem;
  }
  .car-header{
    margin-top: 2rem;
    
  }
</style>