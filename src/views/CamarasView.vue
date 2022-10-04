<template>
   <span v-if="subir" @click="irArriba()" id="subir">^</span>
<h2>Camaras de Tráfico</h2>
<div id="fondobuscador">
<input placeholder=" Buscar" id="buscador"  v-model="busqueda"  rows="1" type="search" style="overflow: hidden; overflow-wrap: break-word; height: 46px;"/>
<p id="cResults">Result {{resultFiltro.length}}</p>
   <!-- <input type="image"   :src="require(`../assets/search.png`)">-->
    </div>

    <section id="camaras">
    <div v-for="camara in resultFiltro" :key="camara.id" >
       
     <CamaraTrafico   :camara="camara"/>
    </div>
    </section>

</template>

<script>
import CamaraTrafico from '../components/CamaraTrafico.vue'
export default {
    components:{
        CamaraTrafico
    },
    data(){
        return {
        error: '',
        user: Object,
        camaras: Array,
        filtradas: Array,
        busqueda: '',
        subir: false
        }
    },
    async created() {
      
         window.Telegram.WebApp.BackButton.show()
          window.Telegram.WebApp.BackButton.onClick(() => {
        this.irMenu()
     });
        this.user = this.$store.getters.getUser
     
     let response = await fetch(`${process.env.VUE_APP_IP}/obtenercamaras`)

    this.camaras = await response.json()
       
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
       this.subir = true
      } else {
        this.subir = false
      }
    })
 



    },
    methods: {
        irArriba(){
            window.scrollTo(0, 0);
            
        },
   irMenu(){
        this.$router.push('/')

    },
    buscar(){
        
       if(this.busqueda != ''){
        let filtro = this.camaras.filter((camara) =>  camara.nombre.toLowerCase().match(this.busqueda.toLowerCase()));
        if(filtro.lenght != 0){
          this.filtradas = filtro
        }
      
       }else{
        this.filtradas = this.camaras
       }
    }
 },
 computed: {
    resultFiltro() {
        if(this.busqueda != ''){
        let filtro = this.camaras.filter((camara) =>  camara.nombre.toLowerCase().match(this.busqueda.toLowerCase()));

       return filtro
      
       }else{
       return this.camaras
       }
       
    }
    }
}
</script>
<style lang="scss" scoped>
#subir{
    
 padding:20px;
	background:#024959;
	font-size:20px;
	color:#fff;
	cursor:pointer;
	position: fixed;
	bottom:10px;
	right:10px;
    border-radius: 100%;
    width: 20px;
    height: 20px;
}
#cResults{
    font-size: 12px;
    text-align: center;
    margin-right :1em;
}
#camaras{
    padding: 1em;
     background-color: var(--tg-theme-secondary-bg-color);
     
}
#fondobuscador{
 
    display: flex;
    border-radius: 0em 2em 2em 0em;
   align-items: center;
   justify-content: space-between;
   margin: 2em;
 
    background-color: var(--tg-theme-secondary-bg-color);
    input[type="image"]{
        height: 46px;
        border-radius: 2em;
       box-sizing: border-box;
        padding: 10px;
           background-color: var(--tg-theme-button-color); 
           border: solid 2px var(--tg-theme-secondary-bg-color);
           
    }
}
#buscador{
         background-color: var(--tg-theme-secondary-bg-color);
 
    font-size: 18px;
    color: black;
    line-height: 21px;
    -webkit-font-smoothing: antialiased;
    padding: 15px 15px 15px;
    box-sizing: border-box;
    display: block;
    outline: none;
    border: none;
    border-radius: 0;
    resize: none;
    color: var(--text-color);

    -webkit-user-select: auto;
    user-select: auto;
    cursor: auto;
   
}

</style>