// ============================================================
// NAVBAR DROPDOWNS
// ============================================================
const dropdowns = [
    { button: "hireBtn", menu: "hireDropdown", arrow: "hireArrow" },
    { button: "servicesBtn", menu: "servicesDropdown", arrow: "servicesArrow" },
    { button: "solutionsBtn", menu: "solutionsDropdown", arrow: "solutionsArrow" },
    { button: "industriesBtn", menu: "industriesDropdown", arrow: "industriesArrow" },
    { button: "companyBtn", menu: "companyDropdown", arrow: "companyArrow" }
]

function closeDropdown(item) {
    const menu = document.getElementById(item.menu)
    const arrow = document.getElementById(item.arrow)
    if (menu) menu.classList.add("hidden")
    if (arrow) arrow.classList.remove("rotate-180")
}

function openOnly(activeItem) {
    dropdowns.forEach(item => {
        if (item.menu !== activeItem.menu) closeDropdown(item)
    })

    const menu = document.getElementById(activeItem.menu)
    const arrow = document.getElementById(activeItem.arrow)
    if (!menu || !arrow) return

    const shouldOpen = menu.classList.contains("hidden")
    menu.classList.toggle("hidden", !shouldOpen)
    arrow.classList.toggle("rotate-180", shouldOpen)
}

dropdowns.forEach(item => {
    const button = document.getElementById(item.button)
    if (button) {
        button.addEventListener("click", event => {
            event.stopPropagation()
            openOnly(item)
        })
    }
})

document.addEventListener("click", event => {
    if (!event.target.closest(".sticky")) {
        dropdowns.forEach(closeDropdown)
    }
})


// ============================================================
// AI USE-CASES CAROUSEL
// ============================================================
const track = document.getElementById("carouselTrack")
const prevBtn = document.getElementById("carouselPrev")
const nextBtn = document.getElementById("carouselNext")
const cards = document.querySelectorAll(".carousel-card")

let currentIndex = 0
let visibleCards = 3
let autoSlide

function updateVisibleCards() {
    visibleCards = window.innerWidth < 768 ? 1 : 3
}

