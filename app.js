// Dashboard Application Logic
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    initializeTabs();
    createAllCharts();
    createTariffTimeline();
function updateLiveTime() {
    const now = new Date();
    const options = {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata"
    };
    const formatted = now.toLocaleString('en-IN', options).replace(',', '');
    document.getElementById('liveTime').textContent = "Live • " + formatted + " IST";
}

// Call immediately, then update every minute
updateLiveTime();
setInterval(updateLiveTime, 60000);
});

// Application Data - Updated with 2025-only timeline
const appData = {
    tariff_timeline_2025: [
        {"date": "2025-01-20", "event": "Trump Inauguration (2nd Term)", "rate": 0, "description": "Trade policy reset begins"},
        {"date": "2025-03-15", "event": "Initial Trade Review", "rate": 0, "description": "Comprehensive review of trade relationships announced"},
        {"date": "2025-06-10", "event": "Russia Oil Sanctions Notice", "rate": 0, "description": "Warning issued to countries importing Russian energy"},
        {"date": "2025-07-15", "event": "India Warning Issued", "rate": 0, "description": "First formal warning to India over Russian oil imports"},
        {"date": "2025-07-30", "event": "India 25% Tariff Announced", "rate": 25, "description": "25% tariff announced on Indian imports"},
        {"date": "2025-08-07", "event": "India 25% Tariff Effective", "rate": 25, "description": "First tranche of tariffs becomes effective"},
        {"date": "2025-08-06", "event": "Additional 25% Announced", "rate": 50, "description": "Second tranche announced for continued non-compliance"},
        {"date": "2025-08-26", "event": "Draft 50% Notice Issued", "rate": 50, "description": "Final draft notice issued"},
        {"date": "2025-08-27", "event": "Total 50% Tariff Effective", "rate": 50, "description": "Cumulative 50% tariff becomes effective"}
    ],
    global_tariff_rates: {
        "India": 50,
        "China": 54,
        "Vietnam": 46,
        "Bangladesh": 37,
        "European Union": 50,
        "Indonesia": 32,
        "Japan": 25,
        "South Korea": 20,
        "Mexico": 25,
        "Canada": 25,
        "Russia": 75,
        "Belarus": 60,
        "Iran": 65
    },
    chemical_exports_2024: {
        "China": 112.2,
        "USA": 66.7,
        "Ireland": 47.7,
        "Switzerland": 41.0,
        "Germany": 41.0,
        "South Korea": 37.6,
        "Belgium": 34.5,
        "Netherlands": 26.1,
        "Japan": 23.7,
        "India": 22.7
    },
    india_us_trade: {
        "total_exports_2024": 79.44,
        "chemical_exports_2024": 5.71,
        "organic_chemicals_2024": 3.63,
        "affected_exports": 48.2,
        "expected_loss": 7.0
    },
    chemical_categories_impact: {
        "high_impact": [
            {"name": "Amine-function compounds", "us_share": 20.93, "value": 159.99},
            {"name": "Ketones & quinones", "us_share": 18.53, "value": 165.44},
            {"name": "Chlorides/bromides/iodides", "us_share": 14.10, "value": 37.89},
            {"name": "Hypochlorite", "us_share": 21.80, "value": 5.63}
        ],
        "medium_impact": [
            {"name": "Vitamins & provitamins", "us_share": 7.70, "value": 130.86},
            {"name": "Nitrogen heterocyclic", "us_share": 3.67, "value": 643.99},
            {"name": "Cellulose derivatives", "us_share": 6.53, "value": 138.92}
        ]
    },
    india_competitiveness: {
        "vs_china": {
            "labor_cost": {"india": 4.2, "china": 3.2},
            "energy_cost": {"india": 3.8, "china": 3.5},
            "logistics": {"india": 3.2, "china": 4.1},
            "infrastructure": {"india": 3.5, "china": 4.3},
            "regulatory": {"india": 3.6, "china": 3.8}
        }
    },
    manufacturing_clusters: [
        {"name": "Gujarat", "capacity": 35, "investment": 45.2, "speciality": "Petrochemicals"},
        {"name": "Maharashtra", "capacity": 28, "investment": 32.1, "speciality": "Specialty Chemicals"},
        {"name": "Tamil Nadu", "capacity": 18, "investment": 18.7, "speciality": "Fine Chemicals"},
        {"name": "Andhra Pradesh", "capacity": 12, "investment": 12.4, "speciality": "Pharmaceuticals"},
        {"name": "West Bengal", "capacity": 7, "investment": 8.1, "speciality": "Basic Chemicals"}
    ],
    trade_diversion: {
        "pre_tariff": {
            "us_china": 45.2,
            "us_india": 22.7,
            "us_eu": 41.0,
            "us_vietnam": 8.3,
            "us_mexico": 15.2
        },
        "post_tariff": {
            "us_china": 35.1,
            "us_india": 18.2,
            "us_eu": 38.5,
            "us_vietnam": 12.8,
            "us_mexico": 19.1
        }
    },
    price_volatility_2025: [
        {"month": "Jan", "basic": 105, "specialty": 102, "petro": 108, "fine": 104},
        {"month": "Feb", "basic": 103, "specialty": 98, "petro": 110, "fine": 102},
        {"month": "Mar", "basic": 108, "specialty": 105, "petro": 115, "fine": 107},
        {"month": "Apr", "basic": 112, "specialty": 109, "petro": 118, "fine": 111},
        {"month": "May", "basic": 115, "specialty": 113, "petro": 122, "fine": 114},
        {"month": "Jun", "basic": 118, "specialty": 116, "petro": 125, "fine": 117},
        {"month": "Jul", "basic": 122, "specialty": 125, "petro": 135, "fine": 128},
        {"month": "Aug", "basic": 135, "specialty": 142, "petro": 155, "fine": 145}
    ],
    forecast_scenarios: {
        "optimistic": {"growth_2026": 6.8, "market_share": 8.2, "investment": 125.5},
        "base_case": {"growth_2026": 4.2, "market_share": 6.1, "investment": 98.3},
        "pessimistic": {"growth_2026": 1.8, "market_share": 4.5, "investment": 72.1}
    }
};

