import { pb } from '$lib/pocketbase'
import { currentUser } from '$lib/user'

pb.authStore.loadFromCookie(document.cookie)
pb.authStore.onChange(() => {
  currentUser.set(pb.authStore.model)
  document.cookie = pb.authStore.exportToCookie({ httpOnly: false })
}, true)


if (pb.authStore.isValid) {
  console.log(pb.authStore.model.id)
} else {
  console.log("Not Authed")
}
