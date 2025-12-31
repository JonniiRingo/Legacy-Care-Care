# ─────────────── 0. GLOBAL PREREQUISITES (run once per machine) ───────────────
brew install node gh supabase/tap/supabase           # Node, GitHub CLI, Supabase CLI
npm  i  -g  vercel                                   # Vercel CLI (global)

# ─────────────── 1. START A FRESH PROJECT FOLDER ───────────────
mkdir my-portfolio && cd my-portfolio                # <-- change name if you want

# ─────────────── 2. DROP IN THE AUTOMATION SCRIPT ───────────────
cat <<'EOF' > react-setup.sh
#!/usr/bin/env bash
# --- derived from your old script, trimmed & fixed for Vite + Supabase ---
set -e

PROJECT_DIR="\$PWD"
REPO_NAME=\$(basename "\$PROJECT_DIR")

echo "🔹 cleaning node_modules"; rm -rf node_modules

# ─────────────── using inhouse cli dev tools ───────────────

npm run dev-bootstrap   # full OS tooling
npm run setup           # project scaffold

# Vite + React scaffold
npm create vite@latest . -- --template react
npm i                                                 # install starter deps

# Your stack in one shot
npm i @supabase/supabase-js react-router-dom framer-motion lucide-react
npm i -D tailwindcss postcss autoprefixer vite-plugin-svgr
npx tailwindcss init -p                              # tailwind + postcss config

# Supabase local scaffold
supabase init                                        # puts ./supabase/*
supabase start                                       # postgres on :54321

# Git ignore
cat > .gitignore <<'GIT'
node_modules
.env*
dist
.supabase
GIT

# GitHub repo (requires `gh auth login` once on this machine)
if ! gh repo view "$REPO_NAME" >/dev/null 2>&1; then
  gh repo create "$REPO_NAME" --public --source=. --remote=origin --push
else
  git init && git remote add origin "https://github.com/YourUser/$REPO_NAME.git"
fi
git add . && git commit -m "Scaffold: Vite + React + Supabase"

# .env.local template
cat > .env.local <<'ENV'
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=anon
ENV

echo "✅  setup complete — next: run 'npm run dev' in another tab"
EOF

chmod +x react-setup.sh

# ─────────────── 3. EXECUTE THE SCRIPT ───────────────
./react-setup.sh                                     # takes ~1-2 min

# ─────────────── 4. ADD THE TRACKING HELPER ───────────────
mkdir -p src/utils
cat > src/utils/track.js <<'JS'
export async function track(project) {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project })
    });
  } catch (_) { /* analytics failure ≠ fatal */ }
}
JS

# ─────────────── 5. SERVERLESS FUNCTION (Supabase insert) ───────────────
mkdir -p api
cat > api/track.js <<'JS'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SERVICE_ROLE_SECRET            // service role ► insert without RLS block
)

export default async (req, res) => {
  try {
    const { project } = await req.json()
    await supabase.from('traffic').insert({ project_name: project, visits: 1 })
    return res.status(204).end()
  } catch (e) { return res.status(500).json({ error: e.message }) }
}
JS

# ─────────────── 6. LOCAL DEV LOOP ───────────────
# open two terminals:
#  A) supabase start        (if not already running)
#  B) npm run dev           (Vite on http://localhost:5173)

# ─────────────── 7. PUSH & DEPLOY ───────────────
git push -u origin main
vercel link                      # once
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add VITE_SERVICE_ROLE_SECRET
vercel --prod



<!-- Refactor to Next.js: Legacy Car Care1. 


Architecture StrategyTemplate: Clone the structure of the store project (Next.js 15, App Router, Server Actions, Prisma).Why: Abandoning the previous react-setup.sh (Vite) script because this project requires backend-heavy logic for scheduling and payments. Next.js Server Actions will handle the booking logic directly without a separate API server.2. Business Logic UpdateThe original site flow was linear. The new logic separates the "Base Wash" from "Add-ons" to maximize upsells.Flow: User Selects Base Service ($65) $\rightarrow$ User Selects Add-ons (e.g., +$95 Clay Bar) $\rightarrow$ System Calculates Total $\rightarrow$ User Picks Time Slot $\rightarrow$ Payment.3. Database Schema (Prisma)Replace prisma/schema.prisma with this model to support the new "Add-on" logic:Code snippetmodel User {
  id        String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  email     String    @unique
  name      String?
  bookings  Booking[]
  createdAt DateTime  @default(now())
}

model Service {
  id          String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name        String
  description String
  price       Decimal   @db.Decimal(10, 2)
  durationMin Int       @default(60)
  bookings    Booking[]
}

model AddOn {
  id          String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name        String
  price       Decimal   @db.Decimal(10, 2)
  durationMin Int       @default(30)
  bookings    BookingAddOn[]
}

