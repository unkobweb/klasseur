<template>
    <div class="admin-panel">
        <CHeading text-align="center" size="md" mb="5">Administration</CHeading>
        <AdminStats v-if="menu === 0"/>
        <AdminUsers v-if="menu === 1"/>
        <AdminSaves v-if="menu === 2"/>
        <AdminLogs ref="logs" v-if="menu === 3"/>
        <infinite-loading v-if="menu === 3" @infinite="infiniteScroll">
            <template v-slot:no-more>
                <p>Fin du journal de logs</p>
            </template>
            <template v-slot:no-results>
                <p>Fin du journal de logs</p>
            </template>
        </infinite-loading>
    </div>
</template>

<style>
.admin-panel {
    padding: 22px;
    max-width: 1435px;
    margin: auto;
    overflow-y: auto;
}
</style>

<script>
import AdminStats from '@/components/admin/AdminStats.vue';
import AdminUsers from '@/components/admin/AdminUsers.vue';
import AdminSaves from '@/components/admin/AdminSaves.vue';
import AdminLogs from '@/components/admin/AdminLogs.vue';

export default {
    layout: 'admin',
    components: {
        AdminStats,
        AdminUsers,
        AdminSaves,
        AdminLogs
    },
    computed: {
        menu() {
            return this.$store.getters['admin/getMenu'];
        }
    },
    methods: {
        async infiniteScroll($state) {
            setTimeout(async () => {
                const res = await this.$refs.logs.fetchLogs();
                if (res.data.logs.meta.current_page === res.data.logs.meta.last_page) {
                    $state.complete();
                } else {
                    $state.loaded();
                }
            }, 500);
        }
    }
}
</script>