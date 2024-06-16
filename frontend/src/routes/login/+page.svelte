<script>
  import {pb} from '$lib/pocketbase.js'
  import { goto } from '$app/navigation';

  if (pb.authStore.isValid) {
    goto('/account')
  }

  let message = ""

  async function login(form) {
    try {
      form.username.setCustomValidity("")
      form.password.setCustomValidity("")
      const authData = await pb.collection("users")
              .authWithPassword(
                  form.username.value,
                  form.password.value,
              )
      message = ""
      await goto('/')
    } catch (err) {
      message = err.message ?? ""
      console.error("Error")
    }
  }
</script>
<h1>Login</h1>
<form method="post" on:submit|preventDefault={(e) => login(e.currentTarget)}>
  {#if message}<p class="flash danger">{message}</p>{/if}
  <label>Username: <input type="email" name="username" required></label>
  <label>Password: <input type="password" name="password" required></label>
  <button type="submit">Submit</button>
</form>
