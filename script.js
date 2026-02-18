document.addEventListener('DOMContentLoaded', () => {
    
    // --- ELEMENTLERİ SEÇME (Performans İçin En Başta) ---
    const hamburger = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    const getirBtn = document.querySelector('.getir-float-btn'); // Getir butonunu bir kez bul
    const chatWindow = document.getElementById('chatWindow');
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');

    // --- 1. MOBİL MENÜ KONTROLÜ ---
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Linke tıklanınca menüyü kapat (Global Fonksiyon)
    window.closeMenu = function() {
        if (navLinks && navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
        }
    };

    // --- 2. SCROLL ANİMASYONU (Intersection Observer - SEO Dostu) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Performans için: Bir kere görünce takibi bırak (Opsiyonel)
                // observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 }); // %10'u görünce çalışsın

    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- 3. GELİŞMİŞ YAPAY ZEKA ASİSTAN (LUCY) ---
    
    // BUTON ŞABLONLARI
    const whatsappButtonHTML = `
        <a href="https://wa.me/905469383481?text=Merhaba,%20sitenizdeki%20asistan%20sorumu%20tam%20yanıtlayamadı,%20detaylı%20bilgi%20alabilir%20miyim?" 
           target="_blank" 
           style="background-color: #25D366; color: white; padding: 10px 15px; border-radius: 20px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; font-weight: bold; font-size: 0.9rem; margin-top: 5px; width: fit-content; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
            <i class="fa-brands fa-whatsapp" style="font-size: 1.1rem;"></i> Uzmana Sor
        </a>
    `;

    const kuaforButtonHTML = `
        <br><br>
        <a href="https://wa.me/905067856746?text=Merhaba,%20Pet%20Kuaför%20randevusu%20oluşturmak%20istiyorum." 
           target="_blank" 
           style="background-color: #128C7E; color: white; padding: 10px 15px; border-radius: 20px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; font-weight: bold; font-size: 0.9rem; margin-top: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
            <i class="fa-solid fa-calendar-check" style="font-size: 1.1rem;"></i> Randevu Al
        </a>
    `;

    const hizmetlerButtonHTML = `
        <a href="hizmetler.html" 
           style="background-color: #0097A7; color: white; padding: 10px 15px; border-radius: 20px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; font-weight: bold; font-size: 0.9rem; margin-top: 5px; width: fit-content; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
            <i class="fa-solid fa-store" style="font-size: 1.1rem;"></i> Ürünleri İncele
        </a>
    `;

    // BİLGİ BANKASI (Anahtar Kelimeler)
    const botKnowledge = {
        "merhaba": "Merhabalar! Yumak PetShop'a hoş geldiniz. Size ve minik dostunuza nasıl yardımcı olabilirim? 🐾",
        "selam": "Selamlar! Bugün size nasıl destek olabilirim?",
        "nasılsın": "Ben sanal bir asistanım ama tüylü dostlarımıza yardım ettiğim sürece harikayım! Siz nasılsınız? 🐶",
        "kimsin": "Ben Yumak Petshop'un yapay zeka asistanı 'Lucy'. Sorularınızı yanıtlamak için buradayım.",
        "günaydın": "Günaydın! Enerjik ve mutlu bir gün dilerim. ☀️",
        "iyi geceler": "İyi geceler! Minik dostunuzun üstünü örtmeyi unutmayın. 🌙",
        "teşekkür": "Rica ederim! Her zaman bekleriz. 🐾",
        "saat": "Mağazamız hafta içi ve Cumartesi 09:00 - 21:00, Pazar günleri ise 13:30 - 21:00 saatleri arasında hizmetinizdedir. 🕘",
        "açık": "Evet, çalışma saatlerimiz dahilinde açığız! Hafta içi-Cumartesi: 09:00-21:00, Pazar: 13:30-21:00.",
        "adres": "Adresimiz: İstiklal mah. Reşitpaşa Cad. No:88/A, Ümraniye/İstanbul. Çayımızı içmeye bekleriz! 📍",
        "konum": "Konum bilgimiz 'İletişim' sayfasındaki haritada mevcut. Ümraniye Reşitpaşa Caddesi üzerindeyiz.",
        "telefon": "Mağaza numaramız: 0546 938 34 81. İstediğiniz zaman arayabilirsiniz. 📞",
        "iletişim": "Bize 0546 938 34 81 numarasından veya sağ alttaki WhatsApp butonundan ulaşabilirsiniz.",
        "ödeme": "Mağazamızda Nakit, Kredi Kartı ve Havale ile ödeme yapabilirsiniz.",
        "canlı": "Mağazamızda canlı hayvan satışımız yoktur!",
        "kuaför": `Profesyonel Pet Kuaför hizmetimiz var! ✂️ Makas ve makine tıraşı, banyo hizmeti sunuyoruz. Randevu almak için:${kuaforButtonHTML}`,
        "tıraş": `Anestezisiz, dostunuzu strese sokmadan tıraş yapıyoruz. Hemen randevu oluşturmak için:${kuaforButtonHTML}`,
        "traş": `Anestezisiz, dostunuzu strese sokmadan tıraş yapıyoruz. Hemen randevu oluşturmak için:${kuaforButtonHTML}`,
        "randevu": `Kuaför randevusu almak çok kolay! Aşağıdaki butona tıklayarak WhatsApp üzerinden randevunuzu hemen oluşturabilirsiniz:${kuaforButtonHTML}`,
        "banyo": `İlaçlı veya normal banyo hizmetimiz mevcuttur. Randevu için:${kuaforButtonHTML}`,
        "getir": "Evet! Getir ve Yemeksepeti üzerinden de satış yapıyoruz. 'Yumak Petshop' olarak aratabilirsiniz. 🛵",
        "servis": "Yakın çevreye eve servis hizmetimiz vardır. Sipariş vermek için: 0546 938 34 81",
        "sipariş": "Yakın çevreye eve servis hizmetimiz vardır. Sipariş vermek için: 0546 938 34 81",
        "eve": "Akşam saatlerinde güncellenen saatlerimizle eve servis yapıyoruz. Detaylar için arayabilirsiniz.",
        "kedi kumu": "Bentonit (topaklaşan), Kristal (silika) ve doğal çam peleti kumlarımız var. İnce ve kalın taneli seçenekler mevcut. 🐈",
        "kedi maması": "Yavru, yetişkin ve kısırlaştırılmış kediler için Royal Canin, ProPlan, N&D, Reflex gibi markalar var.",
        "yaş mama": "Konserve ve pouch (paket) yaş mamalarda balıklı, tavuklu, sığırlı çeşitler bolca var! 🍲",
        "malt": "Tüy yumağı önleyici (Anti-Hairball) malt macunlarımız var. Kedinizin sindirimi için çok önemli.",
        "tırmalama": "Basit tırmalama tahtalarından, katlı kedi evlerine kadar çeşitlerimiz mevcut.",
        "kedi otu": "Catnip (kedi otu) sprey ve kuru ot olarak var. Kediniz buna bayılacak! 🌿",
        "köpek maması": "Küçük, orta ve büyük ırklar için tahıllı/tahılsız kuru mama seçeneklerimiz mevcut. 🐕",
        "kemik": "Pres kemik, düğüm kemik ve doğal kurutulmuş çiğneme kemikleri diş sağlığı için harikadır.",
        "ped": "Çiş eğitim pedleri (60x60, 60x90) ve alıştırma damlaları stoklarımızda.",
        "ağızlık": "Veteriner kontrolleri veya eğitim için kumaş ve plastik ağızlıklarımız var.",
        "kuş yemi": "Muhabbet kuşu, kanarya, papağan ve cennet papağanı yemlerimiz (açık/paket) taze taze! 🐦",
        "darı": "Dal darı, kızıl darı ve vitaminli krakerler kuşlar için harika bir enerji kaynağı.",
        "gaga": "Gaga taşı, kalamar kemiği ve mineral blokları var.",
        "kafes": "Kuşlar için pirinç/boyalı kafesler; Hamsterlar için tünelli kafesler var.",
        "talaş": "Kemirgenler (hamster/tavşan) için kokusuz, sıkıştırılmış doğal talaş. 🐹",
        "hamster": "Hamster yemi, çarkı, suluğu ve kemirme taşları mevcut.",
        "balık yemi": "Japon balığı, Lepistes, Ciklet ve Beta yemlerimiz (pul/granül) mevcut. 🐠",
        "akvaryum": "Cam fanuslar ve hazır set akvaryumlar var.",
        "motor": "İç filtreler, hava motorları (pipo filtre) ve hava taşları mevcut.",
        "ısıtıcı": "Akvaryum ısıtıcıları ve termometreler var.",
        "süs": "Akvaryum için yapay bitkiler, gemi batıkları, kaleler ve renkli kumlar var. 🏰",
        "metilen": "Su düzenleyici, metilen mavisi ve berraklaştırıcı damlalar mevcut.",
        "tasma": "Boyun tasmaları, göğüs tasmaları, otomatik (uzayan) gezdirme kayışları ve ışıklı tasmalar var. 🎀",
        "kayış": "Zincir, deri ve dokuma gezdirme kayışlarımız mevcut.",
        "taşıma": "Uçak onaylı boxlar, şeffaf astronot sırt çantaları ve omuz çantaları var. ✈️",
        "yatak": "Yıkanabilir, peluş, mağara tipi kedi ve köpek yataklarımız renk renk!",
        "kıyafet": "Yağmurluk, sweatshirt, kazak ve mont çeşitlerimizle dostunuz üşümesin. 👕",
        "oyuncak": "Kediler için olta, top, fare; Köpekler için diş ipi, sesli oyuncak ve toplar var. 🎾",
        "fırça": "Tüy toplayıcı eldivenler, telli fırçalar ve Furminator taraklarımız mevcut.",
        "şampuan": "Kuru şampuan (köpük) ve yıkama şampuanları, koku giderici spreyler var. 🧼",
        "mama kabı": "Çelik, seramik, plastik ve otomatik su/mama kapları mevcut.",
        "vitamin": "Tüy sağlığı (Biotin), multivitamin ve kalsiyum takviyeleri var. 💊",
        "pire": "Dış parazit için damlalar, pire tasmaları ve spreylerimiz mevcut.",
        "göz": "Göz ve kulak temizleme solüsyonlarımız var.",
        "tırnak": "Kedi ve köpekler için özel tırnak makaslarımız var. ✂️",
        "fiyat": `Fiyatlarımız markaya ve ürüne göre değişiyor. En güncel fiyat bilgisi için WhatsApp'tan yazabilirsiniz: <br>${whatsappButtonHTML}`,
        "kaç tl": `Ürün çeşitliliğimiz çok fazla olduğu için net fiyatı WhatsApp hattımızdan sorabilirsiniz: <br>${whatsappButtonHTML}`,
        "pahalı": "Her bütçeye uygun ürünümüz var! Ekonomik seriden premium seriye kadar seçenek sunuyoruz.",
        "varsayılan": `
            Bunu tam anlayamadım. 🤔 Dilerseniz ürün ve hizmetlerimizi detaylı inceleyebilir veya doğrudan bize sorabilirsiniz:
            <br><br>
            <div style="display: flex; flex-direction: column; gap: 8px;">
                ${hizmetlerButtonHTML}
                ${whatsappButtonHTML}
            </div>
        `
    };

    // --- SOHBET AÇ/KAPA FONKSİYONLARI ---
    
    // Pencereyi Aç/Kapa
    window.toggleChat = function() {
        chatWindow.classList.toggle('active');
        handleGetirButton(chatWindow.classList.contains('active'));
        
        if (chatWindow.classList.contains('active')) {
            setTimeout(() => chatInput.focus(), 300);
        }
    };

    // Pencereyi Sadece Aç
    window.openChat = function() {
        if (!chatWindow.classList.contains('active')) {
            chatWindow.classList.add('active');
            handleGetirButton(true);
            setTimeout(() => chatInput.focus(), 300);
        }
    };

    // Getir Butonu Gizle/Göster (Helper Function)
    function handleGetirButton(hide) {
        if (getirBtn) {
            if (hide) {
                getirBtn.style.opacity = '0';
                getirBtn.style.pointerEvents = 'none';
            } else {
                getirBtn.style.opacity = '1';
                getirBtn.style.pointerEvents = 'auto';
            }
        }
    }

    // --- MESAJ GÖNDERME MANTIĞI ---
    window.sendMessage = function() {
        const userText = chatInput.value.trim();
        if (userText === "") return;

        addMessage(userText, 'user-message');
        chatInput.value = "";

        // Bot yazıyor efekti için kısa gecikme
        setTimeout(() => {
            const botResponse = getBotResponse(userText);
            addMessage(botResponse, 'bot-message');
        }, 600);
    };

    // Enter Tuşu Kontrolü
    window.handleKeyPress = function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    // Ekrana Mesaj Ekleme
    function addMessage(text, className) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', className);
        messageDiv.innerHTML = text; 
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Cevap Bulma Algoritması
    function getBotResponse(input) {
        input = input.toLowerCase();
        for (let key in botKnowledge) {
            if (input.includes(key)) {
                return botKnowledge[key];
            }
        }
        return botKnowledge["varsayılan"];
    }
});