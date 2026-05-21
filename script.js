// Loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hide');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 2000);

    // Initialize counters
    animateCounters();

    // Initial calculation
    calculateInvestment();
});

// Counter animation for hero stats
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        setTimeout(updateCounter, 500);
    });
}

// Scroll reveal animation
const revealElements = () => {
    const reveals = document.querySelectorAll('.card, .stat-card, .sector-card');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('reveal', 'active');
        }
    });
};

window.addEventListener('scroll', revealElements);
revealElements();

// Tab functionality
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');

        // Remove active class from all buttons and content
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Investment Simulator
let growthChart = null;
let autoCalculate = false;

document.getElementById('calculateBtn').addEventListener('click', calculateInvestment);

// Slider synchronization
const sliders = [
    { input: 'initialInvestment', slider: 'initialInvestmentSlider' },
    { input: 'monthlyContribution', slider: 'monthlyContributionSlider' },
    { input: 'timeHorizon', slider: 'timeHorizonSlider' },
    { input: 'expectedReturn', slider: 'expectedReturnSlider' },
    { input: 'inflationRate', slider: 'inflationRateSlider' },
    { input: 'expenseRatio', slider: 'expenseRatioSlider' }
];

sliders.forEach(({ input, slider }) => {
    const inputEl = document.getElementById(input);
    const sliderEl = document.getElementById(slider);

    if (inputEl && sliderEl) {
        inputEl.addEventListener('input', (e) => {
            sliderEl.value = e.target.value;
            if (autoCalculate) calculateInvestment();
        });

        sliderEl.addEventListener('input', (e) => {
            inputEl.value = e.target.value;
            if (autoCalculate) calculateInvestment();
        });
    }
});

// Auto-calculate toggle
const autoCalcToggle = document.getElementById('autoCalculateToggle');
const autoCalcText = document.getElementById('autoCalcText');

if (autoCalcToggle) {
    autoCalcToggle.addEventListener('click', () => {
        autoCalculate = !autoCalculate;
        autoCalcText.textContent = autoCalculate ? 'Disable Auto-Calculate' : 'Enable Auto-Calculate';
        autoCalcToggle.style.background = autoCalculate ? '#059669' : '#10b981';

        if (autoCalculate) {
            calculateInvestment();
        }
    });
}

function calculateInvestment() {
    const initial = parseFloat(document.getElementById('initialInvestment').value);
    const monthly = parseFloat(document.getElementById('monthlyContribution').value);
    const years = parseInt(document.getElementById('timeHorizon').value);
    const returnRate = parseFloat(document.getElementById('expectedReturn').value) / 100;
    const inflation = parseFloat(document.getElementById('inflationRate').value) / 100;
    const expenseRatio = parseFloat(document.getElementById('expenseRatio').value) / 100;

    const netReturn = returnRate - expenseRatio;
    const months = years * 12;

    // Calculate future value with monthly contributions
    let portfolioValue = initial;
    let totalContributions = initial;
    const monthlyRate = netReturn / 12;

    const chartLabels = [];
    const chartValues = [];
    const chartContributions = [];

    // Add initial value
    chartLabels.push('Year 0');
    chartValues.push(initial);
    chartContributions.push(initial);

    for (let month = 1; month <= months; month++) {
        portfolioValue = portfolioValue * (1 + monthlyRate) + monthly;
        totalContributions += monthly;

        // Add data point for each year
        if (month % 12 === 0) {
            chartLabels.push(`Year ${month / 12}`);
            chartValues.push(portfolioValue);
            chartContributions.push(totalContributions);
        }
    }

    const investmentGains = portfolioValue - totalContributions;
    const inflationAdjusted = portfolioValue / Math.pow(1 + inflation, years);

    // Animate result values
    animateValue('finalValue', 0, portfolioValue, 1500);
    animateValue('totalContributions', 0, totalContributions, 1500);
    animateValue('investmentGains', 0, investmentGains, 1500);
    animateValue('inflationAdjusted', 0, inflationAdjusted, 1500);

    // Generate insight
    generateInvestmentInsight(portfolioValue, totalContributions, investmentGains, years, returnRate);

    // Update chart
    updateGrowthChart(chartLabels, chartValues, chartContributions);
}

