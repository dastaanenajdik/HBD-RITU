/* =========================================================
   HBD RITU RAZ — App script (optimized)
   ========================================================= */
'use strict';

/* ---------- Config (update these when needed) ---------- */
const CONFIG = {
  PHOTO_URL: 'mini.jpg',
  WA_NUMBER: '918942895173',
  WISH_HEADER: 'Ritu Raz Birthday Wish 🎉💙',
  PIN: '1709',
  TRACKS: {
    main:   'https://files.catbox.moe/sqj2kr.mp3',
    emotional: 'https://cdn.pixabay.com/download/audio/2021/11/25/audio_00fa5593f3.mp3?filename=lofi-chill-medium-version-159456.mp3',
    // TODO: user will provide new billi-tap audio link — replace here.
    cat:    'https://files.catbox.moe/ep38ia.mp3'
  },
  INTRO_VIDEO: 'https://files.catbox.moe/tc3ty8.mp4',
  REVEAL_VIDEO: 'https://files.catbox.moe/uc5t21.mp4',
  OLD_VIDEO:   'https://files.catbox.moe/evxl87.mp4',
  GIFTS: {
    hub:  'https://ifallgift.vercel.app/',
    sidify: 'https://sidify.vercel.app/',
    downloader: 'https://ifallertzia-downloader.vercel.app/',
    movies: 'https://new4.eonmovies.click/',
    tauntBuddy: 'https://github.com/dastaanenajdik/Tauntbuddy/releases/download/V1.0/app-release.apk'
  }
};

/* ---------- Data ---------- */
const CONF = ['#00e5ff','#5b8cff','#b16bff','#ff5ccf','#ff9a3c','#9dff5c','#fff'];
const NO_LINES = ['Nahi bhai 😹','Bhag gaya!','Nice try bro 😎','Ajeeb hai tu 😂','Mt krna re 😭'];
const CARE_DODGE_LINES = ['Soch lo phir se 👀','Galat option, bhago!','Ye button jhooth bolta hai','Nahi nahi, ye nahi','Arre itna bhi kya!','Try again bro 🙈','Ye option chhutti pe hai'];
const CARE_DEFAULTS = ['😞 Bilkul nahi mante','🤏 Thoda bahut'];

const PRESETS = [
  'Thank you for always pulling me back when I overthink — best bro instincts ever.',
  'Thank you for laughing at my worst jokes like they are actually funny.',
  'Thank you for telling me the straight truth even when I don’t want to hear it.',
  'Thank you for showing up — every single time, without being asked.',
  'Thank you for the random 2 AM calls that turn into the best therapy sessions.',
  'Thank you for the chai-sutta and maggi memories that hit different.',
  'Thank you for being the brother I chose for myself — forever ride-or-die.',
  'Thank you for turning ordinary hangouts into stories we’ll laugh at for decades.'
];

const SIGNOFFS = [
  '— tera yaar 💙',
  '— bas kehna tha ✨',
  '— from someone who notices 🤝',
  '— certified dosti moment 😭',
  '— always rooting for you 🚀',
  '— okay, emotional mat ho na 🥹'
];

// Placeholder memories — user said he'll provide the real ones later.
const MEMORIES = [
  { t: 'The First Hello',    d: 'Woh pehla "bhai" jo sab kuch shuru kar gaya.', c: '#00e5ff' },
  { t: 'The First Laugh',    d: 'Ek chhota sa joke aur haste-haste raat nikal gayi.', c: '#5b8cff' },
  { t: 'The Late-Night Calls', d: '2 AM ki chai, bakchodi aur life ki baatein.',  c: '#b16bff' },
  { t: 'The Chaos',          d: 'Kuch to hamesha gadbad hoti hai — aur wahi maza hai.', c: '#ff9a3c' },
  { t: 'Today',              d: 'Aaj tera din hai. Party toh banti hai.', c: '#ff5ccf' }
];

const CAT_LINES = {
  f1: [
    'Dua: Tujhe har woh cheez mile jo tu deserve karta hai 🌊',
    'Dua: Tera hustle kabhi thake na 🚀',
    'Billi bolti hai: aaj ke din full chill, no tension 🤿',
    'Aaj ke liye ek free pass — koi nahi daantega tujhe 😎'
  ],
  f2: [
    'Dua: Tere saath hamesha sachche dost rahein 💙',
    'Dua: Teri hansi kabhi kam na ho 😄',
    'Ye billi tere liye naach rahi hai. Fees: ek cold drink 🍻',
    'Dance floor ready hai, cake ready hai, bas tu late hai 💃',
    'Happy Birthday Ritu! Aaj ka tu king hai. Rule hai. 😼'
  ]
};

const NOTE_GRADS = [
  'linear-gradient(135deg,#00c6ff,#0072ff)',
  'linear-gradient(135deg,#5b8cff,#b16bff)',
  'linear-gradient(135deg,#22c55e,#0ea5e9)',
  'linear-gradient(135deg,#ff9a3c,#ff5ccf)',
  'linear-gradient(135deg,#ff5ccf,#b16bff)'
];
const NOTE_ICONS = ['heart','sparkles','sun','star','zap'];

const WISH_DRAFT =
`Happy Birthday Ritu Raz! 🎉

Mere bhai, iss saal ke liye official wish-list:
1. Ek solid party — full on, no excuses. 🍻
2. Treat teri, meri choice. Pizza mandatory. 🍕
3. Har mahine ek proper meet-up / trip — backlog mat rakhna. 🚀
4. Hamesha wahi Ritu bana reh — jisse baat karke mood automatically sahi ho jaye. 💙

Aur ye chhota sa site — tere liye banaya hai. Hope it made your day, brother. 🥹✨`;

/* ---------- State ---------- */
const state = {
  currentSlide: 0,
  quizAnswered: false,
  careAnswered: false,
  billiVideoDone: false,
  billiVideoDead: false,
  wishMade: false,
  cakeCut: false,
  timelineBuilt: false,
  musicPlaying: false,
  unlocked: false,
  envOpened: false,
  candleLit: false,
  notesBuilt: false,
  finaleShown: false,
  enterTimers: []
};

const slides = $$('.slide');
const TOTAL = slides.length;
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

/* ---------- Helpers ---------- */
function refreshIcons(){ if(window.lucide) lucide.createIcons(); }

function safeConfetti(opts){
  if(typeof confetti === 'function') confetti(Object.assign({ zIndex: 280, colors: CONF }, opts||{}));
}
function createConfetti(opts){ safeConfetti(opts||{}); }
function bigConfetti(){
  createConfetti({ particleCount: 140, spread: 80, origin:{ y:.65 } });
  setTimeout(()=>createConfetti({ particleCount: 90, angle:60, spread:60, origin:{ x:0, y:.7 } }), 160);
  setTimeout(()=>createConfetti({ particleCount: 90, angle:120, spread:60, origin:{ x:1, y:.7 } }), 320);
}
function doubleTapConfetti(x,y){
  const nx=x/window.innerWidth, ny=y/window.innerHeight;
  createConfetti({ particleCount:42, spread:70, scalar:.85, origin:{ x:nx, y:ny } });
  setTimeout(()=>createConfetti({ particleCount:24, spread:60, scalar:.7, origin:{ x:nx, y:ny } }), 120);
}

