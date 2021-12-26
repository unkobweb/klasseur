<template>
    <div>
        <CHeading size="lg" mb="5">Gestion des utilisateurs</CHeading>
        <div class="users-container">
            <CHeading size="sm" mb="3">Nouvel utilisateur</CHeading>
            <div class="form-input">
                <CInput type="email" placeholder="Adresse email" />
                <CButton @click="addUser">Ajouter</CButton>
            </div>
        </div>
        <div class="users-container">
            <CHeading size="sm" mb="3">Liste des utilisateurs</CHeading>
            <div class="user" v-for="user in users" :key="user.uuid">
                <span class="user-email">{{user.email}} {{$auth.user.email === user.email ? '(Vous)': ''}}</span>
                <span class="btn-group">
                    <CButton variant-color="blue" @click="sendMail(user.email)">Réinitialiser le mot de passe</CButton>
                    <CButton variant-color="red" @click="deleteUser(user.uuid)">Supprimer l'utilisateur</CButton>
                </span>
            </div>
        </div>
        <ConfirmModal 
            v-if="promptSendMail"
            @cancel="dontSendMail"
            @confirm="confirmSendMail"
            icon="email"
            iconColor="blue.200"
            confirmText="Envoyer un email pour la réinitialisation du mot de passe ?"
            confirmBtnLabel="Envoyer l'email"
            confirmBtnIcon="email"
            confirmBtnColor="blue"
        />
        <ConfirmModal 
            v-if="promptDelete"
            @cancel="dontDelete"
            @confirm="confirmDelete"
            icon="trash-alt"
            iconColor="red.200"
            :confirmText="`Supprimer l'utilisateur ${selectedEmail} ainsi que tous ses documents et tags ?`"
            confirmBtnLabel="Supprimer"
            confirmBtnIcon="trash"
            confirmBtnColor="red"
        />
    </div>
</template>

<style scoped>
.users-container {
    padding: 20px 25px;
    background-color: #394353;
    border-radius: 10px;
    margin-bottom: 20px;
}
.form-input {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-bottom: 5px;
}
.user {
    padding: 10px 15px;
    margin-bottom: 5px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.user span {
    display: flex;
    align-items: center;
}
.btn-group {
    display: flex;
    flex-direction: row;
    gap: 10px;
}
.user:hover {
    background-color: #4e5663;
}
@media screen and (max-width: 790px) {
    .user {
        flex-direction: column;
    }
    .user-email {
        margin-bottom: 10px;
        text-align: center;
    }
    .btn-group button {
        flex: 1;
    }
}
@media screen and (max-width: 610px) {
    .btn-group{
        flex-direction: column;
    }
    .btn-group button {
        width: 100%;
        padding: 20px 5px;
    }   
}
</style>

<script>
import ConfirmModal from '@/components/ConfirmModal.vue'

export default {
    components: {
        ConfirmModal
    },
    async fetch() {
        const {users} = await this.$axios.get('/api/all-users').then(res => res.data);
        console.log(users);
        this.users = users;
    },
    data() {
        return {
            newUserEmail: '',
            selectedEmail: '',
            selectedUuid: '',
            promptSendMail: false,
            promptDelete: false,
            users: []
        }
    },
    methods: {
        addUser() {
            // check if new user email is a valid mail
            if (this.newUserEmail && this.newUserEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                this.$axios.post('/api/add-user', {email: this.newUserEmail}).then(res => {
                    this.fetch();
                });
            } else {
                this.$toast({
                    title: 'Adresse email erroné',
                    description: "Veuillez entrer une adresse email valide pour la création d'un nouvel utilisateur",
                    status: 'error',
                    position: "top-right",
                    duration: 3000
                })
            }
        },
        sendMail(email) {
            this.promptSendMail = true;
            this.selectedEmail = email;
        },
        dontSendMail() {
            this.promptSendMail = false;
            this.selectedEmail = null;
        },
        confirmSendMail() {
            this.$axios.$post('/api/auth/reset-password', {
                email: this.selectedEmail
            }).then(res => {
                this.$toast({
                    title: 'Email envoyé',
                    description: "Un email vient d'être envoyé à l'utilisateur pour la réinitialisation de son mot de passe",
                    status: 'success',
                    position: "top-right",
                    duration: 3000
                })
            }).catch(err => {
                this.$toast({
                    title: 'Erreur',
                    description: "Une erreur est survenue lors de l'envoi de l'email",
                    status: 'error',
                    position: "top-right",
                    duration: 3000
                })
            }).finally(() => {
                this.promptSendMail = false;
                this.selectedEmail = null;
            });
        },
        deleteUser(uuid) {
            this.promptDelete = true;
            this.selectedUuid = uuid;
        },
        dontDelete() {
            this.promptDelete = false;
            this.selectedUuid = null;
        },
        confirmDelete() {
            this.$axios.$delete(`/api/user/${this.selectedUuid}`).then(res => {
                this.$toast({
                    title: 'Utilisateur supprimé',
                    description: "L'utilisateur a bien été supprimé",
                    status: 'success',
                    position: "top-right",
                    duration: 3000
                })
            }).catch(err => {
                this.$toast({
                    title: 'Erreur',
                    description: "Une erreur est survenue lors de la suppression de l'utilisateur",
                    status: 'error',
                    position: "top-right",
                    duration: 3000
                })
            }).finally(() => {
                this.promptDelete = false;
                this.selectedUuid = null;
                this.$fetch()
            });
        }
    }
}
</script>