<script>
  import {goto} from '$app/navigation'
  import {pb} from '$lib/pocketbase.js'
  import {login, register} from '$lib/user.js'

  if (pb.authStore.isValid) {
    goto('/account')
  }

  let message = ''
  let registerMessage = ''
  const doLogin = async (e) => {
    const form = e.currentTarget
    message = await login(form.username.value, form.password.value)
    message === "" ? await goto('/account') : ''
  }
  const doRegister = async (e) => {
    const form = e.currentTarget
    registerMessage = await register(form.username.value, form.password.value)
  }
  const validatePassword = async (e) => {
    const form = e.currentTarget.form
    if (form.password.value !== form.confirm.value) {
      form.confirm.setCustomValidity('Passwords must match')
    } else {
      form.confirm.setCustomValidity('')
    }
  }
</script>
<h1>Login</h1>
<form method="post" on:submit|preventDefault={doLogin}>
  {#if message}<p class="flash danger">{message}</p>{/if}
  <label>Email: <input type="email" name="username" required></label>
  <label>Password: <input type="password" name="password" required></label>
  <button type="submit">Submit</button>
</form>
<h1>Register</h1>
<form method="post" on:submit|preventDefault={doRegister}>
  {#if registerMessage}<p class="flash danger">{registerMessage}</p>{/if}
  <label>Email: <input type="email" name="username" required></label>
  <label>Password: <input type="password" name="password" required on:change={validatePassword}></label>
  <label>Confirm: <input type="password" name="confirm" required on:change={validatePassword}></label>
  <button type="submit">Submit</button>
</form>
