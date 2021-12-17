<template>
    <div>
        <CModalBody>
            <div>
                <TagsInput title="Tags du document" @updateTags="updateTags" :purposedTags="purposedTags" classname="upload-tags" />
            </div>
        </CModalBody>
        <CModalFooter>
            <CButtonGroup :spacing="2">
                <CButton @click="$emit('goPrevious')" variant='solid'>Précédent</CButton>
                <CButton @click="$emit('goNext')" :isDisabled="tags.length === 0" variant-color="blue" variant='solid'>Suivant</CButton>
            </CButtonGroup>
        </CModalFooter>
    </div>
</template>

<script>
export default {
    name: 'TagsSelector',
    data() {
        return {
            tag: "",
            purposedTags: []
        }
    },
    computed: {
        tags() {
            return this.$store.getters['upload/getState'].tags;
        }
    },
    methods: {
        updateTags(tags) {
            console.log("WILL CALL STORE", tags)
            this.$store.dispatch('upload/setTags', tags)
        }
    },
    mounted() {
        const months = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre']
        this.purposedTags = [new Date().getFullYear(), months[new Date().getMonth()], `${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`]
    }
}
</script>