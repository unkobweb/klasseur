<template>
    <CModal id="confirm" is-open :on-close="closeModal">
        <CModalContent>
            <CModalBody d="flex" flex-direction="column" align-items="center" justify-content="center">
                <CIcon name="trash-alt" color="#ff7675" size="60px" mt="20px" mb="25px"/>
                <p>Voulez-vous vraiment supprimer ce fichier ?</p>
            </CModalBody>
            <CModalFooter>
                <CButtonGroup w="100%" d="flex" justify-content="space-between">
                    <CButton @click="$emit('cancel')" size="sm" variant='solid'>Annuler</CButton>
                    <CButton @click="$emit('confirm')" size="sm" variant-color="red" rightIcon="trash" variant='solid'>Supprimer</CButton>
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
    name: "ConfirmDelete"
}
</script>