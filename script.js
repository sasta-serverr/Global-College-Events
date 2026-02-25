// Leaflet (OpenStreetMap) - load dynamically if not present
if (!window.L) {
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    s.crossOrigin = '';
    document.head.appendChild(s);
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    l.crossOrigin = '';
    document.head.appendChild(l);
}
const data = {
    "West Bengal": {
        "IIT Kharagpur": ["Kshitij","Spring Fest","E-Summit","AI Conclave","Robotics League"],
        "Jadavpur University": ["Sanskriti","Tech Fest JU","Coding League","Startup Meet","Research Expo"],
        "Institute of Engineering & Management": ["Innovision","Hack IEM","Biz Summit","Cultural Carnival","AI Hackathon"],
        "Techno India University": ["Tech Fiesta","Cultural Fest","Data Science Day","Entrepreneur Meet","Hack TIU"],
        "Presidency University": ["Academic Conclave","Innovation Day","Cultural Week","AI Meet","Research Forum"]
    },
    "Maharashtra": {
        "IIT Bombay": ["Techfest","Mood Indigo","E-Summit","Robotics War","AI Hack"],
        "COEP": ["MindSpark","Regatta","Innovation Expo","Coding Clash","Business Summit"],
        "VJTI": ["Technovanza","Pratibimb","Hackathon Pro","Tech Expo","Startup Carnival"],
        "SPIT Mumbai": ["Code Storm","AI Fest","Cultural Vibes","Tech Meet","Robotics Expo"],
        "MIT Pune": ["MIT Summit","Innovation Day","Hack MIT","Tech Carnival","Biz Fest"]
    },
    "Karnataka": {
        "IISc Bangalore": ["Research Conclave","Science Expo","AI Symposium","Innovation Meet","Tech Summit"],
        "NIT Surathkal": ["Engineer Fest","Cultural Night","Hack Arena","Robotics Showdown","E-Summit"],
        "RVCE": ["8th Mile","Coding Fest","Tech Week","Biz Expo","AI Hackathon"],
        "PES University": ["Hack PES","Cultural Fest","Tech Carnival","Startup Summit","Data Expo"],
        "BMSCE": ["Innovation Fest","Code Rush","Tech Expo","Cultural Carnival","AI Meet"]
    },
    "Tamil Nadu": {
        "IIT Madras": ["Shaastra","Saarang","E-Summit","Hack IITM","Robotics Fest"],
        "Anna University": ["Kurukshetra","Tech Meet","Innovation Expo","AI Summit","Biz Carnival"],
        "SRM University": ["SRM Hack","Cultural Fest","Data Conclave","Tech Expo","Startup Day"],
        "VIT Vellore": ["GraVITas","Riviera","AI Fest","Code War","Innovation Meet"],
        "PSG Tech": ["PSG Tech Fest","Cultural Week","AI Hack","Robotics Meet","Biz Expo"]
    },
    "Delhi": {
        "IIT Delhi": ["Rendezvous","Tryst","Hack Delhi","AI Summit","Startup Expo"],
        "DTU": ["Engifest","Tech Carnival","Innovation Fest","Robotics War","E-Summit"],
        "NSUT": ["Moksha","Hack NSUT","Data Expo","Tech Conclave","Biz Summit"],
        "Jamia Millia": ["Cultural Fest","Tech Week","AI Meet","Startup Forum","Research Expo"],
        "Delhi University": ["Antardhvani","Tech Expo","Hack DU","Innovation Day","Biz Fest"]
    },
    "Uttar Pradesh": {
        "IIT Kanpur": ["Techkriti","Antaragni","AI Hack","Robotics Expo","E-Summit"],
        "MNNIT Allahabad": ["Culrav","Tech Fest","Hackathon UP","Startup Day","AI Conclave"],
        "Amity University": ["Innovation Fest","Code Storm","Cultural Week","Biz Summit","Tech Expo"],
        "BHU": ["Spandan","Tech Carnival","AI Summit","Research Meet","Startup Expo"],
        "AKTU": ["Tech Meet","Hack AKTU","Cultural Fest","Data Expo","Biz Fest"]
    },
    "Telangana": {
        "IIT Hyderabad": ["Elan","nVision","AI Expo","Hack TG","Innovation Summit"],
        "NIT Warangal": ["Technozion","Spring Fest","AI Hack","Startup Meet","Robotics Show"],
        "Osmania University": ["Cultural Fest","Tech Week","Innovation Expo","Biz Summit","Hack OU"],
        "JNTU Hyderabad": ["Tech Carnival","AI Meet","Startup Fest","Research Expo","Code Rush"],
        "IIIT Hyderabad": ["R&D Conclave","Hack IIIT","AI Fest","Robotics Expo","Biz Forum"]
    },
    "Gujarat": {
        "DAIICT": ["Synapse","Coding Fest","AI Expo","Startup Meet","Cultural Day"],
        "IIT Gandhinagar": ["Amalthea","Innovation Day","AI Summit","Hack IITGN","Research Expo"],
        "Nirma University": ["Tech Fest","Cultural Carnival","Biz Summit","Code Clash","AI Meet"],
        "MS University": ["Tech Week","Innovation Expo","Hack MSU","Startup Fest","Research Day"],
        "Charusat": ["Tech Carnival","AI Hack","Biz Forum","Data Expo","Cultural Fest"]
    },
    "Rajasthan": {
        "MNIT Jaipur": ["Blitzschlag","Hack RJ","Tech Expo","Biz Meet","Cultural Fest"],
        "Poornima University": ["Innovation Fest","Code Rush","AI Summit","Startup Meet","Research Expo"],
        "JECRC": ["Tech Carnival","Cultural Week","Hack JECRC","AI Expo","Biz Forum"],
        "RTU": ["Tech Fest","Innovation Day","Startup Expo","AI Hack","Data Meet"],
        "BITS Pilani": ["Oasis","Apogee","AI Summit","Hack BITS","Robotics Expo"]
    },
    "Kerala": {
        "NIT Calicut": ["Tathva","Ragam","Hack Kerala","Tech Expo","Research Day"],
        "CUSAT": ["Cultural Fest","Tech Carnival","AI Meet","Startup Summit","Data Expo"],
        "Amrita University": ["Amrita Tech Fest","AI Summit","Innovation Day","Hack Amrita","Biz Expo"],
        "KTU": ["Tech Week","Innovation Expo","Startup Fest","AI Hack","Cultural Meet"],
        "Mar Baselios": ["Tech Carnival","Code Clash","AI Fest","Startup Day","Research Expo"]
    }
};

