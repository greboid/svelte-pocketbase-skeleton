import {goto} from '$app/navigation'
import {pb} from '$lib/pocketbase.js'

export function guard() {
  if (!pb.authStore.isValid) {
    goto('/login')
  }
}
