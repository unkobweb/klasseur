<template>
    <div>
        <CIconButton icon="add" @click="openModal = true" aria-label="upload" size="lg" id="upload-btn"/>
        <CModal :is-open="openModal" :on-close="closeModal">
            <CModalContent>
                <CModalHeader>Héberger un document</CModalHeader>
                <CModalCloseButton/>
                <CModalBody>
                    <div class="dropzone-container">
                        <div class="dropzone">
                            <CIcon :name="fileName ? 'check' : 'arrow-up'" size="42px"/>
                            <p>{{ fileName || "Cliquez pour ajouter un fichier" }}</p>
                            <input ref="fileInput" type="file" @change="previewFiles">
                        </div>
                        <p v-if="fileName" @click="deleteFile" class="delete-file-btn"><CIcon name="close" aria-label="Delete file"/><span>Supprimer le fichier</span></p>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButtonGroup :spacing="2">
                        <CButton @click="step--" :isDisabled="!step" variant='solid'>Précédent</CButton>
                        <CButton @click="step++" :isDisabled="!canGoNext" variant-color="blue" variant='solid'>Suivant</CButton>
                    </CButtonGroup>
                </CModalFooter>
            </CModalContent>
            <CModalOverlay/>
        </CModal>
    </div>
</template>

<style>
#upload-btn {
    position: absolute;
    right: 20px;
    bottom: 20px;
}
.dropzone-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 40px;
}
.dropzone {
    position: relative;
    height: 200px;
    width: 200px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    align-items: center;
    justify-content: center;
    background-color: #384252;
    text-align: center;
    border-radius: 5px;
    margin-bottom: 10px;
}
.dropzone [type="file"] {
  cursor: pointer;
  position: absolute;
  width: 200px;
  height: 200px;
  opacity: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.delete-file-btn{
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
}
.delete-file-btn span{
    margin-left: 10px;
}
</style>

<script>
import {
    CIconButton,
    CModal,
    CModalOverlay,
    CModalContent,
    CModalHeader,
    CModalFooter,
    CModalBody,
    CModalCloseButton,
    CButton,
    CButtonGroup,
    CIcon
} from '@chakra-ui/vue'

export default {
    name: 'UploadFile',
    components: {
        CIconButton,
        CModal,
        CModalOverlay,
        CModalContent,
        CModalHeader,
        CModalFooter,
        CModalBody,
        CModalCloseButton,
        CButton,
        CButtonGroup,
        CIcon
    },
    data() {
        return {
            openModal: false,
            step: 0,
            canGoNext: false,
        }
    },
    computed: {
        fileName() {
            return this.$store.getters['upload/getState'].file ? this.$store.getters['upload/getState'].file.name : "";
        },
    },
    methods: {
        closeModal() {
            this.openModal = false;
            this.step = 0;
            this.$store.dispatch('upload/setFile', null);
            this.$store.dispatch('upload/setTags', []);
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
    },
}
</script>