function spawnSpark(x,y,color,minD,maxD){
  const s = document.createElement('span');
  s.className = 'spark';
  const ang = Math.random()*Math.PI*2;
  const dist = (minD||22) + Math.random()*((maxD||60)-(minD||22));
  s.style.setProperty('--dx', (Math.cos(ang)*dist).toFixed(1)+'px');
  s.style.setProperty('--dy', (Math.sin(ang)*dist).toFixed(1)+'px');
  s.style.background = color || CONF[(Math.random()*CONF.length)|0];
  s.style.left = x+'px'; s.style.top = y+'px';
  document.body.appendChild(s);
  setTimeout(()=>s.remove(), 800);
}

const EMOJIS = ['⚡','💥','✨','🌟','🚀','💙','💜','🔥','🎮','🎧','🏀','⚽','🍕','🍻','🎧','🎯'];
const PETAL_ANIMS = ['f-burst','f-float','f-spin','f-drop'];

function spawnEmoji(x,y,sizeMin,sizeMax){
  const el = document.createElement('span');
  el.className = 'petal '+PETAL_ANIMS[(Math.random()*PETAL_ANIMS.length)|0];
  el.textContent = EMOJIS[(Math.random()*EMOJIS.length)|0];
  const ang = Math.random()*Math.PI*2;
  const dist = 30+Math.random()*62;
  el.style.setProperty('--dx', (Math.cos(ang)*dist).toFixed(1)+'px');
  el.style.setProperty('--dy', (Math.sin(ang)*dist).toFixed(1)+'px');
  el.style.fontSize = ((sizeMin||16)+Math.random()*((sizeMax||28)-(sizeMin||16))).toFixed(0)+'px';
  el.style.left = x+'px'; el.style.top = y+'px';
  document.body.appendChild(el);
  setTimeout(()=>el.remove(), 1400);
}
function emojiBurst(x,y,n){
  const count = n || (3 + ((Math.random()*2)|0));
  for(let i=0;i<count;i++) setTimeout(()=>spawnEmoji(x,y), i*55);
}

function sparkleAt(target,y){
  let x,yy;
  if(typeof target === 'number'){ x = target; yy = y; }
  else if(target && target.getBoundingClientRect){
    const r = target.getBoundingClientRect();
    x = r.left+r.width/2; yy = r.top+r.height/2;
  } else { x = window.innerWidth/2; yy = window.innerHeight/2; }
  for(let i=0;i<7;i++) spawnSpark(x,yy,CONF[i%CONF.length],10,46);
}

function showToast(msg,color){
  const wrap = $('#toastWrap');
  if(!wrap) return;
  while(wrap.children.length >= 2) wrap.firstChild.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  const dot = document.createElement('span');
  dot.className = 'tdot'; dot.style.background = color || CONF[(Math.random()*CONF.length)|0];
  const m = document.createElement('span'); m.textContent = msg;
  t.appendChild(dot); t.appendChild(m);
  wrap.appendChild(t);
  setTimeout(()=>{ t.classList.add('out'); setTimeout(()=>t.remove(), 360); }, 2600);
}

function openExternal(url){
  try{
    const a = document.createElement('a');
    a.href = url; a.target='_blank'; a.rel='noopener noreferrer';
    a.style.display='none'; document.body.appendChild(a); a.click();
    setTimeout(()=>a.remove(), 1200);
  }catch(_){ try{ window.location.href = url; }catch(__){} }
}

/* ---------- Navigation ---------- */
function updateDots(){
  $$('#dots .dot').forEach((d,i)=>d.classList.toggle('on', i===state.currentSlide));
}
function buildDots(){
  const wrap = $('#dots'); wrap.innerHTML='';
  for(let i=0;i<TOTAL;i++){
    const b = document.createElement('button');
    b.className = 'dot'+(i===0?' on':'');
    b.setAttribute('data-goto', i);
    b.setAttribute('aria-label','Go to slide '+(i+1));
    wrap.appendChild(b);
  }
}
function clearEnterTimers(){
  state.enterTimers.forEach(id=>{ clearTimeout(id); clearInterval(id); });
  state.enterTimers = [];
}
function stopSlideVideos(){
  try{ stopOverlay(); }catch(_){}
  ['#rvVideo','#oldVideo','#introVideo'].forEach(sel=>{
    const v = document.querySelector(sel);
    if(v && !v.paused){ try{ v.pause(); }catch(_){} }
  });
  unduckMusic();
}
function goToSlide(index){
  index = Math.max(0, Math.min(TOTAL-1, index|0));
  if(index === state.currentSlide) return;
  clearEnterTimers();
  stopSlideVideos();
  state.currentSlide = index;
  slides.forEach((s,i)=>{
    s.classList.toggle('active', i===index);
    s.classList.toggle('is-prev', i<index);
  });
  updateDots();
  $('#prevBtn').classList.toggle('off', index===0);
  $('#nextBtn').classList.toggle('off', index===TOTAL-1);
  onEnterSlide(index);
}
function nextSlide(){ if(!state.unlocked) return; goToSlide(state.currentSlide+1); }
function prevSlide(){ if(state.unlocked) goToSlide(state.currentSlide-1); }

function onEnterSlide(i){
  switch(i){
    case 2: resetCare(); break;
    case 6: runWho(); break;
    case 9: runReveal(); break;
    case 10: runOldVideo(); break;
    case 12: buildNotes(); break;
    case 13: buildTimeline(); break;
    case 14:
      buildTimeline();
      if(!state.finaleShown){
        state.finaleShown = true;
        setTimeout(bigConfetti, 500);
      }
      break;
  }
}