// Map of generated dates for each event (keyed by state||college||event)
const eventDates = {};

function formatDate(d) {
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function generateEventDates() {
    for (let state in data) {
        for (let col in data[state]) {
            for (let ev of data[state][col]) {
                const key = state + '||' + col + '||' + ev;
                if (!eventDates[key]) {
                    const daysAhead = Math.floor(Math.random() * 180) + 1; // 1..180 days
                    const d = new Date();
                    d.setDate(d.getDate() + daysAhead);
                    eventDates[key] = formatDate(d);
                }
            }
        }
    }
}

function showStudent() {
    document.getElementById("studentSection").style.display = "block";
    document.getElementById("organizerSection").style.display = "none";
}

function showOrganizer() {
    document.getElementById("studentSection").style.display = "none";
    document.getElementById("organizerSection").style.display = "block";
}

function updateStats() {
    let stateTotal = Object.keys(data).length;
    let collegeTotal = 0;
    let eventTotal = 0;

    for (let state in data) {
        collegeTotal += Object.keys(data[state]).length;
        for (let college in data[state]) {
            eventTotal += data[state][college].length;
        }
    }

    document.getElementById("stateCount").innerText = stateTotal + "+";
    document.getElementById("collegeCount").innerText = collegeTotal + "+";
    document.getElementById("eventCount").innerText = eventTotal + "+";
}

const sections = document.querySelectorAll("#home, #explore, #colleges, #contact");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

function loadColleges() {
    const stateSelect = document.getElementById("stateSelect");
    const collegeSelect = document.getElementById("collegeSelect");
    const eventSelect = document.getElementById("eventSelect");
    
    collegeSelect.innerHTML = "<option value=''>Select College</option>";
    eventSelect.innerHTML = "<option value=''>Select Event</option>";
    
    let selectedState = stateSelect.value;
    if (selectedState) {
        for (let college in data[selectedState]) {
            let option = document.createElement("option");
            option.value = college;
            option.textContent = college;
            collegeSelect.appendChild(option);
        }
    }
}

function loadEvents() {
    const stateSelect = document.getElementById("stateSelect");
    const collegeSelect = document.getElementById("collegeSelect");
    const eventSelect = document.getElementById("eventSelect");
    
    eventSelect.innerHTML = "<option value=''>Select Event</option>";
    
    let state = stateSelect.value;
    let college = collegeSelect.value;
    
    if (state && college) {
        data[state][college].forEach(event => {
            let option = document.createElement("option");
            option.value = event;
            option.textContent = event;
            eventSelect.appendChild(option);
        });
    }
}

function showPreview() {
    const eventSelect = document.getElementById("eventSelect");
    let event = eventSelect.value;
    if(event) {
        document.getElementById("previewTitle").innerText = event;
        document.getElementById("eventPreview").style.display = "block";
    } else {
        document.getElementById("eventPreview").style.display = "none";
    }
}

function register() {
    const stateSelect = document.getElementById("stateSelect");
    const collegeSelect = document.getElementById("collegeSelect");
    const eventSelect = document.getElementById("eventSelect");
    
    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("studentEmail").value.trim();
    const msg = document.getElementById("successMessage");
    
    if (!name || !email) {
        msg.innerText = "Please enter your Full Name and Email.";
        msg.style.color = "red";
        return; 
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        msg.innerText = "Please enter a valid email address.";
        msg.style.color = "red";
        return;
    }
    
    if(stateSelect.value && collegeSelect.value && eventSelect.value) {
        msg.innerText = "Registration Successful! We've sent details to " + email + ".";
        msg.style.color = "#4a7c59";
    } else {
        msg.innerText = "Please select a State, College, and Event.";
        msg.style.color = "red";
    }
}

function publishEvent() {
    const name = document.getElementById('organizerName').value.trim();
    const email = document.getElementById('organizerEmail').value.trim();
    const eventName = document.getElementById('eventName').value.trim();
    const msg = document.getElementById('organizerMessage');

    if (!name || !email || !eventName) {
        msg.innerText = "Please enter Organizer name, Email and Event name.";
        msg.style.color = "red";
        return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    if (!email.match(emailPattern)) {
        msg.innerText = "Please enter a valid email address.";
        msg.style.color = "red";
        return;
    }

    const phone = document.getElementById('organizerPhone').value.trim();
    const phonePattern = /^[0-9+()\-\s]{7,}$/;
    if (phone && !phone.match(phonePattern)) {
        msg.innerText = "Please enter a valid phone number.";
        msg.style.color = "red";
        return;
    }

    const orgType = document.getElementById('orgType').value;
    const collegeCompany = document.getElementById('collegeOrCompany').value.trim();
    const date = document.getElementById('eventDate').value;
    const venue = document.getElementById('eventVenue').value.trim();
    const category = document.getElementById('eventCategory').value;
    const desc = document.getElementById('eventDescription').value.trim();

    const preview = document.getElementById('organizerPreview');
    preview.innerHTML = "<h4>Event Preview: " + escapeHtml(eventName) + "</h4>"
        + "<p><strong>Organizer:</strong> " + escapeHtml(name) + (orgType ? ' (' + escapeHtml(orgType) + ')' : '') + (collegeCompany ? ' — ' + escapeHtml(collegeCompany) : '') + "</p>"
        + "<p><strong>Date:</strong> " + (date || 'TBA') + "</p>"
        + "<p><strong>Venue:</strong> " + (escapeHtml(venue) || 'TBA') + "</p>"
        + "<p><strong>Category:</strong> " + (escapeHtml(category) || 'General') + "</p>"
        + (desc ? '<p>' + escapeHtml(desc) + '</p>' : '');

    preview.style.display = 'block';
    msg.innerText = "Event published locally (demo) and shown in preview.";
    msg.style.color = "#4a7c59";
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/\"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

// SCROLL REVEAL LOGIC
function reveal() {
    let reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let elementVisible = 100; 

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
            // if contact footer revealed, animate contact list
            if (reveals[i].id === 'contact') animateContactList();
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); 

document.addEventListener("DOMContentLoaded", function() {
    updateStats(); 
    
    const stateSelect = document.getElementById("stateSelect");
    for (let state in data) {
        let option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    }
    generateEventDates();
    setupChatbot();
    initEventAnimations();
    // animate contact list if footer already visible
    setTimeout(()=>{ if (document.querySelector('#contact').classList.contains('active')) animateContactList(); }, 500);
});

function animateContactList() {
    const lis = document.querySelectorAll('#contactList li');
    lis.forEach((li, idx) => setTimeout(()=> li.classList.add('show'), 120 + idx * 120));
}

function initEventAnimations() {
    // Trigger staggered entrance for featured event cards
    const grid = document.querySelector('.featured-grid');
    if (grid) {
        grid.classList.add('animate');
        const cards = Array.from(grid.querySelectorAll('.event-card'));
        cards.forEach((c, i) => {
            // add enter class so CSS animation runs with delays
            c.classList.add('enter');
            // setup pointer interactions for 3D tilt
            c.addEventListener('mousemove', (ev) => {
                const rect = c.getBoundingClientRect();
                const px = (ev.clientX - rect.left) / rect.width;
                const py = (ev.clientY - rect.top) / rect.height;
                const rotateY = (px - 0.5) * 10; // -5..5 deg
                const rotateX = (0.5 - py) * 8;  // -4..4 deg
                c.classList.add('tilt');
                c.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            c.addEventListener('mouseleave', () => {
                c.classList.remove('tilt');
                c.style.transform = '';
            });
        });
    }

    // animate preview when event selected
    const eventSelect = document.getElementById('eventSelect');
    if (eventSelect) {
        eventSelect.addEventListener('change', () => {
            const preview = document.getElementById('eventPreview');
            if (preview && preview.style.display !== 'none') {
                preview.classList.remove('show');
                // trigger reflow to restart animation
                void preview.offsetWidth;
                preview.classList.add('show');
            }
        });
    }
}

// ---------- Chatbot logic (simple local assistant using `data`) ----------
function setupChatbot() {
    const chatBtn = document.getElementById('chatBtn');
    const chatWindow = document.getElementById('chatWindow');
    const send = document.getElementById('sendChat');
    const input = document.getElementById('chatInput');

    chatBtn.addEventListener('click', () => {
        const open = chatWindow.style.display === 'flex';
        chatWindow.style.display = open ? 'none' : 'flex';
        chatWindow.setAttribute('aria-hidden', open ? 'true' : 'false');
        if (!open) { input.focus(); }
    });

    send.addEventListener('click', () => { handleUserMessage(); });
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleUserMessage(); });
}

// ---------- Map widget (Leaflet + Nominatim geocoding) ----------
function setupMapWidget() {
    const mapBtn = document.getElementById('mapBtn');
    const mapWindow = document.getElementById('mapWindow');
    const mapBody = document.getElementById('mapBody');
    let mapInstance = null;
    let markersLayer = null;

    mapBtn.addEventListener('click', () => {
        const open = mapWindow.style.display === 'block';
        mapWindow.style.display = open ? 'none' : 'block';
        mapWindow.setAttribute('aria-hidden', open ? 'true' : 'false');
        // toggle visual state on the button and badge
        mapBtn.classList.toggle('open', !open);
        const badge = document.getElementById('mapBadge');
        if (badge) {
            if (!open) badge.classList.add('pulse'); else badge.classList.remove('pulse');
        }
        if (!open) {
            // initialize map when first opened
            if (!mapInstance) {
                mapInstance = L.map(mapBody).setView([22.0, 78.0], 5);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; OpenStreetMap contributors'
                }).addTo(mapInstance);
                markersLayer = L.layerGroup().addTo(mapInstance);
                // add markers (geocode colleges)
                geocodeAllColleges((marker) => { markersLayer.addLayer(marker); });
                // animate popup list items when popup opens
                mapInstance.on('popupopen', function(e){
                    try {
                        const popupEl = e.popup.getElement();
                        if (!popupEl) return;
                        const lis = popupEl.querySelectorAll('.popup-events li');
                        lis.forEach((li, idx) => setTimeout(()=> li.classList.add('show'), 80 + idx * 80));
                    } catch(err) {}
                });
            }
            setTimeout(() => mapInstance.invalidateSize(), 300);
        }
    });
}

function geocodeAllColleges(onMarkerAdded) {
    const colleges = [];
    for (let state in data) {
        for (let col in data[state]) {
            colleges.push({ state, college: col });
        }
    }

    // sequentially geocode to be polite to Nominatim
    let i = 0;
    function next() {
        if (i >= colleges.length) return;
        const item = colleges[i++];
        geocodeCollege(item.college + ', ' + item.state).then(loc => {
                if (loc) {
                    const keyPrefix = item.state + '||' + item.college + '||';
                    const events = data[item.state][item.college];
                    const popupParts = [];
                    for (let ev of events) {
                        const key = keyPrefix + ev;
                        const date = eventDates[key] ? ' — ' + eventDates[key] : '';
                        popupParts.push({ text: ev + date });
                    }
                    const marker = L.marker([loc.lat, loc.lon]);
                    // Build popup HTML with a list so we can animate items when popup opens
                    const popupHtml = '<div class="popup-card"><strong>' + escapeHtml(item.college) + '</strong><ul class="popup-events">' + popupParts.map(p=> '<li>' + escapeHtml(p.text) + '</li>').join('') + '</ul></div>';
                    marker.bindPopup(popupHtml);
                    onMarkerAdded(marker);
                }
        }).catch(()=>{}).finally(() => {
            // wait 450ms between requests
            setTimeout(next, 450);
        });
    }
    next();
}

function geocodeCollege(query) {
    const cacheKey = 'geo::' + query;
    try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) return Promise.resolve(JSON.parse(cached));
    } catch(e) {}

    const url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(query);
    return fetch(url, { headers: { 'Accept': 'application/json' } }).then(r => r.json()).then(arr => {
        if (arr && arr.length) {
            const top = { lat: parseFloat(arr[0].lat), lon: parseFloat(arr[0].lon) };
            try { localStorage.setItem(cacheKey, JSON.stringify(top)); } catch(e) {}
            return top;
        }
        return null;
    }).catch(()=>null);
}