// Chart Colors (Bloomberg-style with teal accents)
const chartColors = ['#14b8a6', '#f97316', '#ef4444', '#8b5cf6', '#06b6d4', '#f59e0b', '#ec4899', '#10b981', '#6366f1', '#84cc16'];

// Tab Management - Fixed to properly show/hide content
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    // Initialize: hide all panels except the first one
    tabPanels.forEach((panel, index) => {
        if (index === 0) {
            panel.classList.add('active');
            panel.style.display = 'block';
        } else {
            panel.classList.remove('active');
            panel.style.display = 'none';
        }
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            
            console.log('Switching to tab:', targetTab); // Debug log
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Hide all panels
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                panel.style.display = 'none';
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show target panel
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
                targetPanel.style.display = 'block';
                console.log('Activated panel:', targetTab); // Debug log
                
                // Refresh charts when switching tabs to ensure proper rendering
                setTimeout(() => {
                    window.dispatchEvent(new Event('resize'));
                }, 100);
            } else {
                console.error('Panel not found:', targetTab); // Debug log
            }
        });
    });
}

// Chart Creation Functions with Bloomberg-style dark theme
function createAllCharts() {
    createGlobalExportChart();
    createTradeFlowChart();
    createPriceVolumeChart();
    createVolatilityChart();
    createDiversionChart();
    createForecastChart();
    createSegmentImpactChart();
    createFDICapacityChart();
    createCompetitivenessRadar();
    createReroutingChart();
}

