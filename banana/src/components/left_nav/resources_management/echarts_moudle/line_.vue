<template>
    <ve-histogram
        :data="chartData"
        height="100%"
        :extend="chartExtend"
    ></ve-histogram>
</template>

<script>
export default {
    name: 'line_',
    data() {
        return {
            chartExtend: {
                legend: {
                    top: 10
                },
                grid: {
                    show: true,
                    top: 50,
                    bottom: 14
                },
                dataZoom: [
                    {
                        type: 'slider',
                        start: 0,
                        end: 100
                    }
                ]
            },
            chartData: {
                columns: this.data_[0],
                rows: this.data_[1]
            },
        }
    },
    props: {
        data_: {
            type: Array,
            required: true
        }
    },
    watch: {
        data_: function(val){
            this.chartData.columns = val[0]
            this.chartData.rows = val[1]
        }
    }
}
</script>

<style lang="scss">
</style>