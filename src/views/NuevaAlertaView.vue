<template>
<p class="error">{{error}}</p>

<div v-if="usuarioAlertas" >
  <div  id="contentalerta" v-if="!alertaactiva" >
    <div class="tipoalerta"  :style="{ backgroundImage: 'url(' +require( `../assets/tiposalertas/${mode}.svg`) + ')' }" ></div>

    <p>{{errorStr}}</p>

    <textarea placeholder="Introduce la alerta" id="alerta" v-model="alerta" rows="1" type="text" style="overflow: hidden; overflow-wrap: break-word; height: 46px;"></textarea>
     <div id="ubi">
  <p>Enviar ubicación actual</p>
    <div @click="getlocation()" :class ="{'active': active}" id="ubicacion"> <div  :class ="{'active': active}" id="ubicacion_button"></div></div>

    </div>

  </div>
<div v-else>
  <h2>Alerta enviada</h2>
  <p>Tienes una alerta activa. En aproximadamente 5 minutos se enviará al canal.</p>
</div>
</div>
<div v-else>
   <h2>Ops...</h2>
  <p>Parece que las alertas están desactivadas</p>
  
</div>
</template>

<script>
export default {
    name: 'NuevaAlerta',

data () {
    return{
        error: '',
        alertaactiva: false,
         id: this.$route.params.modo,
        mode: String,
        color: String,
        alerta: '',
        location:null,
        gettingLocation: false,
        errorStr:null,
        active: false,
        usuarioAlertas: Boolean
    }
},
 async created(){
  
  
    this.usuarioAlertas = this.$store.getters.getPublicarAlertas
    window.Telegram.WebApp.BackButton.show()
   window.Telegram.WebApp.BackButton.onClick(() => {
        this.irMenu()
     });
    
    this.mode = this.$route.params.mode
    this.color = this.$route.params.color
  if(!this.mode){
    window.Telegram.WebApp.BackButton.hide()
    window.Telegram.WebApp.MainButton.hide()

    this.$router.push('/')
  }
    
    let params = {
            idUsuario:  window.Telegram.WebApp.initDataUnsafe.user.id,
            hash:  window.Telegram.WebApp.initDataUnsafe.hash,
            WebAppData: window.Telegram.WebApp.initData,
           
        }
         let ip = `${process.env.VUE_APP_IP}/comprobaralertaactiva`
        try {
  let alerta = await fetch(ip, {
    method: "POST",
    body: JSON.stringify(params),
    headers:{
      "Content-type": "application/json"
    }
   })

    this.alertaactiva = await alerta.json()

    

  } catch (error) {

    this.error = error
  }

  //Poner button

  if(!this.alertaactiva){
    if(this.usuarioAlertas){
      window.Telegram.WebApp.MainButton.text = 'Enviar Alerta'
      window.Telegram.WebApp.MainButton.color
    window.Telegram.WebApp.MainButton.show()
     window.Telegram.WebApp.MainButton.setParams({
            color:  this.color || '#0760A8'
         })
       window.Telegram.WebApp.MainButton.onClick(() => {
        this.publicar()
     });
    }
  }

},
methods: {
    irMenu(){
        this.$router.push('/')

    },
    async getlocation() {
       if( this.active ){
         this.active = false
         this.location = null
       }else{
        this.gettingLocation = true;
        this.active = true
        try {
              this.gettingLocation = false;
            let ubicacion  = await this.obtenerUbicacion()
            this.location = {
                latitude:  ubicacion.coords.latitude,
                longitude: ubicacion.coords.longitude
            }
        } catch (error) {
             this.gettingLocation = false;
                 this.active = false
            this.error = 'Error al obtener ubicación'
        }
       }
     
    },
    //pos.coords.latitude;
    async obtenerUbicacion() {
      this.error = ''
      return new Promise((resolve, reject) => {

        if(!("geolocation" in navigator)) {
          reject(new Error('Geolocation is not available.'));
        }

        navigator.geolocation.getCurrentPosition(pos => {
          resolve(pos);
        }, err => {
          reject(err);
        });

      });
    },
    async publicar(){
         window.Telegram.WebApp.MainButton.hide()
        let params = {
            userData:  window.Telegram.WebApp.initDataUnsafe.user,
            hash:  window.Telegram.WebApp.initDataUnsafe.hash,
            WebAppData: window.Telegram.WebApp.initData,
            datosAlerta: {
                idUsuario: window.Telegram.WebApp.initDataUnsafe.user.id,
                 tipoAlerta: this.mode,
                 alerta: this.alerta,
                 ubicacion:  this.location
            }
        }
        let ip = `${process.env.VUE_APP_IP}/publicaralerta`
        try {
   let respuesta = await fetch(ip, {
    method: "POST",
    body: JSON.stringify(params),
    headers:{
      "Content-type": "application/json"
    }
   })
     
   if(respuesta.status == 200){
      this.alertaactiva = true
  
   }


  } catch (error) {
      window.Telegram.WebApp.MainButton.show()
    console.log(error)
    this.error = 'Error en el servidor'
  }
    }
}

}
</script>
<style lang="scss" scoped>

.tipoalerta{
  margin-bottom: 2em;
  width: 180px;
  height: 180px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center ;
  border-radius: 1em;
 
 
}
#contentalerta{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  

}
#alerta{
   margin-bottom: 2em;
    font-size: 17px;
    color: black;
    line-height: 21px;
    -webkit-font-smoothing: antialiased;
    padding: 20px 20px 36px;
    box-sizing: border-box;
    display: block;
    outline: none;
    border: none;
    border-radius: 0;
    resize: none;
    color: var(--text-color);
    background: var(--tg-theme-secondary-bg-color);
    -webkit-user-select: auto;
    user-select: auto;
    cursor: auto;
    width: 100%;
}



#ubi{
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 1em;
    margin-right: 2em;
  }
}
#ubicacion{
    position: relative;
    border-radius: 2em;
    width: 60px;
    height: 25px;
    background-color: rgb(151, 151, 151);
  
  
    
}
#ubicacion_button{
    display: block;
   border-radius: 6em;
   border: solid 5px;
   box-sizing: border-box ;
   border-color: rgb(151, 151, 151);;
    position: absolute;
    width: 25px;
    height: 25px;
    background: rgb(41, 41, 41);
    left: 0%;
    transform: scale(120%);
      transition: 0.3s ease;
}
#ubicacion_button.active{
    border: solid  5px var(--tg-theme-button-color);
      transform: translateX(150%) scale(120%);
      

}
#ubicacion.active{
    background-color: var(--tg-theme-button-color);


}

</style>