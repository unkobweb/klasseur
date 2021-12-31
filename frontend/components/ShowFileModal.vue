<template>
    <div>
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
                        <CHeading :mb="modifyTags ? '5px' : ''" as="h5" size="sm">Tags</CHeading>
                        <TagsInput v-if="modifyTags" :defaultTags="file.tags" @updateTags="updateTags" classname="info-tags-input"/>
                        <CStack v-else :spacing="2" align-items="start" flex-wrap="wrap" is-inline>
                            <CTag cursor="default" size="sm" v-for="tag in file.tags" :key="tag.uuid" mb="1" mt="1">{{ tag.value }}</CTag>
                        </CStack>
                        <CButton mt="5px" w="100%" v-if="!modifyTags" variant="solid" size="sm" rightIcon="pencil-alt" @click="modifyTags = true">Modifier les tags</CButton>
                        <CButton mt="10px" w="100%" v-else variant="solid" size="sm" rightIcon="check" variant-color="vue" @click="applyTagsChanges">Appliquer les modifications</CButton>
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
        <ConfirmModal v-if="promptDelete" @cancel="hideDeletePrompt" @confirm="confirmDeleteFile" />
    </div>
</template>

<style>
#modal-file {
    max-width: 400px;
}
@media screen and (max-width: 500px) {
    #modal-file {
        max-width: 93vw;
    }
}
</style>

<script>
import TagsInput from '@/components/TagsInput'
import ConfirmModal from '@/components/ConfirmModal'

export default {
    name: "ShowFileModal",
    components: {
        TagsInput,
        ConfirmModal
    },
    data() {
        return {
            promptDelete: false,
            modifyTags: false,
            newTags: []
        }
    },
    mounted() {
        this.newTags = this.file.tags.map(tag => tag.value)
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
            this.promptDelete = true
        },
        hideDeletePrompt() {
            this.promptDelete = false
        },
        confirmDeleteFile() {
            this.promptDelete = false
            this.$axios.$delete(`/api/documents/${this.file.uuid}`)
                .then(response => {
                    this.$store.dispatch('files/removeFile', this.file)
                    this.closeModal()
                })
        },
        updateTags(tags) {
            this.newTags = tags
            this.newTags.sort()
        },
        applyTagsChanges() {
            // if newTags is empty, prompt user to add tags
            if (this.newTags.length === 0) {
                this.$toast({
                    title: 'Ajoutez des tags',
                    description: "Vous devez ajouter au moins un tag pour pouvoir appliquer les modifications.",
                    position: "top-right",
                    status: 'error',
                    duration: 4000
                })
                return
            }
            this.modifyTags = false
            const formData = new FormData()
            for (let i = 0; i < this.newTags.length; i++) {
                formData.append('tags[]', this.newTags[i]);
            }
            this.$axios.$patch(`/api/documents/${this.file.uuid}`, formData)
            .then(response => {
                this.$store.dispatch('files/setTagsOfAFile', response)
            })
        }
    }
}
</script>