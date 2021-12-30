<template>
    <div class="wizard-container">
        <CHeading size="sm" mb="4">Étape 1/3 - Configuration du stockage</CHeading>
        <p>Choisissez le type de stockage, en local ou à distance (Object Storage S3)</p>
        <CStack mt="4" mb="4" is-inline>
            <span class="drive-type">Local</span>
            <c-switch v-model="s3" color="gray" />
            <span class="drive-type">S3</span>
        </CStack>
        
        <div v-if="s3" class="s3">
            <CFormControl mb="5">
                <CFormLabel mb="1">S3 Key</CFormLabel>
                <CInput
                    type="text"
                    v-model="s3Config.S3_KEY"
                />
            </CFormControl>
            <CFormControl mb="5">
                <CFormLabel mb="1">S3 Secret</CFormLabel>
                <CInputGroup>
                    <CInput
                        class="login-input"
                        :type="showPassword ? 'text' : 'password'"
                        v-model="s3Config.S3_SECRET"
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
                <CFormLabel mb="1">S3 Region</CFormLabel>
                <CInput
                    type="text"
                    v-model="s3Config.S3_REGION"
                />
            </CFormControl>
            <CFormControl mb="5">
                <CFormLabel mb="1">S3 Bucket</CFormLabel>
                <CInput
                    type="text"
                    v-model="s3Config.S3_BUCKET"
                />
            </CFormControl>
            <CFormControl mb="5">
                <CFormLabel mb="1">S3 Endpoint</CFormLabel>
                <CInput
                    type="text"
                    v-model="s3Config.S3_ENDPOINT"
                />
            </CFormControl>
        </div>
        <CButtonGroup d="flex" :justify-content="s3 ? 'space-between' : 'flex-end'">
            <CButton v-if="s3" variant-color="vue" @click="test">Tester la connexion</CButton>
            <CButton variant-color="blue" @click="next">Suivant</CButton>
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
            s3: false,
            showPassword: false,
            s3Config: {
                S3_KEY: "",
                S3_SECRET: "",
                S3_REGION: "",
                S3_BUCKET: "",
                S3_ENDPOINT: ""
            }
        }
    },
    fetch() {
        const config = this.$store.getters['wizard/getConfig'];
        this.s3 = config.DRIVE_DISK === 's3';
        this.s3Config.S3_KEY = config.S3_KEY;
        this.s3Config.S3_SECRET = config.S3_SECRET;
        this.s3Config.S3_REGION = config.S3_REGION;
        this.s3Config.S3_BUCKET = config.S3_BUCKET;
        this.s3Config.S3_ENDPOINT = config.S3_ENDPOINT;
    },
    methods: {
        async test() {
            this.$axios.post('/api/test-drive', {...this.s3Config}).then(response => {
                console.log(response);
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
            if (this.s3) {
                if (this.s3Config.S3_KEY && this.s3Config.S3_SECRET && this.s3Config.S3_REGION && this.s3Config.S3_BUCKET && this.s3Config.S3_ENDPOINT) {
                    this.$store.dispatch('wizard/setConfig', {...this.s3Config, DRIVE_DISK: 's3'});
                    await this.$axios.$post('/api/config', {...this.s3Config, DRIVE_DISK: 's3'})
                } else {
                    this.$toast({
                        title: 'Champs manquants',
                        description: "Vous devez remplir tous les champs pour pouvoir continuer",
                        status: 'error',
                        position: "top-right",
                        duration: 3000
                    })
                    return
                }
            } else {
                this.$store.dispatch('wizard/setConfig', {DRIVE_DISK: 'local'});
                await this.$axios.$post('/api/config', {DRIVE_DISK: 'local'})
            }
            this.$emit('next')
        }
    }
}
</script>