model Booking {
  id        String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId    String   @db.Uuid
  serviceId String   @db.Uuid
  date      DateTime
  status    String   @default("pending")
  totalPrice Decimal @db.Decimal(10, 2)
  
  user      User     @relation(fields: [userId], references: [id])
  service   Service  @relation(fields: [serviceId], references: [id])
  addOns    BookingAddOn[]
  createdAt DateTime @default(now())
}

model BookingAddOn {
  bookingId String @db.Uuid
  addOnId   String @db.Uuid
  booking   Booking @relation(fields: [bookingId], references: [id])
  addOn     AddOn   @relation(fields: [addOnId], references: [id])

  @@id([bookingId, addOnId])
}








4. Data Seeding (Services & Pricing)Based on the client's handwritten menu. Use this in db/seed.ts:TypeScript// Base Wash
const signatureWash = await prisma.service.create({
  data: {
    name: 'Legacy Signature Wash',
    description: 'Wheel decontamination, exterior wash, spray wax, interior vacuum, wipe down, dressing, and air freshener.',
    price: 65.00,
    durationMin: 60,
  },
});

// Add-Ons
const addOnsData = [
  { name: 'Clay Bar Treatment', price: 95.00, durationMin: 45 },
  { name: 'Paint Correction', price: 299.00, durationMin: 180 },
  { name: 'Paste Wax', price: 25.00, durationMin: 20 },
  { name: 'Sealant', price: 50.00, durationMin: 30 },
  { name: 'Ceramic Coating', price: 75.00, durationMin: 60 },
  { name: 'Interior Shampoo', price: 100.00, durationMin: 90 },
];
5. Next Steps
-->

# 1. Initialize new Next.js app using store as a reference.

# 2. Apply Schema (npx prisma db push).

# 3. Run Seed (npx tsx ./db/seed).

# 4. Build the "Booking Wizard" UI component. 





Adding scheduling 





Feature Spec: Smart Scheduling & Deposits
1. The Core Problem
Most booking apps use fixed slots (8:00, 10:00). This fails for us because:

Variable Durations: A basic wash is 60 mins. A wash + Paint Correction is 4 hours.

Solution: We need "Dynamic Availability." The system must calculate open slots based on the total duration of the selected services.

2. Database Schema Updates
We need to store the exact time range to prevent double-booking.

Update Booking model in schema.prisma:

Code snippet

model Booking {
  id           String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  // ... (userId, serviceId relation fields)
  
  startTime    DateTime // e.g., 2025-12-28 10:00:00
  endTime      DateTime // Calculated: startTime + serviceDuration + addOnDuration
  
  // Payment Logic
  totalPrice   Decimal  @db.Decimal(10, 2)
  depositPaid  Decimal  @db.Decimal(10, 2) // The 50% paid upfront
  paymentIntentId String? // Stripe ID to charge the remaining 50% later
  status       String   @default("confirmed") // pending, confirmed, completed, cancelled
}
3. The "Smart Availability" Algorithm
File: lib/actions/availability.actions.ts

Logic Flow:

Input: User selects Date (e.g., "Tomorrow") and Services (Total Duration = 90 mins).

Fetch: Get all Booking records for that specific date.

Calculate:

Define Work Day: 08:00 to 17:00.

Create 30-minute intervals: 08:00, 08:30, 09:00...

The Check: For each interval, does (Interval Start + 90 mins) overlap with any existing booking?

If Yes: Mark unavailable.

If No: Add to "Available Slots" list.

Output: Return list of valid start times to frontend (e.g., ['08:00', '13:30', '15:00']).

4. The Payment Flow (Stripe)
Goal: Charge 50% now, save card, charge 50% later.

Step A: The Initial Charge (Frontend)

User clicks "Book Appointment".

Server creates Stripe Payment Intent:

amount: Total Price / 2.

setup_future_usage: 'off_session' (CRITICAL: allows you to charge them later without them present).

User enters card & pays.

Step B: The Final Charge (Admin Panel)

Owner logs in, sees appointment list.

Owner clicks "Mark Complete".

Server triggers Stripe API:

Create new Payment Intent using the customer_id and saved payment_method_id.

amount: Remaining 50%.

off_session: true.

5. Implementation Roadmap
Backend (Day 1):

Update Prisma Schema.

Write getAvailableSlots(date, duration) function.

Frontend (Day 2):

Create "Service Selector" (toggles add-ons, updates total duration state).

Create "Time Picker" (calls getAvailableSlots).

Payments (Day 3):

Set up Stripe Webhooks (to create Booking in DB only after payment succeeds).

Build "Admin Dashboard" button to capture final payment.