/* ---------- Gate / PIN ---------- */
function setupGate(){
  const boxes = $$('.pin-box');
  boxes.forEach((b,i)=>{
    b.addEventListener('input', ()=>{
      b.value = b.value.replace(/\D/g,'').slice(0,1);
      if(b.value && i<boxes.length-1) boxes[i+1].focus();
    });
    b.addEventListener('keydown', e=>{
      if(e.key==='Backspace' && !b.value && i>0){ boxes[i-1].focus(); boxes[i-1].value=''; }
      if(e.key==='Enter') unlockSite();
    });
  });
  $('#unlockBtn').addEventListener('click', unlockSite);
  setTimeout(()=>boxes[0] && boxes[0].focus(), 400);
}
function unlockSite(){
  if(state.unlocked) return;
  const pin = $$('.pin-box').map(b=>b.value).join('');
  const card = $('#gateCard');
  if(pin === CONFIG.PIN){
    state.unlocked = true;
    sparkleAt(card);
    createConfetti({ particleCount:70, spread:80, origin:{ y:.5 }, scalar:.9 });
    showToast('Unlocked! Andar aa bhai 💙','#00e5ff');
    $('#gate').classList.add('gate-out');
    document.body.classList.add('unlocked');
    setTimeout(()=>{ const g=$('#gate'); if(g) g.style.display='none'; }, 850);
    setTimeout(playIntroVideo, 700);
    sparkleAt(window.innerWidth/2, window.innerHeight/2.6);
  } else {
    card.classList.remove('shake-anim'); void card.offsetWidth; card.classList.add('shake-anim');
    showToast('Bhai wrong PIN daal diya 🙈 Hint: 1709','#ff5ccf');
    $$('.pin-box').forEach(b=>b.value='');
    const first = $('.pin-box'); if(first) first.focus();
  }
}

/* ---------- YES / NO ---------- */
function setupQuiz(){
  const yes = $('#yesBtn'), no = $('#noBtn'), arena = $('#noArena');
  if(!yes||!no||!arena) return;
  yes.addEventListener('click', ()=>{
    if(state.quizAnswered) return;
    state.quizAnswered = true;
    createConfetti({ particleCount:70, spread:75, origin:{ y:.55 }, scalar:.9 });
    sparkleAt(yes);
    showToast('Sahi jawab! Chaliye aage 😎💙','#00e5ff');
    no.classList.add('dead'); yes.disabled = true;
    const qn = $('#quizNext');
    if(qn){ qn.style.display='inline-flex'; qn.style.animation='cardPop .7s var(--ease-spring) both'; refreshIcons(); }
  });
  let noLive = false;
  const dodge = (e)=>{
    if(state.quizAnswered) return;
    if(!noLive) return;
    if(e && e.cancelable && e.type!=='click') e.preventDefault();
    dodgeNoButton();
  };
  no.addEventListener('click', e=>{
    if(state.quizAnswered) return;
    e.preventDefault(); noLive = true; dodgeNoButton();
  });
  no.addEventListener('pointerenter', dodge);
  no.addEventListener('touchstart', dodge, { passive:false });
}
function dodgeNoButton(){
  const no = $('#noBtn'), arena = $('#noArena');
  if(!no||!arena) return;
  no.textContent = NO_LINES[(Math.random()*NO_LINES.length)|0];
  const aW = arena.clientWidth, aH = arena.clientHeight;
  const bW = no.offsetWidth, bH = no.offsetHeight;
  const maxX = Math.max(0, aW-bW), maxY = Math.max(0, aH-bH);
  const x = 6 + Math.random()*Math.max(0, maxX-12);
  const y = 6 + Math.random()*Math.max(0, maxY-12);
  no.style.left = x+'px'; no.style.top = y+'px'; no.style.transform = 'none';
  const r = arena.getBoundingClientRect();
  spawnSpark(x+bW/2+r.left, y+r.top, CONF[4], 8, 30);
}

/* ---------- Care meter ---------- */
function setupCare(){
  const arena = $('#careArena');
  if(!arena) return;
  $$('.care-dodge').forEach(btn=>{
    let live = false;
    const dodge = (e)=>{
      if(state.careAnswered || !live) return;
      if(e && e.cancelable && e.type!=='click') e.preventDefault();
      dodgeCareButton(btn);
    };
    btn.addEventListener('click', e=>{
      if(state.careAnswered) return;
      e.preventDefault(); live = true; dodgeCareButton(btn);
    });
    btn.addEventListener('pointerenter', dodge);
    btn.addEventListener('touchstart', dodge, { passive:false });
    btn._resetLive = ()=>{ live = false; };
  });
  const yes = $('#careYes');
  if(yes) yes.addEventListener('click', ()=>{
    if(state.careAnswered) return;
    state.careAnswered = true;
    $$('.care-dodge').forEach(b=>b.classList.add('dead'));
    yes.disabled = true;
    sparkleAt(yes);
    createConfetti({ particleCount:60, spread:72, origin:{ y:.6 }, scalar:.85 });
    showToast('Sahi jawab! Ab proof dekh 💙','#00e5ff');
    $('#careResult').style.display = 'block';
    runCareMeter();
  });
}
function dodgeCareButton(btn){
  const arena = $('#careArena'); if(!arena) return;
  btn.textContent = CARE_DODGE_LINES[(Math.random()*CARE_DODGE_LINES.length)|0];
  btn.classList.add('loose');
  const aW = arena.clientWidth, aH = arena.clientHeight;
  const bW = btn.offsetWidth, bH = btn.offsetHeight;
  const x = 4 + Math.random()*Math.max(0,aW-bW-8);
  const y = 4 + Math.random()*Math.max(0,aH-bH-8);
  btn.style.left = x+'px'; btn.style.top = y+'px';
  const r = arena.getBoundingClientRect();
  emojiBurst(r.left+x+bW/2, r.top+y+bH/2);
}
function resetCare(){
  if(state.careAnswered) return;
  const res = $('#careResult'); if(res) res.style.display='none';
  const opts = $$('.care-dodge');
  opts.forEach((b,i)=>{
    b.classList.remove('loose','dead');
    b.style.left=''; b.style.top='';
    b.textContent = CARE_DEFAULTS[i] || b.textContent;
    if(b._resetLive) b._resetLive();
  });
}
function runCareMeter(){
  const fill = $('#meterFill'), pct = $('#meterPct'), msg = $('#meterMsg');
  if(!fill||!pct) return;
  fill.classList.remove('meter-done');
  const stages = [
    [15,  'hmm... shuruaat achhi hai'],
    [40,  'thoda aur... dil se naap rahe hain'],
    [70,  'okay okay, yeh to serious nikla'],
    [92,  'almost... bas thoda sa aur'],
    [100, '100% — certified bhai-for-life care. No refunds 💙']
  ];
  let v = 0; fill.style.width='0%'; pct.textContent='0%';
  msg.textContent='Calculating kitna care karta hoon...';
  const iv = setInterval(()=>{
    v += 1 + Math.random()*2.2;
    if(v>=100) v=100;
    fill.style.width = v+'%'; pct.textContent = Math.round(v)+'%';
    for(const[limit,text] of stages){ if(v>=limit) msg.textContent=text; }
    if(v>=100){
      clearInterval(iv); fill.classList.add('meter-done');
      sparkleAt($('#meterWrap'));
      createConfetti({ particleCount:40, spread:60, origin:{ y:.5 }, scalar:.7 });
      showToast('Care level: MAXIMUM 💙','#5b8cff');
      const cn = $('#careNext');
      if(cn){ cn.style.display='inline-flex'; cn.style.animation='cardPop .7s var(--ease-spring) both'; refreshIcons(); }
    }
  }, 46);
  state.enterTimers.push(iv);
}

