# ThreatFusion 🚀

**AI-Powered Threat Intelligence Platform**

ThreatFusion is an intelligent cybersecurity dashboard that aggregates threat data from multiple public sources, summarizes it using LLMs (like GPT or Gemini), and delivers real-time, actionable insights to security teams. It integrates IP geolocation mapping, automated email reports, and CVE explanation using RAG (Retrieval-Augmented Generation), making it a powerful assistant for monitoring, analyzing, and understanding cyber threats.

---

## 🌍 Live Demo / Hosted URL

> (Optional) Add your live frontend/backend hosted links here:

* Frontend: [https://threatfusion.vercel.app](#)
* Backend API: [https://threatfusion-api.render.com](#)

---

## 📊 Features

| Feature                      | Description                                                 |
| ---------------------------- | ----------------------------------------------------------- |
| 🔗 Multi-Source Aggregation  | Real-time data from VirusTotal, AlienVault, AbuseIPDB       |
| 🧠 AI-Powered Summarization  | GPT/Gemini highlights key threat trends                     |
| 🌍 IP Geolocation + Map View | Visualizes threat origin on an interactive world map        |
| 📄 Daily Email Reports       | Sends styled PDF summaries of daily threats using cron jobs |
| 📚 CVE RAG Chat Assistant    | CVE explanations using real-time RAG pipeline + LLM         |
| 📊 Interactive Dashboard     | Filters, charts, severity tagging, and search options       |

---

## 🪧 Tech Stack

### Frontend:

* React.js
* Tailwind CSS
* Leaflet.js (Map view)
* Chart.js

### Backend:

* Node.js + Express
* Axios (API calls)
* jsPDF + node-cron + nodemailer (Reporting)

### Integrations:

* VirusTotal API
* AlienVault OTX API
* AbuseIPDB API
* ipinfo.io for geolocation

### AI/NLP:

* OpenAI GPT / Gemini
* LangChain RAG Pipeline (for CVE queries)

### Deployment:

* Frontend: Vercel / Render
* Backend: Railway / Replit

---

## 🔍 Use Case / Target Users

* SOC (Security Operations Center) Teams
* DevSecOps Engineers
* Cybersecurity Researchers & Analysts
* Small and Mid-sized Enterprises (SMEs)

---

## 🔧 Installation & Setup

1. **Clone the repo:**

```bash
git clone https://github.com/your-username/ThreatFusion.git
```

2. **Install dependencies:**

```bash
cd ThreatFusion/frontend
npm install

cd ../backend
npm install
```

3. **Set environment variables:**
   Create a `.env` file in both frontend and backend with your API keys.

4. **Run frontend and backend locally:**

```bash
cd backend
node index.js

cd ../frontend
npm start
```

---

## 🎥 Project Preview

> Add screenshots or demo video link here.

* Dashboard View
* CVE Assistant
* Geolocation Map

---

## 📊 Project Structure

```
ThreatFusion/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── index.html
├── backend/
│   ├── routes/
│   ├── services/
│   ├── index.js
│   └── utils/
└── README.md
```

---

## ✅ Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 🚨 License

[MIT License](LICENSE)

---

## 🌟 Credits

* OpenAI for GPT APIs
* LangChain for RAG
* AlienVault, VirusTotal, AbuseIPDB
* Built with ❤️ during the Societe Generale Hackathon 2025
