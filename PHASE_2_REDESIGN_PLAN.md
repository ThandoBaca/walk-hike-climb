# Walk Hike Climb (WHC / SRT) — Phase 2 Redesign & Frontend Design Plan

> **Document Type:** Master Implementation & Architectural Specification  
> **Client:** Walk Hike Climb (Pty) Ltd — Cape Town, South Africa  
> **Audience:** Internal Project Team, Business Partners & Lead Developers  
> **Status:** Final Plan for Offline Review & Approval  

---

## 1. Executive Summary & Purpose

This document integrates the **Initial Strategic Brief (Phase 1 / Brand Baseline)** and the **Notes for Phase 2** into a cohesive frontend blueprint. 

Walk Hike Climb is transitioning from a preliminary single-page prototype to a **dedicated multi-page, story-driven travel web platform**. Built specifically for visitors seeking *"the road less travelled"* and authentic human connection, the redesign delivers:

1. **Clear 4-Page Site Architecture:**
   - **Page 1:** Home & Curated Tour Packages (`index.html`)
   - **Page 2:** Our Story & Meet the Team (`about.html`)
   - **Page 3:** Ready, Set, Prep — Seasonal Climate Guide (`prep.html`)
   - **Page 4:** Direct Contact & Fast Inquiries (`contact.html`)
2. **Hero & Aesthetic Transformation:**
   - Pure photography focus without reddish/maroon tint overlays.
   - Distinctive, un-templated visual identity built upon WHC’s official brand palette (`#222222`, `#03c03c`, `#58111a`, `#e4dcc7`, `#8d3c39`).
   - Clean dynamic hero image carousel showcasing Cape Town highlights (Table Mountain, Boulders African Penguins, San Rock Art, Coastal Trails).
3. **Structured Package System with Modal Details:**
   - 3 intentional categories: **African Cradle of Human Culture Tours**, **Single Day Tours**, and **Walk of Reflection**.
   - Uniform card design: bottom-left bordeaux price tag + bottom-right green **"Read More"** trigger.
   - Comprehensive detail modals including itinerary breakdowns, transparent pricing for group sizes, inclusions, what to bring, and expandable trail difficulty accordions.
4. **Frictionless Booking & Direct Communication:**
   - Header **"Book a Tour"** button converted to an interactive quotation modal.
   - Seamless floating email inquiry drawer.
   - Removal of redundant floating buttons, intrusive map embeds, and legacy 4 pillars.
   - Integrated international country selector, updated business hours, and official Instagram handle.

---

## 2. Brand Identity & Frontend Design Token System

In strict accordance with the **Brand Guidelines (Phase 1, Page 4)** and the **Frontend Design Principles**, the system adheres to deliberate, brand-authentic tokens rather than generic AI defaults.

### 2.1 Color Palette

| Token Name | Hex Code | Visual Role & Usage |
| :--- | :--- | :--- |
| `--color-primary-black` | `#222222` | Banner title text, high-contrast headings, primary text |
| `--color-primary-green` | `#03c03c` | "Read More" buttons, CTA actions, confirmation accents |
| `--color-green-hover` | `#029b31` | Hover state for interactive green elements |
| `--color-bordeaux-wine` | `#58111a` | Package price tags (bottom-left), deep brand accents |
| `--color-sand-buff` | `#e4dcc7` | Warm tactile card surfaces, secondary background accents |
| `--color-sand-light` | `#fbf9f4` | Page body background, soft neutral canvas |
| `--color-terracotta` | `#8d3c39` | Secondary warm clay accent, Walk of Reflection badges |
| `--color-border-subtle` | `#e2dac5` | Restrained architectural borders and dividers |
| `--color-text-muted` | `#5a5751` | Descriptive body copy, supporting metadata |

### 2.2 Typographic Hierarchy

Per the client guidelines:
- **Headings & Titles:** `Trebuchet MS`, `Plus Jakarta Sans`, sans-serif (deliberately weighted, tight tracking, editorial presence).
- **Body & Paragraphs:** `Arial`, `Helvetica Neue`, sans-serif (clean, highly legible, 1.62 line-height, under 75 character line lengths).

