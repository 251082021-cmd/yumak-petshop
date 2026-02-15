document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBİL MENÜ KONTROLÜ ---
    const hamburger = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    // Menüyü aç/kapa
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        // İkona basit bir animasyon eklenebilir
        hamburger.classList.toggle('toggle');
    });

    // Linke tıklanınca menüyü kapat (Global fonksiyon)
    window.closeMenu = function() {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
        }
    };


    // --- 2. SCROLL ANİMASYONU (REVEAL) ---
    // Ekrana giren elemanları tespit eder
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // Eğer eleman görünürse
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Animasyon sınıfını ekle
            }
        });
    });

    // .reveal sınıfına sahip tüm elemanları seç ve gözlemle
    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));


    // --- 3. YAPAY ZEKA ASİSTAN MANTIĞI ---
    const botKnowledge = {
        "merhaba": "Merhabalar! Doğa PetShop'a hoş geldiniz. Size nasıl yardımcı olabilirim? 🐾",
        "selam": "Selamlar! Minik dostunuz için neye ihtiyacınız var?",
        "saat": "Mağazamız hafta içi 09:00 - 21:00, Cumartesi 09:00 - 21:00, Pazar 13:30 - 21:00 saatleri arasında hizmet vermektedir.",
        "açık": "Mağazamız hafta içi 09:00 - 21:00, Cumartesi 09:00 - 21:00, Pazar 13:30 - 21:00 saatleri arasında hizmet vermektedir.",
        "adres": "İstiklal mah / Reşitpaşa cad / NO88 /A / İstanbul. Bekleriz!",
        "konum": "İletişim sayfamızdaki haritadan tam konumumuzu görebilirsiniz.",
        "yer": "İstanbul ümraniye de , reşitpaşa caddesi 88/A adresindeyiz.",
        "mama": "Kedi, köpek ve kuşlar için organik, tahılsız ve premium mama çeşitlerimiz mevcuttur. 🍃",
        "fiyat": "Fiyatlarımız ürün çeşitliliğine göre değişiyor. Özel kampanya bilgisi için mağazamızı arayabilirsiniz: 0546 938 34 81",
        "telefon": "İletişim numaramız: 0546 938 34 81",
        "traş"   : "Pet Kuaför randevusu için 0506 785 67 46 numarasından ulaşabilirsiniz", 
        "iletişim": "Bize 0546 938 34 81 numarasından ulaşabilirsiniz.",
        "tıraş": "Pet Kuaför randevusu için 0506 785 67 46 numarasından ulaşabilirsiniz",
        "sipariş": "Sipariş için 546 938 34 81 numarası üzerinden iletişime geçebilirsiniz",
        "servis": "Sipariş için 546 938 34 81 numarası üzerinden iletişime geçebilirsiniz",
        "kuaför": "Pet Kuaför randevusu için 0506 785 67 46 numarasından ulaşabilirsiniz",
        "varsayılan": "Bunu tam anlayamadım. 🐶 'Adres', 'saat', 'mama' veya 'kuaför' gibi kelimeler kullanabilir misiniz?"
    };

    const chatWindow = document.getElementById('chatWindow');
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');
    
    // Global Fonksiyonlar
    window.toggleChat = function() {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            setTimeout(() => chatInput.focus(), 300);
        }
    };

    window.openChat = function() {
        if (!chatWindow.classList.contains('active')) {
            chatWindow.classList.add('active');
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

    function addMessage(text, className) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', className);
        messageDiv.textContent = text;
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