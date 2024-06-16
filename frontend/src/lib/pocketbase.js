import PocketBase from 'pocketbase'

export function createInstance() {
  return new PocketBase("http://localhost:8000")
}

export const pb = createInstance()