/* ---------- Envelope ---------- */
function setupEnvelope(){
  const scene = $('#envScene'), env = $('#env');
  if(!scene||!env) return;
  env.addEventListener('click', ()=>{
    if(state.envOpened) return;
    state.envOpened = true;
    scene.classList.add('open');
    sparkleAt(env);
    playOverlay('emotional');
    state.enterTimers.push(setTimeout(()=>scene.classList.add('gone'), 1350));
    state.enterTimers.push(setTimeout(()=>{ $('#letterPanel').classList.add('show'); refreshIcons(); }, 1680));
    state.enterTimers.push(setTimeout(()=>showToast('Purani yaadein, fresh feel 💙','#b16bff'), 1950));
  });
}

/* ---------- Candle ---------- */
function setupCandle(){
  const c = $('#candleEl');
  if(!c) return;
  c.addEventListener('click', ()=>{
    c.classList.add('wow');
    const glow = $('#warmGlow'); glow.style.opacity='1';
    setTimeout(()=>glow.style.opacity='0', 2200);
    sparkleAt(c);
    if(!state.candleLit){
      state.candleLit = true;
      showToast('Candle jal gayi! Ab wish soch le 🕯️✨','#00e5ff');
      createConfetti({ particleCount:28, spread:50, origin:{ y:.4 }, scalar:.7 });
    } else {
      showToast('Aur roshni, aur vibe ✨','#5b8cff');
    }
  });
}

/* ---------- Wish ---------- */
function setupWish(){
  const btn = $('#wishBtn');
  if(!btn) return;
  btn.addEventListener('click', ()=>{
    bigConfetti(); sparkleAt(btn);
    if(!state.wishMade){
      state.wishMade = true;
      btn.innerHTML='<i data-lucide="check"></i> ✓ Wish locked in!';
      showToast('Wish locked in... 💫💙','#00e5ff');
    } else {
      showToast('Lalach mat kar bhai — ek wish per birthday 😭💙','#ff5ccf');
    }
  });
}

/* ---------- Cake cut ---------- */
function setupCake(){
  const stage = $('#cakeStage'), cutter = $('#cutter');
  if(!stage||!cutter) return;
  let dragging=false, lastSide=0;
  cutter.style.left = '12px'; cutter.style.top = '14px';
  cutter.addEventListener('pointerdown', e=>{
    dragging=true; lastSide=0; cutter.classList.add('grabbing');
    try{ cutter.setPointerCapture(e.pointerId); }catch(_){}
    e.preventDefault();
  });
  cutter.addEventListener('pointermove', e=>{
    if(!dragging) return;
    e.preventDefault();
    const r = stage.getBoundingClientRect();
    const cx = Math.max(0, Math.min(r.width-cutter.offsetWidth, e.clientX-r.left-cutter.offsetWidth/2));
    const cy = Math.max(0, Math.min(r.height-cutter.offsetHeight, e.clientY-r.top-cutter.offsetHeight/2));
    cutter.style.left = cx+'px'; cutter.style.top = cy+'px';
    if(!state.cakeCut){
      const cakeBandTop = r.height*.22, cakeBandBottom = r.height;
      const px = e.clientX-r.left, py = e.clientY-r.top;
      if(py>cakeBandTop && py<cakeBandBottom){
        const side = px < r.width/2 ? -1 : 1;
        if(lastSide!==0 && side!==lastSide) onCakeCut();
        lastSide = side;
      }
    }
  });
  const stop = ()=>{ dragging=false; cutter.classList.remove('grabbing'); };
  cutter.addEventListener('pointerup', stop);
  cutter.addEventListener('pointercancel', stop);

  function onCakeCut(){
    state.cakeCut = true;
    stage.classList.add('cut');
    const r = stage.getBoundingClientRect();
    for(let i=0;i<14;i++) spawnSpark(r.left+r.width/2, r.top+r.height*(.3+Math.random()*.5), CONF[i%CONF.length], 14, 70);
    createConfetti({ particleCount:80, spread:70, origin:{ y:.6 }, scalar:.85 });
    showToast('Clean cut! Cake ho gaya distribute 🍰😂','#ff9a3c');
    const cont = $('#cakeContinue');
    cont.style.display='inline-flex';
    cont.style.animation='cardPop .7s var(--ease-spring) both';
    refreshIcons();
  }
  $('#cakeContinue').addEventListener('click', ()=>goToSlide(9));
}

