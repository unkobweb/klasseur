<template>
    <div>
        <c-icon-button id="burger-button" variant="outline" @click="isOpen = true" aria-label="Burger menu" icon="hamburger" />
        <c-drawer :isOpen="isOpen" placement="left" :on-close="close" :initialFocusRef="()=>$refs.inputInsideModal">
            <c-drawer-overlay />
            <c-drawer-content>
                <c-drawer-close-button />
                <c-drawer-header>{{$auth.user.email}}</c-drawer-header>

                <c-drawer-body>
                    <c-heading as="h2" size="md" mb="30px">Statistiques</c-heading>
                    <c-stat mb="10" v-if="numberOfFiles && newestFile">
                        <c-stat-label>Nombre de documents</c-stat-label>
                        <c-stat-number>{{numberOfFiles}}</c-stat-number>
                        <c-stat-helper-text>Dernier ajout le {{formatDate(newestFile.created_at)}}</c-stat-helper-text>
                    </c-stat>
                    <c-stat v-if="totalSize && biggestFile">
                        <c-stat-label>Taille total utilisée</c-stat-label>
                        <c-stat-number>{{convertOctets(totalSize)}}</c-stat-number>
                        <c-stat-helper-text>Plus gros fichier : {{convertOctets(biggestFile.size)}}</c-stat-helper-text>
                    </c-stat>
                </c-drawer-body>

                <c-drawer-footer>
                    <c-button variant-color="blue" @click="disconnect">Se déconnecter</c-button>
                </c-drawer-footer>
            </c-drawer-content>
        </c-drawer>
    </div>
</template>

<style>
#burger-button {
    position: absolute;
    top: 15px;
    left: 20px;
}
</style>

<script>
export default {
    name: "Menu",
    data() {
        return {
            isOpen: false,
            numberOfFiles: null,
            biggestFile: null,
            newestFile: null,
            totalSize: null
        }
    },
    mounted() {
        const files = this.$store.getters['files/getFiles']
        console.log(files)
        // in files find the file with the biggest size
        this.biggestFile = files.reduce((prev, current) => {
            return prev.size > current.size ? prev : current
        })
        // find the file with the newest created_at date
        this.newestFile = files.reduce((prev, current) => {
            return prev.created_at > current.created_at ? prev : current
        })
        this.numberOfFiles = files.length
        // calc size of all files
        this.totalSize = files.reduce((prev, current) => {
            return prev + current.size
        }, 0)
    },
    methods: {
        close() {
            this.isOpen = false
        },
        disconnect() {
            this.$auth.logout().then(() => {
                this.$toast({
                    title: 'Déconnexion réussie',
                    description: "Vous êtes maintenant déconnecté",
                    status: 'success',
                    position: "top-right",
                    duration: 3000
                })
                this.$router.push('/login')
            })
        },
        convertOctets(octets) {
            if (octets < 1024) {
                return octets + ' octets'
            } else if (octets < 1048576) {
                return (octets / 1024).toFixed(2) + ' Ko'
            } else if (octets < 1073741824) {
                return (octets / 1048576).toFixed(2) + ' Mo'
            } else {
                return (octets / 1073741824).toFixed(2) + ' Go'
            }
        },
        formatDate(date) {
            date = new Date(date)
            // format date for FR
            return date.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
        }
    },
}
</script>