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
                    <CButton :is-loading="loading" variant-color="blue" variant='solid' rightIcon="arrow-forward" @click="changePassword">
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
    middleware: 'auth',
    data() {
        return {
            loading: false,
            showPassword: false,
            showPasswordConfirmed: false,
            password: '',
            passwordConfirmed: ''
        }
    },
    fetch() {
        // if user don't have to change his password, redirect him to home
        if (!this.$auth.user.need_change_password) {
            this.$router.push('/');
        }
    },
    methods: {
        async changePassword() {
            this.loading = true;
            if (this.password !== this.passwordConfirmed || this.password === '') {
                this.$toast({
                    title: 'Mots de passe différents',
                    description: this.password ? "Les mots de passe ne correspondent pas" : "Veuillez saisir un mot de passe",
                    status: 'error',
                    position: "top-right",
                    duration: 3000
                })
                this.loading = false;
                return;
            }
            this.$axios.$patch('/api/user/change-password', {
                password: this.password,
                passwordConfirmed: this.passwordConfirmed
            }).then(async () => {
                this.$toast({
                    title: 'Mot de passe changé',
                    description: "Votre mot de passe a bien été changé",
                    status: 'success',
                    position: "top-right",
                    duration: 3000
                })
                await this.$auth.fetchUser();
                this.$router.push('/');
            }).catch(err => {
                console.log(err);
                this.$toast({
                    title: 'Erreur',
                    description: "Une erreur est survenue",
                    status: 'error',
                    position: "top-right",
                    duration: 3000
                })
            }).finally(() => {
                this.loading = false;
            })
        }
    }
}
</script>