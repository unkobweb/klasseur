<template>
    <div>
        <CModalBody>
            <CHeading as="h4" size="lg" mb="5">Récapitulatif</CHeading>
            <CStack spacing="20%" is-inline mb="5">
                <CBox>
                    <CHeading as="h6" size="sm">Nom de fichier</CHeading>
                    <p>{{ fileName }}</p>
                </CBox>
                <CBox>
                    <CHeading as="h6" size="sm">Taille</CHeading>
                    <p>{{ fileSize }}</p>
                </CBox>
            </CStack>
            <CBox>
                <CHeading as="h6" size="sm" mb="3">Tags</CHeading>
                <CStack :spacing="4" align-items="start" is-inline mb="5" flex-wrap="wrap">
                    <CTag v-for="tag in tags" :key="tag" size="md" mb="4">{{tag}}</CTag>
                </CStack>
            </CBox>
        </CModalBody>
        <CModalFooter>
            <CButtonGroup :spacing="2">
                <CButton @click="$emit('goPrevious')" :isDisabled="!fileName" variant='solid'>Précédent</CButton>
                <CButton @click="sendFileAndTags" variant-color="blue" variant='solid'>Héberger le fichier</CButton>
            </CButtonGroup>
        </CModalFooter>
    </div>
</template>

<script>
export default {
    name: 'SendFile',
    computed: {
        fileName() {
            return this.$store.getters['upload/getState'].file ? this.$store.getters['upload/getState'].file.name : ''
        },
        fileSize() {
            return this.$store.getters['upload/getState'].file ? this.convertOctets(this.$store.getters['upload/getState'].file.size) : "0 octet";
        },
        tags() {
            return this.$store.getters['upload/getState'].tags
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
        sendFileAndTags() {
            // get upload state from the store
            const state = this.$store.getters['upload/getState'];
            // create a formdata
            const formData = new FormData();
            // add the file to the formdata
            formData.append('file', state.file);
            // add the tags to the formdata
            formData.append('tags', state.tags.join('|'));
            // send it to the API
            this.$axios.$post('/api/documents/upload', formData).then(response => {
                console.log(response);
                this.$toast({
                    title: 'Fichier envoyé',
                    description: "Le fichier a bien été envoyé.",
                    position: "top-right",
                    status: 'success',
                    duration: 2000
                })
                this.$emit('closeModal');
            }).catch(error => {
                console.log(error);
                this.$toast({
                    title: 'Erreur lors de l\'envoi',
                    description: "Une erreur est survenue lors de l'envoi du fichier.",
                    position: "top-right",
                    status: 'error',
                    duration: 2000
                })
            })
        }
    }
}
</script>