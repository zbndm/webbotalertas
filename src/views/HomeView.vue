<template>
 
  <div class="home">
    <header>
       
    <router-link to="/perfil" id="perfil">
  
  <div id="avatar"  :style="{ backgroundImage: 'url(' +require( `../assets/avatares/${user.avatar}.svg`) + ')' }" ></div>
    <p>{{user.first_name}}</p>
        </router-link>

  
  <router-link to="/adminmenu" ><h4 v-if="user.type_user=='admin'" >Menu admin</h4> </router-link>
   <button class="enlace" @click="irCamara()"><div  id="camara" alt=""></div></button>


    </header>

 


<nav id="tipoalertas">
  <h2>Selecciona un tipo alerta</h2>
      <!--Selector tipo alerta-->
  <div id="selector">
     <div @click="irAlerta('obras', '#AD9A2B')" class="tipoalerta"  :style="{ backgroundImage: 'url(' +require( `../assets/tiposalertas/obras.svg`) + ')' }" ></div>
 <div @click="irAlerta('viacortada', '#D1731E')" class="tipoalerta"  :style="{ backgroundImage: 'url(' +require( `../assets/tiposalertas/viacortada.svg`) + ')' }" ></div>
  <div @click="irAlerta('retenciones', '#8223AF')" class="tipoalerta"  :style="{ backgroundImage: 'url(' +require( `../assets/tiposalertas/retenciones.svg`) + ')' }" ></div>
  <div @click="irAlerta('accidente', '#BA3131')" class="tipoalerta"  :style="{ backgroundImage: 'url(' +require( `../assets/tiposalertas/accidente.svg`) + ')' }" ></div>
    <div @click="irAlerta('radar', '#3178AD')" class="tipoalerta"  :style="{ backgroundImage: 'url(' +require( `../assets/tiposalertas/radar.svg`) + ')' }" ></div>
    <div @click="irAlerta('otro', '#AA4B29')" class="tipoalerta"  :style="{ backgroundImage: 'url(' +require( `../assets/tiposalertas/otro.svg`) + ')' }" ></div>
  </div>


</nav>
  <!-- <router-link :to="{name: 'mapa'}">Mapa</router-link> -->
  

  <RankingUsuarios/>

  </div>
</template>

<script>
import RankingUsuarios from '../components/RankingUsuarios.vue';
export default {
 components: {
    RankingUsuarios
    },
data() {
  
   
    return {
      data: String,
      error: String,
      status: null,
      user: Object
    };
  },
 async created() {
   
     this.user = this.$store.getters.getUser
      window.Telegram.WebApp.expand()
      window.Telegram.WebApp.BackButton.hide()
      window.Telegram.WebApp.MainButton.hide()
   

  
 },
 methods:  {
      irAlerta(mode, color){
      this.$router.push({ name: 'nuevaalerta', params: { mode: mode , color: color} })
    },
      irCamara(){
      this.$router.push({ name: 'camaras' })
    }
 }
}
</script>
<style lang="scss" scoped>
.enlace{
  background: none;
  border: none;
  padding: 0;
}
#selector{
    display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: var(--tg-theme-bg-color);
  border-radius: 2em;

}
#tipoalertas{
 padding: 5px;
 padding-bottom: 2em;

    
  background-color: var(--tg-theme-secondary-bg-color);
  
  div{
    margin: 0.5em;
  }
}
.tipoalerta{
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center ;
  border-radius: 1em;
  cursor: pointer;
 
 &:hover{

  transform: scale(1.25);
 }
}


header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  
  box-sizing: border-box;

   background-color: var(--tg-theme-secondary-bg-color);

  
}
#camara {
  
  cursor: pointer;
  width: 50px;
  height: 50px;
  background-color: var(--tg-theme-text-color);
    mask-image: url('../assets/camara.svg');
    mask-repeat: no-repeat;
    &:hover{
      background-color: var(--tg-theme-button-color);
     
    }

}
#perfil{
   
    cursor: pointer;
  box-sizing: border-box;
 
  display: flex;
  max-width: 50px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  p{
    margin: 5px;

  }
 
  align-items: center ;
}
#avatar{
    
  background-color:  var(--tg-theme-secondary-bg-color);
  height: 50px;
  width: 50px;

  background-position: center center ;
  background-size: 80%;
  background-repeat: no-repeat;
  border-radius: 100%;

}
</style>