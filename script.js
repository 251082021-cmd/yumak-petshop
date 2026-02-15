document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBİL MENÜ KONTROLÜ ---
    const hamburger = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });
    }

    window.closeMenu = function() {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
        }
    };


    // --- 2. SCROLL ANİMASYONU (REVEAL) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); 
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));


    // --- 3. YAPAY ZEKA ASİSTAN MANTIĞI ---
    
    // WhatsApp Butonu İçin HTML Şablonu (Tekrar tekrar kullanmak için)
    const whatsappButtonHTML = `
        <br><br>
        <a href="https://wa.me/905469383481?text=Merhaba,%20sitenizdeki%20asistan%20sorumu%20tam%20yanıtlayamadı,%20canlı%20destek%20alabilir%20miyim?" 
           target="_blank" 
           style="background-color: #25D366; color: white; padding: 8px 15px; border-radius: 15px; text-decoration: none; display: inline-flex; align-items: center; gap: 5px; font-weight: bold; font-size: 0.9rem; margin-top: 5px;">
            <i class="fa-brands fa-whatsapp"></i> WhatsApp'tan Sor
        </a>
    `;

    const botKnowledge = {
        "merhaba": "Merhabalar! Yumak PetShop'a hoş geldiniz. Size nasıl yardımcı olabilirim? 🐾",
        "selam": "Selamlar! Minik dostunuz için neye ihtiyacınız var?",
        "saat": "Mağazamız hafta içi 09:00 - 21:00, Cumartesi 09:00 - 21:00, Pazar 13:30 - 21:00 saatleri arasında hizmet vermektedir.",
        "açık": "Mağazamız hafta içi 09:00 - 21:00, Cumartesi 09:00 - 21:00, Pazar 13:30 - 21:00 saatleri arasında hizmet vermektedir.",
        "adres": "İstiklal mah / Reşitpaşa cad / NO88 /A / İstanbul. Bekleriz!",
        "konum": "İletişim sayfamızdaki haritadan tam konumumuzu görebilirsiniz.",
        "yer": "İstanbul ümraniye de , reşitpaşa caddesi 88/A adresindeyiz.",
        "mama": "Kedi, köpek ve kuşlar için organik, tahılsız ve premium mama çeşitlerimiz mevcuttur. 🍃",
        "fiyat": "Fiyatlarımız ürün çeşitliliğine göre değişiyor. Özel kampanya bilgisi için mağazamızı arayabilirsiniz: 0546 938 34 81",
        "telefon": "İletişim numaramız: 0546 938 34 81",
        "traş"  : "Pet Kuaför randevusu için 0506 785 67 46 numarasından ulaşabilirsiniz", 
        "iletişim": "Bize 0546 938 34 81 numarasından ulaşabilirsiniz.",
        "tıraş": "Pet Kuaför randevusu için 0506 785 67 46 numarasından ulaşabilirsiniz",
        "sipariş": "Sipariş için 0546 938 34 81 numarası üzerinden iletişime geçebilirsiniz",
        "servis": "Sipariş için 0546 938 34 81 numarası üzerinden iletişime geçebilirsiniz",
        "kuaför": "Pet Kuaför randevusu için 0506 785 67 46 numarasından ulaşabilirsiniz",
        
        // BİLİNMEYEN DURUM (Varsayılan Cevap + WhatsApp Butonu)
        "varsayılan": `Üzgünüm, bu konuyu tam anlayamadım. 😔 Ancak merak etmeyin, uzman ekibimiz size hemen yardımcı olabilir. Aşağıdaki butona tıklayarak bize WhatsApp'tan yazabilirsiniz:${whatsappButtonHTML}`
    };

    const chatWindow = document.getElementById('chatWindow');
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');
    
    // --- SOHBETİ AÇ/KAPA VE GETİR BUTONU KONTROLÜ ---
    window.toggleChat = function() {
        const getirBtn = document.querySelector('.getir-float-btn'); 

        chatWindow.classList.toggle('active');
        
        if (chatWindow.classList.contains('active')) {
            // PENCERE AÇILDI: Getir butonunu gizle
            if (getirBtn) {
                getirBtn.style.opacity = '0';
                getirBtn.style.pointerEvents = 'none';
            }
            setTimeout(() => chatInput.focus(), 300);
        } else {
            // PENCERE KAPANDI: Getir butonunu göster
            if (getirBtn) {
                getirBtn.style.opacity = '1';
                getirBtn.style.pointerEvents = 'auto';
            }
        }
    };

    window.openChat = function() {
        const getirBtn = document.querySelector('.getir-float-btn');

        if (!chatWindow.classList.contains('active')) {
            chatWindow.classList.add('active');
            
            if (getirBtn) {
                getirBtn.style.opacity = '0';
                getirBtn.style.pointerEvents = 'none';
            }

            setTimeout(() => chatInput.focus(), 300);
        }
    };

    window.sendMessage = function() {
        const userText = chatInput.value.trim();
        if (userText === "") return;

        addMessage(userText, 'user-message');
        chatInput.value = "";

        setTimeout(() => {
            const botResponse = getBotResponse(userText);
            addMessage(botResponse, 'bot-message');
        }, 600);
    };

    window.handleKeyPress = function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    // --- MESAJ EKLEME FONKSİYONU (GÜNCELLENDİ) ---
    // Artık HTML etiketlerini (butonları) kabul ediyor
    function addMessage(text, className) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', className);
        
        // innerHTML kullanarak HTML kodlarını (buton vb.) çalıştırıyoruz
        messageDiv.innerHTML = text; 
        
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

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