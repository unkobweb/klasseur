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
                            <CIcon name="arrow-up" size="42px"/>
                            <p>Cliquez ou glissez un fichier</p>
                            <input type="file" @change="previewFiles">
                        </div>
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
    justify-content: center;
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
    margin-top: 50px;
    margin-bottom: 50px;
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
        }
    },
}
</script>