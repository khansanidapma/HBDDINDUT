const intro = document.getElementById("intro");
const openBtn = document.getElementById("openBtn");
const main = document.getElementById("mainContent");
const confetti = document.getElementById("confetti");
const audio = document.getElementById("birthdayAudio");
const musicBtn = document.getElementById("musicBtn");
const book = document.querySelector(".book");
const bookBtn = document.getElementById("bookBtn");
const candle = document.querySelector(".custom-candle");

function burstConfetti(amount = 120){
  const colors = ["#ef4165","#ff8fab","#3977d5","#ffd45a","#ffffff"];
  confetti.innerHTML = "";
  for(let i=0;i<amount;i++){
    const el = document.createElement("i");
    el.className = "confetti";
    el.style.left = `${Math.random()*100}%`;
    el.style.setProperty("--x", `${(Math.random()-.5)*260}px`);
    el.style.setProperty("--dur", `${2.4 + Math.random()*2.2}s`);
    el.style.setProperty("--rot", `${Math.random()*360}deg`);
    el.style.background = colors[Math.floor(Math.random()*colors.length)];
    el.style.width = `${6+Math.random()*8}px`;
    el.style.height = `${10+Math.random()*13}px`;
    el.style.animationDelay = `${Math.random()*.35}s`;
    confetti.appendChild(el);
  }
  setTimeout(()=>confetti.innerHTML="",6000);
}

async function startBirthday(){
  intro.classList.add("hidden");
  main.setAttribute("aria-hidden","false");
  document.body.classList.add("custom-cursor");
  burstConfetti(160);
  try{
    audio.currentTime = 0;
    await audio.play();
    musicBtn.classList.remove("paused");
  }catch(e){
    musicBtn.classList.add("paused");
  }
  window.scrollTo({top:0,behavior:"instant"});
}
openBtn.addEventListener("click",startBirthday);

musicBtn.addEventListener("click", async ()=>{
  if(audio.paused){
    try{await audio.play(); musicBtn.classList.remove("paused")}catch(e){}
  }else{
    audio.pause(); musicBtn.classList.add("paused");
  }
});

bookBtn.addEventListener("click", ()=>{
  const isOpen = book.classList.toggle("open");
  bookBtn.setAttribute("aria-expanded", String(isOpen));
  bookBtn.textContent = isOpen ? "📕 tutup surat" : "✉️ buka surat";
  if(isOpen) burstConfetti(55);
});

document.addEventListener("mousemove",(e)=>{
  candle.style.left = `${e.clientX}px`;
  candle.style.top = `${e.clientY}px`;
});

// Give touch users the same experience without a fake cursor.
window.addEventListener("touchstart",()=>document.body.classList.remove("custom-cursor"),{once:true});

// Gentle image fallback: if a local image ever gets removed, keep layout intact.
document.querySelectorAll("img").forEach(img=>{
  img.addEventListener("error",()=>{
    img.style.background="linear-gradient(135deg,#ffd8e2,#dfeaff)";
    img.alt="Foto tidak tersedia";
  });
});

// Small entrance effect for sections as they enter view.
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("seen");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".section-heading,.photo-card,.gallery-item,.wish-card").forEach(el=>observer.observe(el));
