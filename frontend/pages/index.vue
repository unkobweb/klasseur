<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <DocumentTable/>
      <DocumentUpload/>
    </v-col>
  </v-row>
</template>

<script>
import DocumentTable from '~/components/documents/DocumentTable'
import DocumentUpload from '~/components/documents/DocumentUpload'

export default {
  components: {DocumentTable, DocumentUpload},
  async asyncData({$axios, store}){
    const documents = await $axios.$get("/api/documents/me")
    if (documents) {
      store.dispatch('document/setDocuments',documents)
    }
  }
}
</script>