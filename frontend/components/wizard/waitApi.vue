<template>
    <div class="wizard-container">
        <CHeading size="sm" mb="4">Redémarrage de l'API</CHeading>
        <c-alert
            v-if="waiting"
            status="info"
            variant="subtle"
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
            height="200px"
            >
            <c-alert-icon size="40px" :mr="0" />
            <c-alert-title :mt="4" :mb="1" fontSize="lg">
                En attente de l'API
            </c-alert-title>
            <c-alert-description maxWidth="sm">
                L'API a été arrêtée, veuillez redémarrer l'API pour que les modifications soient prises en compte.
                Dès que l'API sera de nouveau joignable, nous vous renverrons vers la page de connexion
            </c-alert-description>
        </c-alert>
        <c-alert
            v-else
            status="success"
            variant="subtle"
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
            height="200px"
            >
            <c-alert-icon size="40px" name="check-circle" color="vue" :mr="0" />
            <c-alert-title :mt="4" :mb="1" fontSize="lg">
                API redémarrée !
            </c-alert-title>
            <c-alert-description maxWidth="sm">
                L'API est de nouveau joignable, vous pouvez vous connecter !
                Redirection dans {{seconds}} secondes
            </c-alert-description>
        </c-alert>
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
            waiting: true,
            seconds: 10,
            interval: null
        }
    },
    mounted() {
        this.interval = setInterval(async () => {
            if (!this.waiting) return
            await this.$axios.$get('/api').then(response => {
                console.log(response)
                if (response === 'Hello world') {
                    clearInterval(this.interval)
                    this.next()
                }
            })
        }, 5000)
    },
    methods: {
        next() {
            this.waiting = false
            setInterval(() => {
                this.seconds--
                if (this.seconds === 0) {
                    this.$router.push('/login')
                }
            }, 1000)
        },
    }
}
</script>