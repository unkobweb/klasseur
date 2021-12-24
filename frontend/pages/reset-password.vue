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
                <CHeading size="md" mb="10">Changement du mot de passe</CHeading>
                <CFormControl mb="5">
                    <CFormLabel mb="1">Mot de passe</CFormLabel>
                    <CInputGroup>
                        <CInput
                            class="login-input"
                            :type="showPassword ? 'text' : 'password'"
                            v-model="password"
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
                <CFormControl mb="5">
                    <CFormLabel mb="1">Confirmation du mot de passe</CFormLabel>
                    <CInputGroup>
                        <CInput
                            class="login-input"
                            :type="showPasswordConfirmed ? 'text' : 'password'"
                            v-model="passwordConfirmed"
                        />
                        <CInputRightElement>
                            <CIconButton
                                :icon="showPasswordConfirmed ? 'eye-slash' : 'eye'"
                                :aria-label="showPasswordConfirmed ? 'Cacher le mot de passe' : 'Afficher le mot de passe'"
                                @click="showPasswordConfirmed = !showPasswordConfirmed"
                            />
                        </CInputRightElement>
                    </CInputGroup>
                    
                </CFormControl>
                <CStack class="login-buttons">
                    <CButton :is-loading="loading" variant-color="blue" variant='solid' rightIcon="arrow-forward" @click="sendNewPassword">
                        Changer le mot de passe
                    </CButton>
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
    layout: 'login',
    data() {
        return {
            loading: false,
            showPassword: false,
            showPasswordConfirmed: false,
            password: '',
            passwordConfirmed: ''
        }
    },
    mounted() {
        console.log(this.$route.query.token);
    },
    methods: {
        async sendNewPassword(){
            this.loading = true;

            // check if password is provided and equal to confirmed password
            if (!this.password) {
                this.$toast({
                    title: 'Mot de passe',
                    description: "Vous devez spécifier un mot de passe",
                    status: 'error',
                    position: "top-right",
                    duration: 3000
                })
                return
            } else if (this.password !== this.passwordConfirmed) {
                this.$toast({
                    title: 'Mot de passe',
                    description: "Les mots de passe ne correspondent pas",
                    status: 'error',
                    position: "top-right",
                    duration: 3000
                })
                return
            }

            this.$axios.$post('/api/auth/change-password', {
                password: this.password,
                passwordConfirmed: this.passwordConfirmed,
                token: this.$route.query.token
            }).then(() => {
                this.$toast({
                    title: 'Mot de passe',
                    description: "Votre mot de passe a été changé avec succès",
                    status: 'success',
                    position: "top-right",
                    duration: 3000
                })
                this.$router.push('/login')
            }).catch(err => {
                this.$toast({
                    title: 'Mot de passe',
                    description: "Une erreur est survenue",
                    status: 'error',
                    position: "top-right",
                    duration: 3000
                })
            }).finally(() => {
                this.loading = false;
            });
        }
    }
}
</script>