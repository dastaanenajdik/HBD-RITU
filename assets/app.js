/* =========================================================
   HBD RITU RAZ — App script (optimized)
   ========================================================= */
'use strict';

/* ---------- Config (update these when needed) ---------- */
const CONFIG = {
  PHOTO_URL: 'mini.jpg',
  WA_NUMBER: '918942895173',
  WISH_HEADER: 'Birthday note for Bhai Ritu 🎉💙',
  PIN: '2609',
  TRACKS: {
    main:   'https://files.catbox.moe/sqj2kr.mp3',
    emotional: 'https://cdn.pixabay.com/download/audio/2021/11/25/audio_00fa5593f3.mp3?filename=lofi-chill-medium-version-159456.mp3',
    cat:    'https://files.catbox.moe/sl8ftn.mp3'
  },
  INTRO_VIDEO: 'https://files.catbox.moe/tc3ty8.mp4',
  REVEAL_VIDEO: 'https://files.catbox.moe/uc5t21.mp4',
  GIFTS: {
    hub:  'https://ifallgift.vercel.app/',
    sidify: 'https://sidify.vercel.app/',
    downloader: 'https://ifallertzia-downloader.vercel.app/',
    movies: 'https://new4.eonmovies.click/',
    tauntBuddy: 'https://github.com/dastaanenajdik/Tauntbuddy/releases/download/V1.0/app-release.apk'
  }
};

/* ---------- Data ---------- */
const CONF = ['#5a8dd2','#8e89d8','#e6927e','#e9b56c','#73ae98','#f3c6a9','#fffaf2'];
const NO_LINES = ['yaha nahi uppr click kr','nautanki mt kr sala','itna bhi fast nahi','kosis achchi thi'];

const PRESETS = [
  'Whenever I needed you, you stayed on the call with me. Thank you.',
  'You laugh at my worst jokes on purpose — I know that. Thank you.',
  'Thank you for telling me the straight truth, even when I do not want to hear it.',
  'Thank you for showing up every single time, without being asked.',
  'Thank you for those random calls that turned into the best therapy sessions.',
  'Thank you for the science, spirituality, and out-of-this-world conversations. I have so much fun having them with you; I do not have anyone else to talk to at that level. You are a genius.',
  'Thank you for being the brother I chose for myself — forever.',
  'Thank you for turning ordinary hangouts into stories we will laugh at for decades.'
];

const SIGNOFFS = [
  '— thank you, bhai 🤍',
  '— always rooting for you ✦',
  '— one call away 🤝',
  '— certified dosti moment',
  '— made with care'
];

const MEMORIES = [
  { t: 'The First Hello', d: 'The first “bhai” that started it all.', c: '#5a8dd2' },
  { t: 'The First Laugh', d: 'A small joke that made everything feel easy.', c: '#8e89d8' },
  { t: 'The Calls', d: '4 PM calls, late calls, science, relationships, and everything in the world.', c: '#73ae98' },
  { t: 'The Chaos', d: 'I messed things up once or twice in your life — but you still kept talking to me. Thank you for that.', c: '#e6927e' },
  { t: 'Today', d: 'It’s your day.. and look at us, here we are..', c: '#d39a6f' }
];

const CAT_LINES = {
  f1: [
    'May you get everything you deserve 🌊',
    'May your hustle never run out 🚀',
    'The cat says: full chill, no tension today 🤿',
    'A free birthday pass — nobody can complain today 😎'
  ],
  f2: [
    'May good people always find their way to you 💙',
    'May your laugh never get any quieter 😄',
    'This cat is dancing for you. Payment: one cold drink 💃',
    'The dance floor and cake are ready — you are late 😼',
    'Happy Birthday, Ritu! Today you are the king ✦'
  ]
};

const NOTE_GRADS = [
  'linear-gradient(135deg,#75a9dc,#6686c7)',
  'linear-gradient(135deg,#9a8fd2,#d18da0)',
  'linear-gradient(135deg,#78b39b,#679ac5)',
  'linear-gradient(135deg,#dda374,#d3869f)',
  'linear-gradient(135deg,#d68d9e,#9b88cb)'
];
const NOTE_ICONS = ['heart','sparkles','sun','star','zap'];

