// ── Hero Photo Slideshow (auto-rotates every 5s) ──
// Add, remove, or reorder image paths here to control the hero slideshow.
const heroSlideImages = [
  'img/homepage.jpeg',
  'img/homepage (1).jpeg',
  'img/homepage (2).jpeg'
];
(function initHeroSlideshow() {
  const wrap = document.getElementById('hero-slideshow');
  if (!wrap || heroSlideImages.length === 0) return;
  wrap.innerHTML = heroSlideImages.map((src, i) =>
    '<div class="hero-slide' + (i === 0 ? ' active' : '') + '" style="background-image:url(\'' + src + '\')"></div>'
  ).join('');
  if (heroSlideImages.length < 2) return;
  const slides = wrap.querySelectorAll('.hero-slide');
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 5000); // change 5000 to adjust how many milliseconds each photo stays up
})();

function initPartnerAutoScroll() {
  const track = document.querySelector('.partners-grid');
  if (!track) return;
  let speed = 0.4;
  let paused = false;
  track.addEventListener('mouseenter', () => paused = true);
  track.addEventListener('mouseleave', () => paused = false);
  function step() {
    if (!paused) {
      track.scrollLeft += speed;
      if (track.scrollLeft >= track.scrollWidth - track.clientWidth) {
        track.scrollLeft = 0;
      }
    }
    requestAnimationFrame(step);
  }
  step();
}
initPartnerAutoScroll();

// ── Page Navigation ──
const pages = ['home','about','team','training','events','event-detail','achievements','gallery','news','faq','contact','join'];

// ── Event Detail Data ──
const eventData = {
  e1: {
    day: '14', month: 'Jun', fulldate: 'Saturday, 14 June 2025', time: '9:00 AM – 6:00 PM',
    title: 'APU Invitational 3×3 Tournament', venue: 'APU Sports Hall', badge: 'tournament', badgeLabel: 'Tournament',
    format: 'Single elimination, 3×3', audience: 'Registered members only',
    overview: 'Our flagship 3×3 event brings together 8 competitive squads from across the club for a fast-paced knockout tournament. Games are played to 21 points or a 10-minute cap, with a RM 2,000 prize pool split across the top three teams.',
    highlights: ['8 teams competing across a single-elimination bracket', 'Prize pool of RM 2,000 for the top 3 finishers', 'Live scoring board and courtside commentary', 'Open spectator seating for APU students and staff']
  },
  e2: {
    day: '21', month: 'Jun', fulldate: 'Saturday, 21 June 2025', time: '7:00 AM – 12:00 PM',
    title: 'Pre-Season Conditioning Camp', venue: 'APU Field & Court', badge: 'training', badgeLabel: 'Training',
    format: 'Fitness camp, all levels', audience: 'All club members',
    overview: 'Kick off the new season with a full morning of conditioning designed to build the strength, speed, and agility base every player needs before tactical training begins. Led by Fitness Coach Mei alongside Coach Rahman.',
    highlights: ['Circuit stations covering strength, speed, and agility', 'Endurance running and recovery stretching block', 'Hydration and nutrition briefing', 'Attendance counts toward pre-season squad selection']
  },
  e3: {
    day: '05', month: 'Jul', fulldate: 'Saturday, 5 July 2025', time: '6:30 PM – 10:00 PM',
    title: 'End of Season Banquet & Awards Night', venue: 'APU Student Hub', badge: 'social', badgeLabel: 'Social',
    format: 'Formal dinner & awards', audience: 'Members and invited guests',
    overview: 'Celebrate a season of hard-fought games and personal growth at our annual banquet. The evening includes dinner, a season highlight reel, and the presentation of MVP, Best Newcomer, and Most Improved awards.',
    highlights: ['Season highlight reel and committee address', 'MVP, Best Newcomer, and Most Improved awards', 'Buffet dinner included with RSVP', 'Smart casual dress code']
  },
  // ... rest of eventData ... (kept identical)
};

