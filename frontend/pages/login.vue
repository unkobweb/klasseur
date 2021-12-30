<template>
    <div class="container">
        <CBox
            d="flex"
            w="100vw"
            h="100vh"
            flex-dir="column"
            justify-content="center"
            align-items="center"
        >
            <CBox
                d="flex"
                max-w="600px"
                flex-dir="column"
                justify-content="center"
                align-items="center"
                mb="200px"
            >
                <CHeading mb="10">Klasseur</CHeading>
                <CFormControl mb="5">
                    <CFormLabel mb="1">Adresse email</CFormLabel>
                    <CInput
                        class="login-input"
                        type="email"
                        v-model="login.email"
                    />
                </CFormControl>
                <CFormControl mb="5">
                    <CFormLabel mb="1">Mot de passe</CFormLabel>
                    <CInputGroup>
                        <CInput
                            class="login-input"
                            :type="showPassword ? 'text' : 'password'"
                            v-model="login.password"
                        />
                        <CInputRightElement>
                            <CIconButton
                                :icon="showPassword ? 'eye-slash' : 'eye'"
                                :aria-label="showPassword ? 'Cacher le mot de passe' : 'Afficher le mot de passe'"
                                @click="showPassword = !showPassword"
                            />
                        </CInputRightElement>
                    </CInputGroup>
                </CFormControl>
                <CStack class="login-buttons">
                    <CButton :is-loading="loading" variant-color="blue" variant='solid' rightIcon="arrow-forward" @click="loginUser">
                        Se connecter
                    </CButton>
                    <NuxtLink to="/forgot-password">
                        <CButton variant-color="blue" variant='link'>
                            Mot de passe oublié
                        </CButton>
                    </NuxtLink>
                </CStack>
            </CBox>
        </CBox>
    </div>
</template>

<style>
.login-input {
    min-width: 400px;
}
.login-buttons {
    display: flex;
    flex-direction: row !important;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}
.login-buttons button {
    margin-bottom: 0;
}
@media screen and (max-width: 520px) {
    .login-input {
        min-width: 90vw;
    }
    
}
@media screen and (max-width: 360px) {
    .login-buttons {
        flex-direction: column;
    }
    .login-buttons button {
        width: 100%;
    }
}
</style>

<script>
export default {
    layout: "login",
    middleware: ["wizard"],
    data(){
        return {
            loading: false,
            showPassword: false,
            login: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async loginUser(){
            this.loading = true
            try {
                let response = await this.$auth.loginWith('local', { data: this.login })
                this.$toast({
                    title: 'Connexion réussie',
                    description: "Vous êtes maintenant connecté",
                    status: 'success',
                    position: "top-right",
                    duration: 2000
                })
                this.$router.push('/')
            } catch (err) {
                this.$toast({
                    title: 'Connexion impossible',
                    description: "La combinaison adresse mail/mot de passe est incorrecte.",
                    position: "top-right",
                    status: 'error',
                    duration: 2000
                })
            } finally {
                this.loading = false
            }
        }
    }
}
</script>