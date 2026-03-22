const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const adminPath = path.join(__dirname, 'site/public/admin.html');
let adminHtml = fs.readFileSync(adminPath, 'utf8');
const $ = cheerio.load(adminHtml, { recognizeSelfClosing: true });

// 1. PRODUCTS (sec-4) - We need 4 products
const prodContainer = $('#sec-4 .space-y-4');
const prodTemplate = prodContainer.find('> div:not(.text-center)').first().clone();
prodContainer.empty();
for(let i = 0; i < 4; i++) {
    let p = prodTemplate.clone();
    p.find('label:contains("Título do Produto")').next('input').attr('id', `admin-prod-${i}-title`);
    p.find('label:contains("Tag/Categoria")').next('input').attr('id', `admin-prod-${i}-tag`);
    p.find('label:contains("Descrição")').next('textarea').attr('id', `admin-prod-${i}-desc`);
    let bullets = p.find('input[type="text"]').slice(2);
    bullets.eq(0).attr('id', `admin-prod-${i}-b1`);
    bullets.eq(1).attr('id', `admin-prod-${i}-b2`);
    bullets.eq(2).attr('id', `admin-prod-${i}-b3`);
    prodContainer.append(p);
}

// 2. SEGMENTS (sec-5) - We need 6 segments
const segContainer = $('#sec-5 .grid');
const segTemplate = segContainer.find('> div:not(.border-dashed)').first().clone();
segContainer.empty();
for(let i = 0; i < 6; i++) {
    let s = segTemplate.clone();
    s.find('input').attr('id', `admin-seg-${i}-title`);
    segContainer.append(s);
}

// 3. METHODS (sec-6) - We need 5 methods
const metContainer = $('#sec-6 .space-y-4');
const metTemplate = metContainer.find('> div:not(.italic)').first().clone();
metContainer.empty();
for(let i = 0; i < 5; i++) {
    let m = metTemplate.clone();
    m.find('.text-3xl').text('0' + (i+1));
    let inputs = m.find('input');
    inputs.eq(0).attr('id', `admin-met-${i}-title`);
    inputs.eq(1).attr('id', `admin-met-${i}-desc`);
    metContainer.append(m);
}

// 4. DIFFERENTIALS (sec-7) - We need 4
const diffContainer = $('#sec-7 .grid');
const diffTemplate = diffContainer.find('> div').first().clone();
diffContainer.empty();
for(let i = 0; i < 4; i++) {
    let d = diffTemplate.clone();
    d.find('input[type="text"]').attr('id', `admin-diff-${i}-title`);
    d.find('textarea').attr('id', `admin-diff-${i}-desc`);
    diffContainer.append(d);
}

// 5. BLOG (sec-9) - We need 3
const blogContainer = $('#sec-9 .grid');
const blogTemplate = blogContainer.find('> div:not(.border-dashed)').first().clone();
blogContainer.empty();
for(let i = 0; i < 3; i++) {
    let b = blogTemplate.clone();
    let inputs = b.find('.p-4 input, .p-4 textarea');
    inputs.eq(0).attr('id', `admin-blog-${i}-tag`);
    inputs.eq(1).attr('id', `admin-blog-${i}-title`);
    inputs.eq(2).attr('id', `admin-blog-${i}-url`);
    blogContainer.append(b);
}

// 6. CONTACT FEATURES (sec-10) - We need 3
const featContainer = $('#sec-10 .grid');
const featTemplate = featContainer.find('> div').first().clone();
featContainer.empty();
for(let i = 0; i < 3; i++) {
    let f = featTemplate.clone();
    let inputs = f.find('input, textarea');
    inputs.eq(0).attr('id', `admin-feat-${i}-icon`);
    inputs.eq(1).attr('id', `admin-feat-${i}-title`);
    inputs.eq(2).attr('id', `admin-feat-${i}-desc`);
    featContainer.append(f);
}

