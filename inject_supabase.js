const fs = require('fs');
const path = require('path');

const adminPath = path.join(__dirname, 'site/public/admin.html');
let aHtml = fs.readFileSync(adminPath, 'utf8');

aHtml = aHtml.replace('<script>', `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
    const supabaseUrl = 'https://euybkvjsqfzjojhnquqo.supabase.co';
    const supabaseKey = 'sb_publishable_jkeNZT3f0WXCBg60Fo-1yQ_Ha5YWbnO';
    const _sb = supabase.createClient(supabaseUrl, supabaseKey);
    window.cloudQueue = [];
    // remove duplicates from cloud queue by key
    function pushToQueue(k, v) {
        const idx = cloudQueue.findIndex(q => q.id === k);
        if(idx >= 0) cloudQueue[idx] = { id: k, value: { data: v } };
        else cloudQueue.push({ id: k, value: { data: v } });
    }
    const origSetItem = localStorage.setItem.bind(localStorage);
    localStorage.setItem = function(k, v) {
        origSetItem(k, v);
        if(k.startsWith('sinapta_')) pushToQueue(k, v);
    };
    
    // Also hijack removeItem
    const origRemoveItem = localStorage.removeItem.bind(localStorage);
    localStorage.removeItem = function(k) {
        origRemoveItem(k);
        if(k.startsWith('sinapta_')) pushToQueue(k, null); // sending null handles wipe
    };
</script>
<script>`);

aHtml = aHtml.replace("alert('Alterações salvas com sucesso!');", `
        if(cloudQueue.length > 0) {
            const btn = document.getElementById('save-btn');
            btn.innerText = 'Salvando na Nuvem...';
            _sb.from('site_settings').upsert(cloudQueue).then(({error}) => {
                btn.innerHTML = '<span class="material-symbols-outlined text-sm">save</span> Salvar Alterações';
                if(error) alert('Erro ao salvar na nuvem: ' + error.message);
                else { alert('Alterações salvas com sucesso em toda a rede!'); cloudQueue.length = 0; }
            });
        } else {
            alert('Não há alterações para salvar.');
        }`);

fs.writeFileSync(adminPath, aHtml);
console.log('Admin Supabase Injected');

const indexPath = path.join(__dirname, 'site/public/index.html');
let iHtml = fs.readFileSync(indexPath, 'utf8');

iHtml = iHtml.replace('<script>', `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
    const supabaseUrl = 'https://euybkvjsqfzjojhnquqo.supabase.co';
    const supabaseKey = 'sb_publishable_jkeNZT3f0WXCBg60Fo-1yQ_Ha5YWbnO';
    const _sb = supabase.createClient(supabaseUrl, supabaseKey);
</script>
<script>`);

iHtml = iHtml.replace("document.addEventListener('DOMContentLoaded', () => {", `document.addEventListener('DOMContentLoaded', async () => {
    try {
        const { data } = await _sb.from('site_settings').select('*');
        if(data) {
            data.forEach(row => {
                if(row.value.data === null) localStorage.removeItem(row.id);
                else localStorage.setItem(row.id, row.value.data);
            });
        }
    } catch(e) { console.error("Supabase load error", e); }
`);

fs.writeFileSync(indexPath, iHtml);
console.log('Index Supabase Injected');