/* ---------- Floating cats (billi) ---------- */
function setupCats(){
  const cooldown = {};
  const react = (el,key)=>{
    const now = Date.now();
    if(cooldown[key] && now-cooldown[key] < 700) return;
    cooldown[key] = now;
    playCatSong();
    const lines = CAT_LINES[key] || CAT_LINES.f1;
    showToast(lines[(Math.random()*lines.length)|0], CONF[(Math.random()*CONF.length)|0]);
    el.classList.remove('catPop'); void el.offsetWidth; el.classList.add('catPop');
    const r = el.getBoundingClientRect();
    createConfetti({ particleCount:14, spread:45, scalar:.6, origin:{ x:(r.left+r.width/2)/window.innerWidth, y:(r.top+r.height/2)/window.innerHeight } });
  };
  $$('.cat, .fcat').forEach(el=>{
    const key = el.dataset.cat || 'tl';
    let active=false, moved=false, sx=0, sy=0, startL=0, startT=0;
    el.addEventListener('pointerdown', e=>{
      active=true; moved=false; sx=e.clientX; sy=e.clientY;
      const r=el.getBoundingClientRect(); startL=r.left; startT=r.top;
      try{ el.setPointerCapture(e.pointerId); }catch(_){}
    });
    el.addEventListener('pointermove', e=>{
      if(!active) return;
      const dx = e.clientX-sx, dy=e.clientY-sy;
      if(!moved && Math.hypot(dx,dy)>9){ moved=true; el.classList.add('dragging'); }
      if(moved){
        el.style.left=(startL+dx)+'px';
        el.style.top=(startT+dy)+'px';
        el.style.right='auto'; el.style.bottom='auto';
      }
    });
    const end = ()=>{
      if(!active) return;
      active=false;
      if(moved){ el.classList.remove('dragging'); }
      else react(el, key);
      moved=false;
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  });
}

/* ---------- Who reveal ---------- */
function runWho(){
  const a = $('#whoA'), b = $('#whoB'), c = $('#whoC');
  [a,b,c].forEach(el=>el && el.classList.remove('on'));
  state.enterTimers.push(setTimeout(()=>a.classList.add('on'), 450));
  state.enterTimers.push(setTimeout(()=>b.classList.add('on'), 1350));
  state.enterTimers.push(setTimeout(()=>{
    c.classList.add('on'); sparkleAt(c);
    createConfetti({ particleCount:50, spread:70, origin:{ y:.45 }, scalar:.8 });
  }, 2350));
}

/* ---------- Birthday reveal video ---------- */
function showBirthdayWish(){
  const C = $('#rvC');
  if(!C || !C.classList.contains('hidden')) return;
  C.classList.remove('hidden'); C.classList.add('flex');
  sparkleAt(window.innerWidth/2, window.innerHeight*.42);
  bigConfetti();
  ['fcat1','fcat2'].forEach(id=>{
    const el = document.getElementById(id);
    if(el){ el.classList.remove('catPop'); void el.offsetWidth; el.classList.add('catPop'); }
  });
  showToast(CAT_LINES.f2[(Math.random()*CAT_LINES.f2.length)|0], '#5b8cff');
  refreshIcons();
}
function runReveal(){
  const box=$('#rvVidBox'), vid=$('#rvVideo'), C=$('#rvC');
  if(!box||!vid){ showBirthdayWish(); return; }
  C.classList.add('hidden'); C.classList.remove('flex');
  box.style.display=''; box.classList.remove('vidgone');
  duckMusic();
  let done=false;
  const finish = ()=>{
    if(done) return; done=true;
    box.classList.add('vidgone');
    state.enterTimers.push(setTimeout(()=>{
      box.style.display='none';
      unduckMusic();
      showBirthdayWish();
    }, 780));
  };
  vid.currentTime=0; vid.muted=false; vid.volume=1;
  const p = vid.play();
  if(p && p.catch) p.catch(()=>{
    vid.muted=true; const q=vid.play(); if(q&&q.catch) q.catch(finish);
  });
  vid.addEventListener('ended', finish, { once:true });
  vid.addEventListener('error', finish, { once:true });
}

/* ---------- "Old video" (billi break) ---------- */
function setupOldVideo(){
  const box=$('#oldVidBox'), vid=$('#oldVideo');
  if(!box||!vid) return;
  box.addEventListener('click', ()=>{
    if(!vid.paused) return;
    const note = $('#oldVidNote');
    duckMusic();
    vid.controls=false; vid.muted=false; vid.volume=1;
    if(note) note.style.display='none';
    try{ if(vid.error) vid.load(); }catch(_){}
    const p=vid.play();
    if(p && p.catch) p.catch(()=>{
      vid.muted=true; const q=vid.play();
      if(q&&q.catch) q.catch(()=>{
        vid.controls=true; unduckMusic();
        if(note){ note.textContent='▶️ Tap to play the video'; note.style.display='block'; }
      });
    });
  });
}
function runOldVideo(){
  const box=$('#oldVidBox'), vid=$('#oldVideo'), next=$('#oldVidNext'), note=$('#oldVidNote');
  if(!box||!vid) return;
  const wrapUp=(msg,ok)=>{
    box.style.display='none'; box.classList.add('vidgone');
    unduckMusic();
    if(note){ note.textContent=msg; note.style.display='block'; }
    if(next){ next.style.display='inline-flex'; next.style.animation='cardPop .7s var(--ease-spring) both'; }
    if(ok) sparkleAt(window.innerWidth/2, window.innerHeight*.42);
    refreshIcons();
  };
  if(state.billiVideoDead){ wrapUp('Video load nahi hua 🥲 — aage badho ✨', false); return; }
  if(vid._onEnd) vid.removeEventListener('ended', vid._onEnd);
  if(vid._onErr) vid.removeEventListener('error', vid._onErr);
  box.style.display=''; box.classList.remove('vidgone');
  if(next) next.style.display='none';
  if(note) note.style.display='none';
  vid.controls=false;
  try{ vid.pause(); }catch(_){}
  vid.muted=false; vid.volume=1;
  try{ vid.currentTime=0; }catch(_){}
  duckMusic();
  let done=false;
  const finish=(ok)=>{
    if(done) return; done=true;
    state.billiVideoDone = true;
    if(!ok) state.billiVideoDead = true;
    if(vid._onEnd) vid.removeEventListener('ended', vid._onEnd);
    if(vid._onErr) vid.removeEventListener('error', vid._onErr);
    box.classList.add('vidgone');
    state.enterTimers.push(setTimeout(()=>wrapUp(ok?'Video khatam 😂 — aage badho ✨':'Video load nahi hua 🥲 — aage badho ✨', ok), 780));
  };
  vid._onEnd = ()=>finish(true);
  vid._onErr = ()=>finish(false);
  vid.addEventListener('ended', vid._onEnd, { once:true });
  vid.addEventListener('error', vid._onErr, { once:true });
  const p=vid.play();
  if(p&&p.catch) p.catch(()=>{
    vid.muted=true; const q=vid.play();
    if(q&&q.catch) q.catch(()=>{
      vid.controls=true; unduckMusic();
      if(note){ note.textContent='▶️ Tap to play the video'; note.style.display='block'; }
    });
  });
}

/* ---------- Notes / flip cards ---------- */
function buildNotes(){
  const wrap = $('#notesWrap');
  if(!wrap) return;
  if(state.notesBuilt && wrap.children.length) return;
  state.notesBuilt = true;
  wrap.innerHTML=''; wrap.scrollTop=0;
  PRESETS.forEach((text,i)=>{
    const rot = (1+Math.random()*2.2) * (i%2===0 ? 1 : -1);
    const outer = document.createElement('div');
    outer.className = 'fnote';
    outer.style.setProperty('--nr', rot.toFixed(2)+'deg');
    outer.style.animationDelay = (200 + i*170)+'ms';
    const signoff = SIGNOFFS[(Math.random()*SIGNOFFS.length)|0];
    const card = document.createElement('div');
    card.className = 'flip-card no-swipe';
    card.setAttribute('role','button');
    card.innerHTML =
      '<div class="flip-face flip-front" style="background:'+NOTE_GRADS[i%5]+';">'+
        '<div class="flock"><i data-lucide="lock"></i></div>'+
        '<div class="flex-1 text-left">'+
          '<div class="fcardnum font-hand font-bold">CARD '+(i+1)+'</div>'+
          '<div class="ftap">TAP TO UNLOCK</div>'+
        '</div>'+
        '<i data-lucide="zap" class="fstar"></i>'+
      '</div>'+
      '<div class="flip-face flip-back glass">'+
        '<div class="fnic" style="background:'+NOTE_GRADS[i%5]+'"><i data-lucide="'+NOTE_ICONS[i%5]+'"></i></div>'+
        '<div class="flex-1 text-left">'+
          '<div class="fnt"></div><div class="fns font-hand"></div>'+
        '</div>'+
      '</div>';
    card.querySelector('.fnt').textContent = text;
    card.querySelector('.fns').textContent = signoff;
    card.addEventListener('click', ()=>{ card.classList.toggle('flipped'); sparkleAt(card); });
    outer.appendChild(card);
    wrap.appendChild(outer);
    requestAnimationFrame(()=>requestAnimationFrame(()=>outer.classList.add('in')));
  });
  refreshIcons();
}

/* ---------- Timeline ---------- */
function buildTimeline(){
  if(state.timelineBuilt) return;
  state.timelineBuilt = true;
  const wrap = $('#timeline'); if(!wrap) return;
  MEMORIES.forEach((mem,i)=>{
    const item = document.createElement('div');
    item.className='tl-item'; item.style.animationDelay=(200+i*300)+'ms';
    item.innerHTML = '<span class="tl-dot" style="background:'+mem.c+';box-shadow:0 0 14px '+mem.c+'88;"></span>'+
                     '<div class="tl-t"></div><div class="tl-d"></div>';
    item.querySelector('.tl-t').textContent = mem.t;
    item.querySelector('.tl-d').textContent = mem.d;
    wrap.appendChild(item);
    requestAnimationFrame(()=>requestAnimationFrame(()=>item.classList.add('in')));
  });
}

/* ---------- Day-of-year sections ---------- */
const DAY_SECTIONS = {
  ind: {
    title:'Indian History', sub:'17 September — Bharat ke itihaas me', color:'#5b8cff', icon:'landmark',
    items:[
      ['1948 — Liberation of Hyderabad State','The Nizam of Hyderabad surrendered to India after Operation Polo led by Sardar Vallabhbhai Patel.'],
      ['1965 — Battle of Chawinda','One of the largest tank battles in post-WWII history during the 1965 Indo-Pak War.']
    ]
  },
  indcel:{
    title:'Indian Celebs', sub:'Aaj ke din paida hue Indian sitare', color:'#ff9a3c', icon:'star',
    items:[
      ['Narendra Modi (b. 1950)','14th Prime Minister of India.'],
      ['Periyar E. V. Ramasamy (b. 1879)','Social reformer and founder of the Self-Respect Movement.'],
      ['M. F. Husain (b. 1915)','The "Picasso of India".'],
      ['Ravichandran Ashwin (b. 1986)','Premier Indian cricketer and spin bowler.']
    ]
  },
  days:{
    title:'International & National Days', sub:'17 September ko duniya kya manati hai', color:'#b16bff', icon:'globe',
    items:[
      ['Hyderabad Liberation Day (India)','Commemorates the 1948 integration of Hyderabad into India.'],
      ['Vishwakarma Jayanti (India)','Day honoring Lord Vishwakarma, the divine architect.'],
      ['World Patient Safety Day (WHO)','Global awareness around patient safety and healthcare standards.'],
      ['World Manta Day','Ocean conservation day for manta rays.'],
      ['US Constitution Day','Marks the signing of the US Constitution in 1787.']
    ]
  },
  world:{
    title:'World History', sub:'Duniya me aaj kya hua tha', color:'#22c55e', icon:'history',
    items:[
      ['1787 — US Constitution Signed','Delegates signed the US Constitution in Philadelphia.'],
      ['1862 — Battle of Antietam','The bloodiest single day in American military history.'],
      ['1939 — Soviet Invasion of Poland','Red Army invaded Poland from the east in WWII.'],
      ['1978 — Camp David Accords','Historic peace deal between Egypt and Israel.'],
      ['1991 — Linux Kernel v0.01','Linus Torvalds released the first public Linux kernel.']
    ]
  },
  intcel:{
    title:'International Celebs', sub:'Duniya bhar ke 17 September wale', color:'#ff5ccf', icon:'cake',
    items:[
      ['Patrick Mahomes (b. 1995)','NFL quarterback & three-time Super Bowl champion.'],
      ['Hank Williams (b. 1923)','American country music pioneer.'],
      ['Ella Purnell (b. 1996)','British actress (Fallout, Yellowjackets).'],
      ['Esteban Ocon (b. 1996)','French Formula 1 driver.']
    ]
  }
};

function setupSections(){
  const modal = $('#secModal'); if(!modal) return;
  const hide = ()=>modal.classList.remove('show');
  $$('.secbtn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const d = DAY_SECTIONS[btn.dataset.sec];
      if(!d) return;
      $('#secTitle').textContent = d.title;
      $('#secSub').textContent = d.sub;
      const ic = $('#secIc'); ic.style.background = d.color; ic.innerHTML = '<i data-lucide="'+d.icon+'"></i>';
      const body = $('#secBody'); body.innerHTML=''; body.scrollTop=0;
      d.items.forEach(([t,txt],i)=>{
        const row = document.createElement('div');
        row.className='sec-item';
        row.style.animation='noteIn .5s var(--ease-spring) both';
        row.style.animationDelay=(60+i*70)+'ms';
        const b = document.createElement('b'); b.textContent=t;
        const s = document.createElement('span'); s.textContent=txt;
        row.appendChild(b); row.appendChild(s); body.appendChild(row);
      });
      modal.classList.add('show');
      refreshIcons();
    });
  });
  $('#secClose').addEventListener('click', hide);
  modal.addEventListener('click', e=>{ if(e.target===modal) hide(); });
}

