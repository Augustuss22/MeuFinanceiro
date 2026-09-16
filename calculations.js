function key(s){let d=new Date(s+'T12:00:00');return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')}
function add(s,n){let d=new Date(s+'T12:00:00');d.setMonth(d.getMonth()+n);return d.toISOString().slice(0,10)}
function part(total,n,i){let c=Math.round(Number(total)*100),b=Math.floor(c/n),r=c%n;return (b+(i<r?1:0))/100}
function expand(t,m){let n=Math.max(1,+t.installments||1);for(let i=0;i<n;i++){let d=add(t.date,i);if(key(d)===m)return {...t,displayAmount:part(t.amount,n,i),displayDate:d,idx:i+1,n}}return null}
function calc(all,m){let items=all.map(t=>expand(t,m)).filter(Boolean);let income=0,pix=0,card=0;items.forEach(t=>t.type==='income'?income+=+t.displayAmount:t.payment_method==='pix'?pix+=+t.displayAmount:card+=+t.displayAmount);return{items,income,pix,card,balance:income-pix}}
function future(all,m){let x=0;all.forEach(t=>{if(t.type==='expense'&&t.payment_method==='credit_card'){let n=Math.max(1,+t.installments||1);for(let i=0;i<n;i++){let d=add(t.date,i);if(key(d)>m)x+=part(t.amount,n,i)}}});return x}
