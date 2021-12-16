<template>
    <div>
        <table v-if="files.length > 0" class="desktop files-table">
            <thead>
                <tr>
                    <!-- Ajouter colonnes nom, taille, type, tags, actions -->
                    <th>Nom</th>
                    <th>Taille</th>
                    <th>Tags</th>
                    <th class="action-buttons">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr class="file-line" v-for="file in files" :key="file.uuid">
                    <td>{{ file.filename }}</td>
                    <td>{{ convertOctets(file.size) }}</td>
                    <td>
                        <CStack :spacing="2" align-items="start" flex-wrap="wrap" is-inline>
                            <CTag cursor="default" size="sm" v-for="tag in file.tags" :key="tag.uuid" mb="1" mt="1">{{ tag.value }}</CTag>
                        </CStack>
                    </td>
                    <td class="action-buttons">
                        <CStack :spacing="2" is-inline>
                            <CButton variant='solid' size="sm" rightIcon="pencil-alt" @click="openFileOptions(file)">Modifier</CButton>
                            <CButton variant='solid' variant-color="blue" size="sm" rightIcon="file-download" >Télécharger</CButton>
                        </CStack>
                    </td>
                </tr>
            </tbody>
        </table>
        <CBox v-if="files.length > 0" class="mobile files-table">
            <ShowFileModal v-if="selectedFile !== null" />
            <CBox v-for="file in files" :key="file.uuid" @click="openFileOptions(file)">
                <CBox d="flex" flex-direction="column">
                    <CHeading as="h4" size="sm">{{ file.filename }}</CHeading>
                    <p class="size">{{ convertOctets(file.size) }}</p>
                </CBox>
                <CStack :spacing="2" align-items="start" flex-wrap="wrap" is-inline>
                    <CTag cursor="default" size="sm" v-for="tag in file.tags" :key="tag.uuid" mb="1" mt="1">{{ tag.value }}</CTag>
                </CStack>
                <CDivider />
            </CBox>
        </CBox>
        <CBox v-else d="flex" mt="50px" mb="30px" text-align="center" flex-direction="column" justify-content="center" align-items="center">
            <CIcon name="folder-open" size="80px" mb="25px"/>
            <p>Vous n'avez aucun document pour l'instant, appuyez sur le bouton en bas à droite pour en ajouter un.</p>
        </CBox>
    </div>
</template>

<style>
.files-table {
    width: 100%;
    border-collapse: collapse;
    margin: auto;
    margin-top: 20px;
}
.action-buttons {
    display: flex;
    justify-content: flex-end;
}
.size {
    font-size: 12px;
}
th {
    text-align: left;
}
td {
    padding: 7px 0;
}
@media screen and (max-width: 768px) {
    .desktop {
        display: none;
    }   
}
@media screen and (min-width: 769px) {
    .mobile {
        display: none;
    }
}
</style>

<script>
import ShowFileModal from '@/components/ShowFileModal.vue'

export default {
    name: 'FilesTable',
    components: {
        ShowFileModal
    },
    computed: {
        files() {
            return this.$store.getters['files/getFiles'];
        },
        selectedFile() {
            return this.$store.getters['files/getSelectedFile'];
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
        openFileOptions(file) {
            this.$store.dispatch('files/setSelectedFile', file);
        }
    }
}
</script>