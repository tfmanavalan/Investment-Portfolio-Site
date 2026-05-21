// Slideshow state
let currentSlide = 1;
const totalSlides = 12;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateSlide();
    updateProgress();
    initializeChecklistTracking();
    initializeDiversificationPie();
    initializeSimulator();
    calculateAgeAllocation();
});

// Navigation functions
function nextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        updateSlide();
    }
}

function prevSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        updateSlide();
    }
}

function goToSlide(num) {
    if (num >= 1 && num <= totalSlides) {
        currentSlide = num;
        updateSlide();
    }
}

function updateSlide() {
    // Remove active class from all slides
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active', 'prev');
    });

    // Add active class to current slide
    const activeSlide = document.querySelector(`[data-slide="${currentSlide}"]`);
    if (activeSlide) {
        activeSlide.classList.add('active');
    }

    // Update counter
    document.getElementById('currentSlide').textContent = currentSlide;
    document.getElementById('totalSlides').textContent = totalSlides;

    // Update progress bar
    updateProgress();

    // Update button states
    document.getElementById('prevBtn').disabled = currentSlide === 1;
    document.getElementById('nextBtn').disabled = currentSlide === totalSlides;

    // Initialize slide-specific features
    if (currentSlide === 5) {
        updateDiversificationPie();
    }
    if (currentSlide === 8) {
        calculateSimulator();
    }
}

function updateProgress() {
    const progress = (currentSlide / totalSlides) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

// Event listeners
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// Slide 3: Checklist tracking
function initializeChecklistTracking() {
    const checkboxes = document.querySelectorAll('.styled-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateReadiness);
    });
}

function updateReadiness() {
    const checkboxes = document.querySelectorAll('.styled-checkbox');
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const messageDiv = document.getElementById('readinessMessage');

    if (checked === 0) {
        messageDiv.innerHTML = '';
        messageDiv.style.background = '';
    } else if (checked < 4) {
        messageDiv.innerHTML = `<i class="fas fa-hourglass-half"></i> You've completed ${checked}/4 essentials. Keep going!`;
        messageDiv.style.background = 'linear-gradient(135deg, #fef3c7, #fde68a)';
        messageDiv.style.color = '#92400e';
    } else {
        messageDiv.innerHTML = '<i class="fas fa-check-circle"></i> Excellent! You\'re ready to start investing!';
        messageDiv.style.background = 'linear-gradient(135deg, #d1fae5, #a7f3d0)';
        messageDiv.style.color = '#065f46';
    }
}

// Slide 4: Flip cards
function toggleCard(card) {
    card.classList.toggle('flipped');
}

// Slide 5: Diversification Pie Chart
let diversificationChart = null;

