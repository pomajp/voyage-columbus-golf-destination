// Detect if mobile device
const isMobile = () => window.innerWidth <= 768;

// Initialize AOS with mobile optimization
AOS.init({
    duration: isMobile() ? 600 : 1000,  // Faster animations on mobile
    once: true,
    offset: isMobile() ? 50 : 100,  // Less offset on mobile
    disable: false  // Keep animations but optimize them
});

// Navigation visibility and progress bar
window.addEventListener('scroll', function() {
    const nav = document.getElementById('nav');
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const scrollPercentage = (scrollPosition / scrollHeight) * 100;
    
    // Update progress bar
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = scrollPercentage + '%';
    }
    
    // Show/hide navigation
    if (scrollPosition > 100) {
        nav.classList.add('visible');
    } else {
        nav.classList.remove('visible');
    }
    
    // Update active section dot
    updateActiveDot();
});

// Update active navigation dot based on scroll position
function updateActiveDot() {
    const sections = document.querySelectorAll('.section, .hero, .footer');
    const dots = document.querySelectorAll('.nav-dot');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section.id;
        }
    });
    
    // Update navigation dots
    dots.forEach(dot => {
        if (dot.dataset.section === currentSection) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Update navigation links
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === '#' + currentSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Navigation dots click handler
document.addEventListener('DOMContentLoaded', function() {
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const sectionId = this.dataset.section;
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Smooth scrolling for navigation links, logo, and next buttons
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            // Special handling for mobile next buttons
            if (this.classList.contains('next-section') && isMobile()) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            } else {
                target.scrollIntoView({
                    behavior: isMobile() ? 'auto' : 'smooth',
                    block: 'start'
                });
            }
            
            // Update the current section index for keyboard navigation
            const sectionIds = ['hero', 'opportunity', 'vision', 'courses', 'experience', 'youth', 'financials', 'team', 'ask'];
            const targetSectionId = targetId.replace('#', '');
            const index = sectionIds.indexOf(targetSectionId);
            if (index !== -1) {
                currentSectionIndex = index;
            }
        }
    });
});

// Course Mix & Match Calculator
const courseCombinations = {
    'woods': { holes: 9, par: 36, time: 90, name: 'The Woods' },
    'plains': { holes: 6, par: 23, time: 70, name: 'The Plains' },
    'lakes': { holes: 3, par: 9, time: 40, name: 'The Lakes' }
};

let selectedCourses = [];

function updateCombination() {
    const display = document.getElementById('combination-display');
    const stats = document.getElementById('combination-stats');
    
    if (!display || !stats) return;
    
    if (selectedCourses.length === 0) {
        display.innerHTML = 'Select courses to build your round';
        stats.innerHTML = '';
        return;
    }
    
    let totalHoles = 0;
    let totalPar = 0;
    let totalTime = 0;
    let courseNames = [];
    
    selectedCourses.forEach(course => {
        const data = courseCombinations[course];
        totalHoles += data.holes;
        totalPar += data.par;
        totalTime += data.time;
        courseNames.push(data.name);
    });
    
    display.innerHTML = courseNames.join(' + ');
    stats.innerHTML = `
        <span>${totalHoles} Holes</span>
        <span>Par ${totalPar}</span>
        <span>~${totalTime} Minutes</span>
    `;
}