function createGlobalExportChart() {
    const ctx = document.getElementById('globalExportChart');
    if (!ctx) return;

    const countries = Object.keys(appData.chemical_exports_2024);
    const exports = Object.values(appData.chemical_exports_2024);
    const tariffs = countries.map(country => appData.global_tariff_rates[country] || 0);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: countries,
            datasets: [
                {
                    label: 'Chemical Exports (USD Billion)',
                    data: exports,
                    backgroundColor: chartColors[0],
                    borderColor: chartColors[0],
                    borderWidth: 1,
                    yAxisID: 'y'
                },
                {
                    label: 'Tariff Rate (%)',
                    data: tariffs,
                    type: 'line',
                    backgroundColor: chartColors[2],
                    borderColor: chartColors[2],
                    borderWidth: 3,
                    fill: false,
                    yAxisID: 'y1',
                    pointRadius: 6,
                    pointHoverRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#e5e5e5',
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(10, 10, 10, 0.95)',
                    titleColor: '#e5e5e5',
                    bodyColor: '#e5e5e5',
                    borderColor: '#14b8a6',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        title: function(context) {
                            return `${context[0].label} Chemical Trade`;
                        },
                        label: function(context) {
                            const datasetLabel = context.dataset.label;
                            const value = context.raw;
                            if (datasetLabel.includes('Exports')) {
                                return `${datasetLabel}: $${value.toFixed(1)}B`;
                            } else {
                                return `${datasetLabel}: ${value}%`;
                            }
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#a3a3a3',
                        maxRotation: 45
                    },
                    grid: {
                        color: 'rgba(163, 163, 163, 0.1)'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: '#a3a3a3'
                    },
                    grid: {
                        color: 'rgba(163, 163, 163, 0.1)'
                    },
                    title: {
                        display: true,
                        text: 'Exports (USD Billion)',
                        color: '#e5e5e5'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: '#a3a3a3'
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: 'rgba(163, 163, 163, 0.1)'
                    },
                    title: {
                        display: true,
                        text: 'Tariff Rate (%)',
                        color: '#e5e5e5'
                    }
                }
            }
        }
    });
}

function createTradeFlowChart() {
    const ctx = document.getElementById('tradeFlowChart');
    if (!ctx) return;

    const preTariff = Object.values(appData.trade_diversion.pre_tariff);
    const postTariff = Object.values(appData.trade_diversion.post_tariff);
    const labels = ['US-China', 'US-India', 'US-EU', 'US-Vietnam', 'US-Mexico'];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Pre-Tariff (USD Billion)',
                    data: preTariff,
                    backgroundColor: chartColors[1],
                    borderColor: chartColors[1],
                    borderWidth: 1
                },
                {
                    label: 'Post-Tariff (USD Billion)',
                    data: postTariff,
                    backgroundColor: chartColors[0],
                    borderColor: chartColors[0],
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#e5e5e5',
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(10, 10, 10, 0.95)',
                    titleColor: '#e5e5e5',
                    bodyColor: '#e5e5e5',
                    borderColor: '#14b8a6',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        afterLabel: function(context) {
                            const preValue = preTariff[context.dataIndex];
                            const postValue = postTariff[context.dataIndex];
                            const change = ((postValue - preValue) / preValue * 100).toFixed(1);
                            return `Change: ${change > 0 ? '+' : ''}${change}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#a3a3a3'
                    },
                    grid: {
                        color: 'rgba(163, 163, 163, 0.1)'
                    }
                },
                y: {
                    ticks: {
                        color: '#a3a3a3'
                    },
                    grid: {
                        color: 'rgba(163, 163, 163, 0.1)'
                    },
                    title: {
                        display: true,
                        text: 'Trade Volume (USD Billion)',
                        color: '#e5e5e5'
                    }
                }
            }
        }
    });
}

function createPriceVolumeChart() {
    const ctx = document.getElementById('priceVolumeChart');
    if (!ctx) return;

    const months = appData.price_volatility_2025.map(item => item.month);
    const basicPrices = appData.price_volatility_2025.map(item => item.basic);
    const specialtyPrices = appData.price_volatility_2025.map(item => item.specialty);
    const petroPrices = appData.price_volatility_2025.map(item => item.petro);
    const finePrices = appData.price_volatility_2025.map(item => item.fine);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Basic Chemicals',
                    data: basicPrices,
                    borderColor: chartColors[0],
                    backgroundColor: chartColors[0] + '20',
                    fill: false,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'Specialty Chemicals',
                    data: specialtyPrices,
                    borderColor: chartColors[1],
                    backgroundColor: chartColors[1] + '20',
                    fill: false,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'Petrochemicals',
                    data: petroPrices,
                    borderColor: chartColors[2],
                    backgroundColor: chartColors[2] + '20',
                    fill: false,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'Fine Chemicals',
                    data: finePrices,
                    borderColor: chartColors[3],
                    backgroundColor: chartColors[3] + '20',
                    fill: false,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#e5e5e5',
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(10, 10, 10, 0.95)',
                    titleColor: '#e5e5e5',
                    bodyColor: '#e5e5e5',
                    borderColor: '#14b8a6',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw} (Index)`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#a3a3a3'
                    },
                    grid: {
                        color: 'rgba(163, 163, 163, 0.1)'
                    }
                },
                y: {
                    ticks: {
                        color: '#a3a3a3'
                    },
                    grid: {
                        color: 'rgba(163, 163, 163, 0.1)'
                    },
                    title: {
                        display: true,
                        text: 'Price Index (100 = Jan 2025)',
                        color: '#e5e5e5'
                    }
                }
            }
        }
    });
}

