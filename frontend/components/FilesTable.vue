<template>
    <table class="files-table">
        <thead>
            <tr>
                <!-- Ajouter colonnes nom, taille, type, tags, actions -->
                <th>Nom</th>
                <th>Taille</th>
                <th>Tags</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="file in files" :key="file.uuid">
                <td>{{ file.filename }}</td>
                <td>{{ convertOctets(file.size) }}</td>
                <td>
                    <CStack :spacing="2" align-items="start" flex-wrap="wrap" is-inline>
                        <CTag cursor="default" size="sm" v-for="tag in file.tags" :key="tag.uuid" mb="1" mt="1">{{ tag.value }}</CTag>
                    </CStack>
                </td>
                <td>
                    <CButton variant='solid' size="sm">Télécharger</CButton>
                    <CButton variant='solid' size="sm">Supprimer</CButton>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style>
.files-table {
    width: 95%;
    border-collapse: collapse;
    margin: auto;
}
th {
    text-align: left;
}
</style>

<script>
export default {
    name: 'FilesTable',
    computed: {
        files() {
            return this.$store.getters['files/getFiles'];
        }
    },
    methods: {
        convertOctets(octets) {
            if (octets < 1024) {
                return octets + " o";
            } else if (octets < 1048576) {
                return (octets / 1024).toFixed(2) + " Ko";
            } else if (octets < 1073741824) {
                return (octets / 1048576).toFixed(2) + " Mo";
            } else {
                return (octets / 1073741824).toFixed(2) + " Go";
            }
        },
    }
}
</script>