```css
:root {
  --font-heading: 'Trebuchet MS', 'Plus Jakarta Sans', -apple-system, sans-serif;
  --font-body: 'Arial', 'Helvetica Neue', sans-serif;
  
  --text-hero: clamp(2.2rem, 4.5vw, 3.4rem);
  --text-h1: clamp(1.85rem, 3.2vw, 2.5rem);
  --text-h2: clamp(1.4rem, 2.4vw, 1.85rem);
  --text-h3: 1.2rem;
  --text-body: 1rem;
  --text-small: 0.875rem;
  --text-price: 1.15rem;
}
```

### 2.3 Visual Principles & Restraint (Avoiding Generic Defaults)

- **No False Hero Tint:** The Table Mountain and Cape scenic photography will shine through naturally without unnatural colored scrims or gradient overlays.
- **Purposeful Iconography:**
  - Standard bullet points on wine packages are replaced with tasteful wine icons (`fa-wine-glass`).
  - Table Mountain hiking difficulties use hiking boot markers (`🥾 Easy`, `🥾🥾 Moderate`, `🥾🥾🥾 Difficult`).
  - Weather guide uses clean, monochrome/black-and-white minimalist line icons as requested in Phase 2 Page 13.
- **Deliberate Micro-Interactions:** Transitions are subtle (180ms ease) and occur only on direct user interaction (tab switching, card hovering, modal triggering, accordion expand).

---

## 3. Site Navigation & Global Header / Footer Architecture

### 3.1 Global Header

```
+--------------------------------------------------------------------------------------------------+
| [Logo] WALK HIKE CLIMB (Black)    Home    About Us    Packages [v]    What to Prep    Contact Us  [Book a Tour] |
+--------------------------------------------------------------------------------------------------+
```

1. **Brand Text:** `Walk Hike Climb` in the navigation banner is styled in bold black (`#222222`), replacing previous burgundy treatments.
2. **Linear Hover Dropdown for Packages:**
   - Preserves mouse-hover dropdown behavior requested in Phase 1 (Page 11).
   - Styled as a clean linear vertical menu (no complex mega-grid).
   - Links directly to package categories:
     - *African Cradle of Human Culture Tours (Multi-Day)*
     - *Single Day Tours*
     - *Walk of Reflection*
3. **Primary Header CTA ("Book a Tour"):**
   - Styled in brand green (`#03c03c`).
   - Clicking opens the **Tour Quotation / Inquiry Pop-Up Modal** directly (no page reload).
4. **Responsive Mobile Toggle:** Accessible hamburger menu that expands smoothly with WCAG focus management.

### 3.2 Global Footer

- **Brand Statement:** *"Live the experience, leave with the story."*
- **Quick Navigation Links:** Grouped by multi-day journeys, day tours, and preparation.
- **Direct Contact:** Phone (`081 376 8978` / `+27 81 376 8978`), emails (`ian@walkhikeclimb.co.za`, `diane@walkhikeclimb.co.za`), physical base in Goodwood, Cape Town.
- **Social Media Links:**
  - Facebook (`https://www.facebook.com/Walk-Hike-Climb-2002713389974515`)
  - **Instagram Link (New Phase 2 Requirement)**
- **Operating Hours:**
  - Monday – Friday: `08:00 – 17:00 SAST`
  - Saturday & Sunday: `08:00 – 15:00 SAST`

---

## 4. Multi-Page Breakdown & Page Specifications

```
                       [WALK HIKE CLIMB PLATFORM]
                                    │
    ┌──────────────────┬────────────┴─────────────┬─────────────────┐
    ▼                  ▼                          ▼                 ▼
[index.html]      [about.html]               [prep.html]       [contact.html]
Home & Packages   Family Story & Team        Seasonal Climate  Direct Contacts
Hero Carousel     - Ian                      - Spring          - Hours & Details
Linear Filters    - Diane                    - Summer          - Email Drawer
Package Cards     - Dominique                - Autumn          - Quote Form
Detail Modals     - Juliet                   - Winter (B&W)    (Map Removed)
```

