export default async function ({$axios, route, redirect}) {
    await $axios.get('/api/config').then(response => {
        if (route.path !== "/wizard") redirect('/wizard')
    }).catch(error => {
        if (route.path === "/wizard") redirect('/')
    })
}