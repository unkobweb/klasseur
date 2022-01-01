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
                <CFormControl w="100%" mb="5">
                    <CFormLabel mb="1">Adresse email</CFormLabel>
                    <CInput
                        w="100%"
                        type="email"
                        v-model="email"
                    />
                </CFormControl>
                <CButton :is-loading="loading" variant-color="blue" variant='solid' @click="send">
                    Demander la réinitialisation du mot de passe
                </CButton>
            </CBox>
        </CBox>
    </div>
</template>

<script>
export default {
    layout: 'login',
    data() {
        return {
            email: '',
            loading: false,
        }
    },
    methods: {
        async send(){
            if (this.email && /^[^@]+@[^@]+\.[^@]+$/.test(this.email)){
                this.loading = true
                await this.$axios.$post('/api/auth/reset-password', {
                    email: this.email,
                }).then(res => {
                    this.$toast({
                        title: 'Email envoyé',
                        description: "Un email vous a été envoyé pour réinitialiser votre mot de passe.",
                        status: 'success',
                        position: "top-right",
                        duration: 3000
                    })
                }).catch(err => {
                    this.$toast({
                        title: 'Erreur',
                        description: "Une erreur est survenue, veuillez réessayer ultérieurement.",
                        status: 'error',
                        position: "top-right",
                        duration: 3000
                    })
                }).finally(() => {
                    this.loading = false
                })
            } else {
                this.$toast({
                    title: 'Email invalide',
                    description: "Veuillez entrer une adresse email valide",
                    status: 'error',
                    position: "top-right",
                    duration: 3000
                })
            }
        }
    }
}
</script>