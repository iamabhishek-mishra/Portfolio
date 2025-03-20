// Theme Toggle with Mouse Position
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Track mouse position for theme transition effect
document.addEventListener('mousemove', (e) => {
    body.style.setProperty('--x', `${e.clientX}px`);
    body.style.setProperty('--y', `${e.clientY}px`);
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    updateThemeIcon();
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

function updateThemeIcon() {
    icon.classList.toggle('fa-moon', !body.classList.contains('dark-mode'));
    icon.classList.toggle('fa-sun', body.classList.contains('dark-mode'));
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Project Data
const projects = [
    {
        title: "AI-Powered Face Recognition",
        description: "Advanced facial recognition system using deep learning",
        fullDescription: `A state-of-the-art facial recognition system that utilizes deep learning and computer vision techniques. 
        Features include real-time face detection, emotion analysis, and multi-face tracking.`,
        technologies: ["Python", "TensorFlow", "OpenCV", "Deep Learning"],
        image: "https://via.placeholder.com/600x400?text=Face+Recognition",
        github: "https://github.com/iamabhishek-mishra/face-recognition",
        demo: "https://demo-link.com",
        category: "AI/ML"
    },
    {
        title: "Smart Healthcare Analytics",
        description: "Healthcare monitoring and prediction system",
        fullDescription: `An intelligent healthcare analytics platform that uses machine learning to predict patient health risks 
        and provide real-time monitoring of vital signs.`,
        technologies: ["Python", "Scikit-learn", "TensorFlow", "Flask"],
        image: "https://via.placeholder.com/600x400?text=Healthcare+Analytics",
        github: "https://github.com/iamabhishek-mishra/healthcare-analytics",
        demo: "https://demo-link.com",
        category: "Healthcare"
    },
    {
        title: "Intelligent Traffic System",
        description: "AI-based traffic management solution",
        fullDescription: `Smart traffic management system that uses computer vision and deep learning to optimize traffic flow, 
        detect violations, and provide real-time analytics.`,
        technologies: ["Python", "OpenCV", "TensorFlow", "IoT"],
        image: "https://via.placeholder.com/600x400?text=Traffic+System",
        github: "https://github.com/iamabhishek-mishra/traffic-system",
        demo: "https://demo-link.com",
        category: "Computer Vision"
    },
    {
        title: "NLP Research Tool",
        description: "Advanced natural language processing system",
        fullDescription: `A comprehensive NLP tool for text analysis, sentiment analysis, and language processing. 
        Includes features for text classification, named entity recognition, and language translation.`,
        technologies: ["Python", "NLTK", "SpaCy", "Transformers"],
        image: "https://via.placeholder.com/600x400?text=NLP+Tool",
        github: "https://github.com/iamabhishek-mishra/nlp-tool",
        demo: "https://demo-link.com",
        category: "NLP"
    }
];

// Create Modal Container
const modalContainer = document.createElement('div');
modalContainer.className = 'modal';
modalContainer.innerHTML = `
    <div class="modal-content">
        <span class="modal-close">&times;</span>
        <div class="project-details">
            <div class="project-image">
                <img src="" alt="Project Image">
            </div>
            <div class="project-info">
                <h2></h2>
                <div class="project-technologies"></div>
                <p class="project-description"></p>
                <div class="project-links">
                    <a href="#" class="btn primary github-link" target="_blank">View on GitHub</a>
                    <a href="#" class="btn secondary demo-link" target="_blank">Live Demo</a>
                </div>
            </div>
        </div>
    </div>
`;
document.body.appendChild(modalContainer);

// Populate Projects Grid
const projectGrid = document.querySelector('.project-grid');

projects.forEach((project, index) => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.style.animationDelay = `${index * 0.2}s`;
    projectCard.dataset.category = project.category;

    projectCard.innerHTML = `
        <div class="project-card-inner">
            <div class="project-card-front">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-content">
                    <div>
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                    </div>
                    <div class="project-technologies">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
            <div class="project-card-back">
                <h3>${project.title}</h3>
                <p>${project.fullDescription}</p>
                <div class="project-links">
                    <a href="${project.github}" class="primary" target="_blank" rel="noopener">
                        <i class="fab fa-github"></i> View Code
                    </a>
                    <a href="${project.demo}" class="secondary" target="_blank" rel="noopener">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                </div>
            </div>
        </div>
    `;

    projectGrid.appendChild(projectCard);
});

// Intersection Observer for Project Cards
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            projectObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(card => {
    projectObserver.observe(card);
});

// Close Modal
const modalClose = document.querySelector('.modal-close');
modalClose.addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close Modal on Outside Click
window.addEventListener('click', (e) => {
    const modal = document.querySelector('.modal');
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Scroll Animations
const scrollElements = document.querySelectorAll('.scroll-animate');

const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= 
        ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
    );
};

const displayScrollElement = (element) => {
    element.classList.add('active');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Initialize scroll animations
handleScrollAnimation();

// Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#3b82f6'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#3b82f6',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const texts = ['Full Stack Developer', 'AI/ML Engineer', 'Problem Solver'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

// Start typing animation
type();

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

// Observe elements with animation
document.querySelectorAll('.info-card, .project-card, .contact-item').forEach((el) => {
    observer.observe(el);
});

// Project Card Hover Effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Smooth Scroll
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

// Update particles color based on theme
function updateParticlesColor() {
    const isDark = body.classList.contains('dark-mode');
    const color = isDark ? '#60a5fa' : '#3b82f6';
    
    if (window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.particles.color.value = color;
        window.pJSDom[0].pJS.particles.line_linked.color = color;
        window.pJSDom[0].pJS.fn.particlesRefresh();
    }
}

// Update particles color when theme changes
themeToggle.addEventListener('click', updateParticlesColor);

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Quick Info Cards Data
const quickInfoData = {
    education: {
        icon: 'fa-graduation-cap',
        title: 'Education',
        details: [
            {
                title: 'BE CSE (AIML)',
                institution: 'Chandigarh University',
                year: '2022-2026',
                score: 'JEE Mains: 94.6'
            },
            {
                title: '12th Grade',
                institution: 'CBSE Board',
                year: '2020-2022',
                score: 'Percentage: 95%'
            },
            {
                title: '10th Grade',
                institution: 'CBSE Board',
                year: '2018-2020',
                score: 'Percentage: 92%'
            }
        ]
    },
    experience: {
        icon: 'fa-briefcase',
        title: 'Experience',
        details: [
            {
                title: 'Research Intern',
                institution: 'IIT (Indian School of Mines)',
                year: '2023-Present',
                description: 'Working on AI/ML projects'
            },
            {
                title: 'Freelance Developer',
                institution: 'Self-employed',
                year: '2022-Present',
                description: 'AI/ML and Web Development projects'
            },
            {
                title: 'Web Development Intern',
                institution: 'Tech Company',
                year: '2022',
                description: 'Frontend and Backend Development'
            }
        ]
    },
    skills: {
        icon: 'fa-code',
        title: 'Skills',
        details: [
            {
                category: 'Programming',
                skills: ['Python', 'Java', 'JavaScript', 'HTML/CSS']
            },
            {
                category: 'AI/ML',
                skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV']
            },
            {
                category: 'Web Development',
                skills: ['React', 'Node.js', 'Django', 'Flask']
            }
        ]
    }
};

// Create Quick Info Cards
function createQuickInfoCards() {
    const quickInfoGrid = document.querySelector('.quick-info-grid');
    if (!quickInfoGrid) return;

    Object.entries(quickInfoData).forEach(([key, data]) => {
        const card = document.createElement('div');
        card.className = 'quick-info-card';
        
        // Create the front of the card
        const frontContent = `
            <div class="card-front">
                <i class="fas ${data.icon}"></i>
                <h3>${data.title}</h3>
            </div>
        `;

        // Create the back of the card with tab navigation
        let backContent = '';
        if (key === 'education') {
            backContent = `
                <div class="card-back">
                    <div class="info-content">
                        ${data.details.map(detail => `
                            <div class="info-item">
                                <h4>${detail.title}</h4>
                                <p class="institution">${detail.institution}</p>
                                <p class="year">${detail.year}</p>
                                ${detail.score ? `<p class="score">${detail.score}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } else if (key === 'skills') {
            backContent = `
                <div class="card-back">
                    <div class="info-content">
                        <div class="tab-buttons">
                            <button class="tab-btn active" data-tab="programming">Programming</button>
                            <button class="tab-btn" data-tab="aiml">AI/ML</button>
                            <button class="tab-btn" data-tab="web">Web Dev</button>
                        </div>
                        <div class="tab-content">
                            ${data.details.map((detail, index) => `
                                <div class="tab-pane ${index === 0 ? 'active' : ''}" id="${detail.category.toLowerCase().replace('/', '')}">
                                    <div class="skills-preview">
                                        ${detail.skills.map(skill => `<span>${skill}</span>`).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        } else if (key === 'experience') {
            // Keep existing experience card structure
            backContent = `
                <div class="card-back">
                    <div class="info-content">
                        ${data.details.map(detail => `
                            <div class="info-item">
                                <h4>${detail.title}</h4>
                                <p class="institution">${detail.institution}</p>
                                <p class="year">${detail.year}</p>
                                ${detail.description ? `<p class="description">${detail.description}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        card.innerHTML = frontContent + backContent;
        quickInfoGrid.appendChild(card);

        // Add tab switching functionality
        const tabButtons = card.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetTab = e.target.dataset.tab;
                const tabContent = card.querySelector(`#${targetTab}`);
                
                // Update active states
                tabButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                // Show selected content
                card.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('active');
                });
                tabContent.classList.add('active');
            });
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createQuickInfoCards();
    setupInfoCards();
    
    // Add fade-in effect for brief info
    const briefInfo = document.querySelector('.brief-info');
    if (briefInfo) {
        briefInfo.style.opacity = '1';
    }

    // Project Categories Functionality
    const categoryCards = document.querySelectorAll('.category-card');
    const projectGrid = document.querySelector('.project-grid');

    // Add animation classes to category cards
    categoryCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
    });

    // Handle category card clicks
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            filterProjects(category);
            
            // Update active state
            categoryCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });

    // Filter projects by category
    function filterProjects(category) {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            if (card.dataset.category === category || category === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Initialize with all projects
    filterProjects('all');
});

// Setup Info Cards
function setupInfoCards() {
    const infoCards = document.querySelectorAll('.info-card');
    
    infoCards.forEach(card => {
        const header = card.querySelector('.card-header');
        const content = card.querySelector('.card-content');
        const icon = card.querySelector('.expand-icon');
        
        if (header && content && icon) {
            header.addEventListener('click', () => {
                content.style.maxHeight = content.style.maxHeight ? null : '500px';
                icon.style.transform = content.style.maxHeight ? 'rotate(180deg)' : 'rotate(0)';
            });
        }
    });
}

// Project Modal Functionality
function openProjectModal(project) {
    const modal = document.querySelector('.modal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <span class="modal-close">&times;</span>
        <div class="project-details">
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.fullDescription}</p>
            <div class="tech-stack">
                ${project.technologies.map(tech => `
                    <span class="tech-tag">${tech}</span>
                `).join('')}
            </div>
            <div class="project-links">
                <a href="${project.github}" class="primary" target="_blank">
                    <i class="fab fa-github"></i> View Code
                </a>
                <a href="${project.demo}" class="secondary" target="_blank">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    const closeBtn = modalContent.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.querySelector('.modal');
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Project Categories
document.addEventListener('DOMContentLoaded', () => {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            window.location.href = `${category}-projects.html`;
        });

        // Add hover animation
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

// Project Data Structure
const projectsData = {
    'ai-ml': [
        {
            title: 'AI-Powered Face Recognition',
            description: 'Advanced facial recognition system using deep learning',
            fullDescription: `A state-of-the-art facial recognition system that utilizes deep learning and computer vision techniques. 
            Features include real-time face detection, emotion analysis, and multi-face tracking.`,
            technologies: ['Python', 'TensorFlow', 'OpenCV', 'Deep Learning'],
            features: [
                'Real-time face detection and tracking',
                'Emotion analysis and recognition',
                'Multi-face tracking capability',
                'High accuracy and performance'
            ],
            implementation: `The system is built using TensorFlow and OpenCV, implementing state-of-the-art deep learning models 
            for facial recognition. It uses a convolutional neural network (CNN) architecture for feature extraction and 
            classification.`,
            image: 'path/to/face-recognition-image.jpg',
            github: 'https://github.com/username/face-recognition',
            demo: 'https://demo-link.com',
            date: '2023',
            status: 'Active Development'
        }
        // Add more AI/ML projects here
    ],
    'iot': [
        {
            title: 'Smart Home Automation',
            description: 'IoT-based home automation system',
            fullDescription: `A comprehensive home automation system that integrates various IoT devices and sensors 
            to create a smart living environment.`,
            technologies: ['Raspberry Pi', 'Arduino', 'MQTT', 'Node.js'],
            features: [
                'Remote device control',
                'Energy monitoring',
                'Automated scheduling',
                'Mobile app integration'
            ],
            implementation: `The system uses a Raspberry Pi as the central hub, communicating with various sensors and 
            actuators through MQTT protocol. A Node.js backend handles device management and user interactions.`,
            image: 'path/to/smart-home-image.jpg',
            github: 'https://github.com/username/smart-home',
            demo: 'https://demo-link.com',
            date: '2023',
            status: 'Completed'
        }
        // Add more IoT projects here
    ]
    // Add more categories here
};

// Load Project Details
function loadProjectDetails(category, projectId) {
    const project = projectsData[category][projectId];
    if (!project) return;

    // Update page title
    document.title = `${project.title} - Project Details`;

    // Update project information
    document.querySelector('.project-title').textContent = project.title;
    document.querySelector('.category-tag').textContent = category.toUpperCase();
    document.querySelector('.project-image img').src = project.image;
    document.querySelector('.project-description').textContent = project.fullDescription;

    // Update technology stack
    const techStack = document.querySelector('.tech-stack');
    techStack.innerHTML = project.technologies
        .map(tech => `<span>${tech}</span>`)
        .join('');

    // Update features list
    const featureList = document.querySelector('.feature-list');
    featureList.innerHTML = project.features
        .map(feature => `<li>${feature}</li>`)
        .join('');

    // Update implementation details
    document.querySelector('.implementation-details').textContent = project.implementation;

    // Update sidebar information
    document.querySelector('.project-date').textContent = project.date;
    document.querySelector('.project-status').textContent = project.status;

    // Update action buttons
    document.querySelector('.action-buttons .primary').href = project.github;
    document.querySelector('.action-buttons .secondary').href = project.demo;
}

// Handle URL parameters to load specific project
function loadProjectFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const projectId = urlParams.get('id');

    if (category && projectId) {
        loadProjectDetails(category, projectId);
    }
}

// Initialize project details if on project detail page
if (document.querySelector('.project-page')) {
    loadProjectFromURL();
}

// Add cursor movement handler for hero section
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        document.addEventListener('mousemove', function(e) {
            const rect = hero.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            hero.style.setProperty('--x', `${x}%`);
            hero.style.setProperty('--y', `${y}%`);
        });
    }
}); 