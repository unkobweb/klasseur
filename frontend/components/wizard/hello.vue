<template>
    <div class="wizard-container hello">
        <CIcon name="heart" color="white" size="38px" mb="5" mt="4"/>
        <CHeading size="sm" mb="4">Merci d'avoir installé Klasseur !</CHeading>
        <CButton variant-color="blue" mt="4" mb="4" @click="$emit('next')">Commencer la configuration</CButton>
    </div>
</template>

<style>
.wizard-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: initial;
    background-color: #394353;
    width: 90vw;
    max-width: 800px;
    padding: 20px;
    border-radius: 10px;
}
.wizard-container .drive-type {
    margin-bottom: 3px;
}
.hello {
    align-items: center;
}
</style>