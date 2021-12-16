<template>
    <div>
        <CModalBody>
            <div>
                <div class="proposed-tags" v-if="!purposedTags.every(tag => tags.includes(tag))">
                    <CHeading as="h4" size="lg" mb="5">Tags proposés</CHeading>
                    <CStack :spacing="4" align-items="start" is-inline mb="5">
                        <CButton size="sm" cursor="pointer" v-for="tag in purposedTags.filter(tag => !tags.includes(tag))" :key="tag" left-icon="add" @click="addTag(tag)">{{tag}}</CButton>
                    </CStack>
                </div>
                <div class="tags">
                    <CHeading as="h4" size="lg" mb="5">Vos tags</CHeading>
                    <CStack :spacing="4" align-items="start" flex-wrap="wrap" is-inline>
                        <CButton cursor="pointer" size="sm" v-for="tag in tags" :key="tag" left-icon="close" mb="4" @click="removeTag(tag)">{{tag}}</CButton>
                        <p v-if="tags.length === 0" mb="4">Aucun tag</p>
                    </CStack>
                </div>
                <CInput @keypress="submitNewTag" @keyup="tag = tag.trim()" v-model="tag" placeholder="Entrez un tag" />
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
        removeTag(tag) {
            this.$store.dispatch('upload/removeTag', tag);
        },
        addTag(tag) {
            this.$store.dispatch('upload/addTag', tag);
        },
        submitNewTag(e){
            // if enter or space is pressed
            if (e.keyCode === 13 || e.keyCode === 32) {
                // if tag is only chars and dash
                if (/^[a-zA-Z0-9-]+$/.test(this.tag)) {
                    // check if the tag already exist
                    if (!this.tags.includes(this.tag)) {
                        this.addTag(this.tag);
                        this.tag = "";
                    } else {
                        this.$toast({
                            title: "Ce tag existe déjà",
                            description: "Veuillez en choisir un autre",
                            type: "info",
                            position: "top-right",
                            duration: 200000
                        });
                    }
                } else {
                    this.$toast({
                        title: 'Mauvais tag',
                        description: "Le tag ne peut contenir que des lettres, des chiffres et des tirets.",
                        position: "top-right",
                        status: 'error',
                        duration: 2000
                    })
                }
            }
            this.tag = this.tag.trim();
        },
    },
    mounted() {
        const months = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre']
        this.purposedTags = [new Date().getFullYear(), months[new Date().getMonth()], `${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`]
    }
}
</script>