/* ---------- State ---------- */
const state = {
  currentSlide: 0,
  quizAnswered: false,
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

const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const slides = $$('.slide');
const TOTAL = slides.length;

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
  ['#rvVideo','#introVideo'].forEach(sel=>{
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
    case 6:
      runReveal();
      break;
    case 8:
      buildNotes();
      break;
    case 9:
      buildTimeline();
      break;
    case 10:
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
  const fillDigits = (text, start)=>{
    const digits = text.replace(/\D/g,'').slice(0, boxes.length-start);
    if(!digits) return;
    [...digits].forEach((digit,offset)=>{ boxes[start+offset].value = digit; });
    const next = boxes.findIndex((box,i)=>i>start+digits.length-1 && !box.value);
    if(next !== -1) boxes[next].focus();
    else if(boxes.every(box=>box.value)) unlockSite();
  };
  boxes.forEach((b,i)=>{
    b.addEventListener('input', ()=>{
      const digits = b.value.replace(/\D/g,'');
      if(!digits){ b.value=''; return; }
      fillDigits(digits, i);
    });
    b.addEventListener('paste', e=>{
      e.preventDefault();
      fillDigits(e.clipboardData ? e.clipboardData.getData('text') : '', i);
    });
    b.addEventListener('keydown', e=>{
      if(e.key==='Backspace' && !b.value && i>0){
        e.preventDefault();
        boxes[i-1].value='';
        boxes[i-1].focus();
      }
      if(e.key==='Enter') unlockSite();
    });
  });
  $('#unlockBtn').addEventListener('click', unlockSite);
  setTimeout(()=>{ if(!state.unlocked && boxes[0]) boxes[0].focus(); }, 400);
}
function unlockSite(){
  if(state.unlocked) return;
  const pin = $$('.pin-box').map(b=>b.value).join('');
  const card = $('#gateCard');
  if(pin === CONFIG.PIN){
    state.unlocked = true;
    sparkleAt(card);
    createConfetti({ particleCount:70, spread:80, origin:{ y:.5 }, scalar:.9 });
    showToast('Unlocked! Welcome in, bhai 💙','#5a8dd2');
    $('#gate').classList.add('gate-out');
    document.body.classList.add('unlocked');
    setTimeout(()=>{ const g=$('#gate'); if(g) g.style.display='none'; }, 850);
    setTimeout(playIntroVideo, 700);
    sparkleAt(window.innerWidth/2, window.innerHeight/2.6);
  } else {
    card.classList.remove('shake-anim'); void card.offsetWidth; card.classList.add('shake-anim');
    showToast('That PIN was not quite right 🙈 Hint: 26 • 09','#e6927e');
    $$('.pin-box').forEach(b=>b.value='');
    const first = $('.pin-box'); if(first) first.focus();
  }
}

/* ---------- YES / NO ---------- */
function setupQuiz(){
  const yes = $('#yesBtn'), no = $('#noBtn');
  if(!yes||!no) return;
  yes.addEventListener('click', ()=>{
    if(state.quizAnswered) return;
    state.quizAnswered = true;
    createConfetti({ particleCount:70, spread:75, origin:{ y:.55 }, scalar:.9 });
    sparkleAt(yes);
    showToast('That is the right answer — let’s go 😎💙','#5a8dd2');
    no.classList.add('dead'); yes.disabled = true;
    const qn = $('#quizNext');
    if(qn){ qn.style.display='inline-flex'; qn.style.animation='cardPop .7s var(--ease-spring) both'; refreshIcons(); }
  });

  // Every tap on NO writes the next line, and nothing else.
  let noHits = 0;
  const msg = $('#noMsg');
  no.addEventListener('click', e=>{
    if(state.quizAnswered) return;
    e.preventDefault();
    if(msg && noHits < NO_LINES.length){
      if(noHits === 0) msg.textContent = '';
      const row = document.createElement('span');
      row.className = 'no-line';
      row.textContent = NO_LINES[noHits];
      msg.appendChild(row);
    }
    noHits++;
    const r = no.getBoundingClientRect();
    spawnSpark(r.left+r.width/2, r.top+r.height/2, CONF[4], 10, 34);
    no.classList.remove('no-hit'); void no.offsetWidth; no.classList.add('no-hit');
  });
}

/* ---------- Envelope ---------- */
function setupEnvelope(){
  const scene = $('#envScene'), env = $('#env');
  if(!scene||!env) return;
  const openEnvelope = ()=>{
    if(state.envOpened) return;
    state.envOpened = true;
    scene.classList.add('open');
    sparkleAt(env);
    playOverlay('emotional');
    state.enterTimers.push(setTimeout(()=>scene.classList.add('gone'), 1350));
    state.enterTimers.push(setTimeout(()=>{ $('#letterPanel').classList.add('show'); refreshIcons(); }, 1680));
    state.enterTimers.push(setTimeout(()=>showToast('A memory worth keeping 💙','#8e89d8'), 1950));
  };
  env.addEventListener('click', openEnvelope);
  env.addEventListener('keydown', e=>{
    if(e.key==='Enter' || e.key===' '){ e.preventDefault(); openEnvelope(); }
  });
}

/* ---------- Candle ---------- */
function setupCandle(){
  const c = $('#candleEl');
  if(!c) return;
  const lightCandle = ()=>{
    c.classList.add('wow');
    const glow = $('#warmGlow'); glow.style.opacity='1';
    setTimeout(()=>glow.style.opacity='0', 2200);
    sparkleAt(c);
    if(!state.candleLit){
      state.candleLit = true;
      showToast('The candle is glowing — make your wish 🕯️✨','#e9b56c');
      createConfetti({ particleCount:28, spread:50, origin:{ y:.4 }, scalar:.7 });
    } else {
      showToast('A little more light, a little more joy ✨','#5a8dd2');
    }
  };
  c.addEventListener('click', lightCandle);
  c.addEventListener('keydown', e=>{
    if(e.key==='Enter' || e.key===' '){ e.preventDefault(); lightCandle(); }
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
      showToast('Wish locked in 💫💙','#5a8dd2');
    } else {
      showToast('One wish per birthday, bhai 😭💙','#e6927e');
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
    showToast('Clean cut — cake is ready to share 🍰','#e6927e');
    const cont = $('#cakeContinue');
    cont.style.display='inline-flex';
    cont.style.animation='cardPop .7s var(--ease-spring) both';
    refreshIcons();
  }
  $('#cakeContinue').addEventListener('click', ()=>goToSlide(6));
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

/* ---------- 26 September sections ---------- */
const DAY_SECTIONS = {
  imp: {
    title:'Important*', sub:'26 September — the part that matters the most', color:'#4f86cf', icon:'sparkles',
    items:[
      ['You landed on this day 😓😂']
    ]
  },
  ind: {
    title:'Indian History', sub:'26 September — moments from India', color:'#5a8dd2', icon:'landmark',
    items:[
      ['1919 — Rotary’s first meeting','The first meeting of India’s first Rotary club took place in Calcutta; the club was chartered in 1920.'],
      ['1932 — Gandhi ends his fast','Mahatma Gandhi ended a six-day fast after the Poona Pact was accepted by the British government.'],
      ['1998 — Sachin’s ODI record','Sachin Tendulkar scored 127 not out against Zimbabwe for his 18th ODI century — a world record at the time.']
    ]
  },
  indcel:{
    title:'Indian Celebs', sub:'Indian personalities born on 26 September', color:'#e9b56c', icon:'star',
    items:[
      ['Ishwar Chandra Vidyasagar (1820)','Teacher and social reformer who championed women’s education and widow remarriage.'],
      ['Dev Anand (1923)','Evergreen Hindi film actor, filmmaker and producer.'],
      ['Dr Manmohan Singh (1932)','Economist and former Prime Minister of India (2004–2014).'],
      ['Archana Puran Singh (1962)','Indian actor and popular television personality.'],
      ['Chunky Pandey (1962)','Hindi film actor known for his comic roles as well.']
    ]
  },
  days:{
    title:'International Days', sub:'What the world observes on 26 September', color:'#8e89d8', icon:'globe-2',
    items:[
      ['International Day for the Total Elimination of Nuclear Weapons','A UN awareness day calling for a world without nuclear weapons.'],
      ['European Day of Languages','A celebration of language diversity and learning something new.'],
      ['World Environmental Health Day','A reminder that clean air, clean water and a healthy environment matter.'],
      ['World Contraception Day','A day for better information about family planning and sexual health.']
    ]
  },
  world:{
    title:'World History', sub:'A few things that happened on 26 September', color:'#73ae98', icon:'history',
    items:[
      ['1580 — Drake completes his voyage','Francis Drake returned to Plymouth after completing a circumnavigation of the world.'],
      ['1687 — The Parthenon is damaged','An explosion during a Venetian attack caused major damage to the Parthenon in Athens.'],
      ['1960 — The first televised debate','John F Kennedy and Richard Nixon took part in America’s first televised presidential debate.'],
      ['1983 — A nuclear false alarm','Soviet officer Stanislav Petrov judged a missile warning to be a false alarm — and was right.']
    ]
  },
  intcel:{
    title:'International Celebs', sub:'People around the world born on 26 September', color:'#d783a7', icon:'cake',
    items:[
      ['T S Eliot (1888)','Poet and winner of the 1948 Nobel Prize in Literature.'],
      ['George Gershwin (1898)','American composer and creator of Rhapsody in Blue.'],
      ['Olivia Newton-John (1948)','Singer and star of Grease.'],
      ['Linda Hamilton (1956)','Actor who played Sarah Connor in The Terminator films.'],
      ['Serena Williams (1981)','Tennis legend and winner of 23 Grand Slam singles titles.']
    ]
  }
};

function setupSections(){
  const modal = $('#secModal'); if(!modal) return;
  const hide = ()=>{ modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); };
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
        row.appendChild(b);
        if(txt){ const s = document.createElement('span'); s.textContent=txt; row.appendChild(s); }
        body.appendChild(row);
      });
      modal.classList.add('show');
      modal.setAttribute('aria-hidden','false');
      refreshIcons();
    });
  });
  $('#secClose').addEventListener('click', hide);
  modal.addEventListener('click', e=>{ if(e.target===modal) hide(); });
}

