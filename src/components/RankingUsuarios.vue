<template>
<section>
<p>{{error}}</p>
  <h2>Ranking usuarios</h2> 
<div id="usuarios" v-for="(usuario,index) in usuarios" :key="usuario.id">

    <div id="usuario">

    <img id="avatar" :src="require(`../assets/avatares/${usuario.avatar}.svg`)" />
 <h3># {{index +1 }}  {{usuario.first_name}} {{usuario.last_name}}  </h3> 
    <p>Alertas publicadas: {{usuario.num_alertas}}</p>

    </div>
   
</div>
</section>
</template>

<script>
export default {
  name: 'ListaUsuarios',
  data() {
    return {
      numeracion: 0,
        usuarios: Array,
        error: ''
    }
  },
  async created(){
    let params = {
    hash:  window.Telegram.WebApp.initDataUnsafe.hash,
    WebAppData: window.Telegram.WebApp.initData
   }

    let ip = `${process.env.VUE_APP_IP}/listausuarios`
    try {
        const request = await fetch(ip, {
    method: "POST",
    body: JSON.stringify(params),
    headers:{
      "Content-type": "application/json"
    }
   })
   let listausuarios = await request.json()
    listausuarios = listausuarios.filter(usuario => usuario.status_user == 'active');
      listausuarios = listausuarios.filter(usuario => usuario.ranking == true);
   this.usuarios = listausuarios
    } catch (error) {
       this.error = 'Error al obtener los usuarios'
    }
  },
  methods:{
    incrementar(){
      this.numeracion++
      return this.numeracion
    }  
  }
  }
  
  
</script>

<style scoped>
section{
  
  padding: 1em;
  box-sizing: border-box;
}
#avatar{
  width: 2em;
  margin: 1em 1em 0em 1em
}
section{
    margin-top: 3em;
      background-color: var(--tg-theme-secondary-bg-color);
      border-radius: 0.2em;
  
}
#usuarios{
      box-sizing: border-box;
      display: flex;
      justify-content: center;
}
#usuario{
      box-sizing: border-box;
  padding: 0.1em;
  width: 80%;
  margin: 0.5em;

  background-color: var(--tg-theme-bg-color);
    border-radius: 5px;
}
</style>