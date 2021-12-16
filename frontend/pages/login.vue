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
                        type="email"
                        v-model="login.email"
                        min-width="400px"
                    />
                </CFormControl>
                <CFormControl mb="5">
                    <CFormLabel mb="1">Mot de passe</CFormLabel>
                    <CInput
                        type="password"
                        v-model="login.password"
                        min-width="400px"
                    />
                </CFormControl>
                <CStack direction='row' d="flex" w="100%" justify-content='space-between' align='center'>
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

<script>
import {
    CBox,
    CHeading,
    CFormControl,
    CFormLabel,
    CInput,
    CButton,
    CStack
} from '@chakra-ui/vue'

export default {
    layout: "login",
    data(){
        return {
            loading: false,
            login: {
                email: '',
                password: ''
            }
        }
    },
    components: {
        CBox,
        CHeading,
        CFormControl,
        CFormLabel,
        CInput,
        CButton,
        CStack
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