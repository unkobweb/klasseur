<template>
    <CModal id="confirm" is-open>
        <CModalContent>
            <CModalBody d="flex" flex-direction="column" align-items="center" justify-content="center">
                <CIcon :name="icon" :color="iconColor" size="60px" mt="20px" mb="10px"/>
                <p>{{confirmText}}</p>
            </CModalBody>
            <CModalFooter>
                <CButtonGroup w="100%" d="flex" justify-content="space-between">
                    <CButton @click="$emit('cancel')" size="sm" variant='solid'>{{cancelBtnLabel}}</CButton>
                    <CButton @click="$emit('confirm')" size="sm" :variant-color="confirmBtnColor" :rightIcon="confirmBtnIcon" variant='solid'>{{confirmBtnLabel}}</CButton>
                </CButtonGroup>
            </CModalFooter>
        </CModalContent>
        <CModalOverlay/>
    </CModal>
</template>

<style>
#modal-confirm {
    max-width: 300px;
    margin-top: 5rem;
    border-radius: 10px;
}
#modal-confirm p {
    text-align: center;
}
@media screen and (max-width: 500px) {
    #modal-confirm {
        max-width: 86vw;
    }
}
</style>

<script>
export default {
    name: "ConfirmModal",
    props: {
        iconColor: {
            type: String,
            default: 'red.300'
        },
        icon: {
            type: String,
            default: 'trash-alt'
        },
        confirmText: {
            type: String,
            default: "Confirmer l'action"
        },
        cancelBtnLabel: {
            type: String,
            default: "Annuler"
        },
        confirmBtnLabel: {
            type: String,
            default: "Confirmer"
        },
        confirmBtnIcon: {
            type: String,
            default: "trash-alt"
        },
        confirmBtnColor: {
            type: String,
            default: "red"
        }
    }
}
</script>