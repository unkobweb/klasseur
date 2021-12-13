<template>
    <div>
        <CIconButton icon="add" @click="openModal = true" aria-label="upload" size="lg" id="upload-btn"/>
        <CModal :is-open="openModal" :on-close="closeModal">
            <CModalContent>
                <CModalHeader>Héberger un document</CModalHeader>
                <CModalCloseButton/>
                <Dropzone v-if="step === 0" @goNext="goNext"/>
                <TagsSelector v-if="step === 1" @goNext="goNext" @goPrevious="goPrevious"/>
                <SendFile v-if="step === 2" @goPrevious="goPrevious" @closeModal="closeModal" />
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
    border-radius: 10px;
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
.purposed-tag {
    cursor: pointer;
}
</style>

<script>
import Dropzone from '@/components/upload/Dropzone.vue';
import TagsSelector from '@/components/upload/TagsSelector.vue';
import SendFile from '@/components/upload/SendFile.vue';

export default {
    name: 'UploadFile',
    data() {
        return {
            openModal: false,
            step: 0,
        }
    },
    components: {
        Dropzone,
        TagsSelector,
        SendFile
    },
    methods: {
        closeModal() {
            this.openModal = false;
            this.step = 0;
            this.$store.dispatch('upload/setFile', null);
            this.$store.dispatch('upload/setTags', []);
        },
        goPrevious() {
            this.step--;
        },
        goNext() {
            this.step++;
        }
    }
}
</script>