/**
 * Safe & Smart City – Civic Issue Reporting System
 * Pure Frontend Interactive Engine (Vanilla JS + Leaflet)
 * No backend dependencies; uses localStorage for persistence.
 */

// ═════════════════════════════════════════════════════════════════════
// 1. DATA DEFINITIONS & INITIAL MOCK DATA
// ═════════════════════════════════════════════════════════════════════

const CATEGORIES = [
  { id: 'Solid Waste', name: 'Garbage & Waste', icon: 'fa-trash-can', dept: 'Sanitation Dept.', color: '#f97316', bg: '#ffedd5', sla: '24-48 hrs' },
  { id: 'Roads', name: 'Potholes & Roads', icon: 'fa-road', dept: 'Public Works Dept.', color: '#ef4444', bg: '#fee2e2', sla: '3-5 days' },
  { id: 'Lighting', name: 'Streetlights', icon: 'fa-lightbulb', dept: 'Electricity Board', color: '#eab308', bg: '#fef9c3', sla: '24 hrs' },
  { id: 'Water', name: 'Water Leakage', icon: 'fa-faucet-drip', dept: 'Water & Sewage Board', color: '#0ea5e9', bg: '#e0f2fe', sla: '24 hrs' },
  { id: 'Horticulture', name: 'Fallen Trees & Parks', icon: 'fa-tree', dept: 'Parks & Horticulture', color: '#84cc16', bg: '#ecfccb', sla: '48 hrs' },
  { id: 'Sanitation', name: 'Stagnant Water', icon: 'fa-mosquito', dept: 'Public Health Wing', color: '#8b5cf6', bg: '#ede9fe', sla: '24 hrs' }
];

const WARDS = [
  'Ward 1 - Civil Lines',
  'Ward 2 - Karol Bagh',
  'Ward 3 - Rohini',
  'Ward 4 - Connaught Place',
  'Ward 5 - Saket',
  'Ward 6 - Dwarka',
  'Ward 7 - Mayur Vihar',
  'Ward 8 - Lajpat Nagar'
];

const INITIAL_ISSUES = [
  {
    id: 'SSC-2026-8812',
    title: 'Overflowing garbage dump near Metro Gate 2',
    category: 'Solid Waste',
    ward: 'Ward 4 - Connaught Place',
    description: 'Commercial waste overflowing onto the pedestrian footpath. Foul smell and stray dogs causing severe obstruction.',
    lat: 28.6328,
    lng: 77.2195,
    status: 'IN_PROGRESS',
    priority: 'High',
    reportedBy: 'Ankit Kumar',
    date: '2026-10-10',
    upvotes: 42,
    hasUpvoted: false,
    photo: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=700&q=80',
    resolvedPhoto: null,
    remarks: 'Sanitation team dispatched with a 4-tonne tipper vehicle. Removal in progress.',
    timeline: [
      { step: 'Reported', date: '10 Oct, 09:30 AM', done: true },
      { step: 'Verified by Ward Officer', date: '10 Oct, 11:15 AM', done: true },
      { step: 'Team Dispatched', date: '11 Oct, 08:00 AM', done: true },
      { step: 'In Progress', date: '11 Oct, 10:45 AM', done: true },
      { step: 'Resolved & Closed', date: 'Pending completion', done: false }
    ]
  },
  {
    id: 'SSC-2026-9041',
    title: 'Dangerous deep pothole on Inner Ring Road',
    category: 'Roads',
    ward: 'Ward 2 - Karol Bagh',
    description: 'Approx 1.5 ft deep crater right after the flyover descent. Multiple two-wheelers skidding during night hours.',
    lat: 28.6521,
    lng: 77.1906,
    status: 'RESOLVED',
    priority: 'Critical',
    reportedBy: 'Priya Varma',
    date: '2026-10-08',
    upvotes: 67,
    hasUpvoted: true,
    photo: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=700&q=80',
    resolvedPhoto: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=700&q=80',
    remarks: 'Cold asphalt bituminous mix laid down and steam-rolled. Section tested and opened for traffic.',
    timeline: [
      { step: 'Reported', date: '08 Oct, 07:15 PM', done: true },
      { step: 'Verified by Ward Officer', date: '08 Oct, 08:30 PM', done: true },
      { step: 'Team Dispatched', date: '09 Oct, 06:00 AM', done: true },
      { step: 'In Progress', date: '09 Oct, 09:00 AM', done: true },
      { step: 'Resolved & Closed', date: '09 Oct, 02:30 PM', done: true }
    ]
  },
  {
    id: 'SSC-2026-4190',
    title: 'Dark streetlights - 5 poles dead on Park Avenue',
    category: 'Lighting',
    ward: 'Ward 5 - Saket',
    description: 'Complete blackout along 400 meters of the residential stretch. Women safety concern in evening hours.',
    lat: 28.5244,
    lng: 77.2173,
    status: 'PENDING',
    priority: 'Medium',
    reportedBy: 'Rajesh Sharma',
    date: '2026-10-12',
    upvotes: 18,
    hasUpvoted: false,
    photo: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=700&q=80',
    resolvedPhoto: null,
    remarks: 'Awaiting inspection by Electrical Department feeder squad.',
    timeline: [
      { step: 'Reported', date: '12 Oct, 06:10 AM', done: true },
      { step: 'Verified by Ward Officer', date: 'In review', done: false },
      { step: 'Team Dispatched', date: 'Queued', done: false },
      { step: 'In Progress', date: 'Queued', done: false },
      { step: 'Resolved & Closed', date: 'Pending', done: false }
    ]
  },
  {
    id: 'SSC-2026-3319',
    title: 'Main waterline rupture flooding residential lane',
    category: 'Water',
    ward: 'Ward 6 - Dwarka',
    description: 'High pressure municipal water pipe cracked beneath pavement. Potable water wasting rapidly and flooding basements.',
    lat: 28.5921,
    lng: 77.0460,
    status: 'IN_PROGRESS',
    priority: 'Critical',
    reportedBy: 'Sneha Patel',
    date: '2026-10-11',
    upvotes: 54,
    hasUpvoted: false,
    photo: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=700&q=80',
    resolvedPhoto: null,
    remarks: 'Valve 14 isolated to contain water loss. Excavator deployed to replace damaged connector.',
    timeline: [
      { step: 'Reported', date: '11 Oct, 11:20 AM', done: true },
      { step: 'Verified by Ward Officer', date: '11 Oct, 11:40 AM', done: true },
      { step: 'Team Dispatched', date: '11 Oct, 12:10 PM', done: true },
      { step: 'In Progress', date: '11 Oct, 01:00 PM', done: true },
      { step: 'Resolved & Closed', date: 'Pending', done: false }
    ]
  },
  {
    id: 'SSC-2026-1205',
    title: 'Overgrown banyan tree branch snapping on high voltage line',
    category: 'Horticulture',
    ward: 'Ward 1 - Civil Lines',
    description: 'Heavy limb resting directly on transformer lines, causing dangerous sparks in windy weather.',
    lat: 28.6750,
    lng: 77.2250,
    status: 'RESOLVED',
    priority: 'High',
    reportedBy: 'Amitabh Sen',
    date: '2026-10-07',
    upvotes: 31,
    hasUpvoted: false,
    photo: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=80',
    resolvedPhoto: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=700&q=80',
    remarks: 'Hydraulic ladder team trimmed branches safely with power shutoff approval.',
    timeline: [
      { step: 'Reported', date: '07 Oct, 02:00 PM', done: true },
      { step: 'Verified by Ward Officer', date: '07 Oct, 03:00 PM', done: true },
      { step: 'Team Dispatched', date: '08 Oct, 09:00 AM', done: true },
      { step: 'In Progress', date: '08 Oct, 10:30 AM', done: true },
      { step: 'Resolved & Closed', date: '08 Oct, 01:15 PM', done: true }
    ]
  },
  {
    id: 'SSC-2026-7782',
    title: 'Sewage backflow and stagnant pool near Primary School',
    category: 'Sanitation',
    ward: 'Ward 7 - Mayur Vihar',
    description: 'Choked underground drain backing up into open street right before the school entry gate.',
    lat: 28.6090,
    lng: 77.2980,
    status: 'PENDING',
    priority: 'High',
    reportedBy: 'Kavita Rao',
    date: '2026-10-12',
    upvotes: 29,
    hasUpvoted: false,
    photo: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=700&q=80',
    resolvedPhoto: null,
    remarks: 'Scheduled for super-suction de-silting unit tomorrow 7:00 AM.',
    timeline: [
      { step: 'Reported', date: '12 Oct, 08:45 AM', done: true },
      { step: 'Verified by Ward Officer', date: '12 Oct, 10:00 AM', done: true },
      { step: 'Team Dispatched', date: 'Scheduled', done: false },
      { step: 'In Progress', date: 'Pending', done: false },
      { step: 'Resolved & Closed', date: 'Pending', done: false }
    ]
  }
];

