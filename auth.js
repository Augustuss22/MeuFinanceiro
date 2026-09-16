const supabaseClient=window.supabase.createClient(window.SUPABASE_URL,window.SUPABASE_KEY);
let currentUser=null;
async function initAuth(){const {data,error}=await supabaseClient.auth.getSession();if(error)throw error;currentUser=data.session?.user||null;return currentUser}
async function doLogin(email,password){return supabaseClient.auth.signInWithPassword({email,password})}
async function doSignup(email,password){return supabaseClient.auth.signUp({email,password})}
async function doLogout(){return supabaseClient.auth.signOut()}
supabaseClient.auth.onAuthStateChange((_event,session)=>{currentUser=session?.user||null;if(window.onAuthChanged)window.onAuthChanged()});
