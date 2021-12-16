<template>
    <div>
        <CBox class="tags-input-container" @click="clickOnInput">
            <CStack class="tags-stack" :spacing="0.5" align-items="start" flex-wrap="wrap" is-inline>
                <CButton cursor="pointer" size="sm" v-for="tag in tags" :key="tag" left-icon="small-close" @click="deleteTag(tag)">{{tag}}</CButton>
                <CInput ref="inputTag" class="tag-input" @keydown="handleInputChange" @keyup="cleanTag" v-model="tag"></CInput>
            </CStack>
        </CBox>
    </div>
</template>

<style>
.tags-input-container {
    background: var(--colors-whiteAlpha-100);
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    cursor: text;
    padding: 2px 6px;
    border-radius: 5px;
}
.tag-input {
    width: auto;
    min-width: 200px;
    background: none;
    outline: none;
    border: none;
    box-shadow: none;
    padding: 0;
}
.tag-input:focus {
    box-shadow: none;
}
.tags-stack {
    align-items: center;
    gap: 10px;
}
</style>

<script>
export default {
    name: 'TagsInput',
    data() {
        return {
            tag: "",
            tags: []
        }
    },
    methods: {
        deleteTag(tag) {
            this.tags.splice(this.tags.indexOf(tag), 1);
        },
        handleInputChange(e) {
            console.log(e.keyCode)
            // if press delete and input is empty, remove last tag in tags
            if (e.keyCode === 8 && !this.tag) {
                this.deleteTag(this.tags[this.tags.length - 1]);
            }
            // if press space or enter and the tag not already exist and tag is only letter, numbers and dash (put all in lowercase)
            if (e.keyCode === 13 || e.keyCode === 32) {
                if (/^[a-zA-Z0-9-]+$/.test(this.tag)) {
                    if (!this.tags.includes(this.tag)) {
                        this.tags.push(this.tag.toLowerCase());
                        this.tag = "";
                    }
                }
            }
            this.cleanTag()
        },
        cleanTag() {
            this.tag = this.tag.replace(/[^a-zA-Z0-9-]/g, '');
        },
        clickOnInput() {
            // focus on input
            document.querySelector('.tag-input').focus();
            console.log(this.$refs.inputTag)
        }
    }
}
</script>