function initializeDiversificationPie() {
    const ctx = document.getElementById('diversificationPie');
    if (!ctx) return;

    diversificationChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Stocks', 'Bonds'],
            datasets: [{
                data: [60, 40],
                backgroundColor: ['#3b82f6', '#f59e0b'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Slider sync
    const stockSlider = document.getElementById('stockSlider');
    const bondSlider = document.getElementById('bondSlider');

    stockSlider.addEventListener('input', (e) => {
        const stockValue = parseInt(e.target.value);
        const bondValue = 100 - stockValue;
        bondSlider.value = bondValue;
        document.getElementById('stockPercent').textContent = stockValue;
        document.getElementById('bondPercent').textContent = bondValue;
        updateDiversificationPie();
    });

    bondSlider.addEventListener('input', (e) => {
        const bondValue = parseInt(e.target.value);
        const stockValue = 100 - bondValue;
        stockSlider.value = stockValue;
        document.getElementById('stockPercent').textContent = stockValue;
        document.getElementById('bondPercent').textContent = bondValue;
        updateDiversificationPie();
    });
}

function updateDiversificationPie() {
    if (!diversificationChart) return;

    const stockValue = parseInt(document.getElementById('stockSlider').value);
    const bondValue = 100 - stockValue;

    diversificationChart.data.datasets[0].data = [stockValue, bondValue];
    diversificationChart.update();

    // Feedback
    const feedback = document.getElementById('allocationFeedback');
    if (stockValue > 80) {
        feedback.textContent = '⚠️ Very aggressive allocation. High risk, high reward potential.';
        feedback.style.background = '#fee';
        feedback.style.color = '#991b1b';
    } else if (stockValue > 60) {
        feedback.textContent = '✓ Moderate to aggressive. Good for long-term growth.';
        feedback.style.background = '#eff6ff';
        feedback.style.color = '#1e3a8a';
    } else if (stockValue > 40) {
        feedback.textContent = '✓ Balanced allocation. Mix of growth and stability.';
        feedback.style.background = '#d1fae5';
        feedback.style.color = '#065f46';
    } else if (stockValue > 20) {
        feedback.textContent = '✓ Conservative allocation. Lower risk, steady returns.';
        feedback.style.background = '#fef3c7';
        feedback.style.color = '#92400e';
    } else {
        feedback.textContent = '⚠️ Very conservative. May not keep up with inflation.';
        feedback.style.background = '#fee';
        feedback.style.color = '#991b1b';
    }
}

// Slide 7: Age-based allocation
function calculateAgeAllocation() {
    const age = parseInt(document.getElementById('ageInput').value);
    if (isNaN(age) || age < 18 || age > 100) return;

    // Rule of 110
    const stockPercent = Math.max(20, Math.min(90, 110 - age));
    const bondPercent = 100 - stockPercent;

    // Animate bars
    document.getElementById('stockBar').style.width = stockPercent + '%';
    document.getElementById('bondBar').style.width = bondPercent + '%';
    document.getElementById('stockLabel').textContent = stockPercent + '%';
    document.getElementById('bondLabel').textContent = bondPercent + '%';

    // Provide advice
    const adviceDiv = document.getElementById('ageAdvice');
    let advice = '';

    if (age < 30) {
        advice = '<strong>Young & Aggressive:</strong> You have time to weather market volatility. Focus on growth with high stock allocation!';
    } else if (age < 45) {
        advice = '<strong>Building Wealth:</strong> Still plenty of time for growth. Maintain strong equity position with some bonds for stability.';
    } else if (age < 60) {
        advice = '<strong>Pre-Retirement:</strong> Balance growth and preservation. Start shifting toward more conservative investments.';
    } else {
        advice = '<strong>Near/In Retirement:</strong> Prioritize stability and income. Higher bond allocation protects your nest egg.';
    }

    adviceDiv.innerHTML = `<i class="fas fa-lightbulb"></i><p>${advice}</p>`;
}

// Slide 8: Investment Simulator
let growthChart = null;

function initializeSimulator() {
    const sliders = ['initialAmount', 'monthlyAmount', 'yearsAmount', 'returnRate'];

    sliders.forEach(id => {
        const slider = document.getElementById(id);
        if (slider) {
            slider.addEventListener('input', updateSimulatorDisplay);
        }
    });

    const ctx = document.getElementById('growthChart');
    if (ctx) {
        growthChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Portfolio Value',
                        data: [],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.15)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 0,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Contributions',
                        data: [],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2,
                        borderDash: [5, 5],
                        pointRadius: 0,
                        pointHoverRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                size: 13,
                                weight: 600
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 12,
                                weight: 600
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            font: {
                                size: 12,
                                weight: 600
                            },
                            callback: function(value) {
                                if (value >= 1000000) {
                                    return '$' + (value / 1000000).toFixed(1) + 'M';
                                } else if (value >= 1000) {
                                    return '$' + (value / 1000).toFixed(0) + 'K';
                                }
                                return '$' + value;
                            }
                        }
                    }
                }
            }
        });
    }

    calculateSimulator();
}

function updateSimulatorDisplay() {
    document.getElementById('initDisplay').textContent = document.getElementById('initialAmount').value;
    document.getElementById('monthlyDisplay').textContent = document.getElementById('monthlyAmount').value;
    document.getElementById('yearsDisplay').textContent = document.getElementById('yearsAmount').value;
    document.getElementById('returnDisplay').textContent = document.getElementById('returnRate').value;

    calculateSimulator();
}

