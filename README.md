# Project Tracking System

**Enterprise-grade project management with multi-party approvals, audit trails, and role-based access control**

A sustainable, transparent framework for managing complex multi-stakeholder projects with built-in governance, compliance, and accountability.

## 🎯 Core Principles

1. **Multi-Party Approvals** - Milestone-based payments require sign-off from multiple stakeholders
2. **Multi-Source Funding** - Braided/stacked funding with real-time tracking and gap analysis
3. **QA Integration** - Embedded quality gates at each workflow stage
4. **Immutable Ledger** - Every action logged with cryptographic integrity (SHA-256)
5. **Role-Based Access Control** - Granular permissions with intelligent task routing
6. **Decision Points** - Critical routing logic with escalation paths
7. **Form Approvals** - 300CPF/320CPF multi-party authorization workflows

## 🏗️ Architecture

```
project-tracking-system/
├── core/                       # Reusable framework modules
│   ├── approval-engine.js      # Multi-party approval workflows
│   ├── ledger.js               # Immutable audit trail
│   ├── rbac.js                 # Role-based access control
│   ├── funding-tracker.js      # Budget & commitment tracking
│   ├── qa-gates.js             # Quality assurance checkpoints
│   └── index.js                # Core API exports
├── examples/
│   └── cpf-tracker/            # Full CPF implementation
│       ├── index.html          # Production-ready app
│       ├── config.js           # CPF-specific configuration
│       └── README.md           # CPF documentation
├── docs/
│   ├── architecture.md         # System design
│   ├── api-reference.md        # Module APIs
│   └── deployment.md           # Production setup
└── tests/                      # Unit & integration tests
```

## 🚀 Quick Start

