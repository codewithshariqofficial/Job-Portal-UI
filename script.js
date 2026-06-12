// Mock Job Data
const jobs = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechFlow Solutions",
        logo: "TF",
        location: "New York, NY",
        type: "Full-time",
        salary: 135000,
        experience: "Senior",
        posted: "2 days ago",
        description: "We are looking for an expert Frontend Developer with experience in React and modern CSS. You will be responsible for building high-performance web applications and mentoring junior developers."
    },
    {
        id: 2,
        title: "UX/UI Designer",
        company: "Creative Pulse",
        logo: "CP",
        location: "Remote",
        type: "Full-time",
        salary: 95000,
        experience: "Mid",
        posted: "5 hours ago",
        description: "Join our design team to create beautiful and intuitive user experiences. You should have a strong portfolio and experience with Figma and Adobe Creative Suite."
    },
    {
        id: 3,
        title: "Backend Engineer",
        company: "DataGrid Systems",
        logo: "DG",
        location: "San Francisco, CA",
        type: "Contract",
        salary: 155000,
        experience: "Senior",
        posted: "1 week ago",
        description: "Help us scale our infrastructure using Node.js and PostgreSQL. This is a 6-month contract with a high probability of extension."
    },
    {
        id: 4,
        title: "Product Manager",
        company: "InnoVate Corp",
        logo: "IV",
        location: "Austin, TX",
        type: "Full-time",
        salary: 120000,
        experience: "Mid",
        posted: "3 days ago",
        description: "Define product strategy and roadmap. Work closely with engineering and marketing teams to deliver impactful features."
    },
    {
        id: 5,
        title: "Entry Level Web Developer",
        company: "StartUp Inc",
        logo: "SI",
        location: "Chicago, IL",
        type: "Full-time",
        salary: 65000,
        experience: "Entry",
        posted: "1 day ago",
        description: "Perfect opportunity for a recent graduate to start their career. You will work on various client projects and learn from experienced developers."
    },
    {
        id: 6,
        title: "DevOps Specialist",
        company: "CloudScale",
        logo: "CS",
        location: "Remote",
        type: "Part-time",
        salary: 80000,
        experience: "Senior",
        posted: "4 days ago",
        description: "Optimize our CI/CD pipelines and manage AWS infrastructure on a part-time basis."
    }
];

// Mock Company Data
const companies = [
    {
        name: "TechFlow Solutions",
        logo: "TF",
        industry: "Software Development",
        size: "500-1000 employees",
        location: "New York, NY",
        description: "Leading the way in frontend innovation and high-performance web applications."
    },
    {
        name: "Creative Pulse",
        logo: "CP",
        industry: "Design & Media",
        size: "100-200 employees",
        location: "Remote",
        description: "A boutique design agency focusing on intuitive user experiences and brand identity."
    },
    {
        name: "DataGrid Systems",
        logo: "DG",
        industry: "Data & Infrastructure",
        size: "1000+ employees",
        location: "San Francisco, CA",
        description: "Specializing in scalable backend architectures and robust data solutions."
    },
    {
        name: "InnoVate Corp",
        logo: "IV",
        industry: "Product Management",
        size: "200-500 employees",
        location: "Austin, TX",
        description: "Driving product excellence through strategy, innovation, and user-centric design."
    }
];

// DOM Elements
const jobBoardView = document.getElementById('job-board-view');
const companiesView = document.getElementById('companies-view');
const jobsContainer = document.getElementById('jobs-container');
const companiesContainer = document.getElementById('companies-container');
const jobCount = document.getElementById('job-count');
const searchTitle = document.getElementById('search-title');
const searchLocation = document.getElementById('search-location');
const btnSearch = document.getElementById('btn-search');
const btnClearFilters = document.getElementById('btn-clear-filters');
const sortSelect = document.getElementById('sort-select');
const noResults = document.getElementById('no-results');
const navJobs = document.getElementById('nav-jobs');
const navCompanies = document.getElementById('nav-companies');

