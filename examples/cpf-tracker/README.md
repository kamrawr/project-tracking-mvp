# MPF Project Tracker

**Multi-Partner Funding Program Program Management Tool**

A lightweight, single-page application for tracking MPF (Multi-Partner Funding Program) projects through the complete program workflow—from customer intake through project completion.

## 🎯 Purpose

This tool implements the **MPF Program Process Design** flowchart, helping program managers track projects through each critical stage, decision point, and required form.

## ✨ Features

### Process Visualization
- **8-stage workflow** displayed at top of interface
- Visual distinction between process steps (blue circles) and decision points (yellow diamonds)
- Matches your exact MPF flowchart design

### Project Management
- **Create, edit, and track** unlimited projects
- **Real-time stats dashboard**: Total, Active, Completed, Pending Action
- **5 workflow-based tabs**: All, Intake & HEA, Scoping & Bidding, Implementation, Completed
- **Status-based filtering** automatically sorts projects into relevant tabs

### Data Tracking
Each project captures:
- Customer information (name, address, contact)
- **Qualified Homeowner status** (Yes/No/Pending)
- **Current stage** in workflow
- **Incentive forms** (300CPF, 320CPF) status
- **Funding sources** (Internal CPF, Energy Trust, external partners)
- Project notes and updates
- Timestamps (created, last updated)

### Local Data Storage
- All data stored in browser **localStorage**
- No server/database required
- **Privacy-first**: data never leaves your machine
- Export/backup via browser dev tools

## 🚀 Quick Start

### Option 1: Local File
1. Download `index.html`
2. Double-click to open in browser
3. Start tracking projects immediately

### Option 2: GitHub Pages
1. Create repo: `mpf-project-tracker`
2. Push `index.html`
3. Enable GitHub Pages
4. Access at: `https://username.github.io/mpf-project-tracker/`

### Option 3: Local Server
```bash
cd mpf-project-tracker
python3 -m http.server 8000
# Open http://localhost:8000
```

## 📋 Workflow Stages

### 1. Customer Intake
- Initial contact captured
- Basic customer information entered

### 2. Qualified Homeowner Check (Decision Point)
- **Yes** → Proceed to HEA
- **No** → Continue CBO Services or refer

### 3. Schedule HEA
- Home Energy Assessment scheduled
- **Form 300CPF**: Incentive Authorization

### 4. Establish Scope of Work
- Multiple incentive worksheet completed
- MPF Incentive List reference
- Identified eligible projects

### 5. Resources Check (Decision Point)
- **Sufficient resources** → Proceed to bid selection
- **Gap funding needed** → Identify internal vs. external sources

### 6. Solicit and Select Bids
- **Trade Ally Contractor Tool** used
- Bids reviewed and selected

### 7. Approve and Pay for Project
- **Form 320CPF**: Project Implementation & Invoice
- Project funding approved

### 8. Implementation & Completion
- Work completed
- **CBO Project Reports** generated:
  - Assessment
  - Recommendations
  - Bids
  - Funding Resources
  - Contracts
  - Invoices
  - Installation Photos
  - Customer Survey
  - QA Report
  - Payment Summary

### Decision: Additional Services Needed?
- **Yes** → Loop back to intake
- **No** → Project referral to partner (if applicable) or close

## 🎨 Status Color Coding

- **Intake** (Blue): Customer Intake
- **HEA** (Yellow): HEA Scheduled  
- **Scoping** (Pink): Scoping Work
- **Bidding** (Purple): Soliciting Bids
- **Approved** (Green): Approved - In Progress
- **Implementation** (Blue): Implementation
- **Completed** (Green): Completed
- **Referred** (Purple): Referred to Partner

## 🔧 Customization

### Add Custom Fields
Edit the form in `index.html` (lines 482-532):
```html
<div class="form-group">
    <label>Your New Field</label>
    <input type="text" id="newField">
</div>
```

Update the data structure (line 710):
```javascript
const formData = {
    // existing fields...
    newField: document.getElementById('newField').value
};
```

### Modify Workflow Stages
Edit status options (lines 497-506):
```html
<option value="custom-stage">Your Stage Name</option>
```

Add corresponding color in CSS (lines 192-199):
```css
.status-custom-stage { background: #color; color: #text; }
```

### Export Data
Open browser console and run:
```javascript
// Export all projects as JSON
console.log(JSON.stringify(projects, null, 2));

// Or copy to clipboard
copy(JSON.stringify(projects, null, 2));
```

## 📊 Dashboard Metrics

**Total Projects**: All projects in system  
**Active Projects**: Intake → Implementation  
**Completed**: Finished projects  
**Pending Action**: Stages requiring immediate attention (Intake, Bidding, Approved)

## 🔐 Data Privacy

- ✅ 100% client-side application
- ✅ No data transmitted to servers
- ✅ No analytics or tracking
- ✅ Works offline after initial load
- ✅ All data stays in your browser

## 🛠️ Tech Stack

- **Pure HTML/CSS/JavaScript** - No frameworks
- **localStorage API** - Data persistence
- **Responsive grid layout** - Mobile-friendly
- **Zero dependencies** - No npm, no build step

## 📱 Mobile Support

Fully responsive design works on:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Tablets (iPad, Android tablets)
- Mobile phones (iOS Safari, Chrome)

## ⚙️ Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚦 Roadmap

Potential enhancements:
- [ ] **CSV Export** for backup/reporting
- [ ] **Document upload** for forms (300CPF, 320MPF PDFs)
- [ ] **Email notifications** for pending actions
- [ ] **Kanban board view** alternative to card grid
- [ ] **Timeline visualization** showing project duration
- [ ] **Multi-user support** via backend integration
- [ ] **Automated form generation** (300CPF, 320MPF pre-fill)
- [ ] **Trade Ally directory** integration
- [ ] **Funding calculator** for gap analysis

## 📄 License

Open source - use and modify as needed for your MPF program.

## 🤝 Contributing

This is a single-file MVP. To contribute:
1. Fork the project
2. Make changes to `index.html`
3. Test thoroughly in multiple browsers
4. Submit pull request with description

## 📞 Support

For questions about:
- **MPF Program Process**: Refer to your program flowchart
- **Tool Usage**: See this README
- **Technical Issues**: Open GitHub issue

## 🙏 Acknowledgments

Built to support Multi-Partner Funding Program programs delivering energy efficiency, weatherization, and home upgrade services to underserved communities.

---

**Made with Whimsical** 🎨 (Process flowchart)  
**Built for Impact** 🌍 (Community resilience through workforce development)