function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = formatCurrency(end);
            clearInterval(timer);
        } else {
            element.textContent = formatCurrency(current);
        }
    }, 16);
}

function generateInvestmentInsight(finalValue, contributions, gains, years, returnRate) {
    const insightText = document.getElementById('insightText');
    if (!insightText) return;

    const roi = ((gains / contributions) * 100).toFixed(1);
    const annualizedReturn = (returnRate * 100).toFixed(1);
    const multiplier = (finalValue / contributions).toFixed(2);

    let insight = '';

    if (roi > 200) {
        insight = `Excellent! With a ${annualizedReturn}% return over ${years} years, your money could multiply ${multiplier}x. Every dollar contributed could grow to $${multiplier}!`;
    } else if (roi > 100) {
        insight = `Great projection! Your investments could more than double (${roi}% ROI) over ${years} years. Consistent contributions are key to building wealth.`;
    } else if (roi > 50) {
        insight = `Solid growth potential! With ${roi}% ROI over ${years} years, you're on track for healthy returns. Consider increasing contributions when possible.`;
    } else {
        insight = `Your current parameters show ${roi}% ROI. Consider a longer time horizon or higher contributions to maximize compound growth potential.`;
    }

    insightText.textContent = insight;
}

function updateGrowthChart(labels, portfolioValues, contributions) {
    const ctx = document.getElementById('growthChart').getContext('2d');

    if (growthChart) {
        growthChart.destroy();
    }

    growthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Portfolio Value',
                    data: portfolioValues,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Total Contributions',
                    data: contributions,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Portfolio Growth Over Time'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + (value / 1000).toFixed(0) + 'K';
                        }
                    }
                }
            }
        }
    });
}

// Portfolio Analyzer
document.getElementById('addHoldingBtn').addEventListener('click', addHolding);
document.getElementById('analyzeBtn').addEventListener('click', analyzePortfolio);

// CSV Import
const importBtn = document.getElementById('importPortfolioBtn');
const csvInput = document.getElementById('csvFileInput');

if (importBtn && csvInput) {
    importBtn.addEventListener('click', () => csvInput.click());

    csvInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                parseCSV(event.target.result);
            };
            reader.readAsText(file);
        }
    });
}

function parseCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim());
    const container = document.getElementById('holdingsContainer');
    container.innerHTML = ''; // Clear existing

    lines.forEach((line, index) => {
        if (index === 0) return; // Skip header
        const [ticker, shares, price, type] = line.split(',').map(s => s.trim());
        if (ticker && shares && price) {
            const row = createHoldingRow(ticker, shares, price, type || 'stock');
            container.appendChild(row);
        }
    });
}

function createHoldingRow(ticker = '', shares = '', price = '', type = 'stock') {
    const row = document.createElement('div');
    row.className = 'holding-row';
    row.innerHTML = `
        <input type="text" placeholder="Ticker/Name" class="holding-ticker" value="${ticker}">
        <input type="number" placeholder="Shares" class="holding-shares" min="0" step="0.01" value="${shares}">
        <input type="number" placeholder="Price per share ($)" class="holding-price" min="0" step="0.01" value="${price}">
        <select class="holding-type">
            <option value="stock" ${type === 'stock' ? 'selected' : ''}>Stock</option>
            <option value="etf" ${type === 'etf' ? 'selected' : ''}>ETF</option>
            <option value="bond" ${type === 'bond' ? 'selected' : ''}>Bond</option>
            <option value="reit" ${type === 'reit' ? 'selected' : ''}>REIT</option>
            <option value="mutual-fund" ${type === 'mutual-fund' ? 'selected' : ''}>Mutual Fund</option>
        </select>
        <button class="remove-holding" onclick="this.parentElement.remove()">×</button>
    `;
    return row;
}