// ensure map widget is set up after DOM and Leaflet loaded
function tryInitMapWidget() {
    if (window.L) setupMapWidget();
    else setTimeout(tryInitMapWidget, 300);
}
tryInitMapWidget();

function chatAsk(text) {
    document.getElementById('chatInput').value = text;
    handleUserMessage();
}

function handleUserMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;
    appendChat('user', text);
    input.value = '';
    // simulate thinking
    setTimeout(() => { botReply(text); }, 600 + Math.random()*600);
}

function appendChat(who, text) {
    const container = document.getElementById('chatMessages');
    const el = document.createElement('div');
    el.className = 'msg ' + (who === 'user' ? 'user' : 'bot');

    // If message contains multiple lines, render as an animated list
    if (text.indexOf('\n') !== -1) {
        const parts = text.split('\n').map(s => s.trim()).filter(Boolean);
        if (parts.length > 1) {
            const ul = document.createElement('ul');
            ul.className = 'chat-list';
            parts.forEach(p => {
                const li = document.createElement('li');
                li.innerHTML = escapeHtml(p);
                ul.appendChild(li);
            });
            el.appendChild(ul);
            container.appendChild(el);
            // stagger show
            const lis = ul.querySelectorAll('li');
            lis.forEach((li, idx) => {
                setTimeout(() => li.classList.add('show'), 80 + idx * 90);
            });
            container.scrollTop = container.scrollHeight;
            return;
        }
    }

    el.innerHTML = escapeHtml(text).replace(/\n/g,'<br>');
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
}

