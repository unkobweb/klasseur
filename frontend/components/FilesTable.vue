<template>
    <div>
        <table v-if="files.length > 0" class="desktop files-table">
            <thead>
                <tr>
                    <!-- Ajouter colonnes nom, taille, type, tags, actions -->
                    <th>Nom</th>
                    <th>Taille</th>
                    <th>Tags</th>
                    <th class="action-buttons">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr class="file-line" v-for="file in files" :key="file.uuid">
                    <td>{{ file.filename }}</td>
                    <td>{{ convertOctets(file.size) }}</td>
                    <td>
                        <CStack :spacing="2" align-items="start" flex-wrap="wrap" is-inline>
                            <CTag cursor="default" size="sm" v-for="tag in file.tags" :key="tag.uuid" mb="1" mt="1">{{ tag.value }}</CTag>
                        </CStack>
                    </td>
                    <td class="action-buttons">
                        <CStack :spacing="2" is-inline>
                            <CButton variant='solid' size="sm" rightIcon="pencil-alt" @click="openFileOptions(file)">Modifier</CButton>
                            <CButton variant='solid' variant-color="blue" size="sm" rightIcon="file-download" @click="downloadFile(file)" >Télécharger</CButton>
                        </CStack>
                    </td>
                </tr>
            </tbody>
        </table>
        <CBox v-if="files.length > 0" class="mobile files-table">
            <ShowFileModal v-if="selectedFile !== null" />
            <CBox v-for="file in files" :key="file.uuid" @click="openFileOptions(file)">
                <CBox d="flex" flex-direction="column">
                    <CHeading as="h4" size="sm">{{ file.filename }}</CHeading>
                    <p class="size">{{ convertOctets(file.size) }}</p>
                </CBox>
                <CStack :spacing="2" align-items="start" flex-wrap="wrap" is-inline>
                    <CTag cursor="default" size="sm" v-for="tag in file.tags" :key="tag.uuid" mb="1" mt="1">{{ tag.value }}</CTag>
                </CStack>
                <CDivider />
            </CBox>
        </CBox>
        <CAlert
            v-else
            status="info"
            variant="subtle"
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
            height="200px"
            width="50%"
            border-radius="10px"
            margin="50px auto auto auto"
            >
            <CAlertIcon name="folder-open" size="40px" :mr="0" />
            <CAlertTitle :mt="4" :mb="1" fontSize="lg">
                Aucun fichier
            </CAlertTitle>
            <CAlertDescription maxWidth="sm">
                Vous n'avez aucun document pour l'instant, appuyez sur le bouton en bas à droite pour en ajouter un.
            </CAlertDescription>
        </CAlert>
        <!-- <CBox d="flex" mt="50px" mb="30px" text-align="center" flex-direction="column" justify-content="center" align-items="center">
            <CIcon name="folder-open" size="80px" mb="25px"/>
            <p>Vous n'avez aucun document pour l'instant, appuyez sur le bouton en bas à droite pour en ajouter un.</p>
        </CBox> -->
    </div>
</template>

<style>
.files-table {
    width: 100%;
    border-collapse: collapse;
    margin: auto;
    margin-top: 20px;
}
.action-buttons {
    display: flex;
    justify-content: flex-end;
}
.size {
    font-size: 12px;
}
th {
    text-align: left;
}
td {
    padding: 7px 0;
}
@media screen and (max-width: 768px) {
    .desktop {
        display: none;
    }   
}
@media screen and (min-width: 769px) {
    .mobile {
        display: none;
    }
}
</style>

<script>
import ShowFileModal from '@/components/ShowFileModal.vue'

export default {
    name: 'FilesTable',
    components: {
        ShowFileModal
    },
    computed: {
        files() {
            // if no research tags, return all files
            const researchTags = this.$store.getters['files/getResearchTags']
            const files = this.$store.getters['files/getFiles']
            if (researchTags.length === 0) {
                return files
            } else {
                // calculate score for each file
                const scoredFiles = this.attributeScore(files, researchTags)
                // sort files by score
                const sortedFiles = scoredFiles.sort(this.sortByScoreDesc)
                return sortedFiles
            }
        },
        researchTags() {
            return this.$store.getters['files/getResearchTags'];
        },
        selectedFile() {
            return this.$store.getters['files/getSelectedFile'];
        }
    },
    methods: {
        convertOctets(octets) {
            if (octets < 1024) {
                return octets + " o";
            } else if (octets < 1048576) {
                return (octets / 1024).toFixed(2) + " Ko";
            } else if (octets < 1073741824) {
                return (octets / 1048576).toFixed(2) + " Mo";
            } else {
                return (octets / 1073741824).toFixed(2) + " Go";
            }
        },
        openFileOptions(file) {
            this.$store.dispatch('files/setSelectedFile', file);
        },
        downloadFile(file) {
            this.$axios.$get(`/api/documents/download/${file.uuid}`)
                .then(response => {
                    console.log(response)
                    // open response.url in a new tab
                    window.open(response.url, '_blank');
                })
        },
        attributeScore(fileArray, tags){
            let finalArray = []
            fileArray.forEach(file => {
                let exactMatchScore = 0;
                let partialMatchScore = 0;
                tags.forEach(propsTag => {
                    file.tags.forEach(tag => {
                        let partialScore = this.compareWords(tag.value, propsTag)
                        if (tag.tag == propsTag){
                            exactMatchScore++;
                        } else if (partialScore > 30){
                            partialMatchScore += partialScore
                        }
                    })
                })
                file.partialMatchScore = partialMatchScore
                file.exactMatchScore = exactMatchScore
                finalArray.push(file)
            })
            return finalArray
        },
        sortByScoreDesc(a,b){
            if (b.exactMatchScore == a.exactMatchScore){
                if (b.partialMatchScore == a.partialMatchScore){
                    return new Date(b.updated_at) - new Date(a.updated_at)
                }
                return b.partialMatchScore - a.partialMatchScore
            }
            return b.exactMatchScore - a.exactMatchScore
        },
        compareWords(word1,word2){
            let smaller = word1.length <= word2.length ? word1 : word2
            let bigger = word1.length > word2.length ? word1 : word2
            
            let reductor = 0
            let matchedAt = null
            
            while(reductor < smaller.length && !matchedAt){
            let startSplited = smaller.substring(reductor,smaller.length)
            let endSplited = smaller.substring(0,smaller.length-reductor)
            
            if (bigger.includes(startSplited,0) || bigger.includes(endSplited,0)){
                matchedAt = (smaller.length-reductor)
            } else {
                reductor++
            }
            }
        
            return matchedAt ? (matchedAt / bigger.length)*100 : 0
        }
    }
}
</script>