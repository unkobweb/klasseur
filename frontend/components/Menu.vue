<template>
    <div>
        <c-icon-button id="burger-button" variant="outline" @click="isOpen = true" aria-label="Burger menu" icon="hamburger" />
        <c-drawer :isOpen="isOpen" placement="left" :on-close="close" :initialFocusRef="()=>$refs.inputInsideModal">
            <c-drawer-overlay />
            <c-drawer-content>
                <c-drawer-close-button />
                <c-drawer-header>{{$auth.user.email}}</c-drawer-header>

                <c-drawer-body v-if="files.length > 0 && newestFile">
                    <c-heading as="h2" size="md" mb="30px">Statistiques</c-heading>
                    <c-stat mb="10">
                        <c-stat-label>Nombre de documents</c-stat-label>
                        <c-stat-number>{{files.length}} {{files.length > 1 ? "Documents" : "Document"}}</c-stat-number>
                        <c-stat-helper-text>Dernier ajout le {{formatDate(newestFile.created_at)}}</c-stat-helper-text>
                    </c-stat>
                    <c-stat v-if="totalSize && biggestFile">
                        <c-stat-label>Taille total utilisée</c-stat-label>
                        <c-stat-number>{{convertOctets(totalSize)}}</c-stat-number>
                        <c-stat-helper-text>Plus gros fichier : {{convertOctets(biggestFile.size)}}</c-stat-helper-text>
                    </c-stat>
                </c-drawer-body>
                <c-drawer-body v-else>
                    <CAlert
                        status="info"
                        variant="subtle"
                        flexDirection="column"
                        justifyContent="center"
                        textAlign="center"
                        border-radius="5px"
                        h="100%"
                        >
                        <CAlertIcon name="chart-pie" size="40px" :mr="0" />
                        <CAlertTitle :mt="4" :mb="1" fontSize="lg">
                            Statistiques
                        </CAlertTitle>
                        <CAlertDescription maxWidth="sm">
                            Dès que vous aurez hébergé un fichier, vous trouverez ici les statistiques liées à vos fichiers.
                        </CAlertDescription>
                    </CAlert>
                </c-drawer-body>

                <c-drawer-footer>
                    <c-button-group d="flex" justify-content="space-between" w="100%">
                        <NuxtLink v-if="$auth.user.is_admin" to="/admin">
                            <c-button variant-color="vue">Administration</c-button>
                        </NuxtLink>
                        <c-button variant-color="blue" @click="disconnect">Se déconnecter</c-button>
                    </c-button-group>
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
            isOpen: false
        }
    },
    computed: {
        files() {
            return this.$store.getters['files/getFiles']
        },
        biggestFile() {
            return this.files.reduce((a, b) => a.size > b.size ? a : b)
        },
        newestFile() {
            return this.files.reduce((a, b) => a.created_at > b.created_at ? a : b)
        },
        totalSize() {
            return this.files.reduce((acc, val) => acc + val.size, 0)
        }
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