const jobModal = document.getElementById('job-modal');
const applyModal = document.getElementById('apply-modal');
const modalDetails = document.getElementById('modal-details');
const applyForm = document.getElementById('apply-form');
const applyJobId = document.getElementById('apply-job-id');

// State
let filteredJobs = [...jobs];

// Initialization
function init() {
    renderJobs(jobs);
    renderCompanies();
    setupEventListeners();
}

// Render Job Cards
function renderJobs(data) {
    jobsContainer.innerHTML = '';
    
    if (data.length === 0) {
        noResults.classList.remove('hidden');
        jobCount.textContent = 'Showing 0 jobs';
        return;
    }
    
    noResults.classList.add('hidden');
    jobCount.textContent = `Showing ${data.length} jobs`;
    
    data.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = `
            <div class="job-info">
                <div class="company-logo">${job.logo}</div>
                <div class="job-details">
                    <div class="company-name">${job.company}</div>
                    <h3>${job.title}</h3>
                    <div class="job-meta">
                        <span>📍 ${job.location}</span>
                        <span>⏱️ ${job.type}</span>
                        <span>📅 ${job.posted}</span>
                    </div>
                    <div class="job-tags">
                        <span class="tag">${job.experience}</span>
                        <span class="tag">New</span>
                    </div>
                </div>
            </div>
            <div class="job-actions">
                <span class="job-salary">$${(job.salary / 1000).toFixed(0)}k</span>
                <button class="btn btn-outline" onclick="openJobDetails(${job.id}, event)">Details</button>
                <button class="btn btn-primary" onclick="openApplyModal(${job.id}, event)">Apply</button>
            </div>
        `;
        card.onclick = () => openJobDetails(job.id);
        jobsContainer.appendChild(card);
    });
}

// Render Company Cards
function renderCompanies() {
    companiesContainer.innerHTML = '';
    companies.forEach(company => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = `
            <div class="job-info">
                <div class="company-logo">${company.logo}</div>
                <div class="job-details">
                    <div class="company-name">${company.industry}</div>
                    <h3>${company.name}</h3>
                    <div class="job-meta">
                        <span>📍 ${company.location}</span>
                        <span>👥 ${company.size}</span>
                    </div>
                    <p style="margin-top: 10px; font-size: 14px; color: var(--text-muted)">${company.description}</p>
                </div>
            </div>
            <div class="job-actions">
                <button class="btn btn-outline" onclick="showJobsByCompany('${company.name}')">View Jobs</button>
            </div>
        `;
        companiesContainer.appendChild(card);
    });
}

// Filtering Logic
function filterJobs() {
    const title = searchTitle.value.toLowerCase();
    const location = searchLocation.value.toLowerCase();
    
    const selectedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(el => el.value);
    const selectedExperience = Array.from(document.querySelectorAll('input[name="experience"]:checked')).map(el => el.value);
    const salaryRange = document.querySelector('input[name="salary"]:checked').value;

    filteredJobs = jobs.filter(job => {
        const matchesTitle = job.title.toLowerCase().includes(title) || job.company.toLowerCase().includes(title);
        const matchesLocation = job.location.toLowerCase().includes(location);
        const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.type);
        const matchesExperience = selectedExperience.length === 0 || selectedExperience.includes(job.experience);
        
        let matchesSalary = true;
        if (salaryRange !== 'all') {
            const val = job.salary;
            if (salaryRange === '0-50k') matchesSalary = val <= 50000;
            else if (salaryRange === '50k-100k') matchesSalary = val > 50000 && val <= 100000;
            else if (salaryRange === '100k-150k') matchesSalary = val > 100000 && val <= 150000;
            else if (salaryRange === '150k+') matchesSalary = val > 150000;
        }

        return matchesTitle && matchesLocation && matchesType && matchesExperience && matchesSalary;
    });

    sortJobs();
    renderJobs(filteredJobs);
}

