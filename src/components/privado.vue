<template lang="html">
<div>
  <h2>Introduzca la lista de notas</h2>
  <nav class="navbar navbar-dark bg-primary">
    <a>{{usuario.email}}</a>
    <a @click="desconectar" class="btn btn-danger" >Desconectar</a>
  </nav> 
  <div class="container">
    <div class="row mt-5">
      <div class="col-sm-4">
        <div class="card">
          <div class="car-header">
            Añadir nota
          </div>
          <div class="car-body">
            <form @submit.prevent="introducirNota">
                <div class="form-group">
                   <!-- <input type="text" class="form-control" v-model="nuevaNota.Autor" placeholder="Autor"> -->
                  <input type="text" class="form-control" v-model="nuevaNota.Texto" placeholder="Texto">
                </div>
                <div class="form-group">
                  <input type="file" class="form-control-file" @change="subirFicheros" placeholder="Seleccionar archivo">
                </div>
                 <div class="form-group">
                  <button type="submit" @change="introducirNota" class="btn btn-primary">Añadir</button>
                  </div>
              </form>
          </div>
        </div>

      </div>
      <div class="col-sm-8 text-center">
        <div class="card">
          <div class="card-header">
            Lista tareas
          </div>
          <div class="card-body">
            <table class="table table-stripped table-bordered">
                <tr>
                  <th>Autor</th>
                  <th>Texto</th>
                  <th>Archivo</th>
                  <td>Opciones</td>
                </tr>
                <tr v-for="n in listaNotas" v-bind:key="n.Texto">
                  <td>{{n.Autor}}</td>
                  <td>{{n.Texto}}</td>
                  <td><a :href="n.Archivo['URL']">{{n.Archivo["Nombre"]}}</a></td> 
                  <td><button class="btn btn-danger" @click="borrarNota(n.id)">X</button></td>
                </tr>
            </table>
          </div>
        </div>
      </div>
        

    </div>
  </div>

</div>
  

</template>


<script lang="js">
import  firebase  from 'firebase' 
import { db } from "../db.js";
  export default  {
    name: 'privado',
    props: [],
    mounted () {
    },
    data () {
      return {
        listaNotas:[],
        subirArchivo:null,
        nuevaNota:{
          Autor:'',
          Texto:'',
          Archivo:{
            Nombre:'',
            URL:''
          }
        }, 
      }
    },
    firestore: {
      listaNotas: db.collection('listaNotas'),
      
    },
    methods: {
      subirFicheros: function(event){
        this.subirArchivo=event.target.files[0]
      },
      introducirNota: function () {
        firebase.storage().ref(this.subirArchivo.name).put(this.subirArchivo);
        firebase.storage().ref().child(this.subirArchivo.name).getDownloadURL().then(
          url=>{
            this.subirArchivo.url=url
             db.collection('listaNotas').add({
               Texto: this.nuevaNota.Texto,
               Autor: firebase.auth().currentUser.email ,
               Archivo:{
                 Nombre: this.subirArchivo.name,
                 URL: url
               }
              });
              
            this.nuevaNota.Texto="";
            this.nuevaNota.Autor="";
          });
       
      },
      borrarNota: function(id){
        db.collection('listaNotas').doc(id).delete()
      },
      desconectar: function () {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
      }
      
    },
    computed: {
       usuario:function(){
          return firebase.auth().currentUser;
      } 
    }
}


</script>

<style scoped >
  .privado {

  }
  #boton{
    width: 10%;
  }
  button{
    width: 35%;
  }
  form-group, input{
    margin:1em;
    width: 90%
  }
</style>
