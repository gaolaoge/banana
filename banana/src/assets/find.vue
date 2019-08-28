<template>
    <div class="wrapper">
        <el-input
            placeholder="群名称搜索"
            v-model="input_"
            class="input_"
        ></el-input>
        <el-button @click="search_">查找</el-button>
    </div>
</template>

<script>

import {
    im_group_search
} from '@/api/api_base'

export default {
    name: 'find_',
    data() {
        return {
            input_: '',
        }
    },
    methods: {
        search_() {
            if(!this.input_){
                this.$message.error('输入框为空')
                return false
            }
            im_group_search({'data': this.input_})
                .then(data => {
                    
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    margin: 0px auto;
    padding-top: 12px;
    width: 480px;
    .input_ {
        width: 400px;
    }
}
</style>