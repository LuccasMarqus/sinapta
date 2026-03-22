
document.addEventListener('DOMContentLoaded', async () => {
    const SUPABASE_URL = 'https://euybkvjsqfzjojhnquqo.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1eWJrdmpzcWZ6am9qaG5xdXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxODg0MTYsImV4cCI6MjA4OTc2NDQxNn0.Hx9qp8gS7lTqy0BoxWanJjXMUfFUADiHJm6xLVViSFc';

    // Buscar todas as configurações do Supabase
    try {
        const res = await fetch(SUPABASE_URL + '/rest/v1/site_settings?select=*', {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
        });
        if (res.ok) {
            const data = await res.json();
            data.forEach(row => {
                if (row.value && row.value.data !== null) {
                    localStorage.setItem(row.id, row.value.data);
                }
            });
        }
    } catch(e) { console.warn('Supabase load error, using cache:', e); }

    // 1. Strings Genéricas (Mapeamento 1-1)
    const textFields = ['kpi-1-val', 'kpi-1-desc', 'kpi-2-val', 'kpi-2-desc', 'kpi-3-val', 'kpi-3-desc', 'stat-1-val', 'stat-1-desc', 'stat-2-val', 'stat-2-desc', 'stat-3-val', 'stat-3-desc', 'stat-4-val', 'stat-4-desc', 'top-email', 'top-phone', 'hero-sub', 'btn-text', 'hero-btn-text', 'hero-btn2-text', 'eco-title', 'eco-sub', 'footer-desc', 'footer-copy'];
    textFields.forEach(f => {
        const val = localStorage.getItem('sinapta_' + f);
        if(val) {
            const el = document.getElementById('landing-' + f);
            if(el) el.innerText = val;
        }
    });

    
    // LIST SYNC
    const prods = document.querySelectorAll('#produtos > div > div.grid > div');
    prods.forEach((prod, i) => {
        const title = localStorage.getItem('sinapta_prod_'+i+'_title');
        const desc = localStorage.getItem('sinapta_prod_'+i+'_desc');
        const tag = localStorage.getItem('sinapta_prod_'+i+'_tag');
        if(title) prod.querySelector('h3').innerText = title;
        if(desc) prod.querySelector('p').innerText = desc;
        if(tag) prod.querySelector('div.inline-block').innerText = tag;
        
        const bullets = prod.querySelectorAll('li');
        const b1 = localStorage.getItem('sinapta_prod_'+i+'_b1');
        const b2 = localStorage.getItem('sinapta_prod_'+i+'_b2');
        const b3 = localStorage.getItem('sinapta_prod_'+i+'_b3');
        if(b1 && bullets[0]) bullets[0].innerHTML = bullets[0].innerHTML.replace(/<\/span>.*$/, '</span> ' + b1);
        if(b2 && bullets[1]) bullets[1].innerHTML = bullets[1].innerHTML.replace(/<\/span>.*$/, '</span> ' + b2);
        if(b3 && bullets[2]) bullets[2].innerHTML = bullets[2].innerHTML.replace(/<\/span>.*$/, '</span> ' + b3);
    });

    const segs = document.querySelectorAll('#segmentos h4');
    segs.forEach((seg, i) => {
        const title = localStorage.getItem('sinapta_seg_'+i+'_title');
        if(title) seg.innerText = title;
    });

    const mets = document.querySelectorAll('#solucoes h4');
    mets.forEach((met, i) => {
        const title = localStorage.getItem('sinapta_met_'+i+'_title');
        const desc = localStorage.getItem('sinapta_met_'+i+'_desc');
        if(title) met.innerText = title;
        if(desc) met.nextElementSibling.innerText = desc;
    });

    const diffs = document.querySelectorAll('.py-24.bg-surface-container-low h3');
    let dIndex = 0;
    diffs.forEach((diff) => {
        if(!diff.closest('#segmentos') && !diff.closest('#solucoes') && diff.innerText !== 'Diferenciais Sinapta') {
            const title = localStorage.getItem('sinapta_diff_'+dIndex+'_title');
            const desc = localStorage.getItem('sinapta_diff_'+dIndex+'_desc');
            if(title) diff.innerText = title;
            if(desc && diff.nextElementSibling) diff.nextElementSibling.innerText = desc;
            dIndex++;
        }
    });

    const blogs = document.querySelectorAll('#sec-9 h4, .py-32.bg-surface h4'); // wait, let's use a clear selector
    const blogNodes = document.querySelectorAll('.aspect-video');
    blogNodes.forEach((bNode, i) => {
        const p = bNode.parentElement;
        const tagNode = p.querySelector('.text-\\[10px\\]');
        const titleNode = p.querySelector('h4');
        const tag = localStorage.getItem('sinapta_blog_'+i+'_tag');
        const title = localStorage.getItem('sinapta_blog_'+i+'_title');
        if(tag && tagNode) tagNode.innerText = tag;
        if(title && titleNode) titleNode.innerText = title;
    });

    const feats = document.querySelectorAll('.max-w-7xl.mx-auto.px-12.grid.grid-cols-12 > div.col-span-5 h4');
    feats.forEach((feat, i) => {
        const title = localStorage.getItem('sinapta_feat_'+i+'_title');
        const desc = localStorage.getItem('sinapta_feat_'+i+'_desc');
        if(title) feat.innerText = title;
        if(desc) feat.nextElementSibling.innerText = desc;
    });
    // 1.1 Títulos em HTML (mantem coloração)
    const htmlFields = ['hero-title'];
    htmlFields.forEach(f => {
        const val = localStorage.getItem('sinapta_' + f);
        if(val) {
            const el = document.getElementById('landing-' + f);
            if(el) el.innerHTML = val.replace(/\n/g, '<br/>'); 
        }
    });

    // 1.2 URLs dos botões
    const urlFields = ['btn-url', 'hero-btn-url', 'hero-btn2-url'];
    urlFields.forEach(f => {
        const val = localStorage.getItem('sinapta_' + f);
        if(val) {
            const elId = 'landing-' + f.replace('-url', '');
            const el = document.getElementById(elId);
            if(el) {
                if(el.tagName === 'A') el.href = val;
                else el.setAttribute('onclick', `window.location.hash='${val}'`);
            }
        }
    });

    // 2. Depoimentos Dinâmicos
    const testiList = document.getElementById('landing-testimonials-list');
    if (testiList) {
        const savedTesti = localStorage.getItem('sinapta_testimonials');
        let testimonials = [];
        if (savedTesti) testimonials = JSON.parse(savedTesti);
        
        if (testimonials.length > 0) {
            testiList.innerHTML = testimonials.map(t => `
            <div class="bg-surface-container-high p-8 rounded-3xl border border-outline-variant/10">
                <div class="flex gap-1 text-secondary mb-6">
                    ${'<span class="material-symbols-outlined" style="font-variation-settings: \\\'FILL\\\' 1;">star</span>'.repeat(t.stars)}
                </div>
                <p class="text-on-surface italic mb-8">"${t.text}"</p>
                <div class="flex items-center gap-4">
                    <img class="w-12 h-12 rounded-full border-2 border-primary object-cover" src="${t.avatar || 'https://i.pravatar.cc/150'}"/>
                    <div>
                        <div class="font-bold text-sm">${t.name}</div>
                        <div class="text-xs text-slate-500">${t.role}</div>
                    </div>
                </div>
                <!-- optional generic verified badge -->
                <div class="mt-4 inline-flex items-center gap-2 px-2 py-1 bg-primary/10 rounded text-[10px] text-primary font-bold">
                    <span class="material-symbols-outlined text-[12px]">verified</span> Cliente verificado
                </div>
            </div>`).join('');
        }
    }

    // 3. Logo Dinâmico via LocalStorage (Sincronizado via Admin Dashboard)
    const savedLogo = localStorage.getItem('sinapta_logo');
    if (savedLogo) {
        document.querySelectorAll('.dynamic-logo').forEach(img => {
            img.src = savedLogo;
            img.classList.remove('hidden');
        });
        document.querySelectorAll('.dynamic-logo-text').forEach(txt => {
            txt.classList.add('hidden');
        });
    }
});
