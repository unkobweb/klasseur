<template>
    <div>
        <div class="proposed-tags" v-if="purposedTags && !purposedTags.every(tag => tags.includes(tag))">
            <CHeading as="h4" size="lg" mb="5">Tags proposés</CHeading>
            <CStack :spacing="4" align-items="start" is-inline mb="5">
                <CButton size="sm" cursor="pointer" v-for="tag in purposedTags.filter(tag => !tags.includes(tag))" :key="tag" left-icon="add" @click="addTag(tag)">{{tag}}</CButton>
            </CStack>
        </div>
        <CHeading v-if="title" as="h4" size="lg" mb="5">{{ title }}</CHeading>
        <CBox class="tags-input-container" @click="clickOnInput">
            <CStack class="tags-stack" :spacing="0.5" align-items="start" flex-wrap="wrap" is-inline>
                <CButton cursor="pointer" size="sm" v-for="tag in tags" :key="tag" left-icon="small-close" @click="deleteTag(tag)">{{tag}}</CButton>
                <CInput ref="inputTag" :class="`tag-input ${classinput}`" @keydown="handleInputChange" @keyup="cleanTag" v-model="tag"></CInput>
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
    padding: 6px 6px;
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
    props: ['defaultTags', 'title', 'purposedTags', 'classname'],
    data() {
        return {
            tag: "",
            tags: [],
            classinput: "tag-input"
        }
    },
    fetch() {
        if (this.defaultTags) {
            if (typeof this.defaultTags[0] === "object") {
                this.tags = this.defaultTags.map(tag => tag.value)
            } else {
                this.tags = this.defaultTags
            }
        }
        if (this.classname) {
            this.classinput = this.classname
        }
    },
    methods: {
        addTag(tag) {
            this.tags.push(tag)
            this.tags.sort()
            this.$emit("updateTags", this.tags);
        },
        deleteTag(tag) {
            this.tags.splice(this.tags.indexOf(tag), 1);
            this.$emit("updateTags", this.tags);
        },
        handleInputChange(e) {
            // if press delete and input is empty, remove last tag in tags
            if (e.keyCode === 8 && !this.tag) {
                this.deleteTag(this.tags[this.tags.length - 1]);
            }
            // if press space or enter and the tag not already exist and tag is only letter, numbers and dash (put all in lowercase)
            if (e.keyCode === 13 || e.keyCode === 32) {
                if (/^[a-zA-Z0-9-]+$/.test(this.tag)) {
                    if (!this.tags.includes(this.tag)) {
                        this.addTag(this.tag.toLowerCase());
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
            document.querySelector(`.${this.classinput}`).focus();
        }
    }
}
</script>