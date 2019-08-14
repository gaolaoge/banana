<template>
    <div class="document_retrieval">
        <div class="wrapper">
            <div class="nav">
                <div class="line_">
                    <el-input
                        v-model="input_"
                        placeholder="文件名称检索"
                        class="input_"
                    ></el-input>
                    <el-button @click="sea_">搜索 </el-button>
                </div>
                <div class="check_">
                    <el-checkbox
                        :indeterminate="isIndeterminate"
                        v-model="checkAll"
                        @change="handleCheckAllChange"
                    >全选</el-checkbox>
                    <el-checkbox-group
                        v-model="checkedCities"
                        @change="handleCheckedCitiesChange"
                    >
                        <el-checkbox
                            v-for="li_ in cities"
                            :label="li_.label"
                            :key="li_.label"
                        >{{li_.label}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'document_retrieval',
    data() {
        return {
            input_: "",
            checkAll: false,
            checkedCities: [],
            // cities: cityOptions,
            isIndeterminate: true,
            cities: [
                {
                    label: 'DOC',
                },
                {
                    label: 'DOCX',
                },
                {
                    label: 'XLS',
                },
                {
                    label: 'XLSX',
                },
                {
                    label: 'PPT',
                },
                {
                    label: 'PPTX',
                },
                {
                    label: 'PNG',
                },
                {
                    label: 'JPG',
                },
                {
                    label: 'PDF',
                },
                {
                    label: 'TXT',
                },
                {
                    label: 'MP4',
                },
                {
                    label: '其它',
                },
            ]
        }
    },
    methods: {
        sea_() {

        },
        handleCheckAllChange(val) {
            this.checkedCities = val ? this.cities : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        }
    }
}
</script>

<style lang="scss" scoped>
.document_retrieval {
    .wrapper {
        width: 1300px;
        margin: 0px auto;
        .nav {
            .line_ {
                margin: 12px 0px;
                .input_ {
                    width: 360px;
                }
            }
        }
    }
}
</style>
