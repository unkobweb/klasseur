<template>
    <div>
        <CHeading>Bonjour</CHeading>
        <h1>Bonjour</h1>
        <p>{{$auth.user}}</p>
        <button @click="logout">Logout</button>
        <FilesTable />
        <UploadFile />
    </div>
</template>

<script>
import { CHeading } from '@chakra-ui/vue'
import UploadFile from '@/components/UploadFile'
import FileTable from '@/components/FilesTable'

export default {
    middleware: 'auth',
    components: {
        CHeading,
        UploadFile,
        FileTable
    },
    methods: {
        logout() {
            this.$auth.logout()
        }
    }
}
</script>