const LEADERBOARD_USERS = [
  { rank: 1, name: 'Rajesh Sharma', karma: 980, reports: 24, badge: 'Civic Champion 🏆' },
  { rank: 2, name: 'Priya Varma', karma: 840, reports: 19, badge: 'Ward Guardian 🌟' },
  { rank: 3, name: 'Ankit Kumar (You)', karma: 620, reports: 14, badge: 'Active Citizen 🏅' },
  { rank: 4, name: 'Sneha Patel', karma: 490, reports: 11, badge: 'Vigilant Citizen 🎖️' },
  { rank: 5, name: 'Amitabh Sen', karma: 360, reports: 8, badge: 'Community Helper 🤝' }
];

// ═════════════════════════════════════════════════════════════════════
// 2. STATE MANAGEMENT & LOCAL STORAGE
// ═════════════════════════════════════════════════════════════════════

let issues = [];
let currentUser = null;

function loadData() {
  const storedIssues = localStorage.getItem('smartcity_issues');
  if (storedIssues) {
    try {
      issues = JSON.parse(storedIssues);
    } catch (e) {
      issues = [...INITIAL_ISSUES];
    }
  } else {
    issues = [...INITIAL_ISSUES];
    saveData();
  }

  const storedUser = localStorage.getItem('smartcity_user');
  if (storedUser) {
    try {
      currentUser = JSON.parse(storedUser);
    } catch (e) {
      currentUser = null;
    }
  } else {
    currentUser = null;
  }
}

function saveData() {
  localStorage.setItem('smartcity_issues', JSON.stringify(issues));
}

function saveUser() {
  if (currentUser) {
    localStorage.setItem('smartcity_user', JSON.stringify(currentUser));
  } else {
    localStorage.removeItem('smartcity_user');
  }
}

// ═════════════════════════════════════════════════════════════════════
// 3. MAP SYSTEM (LEAFLET)
// ═════════════════════════════════════════════

let cityMap = null;
let cityMarkersLayer = null;
let pickerMap = null;
let pickerMarker = null;

function initCityMap() {
  const mapElement = document.getElementById('city-map');
  if (!mapElement) return;

  if (cityMap) {
    cityMap.invalidateSize();
    renderMapMarkers();
    return;
  }

  // Centered on New Delhi / Smart City center
  cityMap = L.map('city-map').setView([28.6139, 77.2090], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(cityMap);

  cityMarkersLayer = L.layerGroup().addTo(cityMap);
  renderMapMarkers();
}

function getMarkerColor(status) {
  if (status === 'RESOLVED') return '#14b8a6'; // teal
  if (status === 'IN_PROGRESS') return '#0ea5e9'; // sky blue
  return '#f97316'; // orange (pending)
}

function createCustomIcon(status, category) {
  const color = getMarkerColor(status);
  const catObj = CATEGORIES.find(c => c.id === category) || { icon: 'fa-location-dot' };

  const html = `
    <div style="
      background: ${color};
      width: 34px;
      height: 34px;
      border-radius: 50%;
      border: 3px solid #ffffff;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 14px;
    ">
      <i class="fa-solid ${catObj.icon}"></i>
    </div>
  `;

  return L.divIcon({
    html: html,
    className: 'custom-leaflet-pin',
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -32]
  });
}

function renderMapMarkers() {
  if (!cityMap || !cityMarkersLayer) return;
  cityMarkersLayer.clearLayers();

  issues.forEach(issue => {
    if (!issue.lat || !issue.lng) return;

    const icon = createCustomIcon(issue.status, issue.category);
    const marker = L.marker([issue.lat, issue.lng], { icon: icon });

    const statusBadgeClass =
      issue.status === 'RESOLVED' ? 'badge-resolved' :
      issue.status === 'IN_PROGRESS' ? 'badge-progress' : 'badge-pending';

    const statusText =
      issue.status === 'RESOLVED' ? 'Resolved' :
      issue.status === 'IN_PROGRESS' ? 'In Progress' : 'Pending';

    const popupHtml = `
      <div style="font-family:Inter,sans-serif;max-width:240px;padding:4px 0;">
        <div style="position:relative;border-radius:6px;overflow:hidden;margin-bottom:6px;">
          <img src="${issue.photo || 'assets/hero-bg.jpg'}" style="width:100%;height:100px;object-fit:cover;display:block;">
          <span style="position:absolute;top:5px;right:5px;padding:2px 7px;border-radius:999px;font-size:10px;font-weight:700;${
            issue.status === 'RESOLVED' ? 'background:#14b8a6;color:#fff;' :
            issue.status === 'IN_PROGRESS' ? 'background:#0ea5e9;color:#fff;' : 'background:#f97316;color:#fff;'
          }">${statusText}</span>
        </div>
        <div style="font-size:11px;font-weight:700;color:#14b8a6;text-transform:uppercase;">${escapeHtml(issue.category)}</div>
        <h4 style="font-size:13px;font-weight:700;margin:3px 0 5px;color:#1a1a2e;line-height:1.3;">${escapeHtml(issue.title)}</h4>
        <div style="font-size:11px;color:#5a6072;margin-bottom:8px;"><i class="fa-solid fa-map-pin"></i> ${escapeHtml(issue.ward)}</div>
        <button onclick="fillTrack('${issue.id}')" style="
          width: 100%;
          background: #14b8a6;
          color: #fff;
          border: none;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
        "><i class="fa-solid fa-magnifying-glass"></i> Track Complaint</button>
      </div>
    `;

    marker.bindPopup(popupHtml);
    cityMarkersLayer.addLayer(marker);
  });
}

