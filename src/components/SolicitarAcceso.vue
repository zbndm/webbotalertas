<template>
<p class="error">{{error}}</p>
<section v-if="user && user.status_user === 'deny'">
 <h2>Solicitud de permiso para hacer publicaciones denegada</h2>
 <p>Lo sentimos, los administradores han rechazado su petición, si su petición fue recientemente puede volver a intentarlo en unas horas. 
  Le recomendamos que sea miembro del grupo.</p>
</section>
<section v-else class="tamañocompleto">
    <div id="solicitud" v-if="solicitud">
      <div>
 <h2>Solicitar permiso para hacer publicaciones</h2>
        <p>Para poder hacer publicaciones en el canal es necesario que un administrador te valide, recomendamos que te unas al grupo de alertas. Si en 24h no han aceptado tu solicitud puede volver a intentarlo.</p>
      </div>
       
   <!--     <img  id="logo" src="../assets/Alertas.svg" alt=""> -->
    </div>
    <div  v-if="!solicitud" id="solicitando">
      <div>
      <h2>Se ha solicitado permiso a los administradores.</h2>
      <p>En un plazo de 24h debería ser aceptado. En caso contrario, puede volver a solicitar acceso.</p>
      </div>
      <span class="loader"></span>
    </div>
    </section>
</template>

<script>

export default {
  name: 'SolicitarAcceso',
  props:{
    timeSolicitud: Boolean,
    user: Object

  }, 
  data() {
    return {
     solicitud : this.timeSolicitud,
     error : ''
     
    };
  },
  mounted(){
    window.Telegram.WebApp.MainButton.text = 'Solicitar'
    window.Telegram.WebApp.MainButton.show()
  
    if(this.solicitud === true){

     window.Telegram.WebApp.MainButton.onClick(() => {
        this.solicitarUsuario()
     });
    }else{
         window.Telegram.WebApp.MainButton.disable()
         window.Telegram.WebApp.MainButton.setParams({
            text_color: '#000000',
            color:  '#696969'
         })
          
    }
  
  },
  methods: {
  async solicitarUsuario() {
    window.Telegram.WebApp.MainButton.showProgress()
      this.solicitud = false
      window.Telegram.WebApp.MainButton.disable()
         window.Telegram.WebApp.MainButton.setParams({
            disable: true,
            text_color: '#000000',
            color:  '#696969'
           
         })
  let ip = `${process.env.VUE_APP_IP}/nuevoUsuario`
 let params = {
    userData:  window.Telegram.WebApp.initDataUnsafe.user,
    hash:  window.Telegram.WebApp.initDataUnsafe.hash,
    WebAppData: window.Telegram.WebApp.initData
   }
  try {
   const request = await fetch(ip, {
    method: "POST",
    body: JSON.stringify(params),
    headers:{
      "Content-type": "application/json"
    }
   })
  let respuesta = await request.json()
  this.respuesta = respuesta.msg
   window.Telegram.WebApp.MainButton.hideProgress()
  } catch (error) {
    console.log(error)
   this.error = 'Error en el servidor, por favor intentelo de nuevo(Si el problema persiste contacte con un admin.).'
  }
     
  }
 }
  }
</script>
<style scoped>
#solicitando{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%
}
#solicitud{
  height: 100%;
   display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  align-items: center;
}
#logo{
  width: 50%;
}
.loader {
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;
  background-color: var(--tg-theme-text-color);
  background: radial-gradient(ellipse at center, rgb(0, 0, 0) 0%,  rgb(10, 9, 9) 14%, var(--tg-theme-hint-color) 15%, var(--tg-theme-hint-color) 100%);
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}
.loader::after,
.loader::before {
  content: '';  
  position: absolute;
  height: 16px;
  width: 4px;
  background: rgb(255, 255, 255);
  top: 50%;
  left: 50%;
  transform: translateX(-50%) rotate(0deg);
  transform-origin: 25% 0;
  box-sizing: border-box;
  animation: rotation 10s linear infinite;
}
.loader::before {
  height: 22px;
  width: 2px;
  transform: translateX(-50%) rotate(0deg);
  animation-duration: 1s;
} 
@keyframes rotation {
  0%    { transform: rotate(0deg)}
  100%  { transform: rotate(360deg)}
} 

</style>