function createVolatilityChart() {
    const ctx = document.getElementById('volatilityChart');
    if (!ctx) return;

    const categories = ['Basic Chemicals', 'Specialty Chemicals', 'Petrochemicals', 'Fine Chemicals'];
    const augustData = appData.price_volatility_2025[7]; // August data
    const volatility = [augustData.basic, augustData.specialty, augustData.petro, augustData.fine];

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categories,
            datasets: [{
                data: volatility,
                backgroundColor: chartColors.slice(0, categories.length),
                borderColor: '#121212',
                borderWidth: 2,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#e5e5e5',
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(10, 10, 10, 0.95)',
                    titleColor: '#e5e5e5',
                    bodyColor: '#e5e5e5',
                    borderColor: '#14b8a6',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.raw / total) * 100).toFixed(1);
                            return [
                                `${context.label}`,
                                `Price Index: ${context.raw}`,
                                `Share: ${percentage}%`
                            ];
                        }
                    }
                }
            }
        }
    });
}

// Continue with remaining chart functions...
function createDiversionChart() {
    const ctx = document.getElementById('diversionChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025'],
            datasets: [
                {
                    label: 'Vietnam Gain',
                    data: [8.3, 9.1, 10.2, 11.8, 12.4, 12.8],
                    borderColor: chartColors[0],
                    backgroundColor: chartColors[0] + '20',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'China Loss',
                    data: [45.2, 43.1, 40.8, 38.2, 36.5, 35.1],
                    borderColor: chartColors[2],
                    backgroundColor: chartColors[2] + '20',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'India Loss',
                    data: [22.7, 21.8, 20.9, 19.8, 19.2, 18.2],
                    borderColor: chartColors[1],
                    backgroundColor: chartColors[1] + '20',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#e5e5e5',
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(10, 10, 10, 0.95)',
                    titleColor: '#e5e5e5',
                    bodyColor: '#e5e5e5',
                    borderColor: '#14b8a6',
                    borderWidth: 1,
                    cornerRadius: 8
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#a3a3a3'
                    },
                    grid: {
                        color: 'rgba(163, 163, 163, 0.1)'
                    }
                },
                y: {
                    ticks: {
                        color: '#a3a3a3'
                    },
                    grid: {
                        color: 'rgba(163, 163, 163, 0.1)'
                    },
                    title: {
                        display: true,
                        text: 'Market Share (USD Billion)',
                        color: '#e5e5e5'
                    }
                }
            }
        }
    });
}

