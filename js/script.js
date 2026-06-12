/* LOADER */
const __hideLoader=()=>{const l=document.getElementById('loader');if(l)l.classList.add('done');};
window.addEventListener('load',()=>setTimeout(__hideLoader,600));
document.addEventListener('DOMContentLoaded',()=>setTimeout(__hideLoader,1200));
setTimeout(__hideLoader,1800);

/* CURSOR */
const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
(function loop(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
document.querySelectorAll('a,button,.chip,.ttag,.stat-card,.cert').forEach(el=>{
  el.addEventListener('mouseenter',()=>ring.classList.add('hovering'));
  el.addEventListener('mouseleave',()=>ring.classList.remove('hovering'));
});

/* 3D PARTICLES */
const cv=document.getElementById('bg3d'),ctx=cv.getContext('2d');
let W,H,parts=[],FOV=320,mouseX=0,mouseY=0;
function resize(){W=cv.width=innerWidth;H=cv.height=innerHeight;}
resize();addEventListener('resize',resize);
addEventListener('mousemove',e=>{mouseX=(e.clientX/W-.5)*2;mouseY=(e.clientY/H-.5)*2;});
const N=Math.min(130,Math.floor(innerWidth/10));
for(let i=0;i<N;i++)parts.push({x:(Math.random()-.5)*W*1.4,y:(Math.random()-.5)*H*1.4,z:Math.random()*900+60,vz:.4+Math.random()*.7,hue:Math.random()<.5?243:200});
function draw(){
  ctx.clearRect(0,0,W,H);
  const pts=[];
  for(const p of parts){
    p.z-=p.vz;
    if(p.z<40){p.z=960;p.x=(Math.random()-.5)*W*1.4;p.y=(Math.random()-.5)*H*1.4;}
    const s=FOV/p.z;
    const sx=W/2+(p.x+mouseX*180)*s*0.9;
    const sy=H/2+(p.y+mouseY*180)*s*0.9;
    if(sx<-60||sx>W+60||sy<-60||sy>H+60)continue;
    const r=Math.max(.4,2.4*s),a=Math.min(.55,.9-p.z/1100);
    ctx.beginPath();ctx.arc(sx,sy,r,0,7);
    ctx.fillStyle=`hsla(${p.hue},75%,58%,${a})`;ctx.fill();
    pts.push({sx,sy});
  }
  for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
    const dx=pts[i].sx-pts[j].sx,dy=pts[i].sy-pts[j].sy,d=dx*dx+dy*dy;
    if(d<11000){ctx.beginPath();ctx.moveTo(pts[i].sx,pts[i].sy);ctx.lineTo(pts[j].sx,pts[j].sy);
      ctx.strokeStyle=`rgba(120,118,240,${.12*(1-d/11000)})`;ctx.lineWidth=.7;ctx.stroke();}
  }
  requestAnimationFrame(draw);
}
draw();

/* NAV */
const nav=document.getElementById('nav');
addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',scrollY>40);
  document.getElementById('toTop').classList.toggle('show',scrollY>600);
});
document.getElementById('toTop').onclick=()=>scrollTo({top:0,behavior:'smooth'});
const burger=document.getElementById('burger'),links=document.getElementById('navLinks');
burger.onclick=()=>links.classList.toggle('open');
links.querySelectorAll('a').forEach(a=>a.onclick=()=>links.classList.remove('open'));

/* TYPING — student roles */
const roles=['3rd Year B.Tech CSE Student 🎓','Data Science Learner 📊','Aspiring AI / ML Engineer 🤖','Curious Problem Solver ⚡','Exploring My Path in Tech 🌱'];
const typedEl=document.getElementById('typed');
let ri=0,ci=0,del=false;
(function type(){
  const w=roles[ri];
  typedEl.textContent=w.slice(0,ci);
  if(!del&&ci<w.length){ci++;setTimeout(type,65);}
  else if(!del){del=true;setTimeout(type,1700);}
  else if(ci>0){ci--;setTimeout(type,32);}
  else{del=false;ri=(ri+1)%roles.length;setTimeout(type,350);}
})();

