<template>
    <div class="verify" v-on:click="verify_input()">
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'vertify_input',
    data(){
        return {
            
        }
    },
    methods: {
        verify_input(){
            let r = Math.random().toString(36).substring(3,7),
                rr = [...r]
            this.$store.commit('receive_verifyInput',r)
            document.querySelector('.verify').innerHTML = ''
            for(let i = 0;i < 4;i ++){
                let zColor = Math.random().toString(16).substring(3,9),
                    zFontsize = Math.floor(Math.random()*(9-4+1)+4)*100,
                    zRotate = 60 - (Math.random() * 120),
                    z = document.createElement('span')
                z.innerText = rr[i]
                z.style.color = `#${zColor}`
                z.style.display = 'inline-block'
                z.style.fontSize = '24px'
                z.style.padding = '0px 6px'
                z.style.fontWeight = zFontsize
                z.style.transform = `rotate(${zRotate}deg)`
                document.querySelector('.verify').appendChild(z)
            }
        }   
    },
    computed: {
        ...mapState(['login_page'])
    },
    mounted(){
        document.querySelector('.verify').click()
    }
}
</script>

<style scoped>
    .verify{
        width: 100%;
        height: 100%;
        background-color: rgb(52, 118, 194);
        text-align: center;
    }
</style>