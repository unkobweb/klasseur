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
                <CHeading size="lg" mb="1">Klasseur</CHeading>
                <CHeading size="md" mb="5">Installation</CHeading>
                <Hello v-if="step === 0" @next="next"/>
                <Drive v-if="step === 1" @next="next"/>
                <Smtp v-if="step === 2" @prev="prev" @next="next"/>
                <Account v-if="step === 3" @prev="prev" @next="next"/>
                <WaitApi v-if="step === 4"/>
            </CBox>
        </CBox>
    </div>
</template>

<script>
import Drive from '@/components/wizard/drive';
import Smtp from '@/components/wizard/smtp';
import Account from '@/components/wizard/account';
import WaitApi from '@/components/wizard/waitApi';
import Hello from '@/components/wizard/hello';

export default {
    layout: 'login',
    middleware: ['wizard'],
    components: {
        Drive,
        Smtp,
        Account,
        WaitApi,
        Hello
    },
    data() {
        return {
            config: {},
            step: 0,
        }
    },
    async fetch() {
        const res = await this.$axios.get('/api/config');
        const tmp = {};
        for (const key of res.data.config) {
            tmp[key.name] = key.value;
        }
        this.$store.dispatch('wizard/setConfig', tmp);
    },
    methods: {
        next() {
            this.step++;
        },
        prev() {
            this.step--;
        },
    }
}
</script>