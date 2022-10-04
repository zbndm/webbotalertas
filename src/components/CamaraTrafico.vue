<template>
<div id="camara">
    <div  id="icono" alt=""></div> <h2>{{camara.nombre}}</h2>
        <span  v-if="!loade" class="loader"></span>
         <img v-if="loade" :src="imagen" alt="">
    <p id="enviar" @click="enviarImagen(camara.id)">Descargar Imagen</p>
   
</div>

</template>

<script>
export default {
    
    props: {
        camara: Object
    },
    data(){
        return{
            imagen: String,
            loade: false
        }
    },
    async created(){
      this.obtenerFotos();
      setInterval(() => {
	
		this.obtenerFotos();
	}, 30000);
       
   
  

    
    },
    methods: {
      async obtenerFotos(){
 let params = {
            url: this.camara.url,
            WebAppData: window.Telegram.WebApp.initData,
            
        }
        let url = process.env.VUE_APP_IP + '/obtenerimagen'
        let respuesta = await fetch(url, {
    method: "POST",
    body: JSON.stringify(params),
    headers:{
      "Content-type": "application/json"
    }
   })

    let imagen = await respuesta.text()
  
    this.loade = true
    this.imagen = imagen
      },
        enviarImagen(){
            let url = process.env.VUE_APP_IP + '/enviarimagen'
            let params = {
            camara: this.camara.id,
            WebAppData: window.Telegram.WebApp.initData,
            
        }
        fetch(url, {
    method: "POST",
    body: JSON.stringify(params),
    headers:{
      "Content-type": "application/json"
    }
   })
        }
    }
}
</script>
<style lang="scss" scoped>

#enviar{
    cursor: pointer;
}
#camara{
      background-color: var(--tg-theme-bg-color);
      margin: 1em;
    border-radius: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
    box-sizing: border-box;
    img{
        width: 100%;
        border-radius: 1em;
    }
}
#icono {
  
  cursor: pointer;
  width: 30px;
  height: 30px;
  background-color: var(--tg-theme-text-color);
    mask-image: url('../assets/camara.svg');
    mask-repeat: no-repeat;
    &:hover{
      background-color: var(--tg-theme-button-color);
     
    }

}

.loader{
     margin: 1em;
    border-radius: 1em;
      width: 100%;
      height: 200px;
      background:
          linear-gradient(0.25turn, transparent, rgb(126, 126, 126), transparent),
          linear-gradient(rgb(15, 97, 190), rgb(20, 99, 190));
      background-color: #fff;
      background-repeat: no-repeat;

      background-position: -315px 0, 0 0, 15px 140px, 65px 145px;
      animation: loading 1.5s infinite;
  }

  @keyframes loading {
    to {
      background-position: 315px 0, 0 0, 15px 140px, 65px 145px;
    }
  }
  
</style>