---

### Page 1: Home & Curated Packages (`index.html`)

#### A. Hero Section & Carousel
- **Heading:** `Small-Group Cultural & Historical Tours` *(First letters capitalized per Phase 2 Page 2)*.
- **Catchphrase / Tagline:** *"Live the experience, leave with the story"*.
- **Visual Presentation:** Clean text card positioned over an unmasked, natural photo carousel.
- **Carousel Slides:**
  1. *Table Mountain Summit & Atlantic View* (`sitepad-data/uploads/2020/10/Looking-at-the-iconic-Upper-Cable-Station.jpg`)
  2. *Boulders Beach African Penguins & False Bay Coastal Rocks*
  3. *Diepkloof Rock Art & San Heritage* (`sitepad-data/uploads/2020/10/7-Drakensburg-Ladder-2019.jpg`)
  4. *Cape Peninsula & Chapman's Peak Coastal Vista* (`sitepad-data/uploads/2020/10/Looking-at-Table-Mountain-from-BoKaap.jpg`)
- **Exclusions:**
  - **Removed:** Red/maroon filter over mountain photography.
  - **Removed:** *"Explore packages"* and *"Speak with Ian & Diane"* hero buttons.
  - **Removed:** Standalone "Top 3 Featured Packages" ribbon.
  - **Removed:** Walk Hike Climb 4 Pillars section.
  - **Removed:** Expedition highlights / Gallery section.
  - **Removed:** Static bottom inquiry form (integrated into banner modal).

#### B. Packages Catalog & Interactive Filter Engine
- **Filter Tabs:**
  1. **All Packages**
  2. **African Cradle of Human Culture Tours** *(All multi-day journeys longer than 1 day)*
  3. **Single Day Tours** *(All single-day experiences)*
  4. **Walk of Reflection** *(Dedicated tab; strictly never abbreviated as WOR)*
- **Card UI Architecture:**
  - **Header Image:** Real-world candid photograph with duration tag.
  - **Title:** Accurate Phase 2 naming.
  - **Short Description:** 2–3 sentence evocative summary.
  - **Footer Bar:**
    - **Left Corner:** Price in bordeaux (`#58111a`), e.g., `From R3 000.00`.
    - **Right Corner:** Vibrant green button (`#03c03c`) labeled **"Read More"**.

---

### Comprehensive Package Registry (Phase 2 Data Matrix)

| ID | Package Title | Category | Duration / Scope | Pricing (Bordeaux) | Key Inclusions & Highlights |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `pkg-wc-4d` | **West Coast – Beyond What You See** | African Cradle of Human Culture | 4 Days / 3 Nights | **R95 500.00** per tour for up to 9 people | Clanwilliam, Cederberg mountain range, coastal San heritage, rock art, 3 nights accommodation, all meals (3B, 4L, 3D), transport. |
| `pkg-wc-2d` | **West Coast – Beyond What You See: 2-Day Tour** | African Cradle of Human Culture | 2 Days / 1 Night | **R57 000.00** per tour for up to 9 people | Diepkloof Rock Shelter hike, Yzerfontein seaside stay, !Khwa ttu San Heritage Centre, 1 night accommodation, meals (1B, 2L, 1D). |
| `pkg-city` | **Cape Town – Stories of the City** | Single Day Tours | 4 Hours (Max 10 guests) | **R3 000.00** per tour for 2 people | Castle of Good Hope, Iziko Slave Lodge, District Six Museum, Bo-Kaap, Cape Malay tasting, customizable pacing. |
| `pkg-cableway` | **The Table Mountain Cableway** | Single Day Tours | 4 Hours (Max 10 guests) | **R8 000.00** per tour for 2 people | Fast Track Cableway tickets (no queues), air-conditioned transit, Jan van Hunks tablecloth lore, panoramic summit walk. |
| `pkg-tm-hike` | **Table Mountain / Hoerikwaggo – Mountain in the Sea** | Single Day Tours | 6 Hours (Max 10 guests) | **R2 000.00** per person | 5 selectable routes with dropdown details: India Venster, Platteklip Gorge, Back Table, Pipe Track, Eagle's Nest. |
| `pkg-peninsula` | **The Cape Peninsula** | Single Day Tours | 6 Hours (Max 10 guests) | **R8 000.00** per tour for 2 people | False Bay, Boulders Beach penguin colony, Cape Point Nature Reserve, King Proteas, Chapman's Peak golden hour. |
| `pkg-winelands` | **Cape Winelands** | Single Day Tours | 6 to 8 Hours (Max 10 guests) | **R12 000.00** per tour for 2 people | Franschhoek & Stellenbosch, 2 wine estate tastings, cellar tours, lunch included, Helshoogte Pass, Cape Dutch heritage. |
| `pkg-reflection` | **Walk of Reflection** | Walk of Reflection *(May – Nov only)* | 2 Days (Min 6 pilgrims) | **R2 800.00** per person | Day 1: Bergvliet to Fish Hoek (16.85 km). Day 2: Fish Hoek, Elsies Peak, Glencairn (13 km). Shared self-catering, luggage transfer. |

