<template>
<div  id="loadderbox">
<h2>Bienvenido {{nombre}}</h2>

<span class="loader"></span>
  <h2>Comprobando tus datos</h2>
</div>
</template>
<script>
export default {
  name: 'CargandoBot',
  props:{
    nombre: String

  }
  }
</script>

<style scoped>
#loadderbox{
  display: flex;
  justify-content: center;
 height: 100%;
 flex-wrap: wrap;
  align-items: center;
}
.loader {
        width: 84px;
        height: 84px;
        position: relative;
        overflow: hidden;
      }
      .loader:before , .loader:after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        width:64px;
        height: 64px;
        border-radius: 50%;
        background:var(--tg-theme-text-color);
        transform: translate(-50% , 100%)  scale(0);
        animation: push 1.6s infinite ease-out;
      }
      .loader:after {
      animation-delay: 0.8s;
      }
      @keyframes push {
          0% {
            transform: translate(-50% , 100%)  scale(1);
          }
          15% , 25%{
            transform: translate(-50% , 50%)  scale(1);
          }
        50% , 75% {
            transform: translate(-50%, -30%) scale(0.5);
          }
        80%,  100% {
            transform: translate(-50%, -50%) scale(0);
          }
      }
  
</style>