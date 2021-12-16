<template>
    <CModal id="file" is-open :on-close="closeModal">
        <CModalContent>
            <CModalHeader>Informations</CModalHeader>
            <CModalCloseButton/>
            <CModalBody mb="30px">
                <CBox mb="15px">
                    <CHeading as="h5" size="sm">Nom</CHeading>
                    <p>{{file.filename}}</p>
                </CBox>
                <CBox mb="15px">
                    <CHeading as="h5" size="sm">Taille</CHeading>
                    <p>{{convertOctets(file.size)}}</p>
                </CBox>
                <CBox>
                    <CHeading as="h5" size="sm">Tags</CHeading>
                    <!-- <TagsInput :defaultTags="file.tags" classname="info-tags-input"/> -->
                    <CStack :spacing="2" align-items="start" flex-wrap="wrap" is-inline>
                        <CTag cursor="default" size="sm" v-for="tag in file.tags" :key="tag.uuid" mb="1" mt="1">{{ tag.value }}</CTag>
                    </CStack>
                </CBox>
            </CModalBody>
            <CModalFooter>
                <CButtonGroup :spacing="2">
                    <CButton @click="downloadFile" size="sm" variant-color="blue" rightIcon="file-download" variant='solid'>Télécharger</CButton>
                    <CButton @click="deleteFile" size="sm" variant-color="red" rightIcon="trash" variant='solid'>Supprimer</CButton>
                </CButtonGroup>
            </CModalFooter>
        </CModalContent>
        <CModalOverlay/>
    </CModal>
</template>

<style>
#modal-file {
    max-width: 93vw;
}
</style>

<script>
import TagsInput from '@/components/TagsInput'

export default {
    name: "ShowFileModal",
    components: {
        TagsInput
    },
    computed: {
        file() {
            return this.$store.getters['files/getSelectedFile']
        }
    },
    methods: {
        closeModal() {
            this.$store.dispatch('files/setSelectedFile', null)
        },
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
        downloadFile() {
            this.$axios.$get(`/api/documents/download/${this.file.uuid}`)
                .then(response => {
                    console.log(response)
                    // open response.url in a new tab
                    window.open(response.url, '_blank');
                })
        },
        deleteFile() {

        }
    }
}
</script>