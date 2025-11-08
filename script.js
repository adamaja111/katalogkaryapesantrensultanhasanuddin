// Elements
const galleryEl = document.getElementById('gallery');
const backdrop = document.getElementById('backdrop');
const modal = document.querySelector('.modal');
const closeBtn = document.getElementById('closeBtn');

const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalDesc = document.getElementById('modal-desc');
const componentsBox = document.getElementById('components');

const previewImg = document.getElementById('preview-img');
const previewTitle = document.getElementById('preview-title');
const previewDesc = document.getElementById('preview-desc');
const metaSize = document.getElementById('meta-size');
const metaTech = document.getElementById('meta-tech');

const modalLeft = document.querySelector('.modal-left');
const modalRight = document.getElementById('previewPanel');
const previewCard = document.querySelector('.preview-card'); // card yang berisi preview-img, preview-title, preview-desc

// Simple util: safe set src with fade
function setPreviewImage(src) {
  if (!previewImg) return;
  previewImg.style.opacity = 0;
  // create a temp image to preload
  const img = new Image();
  img.src = src;
  img.onload = () => {
    previewImg.src = src;
    // small timeout to allow DOM paint
    requestAnimationFrame(() => {
      previewImg.style.transition = 'opacity .22s ease, transform .28s ease';
      previewImg.style.transform = 'scale(.98)';
      previewImg.style.opacity = '1';
      setTimeout(()=> previewImg.style.transform = 'scale(1)', 240);
    });
  };
  img.onerror = () => {
    // fallback: keep opacity and show nothing
    previewImg.style.opacity = 1;
  };
}

// Data
const PRODUCTS = [
  {
    title: 'Kaligrafi Tempurung kelapa kering',
    category: 'Hiasan Dinding',
    desc: 'Kaligrafi ini terbuat dari bahan dasar tempurung kelapa dan serbuk kayu. Tempurung kelapa dipecah menjadi pecahan kecil kemudian ditempelkan ke triplek dengan menggunakan lem.',
    size: '40 x 60 cm',
    technique: 'Handmade',
    art: 'image/kaligrafi 1.jpg',
    components: [
      { id:'acry1', img:'image/tempurung.jpeg', label:'Tempurung kering', note:'Bahan utama dalam pembuatan kaligrafi yang dijadikan pecahan kecil.' },
      { id:'acry2', img:'image/serbuk kayu.jpeg', label:'Serbuk Kayu kering', note:'sebagai penghias bingkai kaligrafi.' },
      // { id:'acry3', img:'image/stencil.png', label:'Stencil Vinyl', note:'Panduan untuk detail huruf presisi.' },
      // { id:'acry4', img:'image/led.png', label:'LED Strip', note:'Backlight untuk efek gallery.' }
    ]
  },
  {
    title: 'Tumbler',
    category: 'Botol Minuman',
    desc: 'Tumbler ini terbuat dari bahan stainless yang dapat digunakan berulang kali, sehingga efektif dalam mengurangi sampah plastik.',
    size: '30 x 50 cm',
    technique: '/',
    art: 'image/tumbler 1.jpg',
    components: [
      { id:'las1', img:'image/stain.jpeg', label:'Material Stainless Steel', note:'Material Stainless Steel sebagai bahan utama. Memiliki ketahanan korosi yang tinggi, tidak mudah berkarat meski sering kontak dengan air atau minuman asam, sehingga dapat digunakan secara berulang untuk mengurangi penggunaan sampah botol plastik.' },
      // { id:'las2', img:'https://via.placeholder.com/400x300?text=Laser', label:'CO2 Laser', note:'Mesin potong pola kaligrafi.' },
      // { id:'las3', img:'https://via.placeholder.com/400x300?text=Paint', label:'Black Stain', note:'Finishing agar tampak elegan.' }
    ]
  },
  {
    title: 'Kaligrafi Pelepah Pisang',
    category: 'Hiasan Dinding',
    desc: 'Kaligrafi ini terbuat dari bahan dasar pelepah pisang. Pelepah pisang yang telah dikeringkan kemudian dijadikan dasar untuk menuliskan Kalam Ilahi yang indah di atas nya menggunakan pewarna alami.',
    size: 'Custom Screen',
    technique: 'Handmade',
    art: 'image/kaligrafi 2.jpg',
    components: [
      { id:'led1', img:'image/pelepah.jpeg', label:'Pelepah Pisang', note:'Bahan utama Pelepah pisang yan telah dikeringkan.' },
      { id:'led2', img:'image/cat.jpeg', label:'Cat Akrilik', note:'Menggunakan cat akrilik.' },
      // { id:'led3', img:'https://via.placeholder.com/400x300?text=Arduino', label:'Arduino', note:'Pengontrol data.' }
    ]
  },
  {
    title: 'Jam Meja',
    category: 'Hiasan Meja',
    desc: 'Jam ini terbuat dari bahan dasar plastik penutup botol dan akar kayu. Penutup botol ini dipanaskan pada suhu tertentu menggunakan alat khusus, sehingga dapat meleleh dan dapat dicetak menjadi bentuk. Setelah terbentuk, plastik ini kemudian dipadukan dengan akar dan ranting pohon yang sudah mati untuk menjadi sebuah hiasan meja yang estetik.',
    size: '20 x 40 cm',
    technique: 'Homemade',
    art: 'image/jam.jpg',
    components: [
      { id:'vin1', img:'image/tutup botol.jpeg', label:'Tutup Botol Bekas', note:'Tutup botol bekas berbagai warna yang dikumpulkan menjadi bahan utama dari jam meja tersebut.' },
      { id:'vin2', img:'image/akar.jpeg', label:'Akar Kayu', note:'Akar kayu sebagai penopang jam.' },
      // { id:'vin3', img:'https://via.placeholder.com/400x300?text=Transfer', label:'Transfer Tape', note:'Memindahkan stiker.' }
    ]
  },

  {
  title: 'Vas Bunga',
  category: 'Hiasan Ruangan',
  desc: 'Vas bunga dekoratif yang dibuat secara manual dari bahan ramah lingkungan dengan tampilan estetis untuk memperindah ruangan.',
  size: '25 x 50 cm',
  technique: 'Handmade',
  art: 'image/pasbunga.jpg',
  components: [
    { id:'vas1', img:'image/tali.jpeg', label:'Tali Karung Goni', note:'Sebagai bahan utama Tali Karung Goni terbuat dari serat alami pohon rami/jute yang memiliki kekuatan tarik tinggimemiliki tekstur kasar namun kokoh, sehingga sering digunakan untuk mengikat beban berat bersifat biodegradable dan ramah lingkungan karena mudah terurai secara alami.' },
    // { id:'vas2', img:'image/cat.jpeg', label:'Cat Dekoratif', note:'Memberikan warna dan perlindungan permukaan.' },
    // { id:'vas3', img:'image/karet.jpeg', label:'Ring Silikon', note:'Penahan dasar untuk menjaga stabilitas dan anti slip.' }
  ]
}
];

