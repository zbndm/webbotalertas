<template>
<head>
  <meta name="viewport" content= "width=device-width, user-scalable=no">
  <meta name="google" content="notranslate">
</head>

  <section v-if="isInBot" id="contenido">
    <CargandoBot v-if="!isLoadding" :nombre="Nombre" :error="this.error"/>
    <div v-if="isLoadding" class="tamañocompleto">
      <SolicitarAcceso :user="user" :timeSolicitud="timeSolicitud" v-if="!user || user.status_user === 'pending' || user.status_user === 'deny'"/>
      <div v-if="user && user.status_user === 'active'">
          <router-view />
      </div>
      <div class="tamañocompleto" id="baneado" v-else-if="user && user.status_user === 'banned'">
        <div>
      <h2>Estás Baneado 🚫</h2>
      <p>Lo sentimos, parece que los administradores te han baneado de las alertas</p>
      </div>
       <img id="banned-logo" src="./assets/banned.svg" alt="">
      </div>
     
     
      <!-- Final -->
    </div>
  </section>
  <section v-else >
    <h2>Alertas Tráfico TNF</h2>
    <p>Este espacio web está reservado para el BOT de Alertas de tráfico del grupo Alertas Tráfico TNF </p>
    <p>Para ir al bot -> <a href="https://t.me/Alertastnf_bot">Alertastnf_bot</a></p>
  </section>
</template>
<script>

import CargandoBot from './components/CargandoBot.vue';
import SolicitarAcceso from './components/SolicitarAcceso.vue'
export default {
 components: {
    CargandoBot,
    SolicitarAcceso
    },
   
data() {
    return {
      Nombre: '',
      web_status: false,
      user: Object,
      isInBot: false,
      timeSolicitud: false,
      error: false,
     isLoadding: false,
     cookie: ''
     
    };
  },
 async mounted() {

  window.Telegram.WebApp.MainButton.hide()
    window.Telegram.WebApp.BackButton.hide()
  
 //Se abrió en el bot? Comprobar que hay datos de usuario
if(window.Telegram.WebApp.initDataUnsafe.user){
 
  this.isInBot = true
   //Obtener datos bot de la API
      this.Nombre = window.Telegram.WebApp.initDataUnsafe.user.first_name

  
   
   let params = {

    WebAppData: window.Telegram.WebApp.initData
   }
    

  
   let ip = `${process.env.VUE_APP_IP}/comprobarusuario`
 
  try {
   const request = await fetch(ip, {
    method: "POST",
    body: JSON.stringify(params),
    headers:{
      "Content-type": "application/json"
    }
   })
  let respuesta = await request.json()
  this.$store.commit('setPublicarAlertas', respuesta.web_status)
  this.web_status = respuesta.web_status
  this.user = respuesta.user
  this.$store.commit('setUser', respuesta.user)
  if(!this.user){
    this.timeSolicitud = true
  
  }else{
          
        let fecha = new Date(this.user.Date_request)
        let fechahoy = new Date()
        let milisegundosDia  = 24*60*60*1000;
        let milisegundostranscurridos = Math.abs(fecha.getTime() - fechahoy.getTime())
        let diatransc = Math.round(milisegundostranscurridos/milisegundosDia)
        if(diatransc != 0){
          this.timeSolicitud = true
        
        }

  }
 
if(request.status == 200){
this.isLoadding = true
}

  } catch (error) {
    window.Telegram.WebApp.showAlert('Puede que haya algun problema con los servidores, vuelve a reiniciar el bot, si el problema persiste consulte con un administrador')

  }
  }
 
 }

}
  

</script>
<style lang="scss">

.tamañocompleto{
  
  height: 100%;
}
#baneado{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  align-items: center;
}
#banned-logo{
  width: 60%;
}
 .error{
  color: rgb(139, 16, 16);
 }
#contenido {
 height:  var(--tg-viewport-height);
}
#app {
  
  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
  color: var(--tg-theme-text-color);
  height: 100%;
}
h2{
  width: 100%;
}
body{
 
    background-color: var(--tg-theme-bg-color);
    margin: 0;
    padding: 0;
    width: 1px;
    min-width: 100%;
}

 a {
    font-weight: bold;
    text-decoration: none;
     color: var(--tg-theme-link-color);

    &.router-link-exact-active {
      color: var(--tg-theme-link-color);
    }
  }


</style>