/* ---------- Gift bridge ---------- */
function setupGift(){
  const bridge = $('#giftBridge'),
        open   = $('#giftBridgeBtn'),
        go     = $('#gbOpen'),
        close  = $('#gbClose'),
        sid    = $('#sidifyBtn'),
        down   = $('#downloaderBtn'),
        mov    = $('#moviesBtn'),
        g5     = $('#gift5Btn');
  if(open) open.addEventListener('click', ()=>{
    if(!bridge) return;
    bridge.classList.add('show');
    createConfetti({ particleCount:50, spread:80, origin:{ y:.5 }, scalar:.8 });
    refreshIcons();
  });
  if(bridge){
    const hide = ()=>bridge.classList.remove('show');
    if(close) close.addEventListener('click', hide);
    bridge.addEventListener('click', e=>{ if(e.target===bridge) hide(); });
  }
  if(go) go.addEventListener('click', ()=>{ showToast('Gift khul raha hai... enjoy kar bro 🎁💙','#00e5ff'); bigConfetti(); });
  if(sid) sid.addEventListener('click', ()=>{ showToast('Sidify khul raha hai 🎁💙','#b16bff'); bigConfetti(); });
  if(down) down.addEventListener('click', ()=>{ showToast('Downloader khul raha hai 🎬💙','#22c55e'); bigConfetti(); });
  if(mov) mov.addEventListener('click', ()=>{ showToast('Movies khul rahi hain... popcorn ready? 🍿💙','#b16bff'); bigConfetti(); });
  if(g5) g5.addEventListener('click', ev=>{
    ev.preventDefault();
    const url = g5.getAttribute('href');
    let fr = document.getElementById('apkFrame');
    if(!fr){
      fr = document.createElement('iframe');
      fr.id='apkFrame'; fr.setAttribute('title','apk download');
      fr.style.cssText='position:fixed;width:0;height:0;border:0;opacity:0;pointer-events:none';
      document.body.appendChild(fr);
    }
    try{ fr.src = url; }catch(e){}
    showToast('Taunt Buddy download shuru 📥 Downloads me check karo. Na chale to Chrome me kholo 💙','#22c55e');
    sparkleAt(g5); bigConfetti();
    setTimeout(()=>{ try{ fr.src='about:blank'; }catch(e){} }, 45000);
  });
  const g5c = $('#g5Copy');
  if(g5c) g5c.addEventListener('click', ()=>{
    const link = (g5 && g5.href) ? g5.href : CONFIG.GIFTS.tauntBuddy;
    const done = ()=>{ showToast('Link copy ho gaya ✅ Chrome me paste karke download karo 💙','#b16bff'); sparkleAt(g5c); };
    if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(link).then(done, ()=>showToast('Link: '+link,'#5b8cff'));
    else showToast('Link: '+link,'#5b8cff');
  });
}