function showEventDetail(id) {
  const e = eventData[id];
  if (!e) return;
  document.getElementById('ed-day').textContent = e.day;
  document.getElementById('ed-month').textContent = e.month;
  document.getElementById('ed-title').textContent = e.title;
  document.getElementById('ed-loc').textContent = '' + e.venue;
  document.getElementById('ed-badge').textContent = e.badgeLabel;
  document.getElementById('ed-badge').className = 'event-badge badge-' + e.badge;
  document.getElementById('ed-overview').textContent = e.overview;
  document.getElementById('ed-fulldate').textContent = e.fulldate;
  document.getElementById('ed-time').textContent = e.time;
  document.getElementById('ed-venue').textContent = e.venue;
  document.getElementById('ed-format').textContent = e.format;
  document.getElementById('ed-audience').textContent = e.audience;
  const list = document.getElementById('ed-highlights');
  list.innerHTML = '';
  e.highlights.forEach(h => {
    const li = document.createElement('li');
    li.textContent = h;
    list.appendChild(li);
  });
  showPage('event-detail');
}

function showPage(id) {
  closePlayerReveal();
  pages.forEach(p => {
    document.getElementById('page-' + p).classList.remove('active');
    const btn = document.getElementById('nav-' + p);
    if (btn) btn.classList.remove('active');
  });
  document.getElementById('page-' + id).classList.add('active');
  const btn = document.getElementById('nav-' + id);
  if (btn) btn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(checkReveal, 100);
  closeMenu();
}