function addHolding() {
    const container = document.getElementById('holdingsContainer');
    const newRow = document.createElement('div');
    newRow.className = 'holding-row';
    newRow.innerHTML = `
        <input type="text" placeholder="Ticker/Name" class="holding-ticker">
        <input type="number" placeholder="Shares" class="holding-shares" min="0" step="0.01">
        <input type="number" placeholder="Price per share ($)" class="holding-price" min="0" step="0.01">
        <select class="holding-type">
            <option value="stock">Stock</option>
            <option value="etf">ETF</option>
            <option value="bond">Bond</option>
            <option value="reit">REIT</option>
            <option value="mutual-fund">Mutual Fund</option>
        </select>
        <button class="remove-holding" onclick="this.parentElement.remove()">×</button>
    `;
    container.appendChild(newRow);
}

function analyzePortfolio() {
    // Show analyzing animation
    const resultsDiv = document.getElementById('portfolioResults');
    const analyzingDiv = document.getElementById('analyzingAnimation');
    const contentDiv = document.getElementById('analysisContent');

    resultsDiv.style.display = 'block';
    analyzingDiv.style.display = 'block';
    contentDiv.style.display = 'none';

    // Animate progress steps
    const steps = analyzingDiv.querySelectorAll('.step');
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.classList.add('complete');
            step.classList.remove('active');
            if (index < steps.length - 1) {
                steps[index + 1].classList.add('active');
            }
        }, (index + 1) * 800);
    });

    // Process holdings after animation
    setTimeout(() => {
        processPortfolioAnalysis();
        analyzingDiv.style.display = 'none';
        contentDiv.style.display = 'block';
    }, 3500);
}

function processPortfolioAnalysis() {
    const holdings = [];
    const rows = document.querySelectorAll('.holding-row');

    rows.forEach(row => {
        const ticker = row.querySelector('.holding-ticker').value;
        const shares = parseFloat(row.querySelector('.holding-shares').value);
        const price = parseFloat(row.querySelector('.holding-price').value);
        const type = row.querySelector('.holding-type').value;

        if (ticker && !isNaN(shares) && !isNaN(price)) {
            holdings.push({
                ticker,
                shares,
                price,
                type,
                value: shares * price
            });
        }
    });

    if (holdings.length === 0) {
        alert('Please add at least one holding');
        return;
    }

    const age = parseInt(document.getElementById('investorAge').value);
    const riskTolerance = document.getElementById('riskTolerance').value;
    const goal = document.getElementById('investmentGoal').value;
    const timeHorizon = parseInt(document.getElementById('timeHorizonPortfolio').value);

    // Calculate portfolio metrics
    const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
    const allocation = calculateAllocation(holdings, totalValue);
    const recommendations = generateRecommendations(holdings, totalValue, age, riskTolerance, goal, timeHorizon, allocation);

    // Display results
    displayPortfolioResults(totalValue, allocation, recommendations);
    updateAllocationChart(allocation);
    displayRiskScore(allocation, holdings, timeHorizon);
}

