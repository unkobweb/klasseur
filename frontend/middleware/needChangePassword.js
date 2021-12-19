export default function ({$auth, redirect}) {
    if ($auth.user.need_change_password) {
        return redirect('/change-password')
    }
}