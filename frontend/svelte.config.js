import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
                       assets:        '../backend/pb_public',
                       pages:         '../backend/pb_public',
                       precompress:   true,
                       strict:        true,
                       fallback:      'index.html',
                     }),
  },
}

export default config