function initPickerMap() {
  const pickerElement = document.getElementById('report-map-picker');
  if (!pickerElement) return;

  const defaultLat = 28.6139;
  const defaultLng = 77.2090;

  if (pickerMap) {
    setTimeout(() => {
      pickerMap.invalidateSize();
    }, 200);
    return;
  }

  pickerMap = L.map('report-map-picker').setView([defaultLat, defaultLng], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap'
  }).addTo(pickerMap);

  pickerMarker = L.marker([defaultLat, defaultLng], {
    draggable: true
  }).addTo(pickerMap);

  document.getElementById('report-lat').value = defaultLat.toFixed(5);
  document.getElementById('report-lng').value = defaultLng.toFixed(5);

  pickerMarker.on('dragend', function (e) {
    const pos = e.target.getLatLng();
    document.getElementById('report-lat').value = pos.lat.toFixed(5);
    document.getElementById('report-lng').value = pos.lng.toFixed(5);
  });

  pickerMap.on('click', function (e) {
    pickerMarker.setLatLng(e.latlng);
    document.getElementById('report-lat').value = e.latlng.lat.toFixed(5);
    document.getElementById('report-lng').value = e.latlng.lng.toFixed(5);
  });

  setTimeout(() => {
    pickerMap.invalidateSize();
  }, 200);
}

function detectGPS() {
  const statusEl = document.getElementById('gps-status');
  if (statusEl) {
    statusEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Getting GPS...';
  }

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        document.getElementById('report-lat').value = lat.toFixed(5);
        document.getElementById('report-lng').value = lng.toFixed(5);

        if (pickerMap && pickerMarker) {
          pickerMap.setView([lat, lng], 15);
          pickerMarker.setLatLng([lat, lng]);
          pickerMap.invalidateSize();
        }

        if (statusEl) {
          statusEl.innerHTML = '<span style="color:var(--teal-500);"><i class="fa-solid fa-check"></i> Acquired accurate GPS</span>';
        }
        showToast('GPS coordinates acquired successfully!', 'success');
      },
      (error) => {
        // Fallback demo coordinates with slight jitter
        const demoLat = 28.6139 + (Math.random() - 0.5) * 0.05;
        const demoLng = 77.2090 + (Math.random() - 0.5) * 0.05;
        document.getElementById('report-lat').value = demoLat.toFixed(5);
        document.getElementById('report-lng').value = demoLng.toFixed(5);

        if (pickerMap && pickerMarker) {
          pickerMap.setView([demoLat, demoLng], 14);
          pickerMarker.setLatLng([demoLat, demoLng]);
          pickerMap.invalidateSize();
        }

        if (statusEl) {
          statusEl.innerHTML = '<span style="color:var(--orange-500);"><i class="fa-solid fa-location-crosshairs"></i> Default City GPS used</span>';
        }
        showToast('Simulated GPS coordinates pinned for Smart City.', 'warning');
      },
      { timeout: 7000 }
    );
  } else {
    showToast('Geolocation not supported by your browser.', 'error');
  }
}

// ═════════════════════════════════════════════════════════════════════
// 4. UI POPULATION & RENDERING
// ═════════════════════════════════════════════

function populateDropdowns() {
  // Category dropdowns
  const catReport = document.getElementById('report-category');
  const catFilter = document.getElementById('filter-category');

  if (catReport) {
    catReport.innerHTML = CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  }

  if (catFilter) {
    catFilter.innerHTML = '<option value="">All Categories</option>' +
      CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  }

  // Ward dropdowns
  const wardReport = document.getElementById('report-ward');
  const wardFilter = document.getElementById('filter-ward');

  if (wardReport) {
    wardReport.innerHTML = WARDS.map(w => `<option value="${w}">${w}</option>`).join('');
  }

  if (wardFilter) {
    wardFilter.innerHTML = '<option value="">All Wards</option>' +
      WARDS.map(w => `<option value="${w}">${w}</option>`).join('');
  }
}

function renderCategories() {
  const container = document.getElementById('cat-grid');
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => {
    const count = issues.filter(i => i.category === cat.id).length;
    return `
      <div class="cat-card" onclick="selectCategoryFilter('${cat.id}')">
        <div class="cat-icon" style="background:${cat.bg};color:${cat.color};">
          <i class="fa-solid ${cat.icon}"></i>
        </div>
        <div>
          <div class="cat-name">${cat.name}</div>
          <div class="cat-dept">${cat.dept}</div>
          <div class="cat-sla"><i class="fa-regular fa-clock"></i> SLA: ${cat.sla} &bull; ${count} active</div>
        </div>
      </div>
    `;
  }).join('');
}

function selectCategoryFilter(catId) {
  switchTab('explore');
  const filterCat = document.getElementById('filter-category');
  if (filterCat) {
    filterCat.value = catId;
    renderIssues();
  }
}

function updateStats() {
  const total = issues.length;
  const resolved = issues.filter(i => i.status === 'RESOLVED').length;
  const inProgress = issues.filter(i => i.status === 'IN_PROGRESS').length;
  const pending = issues.filter(i => i.status === 'PENDING').length;

  const totalEl = document.getElementById('stat-total');
  const resolvedEl = document.getElementById('stat-resolved');
  const hotspotsEl = document.getElementById('stat-hotspots');
  const citizensEl = document.getElementById('stat-citizens');

  if (totalEl) totalEl.textContent = total;
  if (resolvedEl) resolvedEl.textContent = resolved;
  if (hotspotsEl) hotspotsEl.textContent = Math.max(1, inProgress + pending);
  if (citizensEl) citizensEl.textContent = (1340 + total).toLocaleString();

  // Admin KPI counters
  const adminPending = document.querySelector('.admin-kpi:nth-child(1) .admin-kpi-val');
  const adminProgress = document.querySelector('.admin-kpi:nth-child(2) .admin-kpi-val');
  const adminResolved = document.querySelector('.admin-kpi:nth-child(3) .admin-kpi-val');

  if (adminPending) adminPending.textContent = pending;
  if (adminProgress) adminProgress.textContent = inProgress;
  if (adminResolved) adminResolved.textContent = resolved;
}

