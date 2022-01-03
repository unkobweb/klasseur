<template>
    <div class="stat">
        <CHeading size="lg" mb="5">Nombre de fichiers</CHeading>
        <Pie v-if="loaded" :data="pieData" :options="pieChartOptions" :styles="{height: '250px'}" />
    </div> 
</template>

<style>
/* .stat {
    width: fit-content;
    min-width: 450px;
    background-color: #394353;
    padding: 20px 25px;
    border-radius: 10px;
} */
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
    props: ['documentCount'],
    mounted() {
        const colors = ['rgba(246, 229, 141,1.0)', 'rgba(255, 190, 118,1.0)', 'rgba(255, 121, 121,1.0)', 'rgba(186, 220, 88,1.0)', 'rgba(126, 214, 223,1.0)', 'rgba(224, 86, 253,1.0)', 'rgba(104, 109, 224,1.0)']
        colors.sort(() => Math.random() - 0.5);

        this.pieData = {
            labels: this.documentCount.map(user => user.email),
            datasets: [{
                data: this.documentCount.map(user => user.documents),
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
                            const user = data.labels[tooltipItem.datasetIndex];
                            const numberOfFiles = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            return `${user}: ${numberOfFiles} ${numberOfFiles > 1 ? 'fichiers' : 'fichier'}`;
                        }
                    }
                }
            }
        }
    }
}
</script>