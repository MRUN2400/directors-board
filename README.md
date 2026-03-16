 🎬 Director's Board Studio

A cinematic, cloud-synced storyboard orchestration system designed for directors and cinematographers. Organize your scenes, manage visual notes, and keep your production data synced with a MongoDB backend—all wrapped in a high-fidelity, interactive UI.

✨ Key Features

Cinematic UI: Powered by NextUI and Tailwind CSS for a sleek, dark-mode professional aesthetic.
Sparkle Core Visuals: High-performance particle backgrounds for an immersive landing and login experience.
Real-time Management:Dynamic addition and deletion of storyboard frames.
Cloud Synchronization:Persistent storage using MongoDB Atlas to ensure your project data is never lost.
Bypass Authorization:Streamlined development mode for immediate workspace access.

#Getting Started

1. Prerequisites

* Node.js 18.x or higher
* A MongoDB Atlas account (free tier works perfectly)

 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/directors-board.git
cd directors-board
npm install

```

3. Environment Setup

Create a `.env.local` file in the **root directory** and add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/studio_db?retryWrites=true&w=majority


 4. Run the Studio

```bash
npm run dev



Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to view the application.


 🛠 Tech Stack

| Technology | Purpose |
| --- | --- |
| Next.js 15 | React Framework & API Routes |
| MongoDB / Mongoose | Database & Data Modeling |
| NextUI | UI Component Library |
| Tailwind CSS | Styling |
| Lucide React | High-quality Iconography |
| Sparkles Core | Motion Graphics / Backgrounds |



📂 Project Structure

```text
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── project/route.ts  # Save/Load Logic
│   │   └── page.tsx              # Main Application Entry
│   ├── components/
│   │   └── ui/sparkles.tsx       # Visual Effects
│   ├── lib/
│   │   └── mongodb.ts            # Database Connection
│   └── models/
│       └── Project.ts            # Mongoose Schema
├── .env.local                    # Database Credentials (HIDDEN)
└── package.json                  # Dependencies

```

---

## 📝 Usage Note

* **To Save:** Click the **Cloud Sync** button in the sidebar. You will receive an alert once the data is safely stored in the cloud.
* **To Load:** The app automatically fetches your latest saved board upon entering the Studio.