/* ---------- Finale / wish send ---------- */
function setupFinale(){
  const send = $('#wishSendBtn'), ta = $('#wishMsg');
  if(ta && !ta.value.trim()) ta.value = WISH_DRAFT;
  if(send) send.addEventListener('click', ()=>{
    const el = $('#wishMsg');
    const v = ((el&&el.value)||'').trim();
    if(!v){ showToast('Kuch toh likho pehle 😅','#ff9a3c'); if(el) el.focus(); return; }
    const text = encodeURIComponent(CONFIG.WISH_HEADER + '\n\n' + v);
    openExternal('https://wa.me/'+CONFIG.WA_NUMBER+'?text='+text);
    showToast('WhatsApp khul raha hai... send karna mat bhoolna 💚','#22c55e');
    createConfetti({ particleCount:50, spread:70, origin:{ y:.62 }, scalar:.8 });
  });
  const cel = $('#celebrateBtn');
  if(cel) cel.addEventListener('click', ()=>{ bigConfetti(); sparkleAt(cel); showToast('Party never ends 🎉💙','#5b8cff'); });
  const replay = $('#rvReplay');
  if(replay) replay.addEventListener('click', runReveal);
}

/* ---------- Audio ---------- */
const audio = $('#bgm');
let overlayKey = null;
let mainWasPlaying = false;
const overlayCache = {};
function getOverlay(key){
  if(!CONFIG.TRACKS[key] || key==='main') return null;
  if(!overlayCache[key]){
    const el = new Audio(CONFIG.TRACKS[key]);
    el.preload = 'auto'; el.volume = .62;
    el.addEventListener('ended', ()=>onOverlayEnded(key));
    el.addEventListener('error', ()=>onOverlayEnded(key));
    overlayCache[key] = el;
  }
  return overlayCache[key];
}
function playOverlay(key){
  if(!audio || overlayKey===key) return;
  stopOverlay(false);
  const el = getOverlay(key);
  if(!el) return;
  overlayKey = key;
  mainWasPlaying = !audio.paused;
  if(mainWasPlaying) audio.pause();
  try{ el.currentTime = 0; }catch(_){}
  const p = el.play();
  if(p && p.catch) p.catch(()=>onOverlayEnded(key));
}
function onOverlayEnded(key){
  if(overlayKey !== key) return;
  overlayKey = null;
  resumeMainAfterOverlay();
}
function stopOverlay(resume){
  if(!overlayKey) return;
  const el = getOverlay(overlayKey);
  overlayKey = null;
  if(el){ try{ el.pause(); }catch(_){} }
  if(resume !== false) resumeMainAfterOverlay();
}
function resumeMainAfterOverlay(){
  if(!audio || duckedWasPlaying) return;
  const should = mainWasPlaying || state.musicPlaying;
  mainWasPlaying = false;
  if(should){ const p=audio.play(); if(p&&p.catch) p.catch(()=>{}); }
}
let catSongEl = null;
function getCatSong(){
  if(!catSongEl){
    catSongEl = new Audio(CONFIG.TRACKS.cat);
    catSongEl.preload = 'auto';
    catSongEl.volume = .62;
  }
  return catSongEl;
}
function playCatSong(){
  const el = getCatSong();
  if(!el) return;
  try{ el.currentTime = 0; }catch(_){}
  const p = el.play();
  if(p && p.catch) p.catch(()=>{});
}
let duckedWasPlaying = false;
function duckMusic(){
  if(!audio) return;
  duckedWasPlaying = !audio.paused;
  if(duckedWasPlaying) audio.pause();
}
function unduckMusic(){
  if(!audio || !duckedWasPlaying) return;
  duckedWasPlaying = false;
  const p = audio.play();
  if(p && p.catch) p.catch(()=>{});
}
function attemptMusic(){
  if(!audio || audio.dataset.dead === 'true') return;
  audio.volume = 0.5;
  const p = audio.play();
  if(p && p.catch) p.catch(()=>{});
}
function playIntroVideo(){
  const box = $('#introVid'), vid = $('#introVideo');
  if(!box||!vid){ attemptMusic(); return; }
  let finished = false;
  const finish = ()=>{
    if(finished) return; finished=true;
    try{ vid.pause(); }catch(_){}
    box.classList.add('bye');
    setTimeout(()=>{ box.classList.remove('show','bye'); box.style.display='none'; attemptMusic(); }, 720);
  };
  box.classList.add('show');
  vid.currentTime=0; vid.muted=false; vid.volume=1;
  const p = vid.play();
  if(p && p.catch) p.catch(()=>{ vid.muted=true; const q=vid.play(); if(q&&q.catch) q.catch(finish); });
  vid.addEventListener('ended', finish, { once:true });
  vid.addEventListener('error', finish, { once:true });
  const skip = $('#ivSkip');
  if(skip) skip.addEventListener('click', finish, { once:true });
}
function toggleMusic(){
  if(!audio) return;
  if(overlayKey){ stopOverlay(false); mainWasPlaying=false; return; }
  if(audio.dataset.dead === 'true'){ showToast('Music abhi available nahi hai 🥲','#ff5ccf'); return; }
  audio.volume = 0.5;
  if(audio.paused){
    const p = audio.play();
    if(p && p.catch) p.catch(()=>showToast('Browser ne music rok diya — ek aur tap 🎵','#ff9a3c'));
  } else { audio.pause(); }
}
function setupMusic(){
  const pill = $('#musicPill'), label = $('#musicLabel');
  if(!pill||!audio) return;
  audio.src = CONFIG.TRACKS.main;
  audio.volume = 0.5;
  pill.addEventListener('click', e=>{ e.stopPropagation(); toggleMusic(); });
  audio.addEventListener('playing', ()=>{
    state.musicPlaying = true;
    pill.classList.add('playing'); pill.classList.remove('off');
    label.textContent = 'PLAYING';
  });
  audio.addEventListener('pause', ()=>{
    state.musicPlaying = false;
    pill.classList.remove('playing'); pill.classList.add('off');
    label.textContent = 'MUSIC';
  });
  audio.addEventListener('error', ()=>{
    if(overlayKey) return;
    audio.dataset.dead = 'true';
    showToast('Music load nahi ho paaya 🥲','#ff5ccf');
  });
}