/* ---------- Gift bridge ---------- */
function setupGift(){
  const bridge = $('#giftBridge');
  const open = $('#giftBridgeBtn');
  const go = $('#gbOpen');
  const close = $('#gbClose');
  const sid = $('#sidifyBtn');
  const down = $('#downloaderBtn');
  const mov = $('#moviesBtn');
  const app = $('#gift5Btn');

  if(open) open.addEventListener('click', ()=>{
    if(!bridge) return;
    bridge.classList.add('show');
    bridge.setAttribute('aria-hidden','false');
    createConfetti({ particleCount:50, spread:80, origin:{ y:.5 }, scalar:.8 });
    refreshIcons();
  });
  if(bridge){
    const hide = ()=>{ bridge.classList.remove('show'); bridge.setAttribute('aria-hidden','true'); };
    if(close) close.addEventListener('click', hide);
    bridge.addEventListener('click', e=>{ if(e.target===bridge) hide(); });
  }
  if(go) go.addEventListener('click', ()=>{ showToast('Opening the Website Hub — enjoy it 🎁💙','#5a8dd2'); bigConfetti(); });
  if(sid) sid.addEventListener('click', ()=>{ showToast('Opening Sidify 🎁💙','#8e89d8'); bigConfetti(); });
  if(down) down.addEventListener('click', ()=>{ showToast('Opening the downloader 🎬💙','#73ae98'); bigConfetti(); });
  if(mov) mov.addEventListener('click', ()=>{ showToast('Opening Movies 🍿💙','#e6927e'); bigConfetti(); });
  if(app) app.addEventListener('click', ()=>{ showToast('Your direct APK download is starting 📥','#73ae98'); sparkleAt(app); });
}