*(Note: East Coast 1-day and East Coast 5-day trips are completely hidden from the catalog per Phase 2 Page 2).*

---

#### C. Package Detail Drawer / Modal Architecture
Clicking **"Read More"** on any card triggers a clean, focused modal drawer displaying:
1. **Header Banner:** Full package name, high-res scenery image, and category badge.
2. **Pricing & Booking Terms:** Bold bordeaux pricing, group capacity, booking confirmation timeline (48 hours or 1 month in advance), and payment conditions.
3. **Comprehensive Narrative ("Read More"):** Deep narrative describing the archaeological, cultural, or physical journey.
4. **Interactive Trail Dropdowns (Specifically for Table Mountain / Hoerikwaggo):**
   - Clickable dropdown accordion rows:
     - `India Venster 🥾🥾🥾` — Challenging scramble, rocky terrain, steep vistas.
     - `Platteklip Gorge 🥾🥾🥾` — Direct summit climb for fit hikers.
     - `The Back Table 🥾🥾` — Peaceful, scenic walk across Table Mountain's southern side.
     - `Pipe Track 🥾` — Gentle trail along the Twelve Apostles buttresses.
     - `Eagle's Nest 🥾🥾🥾` — Majestic panorama of Constantia and coastline.
5. **What's Included List:** Clear bullet points highlighting meals, permits, entries, and transport.
6. **What to Bring Along Checklist:** Specific footwear, weather gear, medication, and water advice.
7. **Combo Suggestions ("Easy to combine with"):** Cross-links to related attractions (Table Mountain Cableway, Peninsula, Winelands).
8. **Action CTA:** Green button labeled **"Inquire About This Tour"**, which pre-populates the booking modal with the active tour name.

---

### Page 2: About Us (`about.html`)

A warm, editorial storytelling layout highlighting the Naidoo family history and their personal dedication to Cape Town's cultural preservation.

#### A. Family Founding Story
- **Origins:** Begins with a 10-year-old lad exploring Table Mountain on his bicycle with an affinity for history and adventure.
- **Partnership:** Ian met Diane, who shared his passion. They explored Cape Town's hidden mountain routes and coastlines in their trusted "landie", tent, and a Colt 1100 named "Noddy".
- **Generations:** Their adventurous spirit trickled down to daughters Dominique and Juliet, whose first hikes occurred in their infancy.
- **The WHC Mission:** Created to invite travelers to discover South Africa through genuine connection, San heritage, oral storytelling, and ethical exploration.

#### B. "Meet The Team" Profile Grid
Four dedicated, warm profile cards featuring real photography:

1. **Ian — Founder & Tour Director**
   - *Role:* Lead Guide & Storyteller.
   - *Credentials:* Fully certified Adventure, Cultural, and Archaeological guide.
   - *Bio Quote:* "Ready to explore? I built this company to share my absolute passion for discovery with travelers like you. Whether trekking off the beaten path or exploring ancient ruins, you're in safe hands."