function displayRiskScore(allocation, holdings, timeHorizon) {
    const riskScoreDiv = document.getElementById('riskScore');
    if (!riskScoreDiv) return;

    // Calculate risk score (0-100)
    let riskScore = allocation.equityPercentage * 0.6; // Equity increases risk

    // Concentration risk
    const maxHolding = Math.max(...holdings.map(h => (h.value / holdings.reduce((sum, x) => sum + x.value, 0)) * 100));
    if (maxHolding > 20) riskScore += 15;
    else if (maxHolding > 10) riskScore += 8;

    // Diversification benefit
    if (holdings.length < 5) riskScore += 10;
    else if (holdings.length > 15) riskScore -= 10;

    // Time horizon adjustment
    if (timeHorizon < 5) riskScore += 10;

    riskScore = Math.min(100, Math.max(0, riskScore));

    let riskLevel, riskColor;
    if (riskScore < 30) {
        riskLevel = 'Low Risk - Conservative';
        riskColor = '#10b981';
    } else if (riskScore < 60) {
        riskLevel = 'Moderate Risk - Balanced';
        riskColor = '#f59e0b';
    } else {
        riskLevel = 'High Risk - Aggressive';
        riskColor = '#ef4444';
    }

    riskScoreDiv.innerHTML = `
        <h4><i class="fas fa-tachometer-alt"></i> Portfolio Risk Assessment</h4>
        <div class="risk-meter">
            <div class="risk-indicator" style="left: ${riskScore}%; border-color: ${riskColor};"></div>
        </div>
        <p><strong>Risk Level:</strong> ${riskLevel} (${riskScore.toFixed(0)}/100)</p>
        <p><small>Risk score considers equity allocation, concentration, diversification, and time horizon.</small></p>
    `;
}

function calculateAllocation(holdings, totalValue) {
    const allocation = {
        stocks: 0,
        etfs: 0,
        bonds: 0,
        reits: 0,
        mutualFunds: 0
    };

    holdings.forEach(holding => {
        const percentage = (holding.value / totalValue) * 100;
        switch(holding.type) {
            case 'stock':
                allocation.stocks += percentage;
                break;
            case 'etf':
                allocation.etfs += percentage;
                break;
            case 'bond':
                allocation.bonds += percentage;
                break;
            case 'reit':
                allocation.reits += percentage;
                break;
            case 'mutual-fund':
                allocation.mutualFunds += percentage;
                break;
        }
    });

    const equityPercentage = allocation.stocks + allocation.etfs + allocation.reits;
    const fixedIncomePercentage = allocation.bonds;

    return {
        ...allocation,
        equityPercentage,
        fixedIncomePercentage
    };
}

function generateRecommendations(holdings, totalValue, age, riskTolerance, goal, timeHorizon, allocation) {
    const recommendations = [];

    // Calculate ideal allocation based on age and risk tolerance
    let idealStockPercentage;
    if (riskTolerance === 'conservative') {
        idealStockPercentage = Math.max(20, 110 - age);
    } else if (riskTolerance === 'aggressive') {
        idealStockPercentage = Math.min(95, 120 - age);
    } else {
        idealStockPercentage = 115 - age;
    }

    const idealBondPercentage = 100 - idealStockPercentage;

    // Check asset allocation
    const currentEquity = allocation.equityPercentage;
    const currentBonds = allocation.fixedIncomePercentage;

    if (Math.abs(currentEquity - idealStockPercentage) > 10) {
        const action = currentEquity > idealStockPercentage ? 'reduce' : 'increase';
        const type = currentEquity > idealStockPercentage ? 'warning' : 'normal';
        recommendations.push({
            type,
            title: 'Asset Allocation Adjustment',
            message: `Your equity allocation (${currentEquity.toFixed(1)}%) differs from the recommended ${idealStockPercentage}% for your age and risk profile. Consider ${action}ing equity exposure.`
        });
    }

    // Check concentration risk
    holdings.forEach(holding => {
        const percentage = (holding.value / totalValue) * 100;
        if (percentage > 10) {
            recommendations.push({
                type: 'warning',
                title: 'Concentration Risk',
                message: `${holding.ticker} represents ${percentage.toFixed(1)}% of your portfolio. Consider reducing exposure below 10% to minimize single-holding risk.`
            });
        }
    });

    // Check diversification
    if (holdings.length < 8 && allocation.stocks > 20) {
        recommendations.push({
            type: 'normal',
            title: 'Diversification',
            message: `With ${holdings.length} holdings, consider increasing diversification to 15-20 positions or using index ETFs for broader market exposure.`
        });
    }

    // Goal-specific recommendations
    if (goal === 'income' && allocation.bonds < 30) {
        recommendations.push({
            type: 'normal',
            title: 'Income Generation',
            message: 'For income goals, consider increasing bond allocation and dividend-paying stocks or REITs to 40-50% of portfolio.'
        });
    }

    if (goal === 'growth' && allocation.bonds > 30 && age < 50) {
        recommendations.push({
            type: 'normal',
            title: 'Growth Focus',
            message: 'With a growth objective and long time horizon, you may benefit from higher equity allocation (70-90%).'
        });
    }

    // Time horizon considerations
    if (timeHorizon < 5 && currentEquity > 60) {
        recommendations.push({
            type: 'critical',
            title: 'Short Time Horizon Risk',
            message: 'With less than 5 years to your goal, your equity allocation may be too high. Consider shifting to more conservative investments.'
        });
    }

    // Positive feedback
    if (recommendations.length === 0) {
        recommendations.push({
            type: 'success',
            title: 'Well-Balanced Portfolio',
            message: 'Your portfolio appears well-balanced for your age, risk tolerance, and investment goals. Continue monitoring and rebalancing quarterly.'
        });
    }

    return recommendations;
}