/* ===== VOICE: AUTO-PLAY ON OPEN + MUTE ===== */
const voiceCtl=document.getElementById('voiceCtl');
const vicIcon=document.getElementById('vicIcon'),vicTxt=document.getElementById('vicTxt');
const introText=`Hello! Welcome to my portfolio. I'm Bonugu Sai Kiran Manideep, a third year B.Tech Computer Science student specialising in Data Science at Vignan Institute of Information Technology, Visakhapatnam. I'm still a student exploring my path in technology, learning machine learning, data analytics and web development through hands-on projects. I've built TrustLink, a networking web platform. GreenCrop, a machine learning model that predicts crop yields. And a sales analytics dashboard in Power B I. I also enjoy competitive programming, with over 30 contests on CodeChef, LeetCode and HackerRank. I'm looking for an internship where I can learn from real engineers and grow. Thanks for visiting, and feel free to explore my work!`;
let muted=false,autoTried=false,spokenOnce=false;
function setUI(state){
  if(state==='speaking'){voiceCtl.classList.add('speaking');vicIcon.textContent='🔊';vicTxt.textContent='Playing… tap to mute';}
  else if(state==='muted'){voiceCtl.classList.remove('speaking');vicIcon.textContent='🔇';vicTxt.textContent='Muted · tap to play';}
  else{voiceCtl.classList.remove('speaking');vicIcon.textContent='🔊';vicTxt.textContent='Play my intro';}
}
function speakIntro(){
  if(!('speechSynthesis' in window)||muted)return;
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(introText);
  u.rate=.97;u.pitch=1;
  const vs=speechSynthesis.getVoices();
  const v=vs.find(v=>/en-IN/i.test(v.lang))||vs.find(v=>/en/i.test(v.lang));
  if(v)u.voice=v;
  u.onstart=()=>{spokenOnce=true;setUI('speaking');};
  u.onend=()=>setUI('idle');
  u.onerror=()=>setUI('idle');
  speechSynthesis.speak(u);
}
voiceCtl.onclick=()=>{
  if(speechSynthesis.speaking&&!muted){muted=true;speechSynthesis.cancel();setUI('muted');}
  else{muted=false;speakIntro();}
};
/* try autoplay on load */
window.addEventListener('load',()=>{setTimeout(()=>{autoTried=true;speakIntro();},1400);});
/* browsers often block audio before first interaction — start on first gesture */
['click','touchstart','keydown','scroll'].forEach(ev=>{
  addEventListener(ev,function once(){
    if(!spokenOnce&&!muted&&!speechSynthesis.speaking)speakIntro();
    removeEventListener(ev,once);
  },{passive:true});
});
if('speechSynthesis' in window){speechSynthesis.getVoices();speechSynthesis.onvoiceschanged=()=>speechSynthesis.getVoices();}

/* SCROLL REVEAL + COUNTERS + BARS */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){
    e.target.classList.add('in');
    e.target.querySelectorAll('.bar-fill').forEach(b=>b.style.width=b.dataset.w);
    e.target.querySelectorAll('.count').forEach(c=>{
      if(c.dataset.done)return;c.dataset.done=1;
      const to=parseFloat(c.dataset.to),dec=+(c.dataset.dec||0),t0=performance.now();
      (function tick(t){const p=Math.min(1,(t-t0)/1600),e2=1-Math.pow(1-p,3);
        c.textContent=(to*e2).toFixed(dec);if(p<1)requestAnimationFrame(tick);})(t0);
    });
    io.unobserve(e.target);
  }
}),{threshold:.18});
document.querySelectorAll('.reveal,.skill-card,.about-card').forEach(el=>io.observe(el));

/* TILT */
document.querySelectorAll('.tilt').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
    card.style.transform=`rotateY(${(px-.5)*14}deg) rotateX(${(.5-py)*10}deg) scale(1.02)`;
    card.style.setProperty('--mx',px*100+'%');card.style.setProperty('--my',py*100+'%');
  });
  card.addEventListener('mouseleave',()=>card.style.transform='');
});
/* avatar parallax */
const stage=document.getElementById('avatarStage');
document.querySelector('.hero').addEventListener('mousemove',e=>{
  const cx=innerWidth/2,cy=innerHeight/2;
  stage.style.transform=`rotateY(${(e.clientX-cx)/60}deg) rotateX(${(cy-e.clientY)/60}deg)`;
});

/* ===== PROJECT CAROUSEL ===== */
const track=document.getElementById('carTrack');
const slides=track.children.length;
let cur=0,timer,prog=0,progTimer;
const dotsWrap=document.getElementById('carDots');
for(let i=0;i<slides;i++){
  const d=document.createElement('button');d.className='cdot'+(i===0?' on':'');
  d.onclick=()=>{goTo(i);resetAuto();};
  dotsWrap.appendChild(d);
}
const progBar=document.getElementById('carProg');
function goTo(i){
  cur=(i+slides)%slides;
  track.style.transform=`translateX(-${cur*100}%)`;
  dotsWrap.querySelectorAll('.cdot').forEach((d,j)=>d.classList.toggle('on',j===cur));
  prog=0;
}
document.getElementById('carNext').onclick=()=>{goTo(cur+1);resetAuto();};
document.getElementById('carPrev').onclick=()=>{goTo(cur-1);resetAuto();};
function startAuto(){
  clearInterval(progTimer);
  progTimer=setInterval(()=>{
    prog+=100/(6000/50);
    if(prog>=100){goTo(cur+1);prog=0;}
    progBar.style.width=prog+'%';
  },50);
}
function resetAuto(){prog=0;startAuto();}
startAuto();
/* pause on hover */
const carEl=document.getElementById('carousel');
carEl.addEventListener('mouseenter',()=>clearInterval(progTimer));
carEl.addEventListener('mouseleave',startAuto);
/* swipe support */
let tx0=null;
carEl.addEventListener('touchstart',e=>tx0=e.touches[0].clientX,{passive:true});
carEl.addEventListener('touchend',e=>{
  if(tx0===null)return;
  const dx=e.changedTouches[0].clientX-tx0;
  if(Math.abs(dx)>50)goTo(cur+(dx<0?1:-1));
  tx0=null;resetAuto();
},{passive:true});

