<template>
    <div>
        <CHeading size="lg" mb="40px">Statistiques</CHeading>
        <div v-if="loaded" class="charts">
            <div class="stats">
                <CStat>
                    <CStatLabel>Nombre total de fichiers</CStatLabel>
                    <CStatNumber>{{ totalDocuments }} {{ totalDocuments > 1 ? "Documents": "Document"}}</CStatNumber>
                </CStat>
                <CStat>
                    <CStatLabel>Taille total des fichiers</CStatLabel>
                    <CStatNumber>{{ convertOctets(totalDocumentsSize) }}</CStatNumber>
                </CStat>
                <CStat>
                    <CStatLabel>Nombre total d'utilisateurs</CStatLabel>
                    <CStatNumber>{{ totalUsers }} {{ totalUsers > 1 ? "Utilisateurs": "Utilisateur"}}</CStatNumber>
                </CStat>
            </div>
            <FileSize :documentSize="documentSize" />
            <FileCount :documentCount="documentCount" />
        </div>
    </div>
</template>

<style>
.charts {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 20px;
    flex-wrap: wrap;
}
.stats {
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: #394353;
    padding: 20px;
    border-radius: 10px;
}
.graphs {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 20px;
}
</style>

<script>
import FileSize from '@/components/admin/stats/FileSize.vue';
import FileCount from '@/components/admin/stats/FileCount.vue';

export default {
    components: {
        FileSize,
        FileCount
    },
    async fetch() {
        const res = await this.$axios.$get('/api/stats')
        const {documentSize, documentCount, totalDocuments, totalDocumentsSize, totalUsers} = res;
        this.documentSize = documentSize
        this.documentCount = documentCount
        this.totalDocuments = totalDocuments
        this.totalDocumentsSize = totalDocumentsSize
        this.totalUsers = totalUsers
        this.loaded = true
    },
    data() {
        return {
            loaded: false,
            totalDocuments: 0,
            totalDocumentsSize: 0,
            totalUsers: 0,
            documentSize: [],
            documentCount: []
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