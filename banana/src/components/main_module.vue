<template>
    <div
        class="main_module"
        v-loading="login_head.showBox"
        element-loading-background="rgba(0, 0, 0, 0.5)"
    >
        <moduletop />
        <moduleleft />
        <avatar-cutter
            v-if="login_head.showBox"
            return-type="url"
        ></avatar-cutter>
        <im />
    </div>
</template>

<script>

import IM from '@/components/layim'
import Cookie from 'js-cookie'
import module_left from '@/components/module_left'
import module_top from '@/components/module_top'
import AvatarCutter from '@/components/avatar-cutter'       //头像上传模块
import { mapState, mapMutations } from 'vuex'
import { baseData } from '@/api/api_base'

export default {
    name: 'main_module',
    data() {
        return {

        }
    },
    components: {
        'moduleleft': module_left,
        'moduletop': module_top,
        "avatar-cutter": AvatarCutter,
        'im': IM
    },
    computed: {
        ...mapState(['login_head']),
    },
    created() {
        //此处进行token验证
        let s = Cookie.get('token'),
            this_ = this
        if (!s) {
            this.$message.error('尚未登录')
            setTimeout(() => {
                this_.$router.replace('/')
            }, 3000)
            return false
        }
        //获取基本数据
        baseData({'data': 'data'})
            .then(data => {
                let z = {}
                data.data.forEach((currentVal) => {
                    z[Object.keys(currentVal)[0]] = Object.values(currentVal)[0]
                })
                sessionStorage.setItem('employees',JSON.stringify(z))
            })
    },
    methods: {
        ...mapMutations(['changeShowState'])
    }
}
</script>

<style scoped>
</style>
