export default function({$auth, redirect}){
    if ($auth.user.username !== "root"){
        redirect('/')
    }
}