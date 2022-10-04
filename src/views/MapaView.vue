<template>
    <p>El mapa aún no está disponible.</p>
</template>
<script>
export default {
    created(){
    window.Telegram.WebApp.BackButton.show()
   window.Telegram.WebApp.BackButton.onClick(() => {
        this.irMenu()
     });
    },
    methods: {
        
         irMenu(){
        this.$router.push('/')

    }
    }
}
</script>