function botReply(text) {
    const lower = text.toLowerCase();

    // Intent: upcoming events
    if (lower.includes('upcoming') || lower.includes('today') || lower.includes('next')) {
        const sample = getPopularEvents(6);
        appendChat('bot', 'Here are some events you might like:\n' + sample.join('\n'));
        return;
    }

    // Intent: interest-based suggestions
    const interests = ['ai','robot','business','cultural','technical','hack','startup','data','coding'];
    for (let it of interests) {
        if (lower.includes(it)) {
            const matches = findEventsByKeyword(it, 8);
            if (matches.length) {
                appendChat('bot', 'Found events related to "' + it + '":\n' + matches.join('\n'));
                return;
            }
        }
    }

    // Intent: find specific event or college
    if (lower.includes('college') || lower.includes('i want') || lower.includes('find')) {
        const found = searchColleges(lower);
        if (found.length) {
            appendChat('bot', 'Matching colleges:\n' + found.join('\n'));
            return;
        }
    }

    // Fallback: offer guidance and quick suggestions
    appendChat('bot', "I can help you find upcoming events, suggest events by interest (e.g. 'AI', 'Business'), or locate colleges. Try: 'Show upcoming events' or 'I like AI'.");
}

function getPopularEvents(limit) {
    const results = [];
    for (let state in data) {
        for (let col in data[state]) {
            for (let ev of data[state][col]) {
                if (results.length < limit) {
                    const key = state + '||' + col + '||' + ev;
                    const date = eventDates[key] ? ' on ' + eventDates[key] : '';
                    results.push(ev + ' — ' + col + ' (' + state + ')' + date);
                }
            }
            if (results.length >= limit) break;
        }
        if (results.length >= limit) break;
    }
    return results;
}

function findEventsByKeyword(keyword, limit) {
    const results = [];
    for (let state in data) {
        for (let col in data[state]) {
            for (let ev of data[state][col]) {
                if (ev.toLowerCase().includes(keyword)) {
                    const key = state + '||' + col + '||' + ev;
                    const date = eventDates[key] ? ' on ' + eventDates[key] : '';
                    results.push(ev + ' — ' + col + ' (' + state + ')' + date);
                    if (results.length >= limit) return results;
                }
            }
        }
    }
    return results;
}

function searchColleges(q) {
    const out = [];
    for (let state in data) {
        for (let col in data[state]) {
            if (col.toLowerCase().includes(q)) out.push(col + ' — ' + state);
        }
    }
    return out.slice(0,8);
}