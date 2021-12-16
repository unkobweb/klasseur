<template>
  <div class="container">
    <CThemeProvider>
      <CColorModeProvider value="dark">
        <CBox v-bind="darkColor" w="100vw" h="100vh" font-family="body" as="main">
          <CReset />
          <Nuxt />
        </CBox>
      </CColorModeProvider>
    </CThemeProvider>
  </div>
</template>

<style>
html, body {
  min-height: 100vh;
  min-width: 100vw;
  padding: 0;
  margin: 0;
}
</style>

<script>
import {
  CThemeProvider,
  CColorModeProvider,
  CReset,
  CBox
} from '@chakra-ui/vue'

export default {
  name: 'App',
  components: {
    CThemeProvider,
    CColorModeProvider,
    CReset,
    CBox
  },
  data() {
    return {
      darkColor: {
          bg: 'gray.700',
          color: 'whiteAlpha.900'
      }
    }
  }
}
</script>