// Render gallery
PRODUCTS.forEach((p, idx) => {
  const el = document.createElement('article');
  el.className = 'card';
  el.tabIndex = 0;
  el.innerHTML = `
    <div class="img-box"><img src="${p.art}" alt="${p.title}"></div>
    <h3>${p.title}</h3>
    <div class="muted" style="font-size:13px;margin-top:6px">${p.category}</div>
  `;
  el.addEventListener('click', ()=> openModal(idx));
  el.addEventListener('keydown', (e)=> { if(e.key === 'Enter') openModal(idx) });
  // add slight animation delay
  el.style.animationDelay = `${idx * 0.12}s`;
  galleryEl.appendChild(el);
});

// Adjust placement of previewCard between left/right based on viewport
function adjustPreviewPlacement() {
  // if previewCard doesn't exist, skip
  if (!previewCard || !modalLeft || !modalRight) return;

  if (window.innerWidth < 768) {
    // move preview into modal-left ABOVE components if not already there
    if (!modalLeft.contains(previewCard)) {
      modalLeft.insertBefore(previewCard, componentsBox);
    }
  } else {
    // move preview back to modal-right if not already there
    if (!modalRight.contains(previewCard)) {
      modalRight.appendChild(previewCard);
    }
  }
}

// call on resize and on load
window.addEventListener('resize', adjustPreviewPlacement);
window.addEventListener('load', adjustPreviewPlacement);

// Open modal and populate
let activeComponentId = null;
function openModal(index){
  const p = PRODUCTS[index];
  modalTitle.textContent = p.title;
  modalCategory.textContent = p.category;
  modalDesc.textContent = p.desc;
  metaSize.textContent = p.size;
  metaTech.textContent = p.technique;

  // preview default: artwork
  setPreviewImage(p.art);
  previewTitle.textContent = p.title;
  previewDesc.textContent = p.desc;

  // build component list
  componentsBox.innerHTML = '';
  p.components.forEach((c, i) => {
    const node = document.createElement('button');
    node.className = 'comp-item';
    node.type = 'button';
    node.setAttribute('data-id', c.id);
    node.innerHTML = `
      <div class="comp-thumb"><img src="${c.img}" alt="${c.label}"></div>
      <div class="comp-meta"><strong>${c.label}</strong><small>${c.note}</small></div>
    `;

    // click => update preview area (mobile: preview is moved above list; desktop: preview is in right panel)
    node.addEventListener('click', () => {
      // remove active from siblings
      [...componentsBox.children].forEach(ch => ch.classList.remove('active'));
      node.classList.add('active');
      activeComponentId = c.id;

      // Always update preview card (wherever it is placed)
      previewTitle.textContent = c.label;
      previewDesc.textContent = c.note;
      setPreviewImage(c.img);

      // On mobile, ensure preview is visible (scroll into view)
      if (window.innerWidth < 768) {
        // small delay to allow image to load/replace
        setTimeout(()=> {
          previewCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      }
    });

    componentsBox.appendChild(node);
    // stagger reveal (light)
    setTimeout(()=> node.classList.add('appear'), i*70 + 80);
  });

  // ensure preview is placed correctly for current viewport
  adjustPreviewPlacement();

  backdrop.classList.add('show');
  backdrop.setAttribute('aria-hidden','false');

  // focus for accessibility
  setTimeout(()=> componentsBox.querySelector('.comp-item')?.focus(), 220);
  document.body.style.overflow = 'hidden';
}

// close modal
function closeModal(){
  backdrop.classList.remove('show');
  backdrop.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';

  // reset preview
  previewImg.src = '';
  previewTitle.textContent = 'Pilih komponen';
  previewDesc.textContent = 'Klik salah satu komponen di kiri untuk melihat detail.';
}
closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', (e)=> { if(e.target === backdrop) closeModal() });
document.addEventListener('keydown', (e)=> { if(e.key === 'Escape' && backdrop.classList.contains('show')) closeModal() });
