<template>
    <div class="wizard-container">
        <CHeading size="sm" mb="4">Étape 2/3 - Configuration du serveur de mail</CHeading>
        <CAlert status="info">
            <CAlertIcon />
            <p>Klasseur a besoin d'envoyer des emails, notamment pour la création de compte ou la récupération de mot de passe. Vous pouvez utiliser votre compte gmail pour le faire, à l'aide de <a class="smtp-tutorial" href="https://github.com/unkobweb/klasseur#utiliser-gmail-comme-serveur-smtp" target="_blank">ce tutoriel</a></p>
        </CAlert>
        <div>
            <CFormControl mb="5" mt="4">
                <CFormLabel mb="1">Hôte SMTP</CFormLabel>
                <CInput
                    type="text"
                    v-model="smtpConfig.SMTP_HOST"
                />
            </CFormControl>
            <CFormControl mb="5">
                <CFormLabel mb="1">Port SMTP</CFormLabel>
                <CInput
                    type="text"
                    v-model="smtpConfig.SMTP_PORT"
                />
            </CFormControl>
            <CFormControl mb="5">
                <CFormLabel mb="1">Nom d'utilisateur SMTP</CFormLabel>
                <CInput
                    type="text"
                    v-model="smtpConfig.SMTP_USERNAME"
                />
            </CFormControl>
            <CFormControl mb="5">
                <CFormLabel mb="1">Mot de passe SMTP</CFormLabel>
                <CInputGroup>
                    <CInput
                        class="login-input"
                        :type="showPassword ? 'text' : 'password'"
                        v-model="smtpConfig.SMTP_PASSWORD"
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
        </div>
        <CButtonGroup d="flex" justify-content="space-between">
            <CButton variant-color="vue" @click="test">Tester la connexion</CButton>
            <CButtonGroup d="flex" justify-content="flex-end">
                <CButton @click="$emit('prev')">Précédent</CButton>
                <CButton variant-color="blue" @click="next">Suivant</CButton>
            </CButtonGroup>
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
.smtp-tutorial, .smtp-tutorial:hover {
    text-decoration: underline !important;
    font-weight: 600;
}
</style>

<script>
export default {
    data() {
        return {
            showPassword: false,
            smtpConfig: {
                SMTP_HOST: '',
                SMTP_PORT: '',
                SMTP_USERNAME: '',
                SMTP_PASSWORD: '',
            },
        }
    },
    fetch() {
        const config = this.$store.getters['wizard/getConfig'];
        this.smtpConfig.SMTP_HOST = config.SMTP_HOST;
        this.smtpConfig.SMTP_PORT = config.SMTP_PORT;
        this.smtpConfig.SMTP_USERNAME = config.SMTP_USERNAME;
        this.smtpConfig.SMTP_PASSWORD = config.SMTP_PASSWORD;
    },
    methods: {
        async test() {
            this.$axios.post('/api/test-mail', {...this.smtpConfig}).then(response => {
                const {title, description, type} = response.data;
                this.$toast({
                    title: title,
                    description: description,
                    status: type,
                    position: "top-right",
                    duration: 3000
                })
            })
        },
        async next() {
            console.log(this.smtpConfig)
            if (this.smtpConfig.SMTP_HOST && this.smtpConfig.SMTP_PORT && this.smtpConfig.SMTP_USERNAME && this.smtpConfig.SMTP_PASSWORD) {
                this.$store.dispatch('wizard/setConfig', {...this.smtpConfig})
                await this.$axios.$post('/api/config', {...this.smtpConfig})
                this.$emit('next')
            } else {
                this.$toast({
                    title: 'Configuration invalide',
                    description: "Veuillez remplir tous les champs",
                    status: 'error',
                    position: "top-right",
                    duration: 3000
                })
            }
        },
    }
}
</script>