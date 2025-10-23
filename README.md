# Project Tracking System

**Enterprise-grade project management with multi-party approvals, audit trails, and role-based access control**

A sustainable, transparent framework for managing complex multi-stakeholder projects with built-in governance, compliance, and accountability.

## 🎯 Core Principles

1. **Multi-Party Approvals** - Milestone-based payments require sign-off from multiple stakeholders
2. **Funding Commitments** - Track multi-source funding with gap analysis
3. **QA Integration** - Embedded quality gates at each workflow stage
4. **Immutable Ledger** - Every action logged with cryptographic integrity
5. **RBAC** - Granular role-based permissions (View, Edit, Approve, Admin)

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
**[https://kamrawr.github.io/project-tracking-mvp/](https://kamrawr.github.io/project-tracking-mvp/)**

Try the CPF tracker example live, or:

### Run Locally
```bash
git clone https://github.com/kamrawr/project-tracking-mvp.git
cd project-tracking-mvp
open examples/cpf-tracker/index.html
```

### Use Core Modules
```javascript
import { ApprovalEngine, Ledger, RBAC, FundingTracker, QAGates } from '../../core/index.js';

// Initialize with your config
const system = new ProjectTrackingSystem(config);
```

## 📖 Documentation

- [Architecture Overview](docs/architecture.md)
- [API Reference](docs/api-reference.md)
- [CPF Example](examples/cpf-tracker/README.md)
- [Deployment Guide](docs/deployment.md)

## 🔐 Enterprise Features

✅ **Multi-party milestone approvals** with configurable chains  
✅ **Funding source tracking** with real-time gap analysis  
✅ **QA checkpoints** preventing progression without approval  
✅ **Immutable audit log** with SHA-256 hashing  
✅ **Role-based permissions** at field and action levels  
✅ **Client-side or backend** - works standalone or with API  

## 📄 License

MIT License - Open source for community benefit

---

**Built for Accountability** 🔍 **Designed for Transparency** 💎 **Engineered for Impact** 🌍