function calculateSimulator() {
    const initial = parseFloat(document.getElementById('initialAmount')?.value || 10000);
    const monthly = parseFloat(document.getElementById('monthlyAmount')?.value || 500);
    const years = parseInt(document.getElementById('yearsAmount')?.value || 30);
    const rate = parseFloat(document.getElementById('returnRate')?.value || 7) / 100;

    const monthlyRate = rate / 12;
    const months = years * 12;

    let balance = initial;
    const portfolioData = [initial];
    const contributionData = [initial];
    const chartLabels = ['Start'];

    // Calculate data points - show every year for short periods, every 5 years for long periods
    const interval = years <= 15 ? 12 : (years <= 30 ? 24 : 60); // monthly interval for data points

    for (let i = 1; i <= months; i++) {
        balance = balance * (1 + monthlyRate) + monthly;
        const totalContrib = initial + (monthly * i);

        if (i % interval === 0 || i === months) {
            portfolioData.push(balance);
            contributionData.push(totalContrib);
            const yearLabel = (i / 12).toFixed(0);
            chartLabels.push(i === months ? `Year ${years}` : `${yearLabel}`);
        }
    }

    const totalContributed = initial + (monthly * months);
    const gains = balance - totalContributed;

    // Update displays with animation
    animateValue('finalAmount', balance);
    animateValue('contributedAmount', totalContributed);
    animateValue('gainsAmount', gains);

    // Update chart with animation
    if (growthChart) {
        growthChart.data.labels = chartLabels;
        growthChart.data.datasets[0].data = portfolioData;
        growthChart.data.datasets[1].data = contributionData;
        growthChart.update({
            duration: 2000, // 2 second animation
            easing: 'easeInOutQuart'
        });
    }
}

function animateValue(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const duration = 2500; // Slower: 2.5 seconds instead of 1 second
    const start = 0;
    const increment = targetValue / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
            element.textContent = formatCurrency(targetValue);
            clearInterval(timer);
        } else {
            element.textContent = formatCurrency(current);
        }
    }, 16);
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

// Slide 9: Start amount selection
function selectStartAmount(card, amount) {
    // Remove selected class from all cards
    document.querySelectorAll('.example-card').forEach(c => {
        c.classList.remove('selected');
    });

    // Add selected class to clicked card
    card.classList.add('selected');

    // Update simulator on slide 8 if user goes back
    const monthlyInput = document.getElementById('monthlyAmount');
    if (monthlyInput) {
        monthlyInput.value = amount;
        document.getElementById('monthlyDisplay').textContent = amount;
    }
}

// Slide 10: Portfolio Builder
let portfolioItems = [];

function addToPortfolio(name, type) {
    // Check if already added
    if (portfolioItems.find(item => item.name === name)) {
        return;
    }

    portfolioItems.push({ name, type });
    renderPortfolio();
}

function removeFromPortfolio(index) {
    portfolioItems.splice(index, 1);
    renderPortfolio();
}

function renderPortfolio() {
    const listDiv = document.getElementById('portfolioList');
    const scoreDiv = document.getElementById('portfolioScore');

    if (portfolioItems.length === 0) {
        listDiv.innerHTML = '<p class="empty-state">Click investments to add them</p>';
        scoreDiv.innerHTML = '';
        return;
    }

    listDiv.innerHTML = portfolioItems.map((item, index) => `
        <div class="portfolio-item">
            <div>
                <strong>${item.name}</strong>
                <small style="display:block; color: #6b7280;">${item.type.toUpperCase()}</small>
            </div>
            <button onclick="removeFromPortfolio(${index})">×</button>
        </div>
    `).join('');

    // Calculate diversity score
    const uniqueTypes = new Set(portfolioItems.map(item => item.type)).size;
    let score = '';
    let color = '';

    if (portfolioItems.length === 1) {
        score = '⚠️ Not diversified. Add more investments!';
        color = '#fee';
    } else if (uniqueTypes === 1) {
        score = '⚠️ All same type. Mix different asset classes!';
        color = '#fef3c7';
    } else if (portfolioItems.length >= 3 && uniqueTypes >= 3) {
        score = '✓ Excellent diversification!';
        color = '#d1fae5';
    } else {
        score = '✓ Good start! Consider adding more variety.';
        color = '#eff6ff';
    }

    scoreDiv.innerHTML = score;
    scoreDiv.style.background = color;
}

