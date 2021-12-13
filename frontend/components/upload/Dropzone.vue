<template>
    <div>
        <CModalBody>
            <div class="dropzone-container">
                <div class="dropzone">
                    <CIcon :name="fileName ? 'check' : 'arrow-up'" size="42px"/>
                    <p>{{ fileName || "Cliquez pour ajouter un fichier" }}</p>
                    <p v-if="fileName">{{ fileSize }}</p>
                    <input ref="fileInput" type="file" @change="previewFiles">
                </div>
                <p v-if="fileName" @click="deleteFile" class="delete-file-btn"><CIcon name="close" aria-label="Delete file"/><span>Supprimer le fichier</span></p>
            </div>
        </CModalBody>
        <CModalFooter>
            <CButtonGroup :spacing="2">
                <CButton @click="$emit('goNext')" :isDisabled="!fileName" variant-color="blue" variant='solid'>Suivant</CButton>
            </CButtonGroup>
        </CModalFooter>
    </div>
</template>

<script>
export default {
    name: 'Dropzone',
    computed: {
        fileName() {
            return this.$store.getters['upload/getState'].file ? this.$store.getters['upload/getState'].file.name : "";
        },
        fileSize() {
            return this.$store.getters['upload/getState'].file ? this.convertOctets(this.$store.getters['upload/getState'].file.size) : "0 octet";
        },
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
        previewFiles(e) {
            console.log(e.target.files[0]);
            if (e.target.files && e.target.files[0]) {
                this.$store.dispatch('upload/setFile', e.target.files[0])
                this.canGoNext = true;
            } else {
                this.$store.dispatch('upload/setFile', null)
                this.canGoNext = false;
            }
        },
        deleteFile() {
            this.$store.dispatch('upload/setFile', null);
            this.$refs.fileInput.value = '';
            this.canGoNext = false;
        },
    }
}
</script>