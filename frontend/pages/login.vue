<template>
    <v-form ref="login" v-model="valid">
        <v-container>
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
                prepend-icon="mdi-lock"
            ></v-text-field>
            <v-btn
                class="mr-4"
                @click="validate"
            >SE CONNECTER</v-btn>
        </v-container>
    </v-form>
</template>

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
            ]
        }
    },
    layout: "auth",
    methods: {
        validate(){
            if (this.$refs.login.validate()) {
                this.$auth.loginWith('local', {
                    data: {
                        username: this.username,
                        password: this.password
                    }
                }).catch(err => console.log("Wrong password/username"))
                // this.$axios.$post("http://localhost:3333/api/login",{username: this.username, password: this.password})
                //     .then(res => console.log(res))
            } else {

            }
        }
    }
}
</script>