2. **Diane — CEO & Business Administrator**
   - *Role:* Operations & Seamless Logistics.
   - *Credentials:* National Diploma in Financial Management, 20+ years operational leadership.
   - *Bio Quote:* "My job is to keep our wheels turning smoothly behind the scenes so our guiding team can focus entirely on giving you the adventure of a lifetime."
3. **Dominique — Marketing Coordinator**
   - *Role:* Voice of WHC & Community Engagement.
   - *Credentials:* Bachelor's degree in English, Linguistics, and Psychology; certified educator.
   - *Bio Quote:* "I love using the power of communication to share the beauty of what we do and connect our adventures with travelers from around the globe."
4. **Juliet — Product Developer**
   - *Role:* Itinerary Architect & Experience Designer.
   - *Credentials:* Diploma in Tourism, 7 years international travel experience.
   - *Bio Quote:* "I use firsthand knowledge of world-class travel to craft unique, seamless itineraries that immerse you in the wonder of South Africa."

---

### Page 3: Ready, Set, Prep (`prep.html`)

A dedicated preparation hub designed with **clean, monochrome / black-and-white minimalist iconography** (Phase 2 Page 13) and a scannable 4-season grid layout.

#### A. Introduction
*"When travelling in and around Cape Town, depending on the time and season you are visiting, you may need to consider the weather."*

#### B. Seasonal Climate & Hiking Grid

```
+-----------------------------------------------------------------------------------+
|  [Spring B&W Icon]                                [Summer B&W Icon]               |
|  SPRING (September – November)                    SUMMER (December – February)    |
|  • Daytime: 17°C to 21°C (63°F to 70°F)           • Daytime: 24°C to 28°C         |
|  • Nighttime: 9°C to 12°C (48°F to 54°F)          • Nighttime: 13°C to 18°C       |
|  The weather warms up progressively; region       Warmest, driest time; long      |
|  experiences blooming wildflowers & clear days.   sunny days. Peak summer months. |
+-----------------------------------------------------------------------------------+
|  [Autumn B&W Icon]                                [Winter B&W Icon]               |
|  AUTUMN (March – May)                             WINTER (June – August)          |
|  • Daytime: 20°C to 25°C (68°F to 77°F)           • Daytime: 12°C to 17°C         |
|  • Nighttime: 11°C to 15°C (52°F to 59°F)         • Nighttime: 7°C to 9°C         |
|  Temperatures cool from summer peak; weather      Coldest period; mild, wet, and  |
|  remains largely pleasant, calm, and golden.      windy; green winter landscapes. |
+-----------------------------------------------------------------------------------+
```

#### C. Universal Essential Packing List
- **Footwear:** Broken-in trail shoes or hiking boots with aggressive grip.
- **Layers:** Breathable base layers, fleece, and lightweight wind/rain shell.
- **Sun Protection:** Wide-brim hat, UV-blocking sunglasses, and SPF 50+ sunscreen.
- **Hydration:** Minimum 1.5L to 2L refillable water bottles.
- **Personal Care:** Personal prescription medication and small daypack.

---

### Page 4: Contact Us (`contact.html`)

A direct, clean communication interface without unnecessary map embeds.

#### A. Contact Information Architecture
- **Physical Base:** 122 Kimberley Street, Goodwood, Cape Town, 7460, South Africa.
- **Direct Telephone / WhatsApp:** `081 376 8978` / `+27 81 376 8978` (Ian Naidoo).
- **Direct Inquiries:** `ian@walkhikeclimb.co.za` & `diane@walkhikeclimb.co.za`.
- **Updated Business Operating Hours:**
  - **Monday – Friday:** `08:00 – 17:00 SAST`
  - **Saturday & Sunday:** `08:00 – 15:00 SAST`
- **Social Media:**
  - **Instagram:** Direct link to WHC Instagram profile *(New)*.
  - **Facebook:** Official WHC community page.
