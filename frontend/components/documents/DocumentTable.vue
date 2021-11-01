<template>
    <v-data-table
    :headers="headers"
    :items="$store.getters['document/getDocuments']"
    class="elevation-1"
    :hide-default-footer="true"
    :items-per-page="-1"
  >
    <template v-slot:item.size="{ item }">
        {{factoBytes(item.size)}}
    </template>
    <template v-once v-slot:item.tags="{ item }">
        <v-chip label :color="`${getNextColor()} lighten-3`" v-for="tag in item.tags" :key="tag.uuid">
            {{ tag.value }}
        </v-chip>
    </template>
    <template v-slot:item.created_at="{ item }">
        {{parseDate(item.created_at)}}
    </template>
    <template v-slot:item.uuid="{ item }">
        <v-btn
            elevation="2"
            icon
        >
            <v-icon dark>
                mdi-pencil
            </v-icon>
        </v-btn>
        <v-btn
            elevation="2"
            icon
        >
            <v-icon dark>
                mdi-download
            </v-icon>
        </v-btn>
    </template>
  </v-data-table>
</template>

<style scoped>
.v-chip{
    margin-right: 5px;
}
</style>

<script>
const colors = ['green', 'purple', 'yellow', 'red', 'blue', 'orange']

export default {
    name: "DocumentTable",
    data() {
        return {
            headers: [
                {
                    text: "Nom du fichier",
                    sortable: false,
                    value: "filename"
                },
                {
                    text: "Taille",
                    sortable: false,
                    value: "size"
                },
                {
                    text: "Tags",
                    sortable: false,
                    value: "tags"
                },
                {
                    text: "Ajouté le",
                    sortable: false,
                    value: "created_at"
                },
                {
                    text: "Actions",
                    sortable: false,
                    value: "uuid"
                }
            ]
        }
    },
    mounted() {
        this.shuffle(colors)
    },
    methods: {
        parseDate(dateToParse) {
            const date = new Date(dateToParse)
            let day = String(date.getDate()).padStart(2,'0');
            let month = String(date.getMonth()).padStart(2,'0');
            let year = String(date.getFullYear()).padStart(2,'0');
            let hour = String(date.getHours()).padStart(2,'0');
            let minutes = String(date.getMinutes()).padStart(2,'0');
            let seconds = String(date.getSeconds()).padStart(2,'0');
            return day + "/" + month + "/" + year + " - " + hour + ":" + minutes + ":" + seconds
        },
        factoBytes(octets) {
            let allTypes = ["O", "Ko", "Mo", "Go", "To"];
            let divised = 0;
            while ((octets / 1024) >= 1) {
                octets /= 1024;
                divised++;
            }
            return octets.toFixed(2) + " " + allTypes[divised];
        },
        shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        },
        getNextColor(){
            const color = colors.pop()
            colors.unshift(color)
            return color
        }
    }
}
</script>