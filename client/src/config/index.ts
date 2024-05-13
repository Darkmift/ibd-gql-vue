import { cleanEnv, str } from 'envalid'

const config = {
  VITE_BASE_URL: str()
}

const env = cleanEnv(import.meta.env, config)
export default env