/* ===== PROJECT MODAL ===== */
const projData=[
 {role:'Full-Stack Web Platform',title:'TrustLink — Verified Networking',
  desc:'<p>TrustLink is a <b>full-stack web platform for verified professional networking</b>. Users create trust-scored profiles, establish peer connections, and validate credentials through a structured authentication system.</p><p>I architected a <b>RESTful Flask backend</b> with session-based authentication, user registration and profile management modules, with secure data storage in SQLite. The frontend is fully responsive — HTML5, CSS3 and JavaScript with dynamic content rendering and mobile-optimised layouts.</p>',
  metrics:['🔐 JWT Auth + PostgreSQL','🤖 AI OCR + Face Match','🔳 Signed QR Reports'],
  tags:['Python','Flask','REST APIs','SQLite','JavaScript','HTML5','CSS3'],
  link:'https://github.com/MANIDEEP-2006/trustlink_landing',live:'https://manideep-2006.github.io/trustlink_landing/'},
 {role:'Machine Learning Pipeline',title:'GreenCrop — Crop Yield Prediction',
  desc:'<p>GreenCrop is an <b>end-to-end machine learning pipeline</b> for crop yield prediction, trained on 10,000+ row agricultural datasets using <b>Random Forest and Linear Regression</b> via Scikit-learn.</p><p>Through systematic feature engineering, normalization and hyperparameter tuning, I improved model accuracy by <b>~18%</b>, validating performance with RMSE and R² metrics. The pipeline includes thorough preprocessing — missing-value imputation, outlier treatment and feature scaling.</p>',
  metrics:['📈 +18% Model Accuracy','🗄️ 10,000+ Rows','🧪 RMSE & R² Validated'],
  tags:['Python','Scikit-learn','Pandas','NumPy','Matplotlib','Seaborn'],
  link:'https://github.com/MANIDEEP-2006/green-crop-yeild-detection'},
 {role:'Business Intelligence',title:'Sales Analytics Dashboard',
  desc:'<p>An <b>interactive multi-page Power BI dashboard</b> tracking revenue trends, regional KPIs and sales performance across <b>5+ integrated business data sources</b>.</p><p>I cleaned and transformed raw data using Excel Power Query and custom <b>DAX measures</b>, reducing manual reporting effort by <b>~40%</b>. The dashboard delivers bar, line and funnel visuals plus dynamic KPI cards with period-over-period comparisons for data-driven decisions.</p>',
  metrics:['⚡ −40% Reporting Effort','🔗 5+ Data Sources','📊 Dynamic KPI Cards'],
  tags:['Power BI','DAX','Power Query','Excel','KPI Design'],
  link:'https://github.com/MANIDEEP-2006/business-sales-dashboard'}
];
const pmodal=document.getElementById('pmodal');
const mImgs=[];
document.querySelectorAll('.pcard .pimg img').forEach(im=>mImgs.push(im.src));
function openModal(i){
  const p=projData[i];
  document.getElementById('mImg').src=mImgs[i];
  document.getElementById('mRole').textContent=p.role;
  document.getElementById('mTitle').textContent=p.title;
  document.getElementById('mDesc').innerHTML=p.desc;
  document.getElementById('mMetrics').innerHTML=p.metrics.map(m=>`<span class="metric">${m}</span>`).join('');
  document.getElementById('mTags').innerHTML=p.tags.map(t=>`<span class="ttag">${t}</span>`).join('');
  document.getElementById('mLink').href=p.link;
  let lb=document.getElementById('mLive');
  if(!lb){lb=document.createElement('a');lb.id='mLive';lb.className='pop-btn';lb.target='_blank';lb.style.cssText='text-decoration:none;margin-left:12px;background:linear-gradient(120deg,#10b981,#0ea5e9);';lb.textContent='🌐 Live Demo';document.getElementById('mLink').after(lb);}
  lb.style.display=p.live?'inline-flex':'none';
  if(p.live)lb.href=p.live;
  pmodal.classList.add('open');
  document.body.style.overflow='hidden';
  clearInterval(progTimer);
}
function closeModal(){pmodal.classList.remove('open');document.body.style.overflow='';startAuto();}
document.querySelectorAll('.pop-btn[data-proj]').forEach(b=>b.onclick=()=>openModal(+b.dataset.proj));
document.getElementById('mClose').onclick=closeModal;
document.getElementById('mBackdrop').onclick=closeModal;
addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

/* marquee loop */
const mq=document.getElementById('mq');mq.innerHTML+=mq.innerHTML;
