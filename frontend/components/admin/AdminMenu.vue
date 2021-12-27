<template>
    <div>
        <c-icon-button id="burger-button" variant="outline" @click="isOpen = true" aria-label="Burger menu" icon="hamburger" />
        <c-drawer :isOpen="isOpen" placement="left" :on-close="close" :initialFocusRef="()=>$refs.inputInsideModal">
            <c-drawer-overlay />
            <c-drawer-content>
                <c-drawer-close-button />
                <c-drawer-header>Administration</c-drawer-header>

                <c-drawer-body d="flex" flex-direction="column" align-items="flex-start">
                    <NuxtLink class="admin-menu-btn" to="/">
                        <c-link><c-icon name="arrow-left" />Retour aux documents</c-link>
                    </NuxtLink>
                    <c-link :class="menuSelected === 0 ? 'active admin-menu-btn': 'admin-menu-btn'" @click="setMenu(0)"><c-icon name="chart-pie" />Statistiques</c-link>
                    <c-link :class="menuSelected === 1 ? 'active admin-menu-btn': 'admin-menu-btn'" @click="setMenu(1)"><c-icon name="users" />Gestion utilisateurs</c-link>
                    <c-link :class="menuSelected === 2 ? 'active admin-menu-btn': 'admin-menu-btn'" @click="setMenu(2)"><c-icon name="save" />Sauvegardes</c-link>
                    <c-link :class="menuSelected === 3 ? 'active admin-menu-btn': 'admin-menu-btn'" @click="setMenu(3)"><c-icon name="file-alt" />Logs</c-link>
                </c-drawer-body>

                <c-drawer-footer>
                    <c-button variant-color="blue" @click="disconnect">Se déconnecter</c-button>
                </c-drawer-footer>
            </c-drawer-content>
        </c-drawer>
    </div>
</template>

<style>
.admin-menu-btn {
    margin-bottom: 10px;
    padding: 10px;
    padding-left: 20px;
    width: 100%;
    text-align: left;
    vertical-align: center;
    border-radius: 3px;
}
.admin-menu-btn.active {
    background-color: #525c6b !important;
}
.admin-menu-btn:hover {
    background-color: #3c4452;
}
a:hover {
    text-decoration: none !important;
}
.admin-menu-btn svg{
    margin-right: 20px;
    margin-bottom: 3px;
}
#burger-button {
    position: absolute;
    top: 15px;
    left: 20px;
}
</style>

<script>
export default {
    data() {
        return {
            isOpen: false
        }
    },
    computed: {
        menuSelected() {
            return this.$store.getters['admin/getMenu']
        }
    },
    methods: {
        setMenu(index) {
            this.$store.dispatch('admin/setMenu', index)
            this.close()
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
        close() {
            this.isOpen = false
        }
    }
}
</script>