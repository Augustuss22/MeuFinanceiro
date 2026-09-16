const sb=window.supabase.createClient(window.SUPABASE_URL,window.SUPABASE_KEY);let user=null;
async function session(){const {data,error}=await sb.auth.getSession();if(error)throw error;user=data.session?.user||null;return user}
async function login(e,p){return sb.auth.signInWithPassword({email:e,password:p})}
async function signup(e,p){return sb.auth.signUp({email:e,password:p})}
async function logout(){return sb.auth.signOut()}
sb.auth.onAuthStateChange((_e,s)=>{user=s?.user||null;if(typeof renderAuth==='function')renderAuth()});
