import {goto} from '$app/navigation'
import {pb} from '$lib/pocketbase.js'
import {writable} from 'svelte/store'

export const currentUser = writable()

export const login = async (username, password) => {
  return await pb.collection('users')
                 .authWithPassword(username, password)
                 .then(_ => '')
                 .catch(err => err.message ?? '')
}
export const register = async (username, password) => {
  return await pb.collection('users')
                 .create({
                           email:           username,
                           password:        password,
                           passwordConfirm: password,
                         })
                 .then(_ => '')
                 .catch(err => err.message ?? '')
}

export const logout = async () => {
  const loggedIn = pb.authStore.isValid
  pb.authStore.clear()
  if (loggedIn) {
    await goto('/login')
  }
}
