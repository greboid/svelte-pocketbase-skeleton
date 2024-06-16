<script>
  import "@lowlighter/matcha/dist/matcha.css";
  import "@lowlighter/matcha/dist/matcha.utilities.css";
  import {pb} from "$lib/pocketbase.js"
  let loggedIn = false
  $: loggedIn = pb.authStore.isValid
</script>

<header>
<nav>
<menu>
  <li><a href="/">Dashboard</a></li>
  {#if loggedIn}
    <li><a href="/logout">Logout</a></li>
    {:else}
    <li><a href="/login">Login</a></li>
  {/if}
</menu>
</nav>
</header>
<main>
<slot></slot>
</main>