/* ---------- Finale / wish send ---------- */
function setupFinale(){
  const send = $('#wishSendBtn');
  if(send) send.addEventListener('click', ()=>{
    const el = $('#wishMsg');
    const v = ((el&&el.value)||'').trim();
    if(!v){ showToast('Write something first 😅','#e9b56c'); if(el) el.focus(); return; }
    const text = encodeURIComponent(CONFIG.WISH_HEADER + '\n\n' + v);
    openExternal('https://wa.me/'+CONFIG.WA_NUMBER+'?text='+text);
    showToast('Opening WhatsApp — do not forget to send it 💚','#73ae98');
    createConfetti({ particleCount:50, spread:70, origin:{ y:.62 }, scalar:.8 });
  });
  const cel = $('#celebrateBtn');
  if(cel) cel.addEventListener('click', ()=>{ bigConfetti(); sparkleAt(cel); showToast('The party never ends 🎉💙','#5a8dd2'); });
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
  let finished = false, loadingTimeout;
  const finish = ()=>{
    if(finished) return; finished=true;
    clearTimeout(loadingTimeout);
    vid.removeEventListener('playing', showIntro);
    vid.removeEventListener('waiting', watchLoading);
    vid.removeEventListener('stalled', watchLoading);
    try{ vid.pause(); }catch(_){}
    box.classList.add('bye');
    setTimeout(()=>{ box.classList.remove('show','bye'); box.style.display='none'; attemptMusic(); }, 720);
  };
  const watchLoading = ()=>{
    clearTimeout(loadingTimeout);
    loadingTimeout = setTimeout(finish, 5000);
  };
  const showIntro = ()=>{
    if(finished) return;
    clearTimeout(loadingTimeout);
    box.classList.add('show');
  };
  vid.addEventListener('playing', showIntro);
  vid.addEventListener('waiting', watchLoading);
  vid.addEventListener('stalled', watchLoading);
  vid.addEventListener('ended', finish, { once:true });
  vid.addEventListener('error', finish, { once:true });
  const skip = $('#ivSkip');
  if(skip) skip.addEventListener('click', finish, { once:true });
  watchLoading();
  vid.currentTime=0; vid.muted=false; vid.volume=1;
  const p = vid.play();
  if(p && p.catch) p.catch(()=>{
    if(finished) return;
    vid.muted=true;
    const q=vid.play(); if(q&&q.catch) q.catch(finish);
  });
}
function toggleMusic(){
  if(!audio) return;
  if(overlayKey){ stopOverlay(false); mainWasPlaying=false; return; }
  if(audio.dataset.dead === 'true'){ showToast('Music is not available right now 🥲','#e6927e'); return; }
  audio.volume = 0.5;
  if(audio.paused){
    const p = audio.play();
    if(p && p.catch) p.catch(()=>showToast('The browser paused the music — tap once more 🎵','#e9b56c'));
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
    showToast('Music could not be loaded 🥲','#e6927e');
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

  // The clouds drift entirely in CSS, so there is no animation loop to maintain here.
}

/* ---------- Build the moving sky ---------- */
function buildAmbient(){
  const bg = $('#bgLayer');
  if(!bg) return;
  // The first four clouds are in the markup so the sky paints immediately.
  // Add one slower, distant cloud for larger screens without making the scene busy.
  if(!bg.querySelector('.cloud-five')){
    const cloud = document.createElement('div');
    cloud.className = 'cloud cloud-five';
    cloud.style.cssText = 'top:43%;left:-45%;transform:scale(.42);opacity:.28;animation:cloudAcross 132s linear 26s infinite';
    bg.appendChild(cloud);
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
  const bgm = $('#bgm');
  if(bgm) bgm.src = CONFIG.TRACKS.main;

  buildAmbient();
  buildDots();
  gateInitState();
  setupGate();
  setupQuiz();
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
  refreshIcons();
}

document.addEventListener('DOMContentLoaded', init);
