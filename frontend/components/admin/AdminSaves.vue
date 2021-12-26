<template>
    <div>
        <CHeading size="lg" mb="5">Sauvegardes</CHeading>
        <div class="save">
            <CHeading size="sm" mb="4">Sauvegarde de la base de données</CHeading>
            <div class="input-group">
                <CInput v-model="dbSave" placeholder="* * * * *" />
                <CButtonGroup class="btn-group">
                    <CButton @click="saveDbScheduler" :variant-color="defaultDbSave === dbSave ? '' : 'vue'" rightIcon="check" :disabled="defaultDbSave === dbSave">Appliquer</CButton>
                    <CButton @click="deleteDbScheduler" :variant-color="!defaultDbSave ? '' : 'red'" rightIcon="trash" :disabled="!defaultDbSave">Supprimer</CButton>
                </CButtonGroup>
            </div>
        </div>
        <div class="save">
            <CHeading size="sm" mb="4">Sauvegarde des fichiers</CHeading>
            <div class="input-group">
                <CInput v-model="fileSave" placeholder="* * * * *" />
                <CButtonGroup class="btn-group">
                    <CButton @click="saveFileScheduler" :variant-color="defaultFileSave === fileSave ? '' : 'vue'" :disabled="defaultFileSave === fileSave" rightIcon="check">Appliquer</CButton>
                    <CButton @click="deleteFileScheduler" :variant-color="!defaultFileSave ? '' : 'red'" rightIcon="trash" :disabled="!defaultFileSave">Supprimer</CButton>
                </CButtonGroup>
            </div>
        </div>
    </div>
</template>

<style>
.save {
    background-color: #394353;
    padding: 25px;
    margin-bottom: 20px;
    border-radius: 10px;
}
.input-group {
    display: flex;
    flex-direction: row;
}
.btn-group {
    display: flex;
    flex-direction: row;
    margin-left: 10px;
}
.btn-group button {
    flex: 1;
}
@media screen and (max-width: 630px) {
    .input-group {
        flex-direction: column;
    }
    .btn-group {
        margin-top: 10px;
        margin-left: 0;
    }
}
@media screen and (max-width: 410px) {
    .btn-group {
        flex-direction: column;
        gap: 10px;
    }
    .btn-group button {
        width: 100%;
        padding: 20px 5px;
    }
}
</style>

<script>
export default {
    name: 'AdminSaves',
    async fetch() {
        await this.$axios.$get('api/schedulers').then(res => {
            this.defaultDbSave = res.dbScheduler.value || '';
            this.dbSave = res.dbScheduler.value || '';
            this.defaultFileSave = res.fileScheduler.value || '';
            this.fileSave = res.fileScheduler.value || '';
        });
    },
    data() {
        return {
            defaultDbSave: '',
            defaultFileSave: '',
            dbSave: '',
            fileSave: ''
        }
    },
    methods: {
        isValidCrontab(str) {
            const regex = new RegExp(/^(\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|([0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])|\*\/([1-9]|1[0-2])) (\*|([0-6])|\*\/([0-6]))$/)
            if (str.match(regex)) {
                return true
            } else {
                return false
            }
        },
        saveDbScheduler() {
            if (this.isValidCrontab(this.dbSave)) {
                this.$axios.$post('/api/scheduler', {name: "db_save_scheduler", value: this.dbSave}).catch(() => {
                    this.$toast({
                        title: 'Erreur',
                        description: "Une erreur est survenue lors de l'enregistrement de la crontab.",
                        status: 'error',
                        position: "top-right",
                        duration: 3000
                    })
                }).finally(() => {
                    this.$fetch()
                })
            } else {
                this.$toast({
                    title: 'Crontab non valide',
                    description: "Le crontab n'est pas valide, veuillez vérifier votre saisie.",
                    status: 'error',
                    position: "top-right",
                    duration: 3000
                })
            }
        },
        saveFileScheduler() {
            if (this.isValidCrontab(this.fileSave)) {
                this.$axios.$post('/api/scheduler', {name: "file_save_scheduler", value: this.fileSave}).catch(() => {
                    this.$toast({
                        title: 'Erreur',
                        description: "Une erreur est survenue lors de l'enregistrement de la crontab.",
                        status: 'error',
                        position: "top-right",
                        duration: 3000
                    })
                }).finally(() => {
                    this.$fetch()
                })
            } else {
                this.$toast({
                    title: 'Crontab non valide',
                    description: "Le crontab n'est pas valide, veuillez vérifier votre saisie.",
                    status: 'error',
                    position: "top-right",
                    duration: 3000
                })
            }
        },
        deleteDbScheduler() {
            this.$axios.$delete(`/api/scheduler/db_save_scheduler`).catch(() => {
                this.$toast({
                    title: 'Erreur',
                    description: "Une erreur est survenue lors de la suppression de la crontab.",
                    status: 'error',
                    position: "top-right",
                    duration: 3000
                })
            }).finally(() => {
                this.$fetch()
            })
        },
        deleteFileScheduler() {
            this.$axios.$delete(`/api/scheduler/file_save_scheduler`).catch(() => {
                this.$toast({
                    title: 'Erreur',
                    description: "Une erreur est survenue lors de la suppression de la crontab.",
                    status: 'error',
                    position: "top-right",
                    duration: 3000
                })
            }).finally(() => {
                this.$fetch()
            })
        }
    }
}
</script>