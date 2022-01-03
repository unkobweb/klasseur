<template>
    <div class="stat">
        <CHeading size="lg" mb="5">Taille des fichiers</CHeading>
        <Pie v-if="loaded" :data="pieData" :options="pieChartOptions" :styles="{height: '250px'}" />
    </div>
</template>

<style>
.stat {
    min-width: 400px;
    flex: 1;
    background-color: #394353;
    padding: 20px 25px;
    border-radius: 10px;
}
@media screen and (max-width: 700px) {
    .stat {
        min-width: unset;
        max-width: 100%;
    }
}
</style>

<script>
import Pie from '@/components/charts/Pie.vue';

export default {
    props: ['documentSize'],
    mounted() {
        const colors = ['rgba(246, 229, 141,1.0)', 'rgba(255, 190, 118,1.0)', 'rgba(255, 121, 121,1.0)', 'rgba(186, 220, 88,1.0)', 'rgba(126, 214, 223,1.0)', 'rgba(224, 86, 253,1.0)', 'rgba(104, 109, 224,1.0)']
        colors.sort(() => Math.random() - 0.5);

        this.pieData = {
            labels: this.documentSize.map(user => user.email),
            datasets: [{
                data: this.documentSize.map(user => user.documents),
                backgroundColor: colors.map(color => color.replace('1.0', '0.8')),
                borderColor: colors,
                borderWidth: 1
            }]
        }
        this.loaded = true;
    },
    components: {
        Pie
    },
    data() {
        return {
            loaded: false,
            pieData: {},
            pieChartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        fontColor: '#fff'
                    }
                },
                title: {
                    display: false
                },
                tooltips: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    callbacks: {
                        label: (tooltipItem, data) => {
                            return data.labels[tooltipItem.datasetIndex] + ': ' + this.convertOctets(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
                        }
                    }
                }
            }
        }
    },
    methods: {
        convertOctets(octets) {
            const units = ['octets', 'Ko', 'Mo', 'Go', 'To', 'Po', 'Eo', 'Zo', 'Yo'];
            let i = 0;
            while (octets >= 1024) {
                octets /= 1024;
                i++;
            }
            return octets.toFixed(2) + ' ' + units[i];
        }
    }
}
</script>