// Sorting Logic
function sortJobs() {
    const val = sortSelect.value;
    if (val === 'salary-high') {
        filteredJobs.sort((a, b) => b.salary - a.salary);
    } else if (val === 'salary-low') {
        filteredJobs.sort((a, b) => a.salary - b.salary);
    } else {
        filteredJobs.sort((a, b) => a.id - b.id);
    }
}

// Navigation Logic
function switchView(view) {
    if (view === 'jobs') {
        jobBoardView.classList.remove('hidden');
        companiesView.classList.add('hidden');
        navJobs.classList.add('active');
        navCompanies.classList.remove('active');
    } else {
        jobBoardView.classList.add('hidden');
        companiesView.classList.remove('hidden');
        navJobs.classList.remove('active');
        navCompanies.classList.add('active');
    }
}

function showJobsByCompany(companyName) {
    switchView('jobs');
    searchTitle.value = companyName;
    filterJobs();
}

// Event Listeners
function setupEventListeners() {
    navJobs.onclick = (e) => { e.preventDefault(); switchView('jobs'); };
    navCompanies.onclick = (e) => { e.preventDefault(); switchView('companies'); };

    btnSearch.addEventListener('click', filterJobs);
    
    btnClearFilters.addEventListener('click', () => {
        searchTitle.value = '';
        searchLocation.value = '';
        document.querySelectorAll('input[type="checkbox"]').forEach(el => el.checked = false);
        document.querySelector('input[name="salary"][value="all"]').checked = true;
        filterJobs();
    });

    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', filterJobs);
    });

    sortSelect.addEventListener('change', filterJobs);

    // Modal Close buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.onclick = () => {
            jobModal.style.display = 'none';
            applyModal.style.display = 'none';
        };
    });

    // Window click to close modal
    window.onclick = (event) => {
        if (event.target == jobModal) jobModal.style.display = 'none';
        if (event.target == applyModal) applyModal.style.display = 'none';
    };

    // Apply Form Submission
    applyForm.onsubmit = (e) => {
        e.preventDefault();
        const jobId = applyJobId.value;
        const job = jobs.find(j => j.id == jobId);
        alert(`Application sent for ${job.title} at ${job.company}!`);
        applyModal.style.display = 'none';
        applyForm.reset();
    };
}

// Modal Functions
window.openJobDetails = function(id, event) {
    if (event) event.stopPropagation();
    const job = jobs.find(j => j.id === id);
    if (!job) return;

    modalDetails.innerHTML = `
        <div class="modal-header">
            <div class="company-logo">${job.logo}</div>
            <div style="margin-top: 15px">
                <h2>${job.title}</h2>
                <p class="company-name">${job.company}</p>
            </div>
        </div>
        <div class="modal-body" style="margin-top: 25px">
            <div class="job-meta" style="margin-bottom: 20px">
                <span>📍 ${job.location}</span>
                <span>⏱️ ${job.type}</span>
                <span>💰 $${(job.salary / 1000).toFixed(0)}k / year</span>
            </div>
            <h3>About the job</h3>
            <p>${job.description}</p>
            <p style="margin-top: 15px">We offer competitive benefits, career growth opportunities, and a collaborative environment. If you're passionate about tech, we'd love to hear from you!</p>
            
            <h3 style="margin-top: 25px">Requirements</h3>
            <ul style="list-style: disc; margin-left: 20px; margin-top: 10px">
                <li>3+ years of experience in related field</li>
                <li>Excellent communication skills</li>
                <li>Problem-solving mindset</li>
                <li>Bachelor's degree in CS or related field preferred</li>
            </ul>
        </div>
        <div class="modal-footer" style="margin-top: 30px; display: flex; gap: 15px">
            <button class="btn btn-primary" onclick="openApplyModal(${job.id})">Apply for this job</button>
            <button class="btn btn-outline" onclick="jobModal.style.display='none'">Close</button>
        </div>
    `;
    jobModal.style.display = 'block';
};

window.openApplyModal = function(id, event) {
    if (event) event.stopPropagation();
    jobModal.style.display = 'none';
    applyJobId.value = id;
    applyModal.style.display = 'block';
};

// Start the app
init();
