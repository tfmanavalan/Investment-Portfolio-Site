# Investment Portfolio Advisor Website

A comprehensive investment portfolio website with AI-powered recommendations, historic market data, interactive simulators, and educational content about stock market investing.

## Features

### 1. Investment Overview
- Best practices for stock market investing
- Diversification strategies
- Asset allocation guidelines by age
- Comparison of index funds vs individual stocks

### 2. Historic Market Returns
- S&P 500 historic data (1926-2024)
- Asset class comparison (stocks, bonds, REITs, gold)
- Major market drawdowns and recovery times
- Real vs nominal returns

### 3. Investment Simulator
- Interactive compound interest calculator
- Monthly contribution modeling
- Inflation adjustment
- Expense ratio impact analysis
- Visual growth charts

### 4. Portfolio Analyzer
- Enter your current holdings
- AI-powered portfolio analysis
- Personalized recommendations based on:
  - Age and risk tolerance
  - Investment goals
  - Time horizon
  - Asset allocation
  - Concentration risk
- Visual portfolio allocation charts

### 5. Industries & Investment Types
- 11 major market sectors with current S&P 500 weightings
- 8 investment vehicles (stocks, ETFs, bonds, REITs, etc.)
- 7 investment strategies (growth, value, dividend, etc.)

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js
- **Design**: Responsive, mobile-first design
- **No backend required**: Runs entirely in the browser

## Getting Started

### View the Website

Simply open `index.html` in your web browser to view the website locally.

### Files

- `index.html` - Main HTML structure
- `styles.css` - All styling and responsive design
- `script.js` - Interactive functionality and calculations
- `stock_market_research.md` - Research data used to build the site

## Git Setup Instructions

To connect this project to your GitHub repository, run the following commands in Git Bash or your terminal:

```bash
# Initialize git repository
git init

# Add all files
git add index.html styles.css script.js README.md stock_market_research.md

# Create initial commit
git commit -m "Initial commit: Investment Portfolio Advisor website

Complete investment website with 5 sections:
- Investment overview and best practices
- Historic market returns and data
- Investment simulator with compound interest
- AI-powered portfolio analyzer
- Industries and investment types guide"

# Add remote repository
git remote add origin https://github.com/tfmanavalan/Investment-Portfolio-Site.git

# Push to GitHub
git push -u origin main
```

If the repository already has content, you may need to pull first:

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## Deployment

### GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to "Pages" section
3. Select "main" branch as source
4. Your site will be published at: `https://tfmanavalan.github.io/Investment-Portfolio-Site/`

### Other Hosting Options

- **Netlify**: Drag and drop deployment
- **Vercel**: Connect GitHub repository for automatic deployment
- **AWS S3**: Static website hosting

## Usage

### Investment Simulator
1. Enter your initial investment amount
2. Set monthly contribution
3. Choose time horizon (years)
4. Adjust expected return rate (historical average: 7-10%)
5. Set inflation rate (historical average: 2-3%)
6. Click "Calculate" to see projections

### Portfolio Analyzer
1. Add your current holdings (ticker, shares, price, type)
2. Enter your age
3. Select risk tolerance (conservative/moderate/aggressive)
4. Choose investment goal
5. Set time horizon
6. Click "Analyze Portfolio" for AI recommendations

## Data Sources

Historic market data based on:
- S&P 500 returns (1926-2024)
- Standard asset class benchmarks
- Widely accepted investment principles
- Academic financial research

## Disclaimer

**This website is for educational purposes only and does not constitute financial advice.**

- Past performance does not guarantee future results
- All investments carry risk
- Consult with a qualified financial advisor before making investment decisions
- The AI recommendations are algorithmic suggestions, not professional advice

## License

This project is open source and available under the MIT License.

## Contact

For questions or feedback, please open an issue on GitHub.

---

Built with data-driven insights for informed investment decisions.