function resetPortfolio() {
    portfolioItems = [];
    renderPortfolio();
}

// Smooth scrolling for slide content
document.querySelectorAll('.slide-content').forEach(content => {
    content.style.scrollBehavior = 'smooth';
});

// Touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
        prevSlide();
    }
}

// Slide 12: Personal Calculator
function showPersonalCalculator() {
    document.getElementById('actionPlanView').style.display = 'none';
    document.getElementById('personalCalculatorView').style.display = 'block';
}

function showActionPlan() {
    document.getElementById('actionPlanView').style.display = 'block';
    document.getElementById('personalCalculatorView').style.display = 'none';
}

function calculatePersonalPlan() {
    const age = parseInt(document.getElementById('personalAge').value);
    const initial = parseFloat(document.getElementById('personalInitial').value);
    const monthly = parseFloat(document.getElementById('personalMonthly').value);
    const targetAge = parseInt(document.getElementById('personalTargetAge').value);

    if (targetAge <= age) {
        alert('Target age must be greater than current age');
        return;
    }

    const years = targetAge - age;
    const rate = 0.07; // 7% average return
    const monthlyRate = rate / 12;
    const months = years * 12;

    // Calculate future value
    let balance = initial;
    for (let i = 0; i < months; i++) {
        balance = balance * (1 + monthlyRate) + monthly;
    }

    const totalContributed = initial + (monthly * months);
    const gains = balance - totalContributed;
    const monthlyIncome = balance * 0.04 / 12; // 4% withdrawal rate

    // Generate recommendations based on age
    const recommendations = [];
    const stockPercent = Math.max(20, Math.min(90, 110 - age));

    recommendations.push(`Invest ${stockPercent}% in stocks and ${100-stockPercent}% in bonds for your age`);
    recommendations.push(`Start with low-cost index funds like VOO or VTI (fees under 0.10%)`);

    if (monthly < 500) {
        recommendations.push('Consider increasing monthly contributions as income grows');
    }

    if (years > 20) {
        recommendations.push('You have time on your side - stay invested through market ups and downs');
    } else if (years < 10) {
        recommendations.push('Consider a more conservative allocation as you near retirement');
    }

    recommendations.push('Review and rebalance your portfolio once per year');

    // Display results
    const resultsDiv = document.getElementById('personalResults');
    resultsDiv.innerHTML = `
        <div class="personal-result-card primary-result">
            <h4>At Age ${targetAge}, You Could Have:</h4>
            <div class="personal-result-value">${formatCurrency(balance)}</div>
            <p class="personal-result-sub">in ${years} years with consistent investing</p>
        </div>

        <div class="personal-result-card highlight-result">
            <h4>Your Investment Gains:</h4>
            <div class="personal-result-value">${formatCurrency(gains)}</div>
            <p class="personal-result-sub">Growth on your investments (${((gains/totalContributed)*100).toFixed(0)}% return)</p>
        </div>

        <div class="personal-result-card contribution-result">
            <h4>You Invested:</h4>
            <div class="personal-result-value-secondary">${formatCurrency(totalContributed)}</div>
            <p class="personal-result-sub">${formatCurrency(initial)} initial + ${formatCurrency(monthly)}/month × ${years} years</p>
        </div>

        <div class="personal-result-card">
            <h4>Potential Monthly Income:</h4>
            <div class="personal-result-value-secondary">${formatCurrency(monthlyIncome)}</div>
            <p class="personal-result-sub">Using a safe 4% withdrawal rate in retirement</p>
        </div>

        <div class="recommendation-box">
            <h4><i class="fas fa-lightbulb"></i> Your Personalized Recommendations</h4>
            <ul>
                ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
    `;
}