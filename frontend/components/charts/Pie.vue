<script>
import { Pie } from 'vue-chartjs'
export default {
    extends: Pie,
    props: ['data', 'options'],
    mounted() {
        console.log('pie mounted')
        console.log(this.data)
        console.log(this.options)
        this.renderChart(this.data, this.options)
    }
}
</script>