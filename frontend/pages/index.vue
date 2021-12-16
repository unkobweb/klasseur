<template>
    <div class="index-container">
        <TagsInput />
        <button @click="logout">Logout</button>
        <FilesTable />
        <UploadFile />
    </div>
</template>

<style>
.index-container {
    padding: 20px;
}
</style>

<script>
import { CHeading } from '@chakra-ui/vue'
import UploadFile from '@/components/UploadFile'
import FileTable from '@/components/FilesTable'
import TagsInput from '@/components/TagsInput'

export default {
    middleware: 'auth',
    components: {
        CHeading,
        UploadFile,
        FileTable,
        TagsInput
    },
    methods: {
        logout() {
            this.$auth.logout()
        }
    }
}
</script>