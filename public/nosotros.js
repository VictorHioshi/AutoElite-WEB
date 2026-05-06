/* ============================================
   NOSOTROS.JS - Sobre Nosotros Page Scripts
   AutoElite - Automotive Workshop Website
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // 1. COUNTER ANIMATION (IntersectionObserver)
    // ==========================================
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        if (!counters.length) return;

        const counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'), 10);
                    const duration = 2000; // 2 seconds
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        // Ease-out cubic for smooth deceleration
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const currentValue = Math.floor(easeOut * target);

                        counter.textContent = currentValue.toLocaleString('es-PE');

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target.toLocaleString('es-PE');
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    counterObserver.unobserve(counter);
                }
            });
        }, {
            threshold: 0.5
        });

        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });
    }

    animateCounters();


    // ==========================================
    // 2. SCROLL REVEAL ANIMATIONS
    // ==========================================
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        if (!revealElements.length) return;

        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    }

    initScrollReveal();


    // ==========================================
    // 3. TIMELINE SCROLL REVEAL WITH STAGGERED DELAYS
    // ==========================================
    function initTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        if (!timelineItems.length) return;

        const timelineObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    const content = item.querySelector('.timeline-content');
                    const dot = item.querySelector('.timeline-dot');

                    // Apply staggered animation based on item index
                    const index = Array.from(timelineItems).indexOf(item);
                    const delay = index * 150; // 150ms stagger between each item

                    setTimeout(function () {
                        if (content) {
                            content.style.opacity = '1';
                            content.style.transform = 'translateY(0)';
                        }
                        if (dot) {
                            dot.style.transform = 'translate(-50%, 0) scale(1)';
                            dot.style.opacity = '1';
                        }
                    }, delay);

                    timelineObserver.unobserve(item);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -80px 0px'
        });

        timelineItems.forEach(function (item) {
            const content = item.querySelector('.timeline-content');
            const dot = item.querySelector('.timeline-dot');

            // Set initial hidden state
            if (content) {
                content.style.opacity = '0';
                content.style.transform = 'translateY(30px)';
                content.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
            if (dot) {
                dot.style.opacity = '0';
                dot.style.transform = 'translate(-50%, -50%) scale(0)';
                dot.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            }

            timelineObserver.observe(item);
        });
    }

    initTimelineAnimation();


    // ==========================================
    // 4. VALUE CARDS SCROLL ANIMATION
    // ==========================================
    function initValueCardsAnimation() {
        const valueCards = document.querySelectorAll('.value-card');
        if (!valueCards.length) return;

        const cardObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const index = Array.from(valueCards).indexOf(card);
                    const delay = index * 100; // 100ms stagger

                    setTimeout(function () {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, delay);

                    cardObserver.unobserve(card);
                }
            });
        }, {
            threshold: 0.15
        });

        valueCards.forEach(function (card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            cardObserver.observe(card);
        });
    }

    initValueCardsAnimation();


    // ==========================================
    // 5. TEAM CARDS SCROLL ANIMATION
    // ==========================================
    function initTeamCardsAnimation() {
        const teamCards = document.querySelectorAll('.team-card');
        if (!teamCards.length) return;

        const teamObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const index = Array.from(teamCards).indexOf(card);
                    const delay = index * 120;

                    setTimeout(function () {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, delay);

                    teamObserver.unobserve(card);
                }
            });
        }, {
            threshold: 0.15
        });

        teamCards.forEach(function (card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            teamObserver.observe(card);
        });
    }

    initTeamCardsAnimation();


    // ==========================================
    // 6. SMOOTH SCROLL FOR ANCHOR LINKS (if any)
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});