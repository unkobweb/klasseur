<template>
    <div class="admin-panel">
        <CHeading text-align="center" size="md" mb="5">Administration</CHeading>
        <AdminStats v-if="menu === 0"/>
        <AdminUsers v-if="menu === 1"/>
        <AdminSaves v-if="menu === 2"/>
    </div>
</template>

<style>
.admin-panel {
    padding: 22px;
    max-width: 1435px;
    margin: auto;
}
</style>

<script>
import AdminStats from '@/components/admin/AdminStats.vue';
import AdminUsers from '@/components/admin/AdminUsers.vue';
import AdminSaves from '@/components/admin/AdminSaves.vue';

export default {
    layout: 'admin',
    components: {
        AdminStats,
        AdminUsers,
        AdminSaves
    },
    computed: {
        menu() {
            return this.$store.getters['admin/getMenu'];
        }
    }
}
</script>