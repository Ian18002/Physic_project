(function () {
    "use strict";

    const header = document.getElementById("site-header");
    const isHome = document.body.classList.contains("home-page");
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        if (!header) {
            return;
        }

        const currentScrollY = window.scrollY;

        if (currentScrollY > 40) {
            header.classList.add("is-solid");
        } else {
            header.classList.remove("is-solid");
        }

        if (isHome) {
            if (currentScrollY > lastScrollY && currentScrollY > 360) {
                header.classList.add("is-hidden");
            } else if (currentScrollY < lastScrollY) {
                header.classList.remove("is-hidden");
            }
        } else {
            header.classList.remove("is-hidden");
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    updateHeader();

    const revealItems = document.querySelectorAll("[data-reveal]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
        revealItems.forEach(function (item) {
            item.classList.add("is-visible");
        });
    } else {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
        );

        revealItems.forEach(function (item) {
            observer.observe(item);
        });
    }
})();
