<template>
  <div class="container">
    <CThemeProvider>
      <CColorModeProvider value="dark">
        <CBox v-bind="darkColor" w="100vw" h="100vh" font-family="body" as="main">
          <AdminMenu />
          <CReset />
          <Nuxt />
        </CBox>
      </CColorModeProvider>
    </CThemeProvider>
  </div>
</template>

<style>
html, body {
  background-color: #2D3748;
  overflow-x: hidden;
}
</style>

<script>
import AdminMenu from '@/components/admin/AdminMenu'
export default {
    middleware: ['isAdmin'],
    components: {
        AdminMenu
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