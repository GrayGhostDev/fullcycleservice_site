// Create the js directory if it doesn't exist
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('show');
            
            // Animate the hamburger icon
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Chatbot Widget Toggle
    const chatbotWidget = document.getElementById('chatbot-widget');
    const chatWindow = document.querySelector('.chat-window');
    const openChatBtn = document.getElementById('open-chat');
    
    if (chatbotWidget) {
        chatbotWidget.addEventListener('click', function() {
            // Create and show the chat window
            const chatWindowContainer = document.createElement('div');
            chatWindowContainer.className = 'chat-window-container';
            chatWindowContainer.innerHTML = `
                <div class="chat-window">
                    <div class="chat-header">
                        <h3><i class="fas fa-robot"></i> FCS Assistant</h3>
                        <button class="close-chat"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="chat-messages">
                        <div class="message bot">
                            <p>Hello! I'm the Full Cycle Services AI assistant. How can I help you today?</p>
                        </div>
                    </div>
                    <div class="chat-input">
                        <input type="text" placeholder="Type your message...">
                        <button class="voice-input"><i class="fas fa-microphone"></i></button>
                        <button class="send-message"><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(chatWindowContainer);
            
            // Add event listener to close button
            const closeBtn = chatWindowContainer.querySelector('.close-chat');
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(chatWindowContainer);
            });
            
            // Add event listener to send message button
            const sendBtn = chatWindowContainer.querySelector('.send-message');
            const chatInput = chatWindowContainer.querySelector('.chat-input input');
            const chatMessages = chatWindowContainer.querySelector('.chat-messages');
            
            sendBtn.addEventListener('click', function() {
                sendMessage(chatInput, chatMessages);
            });
            
            // Add event listener for Enter key
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage(chatInput, chatMessages);
                }
            });
            
            // Add event listener for voice input
            const voiceBtn = chatWindowContainer.querySelector('.voice-input');
            voiceBtn.addEventListener('click', function() {
                if ('webkitSpeechRecognition' in window) {
                    const recognition = new webkitSpeechRecognition();
                    recognition.continuous = false;
                    recognition.interimResults = false;
                    
                    recognition.onstart = function() {
                        voiceBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                    };
                    
                    recognition.onresult = function(event) {
                        const transcript = event.results[0][0].transcript;
                        chatInput.value = transcript;
                        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                    };
                    
                    recognition.onerror = function(event) {
                        console.error('Speech recognition error', event.error);
                        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                    };
                    
                    recognition.onend = function() {
                        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                    };
                    
                    recognition.start();
                } else {
                    alert('Speech recognition is not supported in your browser.');
                }
            });
            
            // Focus the input field
            chatInput.focus();
        });
    }
    
    // Open chat from demo section
    if (openChatBtn) {
        openChatBtn.addEventListener('click', function() {
            if (chatbotWidget) {
                chatbotWidget.click();
            }
        });
    }
    
    // Voice search in job search
    const voiceSearchBtn = document.querySelector('.voice-search-btn');
    const jobSearchInput = document.getElementById('job-search');
    
    if (voiceSearchBtn && jobSearchInput) {
        voiceSearchBtn.addEventListener('click', function() {
            if ('webkitSpeechRecognition' in window) {
                const recognition = new webkitSpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                
                recognition.onstart = function() {
                    voiceSearchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                };
                
                recognition.onresult = function(event) {
                    const transcript = event.results[0][0].transcript;
                    jobSearchInput.value = transcript;
                    voiceSearchBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                    
                    // Trigger AI job search
                    simulateAIJobSearch(transcript);
                };
                
                recognition.onerror = function(event) {
                    console.error('Speech recognition error', event.error);
                    voiceSearchBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                };
                
                recognition.onend = function() {
                    voiceSearchBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                };
                
                recognition.start();
            } else {
                alert('Speech recognition is not supported in your browser.');
            }
        });
    }
    
    // Search button in job search
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn && jobSearchInput) {
        searchBtn.addEventListener('click', function() {
            simulateAIJobSearch(jobSearchInput.value);
        });
        
        jobSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                simulateAIJobSearch(jobSearchInput.value);
            }
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .feature-card, .job-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const elementsToAnimate = document.querySelectorAll('.service-card, .feature-card, .job-card');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});

// Helper function to send a message in the chatbot
function sendMessage(inputElement, messagesElement) {
    const message = inputElement.value.trim();
    if (message === '') return;
    
    // Add user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user';
    userMessageDiv.innerHTML = `<p>${message}</p>`;
    messagesElement.appendChild(userMessageDiv);
    
    // Clear input
    inputElement.value = '';
    
    // Scroll to bottom
    messagesElement.scrollTop = messagesElement.scrollHeight;
    
    // Simulate AI response
    setTimeout(() => {
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'message bot';
        
        // Simple AI response logic
        let response = '';
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            response = 'Hello! How can I assist you today?';
        } else if (lowerMessage.includes('job') || lowerMessage.includes('position') || lowerMessage.includes('work')) {
            response = 'We have several open positions available. Would you like me to help you find a job that matches your skills?';
        } else if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
            response = 'Our AI staffing specialization helps companies find top talent in artificial intelligence, machine learning, and data science. Would you like to know more about our AI staffing services?';
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
            response = 'You can reach our team at info@fullcycleservices.com or call us at (555) 123-4567. Would you like me to schedule a call with one of our specialists?';
        } else if (lowerMessage.includes('service') || lowerMessage.includes('offer')) {
            response = 'We offer staffing, managed services, direct placement, and specialized AI staffing solutions. Which service are you interested in learning more about?';
        } else {
            response = 'Thank you for your message. How else can I assist you with your staffing or recruitment needs?';
        }
        
        botMessageDiv.innerHTML = `<p>${response}</p>`;
        messagesElement.appendChild(botMessageDiv);
        
        // Scroll to bottom
        messagesElement.scrollTop = messagesElement.scrollHeight;
    }, 1000);
}

// Simulate AI job search
function simulateAIJobSearch(query) {
    if (!query.trim()) return;
    
    // Show loading state
    const jobsContainer = document.querySelector('.featured-jobs');
    if (!jobsContainer) return;
    
    jobsContainer.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> AI is analyzing your request...</div>';
    
    // Simulate AI processing time
    setTimeout(() => {
        // Reset container
        jobsContainer.innerHTML = '';
        
        // Analyze query and show relevant jobs
        const lowerQuery = query.toLowerCase();
        
        // Sample job data
        const jobs = [
            {
                title: 'AI Engineer',
                match: '98%',
                location: 'Detroit, MI',
                type: 'Full-time',
                description: 'Develop and implement AI solutions for enterprise clients. Experience with machine learning frameworks required.',
                skills: ['Python', 'TensorFlow', 'NLP'],
                id: 'ai-engineer'
            },
            {
                title: 'Data Scientist',
                match: '95%',
                location: 'Remote',
                type: 'Contract',
                description: 'Analyze complex datasets to drive business decisions for a Fortune 500 client in the healthcare sector.',
                skills: ['R', 'SQL', 'Tableau'],
                id: 'data-scientist'
            },
            {
                title: 'ML Operations Engineer',
                match: '92%',
                location: 'Chicago, IL',
                type: 'Full-time',
                description: 'Build and maintain infrastructure for machine learning model deployment and monitoring.',
                skills: ['Kubernetes', 'Docker', 'CI/CD'],
                id: 'ml-ops'
            },
            {
                title: 'AI Product Manager',
                match: '90%',
                location: 'New York, NY',
                type: 'Full-time',
                description: 'Lead the development of AI-powered products from conception to launch. Work with cross-functional teams to deliver innovative solutions.',
                skills: ['Product Management', 'AI', 'Agile'],
                id: 'ai-product-manager'
            },
            {
                title: 'Computer Vision Engineer',
                match: '88%',
                location: 'Boston, MA',
                type: 'Full-time',
                description: 'Develop computer vision algorithms for autonomous systems. Experience with image processing and deep learning required.',
                skills: ['OpenCV', 'PyTorch', 'C++'],
                id: 'cv-engineer'
            },
            {
                title: 'NLP Specialist',
                match: '85%',
                location: 'Remote',
                type: 'Contract',
                description: 'Develop natural language processing solutions for a leading tech company. Focus on sentiment analysis and text classification.',
                skills: ['BERT', 'Transformers', 'Python'],
                id: 'nlp-specialist'
            }
        ];
        
        // Filter jobs based on query
        let filteredJobs = jobs;
        
        if (lowerQuery.includes('remote')) {
            filteredJobs = jobs.filter(job => job.location.toLowerCase().includes('remote'));
        } else if (lowerQuery.includes('detroit')) {
            filteredJobs = jobs.filter(job => job.location.toLowerCase().includes('detroit'));
        } else if (lowerQuery.includes('chicago')) {
            filteredJobs = jobs.filter(job => job.location.toLowerCase().includes('chicago'));
        } else if (lowerQuery.includes('new york')) {
            filteredJobs = jobs.filter(job => job.location.toLowerCase().includes('new york'));
        } else if (lowerQuery.includes('boston')) {
            filteredJobs = jobs.filter(job => job.location.toLowerCase().includes('boston'));
        }
        
        if (lowerQuery.includes('ai') || lowerQuery.includes('artificial intelligence')) {
            filteredJobs = filteredJobs.filter(job => 
                job.title.toLowerCase().includes('ai') || 
                job.description.toLowerCase().includes('ai') ||
                job.skills.some(skill => skill.toLowerCase().includes('ai'))
            );
        }
        
        if (lowerQuery.includes('data')) {
            filteredJobs = filteredJobs.filter(job => 
                job.title.toLowerCase().includes('data') || 
                job.description.toLowerCase().includes('data') ||
                job.skills.some(skill => skill.toLowerCase().includes('data'))
            );
        }
        
        if (lowerQuery.includes('machine learning') || lowerQuery.includes('ml')) {
            filteredJobs = filteredJobs.filter(job => 
                job.title.toLowerCase().includes('ml') || 
                job.description.toLowerCase().includes('machine learning') ||
                job.skills.some(skill => skill.toLowerCase().includes('ml'))
            );
        }
        
        if (lowerQuery.includes('python')) {
            filteredJobs = filteredJobs.filter(job => 
                job.skills.some(skill => skill.toLowerCase().includes('python'))
            );
        }
        
        if (lowerQuery.includes('contract')) {
            filteredJobs = filteredJobs.filter(job => job.type.toLowerCase().includes('contract'));
        }
        
        if (lowerQuery.includes('full-time') || lowerQuery.includes('full time')) {
            filteredJobs = filteredJobs.filter(job => job.type.toLowerCase().includes('full-time'));
        }
        
        // If no specific filters matched, try to find jobs with any matching keywords
        if (filteredJobs.length === jobs.length && query.length > 3) {
            const keywords = query.toLowerCase().split(' ').filter(word => word.length > 3);
            if (keywords.length > 0) {
                filteredJobs = jobs.filter(job => 
                    keywords.some(keyword => 
                        job.title.toLowerCase().includes(keyword) || 
                        job.description.toLowerCase().includes(keyword) ||
                        job.location.toLowerCase().includes(keyword) ||
                        job.skills.some(skill => skill.toLowerCase().includes(keyword))
                    )
                );
            }
        }
        
        // Limit to 3 jobs
        filteredJobs = filteredJobs.slice(0, 3);
        
        // If no jobs found, show message
        if (filteredJobs.length === 0) {
            jobsContainer.innerHTML = '<div class="no-jobs">No matching jobs found. Try broadening your search criteria.</div>';
            return;
        }
        
        // Display filtered jobs
        filteredJobs.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.className = 'job-card';
            jobCard.innerHTML = `
                <div class="job-header">
                    <h3>${job.title}</h3>
                    <span class="job-match">${job.match} Match</span>
                </div>
                <p class="job-location"><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
                <p class="job-type"><i class="fas fa-briefcase"></i> ${job.type}</p>
                <p class="job-description">${job.description}</p>
                <div class="job-skills">
                    ${job.skills.map(skill => `<span>${skill}</span>`).join('')}
                </div>
                <a href="jobs.html#${job.id}" class="btn btn-outline">View Details</a>
            `;
            jobsContainer.appendChild(jobCard);
        });
        
        // Add animation to job cards
        const newJobCards = jobsContainer.querySelectorAll('.job-card');
        newJobCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }, 1500);
} 