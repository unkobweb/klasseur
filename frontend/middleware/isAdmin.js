export default function ({$auth, redirect}) {
    if ($auth.user.is_admin !== 1) {
        return redirect('/')
    }
}