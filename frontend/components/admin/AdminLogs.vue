<template>
    <div>
        <CHeading size="lg" mb="5">Logs</CHeading>
        <div class="logs">
            <CAlert class="log" :status="log.type" v-for="log in logs" :key="log.uuid">
                <div class="title">
                    <div class="left">
                        <CAlertIcon /><CHeading size="sm">{{log.title}}</CHeading>
                    </div>
                    <div class="right">{{parseDate(log.created_at)}}</div>
                </div>
                <div v-if="log.content" class="content">{{log.content}}</div>
            </CAlert>
        </div>
    </div>
</template>

<style>
.logs {
    display: flex;
    flex-direction: column;
    background-color: #394353;
    padding: 25px;
    margin-bottom: 20px;
    border-radius: 10px;
    gap: 10px;
    overflow-y: auto;
}
.log {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
.left {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.content {
    margin-top: 10px;
}
</style>

<script>
export default {
    name: 'AdminLogs',
    data() {
        return {
            logs: [],
            page: 0,
            maxPage: null
        }
    },
    methods: {
        async fetchLogs() {
            this.page++
            const res = await this.$axios.get('/api/logs?page=' + this.page)
            this.logs = [...this.logs, ...res.data.logs.data]
            return res
        },
        parseDate(date) {
            date = new Date(date)
            // format date to dd/mm/yyyy - hh:mm:ss
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
        }
    }
}
</script>