function createForecastChart() {
    const ctx = document.getElementById('forecastChart');
    if (!ctx) return;

    const scenarios = Object.keys(appData.forecast_scenarios);
    const growth = scenarios.map(s => appData.forecast_scenarios[s].growth_2026);
    const marketShare = scenarios.map(s => appData.forecast_scenarios[s].market_share);
    const investment = scenarios.map(s => appData.forecast_scenarios[s].investment);

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Growth Rate (%)', 'Market Share (%)', 'Investment (Scaled)'],
            datasets: [
                {
                    label: 'Optimistic',
                    data: [growth[0], marketShare[0], investment[0]/20],
                    backgroundColor: chartColors[0] + '40',
                    borderColor: chartColors[0],
                    borderWidth: 2,
                    pointBackgroundColor: chartColors[0],
                    pointBorderColor: '#121212',
                    pointHoverBackgroundColor: '#121212',
                    pointHoverBorderColor: chartColors[0],
                    pointRadius: 4
                },
                {
                    label: 'Base Case',
                    data: [growth[1], marketShare[1], investment[1]/20],
                    backgroundColor: chartColors[1] + '40',
                    borderColor: chartColors[1],
                    borderWidth: 2,
                    pointBackgroundColor: chartColors[1],
                    pointBorderColor: '#121212',
                    pointHoverBackgroundColor: '#121212',
                    pointHoverBorderColor: chartColors[1],
                    pointRadius: 4
                },
                {
                    label: 'Pessimistic',
                    data: [growth[2], marketShare[2], investment[2]/20],
                    backgroundColor: chartColors[2] + '40',
                    borderColor: chartColors[2],
                    borderWidth: 2,
                    pointBackgroundColor: chartColors[2],
                    pointBorderColor: '#121212',
                    pointHoverBackgroundColor: '#121212',
                    pointHoverBorderColor: chartColors[2],
                    pointRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#e5e5e5',
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(10, 10, 10, 0.95)',
                    titleColor: '#e5e5e5',
                    bodyColor: '#e5e5e5',
                    borderColor: '#14b8a6',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            const datasetLabel = context.dataset.label;
                            const pointIndex = context.dataIndex;
                            const scenarios = ['optimistic', 'base_case', 'pessimistic'];
                            const scenario = scenarios.find(s => datasetLabel.toLowerCase().includes(s.split('_')[0]));
                            
                            if (pointIndex === 0) {
                                return `${datasetLabel}: ${appData.forecast_scenarios[scenario].growth_2026}% growth`;
                            } else if (pointIndex === 1) {
                                return `${datasetLabel}: ${appData.forecast_scenarios[scenario].market_share}% market share`;
                            } else {
                                return `${datasetLabel}: $${appData.forecast_scenarios[scenario].investment}B investment`;
                            }
                        }
                    }
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(163, 163, 163, 0.2)'
                    },
                    grid: {
                        color: 'rgba(163, 163, 163, 0.2)'
                    },
                    pointLabels: {
                        color: '#e5e5e5'
                    },
                    ticks: {
                        color: '#a3a3a3',
                        backdropColor: 'transparent'
                    }
                }
            }
        }
    });
}

function createSegmentImpactChart() {
    const ctx = document.getElementById('segmentImpactChart');
    if (!ctx) return;

    const highImpact = appData.chemical_categories_impact.high_impact;
    const mediumImpact = appData.chemical_categories_impact.medium_impact;
    
    const allCategories = [...highImpact, ...mediumImpact];
    const labels = allCategories.map(item => item.name.length > 20 ? item.name.substring(0, 17) + '...' : item.name);
    const values = allCategories.map(item => item.value);
    const shares = allCategories.map(item => item.us_share);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Export Value (USD Million)',
                    data: values,
                    backgroundColor: chartColors[0],
                    borderColor: chartColors[0],
                    borderWidth: 1,
                    yAxisID: 'y'
                },
                {
                    label: 'US Market Share (%)',
                    data: shares,
                    type: 'line',
                    backgroundColor: chartColors[2],
                    borderColor: chartColors[2],
                    borderWidth: 3,
                    fill: false,
                    yAxisID: 'y1',
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#e5e5e5',
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(10, 10, 10, 0.95)',
                    titleColor: '#e5e5e5',
                    bodyColor: '#e5e5e5',
                    borderColor: '#14b8a6',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        title: function(context) {
                            const fullName = allCategories[context[0].dataIndex].name;
                            return fullName;
                        },
                        label: function(context) {
                            const value = context.raw;
                            if (context.dataset.label.includes('Value')) {
                                return `Export Value: $${value.toFixed(0)}M`;
                            } else {
                                return `US Market Share: ${value.toFixed(1)}%`;
                            }
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#a3a3a3',
                        maxRotation: 45
                    },
                    grid: {
                        color: 'rgba(163, 163, 163, 0.1)'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: '#a3a3a3'
                    },
                    grid: {
                        color: 'rgba(163, 163, 163, 0.1)'
                    },
                    title: {
                        display: true,
                        text: 'Value (USD Million)',
                        color: '#e5e5e5'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: '#a3a3a3'
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: 'rgba(163, 163, 163, 0.1)'
                    },
                    title: {
                        display: true,
                        text: 'US Share (%)',
                        color: '#e5e5e5'
                    }
                }
            }
        }
    });
}