### 🌐 Live Demo
**[https://kamrawr.github.io/project-tracking-system/](https://kamrawr.github.io/project-tracking-system/)**

Try the CPF tracker example live, or:

### Run Locally
```bash
git clone https://github.com/kamrawr/project-tracking-system.git
cd project-tracking-system
open examples/cpf-tracker/index.html
```

### Use Core Modules
```javascript
import { ApprovalEngine, Ledger, RBAC, FundingTracker, QAGates } from '../../core/index.js';

// Initialize with your config
const system = new ProjectTrackingSystem(config);
```

## 📚 Documentation

- [Architecture Overview](docs/architecture.md)
- [API Reference](docs/api-reference.md)
- [CPF Example](examples/cpf-tracker/README.md)
- [Deployment Guide](docs/deployment.md)

## 🛠️ Usage Example

### Role-Based Workflow

```javascript
// 1. Finance Director logs in and sees pending approvals
// Role selector: "Finance Director"
// Task Dashboard shows:
// - 🔥 URGENT: 300CPF Form Approval Required (CPF-001)
// - 🔥 URGENT: 320CPF Payment Approval Required (CPF-002)

// 2. Click "Approve Form" button
// Opens 300CPF modal showing:
// - Project details
// - Budget: $15,000 net cost
// - Multi-party approvers (Program Coordinator, Finance Director)
// - Click "Approve 300CPF" → Project authorized

// 3. QA Inspector logs in
// Role selector: "QA Inspector"
// Only sees projects in Implementation/Completed stages
// Task: Quality Inspection Required (CPF-003)
// - Click "Inspect & Approve"
// - Opens 320CPF modal
// - Verify work completion
// - Approve payment disbursement

// 4. All actions logged in immutable ledger
ledger.getAll(); // View complete audit trail
// Export for compliance: JSON or CSV
```

### Funding Stack Example

```javascript
// Project with multiple funding sources
const project = {
  measures: [
    { name: 'Heat Pump', cost: 12000, selected: true },
    { name: 'Insulation', cost: 3000, selected: true }
  ],
  fundingSources: [
    { name: 'Energy Trust of Oregon', amount: 3000, status: 'approved' },
    { name: 'Federal Tax Credit (25C)', amount: 2000, status: 'pending' },
    { name: 'IRA HOMES Rebate', amount: 8000, status: 'applied' },
    { name: 'Internal CPF Gap Funding', amount: 2000, status: 'approved' }
  ]
};

// Automatic calculation:
// Total Cost: $15,000
// Total Incentives: $15,000
// Net Cost to Customer: $0
```

## 🎯 Typical Workflow

1. **Intake** (PM/Coordinator)
   - Create new project
   - Verify income qualification
   - Decision point: Qualified homeowner?

2. **HEA** (PM/Coordinator)
   - Home Energy Assessment
   - Document findings

3. **Scoping** (PM/Coordinator/Finance)
   - Add measures from library
   - Configure funding sources (braided/stacked)
   - 300CPF approval required (Coordinator + Finance)
   - Decision point: Budget threshold?

4. **Bidding** (PM/Contractor/Customer)
   - Contractors submit bids
   - Customer selects contractor
   - PM coordinates

5. **Approved** (All stakeholders notified)
   - Work order authorized
   - 300CPF fully approved

6. **Implementation** (Contractor/QA/Finance)
   - Contractor completes work
   - QA inspects and verifies
   - Record actual costs vs estimates
   - Update funding source actuals
   - 320CPF approval required (QA + Finance + Coordinator)

7. **Completed** (All can view)
   - Project closed
   - Payments disbursed
   - Audit trail exported
   - Variance analysis available

## 🔐 Enterprise Features

### Core Capabilities
✅ **Multi-party milestone approvals** with configurable chains and threshold routing  
✅ **Braided/stacked funding** - Layer multiple sources with automatic gap analysis  
✅ **QA checkpoints** preventing progression without approval  
✅ **Immutable audit log** with SHA-256 hashing and export (JSON/CSV)  
✅ **Role-based access control** with intelligent task detection  
✅ **Client-side first** - Zero dependencies, works offline, privacy-first  

### Financial Management
✅ **Multi-source funding tracking** - Energy Trust, Federal programs, Tax credits, etc.  
✅ **Real-time cost tracking** - Recommended → Selected → Estimated → Actual  
✅ **Expected vs Actual** comparison for funding sources  
✅ **Net cost calculation** with automatic incentive rollup  
✅ **Portfolio-level dashboards** with financial summaries  

### Workflow & Approvals
✅ **8-stage workflow** - Intake → HEA → Scoping → Bidding → Approval → Implementation → Completion  
✅ **300CPF Project Authorization** - Multi-party approval before work begins  
✅ **320CPF Payment Request** - Multi-party approval for disbursement  
✅ **Decision points** - Qualified Homeowner, Resources Check, Budget Threshold, etc.  
✅ **Backward navigation** - Return to previous stages when needed  

### Role-Based Access (6 Roles + Admin)
✅ **Project Manager** - Full project lifecycle management  
✅ **Finance Director** - Budget reviews, form approvals, payment authorization  
✅ **Program Coordinator** - Program management, funding configuration  
✅ **QA Inspector** - Quality verification, work inspection, 320CPF approval  
✅ **Contractor** - Bid submission, work updates, progress tracking  
✅ **Customer** - Contractor selection, project monitoring  

### Intelligent Task Management
✅ **Role-specific task detection** - Automatic pending task identification  
✅ **Dependency tracking** - Shows blockers (e.g., "Waiting for Coordinator approval")  
✅ **Priority coding** - 🔥 Urgent | ⏱️ Normal | 👍 Low  
✅ **Direct action buttons** - One-click navigation to complete tasks  
✅ **Filtered views** - Each role sees only relevant projects and actions  

### Audit & Compliance
✅ **Cryptographic integrity** - Every transaction hashed and chained  
✅ **User attribution** - Track who did what and when  
✅ **Form revision tracking** - Request revisions with reasons documented  
✅ **Decision logging** - Approval/Escalation/Denial with full reasoning  
✅ **Ledger filtering** - Search by project, action type, date range  
✅ **Export compliance reports** - JSON/CSV for external auditing

## 🚀 Technology Stack

- **Zero Dependencies** - Pure JavaScript, no frameworks required
- **Client-Side First** - Works offline, data stays in browser
- **localStorage Persistence** - Automatic save/restore
- **SHA-256 Hashing** - Cryptographic audit trail integrity
- **Responsive Design** - Mobile-friendly interface
- **Export Formats** - JSON for systems, CSV for Excel
- **Privacy-First** - No tracking, no external calls

## 🎯 Why This System?

| Feature | Traditional PM Tools | This System |
|---------|---------------------|-------------|
| Multi-party approvals | Manual coordination | Built-in workflows |
| Funding tracking | Spreadsheets | Real-time multi-source |
| Audit trail | Separate logs | Immutable ledger |
| Role-based views | Generic permissions | Intelligent task routing |
| Offline capability | Cloud-dependent | Fully offline |
| Cost | $$$$/user/month | Free & open source |
| Data privacy | Vendor servers | Your browser only |
| Compliance ready | Custom reports | Built-in exports |

## 👥 Who Should Use This?

- **Community Organizations** managing low-income home energy programs
- **Government Agencies** requiring multi-party verification
- **Nonprofits** coordinating multi-stakeholder projects
- **Contractors** bidding on public assistance projects
- **Program Coordinators** managing complex funding stacks
- **Finance Teams** requiring audit trails and compliance

## 🤝 Contributing

Contributions welcome! This system is designed to be:
- **Forkable** - Adapt to your specific workflow
- **Extensible** - Add new roles, stages, or forms
- **Reusable** - Core modules work in any project type

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📝 License

MIT License - Open source for community benefit

## 🔗 Links

- **Live Demo**: [https://kamrawr.github.io/project-tracking-system/](https://kamrawr.github.io/project-tracking-system/)
- **GitHub**: [https://github.com/kamrawr/project-tracking-system](https://github.com/kamrawr/project-tracking-system)
- **Issues**: Report bugs or request features

---

**Built for Accountability** 🔍 | **Designed for Transparency** 💎 | **Engineered for Impact** 🌍

*Supporting sustainable communities through better project management*
