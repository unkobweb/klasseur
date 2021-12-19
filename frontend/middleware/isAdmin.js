export default function ({$auth, redirect}) {
    if (!$auth.user.id_admin) {
        return redirect('/')
    }
}