- **Map Embed Removed:** Per Phase 2 Page 1 ("Remove the Map").

#### B. Direct Inquiry Integration
Hosts an intuitive contact form for general messages, private group bookings, and custom itinerary inquiries.

---

## 5. Modal Dialogs & Interactive Logic Specifications

### 5.1 "Book a Tour" Quotation Pop-Up Modal
Triggered directly from the banner button:
- **Header:** *"Request a Tour Quote or Booking Availability"*.
- **Fields:**
  1. `First Name` & `Last Name` (Required)
  2. `Email Address` (Required)
  3. `Phone / WhatsApp Number` (With international dialing code)
  4. `Country of Origin / Residence` *(Mandatory dropdown: South Africa, UK, USA, Germany, Netherlands, France, Australia, Canada, Switzerland, etc. per Phase 1 Page 12)*
  5. `Tour Package Selection` *(Auto-selects active package if clicked from a card)*
  6. `Preferred Travel Date` (Native date picker)
  7. `Number of Travelers / Group Size`
  8. `Special Requirements / Dietary / Fitness Notes`
- **Submission:** Simulates clean instant confirmation toast with personal greeting from Ian and Diane.
- **Accessibility:** Trap focus (`Tab` / `Shift+Tab`), `Escape` key dismissal, aria-modal attributes.

### 5.2 Floating "Click Here for Email Enquiries" Drawer
- Styled discreetly along the lower screen corner.
- Provides an immediate 3-field quick question form (Name, Email, Inquiry Message).
- Completely replaces intrusive multi-button floating clusters.

---

## 6. Technical Implementation Roadmap & File Changes

```
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 2 Implementation Steps                                           │
├──────┬──────────────────────┬──────────────────────────────────────────┤
│ Step │ File                 │ Scope of Work                            │
├──────┼──────────────────────┼──────────────────────────────────────────┤
│ 1    │ index.html           │ Restructure Home with hero carousel,     │
│      │                      │ 3 package filters, 8 updated packages,   │
│      │                      │ bordeaux price/green read-more, booking  │
│      │                      │ modal, remove map/pillars/quote/gallery. │
├──────┼──────────────────────┼──────────────────────────────────────────┤
│ 2    │ about.html           │ Build dedicated About Us page with       │
│      │                      │ family narrative & 4 team member cards.  │
├──────┼──────────────────────┼──────────────────────────────────────────┤
│ 3    │ prep.html            │ Build dedicated Ready, Set, Prep page    │
│      │                      │ with 4-season B&W layout & packing tips. │
├──────┼──────────────────────┼──────────────────────────────────────────┤
│ 4    │ contact.html         │ Build dedicated Contact page with hours, │
│      │                      │ Instagram link, details (no map).        │
├──────┼──────────────────────┼──────────────────────────────────────────┤
│ 5    │ style.css            │ Add styles for black banner title, modal │
│      │                      │ dialogs, carousel, bordeaux/green tags,  │
│      │                      │ B&W season cards, and responsive grids.  │
├──────┼──────────────────────┼──────────────────────────────────────────┤
│ 6    │ app.js               │ Carousel autoplay/controls, package      │
│      │                      │ filtering, "Read More" modal data loader,│
│      │                      │ Table Mountain trail accordions, forms.  │
└──────┴──────────────────────┴──────────────────────────────────────────┘
```

---

## 7. Hosting & Production Deployment Readiness

- **Current Host:** Afrihost Server `stark.aserv.co.za` (IP: `197.242.144.146`).
- **Domain:** `https://walkhikeclimb.co.za/` (Registered through Afrihost Client Zone).
- **Architecture:** 100% static standard HTML5 / Vanilla CSS / Vanilla ES6 JavaScript.
- **Deployment Compatibility:**
  - Works out-of-the-box on Afrihost cPanel / `public_html` via FTP/File Manager.
  - Zero external npm build step required; instant load times and 100% offline preview capability.

---
*Plan created and formatted for offline partner review.*
