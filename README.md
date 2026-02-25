# n8n-nodes-waalaxy

![Waalaxy](https://img.shields.io/badge/Waalaxy-Integration-5C5CFF?style=for-the-badge)
![n8n](https://img.shields.io/badge/n8n-Community%20Node-FF6D5A?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

This is an n8n community node that integrates [Waalaxy](https://waalaxy.com?o=n8n) with your n8n workflows. Waalaxy is a LinkedIn automation tool that helps you automate your prospecting and outreach campaigns.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Credentials](#credentials)
- [Operations](#operations)
  - [Prospect](#prospect)
- [Usage Examples](#usage-examples)
- [Development](#development)
- [Resources](#resources)
- [License](#license)

## Features

- 🚀 **Add Prospects** — Import prospects into Waalaxy from any source via n8n
- 📋 **Prospect Lists** — Dynamically select and manage prospect lists
- 🎯 **Campaign Integration** — Automatically add prospects to campaigns
- 🔄 **Duplicate Handling** — Control how duplicates are managed

## Installation

### Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings** > **Community Nodes**
3. Select **Install**
4. Enter `@waapi/n8n-nodes-waalaxy` in the input field
5. Agree to the risks of using community nodes
6. Click **Install**

### Manual Installation

To install this node manually, run the following command in your n8n installation directory:

```bash
npm install @waapi/n8n-nodes-waalaxy
```

Then restart your n8n instance.

## Credentials

Before using this node, you need to configure your Waalaxy API credentials.

### Setting Up Credentials

1. In n8n, go to **Credentials** > **New Credential**
2. Search for **Waalaxy API**
3. Enter your **Access Token**
4. Click **Save**

### Obtaining Your Access Token

1. First, you need to [create Waalaxy account](https://waalaxy.com?o=n8n)
1. Log in to your Waalaxy account
1. Navigate to your Settings, [Integrations section](https://app.waalaxy.com/settings/crm-sync)
1. Generate an access token
1. Copy the token and paste it into n8n

> **Note:** Keep your access token secure and never share it publicly.

## Operations

### Prospect

#### Add to List and Campaign

Add prospects to a prospect list and optionally enroll them in a campaign.

| Parameter                     | Type       | Required | Description                                      |
| ----------------------------- | ---------- | -------- | ------------------------------------------------ |
| Prospect List                 | Select     | Yes      | The prospect list to add prospects to            |
| Campaign                      | Select     | No       | Optional campaign to enroll prospects in         |
| Prospects                     | Collection | Yes      | List of prospects to add                         |
| Move Duplicates to Other List | Boolean    | No       | Whether to move duplicates to the specified list |
| Can Create Duplicates         | Boolean    | No       | Whether to allow creating duplicate prospects    |

**Prospect Fields:**

| Field                | Type       | Required | Description                                            |
| -------------------- | ---------- | -------- | ------------------------------------------------------ |
| LinkedIn URL         | String     | Yes      | The LinkedIn profile URL of the prospect               |
| First Name           | String     | No       | First name of the prospect                             |
| Last Name            | String     | No       | Last name of the prospect                              |
| Email                | String     | No       | Email address of the prospect                          |
| Company Name         | String     | No       | The name of the prospect's company                     |
| Company LinkedIn URL | String     | No       | The LinkedIn URL of the prospect's company             |
| Company Website      | String     | No       | The website of the prospect's company                  |
| Occupation           | String     | No       | The occupation of the prospect                         |
| Region               | String     | No       | The region/location of the prospect                    |
| Birthday Day         | Number     | No       | The day of the month of the prospect's birthday (1-31) |
| Birthday Month       | Number     | No       | The month of the prospect's birthday (1-12)            |
| Phone Numbers        | Collection | No       | Phone numbers with type (Mobile, Work, Home, Other)    |

## Usage Examples

### Example 1: Bulk Import from Google Sheets

1. **Google Sheets node** — Read prospect data from a spreadsheet
2. **Waalaxy node** — Add prospects to your list and campaign

```
[Google Sheets] → [Waalaxy: Add to List and Campaign]
```

### Example 2: Webhook Integration

Automatically add new leads to Waalaxy when a form is submitted:

```
[Webhook Trigger] → [Waalaxy: Add to List and Campaign]
```

### Example 3: CRM Integration

Sync prospects from your CRM to Waalaxy campaigns:

```
[HubSpot/Salesforce] → [Filter] → [Waalaxy: Add to List and Campaign]
```

## Development

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm
- n8n installed locally for testing

### Setup

1. Clone the repository:

```bash
git clone https://github.com/Waapi-Pro/n8n-nodes-waalaxy.git
cd n8n-nodes-waalaxy
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

### Available Scripts

| Script                | Description                           |
| --------------------- | ------------------------------------- |
| `npm run build`       | Build the node for production         |
| `npm run build:watch` | Build with watch mode for development |
| `npm run dev`         | Start development mode                |
| `npm run lint`        | Run ESLint to check for code issues   |
| `npm run lint:fix`    | Automatically fix linting issues      |
| `npm run release`     | Create a new release                  |

### Testing Locally

To test the node locally with n8n:

1. Build the node:

```bash
npm run build
```

2. Link the node to your global n8n installation:

```bash
npm link
```

3. In your n8n directory, link the package:

```bash
npm link @waapi/n8n-nodes-waalaxy
```

4. Start n8n:

```bash
n8n start
```

Alternatively, use the development mode:

```bash
npm run dev
```

### Project Structure

```
n8n-nodes-waalaxy/
├── credentials/
│   └── WaalaxyApi.credentials.ts    # API credentials configuration
├── nodes/
│   └── Waalaxy/
│       ├── listSearch/              # Dynamic list loading functions
│       │   ├── getCampaigns.ts      # Fetch available campaigns
│       │   └── getProspectLists.ts  # Fetch available prospect lists
│       ├── resources/
│       │   └── prospect/            # Prospect resource operations
│       │       ├── index.ts
│       │       └── addToListAndCampaign.ts
│       ├── shared/
│       │   ├── descriptions.ts      # Shared UI components
│       │   └── transport.ts         # API request helper
│       ├── Waalaxy.node.ts          # Main node definition
│       └── Waalaxy.node.json        # Node metadata
├── icons/                           # Node icons (light/dark themes)
├── dist/                            # Compiled output
├── package.json
└── tsconfig.json
```

## Support

If you encounter any issues or have questions:

- Open an issue on [GitHub](https://github.com/Waapi-Pro/n8n-nodes-waalaxy/issues)
- Contact the author at fabien.turgut@waalaxy.com