// Add course selection functionality
document.addEventListener('DOMContentLoaded', function() {
    // Course card selection
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('click', function() {
            const courseType = this.classList.contains('woods') ? 'woods' : 
                              this.classList.contains('plains') ? 'plains' : 'lakes';
            
            // Toggle selection
            if (selectedCourses.includes(courseType)) {
                const index = selectedCourses.indexOf(courseType);
                selectedCourses.splice(index, 1);
                this.classList.remove('selected');
            } else if (selectedCourses.length < 2) {
                selectedCourses.push(courseType);
                this.classList.add('selected');
            }
            
            updateCombination();
        });
    });
    
    // Revenue Chart
    const ctx = document.getElementById('revenueChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [
                    'Green Fees',
                    'Practice/Instruction',
                    'Food & Beverage',
                    'Events/Corporate',
                    'Memberships',
                    'Merchandise'
                ],
                datasets: [{
                    data: [5000000, 2500000, 2000000, 1500000, 1000000, 500000],
                    backgroundColor: [
                        '#4a7c2e',
                        '#8bc34a',
                        '#ffb700',
                        '#4a90e2',
                        '#764ba2',
                        '#667eea'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        bottom: 20
                    }
                },
                plugins: {
                    legend: {
                        position: isMobile() ? 'bottom' : 'right',
                        labels: {
                            color: '#fff',
                            font: {
                                size: isMobile() ? 10 : 12,
                            },
                            padding: isMobile() ? 8 : 15,
                            boxWidth: isMobile() ? 12 : 20
                        },
                        padding: 20
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(context.parsed);
                                return label + ': ' + value;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Add example combinations showcase
    const exampleCombos = [
        { courses: ['woods', 'woods'], desc: 'Full 18 Championship Round' },
        { courses: ['plains', 'plains'], desc: 'Social 12 with Friends' },
        { courses: ['woods', 'lakes'], desc: 'Warm-up + Championship 9' },
        { courses: ['plains', 'lakes'], desc: 'Family Fun Day' },
        { courses: ['lakes', 'lakes'], desc: 'Quick 6 with Kids' }
    ];
    
    // Animate numbers on scroll
    const animateNumbers = () => {
        const numbers = document.querySelectorAll('.stat-number, .tam-number');
        numbers.forEach(number => {
            const rect = number.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                if (!number.classList.contains('animated')) {
                    number.classList.add('animated');
                    const target = number.innerText;
                    const isMillions = target.includes('M');
                    const isBillions = target.includes('B');
                    const isPercentage = target.includes('%');
                    
                    let endValue = parseFloat(target.replace(/[^0-9.]/g, ''));
                    let startValue = 0;
                    let duration = 2000;
                    let startTime = null;
                    
                    const animate = (currentTime) => {
                        if (!startTime) startTime = currentTime;
                        const progress = Math.min((currentTime - startTime) / duration, 1);
                        
                        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                        const currentValue = startValue + (endValue - startValue) * easeOutQuart;
                        
                        if (isMillions) {
                            number.innerText = currentValue.toFixed(0) + 'M';
                        } else if (isBillions) {
                            number.innerText = '$' + currentValue.toFixed(0) + 'B';
                        } else if (isPercentage) {
                            number.innerText = currentValue.toFixed(0) + '%';
                        } else {
                            number.innerText = currentValue.toFixed(0);
                        }
                        
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };
                    
                    requestAnimationFrame(animate);
                }
            }
        });
    };
    
    window.addEventListener('scroll', animateNumbers);
    animateNumbers(); // Run once on load
});

// Contact form modal
function showContact() {
    alert('Contact form would open here. For now, please reach out directly!');
}

// Image gallery for Mountains section
const galleryImages = [
    {
        src: 'images/putting-night.jpg',
        caption: 'Night-lit championship putting green with dramatic lighting and fire pit gathering areas',
        credit: 'Punchbowl at Bandon Dunes'
    },
    {
        src: 'images/putting-standrews.jpg',
        caption: 'Inspired by the legendary Himalayas putting course at St Andrews',
        credit: 'The Himalayas at St Andrews'
    },
    {
        src: 'images/pinehurst-aerial.jpg',
        caption: 'Pinehurst-style design bringing world-class putting to Ohio',
        credit: 'Thistle Dew at Pinehurst'
    },
    {
        src: 'images/pinehurst-green.jpg',
        caption: 'Championship-caliber greens with social gathering spaces',
        credit: 'The Cradle at Pinehurst'
    }
];

function changeImage(index) {
    const mainImage = document.getElementById('mainImage');
    const caption = document.getElementById('imageCaption');
    const credit = document.getElementById('imageCredit');
    const thumbs = document.querySelectorAll('.thumb');
    
    if (mainImage && caption && galleryImages[index]) {
        mainImage.src = galleryImages[index].src;
        caption.textContent = galleryImages[index].caption;
        if (credit) {
            credit.textContent = galleryImages[index].credit;
        }
        
        thumbs.forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }
}

// Parallax effect for hero (desktop only)
if (!isMobile()) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-bg');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Keyboard navigation for sections (desktop only)
let currentSectionIndex = 0;
const sectionIds = ['hero', 'opportunity', 'vision', 'courses', 'experience', 'youth', 'financials', 'team', 'ask'];

// Only enable keyboard navigation on desktop
if (!isMobile()) {
    document.addEventListener('keydown', function(e) {
        // Arrow down or Page Down
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            if (currentSectionIndex < sectionIds.length - 1) {
                currentSectionIndex++;
                document.getElementById(sectionIds[currentSectionIndex]).scrollIntoView({ behavior: 'smooth' });
            }
        }
        // Arrow up or Page Up
        else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            if (currentSectionIndex > 0) {
                currentSectionIndex--;
                document.getElementById(sectionIds[currentSectionIndex]).scrollIntoView({ behavior: 'smooth' });
            }
        }
        // Home key
        else if (e.key === 'Home') {
            e.preventDefault();
            currentSectionIndex = 0;
            document.getElementById(sectionIds[0]).scrollIntoView({ behavior: 'smooth' });
        }
        // End key
        else if (e.key === 'End') {
            e.preventDefault();
            currentSectionIndex = sectionIds.length - 1;
            document.getElementById(sectionIds[currentSectionIndex]).scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Update current section index on scroll
window.addEventListener('scroll', function() {
    const sections = sectionIds.map(id => document.getElementById(id));
    sections.forEach((section, index) => {
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top >= -100 && rect.top <= 100) {
                currentSectionIndex = index;
            }
        }
    });
});
