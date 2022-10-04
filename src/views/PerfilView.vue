<template>
<header>

  <div id="perfil">
     <div id="avatar"  :style="{ backgroundImage: 'url(' +require( `../assets/avatares/${user.avatar}.svg`) + ')' }" ></div>
    <p>{{user.first_name}}</p>
  </div>
  <div @click="cambiarModoOculto()" v-if="user.type_user === 'moder' || user.type_user === 'admin'   " :class ="{'isAnonimus': isAnonimus}" id="incognito"></div>
  </header>
  <section id="datosusuario">
  <h2> Mi perfil </h2>
  <p>Numero penalizaciones: {{user.penalization}}</p>
  <p>Mi estado de usuario: {{user.status_user}}</p>
     <p>Numero de alertas publicadas: {{user.num_alertas}}</p>
     <div id="rank">
<p>Mostrarme en el ranking</p>
         <div @click="changeranking()" :class ="{'active': ranking}" id="ranking"> <div  :class ="{'active': ranking}" id="ranking_button"></div></div>
     </div>
     
     <p id="borrar" @click="preguntar()">Borrar cuenta</p>
   </section>
</template>
<script>
export default {
    data(){
        return {
           numeracion: 0,
        usuarios: Array,
        error: '',
        ranking: true,
            user: Object,
            isAnonimus: false
        }
    },
    async created() {
         window.Telegram.WebApp.BackButton.show()
          window.Telegram.WebApp.BackButton.onClick(() => {
        this.irMenu()
     });
        this.user = this.$store.getters.getUser
      if(this.user.type_user === 'admin' || this.user.type_user === 'moder' ){
           let params = {
    hash:  window.Telegram.WebApp.initDataUnsafe.hash,
    WebAppData: window.Telegram.WebApp.initData,
    idUsuario: window.Telegram.WebApp.initDataUnsafe.user.id
   }
       
 
        let ipAnon = `${process.env.VUE_APP_IP}/comprobarusuarioanonimo`
        const requestAnon = await fetch(ipAnon, {
    method: "POST",
body: JSON.stringify(params),
    headers:{
      "Content-type": "application/json"
    }
   })
   
        this.isAnonimus = await requestAnon.json()

      }



    },
    methods: {
   irMenu(){
        this.$router.push('/')

    },
   
   
       async cambiarModoOculto(){
     if(this.user.type_user === 'admin' || this.user.type_user === 'moder'){
      
         let params = {
    WebAppData: window.Telegram.WebApp.initData,
    idUsuario: window.Telegram.WebApp.initDataUnsafe.user.id,
   }

        let ip = `${process.env.VUE_APP_IP}/cambiarmodooculto`
           const request = await fetch(ip, {
    method: "POST",
    body: JSON.stringify(params),
    headers:{
      "Content-type": "application/json"
    }
   })
   let modoOculto = await request.json()
  this.isAnonimus = modoOculto

   
     }
    }
 }
} 
</script>


<style lang="scss" scoped>
.logimg{
  width: 40px;
  cursor: pointer;
  margin: 2em;
}
#rank{
 
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 1em;
    margin-right: 2em;
  
}
}
#ranking{
    position: relative;
    border-radius: 2em;
    width: 60px;
    height: 25px;
    background-color: rgb(151, 151, 151);
  
  
    
}
#ranking_button{
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
#ranking_button.active{
    border: solid  5px var(--tg-theme-button-color);
      transform: translateX(150%) scale(120%);
      

}
#ranking.active{
    background-color: var(--tg-theme-button-color);


}
header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  box-sizing: border-box;

}
#incognito{
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-position:center center ;
     background-color: rgb(121, 121, 121);
  border-radius: 100%;

  box-sizing: border-box;
  background-image: url('../assets/incognito.svg');
  background-size: 80%;
  background-repeat: no-repeat;
      border: black solid 3px;
 
}
  #incognito.isAnonimus{

     background-color: aliceblue;

  }
#borrar{
  color: rgb(206, 17, 17);
}
#perfil{
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  padding: 0.5em;
  
  align-items: center ;
}
#avatar{
  background-color:  var(--tg-theme-secondary-bg-color);
  height: 40px;
  width: 40px;
  margin-right: 1em;
  background-position: center center ;
  background-size: 80%;
  background-repeat: no-repeat;
  border-radius: 100%;

}
#datosusuario{
  background-color:  var(--tg-theme-secondary-bg-color);
  padding: 2em;
    box-sizing: border-box;
}



section#adminmenu{
    margin-top: 5em;
      background-color:  var(--tg-theme-secondary-bg-color);
      padding: 1em;
}
#usuarios{
      box-sizing: border-box;
}
#usuario{
      box-sizing: border-box;
  padding: 0.1em;
  margin: 0.5em;

    background-color:  rgba(0, 0, 0, 0.185);
    border-radius: 10px;
}
</style>