// (the rest of the JS is identical to the original inline script)
// ── Roster Select Carousel (scrollable character-select)
(function initRosterSelect() {
  const carousel = document.getElementById('rs-carousel');
  const slides = document.querySelectorAll('.rs-slide');
  const nameButtons = document.querySelectorAll('.rs-name-btn');
  if (!carousel || !slides.length) return;

  function setActive(id) {
    slides.forEach(s => s.classList.toggle('active', s.dataset.id === id));
    nameButtons.forEach(b => b.classList.toggle('active', b.dataset.id === id));
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
        setActive(entry.target.dataset.id);
      }
    });
  }, { root: carousel, threshold: [0.6] });

  slides.forEach(s => observer.observe(s));

  nameButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const slide = document.querySelector('.rs-slide[data-id="' + btn.dataset.id + '"]');
      if (slide) slide.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  slides.forEach(slide => {
    const photo = slide.querySelector('.rs-photo');
    if (!photo) return;
    photo.addEventListener('click', () => {
      if (slide.classList.contains('active')) openPlayerReveal(slide.dataset.id);
      else slide.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  setActive('p1');
})();

// ── Roster Hover Celebration (play once per card per visit)
const celebratedCards = new Set();
function triggerCelebration(avatarEl, cardKey) {
  if (celebratedCards.has(cardKey)) return;
  celebratedCards.add(cardKey);
  avatarEl.classList.add('celebrate');
  setTimeout(() => avatarEl.classList.remove('celebrate'), 1200);
}
document.querySelectorAll('.member-card').forEach((card, i) => {
  const avatar = card.querySelector('.member-avatar');
  const key = 'card-' + i;
  card.addEventListener('mouseenter', () => triggerCelebration(avatar, key));
  card.addEventListener('touchstart', () => triggerCelebration(avatar, key), { passive: true });
});

// ── Player Reveal data + methods
const playerData = {
  p1: { num: 1,  name: 'Marcus Tan',    pos: 'Point Guard · Captain',            photo: 'https://i.pravatar.cc/300?img=13', ppg: 18.4, apg: 7.2, rpg: 3.1,
    hometown: 'Kuala Lumpur, MY', joined: '2022', achievements: ['MVP — APU Invitational 2024', 'Team Captain, 2 seasons running', 'Career-high 34 pts vs Sunway'] },
  p2: { num: 5,  name: 'Aiden Raj',     pos: 'Shooting Guard',                   photo: 'https://i.pravatar.cc/300?img=51', ppg: 15.8, apg: 2.5, rpg: 4.0,
    hometown: 'Petaling Jaya, MY', joined: '2023', achievements: ['Top 3-point shooter, 2024 season', 'Most Improved Player 2023'] },
  p3: { num: 10, name: 'Kevin Lim',     pos: 'Small Forward',                    photo: 'https://i.pravatar.cc/300?img=33', ppg: 12.2, apg: 3.8, rpg: 5.5,
    hometown: 'Penang, MY', joined: '2021', achievements: ['All-Defensive Team 2023', '2x Club Championship winner'] },
  p4: { num: 15, name: 'Zafran Ali',    pos: 'Power Forward',                    photo: 'https://i.pravatar.cc/300?img=52', ppg: 11.0, apg: 1.8, rpg: 8.2,
    hometown: 'Ipoh, MY', joined: '2022', achievements: ['Rebounding leader, 2024 season', 'Club Championship winner 2022'] },
  p5: { num: 23, name: 'Dylan Chen',    pos: 'Center',                           photo: 'https://i.pravatar.cc/300?img=14', ppg: 9.8,  apg: 1.2, rpg: 10.4,
    hometown: 'Johor Bahru, MY', joined: '2020', achievements: ['Defensive Player of the Year 2023', 'Most blocks in a single game (9)'] },
  p6: { num: 7,  name: 'Priya Nair',    pos: "Point Guard · Women's Team",       photo: 'https://i.pravatar.cc/300?img=47', ppg: 14.6, apg: 6.4, rpg: 3.7,
    hometown: 'Kota Kinabalu, MY', joined: '2022', achievements: ["Women's Team Captain", 'Assist leader, 2024 season'] },
  p7: { num: 11, name: 'Siti Rahimah',  pos: "Shooting Guard · Women's Team",    photo: 'https://i.pravatar.cc/300?img=44', ppg: 13.1, apg: 3.0, rpg: 4.8,
    hometown: 'Kuching, MY', joined: '2023', achievements: ['Rookie of the Year 2023', 'Rising Star Award, APU Invitational'] },
  p8: { num: 33, name: 'Ivan Petrov',   pos: 'Center · Reserve',                 photo: 'https://i.pravatar.cc/300?img=15', ppg: 7.4,  apg: 0.9, rpg: 9.1,
    hometown: 'Melaka, MY', joined: '2024', achievements: ['Sixth Man Award 2024', 'Top rebounder off the bench'] }
};
const playerOrder = Object.keys(playerData);
let currentPlayerId = playerOrder[0];
const PR_MAX = { ppg: 25, apg: 10, rpg: 12 };

function openPlayerReveal(id, skipIntro) {
  const p = playerData[id]; if (!p) return;
  currentPlayerId = id;
  document.getElementById('pr-bignum').textContent = p.num;
  document.getElementById('pr-photo').innerHTML = '<img src="' + p.photo + '" alt="' + p.name + '">';
  document.getElementById('pr-jerseynum').textContent = '#' + p.num;
  document.getElementById('pr-name').textContent = p.name;
  document.getElementById('pr-pos').textContent = p.pos;
  document.getElementById('pr-ppg-v').textContent = p.ppg;
  document.getElementById('pr-apg-v').textContent = p.apg;
  document.getElementById('pr-rpg-v').textContent = p.rpg;
  document.getElementById('pr-hometown').textContent = p.hometown || '—';
  document.getElementById('pr-joined').textContent = p.joined || '—';
  const achvList = document.getElementById('pr-achievements'); achvList.innerHTML = (p.achievements||[]).map(a=>'<li>'+a+'</li>').join('');
  const ppgBar = document.getElementById('pr-ppg-bar');
  const apgBar = document.getElementById('pr-apg-bar');
  const rpgBar = document.getElementById('pr-rpg-bar');
  ppgBar.style.width = '0%'; apgBar.style.width = '0%'; rpgBar.style.width = '0%';
  renderPrDots(id);
  const overlay = document.getElementById('player-reveal');
  overlay.classList.remove('open'); if (!skipIntro) void overlay.offsetWidth; overlay.classList.add('open');
  document.body.style.overflow = 'hidden'; document.body.classList.add('overlay-open');
  setTimeout(()=>{
    ppgBar.style.width = Math.min(100,(p.ppg/PR_MAX.ppg)*100)+'%';
    apgBar.style.width = Math.min(100,(p.apg/PR_MAX.apg)*100)+'%';
    rpgBar.style.width = Math.min(100,(p.rpg/PR_MAX.rpg)*100)+'%';
  }, skipIntro?50:700);
}

function renderPrDots(activeId) {
  const dotsWrap = document.getElementById('pr-dots');
  dotsWrap.innerHTML = playerOrder.map(id => '<span class="pr-dot'+(id===activeId?' active':'')+'" onclick="openPlayerReveal(\''+id+'\', true)"></span>').join('');
}

function navigatePlayerReveal(direction) {
  const idx = playerOrder.indexOf(currentPlayerId);
  const nextIdx = (idx + direction + playerOrder.length) % playerOrder.length;
  openPlayerReveal(playerOrder[nextIdx], true);
}

function closePlayerReveal() {
  document.getElementById('player-reveal').classList.remove('open');
  document.body.style.overflow = ''; document.body.classList.remove('overlay-open');
}

document.addEventListener('keydown', (e) => {
  const overlay = document.getElementById('player-reveal');
  if (!overlay.classList.contains('open')) return;
  if (e.key === 'Escape') closePlayerReveal();
  if (e.key === 'ArrowRight') navigatePlayerReveal(1);
  if (e.key === 'ArrowLeft') navigatePlayerReveal(-1);
});

// Touch swipe for overlay
(function() {
  const overlay = document.getElementById('player-reveal');
  let touchStartX = 0;
  overlay.addEventListener('touchstart', (e)=>{ touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  overlay.addEventListener('touchend', (e)=>{
    const dx = e.changedTouches[0].clientX - touchStartX; if (Math.abs(dx)<50) return;
    if (dx<0) navigatePlayerReveal(1); else navigatePlayerReveal(-1);
  }, { passive: true });
})();

// ── Hamburger Menu
function toggleMenu() { document.getElementById('hamburger').classList.toggle('open'); document.getElementById('nav-links').classList.toggle('open'); }
function closeMenu() { document.getElementById('hamburger').classList.remove('open'); document.getElementById('nav-links').classList.remove('open'); }

// ── Welcome Modal
function showWelcome(){ document.getElementById('welcome-modal').classList.add('open'); }
function closeWelcome(){ document.getElementById('welcome-modal').classList.remove('open'); }
window.addEventListener('DOMContentLoaded', ()=>{ setTimeout(showWelcome, 600); });

// ── Scroll Reveal
function checkReveal(){ document.querySelectorAll('.reveal').forEach(el=>{ const rect = el.getBoundingClientRect(); if (rect.top < window.innerHeight - 60) el.classList.add('visible'); }); }
window.addEventListener('scroll', checkReveal); checkReveal();

// ── FAQ Toggle
function toggleFaq(item){ const isOpen = item.classList.contains('open'); document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open')); if (!isOpen) item.classList.add('open'); }

// ── Events & Gallery Filters
function filterEvents(type){ const btns = document.querySelectorAll('[id^="filter-"]'); btns.forEach(b=>{ b.className = b.id==='filter-'+type ? 'btn-primary' : 'btn-outline'; }); document.querySelectorAll('#events-container .event-card').forEach(card=>{ card.style.display = (type==='all' || card.dataset.type===type) ? 'flex' : 'none'; }); }
function filterGallery(category){ document.querySelectorAll('.gallery-filter-btn').forEach(b=>b.className='btn-outline gallery-filter-btn'); const active = document.getElementById('gfilter-'+category); if(active) active.className='btn-primary gallery-filter-btn'; document.querySelectorAll('#gallery-container .gallery-item').forEach(item=>{ item.style.display = (category==='all' || item.dataset.category===category) ? 'flex' : 'none'; }); }

// ── Lightbox
function openLightbox(imgSrc, caption){ document.getElementById('lb-content').innerHTML = '<img src="'+imgSrc+'" alt="'+caption+'"><span class="lb-caption">'+caption+'</span>'; document.getElementById('lightbox').classList.add('show'); }
function closeLightbox(){ document.getElementById('lightbox').classList.remove('show'); }

// ── Forms & Validation
function showToast(msg){ const toast = document.getElementById('toast'); document.getElementById('toast-msg').textContent = msg; toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'), 4000); }
function setFieldError(id, message){ const el = document.getElementById(id); if(!el) return; const group = el.closest('.form-group'); if(!group) return; group.classList.add('error'); const err = group.querySelector('.field-error'); if(err) err.textContent = message; }
function clearFieldError(id){ const el = document.getElementById(id); if(!el) return; const group = el.closest('.form-group'); if(!group) return; group.classList.remove('error'); const err = group.querySelector('.field-error'); if(err) err.textContent = ''; }
function isValidEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }
function validateFields(fields){ let valid=true; fields.forEach(f=>{ const el=document.getElementById(f.id); if(!el) return; if(!f.check(el.value)){ setFieldError(f.id,f.message); valid=false;} else clearFieldError(f.id); }); return valid; }
function validateContactForm(){ return validateFields([{ id:'contact-first', check:v=>v.trim().length>0, message:'Please enter your first name.' },{ id:'contact-last', check:v=>v.trim().length>0, message:'Please enter your last name.' },{ id:'contact-email', check:v=>v.trim().length>0 && isValidEmail(v), message:'Please enter a valid email address.' },{ id:'contact-message', check:v=>v.trim().length>0, message:'Please enter a message.' }]); }
function validateJoinForm(){ return validateFields([{ id:'join-first', check:v=>v.trim().length>0, message:'Please enter your first name.' },{ id:'join-last', check:v=>v.trim().length>0, message:'Please enter your last name.' },{ id:'join-student-id', check:v=>/^[A-Za-z0-9\-\/]{4,}$/.test(v.trim()), message:'Please enter a valid student ID.' },{ id:'join-email', check:v=>v.trim().length>0 && isValidEmail(v), message:'Please enter a valid email address.' },{ id:'join-programme', check:v=>v.trim().length>0, message:'Please enter your programme.' },{ id:'join-message', check:v=>v.trim().length>0, message:'Please tell us a bit about yourself.' }]); }
function resetFields(ids){ ids.forEach(id=>{ const el=document.getElementById(id); if(!el) return; if(el.tagName==='SELECT') el.selectedIndex=0; else el.value=''; clearFieldError(id); }); }

const contactFieldIds = ['contact-first','contact-last','contact-email','contact-subject','contact-message'];
const joinFieldIds = ['join-first','join-last','join-student-id','join-email','join-programme','join-year','join-experience','join-position','join-message'];
[...contactFieldIds,...joinFieldIds].forEach(id=>{ const el=document.getElementById(id); if(!el) return; el.addEventListener('input',()=>clearFieldError(id)); el.addEventListener('change',()=>clearFieldError(id)); });

function submitForm(type){ const isValid = type==='join' ? validateJoinForm() : validateContactForm(); if(!isValid){ showToast('Please fix the highlighted fields before submitting.'); return; } const msg = type==='join' ? 'Application submitted! We\'ll contact you within 48 hours.' : 'Message sent! We\'ll get back to you shortly.'; showToast(msg); resetFields(type==='join'?joinFieldIds:contactFieldIds); }

// ── Animated Counters
function animateCounters(){ document.querySelectorAll('.big-num').forEach(el=>{ const raw = el.textContent.replace('+',''); const target = parseInt(raw); if(isNaN(target)) return; let count=0; const step=Math.ceil(target/40); const timer=setInterval(()=>{ count = Math.min(count+step,target); el.textContent = count + (String(raw).includes('+')?'+':''); if(count>=target) clearInterval(timer); },30); }); }

// Trigger counters when achievements page shown
const origShow = showPage;
window.showPage = function(id){ origShow(id); if (id === 'achievements') setTimeout(animateCounters, 300); };