function createFDICapacityChart() {
    const ctx = document.getElementById('fdiCapacityChart');
    if (!ctx) return;

    const clusters = appData.manufacturing_clusters.map(item => item.name);
    const capacity = appData.manufacturing_clusters.map(item => item.capacity);
    const investment = appData.manufacturing_clusters.map(item => item.investment);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: clusters,
            datasets: [
                {
                    label: 'Capacity Share (%)',
                    data: capacity,
                    backgroundColor: chartColors[0],
                    borderColor: chartColors[0],
                    borderWidth: 1,
                    yAxisID: 'y'
                },
                {
                    label: 'Investment (USD Billion)',
                    data: investment,
                    backgroundColor: chartColors[1],
                    borderColor: chartColors[1],
                    borderWidth: 1,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#e5e5e5',
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(10, 10, 10, 0.95)',
                    titleColor: '#e5e5e5',
                    bodyColor: '#e5e5e5',
                    borderColor: '#14b8a6',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        afterLabel: function(context) {
                            const clusterIndex = context.dataIndex;
                            const specialty = appData.manufacturing_clusters[clusterIndex].speciality;
                            return `Specialty: ${specialty}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#a3a3a3'
                    },
                    grid: {
                        color: 'rgba(163, 163, 163, 0.1)'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: '#a3a3a3'
                    },
                    grid: {
                        color: 'rgba(163, 163, 163, 0.1)'
                    },
                    title: {
                        display: true,
                        text: 'Capacity Share (%)',
                        color: '#e5e5e5'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: '#a3a3a3'
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: 'rgba(163, 163, 163, 0.1)'
                    },
                    title: {
                        display: true,
                        text: 'Investment (USD Billion)',
                        color: '#e5e5e5'
                    }
                }
            }
        }
    });
}

function createCompetitivenessRadar() {
    const ctx = document.getElementById('competitivenessRadar');
    if (!ctx) return;

    const competitiveness = appData.india_competitiveness.vs_china;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Labor Cost', 'Energy Cost', 'Logistics', 'Infrastructure', 'Regulatory'],
            datasets: [
                {
                    label: 'India',
                    data: [
                        competitiveness.labor_cost.india,
                        competitiveness.energy_cost.india,
                        competitiveness.logistics.india,
                        competitiveness.infrastructure.india,
                        competitiveness.regulatory.india
                    ],
                    backgroundColor: chartColors[0] + '40',
                    borderColor: chartColors[0],
                    borderWidth: 3,
                    pointBackgroundColor: chartColors[0],
                    pointBorderColor: '#121212',
                    pointHoverBackgroundColor: '#121212',
                    pointHoverBorderColor: chartColors[0],
                    pointRadius: 4
                },
                {
                    label: 'China',
                    data: [
                        competitiveness.labor_cost.china,
                        competitiveness.energy_cost.china,
                        competitiveness.logistics.china,
                        competitiveness.infrastructure.china,
                        competitiveness.regulatory.china
                    ],
                    backgroundColor: chartColors[2] + '40',
                    borderColor: chartColors[2],
                    borderWidth: 3,
                    pointBackgroundColor: chartColors[2],
                    pointBorderColor: '#121212',
                    pointHoverBackgroundColor: '#121212',
                    pointHoverBorderColor: chartColors[2],
                    pointRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#e5e5e5',
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(10, 10, 10, 0.95)',
                    titleColor: '#e5e5e5',
                    bodyColor: '#e5e5e5',
                    borderColor: '#14b8a6',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            const country = context.dataset.label;
                            const metric = context.label;
                            const value = context.raw;
                            return `${country} ${metric}: ${value.toFixed(1)}/5`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(163, 163, 163, 0.2)'
                    },
                    grid: {
                        color: 'rgba(163, 163, 163, 0.2)'
                    },
                    pointLabels: {
                        color: '#e5e5e5'
                    },
                    ticks: {
                        color: '#a3a3a3',
                        backdropColor: 'transparent'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

function createReroutingChart() {
    const ctx = document.getElementById('reroutingChart');
    if (!ctx) return;

    const routingData = {
        labels: ['Direct China-US', 'China-India-US', 'Direct India-US', 'India-Vietnam-US', 'Direct Vietnam-US'],
        current: [35.1, 8.2, 18.2, 4.1, 12.8],
        projected: [28.5, 12.8, 15.4, 8.7, 18.3]
    };

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: routingData.labels,
            datasets: [
                {
                    label: 'Current Flow (USD Billion)',
                    data: routingData.current,
                    backgroundColor: chartColors[1],
                    borderColor: chartColors[1],
                    borderWidth: 1
                },
                {
                    label: 'Projected Flow (USD Billion)',
                    data: routingData.projected,
                    backgroundColor: chartColors[0],
                    borderColor: chartColors[0],
                    borderWidth: 1
                }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#e5e5e5',
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(10, 10, 10, 0.95)',
                    titleColor: '#e5e5e5',
                    bodyColor: '#e5e5e5',
                    borderColor: '#14b8a6',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        afterLabel: function(context) {
                            const currentValue = routingData.current[context.dataIndex];
                            const projectedValue = routingData.projected[context.dataIndex];
                            const change = ((projectedValue - currentValue) / currentValue * 100).toFixed(1);
                            return `Projected change: ${change > 0 ? '+' : ''}${change}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#a3a3a3'
                    },
                    grid: {
                        color: 'rgba(163, 163, 163, 0.1)'
                    },
                    title: {
                        display: true,
                        text: 'Trade Flow (USD Billion)',
                        color: '#e5e5e5'
                    }
                },
                y: {
                    ticks: {
                        color: '#a3a3a3'
                    },
                    grid: {
                        color: 'rgba(163, 163, 163, 0.1)'
                    }
                }
            }
        }
    });
}

// Interactive Timeline Creation - Updated for 2025 only
function createTariffTimeline() {
    const timelineContainer = document.getElementById('tariffTimeline');
    if (!timelineContainer) return;

    timelineContainer.innerHTML = '';
    
    appData.tariff_timeline_2025.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        const isHighlighted = item.date === '2025-08-27' || item.date === '2025-08-26';
        if (isHighlighted) {
            timelineItem.classList.add('highlighted');
        }
        
        timelineItem.innerHTML = `
            <div class="timeline-date${isHighlighted ? ' highlighted' : ''}">${formatDate(item.date)}</div>
            <div class="timeline-content">
                <h4>${item.event}${isHighlighted ? ' 🚨' : ''}</h4>
                <p>${item.description}</p>
                <span class="timeline-rate">Tariff Rate: ${item.rate}%${isHighlighted ? ' (CURRENT)' : ''}</span>
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
}

// Utility Functions
function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${day}, ${year}`;
}

// Chart.js Global Configuration for Bloomberg style
Chart.defaults.font.family = 'FKGroteskNeue, Geist, Inter, sans-serif';
Chart.defaults.font.size = 12;
Chart.defaults.color = '#e5e5e5';
