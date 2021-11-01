<template>
    <v-container >
        <v-card class="login-form" elevation="4">
            <h1>CONNEXION</h1>
            <v-alert
                v-if="alert.visible"
                :type="alert.type"
            >{{alert.message}}</v-alert>
            <v-form ref="login" v-model="valid">
                <v-text-field
                    v-model="username"
                    label="Nom d'utilisateur"
                    :rules="usernameRules"
                    prepend-icon="mdi-account"
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    label="Mot de passe"
                    :rules="passwordRules"
                    type="password"
                    prepend-icon="mdi-lock"
                ></v-text-field>
                <v-btn
                    class="mr-4"
                    @click="validate"
                >SE CONNECTER</v-btn>
            </v-form>
        </v-card>
    </v-container>
</template>

<style scoped>
.login-form{
    padding: 35px;
    width: 100%;
    max-width: 600px;
    height: fit-content;
}
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
}
button{
    margin-top: 20px;
}
.v-alert{
    margin-top: 15px;
    margin-bottom: 20px;
}
</style>

<script>
export default {
    data() {
        return {
            valid: false,
            username: "",
            password: "",
            usernameRules: [
                v => !!v || "Veuillez entrez votre nom d'utilisateur"
            ],
            passwordRules: [
                v => !!v || "Veuillez entrer votre mot de passe"
            ],
            alert: {
                visible: false,
                type: "",
                message: ""
            }
        }
    },
    layout: "auth",
    methods: {
        validate(){
            this.alert.visible = false
            if (this.$refs.login.validate()) {
                this.$auth.loginWith('local', {
                    data: {
                        username: this.username,
                        password: this.password
                    }
                }).catch(err => {
                    this.alert.visible = true
                    this.alert.message = "Identifiants invalides"
                    this.alert.type = "error"
                }).then(() => this.$router.push('/'))
            }
        }
    }
}
</script>