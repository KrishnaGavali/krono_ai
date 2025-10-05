# Krono AI: Voice-First Time Management (WhatsApp & Web) 🌟

## Project Overview

Krono AI is a productivity platform that seamlessly transforms raw conversational input (voice notes or text messages) into structured, actionable items in a Google Calendar or a dedicated Task Manager.

It solves the problem of "open loops" — ideas, to-dos, and appointments mentioned on the fly that quickly get lost in chat. By integrating directly with WhatsApp and leveraging the Gemma 3 API for intelligent triage, Krono AI acts as a smart, ever-present personal assistant for scheduling and task capture.

---

## ✨ Key Features

- **WhatsApp Bot Interface**

  - Voice-First Capture: Users send voice notes or text directly to the bot.
  - LLM-Powered Triage: The Gemma 3 API intelligently determines if the message is a time-sensitive Event (e.g., "Schedule a call with Jane at 3 PM tomorrow") or a non-time-sensitive Task (e.g., "Remember to buy new headphones").

- **Google Calendar Integration**

  - Automatically creates time-blocked events with the correct date, time, and title, ensuring high-priority items make it onto the schedule.

- **Web Platform & Task Manager**

  - A modern web dashboard (built with Next.js and shadcn/ui) to visualize Open Loops (Tasks) managed by Appwrite.
  - Allows users to review, prioritize, and manually assign dates to captured tasks.

- **Persistence Layer**

  - **Appwrite**: Used as the Backend-as-a-Service (BaaS) for storing non-calendar, persistent data like Tasks, User Profiles, and Settings.

---

## 🛠️ Technology Stack

| Component          | Technology                       | Purpose                                                                                                     |
| ------------------ | -------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Intelligent Triage | Gemma 3 API (Text & Image)       | Contextual NLP, task prioritization, and structured JSON output for Event/Task determination.               |
| Backend / Logic    | Node.js (Express) & Appwrite SDK | Securely handles the WhatsApp webhook, orchestrates Appwrite/Gemma/Google APIs, and manages business logic. |
| Database / BaaS    | Appwrite                         | Task persistence, user authentication, and triggering scheduled functions (cron).                           |
| Frontend           | Next.js, Tailwind, shadcn/ui     | The modern, responsive web dashboard for reviewing and managing tasks.                                      |
| User Interface     | WhatsApp API                     | Conversational interface for primary input (Voice & Text).                                                  |
| Calendar Sync      | Google Calendar API              | Programmatically creating and updating calendar events.                                                     |

---
