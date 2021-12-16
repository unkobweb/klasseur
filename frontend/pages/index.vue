<template>
    <div class="index-container">
        <CHeading as="h1" size="md" text-align="center" mb="5">Klasseur</CHeading>
        <TagsInput />
        <FilesTable />
        <UploadFile />
    </div>
</template>

<style>
.index-container {
    padding: 20px;
    max-width: 1300px;
    margin: auto;
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
    async asyncData({$axios, store}) {
        await $axios.$get('/api/documents/me').then(response => {
            store.dispatch('files/setFiles', response);
        });
    }
}
</script>