function updateCarousel() {
    if (!track || !cards.length) return

    const cardWidth = cards[0].getBoundingClientRect().width
    const gap = 24
    track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`
}

function nextSlide() {
    if (!cards.length) return
    const maxIndex = Math.max(0, cards.length - visibleCards)
    currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0
    updateCarousel()
}

function prevSlide() {
    if (!cards.length) return
    const maxIndex = Math.max(0, cards.length - visibleCards)
    currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex
    updateCarousel()
}

if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        nextSlide()
        resetAutoSlide()
    })
}

if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        prevSlide()
        resetAutoSlide()
    })
}

function startAutoSlide() {
    if (!cards.length) return
    autoSlide = setInterval(nextSlide, 4000)
}

function resetAutoSlide() {
    clearInterval(autoSlide)
    startAutoSlide()
}


// ============================================================
// TESTIMONIAL CAROUSEL
// ============================================================

const testimonialTrack = document.getElementById("testimonialTrack")
const testimonialPrev = document.getElementById("testimonialPrev")
const testimonialNext = document.getElementById("testimonialNext")
const testimonialCards = document.querySelectorAll(".testimonial-card")
const testimonialDots = document.querySelectorAll(".testimonial-dot")

let testimonialIndex = 0
let testimonialVisible = 3
let testimonialTimer


function updateTestimonialVisible() {
    testimonialVisible = window.innerWidth < 768 ? 1 : 3
}


function updateTestimonials() {

    if (!testimonialTrack || !testimonialCards.length) return

    const cardWidth = testimonialCards[0].getBoundingClientRect().width
    const gap = 20

    testimonialTrack.style.transform =
        `translateX(-${testimonialIndex * (cardWidth + gap)}px)`

    updateTestimonialDots()
}


function nextTestimonial() {

    const maxIndex = Math.max(
        0,
        testimonialCards.length - testimonialVisible
    )

    if (testimonialIndex < maxIndex) {
        testimonialIndex++
    } else {
        testimonialIndex = 0
    }

    updateTestimonials()
}


function prevTestimonial() {

    const maxIndex = Math.max(
        0,
        testimonialCards.length - testimonialVisible
    )

    if (testimonialIndex > 0) {
        testimonialIndex--
    } else {
        testimonialIndex = maxIndex
    }

    updateTestimonials()
}


function updateTestimonialDots() {

    testimonialDots.forEach((dot, index) => {

        const active = index === testimonialIndex

        dot.classList.toggle("bg-black", active)
        dot.classList.toggle("bg-gray-300", !active)
        dot.classList.toggle("scale-125", active)

    })
}


if (testimonialNext) {

    testimonialNext.addEventListener("click", () => {

        nextTestimonial()
        resetTestimonialTimer()

    })

}


if (testimonialPrev) {

    testimonialPrev.addEventListener("click", () => {

        prevTestimonial()
        resetTestimonialTimer()

    })

}


testimonialDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        const maxIndex = Math.max(
            0,
            testimonialCards.length - testimonialVisible
        )

        testimonialIndex = Math.min(index, maxIndex)

        updateTestimonials()
        resetTestimonialTimer()

    })

})


function startTestimonialTimer() {

    clearInterval(testimonialTimer)

    testimonialTimer = setInterval(() => {

        nextTestimonial()

    }, 5000)

}


function resetTestimonialTimer() {

    clearInterval(testimonialTimer)
    startTestimonialTimer()

}


window.addEventListener("resize", () => {

    updateTestimonialVisible()

    const maxIndex = Math.max(
        0,
        testimonialCards.length - testimonialVisible
    )

    if (testimonialIndex > maxIndex) {
        testimonialIndex = maxIndex
    }

    updateTestimonials()

})


updateTestimonialVisible()
updateTestimonials()
startTestimonialTimer()


// ============================================================
// RESPONSIVE UPDATES
// ============================================================
window.addEventListener("resize", () => {

    updateVisibleCards()

    currentIndex = Math.min(
        currentIndex,
        Math.max(0, cards.length - visibleCards)
    )

    updateCarousel()

    updateTestimonialVisible()

    const maxTestimonialIndex = Math.max(
        0,
        testimonialCards.length - testimonialVisible
    )

    testimonialIndex = Math.min(
        testimonialIndex,
        maxTestimonialIndex
    )

    updateTestimonials()
})


updateVisibleCards()
updateCarousel()
startAutoSlide()

updateTestimonialVisible()
updateTestimonials()
startTestimonialTimer()


// ============================================================
// AI SOLUTIONS STACKED SCROLL
// ============================================================

function initAISolutionsStack() {

    const section = document.getElementById("ai-solutions-stack")

    if (!section) return

    const stackCards = Array.from(
        section.querySelectorAll(".ai-stack-card")
    )

    if (!stackCards.length) return

    let ticking = false

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max)
    }

    function updateAISolutionsStack() {

        ticking = false

        const viewportHeight = window.innerHeight

        stackCards.forEach((card, index) => {

            if (index === stackCards.length - 1) {
                card.style.transform = "scale(1)"
                card.style.filter = "brightness(1)"
                return
            }

            const nextCard = stackCards[index + 1]
            const nextTop = nextCard.getBoundingClientRect().top

            const start = viewportHeight * 0.92
            const end = viewportHeight * 0.28

            const progress = clamp(
                (start - nextTop) / (start - end),
                0,
                1
            )

            const scale = 1 - progress * 0.035
            const brightness = 1 - progress * 0.10

            card.style.transform = `scale(${scale})`
            card.style.filter = `brightness(${brightness})`
        })
    }

    function requestStackUpdate() {

        if (ticking) return

        ticking = true

        window.requestAnimationFrame(updateAISolutionsStack)
    }

    window.addEventListener(
        "scroll",
        requestStackUpdate,
        { passive: true }
    )

    window.addEventListener(
        "resize",
        requestStackUpdate
    )

    updateAISolutionsStack()
}

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initAISolutionsStack
    )

} else {

    initAISolutionsStack()

}


/* ============================================================
   AI INDUSTRIES SECTION
   Interactive + Auto Cycling
============================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const industrySection =
        document.getElementById("ai-industries");

    if (!industrySection) return;


    const industryItems =
        industrySection.querySelectorAll(".industry-item");

    const industryImage =
        document.getElementById("industry-image");

    const industryLabel =
        document.getElementById("industry-label");

    const industryTitle =
        document.getElementById("industry-title");

    const industryDescription =
        document.getElementById("industry-description");

    const industryNumber =
        document.getElementById("industry-number");

    const scrollIndicator =
        document.getElementById(
            "industry-scroll-indicator"
        );


    const personImage =
        document.getElementById(
            "industry-person-image"
        );

    const personName =
        document.getElementById(
            "industry-person-name"
        );

    const personRole =
        document.getElementById(
            "industry-person-role"
        );

    const personDescription =
        document.getElementById(
            "industry-person-description"
        );

    const personSkills =
        document.getElementById(
            "industry-person-skills"
        );


    const prevButton =
        document.getElementById(
            "industry-prev"
        );

    const nextButton =
        document.getElementById(
            "industry-next"
        );


    const industryList =
        document.getElementById(
            "industry-list"
        );


    const industries = [

        {
            name: "Artificial Intelligence (AI)",

            title:
                "Intelligent investment tracking & analysis",

            description:
                "AI-powered platforms designed to simplify complex data, automate analysis and help businesses make faster decisions.",

            image:
                "https://plavno.io/media/img/main-page/investment-tracking-analysis-app.webp"
        },


        {
            name: "Healthcare & MedTech",

            title:
                "Smarter healthcare experiences with AI",

            description:
                "Intelligent digital solutions that help healthcare teams process information, streamline workflows and improve patient experiences.",

            image:
                "https://plavno.io/media/img/main-page/investment-tracking-analysis-app.webp"
        },


        {
            name: "Cybersecurity",

            title:
                "AI-powered cybersecurity assessment",

            description:
                "Advanced security platforms designed to identify risks, analyze vulnerabilities and help organizations build safer digital environments.",

            image:
                "https://plavno.io/media/img/main-page/cybersecurity-assessment-finstore.webp"
        },


        {
            name: "LegalTech & eDiscovery",

            title:
                "Intelligent legal data discovery",

            description:
                "AI-powered workflows that help legal teams organize, analyze and process large amounts of information faster.",

            image:
                "https://plavno.io/media/img/main-page/investment-tracking-analysis-app.webp"
        },


        {
            name: "GovTech & Public Sector",

            title:
                "Digital platforms for modern government",

            description:
                "Secure and scalable digital solutions designed to simplify public services and improve citizen experiences.",

            image:
                "https://plavno.io/media/img/main-page/investment-tracking-analysis-app.webp"
        },


        {
            name: "SaaS",

            title:
                "Scalable SaaS products powered by AI",

            description:
                "Modern SaaS platforms built around automation, intelligent workflows and scalable cloud infrastructure.",

            image:
                "https://plavno.io/media/img/main-page/investment-tracking-analysis-app.webp"
        },


        {
            name: "Retail & eCommerce",

            title:
                "Intelligent retail & eCommerce",

            description:
                "AI-powered commerce experiences that help businesses understand customers, automate operations and increase conversions.",

            image:
                "https://plavno.io/media/img/main-page/investment-tracking-analysis-app.webp"
        }

    ];


    const teamMembers = [

        {
            name: "Pavel",

            role: "AI Team Lead",

            image:
                "https://plavno.io/media/img/new-main-page/team/Pavel.webp",

            description:
                "Builds scalable AI products focused on intelligent automation, modern interfaces and reliable real-time systems.",

            skills: [
                "AI",
                "React",
                "Next.js"
            ]
        },


        {
            name: "Anton",

            role: "Frontend Lead",

            image:
                "https://plavno.io/media/img/new-main-page/team/Anton.webp",

            description:
                "Creates fast, accessible and highly polished digital experiences using modern frontend technologies.",

            skills: [
                "TypeScript",
                "React",
                "SSR"
            ]
        },


        {
            name: "Clara",

            role: "AI Product Engineer",

            image:
                "https://plavno.io/media/img/new-main-page/team/Clara.webp",

            description:
                "Transforms complex product requirements into intuitive AI-powered experiences with a strong focus on usability.",

            skills: [
                "AI",
                "UX",
                "Product"
            ]
        }

    ];


    let currentIndustry = 0;

    let currentPerson = 0;

    let autoTimer = null;

    let isPaused = false;


    // ==========================================================
    // UPDATE INDUSTRY
    // ==========================================================

    function updateIndustry(index) {

        if (
            index < 0 ||
            index >= industries.length
        ) {
            return;
        }


        currentIndustry = index;

        const industry =
            industries[index];


        industryImage.classList.add(
            "opacity-0",
            "scale-[1.02]"
        );

        industryTitle.classList.add(
            "opacity-0"
        );

        industryDescription.classList.add(
            "opacity-0"
        );


        setTimeout(function () {

            industryImage.src =
                industry.image;

            industryImage.alt =
                industry.title;


            industryLabel.textContent =
                industry.name;


            industryTitle.textContent =
                industry.title;


            industryDescription.textContent =
                industry.description;


            industryNumber.textContent =
                String(index + 1).padStart(2, "0") +
                " / " +
                String(industries.length).padStart(2, "0");


            industryImage.classList.remove(
                "opacity-0",
                "scale-[1.02]"
            );

            industryTitle.classList.remove(
                "opacity-0"
            );

            industryDescription.classList.remove(
                "opacity-0"
            );

        }, 180);


        industryItems.forEach(
            function (item, itemIndex) {

                if (itemIndex === index) {

                    item.classList.remove(
                        "text-slate-500"
                    );

                    item.classList.add(
                        "text-blue-600",
                        "font-semibold",
                        "translate-x-1"
                    );

                } else {

                    item.classList.remove(
                        "text-blue-600",
                        "font-semibold",
                        "translate-x-1"
                    );

                    item.classList.add(
                        "text-slate-500"
                    );

                }

            }
        );


        // ======================================================
        // FIX:
        // Only scroll the internal industry list.
        // Do NOT use scrollIntoView(), because that can scroll
        // the entire webpage.
        // ======================================================

        const activeItem =
            industryItems[index];

        if (activeItem && industryList) {

            const targetTop =
                activeItem.offsetTop -
                (industryList.clientHeight / 2) +
                (activeItem.offsetHeight / 2);

            industryList.scrollTo({
                top: targetTop,
                behavior: "smooth"
            });

        }


        if (scrollIndicator) {

            const percentage =
                ((index + 1) /
                industries.length) * 100;

            scrollIndicator.style.height =
                percentage + "%";

        }

    }


    // ==========================================================
    // UPDATE TEAM MEMBER
    // ==========================================================

    function updatePerson(index) {

        if (
            index < 0 ||
            index >= teamMembers.length
        ) {
            return;
        }


        currentPerson = index;


        const person =
            teamMembers[index];


        personImage.classList.add(
            "opacity-0",
            "scale-95"
        );


        setTimeout(function () {

            personImage.src =
                person.image;

            personName.textContent =
                person.name;

            personRole.textContent =
                person.role;

            personDescription.textContent =
                person.description;


            personSkills.innerHTML =
                person.skills.map(
                    function (skill) {

                        return `
                            <span
                                class="rounded-full
                                       border
                                       border-slate-200
                                       bg-white
                                       px-2.5 py-1
                                       text-[10px]
                                       text-slate-500">

                                ${skill}

                            </span>
                        `;

                    }
                ).join("");


            personImage.classList.remove(
                "opacity-0",
                "scale-95"
            );

        }, 150);

    }


    // ==========================================================
    // NEXT INDUSTRY
    // ==========================================================

    function nextIndustry() {

        let next =
            currentIndustry + 1;


        if (next >= industries.length) {

            next = 0;

        }


        updateIndustry(next);

    }


    // ==========================================================
    // PREVIOUS INDUSTRY
    // ==========================================================

    function previousIndustry() {

        let previous =
            currentIndustry - 1;


        if (previous < 0) {

            previous =
                industries.length - 1;

        }


        updateIndustry(previous);

    }


    // ==========================================================
    // AUTO PLAY
    // ==========================================================

    function startAutoPlay() {

        stopAutoPlay();


        autoTimer =
            setInterval(
                function () {

                    if (!isPaused) {

                        nextIndustry();

                    }

                },
                5000
            );

    }


    function stopAutoPlay() {

        if (autoTimer) {

            clearInterval(autoTimer);

            autoTimer = null;

        }

    }
        // ==========================================================
    // CATEGORY CLICK
    // ==========================================================

    industryItems.forEach(
        function (item, index) {

            item.addEventListener(
                "click",
                function () {

                    updateIndustry(index);

                    // Restart timer after manual click
                    startAutoPlay();

                }
            );


            // Hover pauses auto switching
            item.addEventListener(
                "mouseenter",
                function () {

                    isPaused = true;

                }
            );


            item.addEventListener(
                "mouseleave",
                function () {

                    isPaused = false;

                }
            );

        }
    );


    // ==========================================================
    // PAUSE WHEN MOUSE IS OVER WHOLE SECTION
    // ==========================================================

    industrySection.addEventListener(
        "mouseenter",
        function () {

            isPaused = true;

        }
    );


    industrySection.addEventListener(
        "mouseleave",
        function () {

            isPaused = false;

        }
    );


    // ==========================================================
    // TEAM ARROWS
    // ==========================================================

    if (prevButton) {

        prevButton.addEventListener(
            "click",
            function () {

                let previous =
                    currentPerson - 1;


                if (previous < 0) {

                    previous =
                        teamMembers.length - 1;

                }


                updatePerson(previous);

            }
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                let next =
                    currentPerson + 1;


                if (
                    next >=
                    teamMembers.length
                ) {

                    next = 0;

                }


                updatePerson(next);

            }
        );

    }


    // ==========================================================
    // INITIALIZE
    // ==========================================================

    updateIndustry(0);

    updatePerson(0);

    startAutoPlay();

});