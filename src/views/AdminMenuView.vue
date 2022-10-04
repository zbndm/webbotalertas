<template>
   <section  id="adminmenu"  v-if="user.type_user === 'admin' || user.type_user === 'moder'">
    <h1>Admin Menú</h1>
    <div v-for="alerta in alertasactivas " :key="alerta.idUsuario">
      <p>{{alerta.idUsuario}}</p>
    </div>


    <div v-if ="user.type_user === 'admin'">
      <img @click="getFichero('errores')" class="logimg" src="../assets/errorlog.png" alt="">
       <img @click="getFichero('registro')" class="logimg" src="../assets/log.png" alt="">
    </div>
    <p>Lista de usuarios</p>
   <div id="usuarios" v-for="(usuario) in usuarios" :key="usuario.id">

    <div id="usuario">
 <h3>{{usuario.first_name}} {{usuario.last_name}} </h3> 
    <p>Numero de alertas publicadas: {{usuario.num_alertas}}</p>
      <p>Estado usuario: {{usuario.status_user}}</p>
    <p>Numero de penalizaciones: {{usuario.penalization}}</p>
       <p>Tipo Usuario: {{usuario.type_user}}</p>

    <div>
    <button v-if="usuario.status_user === 'active'">Banear</button>
    <button v-if="usuario.status_user === 'banned'">Perdonar</button>
    <button > + 1 penalizacion</button>
    <div v-if="user.type_user === 'admin'">
      <p>Cambiar permisos</p>
 <button v-if="usuario.type_user != 'admin'" @click="cambiarPermisos('admin', usuario)"> Admin</button>
     <button v-if="usuario.type_user != 'moder'"  @click="cambiarPermisos('moder', usuario)"> Moderador</button>
      <button v-if="usuario.type_user != 'user'"  @click="cambiarPermisos('user', usuario)">Usuario</button>
    </div>
   
    </div>

    </div>
   
</div>
  </section>
</template>

<script>
export default {
     data(){
        return {
        alertasactivas: Array,
        usuarios: Array,
        error: '',
       
            user: Object,
        
        }
    }, async created() {
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
       
 let ipalertasactivas = `${process.env.VUE_APP_IP}/alertasactivas`;

      const requestipactiva = await fetch(ipalertasactivas, {
    method: "POST",
body: JSON.stringify(params),
    headers:{
      "Content-type": "application/json"
    }
   })
    this.alertasactivas = await requestipactiva.json();
    console.log(this.alertasactivas)
      

    let ip = `${process.env.VUE_APP_IP}/listausuarios`
    try {
        const request = await fetch(ip, {
    method: "POST",
    body: JSON.stringify(params),
    headers:{
      "Content-type": "application/json"
    }
   })
   
   this.usuarios = await request.json()
    } catch (error) {
       this.error = 'Error al obtener los usuarios'
    }
      }



    },methods: {
   irMenu(){
        this.$router.push('/')

    },
    async getFichero(fichero){
         if(this.user.type_user === 'admin'){
       let params = {
    fichero: fichero,
       idUsuario: window.Telegram.WebApp.initDataUnsafe.user.id,
    WebAppData: window.Telegram.WebApp.initData,
   
   }
    let ip = `${process.env.VUE_APP_IP}/obtenerficherolog`
      await fetch(ip, {
    method: "POST",
    body: JSON.stringify(params),
    headers:{
      "Content-type": "application/json"
    }
   })
         }
    },
    async cambiarPermisos(perm, idUsuario){
     if(this.user.type_user === 'admin'){
      
         let params = {
    hash:  window.Telegram.WebApp.initDataUnsafe.hash,
    WebAppData: window.Telegram.WebApp.initData,
    idUsuario: window.Telegram.WebApp.initDataUnsafe.user.id,
    permisos: perm,
    idUsuarioCpermisos: idUsuario.id
   }

        let ip = `${process.env.VUE_APP_IP}/cambiarpermisos`
           const request = await fetch(ip, {
    method: "POST",
    body: JSON.stringify(params),
    headers:{
      "Content-type": "application/json"
    }
   })
   let user = await request.json()
   idUsuario.type_user = user.type_user

   
        }
        }
    }
}
</script>
<style lang="scss" scoped>
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
</style>