function displayPortfolioResults(totalValue, allocation, recommendations) {
    const resultsDiv = document.getElementById('portfolioResults');
    resultsDiv.style.display = 'block';

    const summaryDiv = document.getElementById('portfolioSummary');
    summaryDiv.innerHTML = `
        <h4>Portfolio Summary</h4>
        <p><strong>Total Value:</strong> ${formatCurrency(totalValue)}</p>
        <p><strong>Equity Allocation:</strong> ${allocation.equityPercentage.toFixed(1)}%</p>
        <p><strong>Fixed Income:</strong> ${allocation.fixedIncomePercentage.toFixed(1)}%</p>
        <p><strong>Breakdown:</strong> Stocks ${allocation.stocks.toFixed(1)}% | ETFs ${allocation.etfs.toFixed(1)}% |
        Bonds ${allocation.bonds.toFixed(1)}% | REITs ${allocation.reits.toFixed(1)}% |
        Mutual Funds ${allocation.mutualFunds.toFixed(1)}%</p>
    `;

    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = '<h4>AI-Powered Recommendations</h4>';

    recommendations.forEach(rec => {
        const recDiv = document.createElement('div');
        recDiv.className = `recommendation-item ${rec.type}`;
        recDiv.innerHTML = `
            <h5>${rec.title}</h5>
            <p>${rec.message}</p>
        `;
        recommendationsDiv.appendChild(recDiv);
    });
}

let allocationChart = null;

function updateAllocationChart(allocation) {
    const ctx = document.getElementById('allocationChart').getContext('2d');

    if (allocationChart) {
        allocationChart.destroy();
    }

    allocationChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Stocks', 'ETFs', 'Bonds', 'REITs', 'Mutual Funds'],
            datasets: [{
                data: [
                    allocation.stocks,
                    allocation.etfs,
                    allocation.bonds,
                    allocation.reits,
                    allocation.mutualFunds
                ],
                backgroundColor: [
                    '#3b82f6',
                    '#10b981',
                    '#f59e0b',
                    '#8b5cf6',
                    '#ec4899'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Portfolio Allocation'
                },
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed.toFixed(1) + '%';
                        }
                    }
                }
            }
        }
    });
}

// Utility function
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

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

// PDF Report Download
const downloadBtn = document.getElementById('downloadReportBtn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        alert('PDF download feature would integrate with a library like jsPDF or html2pdf. This would generate a comprehensive portfolio analysis report with charts and recommendations.');
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to calculate
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const activeSection = document.activeElement.closest('section');
        if (activeSection && activeSection.id === 'simulator') {
            calculateInvestment();
        } else if (activeSection && activeSection.id === 'portfolio') {
            analyzePortfolio();
        }
    }
});