// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navigation visibility
window.addEventListener('scroll', function() {
    const nav = document.getElementById('nav');
    if (window.scrollY > 100) {
        nav.classList.add('visible');
    } else {
        nav.classList.remove('visible');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
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
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#fff',
                            font: {
                                size: 12
                            },
                            padding: 20
                        }
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

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-bg');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
