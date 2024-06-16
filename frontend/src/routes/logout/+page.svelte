<script>
  import {pb} from '$lib/pocketbase.js'
  import { goto } from '$app/navigation';
  pb.authStore.clear()
  goto('/login')
</script>
