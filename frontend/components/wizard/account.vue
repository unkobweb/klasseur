<template>
    <div class="wizard-container">
        <CHeading size="sm" mb="4">Étape 3/3 - Création du compte administrateur</CHeading>
        <p>Saisissez un email valide, vous y recevrez votre mot de passe de connexion temporaire, ce compte sera administrateur</p>
        <div>
            <CFormControl mb="5" mt="4">
                <CFormLabel mb="1">Adresse email</CFormLabel>
                <CInput
                    type="email"
                    v-model="email"
                />
            </CFormControl>
        </div>
        <CButtonGroup d="flex" justify-content="flex-end">
            <CButton @click="$emit('prev')">Précédent</CButton>
            <CButton :is-loading="loading" variant-color="blue" @click="next">Valider</CButton>
        </CButtonGroup>
    </div>
</template>

<style>
.wizard-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #394353;
    width: 90vw;
    max-width: 800px;
    padding: 20px;
    border-radius: 10px;
}
.wizard-container .drive-type {
    margin-bottom: 3px;
}
</style>

<script>
export default {
    data() {
        return {
            email: '',
            loading: false,
        }
    },
    methods: {
        async next() {
            this.loading = true
            // if this.email is not a valid email, show an error
            if (!this.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                this.$toast({
                    title: 'Email invalide',
                    description: "L'adresse email saisie n'est pas valide",
                    status: 'error',
                    position: "top-right",
                    duration: 3000
                })
            } else {
                await this.$axios.$post('/api/create-admin', {email: this.email}).then(response => {
                    this.$toast({
                        title: 'Compte créé',
                        description: "Un email vous a été envoyé pour vous connecter avec votre mot de passe temporaire",
                        status: "success",
                        position: "top-right",
                        duration: 3000
                    })
                    this.$emit('next')
                })
            }
            this.loading = false
        },
    }
}
</script>