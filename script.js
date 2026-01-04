document.addEventListener("DOMContentLoaded", function () {
    
    // ============================================
    //  1. SCROLL PROGRESS BAR (NEW)
    // ============================================
    const progressBar = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        if(progressBar) {
            progressBar.style.width = scrollPercentage + '%';
        }
    });

    // ============================================
    //  2. MAGNETIC BUTTONS (NEW - PRO FEATURE)
    // ============================================
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;

            // বাটন মাউসের দিকে সামান্য সরে আসবে (Strength: 0.3)
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            // মাউস সরালে আবার আগের জায়গায় ফিরে যাবে
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // ============================================
    //  3. HERO IMAGE PARALLAX (NEW)
    // ============================================
    const heroSection = document.querySelector('.hero');
    const heroImg = document.querySelector('.hero-img img.active');

    if(heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 90;
            const y = (window.innerHeight - e.pageY * 2) / 90;

            // হিরো ইমেজ উল্টো দিকে নড়বে
            const currentImg = document.querySelector('.hero-img img.active');
            if(currentImg){
                currentImg.style.transform = `translateX(${x}px) translateY(${y}px)`;
            }
        });
    }

    // ============================================
    //  4. CUSTOM CURSOR (OLD)
    // ============================================
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (cursorDot && cursorOutline) {
        window.addEventListener("mousemove", function (e) {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
    }

    // ============================================
    //  5. NUMBER COUNTER (OLD)
    // ============================================
    let valueDisplays = document.querySelectorAll(".about-grid h2");
    let interval = 4000;
    
    // Observer ব্যবহার করা হয়েছে যাতে স্ক্রল করে সামনে এলেই কাউন্ট শুরু হয়
    let observerOptions = { threshold: 0.5 };
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let valueDisplay = entry.target;
                let startValue = 0;
                let endValue = parseInt(valueDisplay.getAttribute("data-val"));
                let symbol = valueDisplay.textContent.replace(/[0-9]/g, '');
                
                if (isNaN(endValue)) endValue = parseInt(valueDisplay.textContent);

                if (!isNaN(endValue) && endValue > 0) {
                    let duration = Math.floor(interval / endValue);
                    let counter = setInterval(function () {
                        startValue += 1;
                        valueDisplay.textContent = startValue + symbol;
                        if (startValue == endValue) {
                            clearInterval(counter);
                        }
                    }, duration);
                }
                observer.unobserve(valueDisplay); // একবার কাউন্ট হয়ে গেলে আর হবে না
            }
        });
    }, observerOptions);

    valueDisplays.forEach(display => {
        observer.observe(display);
    });

    // ============================================
    //  6. 3D TILT EFFECT (OLD)
    // ============================================
    const cards = document.querySelectorAll('.glass-card, .project-card, .skill-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            let elRect = card.getBoundingClientRect();
            let x = e.clientX - elRect.left;
            let y = e.clientY - elRect.top;
            let midCardWidth = elRect.width / 2;
            let midCardHeight = elRect.height / 2;
            let angleX = (x - midCardWidth) / 8;
            let angleY = (y - midCardHeight) / 8;

            card.style.transform = `perspective(1000px) rotateX(${-(angleY)}deg) rotateY(${angleX}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        });
    });

});

let docTitle = document.title;
window.addEventListener("blur", () => {
    document.title = "Come Back! 😭 | Avijit Paul";
});
window.addEventListener("focus", () => {
    document.title = docTitle;
});