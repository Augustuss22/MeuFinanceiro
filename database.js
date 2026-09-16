async function profile(){let {data,error}=await sb.from('profiles').select('*').eq('id',user.id).maybeSingle();if(error)throw error;
if(!data){let r=await sb.from('profiles').insert({id:user.id,display_name:user.email?.split('@')[0]||'Usuário',credit_limit:0});if(r.error)throw r.error;data=(await sb.from('profiles').select('*').eq('id',user.id).single()).data}return data}
async function transactions(){let {data,error}=await sb.from('transactions').select('*').eq('user_id',user.id).order('date',{ascending:false});if(error)throw error;return data||[]}
async function saveTx(t,id){let q=id?sb.from('transactions').update(t).eq('id',id).eq('user_id',user.id):sb.from('transactions').insert({...t,user_id:user.id});let {error}=await q;if(error)throw error}
async function removeTx(id){let {error}=await sb.from('transactions').delete().eq('id',id).eq('user_id',user.id);if(error)throw error}
async function saveLimit(v){let {error}=await sb.from('profiles').update({credit_limit:Number(v)}).eq('id',user.id);if(error)throw error}