// GENERATE LOAD & SAVE JS for Admin
let loadJs = `
    // LOAD LISTS
    for(let i=0; i<4; i++) {
        ['title','tag','desc','b1','b2','b3'].forEach(k => {
            let el = document.getElementById('admin-prod-'+i+'-'+k);
            let v = localStorage.getItem('sinapta_prod_'+i+'_'+k);
            if(el && v) el.value = v;
        });
    }
    for(let i=0; i<6; i++) {
        let el = document.getElementById('admin-seg-'+i+'-title');
        let v = localStorage.getItem('sinapta_seg_'+i+'_title');
        if(el && v) el.value = v;
    }
    for(let i=0; i<5; i++) {
        ['title','desc'].forEach(k => {
            let el = document.getElementById('admin-met-'+i+'-'+k);
            let v = localStorage.getItem('sinapta_met_'+i+'_'+k);
            if(el && v) el.value = v;
        });
        if(i<4) {
            ['title','desc'].forEach(k => {
                let el = document.getElementById('admin-diff-'+i+'-'+k);
                let v = localStorage.getItem('sinapta_diff_'+i+'_'+k);
                if(el && v) el.value = v;
            });
        }
        if(i<3) {
            ['tag','title','url'].forEach(k => {
                let el = document.getElementById('admin-blog-'+i+'-'+k);
                let v = localStorage.getItem('sinapta_blog_'+i+'_'+k);
                if(el && v) el.value = v;
            });
            ['title','desc'].forEach(k => {
                let el = document.getElementById('admin-feat-'+i+'-'+k);
                let v = localStorage.getItem('sinapta_feat_'+i+'_'+k);
                if(el && v) el.value = v;
            });
        }
    }
`;

let saveJs = `
    // SAVE LISTS
    for(let i=0; i<4; i++) {
        ['title','tag','desc','b1','b2','b3'].forEach(k => {
            let el = document.getElementById('admin-prod-'+i+'-'+k);
            if(el) localStorage.setItem('sinapta_prod_'+i+'_'+k, el.value);
        });
    }
    for(let i=0; i<6; i++) {
        let el = document.getElementById('admin-seg-'+i+'-title');
        if(el) localStorage.setItem('sinapta_seg_'+i+'_title', el.value);
    }
    for(let i=0; i<5; i++) {
        ['title','desc'].forEach(k => {
            let el = document.getElementById('admin-met-'+i+'-'+k);
            if(el) localStorage.setItem('sinapta_met_'+i+'_'+k, el.value);
        });
        if(i<4) {
            ['title','desc'].forEach(k => {
                let el = document.getElementById('admin-diff-'+i+'-'+k);
                if(el) localStorage.setItem('sinapta_diff_'+i+'_'+k, el.value);
            });
        }
        if(i<3) {
            ['tag','title','url'].forEach(k => {
                let el = document.getElementById('admin-blog-'+i+'-'+k);
                if(el) localStorage.setItem('sinapta_blog_'+i+'_'+k, el.value);
            });
            ['title','desc'].forEach(k => {
                let el = document.getElementById('admin-feat-'+i+'-'+k);
                if(el) localStorage.setItem('sinapta_feat_'+i+'_'+k, el.value);
            });
        }
    }
`;

fs.writeFileSync(adminPath, $.html());
console.log("Admin HTML rewritten");

// Append JS to admin.html
adminHtml = fs.readFileSync(adminPath, 'utf8');
adminHtml = adminHtml.replace('// 1. Array State do Testimonial', loadJs + '\n        // 1. Array State do Testimonial');
adminHtml = adminHtml.replace('// Save Logo', saveJs + '\n            // Save Logo');
fs.writeFileSync(adminPath, adminHtml);

// INDEX.HTML SCRIPT INJECTION
const indexPath = path.join(__dirname, 'site/public/index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

let indexLogic = `
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
        if(b1 && bullets[0]) bullets[0].innerHTML = bullets[0].innerHTML.replace(/<\\/span>.*$/, '</span> ' + b1);
        if(b2 && bullets[1]) bullets[1].innerHTML = bullets[1].innerHTML.replace(/<\\/span>.*$/, '</span> ' + b2);
        if(b3 && bullets[2]) bullets[2].innerHTML = bullets[2].innerHTML.replace(/<\\/span>.*$/, '</span> ' + b3);
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
        const tagNode = p.querySelector('.text-\\\\[10px\\\\]');
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
`;

indexHtml = indexHtml.replace('// 1.1 Títulos em HTML', indexLogic + '\\n    // 1.1 Títulos em HTML');
fs.writeFileSync(indexPath, indexHtml);
console.log("Index HTML rewritten");
