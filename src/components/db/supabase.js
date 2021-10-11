import {createClient} from '@supabase/supabase-js'
console.log(process.env)
const client = createClient(process.env.SUPABASE_URL,process.env.SUPABASE_API_KEY,{})
export default client