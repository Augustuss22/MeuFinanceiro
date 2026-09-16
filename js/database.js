async function getProfile(){
  let {data,error}=await supabaseClient.from("profiles").select("*").eq("id",currentUser.id).maybeSingle();
  if(error)throw error;
  if(!data){const r=await supabaseClient.from("profiles").insert({id:currentUser.id,display_name:currentUser.email?.split("@")[0]||"Usuário",credit_limit:0});if(r.error)throw r.error;data=(await supabaseClient.from("profiles").select("*").eq("id",currentUser.id).single()).data}
  return data;
}
async function setCreditLimit(value){const {error}=await supabaseClient.from("profiles").update({credit_limit:Number(value)}).eq("id",currentUser.id);if(error)throw error}
async function getTransactions(){const {data,error}=await supabaseClient.from("transactions").select("*").eq("user_id",currentUser.id).order("date",{ascending:false}).order("created_at",{ascending:false});if(error)throw error;return data||[]}
async function insertTransaction(t){const {error}=await supabaseClient.from("transactions").insert({...t,user_id:currentUser.id});if(error)throw error}
async function updateTransaction(id,t){const {error}=await supabaseClient.from("transactions").update(t).eq("id",id).eq("user_id",currentUser.id);if(error)throw error}
async function deleteTransaction(id){const {error}=await supabaseClient.from("transactions").delete().eq("id",id).eq("user_id",currentUser.id);if(error)throw error}
async function deleteAllTransactions(){const {error}=await supabaseClient.from("transactions").delete().eq("user_id",currentUser.id);if(error)throw error}
