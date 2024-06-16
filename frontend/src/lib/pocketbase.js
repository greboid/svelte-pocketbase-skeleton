import PocketBase from 'pocketbase'

export function createInstance() {
  return new PocketBase("http://localhost")
}

export const pb = createInstance()
