// ===== داده محصولات: اینجا بازی‌ها و قیمت‌ها را ویرایش کن (قیمت‌ها نمونه است) =====
const TG = "https://t.me/masirnews"; // لینک سفارش را عوض کن
const CATS = {action:["🎯","اکشن و ماجرایی"],sport:["⚽","ورزشی"],race:["🏎️","مسابقه‌ای"],horror:["👻","ترسناک"],family:["🎈","خانوادگی"]};
const GAMES = [
{id:1,n:"God of War Ragnarök",c:"action",p:450000,o:600000,cap:[2,3],e:"⚔️",g:["#1e3a8a","#0ea5e9"],d:"ادامه ماجرای کریتوس و آترئوس در سرزمین‌های اساطیر نورس."},
{id:2,n:"Marvel's Spider-Man 2",c:"action",p:480000,o:650000,cap:[2,3],e:"🕷️",g:["#7f1d1d","#ef4444"],d:"دو مرد عنکبوتی، یک نیویورک بزرگ و ونوم."},
{id:3,n:"The Last of Us Part I",c:"horror",p:400000,o:550000,cap:[2,3],e:"🍄",g:["#14532d","#65a30d"],d:"سفر جوئل و الی در دنیای پساآخرالزمانی."},
{id:4,n:"Elden Ring",c:"action",p:420000,o:560000,cap:[2,3],e:"🗡️",g:["#78350f","#f59e0b"],d:"دنیای باز عظیم از سازندگان سولز."},
{id:5,n:"EA Sports FC 26",c:"sport",p:520000,o:700000,cap:[2,3],e:"⚽",g:["#065f46","#10b981"],d:"جدیدترین نسخه فوتبال با مدهای آنلاین و آلتیمیت تیم."},
{id:6,n:"Gran Turismo 7",c:"race",p:380000,o:500000,cap:[2,3],e:"🏁",g:["#1e293b","#64748b"],d:"شبیه‌ساز واقعی رانندگی با صدها ماشین."},
{id:7,n:"Resident Evil 4 Remake",c:"horror",p:390000,o:520000,cap:[2,3],e:"🧟",g:["#3f0d0d","#b91c1c"],d:"بازسازی افسانه‌ای ترسناک با گرافیک خیره‌کننده."},
{id:8,n:"Astro Bot",c:"family",p:350000,o:480000,cap:[2,3],e:"🤖",g:["#4c1d95","#a78bfa"],d:"پلتفرمر شاد و رنگی مخصوص PS5 برای همه سنین."},
{id:9,n:"Hogwarts Legacy",c:"action",p:410000,o:550000,cap:[2,3],e:"🪄",g:["#312e81","#6366f1"],d:"زندگی در هاگوارتز در قرن نوزدهم."},
{id:10,n:"Mortal Kombat 1",c:"action",p:430000,o:580000,cap:[2,3],e:"🥋",g:["#7c2d12","#f97316"],d:"نبرد کلاسیک با سیستم جدید کمبو و فتالیتی."},
{id:11,n:"Need for Speed Unbound",c:"race",p:340000,o:450000,cap:[2,3],e:"🚗",g:["#831843","#ec4899"],d:"مسابقات خیابانی با استایل گرافیتی."},
{id:12,n:"It Takes Two",c:"family",p:300000,o:400000,cap:[2,3],e:"👫",g:["#9a3412","#fb923c"],d:"ماجراجویی دو نفره و کو‌آپ فوق‌العاده."}
];
const fa = n => n.toLocaleString("fa-IR");
const capName = n => "ظرفیت " + fa(n);
const q = k => new URLSearchParams(location.search).get(k);
const cover = g => `<div class="cover" style="background:linear-gradient(135deg,${g.g[0]},${g.g[1]})">${g.e}<span class="tag">${CATS[g.c][1]}</span></div>`;
const card = g => `<a class="card rv" href="product.html?id=${g.id}">${cover(g)}<div class="in"><b>${g.n}</b><small style="color:var(--mut)">${g.cap.map(capName).join(" | ")}</small><div class="price">${fa(g.p)} تومان<s>${fa(g.o)}</s></div><span class="btn">مشاهده و خرید</span></div></a>`;
function layout(page){
 const L=[["index.html","خانه"],["shop.html","فروشگاه"],["contact.html","تماس با ما"]];
 document.getElementById("header").innerHTML=`<header><div class="wrap nav"><a class="logo" href="index.html">🎮 مسیر گیم</a><nav>${L.map(l=>`<a href="${l[0]}" class="${l[0]==page?"on":""}">${l[1]}</a>`).join("")}</nav><a class="btn" href="${TG}" target="_blank">سفارش سریع</a></div></header>`;
 document.getElementById("footer").innerHTML=`<footer><div class="wrap"><p>مسیر گیم | فروش اکانت قانونی بازی‌های ظرفیتی PS5</p><p style="margin-top:8px">ساخته شده با <span class="heart">❤</span> عشق توسط <b>masirnews</b></p></div></footer>`;
 const io=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add("show")),{threshold:.1});
 new MutationObserver(()=>document.querySelectorAll(".rv:not(.show)").forEach(el=>io.observe(el))).observe(document.body,{childList:true,subtree:true});
 document.querySelectorAll(".rv").forEach(el=>io.observe(el));
}
function initHome(){
 document.getElementById("cats").innerHTML=Object.entries(CATS).map(([k,v])=>`<a class="cat rv" href="shop.html?cat=${k}"><i>${v[0]}</i><b>${v[1]}</b></a>`).join("");
 document.getElementById("featured").innerHTML=GAMES.slice(0,8).map(card).join("");
}
function initShop(){
 let cat=q("cat")||"all",cap="all";
 const chips=document.getElementById("chips"),list=document.getElementById("list"),s=document.getElementById("s"),sort=document.getElementById("sort"),capSel=document.getElementById("cap");
 chips.innerHTML=[["all","همه"],...Object.entries(CATS).map(([k,v])=>[k,v[1]])].map(([k,t])=>`<button class="chip" data-k="${k}">${t}</button>`).join("");
 function draw(){
  chips.querySelectorAll(".chip").forEach(c=>c.classList.toggle("on",c.dataset.k==cat));
  let r=GAMES.filter(g=>(cat=="all"||g.c==cat)&&g.n.toLowerCase().includes(s.value.trim().toLowerCase())&&(capSel.value=="all"||g.cap.includes(+capSel.value)));
  if(sort.value=="lo")r.sort((a,b)=>a.p-b.p);if(sort.value=="hi")r.sort((a,b)=>b.p-a.p);
  list.innerHTML=r.length?r.map(card).join(""):"<p style='color:var(--mut)'>بازی‌ای پیدا نشد 😕</p>";
 }
 chips.onclick=e=>{if(e.target.dataset.k){cat=e.target.dataset.k;draw()}};
 [s,sort,capSel].forEach(x=>x.oninput=draw);draw();
}
function initProduct(){
 const g=GAMES.find(x=>x.id==q("id"))||GAMES[0];document.title=g.n+" | مسیر گیم";
 let sel=g.cap[0];
 const box=document.getElementById("detail");
 function draw(){
  const msg=encodeURIComponent(`سلام، می‌خواهم ${g.n} (${capName(sel)}) را سفارش بدهم.`);
  box.innerHTML=`<div>${cover(g)}</div><div><h1>${g.n}</h1><p style="color:var(--mut);margin:8px 0">${g.d}</p>
  <b>نوع ظرفیت:</b><div class="caps">${g.cap.map(c=>`<button class="chip ${c==sel?"on":""}" data-c="${c}">${capName(c)}</button>`).join("")}</div>
  <div class="price" style="font-size:1.5rem">${fa(g.p)} تومان<s>${fa(g.o)}</s></div>
  <p style="margin:14px 0;color:var(--mut)">✔ اکانت قانونی و اورجینال &nbsp; ✔ تحویل سریع &nbsp; ✔ پشتیبانی کامل</p>
  <a class="btn" target="_blank" href="${TG}?text=${msg}">سفارش در تلگرام</a></div>`;
  box.querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>{sel=+b.dataset.c;draw()});
 }
 draw();
 document.getElementById("related").innerHTML=GAMES.filter(x=>x.c==g.c&&x.id!=g.id).concat(GAMES.filter(x=>x.c!=g.c)).slice(0,4).map(card).join("");
}