function createIssueCardHTML(issue) {
  const statusBadge =
    issue.status === 'RESOLVED' ? '<span class="issue-status-badge badge-resolved"><i class="fa-solid fa-check"></i> Resolved</span>' :
    issue.status === 'IN_PROGRESS' ? '<span class="issue-status-badge badge-progress"><i class="fa-solid fa-arrows-rotate fa-spin"></i> In Progress</span>' :
    '<span class="issue-status-badge badge-pending"><i class="fa-regular fa-clock"></i> Pending</span>';

  const catObj = CATEGORIES.find(c => c.id === issue.category) || { icon: 'fa-tag' };
  const upvotedClass = issue.hasUpvoted ? 'voted' : '';

  return `
    <div class="issue-card" id="card-${issue.id}">
      <div class="issue-img">
        <img src="${issue.photo || 'assets/hero-bg.jpg'}" alt="${escapeHtml(issue.title)}" loading="lazy">
        ${statusBadge}
      </div>
      <div class="issue-body">
        <span class="issue-cat-tag">
          <i class="fa-solid ${catObj.icon}"></i> ${escapeHtml(issue.category)}
        </span>
        <h3 class="issue-title">${escapeHtml(issue.title)}</h3>
        <p class="issue-desc">${escapeHtml(issue.description || 'No description provided.')}</p>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.6rem;">
          <div class="issue-track-id"><i class="fa-solid fa-hashtag"></i> ${issue.id}</div>
          <span style="font-size:0.75rem;color:var(--text-dim);"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(issue.ward.split('-')[1] || issue.ward)}</span>
        </div>
      </div>
      <div class="issue-meta">
        <div class="issue-meta-left">
          <i class="fa-regular fa-calendar"></i> ${issue.date}
        </div>
        <div style="display:flex;gap:0.4rem;align-items:center;">
          <button class="upvote-btn ${upvotedClass}" onclick="upvoteIssue('${issue.id}')" title="Upvote this complaint">
            <i class="fa-solid fa-heart"></i> <span id="upvotes-${issue.id}">${issue.upvotes}</span>
          </button>
          <button class="btn btn-outline btn-sm" onclick="fillTrack('${issue.id}')" style="padding:0.35rem 0.65rem;font-size:0.78rem;">
            <i class="fa-solid fa-timeline"></i> Track
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderHomeFeed() {
  const container = document.getElementById('home-issues-grid');
  if (!container) return;

  const topIssues = issues.slice(0, 3);
  container.innerHTML = topIssues.map(createIssueCardHTML).join('');
}

function renderIssues() {
  const exploreContainer = document.getElementById('explore-issues-grid');
  if (!exploreContainer) return;

  const searchVal = (document.getElementById('search-input')?.value || '').toLowerCase().trim();
  const catVal = document.getElementById('filter-category')?.value || '';
  const statusVal = document.getElementById('filter-status')?.value || '';
  const wardVal = document.getElementById('filter-ward')?.value || '';

  const filtered = issues.filter(issue => {
    const matchesSearch =
      !searchVal ||
      issue.title.toLowerCase().includes(searchVal) ||
      issue.id.toLowerCase().includes(searchVal) ||
      (issue.description && issue.description.toLowerCase().includes(searchVal));

    const matchesCat = !catVal || issue.category === catVal;
    const matchesStatus = !statusVal || issue.status === statusVal;
    const matchesWard = !wardVal || issue.ward === wardVal;

    return matchesSearch && matchesCat && matchesStatus && matchesWard;
  });

  if (filtered.length === 0) {
    exploreContainer.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:3rem 1rem;color:var(--text-sub);">
        <i class="fa-solid fa-folder-open" style="font-size:3rem;color:var(--text-dim);margin-bottom:1rem;"></i>
        <h3>No issues found</h3>
        <p style="font-size:0.9rem;margin-top:0.3rem;">Try adjusting your search or filters to see more results.</p>
        <button class="btn btn-teal btn-sm" style="margin-top:1rem;" onclick="resetFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  exploreContainer.innerHTML = filtered.map(createIssueCardHTML).join('');
}

function resetFilters() {
  if (document.getElementById('search-input')) document.getElementById('search-input').value = '';
  if (document.getElementById('filter-category')) document.getElementById('filter-category').value = '';
  if (document.getElementById('filter-status')) document.getElementById('filter-status').value = '';
  if (document.getElementById('filter-ward')) document.getElementById('filter-ward').value = '';
  renderIssues();
}

function renderMyReports() {
  const tbody = document.getElementById('my-reports-body');
  if (!tbody) return;

  // Filter issues safely even if currentUser is null
  const userName = currentUser ? currentUser.name : '';
  const myIssues = issues.filter(i => (userName && i.reportedBy === userName) || i.reportedBy.includes('Ankit'));
  const displayList = myIssues.length > 0 ? myIssues : issues.slice(0, 4);

  tbody.innerHTML = displayList.map(issue => {
    const statusBadge =
      issue.status === 'RESOLVED' ? '<span class="issue-status-badge badge-resolved" style="position:static;">Resolved</span>' :
      issue.status === 'IN_PROGRESS' ? '<span class="issue-status-badge badge-progress" style="position:static;">In Progress</span>' :
      '<span class="issue-status-badge badge-pending" style="position:static;">Pending</span>';

    return `
      <tr>
        <td style="font-family:var(--font-mono);font-weight:600;color:var(--teal-500);">${issue.id}</td>
        <td><strong>${escapeHtml(issue.title)}</strong><br><span style="font-size:0.78rem;color:var(--text-dim);">${escapeHtml(issue.category)}</span></td>
        <td>${escapeHtml(issue.ward)}</td>
        <td>${statusBadge}</td>
        <td>${issue.date}</td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="fillTrack('${issue.id}')">
            <i class="fa-solid fa-eye"></i> View
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function renderAdminTable() {
  const tbody = document.getElementById('admin-reports-body');
  if (!tbody) return;

  tbody.innerHTML = issues.map(issue => {
    const priorityColor =
      issue.priority === 'Critical' ? '#ef4444' :
      issue.priority === 'High' ? '#f97316' : '#84cc16';

    const statusBadge =
      issue.status === 'RESOLVED' ? '<span class="issue-status-badge badge-resolved" style="position:static;">Resolved</span>' :
      issue.status === 'IN_PROGRESS' ? '<span class="issue-status-badge badge-progress" style="position:static;">In Progress</span>' :
      '<span class="issue-status-badge badge-pending" style="position:static;">Pending</span>';

    return `
      <tr>
        <td style="font-family:var(--font-mono);font-weight:600;">${issue.id}</td>
        <td><strong>${escapeHtml(issue.title)}</strong><br><span style="font-size:0.78rem;color:var(--text-dim);">${escapeHtml(issue.category)}</span></td>
        <td>${escapeHtml(issue.ward)}</td>
        <td><span style="font-weight:700;color:${priorityColor};font-size:0.8rem;">${issue.priority || 'Medium'}</span></td>
        <td>${statusBadge}</td>
        <td>
          <div style="display:flex;gap:0.4rem;">
            ${issue.status !== 'RESOLVED' ? `
              <button class="btn btn-teal btn-sm" onclick="openResolveModal('${issue.id}')" title="Upload proof and resolve">
                <i class="fa-solid fa-check"></i> Resolve
              </button>
            ` : `
              <button class="btn btn-outline btn-sm" onclick="fillTrack('${issue.id}')" title="Inspect resolution proof">
                <i class="fa-solid fa-image"></i> Proof
              </button>
            `}
            ${issue.status === 'PENDING' ? `
              <button class="btn btn-outline btn-sm" onclick="adminMarkInProgress('${issue.id}')" title="Assign squad">
                <i class="fa-solid fa-play"></i> Start
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderLeaderboard() {
  const container = document.getElementById('leaderboard-list');
  if (!container) return;

  container.innerHTML = LEADERBOARD_USERS.map(u => {
    const rankClass =
      u.rank === 1 ? 'lb-rank-1' :
      u.rank === 2 ? 'lb-rank-2' :
      u.rank === 3 ? 'lb-rank-3' : 'lb-rank-other';

    return `
      <div class="lb-row">
        <div class="lb-rank ${rankClass}">#${u.rank}</div>
        <div class="lb-info">
          <div class="lb-name">${escapeHtml(u.name)}</div>
          <div class="lb-badge">${escapeHtml(u.badge)} &bull; ${u.reports} verified reports</div>
        </div>
        <div class="lb-pts">${u.karma} <span style="font-size:0.75rem;font-weight:600;color:var(--text-dim);">PTS</span></div>
      </div>
    `;
  }).join('');
}

// ═════════════════════════════════════════════════════════════════════
// 5. INTERACTIVE ACTIONS (REPORT, UPVOTE, RESOLVE, TRACK)
// ═════════════════════════════════════════════

function upvoteIssue(id) {
  const issue = issues.find(i => i.id === id);
  if (!issue) return;

  if (issue.hasUpvoted) {
    issue.upvotes -= 1;
    issue.hasUpvoted = false;
    showToast('Upvote removed.');
  } else {
    issue.upvotes += 1;
    issue.hasUpvoted = true;
    showToast('Issue upvoted! Priority escalated for municipality.', 'success');
  }

  saveData();

  // Update UI inline if present
  const counter = document.getElementById(`upvotes-${id}`);
  if (counter) counter.textContent = issue.upvotes;

  const card = document.getElementById(`card-${id}`);
  if (card) {
    const btn = card.querySelector('.upvote-btn');
    if (btn) btn.classList.toggle('voted', issue.hasUpvoted);
  }
}

let pendingPhotoBase64 = null;

function setupPhotoPreview() {
  const photoInput = document.getElementById('report-photo');
  const previewContainer = document.getElementById('photo-preview');
  const previewImg = document.getElementById('photo-preview-img');

  if (photoInput) {
    photoInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (evt) {
          pendingPhotoBase64 = evt.target.result;
          if (previewImg) previewImg.src = pendingPhotoBase64;
          if (previewContainer) previewContainer.style.display = 'block';
        };
        reader.readAsDataURL(file);
      } else {
        pendingPhotoBase64 = null;
        if (previewContainer) previewContainer.style.display = 'none';
      }
    });
  }
}

function submitReport() {
  const category = document.getElementById('report-category')?.value;
  const title = document.getElementById('report-title')?.value.trim();
  const desc = document.getElementById('report-desc')?.value.trim();
  const ward = document.getElementById('report-ward')?.value;
  const lat = parseFloat(document.getElementById('report-lat')?.value) || 28.6139;
  const lng = parseFloat(document.getElementById('report-lng')?.value) || 77.2090;

  if (!title) {
    showToast('Please enter an issue title.', 'warning');
    document.getElementById('report-title')?.focus();
    return;
  }

  // Generate unique tracking ID
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newId = `SSC-2026-${randomNum}`;

  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];

  const defaultPhoto = getFallbackPhoto(category);

  const newIssue = {
    id: newId,
    title: title,
    category: category,
    ward: ward,
    description: desc,
    lat: lat,
    lng: lng,
    status: 'PENDING',
    priority: 'High',
    reportedBy: currentUser ? currentUser.name : 'Citizen User',
    date: dateStr,
    upvotes: 1,
    hasUpvoted: true,
    photo: pendingPhotoBase64 || defaultPhoto,
    resolvedPhoto: null,
    remarks: 'Complaint registered. Assigned to ward nodal officer for verification.',
    timeline: [
      { step: 'Reported', date: `${dateStr}, ${today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, done: true },
      { step: 'Verified by Ward Officer', date: 'Pending triage', done: false },
      { step: 'Team Dispatched', date: 'Queued', done: false },
      { step: 'In Progress', date: 'Queued', done: false },
      { step: 'Resolved & Closed', date: 'Pending', done: false }
    ]
  };

  issues.unshift(newIssue);
  saveData();

  // Add Karma points safely
  if (currentUser) {
    currentUser.karma = (currentUser.karma || 50) + 50;
    saveUser();
  }

  // Reset form
  document.getElementById('report-title').value = '';
  document.getElementById('report-desc').value = '';
  pendingPhotoBase64 = null;
  const previewContainer = document.getElementById('photo-preview');
  if (previewContainer) previewContainer.style.display = 'none';
  const photoInput = document.getElementById('report-photo');
  if (photoInput) photoInput.value = '';

  closeModal('modal-report');

  // Refresh all views
  updateStats();
  renderCategories();
  renderHomeFeed();
  renderIssues();
  renderMyReports();
  renderAdminTable();
  renderMapMarkers();

  showToast(`Complaint filed successfully! Tracking ID: ${newId} (+50 Civic Karma)`, 'success');

  // Open tracking modal right away so citizen sees their tracking code
  fillTrack(newId);
}

function getFallbackPhoto(category) {
  if (category === 'Solid Waste') return 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=700&q=80';
  if (category === 'Roads') return 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=700&q=80';
  if (category === 'Lighting') return 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=700&q=80';
  if (category === 'Water') return 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=700&q=80';
  if (category === 'Horticulture') return 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=80';
  return 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=700&q=80';
}

// Quick Tracker
function handleQuickTrack(event) {
  if (event) event.preventDefault();
  const input = document.getElementById('quick-track-input');
  if (!input) return;
  const trackId = input.value.trim().toUpperCase();
  if (!trackId) return;

  fillTrack(trackId);
}

function fillTrack(trackId) {
  const input = document.getElementById('quick-track-input');
  if (input) input.value = trackId;

  const issue = issues.find(i => i.id.toUpperCase() === trackId.toUpperCase());
  if (!issue) {
    showToast(`No report found with ID "${trackId}". Please verify.`, 'error');
    return;
  }

  renderTrackingModal(issue);
  openModal('modal-track');
}

function renderTrackingModal(issue) {
  const body = document.getElementById('track-modal-body');
  if (!body) return;

  const statusBadge =
    issue.status === 'RESOLVED' ? '<span class="issue-status-badge badge-resolved" style="position:static;">Resolved</span>' :
    issue.status === 'IN_PROGRESS' ? '<span class="issue-status-badge badge-progress" style="position:static;">In Progress</span>' :
    '<span class="issue-status-badge badge-pending" style="position:static;">Pending Triage</span>';

  // Build Stepper
  const stepperHTML = `
    <div class="stepper">
      ${issue.timeline.map((item, idx) => {
        let stepClass = '';
        if (item.done) {
          stepClass = 'completed';
        } else if (idx > 0 && issue.timeline[idx - 1].done) {
          stepClass = 'active';
        }

        return `
          <div class="stepper-step ${stepClass}">
            <div class="stepper-circle">
              ${item.done ? '<i class="fa-solid fa-check"></i>' : (idx + 1)}
            </div>
            <div class="stepper-label">${item.step}</div>
            <div style="font-size:0.65rem;color:var(--text-dim);margin-top:2px;">${item.date}</div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Photo comparison grid
  const photoGridHTML = `
    <div class="proof-grid">
      <div class="proof-box">
        <div class="proof-label" style="background:var(--red-100);color:var(--red-500);"><i class="fa-solid fa-camera"></i> Before Photo (Reported)</div>
        <img src="${issue.photo || 'assets/hero-bg.jpg'}" alt="Before proof">
      </div>
      <div class="proof-box">
        <div class="proof-label" style="background:${issue.resolvedPhoto ? 'var(--lime-100);color:var(--lime-500)' : 'var(--bg);color:var(--text-dim)'};">
          <i class="fa-solid fa-circle-check"></i> After Proof (Resolution)
        </div>
        ${issue.resolvedPhoto ? `
          <img src="${issue.resolvedPhoto}" alt="After resolution proof">
        ` : `
          <div style="height:200px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--text-dim);background:rgba(0,0,0,0.02);padding:1rem;text-align:center;">
            <i class="fa-regular fa-clock" style="font-size:2rem;margin-bottom:0.5rem;"></i>
            <span style="font-size:0.8rem;">Resolution photo proof will be uploaded by the municipal team upon work completion.</span>
          </div>
        `}
      </div>
    </div>
  `;

  body.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem;">
      <div>
        <div style="font-family:var(--font-mono);font-size:0.85rem;color:var(--teal-500);font-weight:700;">
          <i class="fa-solid fa-hashtag"></i> ${issue.id}
        </div>
        <h3 style="font-size:1.25rem;font-weight:800;margin:0.25rem 0 0.2rem;">${escapeHtml(issue.title)}</h3>
        <div style="font-size:0.82rem;color:var(--text-sub);">
          <i class="fa-solid fa-location-dot"></i> ${escapeHtml(issue.ward)} &bull; Reported by <strong>${escapeHtml(issue.reportedBy)}</strong> on ${issue.date}
        </div>
      </div>
      <div>${statusBadge}</div>
    </div>

    <div style="background:var(--bg);border:1px solid var(--border);border-radius:var(--r-sm);padding:0.75rem 1rem;font-size:0.85rem;margin-bottom:1rem;">
      <strong>Description:</strong> ${escapeHtml(issue.description || 'No description provided.')}
    </div>

    <h4 style="font-size:0.9rem;font-weight:700;margin-bottom:0.5rem;color:var(--text-sub);text-transform:uppercase;letter-spacing:0.04em;">
      Live Resolution Stepper
    </h4>
    ${stepperHTML}

    <h4 style="font-size:0.9rem;font-weight:700;margin-top:1.5rem;margin-bottom:0.5rem;color:var(--text-sub);text-transform:uppercase;letter-spacing:0.04em;">
      Visual Verification & Evidence
    </h4>
    ${photoGridHTML}

    <div style="background:rgba(20,184,166,0.06);border:1px solid rgba(20,184,166,0.2);border-radius:var(--r-sm);padding:0.85rem 1rem;margin-top:1rem;">
      <div style="font-size:0.75rem;font-weight:700;color:var(--teal-600);text-transform:uppercase;letter-spacing:0.04em;">
        <i class="fa-solid fa-bullhorn"></i> Municipal Department Remarks
      </div>
      <p style="font-size:0.88rem;color:var(--text);margin-top:0.3rem;">
        ${escapeHtml(issue.remarks || 'Awaiting assignment from ward officer.')}
      </p>
    </div>

    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:1.25rem;padding-top:1rem;border-top:1px solid var(--border);">
      <div style="font-size:0.78rem;color:var(--text-dim);">
        <i class="fa-solid fa-map-pin"></i> GPS: ${issue.lat ? issue.lat.toFixed(4) : '28.6139'}, ${issue.lng ? issue.lng.toFixed(4) : '77.2090'}
      </div>
      <button class="btn btn-outline btn-sm" onclick="locateOnMap(${issue.lat}, ${issue.lng})">
        <i class="fa-solid fa-map-location-dot"></i> View on City Map
      </button>
    </div>
  `;
}

function locateOnMap(lat, lng) {
  closeModal('modal-track');
  switchTab('map');
  if (cityMap && lat && lng) {
    cityMap.setView([lat, lng], 15);
  }
}

// Admin workflow
let resolvingIssueId = null;
let resolvePhotoBase64 = null;

function openResolveModal(issueId) {
  resolvingIssueId = issueId;
  const fileInput = document.getElementById('resolve-photo');
  const remarksInput = document.getElementById('resolve-remarks');
  if (fileInput) fileInput.value = '';
  if (remarksInput) remarksInput.value = '';
  resolvePhotoBase64 = null;

  openModal('modal-resolve');
}

function setupResolvePhoto() {
  const photoInput = document.getElementById('resolve-photo');
  if (photoInput) {
    photoInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (evt) {
          resolvePhotoBase64 = evt.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

function resolveIssue() {
  if (!resolvingIssueId) return;
  const issue = issues.find(i => i.id === resolvingIssueId);
  if (!issue) return;

  const remarks = document.getElementById('resolve-remarks')?.value.trim();

  issue.status = 'RESOLVED';
  issue.resolvedPhoto = resolvePhotoBase64 || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=700&q=80';
  if (remarks) issue.remarks = remarks;

  // Complete all timeline steps
  issue.timeline.forEach(step => {
    step.done = true;
    if (step.date.includes('Pending') || step.date.includes('Queued')) {
      step.date = 'Completed just now';
    }
  });

  saveData();
  closeModal('modal-resolve');

  updateStats();
  renderAdminTable();
  renderIssues();
  renderHomeFeed();
  renderMyReports();
  renderMapMarkers();

  showToast(`Complaint ${issue.id} marked as RESOLVED with proof!`, 'success');
}

function adminMarkInProgress(issueId) {
  const issue = issues.find(i => i.id === issueId);
  if (!issue) return;

  issue.status = 'IN_PROGRESS';
  issue.remarks = 'Field maintenance squad mobilized to target coordinates.';

  if (issue.timeline && issue.timeline.length >= 4) {
    issue.timeline[1].done = true;
    issue.timeline[2].done = true;
    issue.timeline[3].done = true;
  }

  saveData();
  updateStats();
  renderAdminTable();
  renderIssues();
  renderMapMarkers();
  showToast(`Issue ${issue.id} transitioned to IN_PROGRESS.`, 'success');
}

// ═════════════════════════════════════════════════════════════════════
// 6. TABS, THEMES, AUTH & MODALS
// ═════════════════════════════════════════════

function switchTab(tabId) {
  // Role Protection: Guard the Admin tab
  if (tabId === 'admin') {
    if (!currentUser || currentUser.role !== 'admin') {
      showToast('Access Restricted: Official Municipal Admin credentials required.', 'warning');
      showAuthGateway('admin');
      return;
    }
  }

  // Update nav links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.getAttribute('data-tab') === tabId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Update tab panels
  const panels = document.querySelectorAll('.tab-panel');
  panels.forEach(panel => {
    if (panel.id === `tab-${tabId}`) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });

  // Special behavior per tab
  if (tabId === 'map') {
    setTimeout(initCityMap, 150);
  } else if (tabId === 'explore') {
    renderIssues();
  } else if (tabId === 'my-reports') {
    renderMyReports();
  } else if (tabId === 'admin') {
    renderAdminTable();
  } else if (tabId === 'leaderboard') {
    renderLeaderboard();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}


function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('active');

  if (modalId === 'modal-report') {
    setTimeout(initPickerMap, 200);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('active');
}

// Close modals on clicking overlay background
window.addEventListener('click', function (e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

// ESC key closes modals
window.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
  }
});

// ═════════════════════════════════════════════════════════════════════
// 6B. AUTHENTICATION GATEWAY & ROLE CONTROL ENGINE
// ═════════════════════════════════════════════════════════════════════

function checkAuthGate() {
  const gateway = document.getElementById('auth-gateway');
  if (!currentUser) {
    showAuthGateway('citizen');
  } else {
    hideAuthGateway();
    updateNavForUser();
    if (currentUser.role === 'admin') {
      switchTab('admin');
    } else {
      switchTab('home');
    }
  }
}

function showAuthGateway(portal = 'citizen') {
  const gateway = document.getElementById('auth-gateway');
  const closeCross = document.getElementById('gateway-close-cross');
  if (gateway) {
    gateway.style.display = 'flex';
    gateway.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  // Only show the close (X) button if user already has an active signed-in session
  if (closeCross) {
    if (currentUser && currentUser.role && currentUser.role !== 'guest') {
      closeCross.style.display = 'flex';
    } else {
      closeCross.style.display = 'none';
    }
  }
  switchAuthPortal(portal);
}

function handleGatewayClose() {
  // If user is not logged in, closing the portal explicitly switches to Guest mode rather than leaving a broken/old state
  if (!currentUser || currentUser.role === 'guest') {
    continueAsGuest();
  } else {
    hideAuthGateway();
  }
}

function hideAuthGateway() {
  const gateway = document.getElementById('auth-gateway');
  if (gateway) {
    gateway.classList.add('hidden');
    gateway.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function switchAuthPortal(portal) {
  const btnCitizen = document.getElementById('btn-portal-citizen');
  const btnAdmin = document.getElementById('btn-portal-admin');
  const paneCitizen = document.getElementById('pane-citizen-auth');
  const paneAdmin = document.getElementById('pane-admin-auth');

  if (portal === 'citizen') {
    btnCitizen?.classList.add('active', 'citizen');
    btnAdmin?.classList.remove('active', 'admin');
    if (paneCitizen) paneCitizen.style.display = 'block';
    if (paneAdmin) paneAdmin.style.display = 'none';
  } else {
    btnAdmin?.classList.add('active', 'admin');
    btnCitizen?.classList.remove('active', 'citizen');
    if (paneCitizen) paneCitizen.style.display = 'none';
    if (paneAdmin) paneAdmin.style.display = 'block';
  }
}

function toggleCitizenForm(showRegister) {
  const loginForm = document.getElementById('citizen-login-form');
  const regForm = document.getElementById('citizen-register-form');
  if (loginForm && regForm) {
    loginForm.style.display = showRegister ? 'none' : 'block';
    regForm.style.display = showRegister ? 'block' : 'none';
  }
}

function fillDemoCitizen() {
  const emailInput = document.getElementById('c-login-email');
  const passInput = document.getElementById('c-login-pass');
  if (emailInput) emailInput.value = 'ankit@smartcity.gov';
  if (passInput) passInput.value = 'citizen123';
  showToast('Demo Citizen credentials loaded!', 'success');
}

function fillDemoAdmin() {
  const emailInput = document.getElementById('a-login-email');
  const passInput = document.getElementById('a-login-pass');
  if (emailInput) emailInput.value = 'admin@smartcity.gov';
  if (passInput) passInput.value = 'admin123';
  showToast('Official Admin credentials loaded!', 'success');
}

async function handleCitizenLogin() {
  let email = document.getElementById('c-login-email')?.value.trim();
  let password = document.getElementById('c-login-pass')?.value;

  // Gracefully fallback to citizen credentials if empty
  if (!email) email = 'citizen@smartcity.gov';
  if (!password) password = 'citizen123';

  let authenticatedCitizen = null;

  try {
    const res = await fetch('api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && data.user) {
        authenticatedCitizen = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: 'citizen',
          ward: data.user.ward || 'Ward 4 - Connaught Place',
          karma: data.user.civic_points || 120
        };
        if (data.token) localStorage.setItem('smartcity_token', data.token);
      }
    }
  } catch (err) {
    // Standalone / Offline mode
  }

  // Standalone reliable fallback
  if (!authenticatedCitizen) {
    const cleanName = email.split('@')[0].replace(/[._]/g, ' ');
    let formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    if (formattedName.toLowerCase() === 'citizen' || formattedName.toLowerCase() === 'ankit') {
      formattedName = 'Ankit Kumar';
    }
    authenticatedCitizen = {
      id: 101,
      name: formattedName || 'Ankit Kumar',
      email: email,
      role: 'citizen',
      ward: 'Ward 4 - Connaught Place',
      karma: 120
    };
  }

  currentUser = authenticatedCitizen;
  saveUser();
  hideAuthGateway();
  updateNavForUser();
  switchTab('home');
  renderMyReports();
  showToast(`Welcome back, ${currentUser.name}! Signed in to Citizen Portal.`, 'success');
}

async function handleCitizenRegister() {
  let name = document.getElementById('c-reg-name')?.value.trim();
  let email = document.getElementById('c-reg-email')?.value.trim();
  let phone = document.getElementById('c-reg-phone')?.value.trim() || '98100XXXXX';
  let password = document.getElementById('c-reg-pass')?.value;
  let ward = 'City Central';

  if (!name) name = 'Ankit Kumar';
  if (!email) email = 'ankit@smartcity.gov';
  if (!password) password = 'pass123';

  let registeredCitizen = null;

  try {
    const res = await fetch('api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password, ward })
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && data.user) {
        registeredCitizen = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: 'citizen',
          ward: ward,
          karma: data.user.civic_points || 50
        };
        if (data.token) localStorage.setItem('smartcity_token', data.token);
      }
    }
  } catch (err) {
    // Offline fallback
  }

  if (!registeredCitizen) {
    registeredCitizen = {
      id: Date.now(),
      name: name,
      email: email,
      phone: phone,
      ward: ward,
      role: 'citizen',
      karma: 50
    };
  }

  currentUser = registeredCitizen;
  saveUser();
  hideAuthGateway();
  updateNavForUser();
  switchTab('home');
  renderMyReports();
  showToast(`Account created! Welcome, ${currentUser.name}. +50 Welcome Karma added!`, 'success');
}

function handleAdminLogin() {
  let email = document.getElementById('a-login-email')?.value.trim();
  let password = document.getElementById('a-login-pass')?.value;

  if (!email) email = 'admin@smartcity.gov';
  if (!password) password = 'admin123';

  // Set official Municipal Admin Profile
  currentUser = {
    id: 999,
    name: 'Municipal Admin Officer',
    email: email,
    role: 'admin',
    karma: 9999
  };

  saveUser();
  hideAuthGateway();
  updateNavForUser();
  switchTab('admin');
  showToast('Authorized! Signed in to Municipal Admin Console.', 'success');
}

function continueAsGuest() {
  currentUser = {
    id: 0,
    name: 'Guest Citizen',
    email: 'guest@smartcity.gov',
    role: 'guest',
    karma: 0
  };
  saveUser();
  hideAuthGateway();
  updateNavForUser();
  switchTab('home');
  showToast('Browsing as Guest. You can explore the Live Map and Track Complaints.', 'info');
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem('smartcity_user');
  localStorage.removeItem('smartcity_token');
  updateNavForUser();
  showAuthGateway('citizen');
  showToast('Logged out successfully. Please sign in to continue.', 'info');
}

function updateNavForUser() {
  const navUserArea = document.getElementById('nav-user-area');
  const navTabAdmin = document.getElementById('nav-tab-admin');

  // Control visibility of Admin tab in navbar
  if (navTabAdmin) {
    if (currentUser && currentUser.role === 'admin') {
      navTabAdmin.style.display = 'block';
    } else {
      navTabAdmin.style.display = 'none';
    }
  }

  if (!navUserArea) return;

  if (!currentUser || currentUser.role === 'guest') {
    navUserArea.innerHTML = `
      <button class="btn btn-outline btn-sm" onclick="showAuthGateway('citizen')">
        <i class="fa-solid fa-right-to-bracket"></i> Sign In / Portal
      </button>
    `;
    return;
  }

  if (currentUser.role === 'admin') {
    navUserArea.innerHTML = `
      <div class="nav-user-chip admin">
        <div class="nav-user-avatar"><i class="fa-solid fa-shield-halved"></i></div>
        <div class="nav-user-meta">
          <span class="nav-user-name">${escapeHtml(currentUser.name)}</span>
          <span class="nav-user-badge">OFFICER • ${escapeHtml(currentUser.dept ? currentUser.dept.split(' ')[0] : 'ADMIN')}</span>
        </div>
        <button type="button" class="btn-logout" onclick="handleLogout()" title="Logout / Switch Portal">
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    `;
  } else {
    navUserArea.innerHTML = `
      <div class="nav-user-chip">
        <div class="nav-user-avatar"><i class="fa-solid fa-user"></i></div>
        <div class="nav-user-meta">
          <span class="nav-user-name">${escapeHtml(currentUser.name)}</span>
          <span class="nav-user-badge"><i class="fa-solid fa-star" style="color:var(--orange-500);"></i> ${currentUser.karma || 50} Karma</span>
        </div>
        <button type="button" class="btn-logout" onclick="handleLogout()" title="Logout / Switch Account">
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    `;
  }
}


// ═════════════════════════════════════════════════════════════════════
// 7. TOAST NOTIFICATIONS & UTILITIES
// ═════════════════════════════════════════════

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const typeClass =
    type === 'error' ? 'toast-error' :
    type === 'warning' ? 'toast-warning' : 'toast-success';

  const icon =
    type === 'error' ? 'fa-triangle-exclamation' :
    type === 'warning' ? 'fa-circle-exclamation' : 'fa-circle-check';

  toast.className = `toast ${typeClass}`;
  toast.innerHTML = `
    <i class="fa-solid ${icon}" style="color:${type === 'error' ? 'var(--red-500)' : type === 'warning' ? 'var(--orange-500)' : 'var(--teal-500)'};"></i>
    <div style="flex:1;">${escapeHtml(message)}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ═════════════════════════════════════════════════════════════════════
// 8. INITIALIZATION ON DOM READY
// ═════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

  loadData();
  populateDropdowns();
  renderCategories();
  updateStats();
  renderHomeFeed();
  renderIssues();
  renderMyReports();
  renderAdminTable();
  renderLeaderboard();
  setupPhotoPreview();
  setupResolvePhoto();
  checkAuthGate();
});
