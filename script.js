// ===== COUNTDOWN TIMER (Last PO: Rabu 8 Oktober 2026, 23:59) =====
const deadline = new Date('2026-10-08T23:59:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const diff = deadline - now;
    const el = document.getElementById('countdownTimer');
    if (!el) return;

    if (diff <= 0) {
        el.textContent = 'CLOSED';
        el.style.color = '#ff6b6b';
        document.querySelector('.info-banner').style.background = '#333';
        clearInterval(countdownInterval);
        return;
    }

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((diff % (1000 * 60)) / 1000);

    if (days > 0) {
        el.textContent = `${days}h ${String(hours).padStart(2,'0')}j ${String(mins).padStart(2,'0')}m`;
    } else {
        el.textContent = `${String(hours).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

const snowContainer = document.getElementById('snowContainer');
const snowflakeChars = ['❄', '❅', '❆', '✦', '✧'];
const totalFlakes = 40;

function createSnowflake() {
    const flake = document.createElement('span');
    flake.classList.add('snowflake');
    flake.textContent = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];

    const size = Math.random() * 14 + 8; // 8–22px
    const startX = Math.random() * 100; // % across viewport
    const duration = Math.random() * 8 + 6; // 6–14s
    const delay = Math.random() * 10; // stagger

    flake.style.cssText = `
        left: ${startX}vw;
        font-size: ${size}px;
        animation-duration: ${duration}s;
        animation-delay: -${delay}s;
        opacity: ${Math.random() * 0.5 + 0.3};
    `;

    snowContainer.appendChild(flake);
}

for (let i = 0; i < totalFlakes; i++) createSnowflake();


// ===== CARD ENTRANCE ANIMATION =====
document.addEventListener('DOMContentLoaded', () => {

    const cards = document.querySelectorAll('.menu-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const idx = Array.from(cards).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, idx * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.97)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.3,0.64,1)';
        observer.observe(card);
    });
});