/* ---------- Ripple / global interactions ---------- */
function createRipple(e,btn){
  const r = btn.getBoundingClientRect();
  const span = document.createElement('span');
  span.className = 'rip';
  const x = (e.clientX||r.left+r.width/2)-r.left;
  const y = (e.clientY||r.top+r.height/2)-r.top;
  span.style.left = x+'px'; span.style.top=y+'px';
  btn.appendChild(span);
  setTimeout(()=>span.remove(), 720);
}

function setupGlobalEffects(){
  document.addEventListener('click', e=>{
    const b = e.target.closest('.btn, .navbtn');
    if(b) createRipple(e,b);
  });
  let lastSpark = 0, lastTapT=0, lastTapX=0, lastTapY=0;
  document.addEventListener('pointerdown', e=>{
    const now = Date.now();
    if(now - lastSpark >= 90){
      lastSpark = now;
      emojiBurst(e.clientX, e.clientY, 1);
      spawnSpark(e.clientX, e.clientY, CONF[(Math.random()*CONF.length)|0], 22, 60);
    }
    const dx = Math.abs(e.clientX-lastTapX), dy = Math.abs(e.clientY-lastTapY);
    if(now - lastTapT < 350 && dx<42 && dy<42){
      doubleTapConfetti(e.clientX, e.clientY);
      lastTapT = 0;
    } else {
      lastTapT = now; lastTapX = e.clientX; lastTapY = e.clientY;
    }
  });
  document.addEventListener('dblclick', e=>doubleTapConfetti(e.clientX, e.clientY));
  document.addEventListener('click', e=>{
    const g = e.target.closest('[data-goto]');
    if(!g) return;
    if(!state.unlocked) return;
    const idx = parseInt(g.getAttribute('data-goto'), 10);
    if(!isNaN(idx)) goToSlide(idx);
  });
  $('#nextBtn').addEventListener('click', nextSlide);
  $('#prevBtn').addEventListener('click', prevSlide);
  document.addEventListener('keydown', e=>{
    if(!state.unlocked) return;
    const tag = (e.target.tagName||'').toLowerCase();
    if(tag==='input' || tag==='textarea') return;
    if(e.key==='ArrowRight') nextSlide();
    if(e.key==='ArrowLeft')  prevSlide();
  });

  // Swipe (touch)
  let tx=0, ty=0, swOk=false;
  const deck = $('#deck');
  deck.addEventListener('touchstart', e=>{
    if(e.target.closest('button,input,a,textarea,select,.cat,.fcat,.no-swipe,.scrolly')){ swOk=false; return; }
    swOk = true; tx = e.touches[0].clientX; ty = e.touches[0].clientY;
  }, { passive:true });
  deck.addEventListener('touchend', e=>{
    if(!swOk || !state.unlocked) return;
    const dx = e.changedTouches[0].clientX - tx;
    const dy = e.changedTouches[0].clientY - ty;
    if(Math.abs(dx)>60 && Math.abs(dx) > Math.abs(dy)*1.3){
      if(dx<0) nextSlide(); else prevSlide();
    }
  }, { passive:true });

  // Cloud drift speeds (we don't have clouds any more; we use sparkle orbs).
  // Orbs animation timing is pure CSS — nothing to sync here.
}

/* ---------- Build ambient particles ---------- */
function buildAmbient(){
  const bg = $('#bgLayer');
  if(!bg) return;
  // grid
  const grid = document.createElement('div');
  grid.className = 'grid-bg';
  bg.appendChild(grid);
  // orbs
  const orbs = [
    { w:340, h:340, x:-100+'px', y:'6%',  c:'radial-gradient(circle,#5b8cff,transparent 70%)', d:'0s'  },
    { w:400, h:400, x:'auto',   y:'28%', c:'radial-gradient(circle,#b16bff,transparent 70%)', d:'2s', r:true },
    { w:300, h:300, x:-80+'px', y:'auto', c:'radial-gradient(circle,#00e5ff,transparent 70%)', d:'4s', b:'6%' },
    { w:280, h:280, x:'auto',   y:'auto', c:'radial-gradient(circle,#ff5ccf,transparent 70%)', d:'6s', r:true, b:'-6%' }
  ];
  orbs.forEach(o=>{
    const d = document.createElement('div');
    d.className = 'orb';
    d.style.width = o.w+'px'; d.style.height = o.h+'px';
    if(o.x==='auto'){ d.style.right = '-100px'; } else { d.style.left = o.x; }
    if(o.b){ d.style.bottom = o.b; if(!o.y) d.style.top='auto'; } else { d.style.top = o.y||'0'; }
    d.style.background = o.c;
    d.style.animationDelay = o.d;
    bg.appendChild(d);
  });
  // little floating sparkle dots
  for(let i=0;i<16;i++){
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.style.left = (Math.random()*100)+'%';
    s.style.top  = (100+Math.random()*20)+'%';
    s.style.animationDelay = -(Math.random()*8)+'s';
    s.style.animationDuration = (6+Math.random()*6)+'s';
    const hue = ['#00e5ff','#5b8cff','#b16bff','#ff5ccf'][(Math.random()*4)|0];
    s.style.boxShadow = '0 0 10px 2px '+hue;
    s.style.background = '#fff';
    bg.appendChild(s);
  }
}

/* ---------- Init ---------- */
function gateInitState(){
  slides.forEach((s,i)=>{
    s.classList.toggle('active', i===0);
    s.classList.toggle('is-prev', false);
  });
  $('#prevBtn').classList.add('off');
  updateDots();
}

function init(){
  // set photo & media sources
  const photo = $('#memPhoto');
  if(photo) photo.src = CONFIG.PHOTO_URL;
  const introV = $('#introVideo');
  if(introV) introV.src = CONFIG.INTRO_VIDEO;
  const rvV = $('#rvVideo');
  if(rvV) rvV.src = CONFIG.REVEAL_VIDEO;
  const oldV = $('#oldVideo');
  if(oldV) oldV.src = CONFIG.OLD_VIDEO;
  const bgm = $('#bgm');
  if(bgm) bgm.src = CONFIG.TRACKS.main;

  buildAmbient();
  buildDots();
  gateInitState();
  setupGate();
  setupQuiz();
  setupCare();
  setupEnvelope();
  setupCandle();
  setupWish();
  setupCake();
  setupCats();
  setupMusic();
  setupGlobalEffects();
  setupFinale();
  setupGift();
  setupSections();
  setupOldVideo();
  refreshIcons();
}

document.addEventListener('DOMContentLoaded', init);
