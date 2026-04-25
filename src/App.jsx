import { useState, useEffect } from 'react'

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const G = {
  navy: '#0D1F35',
  navyMid: '#162D47',
  navyLight: '#1E3A5A',
  orange: '#C4540A',
  orangeLight: '#F5944A',
  orangePale: 'rgba(196,84,10,0.13)',
  textLight: '#F5F0E8',
  textMuted: '#94A8C0',
  textDim: '#6B8399',
  green: '#1D9E75',
  border: 'rgba(255,255,255,0.08)',
  serif: "'Playfair Display', serif",
  sans: "'DM Sans', sans-serif",
}

// ─── URL ROUTING ─────────────────────────────────────────────────────────────
const urlToPage = (pathname) => pathname.replace(/^\//, '') || 'home'
const pageToUrl = (page) => page === 'home' ? '/' : '/' + page

// ─── GLOBAL STYLES ───────────────────────────────────────────────────────────
const globalCSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: ${G.sans}; background: #fff; color: #1a1a1a; line-height: 1.6; }
  a { color: ${G.orange}; text-decoration: none; }
  a:hover { text-decoration: underline; }
  h1,h2,h3 { font-family: ${G.serif}; }
  input, select, textarea, button { font-family: ${G.sans}; }
  @media (max-width: 640px) {
    .hide-mobile { display: none !important; }
    .nav-links { display: none !important; }
    .two-col { grid-template-columns: 1fr !important; }
    .three-col { grid-template-columns: 1fr !important; }
    .four-col { grid-template-columns: 1fr 1fr !important; }
    .hero-h1 { font-size: 26px !important; }
    .state-grid { grid-template-columns: 1fr 1fr !important; }
  }
`

// ─── ARTICLES DATA ────────────────────────────────────────────────────────────
const ARTICLES = [
  {
    id: 'what-to-do-after-rideshare-accident',
    title: 'What To Do Immediately After a Rideshare Accident',
    excerpt: 'The steps you take in the first 24 hours can make or break your rideshare accident claim. Here\'s exactly what to do — and what to avoid.',
    tags: ['Evidence', 'Insurance', 'First Steps'],
    readTime: '6 min read',
    content: [
      { type: 'intro', text: 'If you\'ve been hurt in an Uber or Lyft accident, you\'re dealing with pain, confusion, and a phone that won\'t stop ringing with calls from insurance adjusters. The next 24 hours matter more than most victims realize. Here\'s what to do.' },
      { type: 'h2', text: '1. Call 911 — even if injuries seem minor' },
      { type: 'p', text: 'Always call 911. A police report creates an official record of the accident that insurance companies cannot dispute. Many rideshare accident injuries — especially soft tissue damage and traumatic brain injuries — don\'t show symptoms immediately. Getting documented at the scene protects you.' },
      { type: 'h2', text: '2. Screenshot your ride details immediately' },
      { type: 'p', text: 'Before closing the app, screenshot your trip details: driver name, vehicle, trip start/end times, and route. This data is time-sensitive — Uber and Lyft can\'t easily delete ride records from a screenshot in your phone.' },
      { type: 'h2', text: '3. Photograph everything at the scene' },
      { type: 'p', text: 'Take photos of: all vehicles involved, license plates, the accident scene, any visible injuries, road conditions, traffic signals, and any witnesses present. Get contact information from every witness.' },
      { type: 'h2', text: '4. Seek medical attention — same day' },
      { type: 'p', text: 'Go to an emergency room or urgent care even if you feel okay. Insurance companies use gaps in medical treatment to argue your injuries weren\'t serious or weren\'t caused by the accident. A same-day medical record is one of the most important documents in your case.' },
      { type: 'h2', text: '5. Do not give a recorded statement' },
      { type: 'p', text: 'You will receive calls from Uber\'s insurer, Lyft\'s insurer, the driver\'s personal insurer, and possibly a third-party driver\'s insurer. All of them will sound helpful. All of them will ask for a recorded statement. Decline every time. You are not legally required to give one, and insurers use recorded statements to find inconsistencies that reduce your payout.' },
      { type: 'h2', text: '6. Report the accident in the app' },
      { type: 'p', text: 'Both Uber and Lyft have in-app accident reporting. Do this, but keep your statements brief and factual. Don\'t admit fault, speculate on injuries, or describe the accident in detail in the app.' },
      { type: 'h2', text: '7. Contact a rideshare accident attorney before settling' },
      { type: 'p', text: 'Rideshare cases involve layered insurance policies that most general practice attorneys have never navigated. An attorney who handles Uber and Lyft cases specifically will know which policies apply, how to calculate your full damages, and how to avoid the lowball settlement offers that come in the first weeks after an accident.' },
      { type: 'cta', text: 'Get a Free Case Evaluation — No Obligation' },
    ]
  },
  {
    id: 'uber-vs-lyft-insurance',
    title: 'Uber vs Lyft Insurance: Which Policy Covers You?',
    excerpt: 'Rideshare insurance is confusing by design. This guide explains exactly which policy applies depending on what the driver was doing at the time of your accident.',
    tags: ['Insurance', 'Coverage', 'Policies'],
    readTime: '7 min read',
    content: [
      { type: 'intro', text: 'The biggest source of confusion in rideshare accident claims is figuring out which insurance policy applies. Uber and Lyft don\'t make this easy — they\'ve structured their coverage in "periods" that determine how much (and whose) coverage applies.' },
      { type: 'h2', text: 'The three rideshare insurance periods' },
      { type: 'p', text: 'Both Uber and Lyft structure coverage around what the driver was doing at the exact moment of the accident. Understanding which period applies to your case is critical.' },
      { type: 'h2', text: 'Period 0: App is off' },
      { type: 'p', text: 'If an Uber or Lyft driver hit you while their app was completely off, only their personal auto insurance applies. The rideshare company has no liability. This is a standard car accident claim.' },
      { type: 'h2', text: 'Period 1: App is on, waiting for a ride request' },
      { type: 'p', text: 'When the driver has the app open but hasn\'t accepted a ride yet, Uber and Lyft provide limited coverage: $50,000 per person / $100,000 per accident for bodily injury, and $25,000 for property damage. The driver\'s personal policy may also have a gap here — many personal auto policies exclude rideshare activity entirely.' },
      { type: 'h2', text: 'Period 2 & 3: Accepted ride through trip completion' },
      { type: 'p', text: 'Once a driver accepts a ride (Period 2) and throughout the trip until you\'re dropped off (Period 3), both Uber and Lyft maintain a $1 million commercial liability policy. This is the strongest coverage tier and applies to most passenger injury claims.' },
      { type: 'h2', text: 'Why this matters for your claim' },
      { type: 'p', text: 'Insurance companies will fight over which period applied at the moment of your accident. Uber and Lyft\'s commercial insurers have handled thousands of these disputes. An experienced rideshare attorney will investigate app data, GPS records, and driver logs to establish the correct period — and the correct policy — for your claim.' },
      { type: 'h2', text: 'What about uninsured drivers?' },
      { type: 'p', text: 'Uber and Lyft\'s $1M policy during Periods 2 and 3 includes uninsured/underinsured motorist coverage. If another driver caused the accident and has no insurance, you can still make a claim against the rideshare company\'s UM/UIM policy.' },
      { type: 'cta', text: 'Not sure which policy applies to your case? Get a free review.' },
    ]
  },
  {
    id: 'how-much-is-my-case-worth',
    title: 'How Much Is a Rideshare Accident Settlement Worth?',
    excerpt: 'Settlement values vary widely. Here\'s what factors determine how much a rideshare accident claim is worth — and why most first offers are far too low.',
    tags: ['Settlements', 'Compensation', 'Value'],
    readTime: '5 min read',
    content: [
      { type: 'intro', text: 'The average rideshare accident settlement ranges from $25,000 to $75,000 — but that number doesn\'t tell the full story. Many cases settle for hundreds of thousands, and serious injury cases frequently exceed $1 million. Here\'s what drives settlement value.' },
      { type: 'h2', text: 'Economic damages' },
      { type: 'p', text: 'These are the concrete, countable losses: current and future medical bills, lost wages while you couldn\'t work, lost earning capacity if injuries affect your long-term career, and property damage. Every dollar of economic damage should be fully documented.' },
      { type: 'h2', text: 'Non-economic damages' },
      { type: 'p', text: 'Pain and suffering, emotional distress, loss of enjoyment of life, and the impact on your relationships are all compensable. These don\'t have receipts, which is why insurers try to minimize them — and why an attorney calculating non-economic damages using a proper multiplier method matters.' },
      { type: 'h2', text: 'Factors that increase settlement value' },
      { type: 'p', text: 'The most important factors: severity and permanence of injuries, clear liability (driver at fault), the insurance period (Period 2/3 means $1M available), strong documented evidence from the scene, consistent medical treatment, and whether Uber or Lyft can be held directly liable under negligent hiring claims.' },
      { type: 'h2', text: 'Why first offers are almost always too low' },
      { type: 'p', text: 'Insurance adjusters are trained to close claims quickly and cheaply. A first offer often arrives before you\'ve completed medical treatment — meaning the full scope of your injuries isn\'t known yet. Accepting a settlement before treatment is complete waives your right to additional compensation, even if complications arise. Never settle before you have a clear medical picture.' },
      { type: 'h2', text: 'Use our settlement calculator' },
      { type: 'p', text: 'Our free rideshare settlement calculator gives you a rough estimate based on your injury type, medical costs, and lost wages. It\'s not a substitute for legal advice, but it gives you a baseline before you talk to an attorney.' },
      { type: 'cta', text: 'Try the Free Settlement Calculator →' },
    ]
  },
  {
    id: 'can-you-sue-uber-lyft',
    title: 'Can You Sue Uber or Lyft Directly?',
    excerpt: 'Rideshare companies classify drivers as independent contractors to limit liability. But recent laws and court decisions are changing that — here\'s what you need to know.',
    tags: ['Lawsuits', 'Liability', 'Legal Strategy'],
    readTime: '6 min read',
    content: [
      { type: 'intro', text: 'Uber and Lyft have spent years and hundreds of millions of dollars fighting to classify their drivers as independent contractors rather than employees. This classification is designed specifically to shield them from direct liability when drivers cause accidents. But it doesn\'t always work.' },
      { type: 'h2', text: 'The independent contractor defense' },
      { type: 'p', text: 'Under traditional employment law, a company is liable for the negligent acts of its employees. By classifying drivers as contractors, Uber and Lyft argue they aren\'t responsible when a driver causes an accident. Courts have generally accepted this framing — but there are important exceptions.' },
      { type: 'h2', text: 'Negligent hiring and retention' },
      { type: 'p', text: 'Even if a driver is an independent contractor, rideshare companies can still be held liable if they knew or should have known the driver was dangerous and put them on the road anyway. If a driver had prior DWIs, a reckless driving history, or criminal convictions that a proper background check would have caught, you may have a direct claim against Uber or Lyft.' },
      { type: 'h2', text: 'HB 1733 and evolving state laws' },
      { type: 'p', text: 'Texas House Bill 1733, passed in 2023, created a clearer legal path to sue Uber or Lyft directly when they fail their background check obligations. As of 2026, courts are actively applying this standard. Other states are implementing similar frameworks. An attorney in your state will know which laws apply to your case.' },
      { type: 'h2', text: 'The direct negligence argument' },
      { type: 'p', text: 'Even without employment liability, rideshare companies can face direct negligence claims for: failing to conduct adequate background checks, maintaining drivers with dangerous records, inadequate safety features in the app, and failure to respond appropriately to prior complaints about a driver.' },
      { type: 'h2', text: 'When to pursue Uber or Lyft directly' },
      { type: 'p', text: 'Pursuing the company directly (not just the driver) is worth exploring when: the driver had a problematic history, the driver\'s personal insurance is inadequate, or you suffered serious injuries that warrant maximum compensation. A rideshare-specific attorney will evaluate this at your free case review.' },
      { type: 'cta', text: 'Find out if you have a claim against Uber or Lyft directly.' },
    ]
  },
  {
    id: 'passenger-rights-rideshare',
    title: 'Rideshare Passenger Rights: What You\'re Entitled to After an Accident',
    excerpt: 'As a passenger in an Uber or Lyft, you have the strongest possible claim position. Here\'s exactly what you\'re entitled to — and how to protect it.',
    tags: ['Passengers', 'Rights', 'Coverage'],
    readTime: '5 min read',
    content: [
      { type: 'intro', text: 'If you were a passenger in an Uber or Lyft that was involved in an accident, you are in the strongest claim position of anyone involved. You did nothing to cause the accident, and you have access to Uber or Lyft\'s $1 million commercial policy. Here\'s what you need to know.' },
      { type: 'h2', text: 'You are covered by the $1M policy' },
      { type: 'p', text: 'From the moment your driver accepted the ride request until you were dropped off, Uber and Lyft maintain $1 million in commercial liability coverage. This applies whether your driver caused the accident or another driver did. You don\'t have to prove your driver was at fault — you just have to be in the vehicle.' },
      { type: 'h2', text: 'You cannot be assigned fault' },
      { type: 'p', text: 'As a passenger, you had no control over the vehicle. In virtually every scenario, you bear zero fault for the accident. Insurance companies cannot reduce your compensation by assigning you a percentage of fault — a tactic they frequently use with drivers.' },
      { type: 'h2', text: 'Multiple policies may apply' },
      { type: 'p', text: 'Depending on what caused the accident, you may have claims against multiple policies: the rideshare company\'s commercial policy, the at-fault driver\'s personal policy, your own uninsured/underinsured motorist coverage, and potentially the vehicle manufacturer if a defect contributed to the accident.' },
      { type: 'h2', text: 'Don\'t let Uber or Lyft\'s insurer control the process' },
      { type: 'p', text: 'After a passenger injury, Uber and Lyft\'s insurance carriers will reach out quickly. They are not looking out for your interests — they are trying to resolve your claim as cheaply as possible. Having an attorney represent you before you speak to any insurer dramatically increases your final recovery.' },
      { type: 'cta', text: 'Passenger claims are our strongest — get your free evaluation today.' },
    ]
  },
  {
    id: 'rideshare-assault-lawyer',
    title: 'Rideshare Assault Lawyer: When the Driver Is the Danger',
    excerpt: 'Sexual assault, physical attack, or harassment by a rideshare driver is a growing category of legal claims. Here\'s what victims need to know.',
    tags: ['Assault', 'Safety', 'Driver Misconduct'],
    readTime: '6 min read',
    content: [
      { type: 'intro', text: 'Rideshare assault cases — including sexual assault, physical attack, and harassment by Uber and Lyft drivers — are one of the fastest-growing categories of rideshare litigation. Both Uber and Lyft have faced mass tort lawsuits involving hundreds of assault claims. If you were assaulted by a rideshare driver, you have legal options.' },
      { type: 'h2', text: 'Uber and Lyft\'s liability for driver assault' },
      { type: 'p', text: 'Rideshare companies have fought hard to avoid liability for driver assaults, arguing drivers are independent contractors. But courts are increasingly finding liability when companies failed to conduct adequate background checks or kept drivers on the platform after prior incidents were reported.' },
      { type: 'h2', text: 'Negligent hiring claims' },
      { type: 'p', text: 'If Uber or Lyft approved a driver who had a prior criminal history involving violence or sexual misconduct — history a proper background check would have revealed — the company may be directly liable for your injuries under negligent hiring doctrine. This is the primary legal theory in assault cases.' },
      { type: 'h2', text: 'What damages are available' },
      { type: 'p', text: 'Assault victims can pursue compensation for: medical and mental health treatment costs, lost wages, pain and suffering, emotional distress, and in cases of egregious corporate negligence, punitive damages. These cases are serious and courts take them seriously.' },
      { type: 'h2', text: 'Reporting and evidence preservation' },
      { type: 'p', text: 'If you were assaulted: report to police immediately, preserve all communications with Uber or Lyft, screenshot your ride details, seek medical and psychological support, and do not accept any communication from the company\'s legal team without your own attorney present.' },
      { type: 'h2', text: 'You are not alone' },
      { type: 'p', text: 'Uber and Lyft have each faced class action lawsuits involving thousands of assault victims. An attorney experienced in rideshare assault cases will handle communications with the company\'s legal team so you don\'t have to.' },
      { type: 'cta', text: 'Speak with a rideshare assault attorney — confidential and free.' },
    ]
  },
  {
    id: 'statute-of-limitations',
    title: 'Rideshare Accident Statute of Limitations by State',
    excerpt: 'Miss the deadline and you lose your right to compensation permanently. Here are the filing deadlines for rideshare injury claims in every major state.',
    tags: ['Deadlines', 'Legal', 'State Laws'],
    readTime: '5 min read',
    content: [
      { type: 'intro', text: 'The statute of limitations is the legal deadline for filing a personal injury lawsuit. Miss it, and you permanently lose your right to compensation — regardless of how strong your case is. For rideshare accidents, the clock usually starts on the date of the accident.' },
      { type: 'h2', text: 'Statute of limitations by state' },
      { type: 'p', text: 'California: 2 years from the accident date. Texas: 2 years. Florida: 4 years (as of 2023 law change, previously 4 years — verify with an attorney). New York: 3 years. Illinois: 2 years. Georgia: 2 years. Pennsylvania: 2 years. Ohio: 2 years. Michigan: 3 years. Washington: 3 years.' },
      { type: 'h2', text: 'Government vehicle exceptions' },
      { type: 'p', text: 'If a government-owned vehicle was involved in your accident (a city bus, police vehicle, etc.), notice requirements are often much shorter — sometimes as little as 30 to 90 days. This rarely applies to rideshare cases but is worth knowing.' },
      { type: 'h2', text: 'Discovery rule' },
      { type: 'p', text: 'In some states, the statute of limitations doesn\'t start until you "discovered" the injury — meaning the clock starts when you reasonably should have known about an injury, not necessarily the accident date. This is relevant for injuries with delayed onset symptoms.' },
      { type: 'h2', text: 'Don\'t wait to find out you\'re out of time' },
      { type: 'p', text: 'Insurance companies know the statute of limitations. Their strategy in some cases is to delay negotiations until your deadline passes. Working with an attorney early ensures your rights are protected before any deadline issues arise.' },
      { type: 'cta', text: 'Don\'t miss your deadline — get a free case evaluation today.' },
    ]
  },
  {
    id: 'preserve-evidence',
    title: 'How to Preserve Evidence After an Uber or Lyft Accident',
    excerpt: 'Digital evidence from rideshare apps disappears fast. Here\'s exactly what to save, screenshot, and document before it\'s gone forever.',
    tags: ['Evidence', 'Documentation', 'Strategy'],
    readTime: '5 min read',
    content: [
      { type: 'intro', text: 'Rideshare accidents generate a unique trail of digital evidence that traditional car accident cases don\'t have. That evidence is time-sensitive — here\'s what to capture and how.' },
      { type: 'h2', text: 'Screenshot the app immediately' },
      { type: 'p', text: 'Before anything else, screenshot your Uber or Lyft app showing: driver name, photo, vehicle make/model, license plate, trip start time, route, and trip ID. This data lives in the app\'s trip history but get it on-screen while you\'re still in the moment.' },
      { type: 'h2', text: 'Request the trip data from Uber or Lyft' },
      { type: 'p', text: 'Both Uber and Lyft allow you to request your trip data. This includes GPS coordinates, driver location data, app status (which "Period" the driver was in), and timestamps. Your attorney can formally request this through discovery, but getting your own copy early establishes a baseline.' },
      { type: 'h2', text: 'Scene documentation' },
      { type: 'p', text: 'Photograph: all vehicles from multiple angles, skid marks, road conditions, traffic signals, signage, your injuries (immediately and as they develop over the following days), and the broader scene context. Video is even better — a 60-second walk-around video of the scene is worth dozens of photos.' },
      { type: 'h2', text: 'Dashcam and traffic camera footage' },
      { type: 'p', text: 'Traffic camera footage is typically overwritten within 24-72 hours. Your attorney can send preservation letters to the relevant agencies to prevent destruction of this evidence. Note any nearby businesses with exterior cameras — that footage is also typically short-lived.' },
      { type: 'h2', text: 'Medical records' },
      { type: 'p', text: 'Every medical record, bill, prescription, and treatment note is evidence. Keep all of it. Photograph your injuries at regular intervals as they heal. A visual record of your recovery timeline supports your pain and suffering claim.' },
      { type: 'cta', text: 'Have an attorney send preservation letters before evidence disappears.' },
    ]
  },
  {
    id: 'driver-negligence',
    title: 'Uber and Lyft Driver Negligence: Who Pays When a Driver Causes an Accident?',
    excerpt: 'When an Uber or Lyft driver is at fault, multiple insurance policies and parties may share responsibility. Here\'s how fault and payment work.',
    tags: ['Negligence', 'Fault', 'Driver Liability'],
    readTime: '6 min read',
    content: [
      { type: 'intro', text: 'Driver negligence — distracted driving, speeding, running red lights, impaired driving — is the cause of most rideshare accidents. When a driver is at fault, here\'s who pays and how claims are structured.' },
      { type: 'h2', text: 'The driver\'s personal policy (Period 0)' },
      { type: 'p', text: 'When the app is off, it\'s a standard car accident. The driver\'s personal auto insurance is the only coverage available. Note that many personal policies have rideshare exclusions — the driver may be underinsured if they were driving for hire without proper coverage.' },
      { type: 'h2', text: 'The rideshare commercial policy (Periods 2-3)' },
      { type: 'p', text: 'When a driver is on an active trip, Uber and Lyft\'s $1 million commercial policy is primary. The driver\'s personal insurance becomes secondary. The commercial policy is substantial, which is why rideshare accident settlements during active trips tend to be larger than standard car accident claims.' },
      { type: 'h2', text: 'Common driver negligence types in rideshare cases' },
      { type: 'p', text: 'The most common causes of driver-fault rideshare accidents: distracted driving (looking at the app for new requests while driving), GPS distraction, driver fatigue (driving excessive hours on multiple platforms), speeding to complete more trips, and impaired driving.' },
      { type: 'h2', text: 'Can the driver be personally sued?' },
      { type: 'p', text: 'Yes. You can name both the driver and Uber or Lyft (where applicable) as defendants in a lawsuit. In practice, claims are usually resolved through insurance, but naming the driver protects your legal options if coverage is disputed.' },
      { type: 'h2', text: 'Multiple-platform driving' },
      { type: 'p', text: 'Some drivers operate on Uber, Lyft, and DoorDash simultaneously. If a driver was logged into multiple apps at the time of your accident, there may be coverage disputes between multiple commercial insurers — an attorney is essential in these cases.' },
      { type: 'cta', text: 'Find out exactly who is responsible for your rideshare accident.' },
    ]
  },
  {
    id: 'free-vs-paid-legal-help',
    title: 'Do You Need a Rideshare Accident Attorney? Free vs. Paid Legal Help',
    excerpt: 'Minor fender-benders versus serious injury cases have very different legal needs. Here\'s an honest breakdown of when you need an attorney — and when you might not.',
    tags: ['Legal Advice', 'Costs', 'Decisions'],
    readTime: '5 min read',
    content: [
      { type: 'intro', text: 'Not every rideshare accident requires an attorney. But most do — especially once injuries are involved. Here\'s an honest look at when professional legal help is worth it.' },
      { type: 'h2', text: 'When you probably don\'t need an attorney' },
      { type: 'p', text: 'If no one was injured, the accident was minor, liability is completely clear, and the at-fault party\'s insurer is offering full coverage of your property damage — you can likely handle a property-only claim yourself.' },
      { type: 'h2', text: 'When you absolutely need an attorney' },
      { type: 'p', text: 'Get an attorney if: you have any injuries at all, you needed medical treatment, you missed work, you\'re being offered a settlement, the insurer is disputing liability, or you were a passenger. The stakes are too high and the legal complexity too great to handle alone.' },
      { type: 'h2', text: 'The contingency fee model' },
      { type: 'p', text: 'Almost all personal injury attorneys work on contingency — meaning you pay nothing upfront and they take a percentage (typically 33%) of your settlement only if they win. If they don\'t recover money for you, you owe nothing. This means there\'s no financial risk to getting representation.' },
      { type: 'h2', text: 'What a free case evaluation actually gives you' },
      { type: 'p', text: 'A free case evaluation lets an attorney review your specific situation and tell you honestly whether you have a viable case, what it might be worth, whether they can help you, and what next steps look like. It costs you nothing and gives you real information.' },
      { type: 'h2', text: 'The cost of going it alone' },
      { type: 'p', text: 'Studies consistently show that accident victims with attorney representation receive settlements 3-4x higher than those who negotiate alone — even after attorney fees. The insurance company\'s first offer is rarely the right offer.' },
      { type: 'cta', text: 'Free case evaluation — get real advice with no obligation.' },
    ]
  },
]

// ─── STATE PAGES DATA ─────────────────────────────────────────────────────────
const STATE_PAGES = [
  {
    id: 'uber-accident-attorney/california',
    name: 'California',
    abbr: 'CA',
    sol: '2 years',
    notes: 'California follows pure comparative fault — even if you were partially at fault, you can still recover. Uber and Lyft\'s $1M policy applies on active trips. LA and SF are among the highest-volume rideshare markets in the US.',
    cities: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'San Jose'],
  },
  {
    id: 'uber-accident-attorney/texas',
    name: 'Texas',
    abbr: 'TX',
    sol: '2 years',
    notes: 'Texas HB 1733 (2023) strengthened victims\' ability to sue Uber and Lyft directly for negligent driver hiring. Texas uses modified comparative fault — you can recover if you are less than 51% at fault.',
    cities: ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth'],
  },
  {
    id: 'uber-accident-attorney/florida',
    name: 'Florida',
    abbr: 'FL',
    sol: '4 years',
    notes: 'Florida has a longer statute of limitations than most states — 4 years for personal injury. Florida is a no-fault state for auto insurance, but rideshare cases often exceed the no-fault threshold, allowing full tort recovery.',
    cities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Fort Lauderdale'],
  },
  {
    id: 'uber-accident-attorney/new-york',
    name: 'New York',
    abbr: 'NY',
    sol: '3 years',
    notes: 'New York City is one of the highest-density rideshare markets in the world. NY is a no-fault state but serious injury claims can proceed in full tort. NYC rideshare accidents often involve multiple corporate defendants.',
    cities: ['New York City', 'Brooklyn', 'Queens', 'Buffalo', 'Albany'],
  },
]

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function LeadForm({ title, sub, compact }) {
  const [submitted, setSubmitted] = useState(false)
  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '32px 0' }}>
      <div style={{ fontSize: 36, marginBottom: 12 }}>✓</div>
      <h3 style={{ fontFamily: G.serif, fontSize: 20, marginBottom: 8 }}>Request Received</h3>
      <p style={{ color: '#666', fontSize: 14 }}>A rideshare accident attorney will review your case and be in touch within 24 hours.</p>
    </div>
  )
  return (
    <div>
      {title && <h2 style={{ fontFamily: G.serif, fontSize: compact ? 18 : 22, marginBottom: 4 }}>{title}</h2>}
      {sub && <p style={{ fontSize: 13, color: '#666', marginBottom: 18 }}>{sub}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }} className="two-col">
        <input style={inputStyle} type="text" placeholder="First name" />
        <input style={inputStyle} type="text" placeholder="Last name" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }} className="two-col">
        <input style={inputStyle} type="tel" placeholder="Phone number" />
        <input style={inputStyle} type="text" placeholder="State of accident" />
      </div>
      <select style={{ ...inputStyle, width: '100%', marginBottom: 10 }}>
        <option value="">What type of accident?</option>
        <option>I was a passenger in an Uber or Lyft</option>
        <option>Another car hit my Uber or Lyft</option>
        <option>I was hit by an Uber or Lyft driver</option>
        <option>Driver assault or misconduct</option>
        <option>Other rideshare incident</option>
      </select>
      <button onClick={() => setSubmitted(true)} style={{ width: '100%', background: G.orange, color: '#fff', border: 'none', padding: '13px 20px', borderRadius: 6, fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: G.sans }}>
        Submit for Free Case Review →
      </button>
      <p style={{ fontSize: 10, color: '#999', textAlign: 'center', marginTop: 10, lineHeight: 1.5 }}>
        By submitting you agree to be contacted by a licensed attorney. This is not legal advice and does not create an attorney-client relationship.
      </p>
    </div>
  )
}

const inputStyle = {
  padding: '10px 12px',
  border: '1px solid #ddd',
  borderRadius: 6,
  fontSize: 13,
  fontFamily: G.sans,
  width: '100%',
  outline: 'none',
  background: '#fff',
  color: '#1a1a1a',
}

function Nav({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <nav style={{ borderBottom: '1px solid #eee', position: 'sticky', top: 0, background: '#fff', zIndex: 100 }}>
      <div style={{ maxWidth: 1280, margin: '0 40px', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 58 }}>
        <div onClick={() => setPage('home')} style={{ cursor: 'pointer', fontFamily: G.serif, fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ color: G.orange }}>Rideshare</span><span>AccidentAttorney</span><span style={{ color: '#999', fontWeight: 400 }}>.org</span>
        </div>
        <div className="nav-links" style={{ display: 'flex', gap: 24, alignItems: 'center', fontSize: 13 }}>
          <span onClick={() => setPage('uber-accident-attorney')} style={{ cursor: 'pointer', color: page === 'uber-accident-attorney' ? G.orange : '#444' }}>Uber Accidents</span>
          <span onClick={() => setPage('lyft-accident-attorney')} style={{ cursor: 'pointer', color: page === 'lyft-accident-attorney' ? G.orange : '#444' }}>Lyft Accidents</span>
          <span onClick={() => setPage('rideshare-accident-settlement-calculator')} style={{ cursor: 'pointer', color: page === 'rideshare-accident-settlement-calculator' ? G.orange : '#444' }}>Calculator</span>
          <span onClick={() => setPage('guides')} style={{ cursor: 'pointer', color: page === 'guides' ? G.orange : '#444' }}>Guides</span>
          <button onClick={() => setPage('free-case-evaluation')} style={{ background: G.orange, color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 6, fontSize: 13, cursor: 'pointer', fontWeight: 500, fontFamily: G.sans }}>
            Free Case Review
          </button>
        </div>
        <div className="hide-mobile" style={{ display: 'none' }} />
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }} className="menu-btn">☰</button>
      </div>
      {menuOpen && (
        <div style={{ background: '#fff', borderTop: '1px solid #eee', padding: '12px 20px' }}>
          {['uber-accident-attorney', 'lyft-accident-attorney', 'rideshare-accident-settlement-calculator', 'guides', 'free-case-evaluation'].map(p => (
            <div key={p} onClick={() => { setPage(p); setMenuOpen(false) }} style={{ padding: '10px 0', borderBottom: '1px solid #f5f5f5', fontSize: 14, cursor: 'pointer', color: '#333', textTransform: 'capitalize' }}>
              {p.replace(/-/g, ' ').replace('uber accident attorney', 'Uber Accidents').replace('lyft accident attorney', 'Lyft Accidents').replace('rideshare accident settlement calculator', 'Settlement Calculator').replace('free case evaluation', 'Free Case Review')}
            </div>
          ))}
        </div>
      )}
    </nav>
  )
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: G.navy, color: G.textMuted, padding: '40px 20px 24px', marginTop: 60 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginBottom: 32 }} className="three-col">
          <div>
            <div style={{ fontFamily: G.serif, fontSize: 16, color: G.textLight, marginBottom: 12 }}>RideShareAccidentAttorney.org</div>
            <p style={{ fontSize: 12, lineHeight: 1.7, color: G.textDim }}>A free legal resource connecting rideshare accident victims with experienced attorneys. Not a law firm.</p>
          </div>
          <div>
            <div style={{ fontWeight: 500, fontSize: 13, color: G.textLight, marginBottom: 12 }}>Resources</div>
            {['uber-accident-attorney', 'lyft-accident-attorney', 'passenger-rights', 'rideshare-assault-lawyer', 'uber-lyft-insurance-coverage'].map(p => (
              <div key={p} onClick={() => setPage(p)} style={{ fontSize: 12, color: G.textDim, marginBottom: 7, cursor: 'pointer' }}>
                {p.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 500, fontSize: 13, color: G.textLight, marginBottom: 12 }}>By State</div>
            {STATE_PAGES.map(s => (
              <div key={s.id} onClick={() => setPage(s.id)} style={{ fontSize: 12, color: G.textDim, marginBottom: 7, cursor: 'pointer' }}>
                {s.name} Rideshare Accident Attorney
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${G.border}`, paddingTop: 20, fontSize: 11, color: G.textDim, lineHeight: 1.8, textAlign: 'center' }}>
          RideShareAccidentAttorney.org is a legal resource and attorney referral service. We are not a law firm and do not provide legal advice.<br />
          Content is for informational purposes only. No attorney-client relationship is formed by use of this site.<br />
          © {new Date().getFullYear()} RideShareAccidentAttorney.org · <span style={{ cursor: 'pointer', color: G.textMuted }} onClick={() => setPage('privacy')}>Privacy Policy</span> · <span style={{ cursor: 'pointer', color: G.textMuted }} onClick={() => setPage('terms')}>Terms of Use</span>
        </div>
      </div>
    </footer>
  )
}

function TrustBar() {
  const items = ['No fees unless you win', 'Free consultation', 'Uber & Lyft specialists', 'Available 24/7', 'Confidential review']
  return (
    <div style={{ background: '#0D1F35', padding: '10px 20px', overflowX: 'auto' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
        {items.map(item => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#94A8C0', whiteSpace: 'nowrap' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: G.green, display: 'inline-block', flexShrink: 0 }} />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionTitle({ title, sub, center }) {
  return (
    <div style={{ marginBottom: 24, textAlign: center ? 'center' : 'left' }}>
      <h2 style={{ fontFamily: G.serif, fontSize: 26, fontWeight: 700, marginBottom: 6 }}>{title}</h2>
      {sub && <p style={{ color: '#666', fontSize: 14 }}>{sub}</p>}
    </div>
  )
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: G.navy, padding: '56px 6% 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: G.orangePale, color: G.orangeLight, fontSize: 11, fontWeight: 500, padding: '4px 14px', borderRadius: 20, marginBottom: 20, letterSpacing: '0.6px', textTransform: 'uppercase' }}>
            Free legal resource — no signup required
          </div>
          <h1 className="hero-h1" style={{ fontFamily: G.serif, fontSize: 38, fontWeight: 700, color: G.textLight, lineHeight: 1.2, maxWidth: 640, marginBottom: 16 }}>
            Hurt in an Uber or Lyft?<br />
            <span style={{ color: G.orangeLight }}>You have rights.</span> Here's what to do.
          </h1>
          <p style={{ fontSize: 15, color: G.textMuted, lineHeight: 1.7, maxWidth: 520, marginBottom: 28 }}>
            Rideshare accidents involve layered insurance policies, corporate legal teams, and tight deadlines. This resource helps you understand your options — and connect with an attorney who handles these cases.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => setPage('free-case-evaluation')} style={{ background: G.orange, color: '#fff', border: 'none', padding: '13px 24px', borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: G.sans }}>
              Get a Free Case Evaluation
            </button>
            <button onClick={() => setPage('rideshare-accident-settlement-calculator')} style={{ background: 'transparent', color: G.textMuted, border: `1px solid rgba(148,168,192,0.35)`, padding: '13px 24px', borderRadius: 6, fontSize: 14, cursor: 'pointer', fontFamily: G.sans }}>
              What is my case worth?
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ background: G.navyMid, borderBottom: `1px solid ${G.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }} className="three-col">
          {[
            { num: '$1M', label: 'Uber/Lyft liability coverage on active trips' },
            { num: '2 yrs', label: 'Typical deadline to file — don\'t wait' },
            { num: '$75K+', label: 'Average rideshare accident settlement' },
          ].map(s => (
            <div key={s.num} style={{ padding: '20px 24px', textAlign: 'center', borderRight: `1px solid ${G.border}` }}>
              <div style={{ fontFamily: G.serif, fontSize: 26, fontWeight: 700, color: G.orangeLight }}>{s.num}</div>
              <div style={{ fontSize: 12, color: G.textDim, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Types */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 20px 0' }}>
        <SectionTitle title="What kind of case do you have?" sub="Rideshare accident claims differ significantly depending on your role in the accident." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }} className="four-col">
          {[
            { icon: '🚗', title: 'You were a passenger', desc: 'Uber/Lyft\'s $1M policy likely covers you. Passengers have the strongest claim position of anyone involved.', page: 'passenger-rights' },
            { icon: '🚘', title: 'Another car hit your rideshare', desc: 'Multiple policies may apply. Don\'t accept the first settlement offer before you understand all your options.', page: 'uber-lyft-insurance-coverage' },
            { icon: '🚶', title: 'You were a pedestrian', desc: 'If an Uber/Lyft driver hit you, you have a claim against their $1M commercial policy if the app was active.', page: 'uber-accident-attorney' },
            { icon: '⚠️', title: 'Driver assault or misconduct', desc: 'A growing category of claims. Uber/Lyft may be liable for negligent driver screening.', page: 'rideshare-assault-lawyer' },
          ].map(c => (
            <div key={c.title} onClick={() => setPage(c.page)} style={{ background: '#f8f8f6', borderRadius: 10, padding: 20, cursor: 'pointer', border: '1px solid #eee', transition: 'border-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = G.orange}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#eee'}>
              <div style={{ fontSize: 22, marginBottom: 10 }}>{c.icon}</div>
              <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>{c.title}</h3>
              <p style={{ fontSize: 12, color: '#666', lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Form */}
      <div style={{ background: '#f8f8f6', margin: '48px 0 0', padding: '48px 20px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', background: '#fff', borderRadius: 12, padding: '36px 32px', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
          <LeadForm
            title="Get a Free Case Evaluation"
            sub="Takes 60 seconds. No obligation. A rideshare accident attorney will review your situation within 24 hours."
          />
        </div>
      </div>

      {/* State Pages */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 20px 0' }}>
        <SectionTitle title="Find an attorney in your state" sub="Rideshare laws and deadlines vary by state. Find state-specific information below." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }} className="state-grid">
          {STATE_PAGES.map(s => (
            <div key={s.id} onClick={() => setPage(s.id)} style={{ border: '1px solid #e5e5e5', borderRadius: 10, padding: '16px 20px', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = G.orange}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#e5e5e5'}>
              <div style={{ fontFamily: G.serif, fontSize: 20, fontWeight: 700, color: G.orange, marginBottom: 4 }}>{s.abbr}</div>
              <div style={{ fontWeight: 500, fontSize: 13, marginBottom: 4 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: '#888' }}>SOL: {s.sol}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Articles Preview */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 20px' }}>
        <SectionTitle title="Free guides for accident victims" sub="Understand your rights before talking to anyone." />
        <div style={{ border: '1px solid #eee', borderRadius: 12, overflow: 'hidden' }}>
          {ARTICLES.slice(0, 5).map((a, i) => (
            <div key={a.id} onClick={() => setPage(`guides/${a.id}`)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: i < 4 ? '1px solid #f0f0f0' : 'none', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
              <div>
                <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}>{a.title}</div>
                <div style={{ fontSize: 11, color: '#888' }}>{a.tags.join(' · ')} · {a.readTime}</div>
              </div>
              <div style={{ color: '#ccc', fontSize: 18, flexShrink: 0, marginLeft: 16 }}>›</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button onClick={() => setPage('guides')} style={{ background: 'none', border: `1px solid ${G.orange}`, color: G.orange, padding: '10px 24px', borderRadius: 6, fontSize: 13, cursor: 'pointer', fontFamily: G.sans }}>
            View All Guides →
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── GUIDES PAGE ──────────────────────────────────────────────────────────────
function GuidesPage({ setPage }) {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 20px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: G.serif, fontSize: 32, marginBottom: 8 }}>Free Legal Guides for Rideshare Accident Victims</h1>
        <p style={{ color: '#666', fontSize: 15 }}>Understand your rights, insurance coverage, and options before speaking with anyone.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }} className="two-col">
        {ARTICLES.map(a => (
          <div key={a.id} onClick={() => setPage(`guides/${a.id}`)} style={{ border: '1px solid #eee', borderRadius: 12, padding: '20px 24px', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = G.orange}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#eee'}>
            <h2 style={{ fontFamily: G.serif, fontSize: 18, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>{a.title}</h2>
            <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6, marginBottom: 12 }}>{a.excerpt}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {a.tags.map(t => (
                <span key={t} style={{ fontSize: 11, background: '#f0f0ee', padding: '3px 10px', borderRadius: 20, color: '#555' }}>{t}</span>
              ))}
              <span style={{ fontSize: 11, color: '#aaa', marginLeft: 'auto' }}>{a.readTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── ARTICLE PAGE ─────────────────────────────────────────────────────────────
function ArticlePage({ articleId, setPage }) {
  const article = ARTICLES.find(a => a.id === articleId)
  if (!article) return <NotFoundPage setPage={setPage} />
  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '48px 20px' }}>
      <div style={{ marginBottom: 8 }}>
        <span onClick={() => setPage('guides')} style={{ fontSize: 13, color: G.orange, cursor: 'pointer' }}>← All Guides</span>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {article.tags.map(t => (
          <span key={t} style={{ fontSize: 11, background: '#f0f0ee', padding: '3px 10px', borderRadius: 20, color: '#555' }}>{t}</span>
        ))}
        <span style={{ fontSize: 11, color: '#aaa' }}>{article.readTime}</span>
      </div>
      <h1 style={{ fontFamily: G.serif, fontSize: 32, lineHeight: 1.25, marginBottom: 24 }}>{article.title}</h1>
      {article.content.map((block, i) => {
        if (block.type === 'intro') return <p key={i} style={{ fontSize: 16, color: '#444', lineHeight: 1.8, marginBottom: 24, borderLeft: `3px solid ${G.orange}`, paddingLeft: 16 }}>{block.text}</p>
        if (block.type === 'h2') return <h2 key={i} style={{ fontFamily: G.serif, fontSize: 22, marginTop: 32, marginBottom: 10 }}>{block.text}</h2>
        if (block.type === 'p') return <p key={i} style={{ fontSize: 15, lineHeight: 1.8, color: '#333', marginBottom: 16 }}>{block.text}</p>
        if (block.type === 'cta') return (
          <div key={i} style={{ background: '#f8f8f6', borderRadius: 10, padding: 24, marginTop: 32, textAlign: 'center', borderTop: `3px solid ${G.orange}` }}>
            <p style={{ fontFamily: G.serif, fontSize: 18, marginBottom: 14 }}>{block.text}</p>
            <button onClick={() => setPage('free-case-evaluation')} style={{ background: G.orange, color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: G.sans }}>
              Get Free Case Evaluation →
            </button>
          </div>
        )
        return null
      })}
      <div style={{ marginTop: 48, background: '#f8f8f6', borderRadius: 10, padding: 24 }}>
        <LeadForm title="Ready to talk to an attorney?" sub="Free case evaluation — no obligation." compact />
      </div>
    </div>
  )
}

// ─── SETTLEMENT CALCULATOR ────────────────────────────────────────────────────
function CalculatorPage({ setPage }) {
  const [step, setStep] = useState(1)
  const [vals, setVals] = useState({ passenger: null, injurySeverity: null, medBills: '', lostWages: '', onTrip: null })
  const set = (k, v) => setVals(prev => ({ ...prev, [k]: v }))

  const calcRange = () => {
    let base = 0
    const med = parseFloat(vals.medBills) || 0
    const wages = parseFloat(vals.lostWages) || 0
    const economic = med + wages
    const mult = vals.injurySeverity === 'minor' ? 1.5 : vals.injurySeverity === 'moderate' ? 3 : vals.injurySeverity === 'severe' ? 6 : 1
    base = economic * mult
    if (vals.passenger === 'yes') base *= 1.2
    const low = Math.round(base * 0.8 / 1000) * 1000
    const high = Math.round(base * 1.4 / 1000) * 1000
    return { low: Math.max(low, 5000), high: Math.max(high, 15000) }
  }

  const fmt = n => '$' + n.toLocaleString()

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '48px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontFamily: G.serif, fontSize: 30, marginBottom: 8 }}>Rideshare Settlement Calculator</h1>
        <p style={{ color: '#666', fontSize: 14 }}>Estimate your rideshare accident settlement value. This is a rough guide only — speak with an attorney for an accurate assessment.</p>
      </div>
      <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 14, padding: '32px 28px' }}>
        {step < 5 && (
          <div style={{ display: 'flex', marginBottom: 28, gap: 6 }}>
            {[1,2,3,4].map(s => (
              <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: s <= step ? G.orange : '#eee' }} />
            ))}
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: G.serif, fontSize: 20, marginBottom: 20 }}>Were you a passenger in the Uber or Lyft?</h2>
            {[['yes','Yes — I was a passenger'],['no','No — I was in another vehicle or a pedestrian']].map(([v,l]) => (
              <div key={v} onClick={() => { set('passenger', v); setStep(2) }} style={{ border: `1px solid ${vals.passenger === v ? G.orange : '#ddd'}`, borderRadius: 8, padding: '14px 18px', marginBottom: 10, cursor: 'pointer', fontSize: 14 }}>{l}</div>
            ))}
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: G.serif, fontSize: 20, marginBottom: 20 }}>How severe were your injuries?</h2>
            {[['minor','Minor — sprains, cuts, bruises, whiplash'],['moderate','Moderate — fractures, concussion, required hospitalization'],['severe','Severe — surgery, long-term disability, permanent injury']].map(([v,l]) => (
              <div key={v} onClick={() => { set('injurySeverity', v); setStep(3) }} style={{ border: `1px solid ${vals.injurySeverity === v ? G.orange : '#ddd'}`, borderRadius: 8, padding: '14px 18px', marginBottom: 10, cursor: 'pointer', fontSize: 14 }}>{l}</div>
            ))}
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 style={{ fontFamily: G.serif, fontSize: 20, marginBottom: 8 }}>Estimated medical bills so far</h2>
            <p style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>Include ER visits, imaging, surgery, therapy, medications.</p>
            <input style={{ ...inputStyle, fontSize: 16, padding: '12px 16px', marginBottom: 16 }} type="number" placeholder="e.g. 15000" value={vals.medBills} onChange={e => set('medBills', e.target.value)} />
            <button onClick={() => setStep(4)} style={{ width: '100%', background: G.orange, color: '#fff', border: 'none', padding: 13, borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: G.sans }}>Continue →</button>
          </div>
        )}
        {step === 4 && (
          <div>
            <h2 style={{ fontFamily: G.serif, fontSize: 20, marginBottom: 8 }}>Lost wages due to the accident</h2>
            <p style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>Enter 0 if you haven't missed work.</p>
            <input style={{ ...inputStyle, fontSize: 16, padding: '12px 16px', marginBottom: 16 }} type="number" placeholder="e.g. 5000" value={vals.lostWages} onChange={e => set('lostWages', e.target.value)} />
            <button onClick={() => setStep(5)} style={{ width: '100%', background: G.orange, color: '#fff', border: 'none', padding: 13, borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: G.sans }}>See My Estimate →</button>
          </div>
        )}
        {step === 5 && (() => {
          const { low, high } = calcRange()
          return (
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 13, color: '#888', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Estimated Settlement Range</p>
              <div style={{ fontFamily: G.serif, fontSize: 40, fontWeight: 700, color: G.orange, marginBottom: 6 }}>{fmt(low)} – {fmt(high)}</div>
              <p style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>This is a rough estimate based on typical multipliers. Actual settlements vary significantly based on liability, evidence, jurisdiction, and negotiation.</p>
              <div style={{ background: '#fff8f5', border: `1px solid ${G.orangeLight}`, borderRadius: 10, padding: 18, marginBottom: 24, textAlign: 'left' }}>
                <p style={{ fontSize: 13, lineHeight: 1.7 }}>⚠️ <strong>Important:</strong> This calculator does not account for non-economic damages like pain and suffering, long-term care costs, or punitive damages — which often add substantially to the total. An attorney can calculate your full damages correctly.</p>
              </div>
              <LeadForm title="Get an accurate evaluation from an attorney" sub="Free, no obligation — takes 60 seconds." compact />
              <button onClick={() => { setStep(1); setVals({ passenger: null, injurySeverity: null, medBills: '', lostWages: '', onTrip: null }) }} style={{ background: 'none', border: 'none', color: '#aaa', fontSize: 13, cursor: 'pointer', marginTop: 12, fontFamily: G.sans }}>
                Start over
              </button>
            </div>
          )
        })()}
      </div>
      <p style={{ fontSize: 11, color: '#aaa', textAlign: 'center', marginTop: 16, lineHeight: 1.5 }}>
        This calculator is for informational purposes only and does not constitute legal advice. Settlement values depend on many factors specific to your case.
      </p>
    </div>
  )
}

// ─── FREE CASE EVALUATION PAGE ────────────────────────────────────────────────
function CaseEvalPage() {
  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '48px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontFamily: G.serif, fontSize: 30, marginBottom: 8 }}>Free Rideshare Accident Case Evaluation</h1>
        <p style={{ color: '#666', fontSize: 14 }}>Fill out the form below. A rideshare accident attorney will review your case and respond within 24 hours. No obligation, no fees unless you win.</p>
      </div>
      <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 14, padding: '32px 28px' }}>
        <LeadForm title="" sub="" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 32 }} className="three-col">
        {[['$0', 'No upfront costs — contingency fee only'],['24h', 'Response within 24 hours'],['100%', 'Confidential and secure']].map(([n, l]) => (
          <div key={n} style={{ textAlign: 'center', padding: '16px 12px', background: '#f8f8f6', borderRadius: 10 }}>
            <div style={{ fontFamily: G.serif, fontSize: 24, fontWeight: 700, color: G.orange, marginBottom: 4 }}>{n}</div>
            <div style={{ fontSize: 12, color: '#666', lineHeight: 1.5 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── UBER / LYFT PAGES ────────────────────────────────────────────────────────
function UberPage({ setPage }) {
  return (
    <div>
      <div style={{ background: G.navy, padding: '48px 20px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h1 style={{ fontFamily: G.serif, fontSize: 34, color: G.textLight, lineHeight: 1.2, marginBottom: 14 }}>Uber Accident Attorney — Free Case Review</h1>
          <p style={{ color: G.textMuted, fontSize: 15, maxWidth: 580, lineHeight: 1.7, marginBottom: 24 }}>Uber maintains a $1 million liability policy on active trips. If you were hurt in an Uber accident — as a passenger, another driver, or pedestrian — you likely have a claim.</p>
          <button onClick={() => setPage('free-case-evaluation')} style={{ background: G.orange, color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: G.sans }}>Get Free Case Evaluation →</button>
        </div>
      </div>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <SectionTitle title="Uber insurance: how it works" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }} className="three-col">
          {[
            { label: 'App Off', coverage: 'Personal insurance only', period: 'Period 0', color: '#fee' },
            { label: 'Waiting for Ride', coverage: '$50K per person / $100K per accident', period: 'Period 1', color: '#fff8ee' },
            { label: 'Active Trip', coverage: '$1 million commercial policy', period: 'Periods 2 & 3', color: '#eefaf5' },
          ].map(c => (
            <div key={c.label} style={{ background: c.color, borderRadius: 10, padding: '18px 20px' }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: '#888', marginBottom: 4, textTransform: 'uppercase' }}>{c.period}</div>
              <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 6 }}>{c.label}</div>
              <div style={{ fontSize: 13, color: '#555' }}>{c.coverage}</div>
            </div>
          ))}
        </div>
        <SectionTitle title="Common Uber accident scenarios" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 40 }} className="two-col">
          {[
            { title: 'Uber driver caused the accident', desc: 'When your Uber driver is at fault, the commercial $1M policy is primary during active trips. This covers passengers, pedestrians, and other drivers.' },
            { title: 'Another driver hit your Uber', desc: 'You can claim against the at-fault driver\'s insurance and potentially Uber\'s underinsured motorist coverage if the other driver\'s policy is insufficient.' },
            { title: 'Distracted driving', desc: 'Uber drivers frequently check the app for new ride requests while driving. Distracted driving accidents create strong negligence claims.' },
            { title: 'Driver fatigue', desc: 'Many Uber drivers work excessive hours across multiple platforms. Fatigue-related accidents may support additional negligence claims.' },
          ].map(c => (
            <div key={c.title} style={{ border: '1px solid #eee', borderRadius: 10, padding: '18px 20px' }}>
              <h3 style={{ fontSize: 15, fontWeight: 500, marginBottom: 8 }}>{c.title}</h3>
              <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ background: '#f8f8f6', borderRadius: 12, padding: '28px 32px' }}>
          <LeadForm title="Was your Uber accident?" sub="Get a free case evaluation from an Uber accident attorney." compact />
        </div>
      </div>
    </div>
  )
}

function LyftPage({ setPage }) {
  return (
    <div>
      <div style={{ background: G.navy, padding: '48px 20px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h1 style={{ fontFamily: G.serif, fontSize: 34, color: G.textLight, lineHeight: 1.2, marginBottom: 14 }}>Lyft Accident Attorney — Free Case Review</h1>
          <p style={{ color: G.textMuted, fontSize: 15, maxWidth: 580, lineHeight: 1.7, marginBottom: 24 }}>Lyft's $1 million policy applies to active trips. Claims against Lyft involve the same insurance period structure as Uber — here's what you need to know.</p>
          <button onClick={() => setPage('free-case-evaluation')} style={{ background: G.orange, color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: G.sans }}>Get Free Case Evaluation →</button>
        </div>
      </div>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <SectionTitle title="Lyft vs Uber: key differences for accident claims" />
        <div style={{ border: '1px solid #eee', borderRadius: 12, overflow: 'hidden', marginBottom: 40 }}>
          {[
            { q: 'Is Lyft\'s coverage the same as Uber?', a: 'Nearly identical. Both maintain $1M policies during active trips (Periods 2-3), and similar Period 1 coverage when waiting for a ride.' },
            { q: 'Does it matter which app the driver was using?', a: 'It matters significantly. If the driver was logged into both Lyft and Uber simultaneously, there will be a coverage dispute between the two insurers — an attorney is essential in these cases.' },
            { q: 'Can I sue Lyft directly?', a: 'In cases of negligent driver hiring or retention, yes. Lyft has faced class action lawsuits over driver screening. State laws like Texas HB 1733 expand these options.' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '18px 24px', borderBottom: i < 2 ? '1px solid #f5f5f5' : 'none' }}>
              <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 6 }}>{item.q}</div>
              <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>{item.a}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#f8f8f6', borderRadius: 12, padding: '28px 32px' }}>
          <LeadForm title="Were you injured in a Lyft?" sub="Get a free case evaluation from a Lyft accident attorney." compact />
        </div>
      </div>
    </div>
  )
}

// ─── PASSENGER RIGHTS PAGE ────────────────────────────────────────────────────
function PassengerRightsPage({ setPage }) {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 20px' }}>
      <h1 style={{ fontFamily: G.serif, fontSize: 32, marginBottom: 10, lineHeight: 1.2 }}>Rideshare Passenger Rights After an Accident</h1>
      <p style={{ color: '#666', fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>As a passenger in an Uber or Lyft, you have the strongest claim position of anyone involved in a rideshare accident. Here's what you're entitled to and how to protect your rights.</p>
      {[
        { title: 'You are covered by the $1M policy', body: 'From the moment the driver accepted your ride request until you were dropped off, Uber and Lyft\'s $1M commercial liability policy is active. You don\'t have to prove your driver was at fault to access this coverage.' },
        { title: 'You cannot be assigned fault', body: 'As a passenger, you had no control over the vehicle. Insurance companies cannot reduce your compensation by claiming you were partially at fault — a tactic they frequently use with drivers.' },
        { title: 'Multiple insurance policies may apply', body: 'Depending on what caused the accident, you may have claims against multiple policies: the rideshare company\'s commercial policy, an at-fault driver\'s personal policy, and UM/UIM coverage if an uninsured driver was involved.' },
        { title: 'Do not accept the first offer', body: 'Passenger injury claims are closed quickly and cheaply when victims don\'t have representation. The first settlement offer rarely reflects the full value of a passenger injury claim.' },
      ].map(s => (
        <div key={s.title} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid #f0f0f0' }}>
          <h2 style={{ fontFamily: G.serif, fontSize: 20, marginBottom: 8 }}>{s.title}</h2>
          <p style={{ fontSize: 14, color: '#444', lineHeight: 1.8 }}>{s.body}</p>
        </div>
      ))}
      <div style={{ background: '#f8f8f6', borderRadius: 12, padding: '28px 32px', marginTop: 16 }}>
        <LeadForm title="You have the strongest case — use it." sub="Free evaluation from a rideshare passenger injury attorney." compact />
      </div>
    </div>
  )
}

// ─── RIDESHARE ASSAULT PAGE ───────────────────────────────────────────────────
function AssaultPage({ setPage }) {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 20px' }}>
      <h1 style={{ fontFamily: G.serif, fontSize: 32, marginBottom: 10, lineHeight: 1.2 }}>Rideshare Assault Lawyer: Driver Misconduct Claims</h1>
      <p style={{ color: '#666', fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>Sexual assault, physical attack, and harassment by rideshare drivers is a serious and growing category of legal claims. If you were assaulted by an Uber or Lyft driver, you have legal options — and the company may be directly liable.</p>
      {[
        { title: 'Uber and Lyft may be directly liable', body: 'Courts are increasingly holding rideshare companies liable for driver assaults when they failed to conduct adequate background checks or kept dangerous drivers on the platform after prior complaints. This is called negligent hiring and retention.' },
        { title: 'What you should do now', body: 'Report to police immediately. Preserve all communications with Uber or Lyft. Screenshot your trip details. Seek medical and psychological support. Do not accept any settlement offer or communicate with the company\'s legal team without your own attorney.' },
        { title: 'Damages available in assault cases', body: 'Assault victims can pursue compensation for medical and mental health treatment, lost wages, pain and suffering, emotional distress, and in cases of gross corporate negligence, punitive damages.' },
      ].map(s => (
        <div key={s.title} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid #f0f0f0' }}>
          <h2 style={{ fontFamily: G.serif, fontSize: 20, marginBottom: 8 }}>{s.title}</h2>
          <p style={{ fontSize: 14, color: '#444', lineHeight: 1.8 }}>{s.body}</p>
        </div>
      ))}
      <div style={{ background: '#f8f8f6', borderRadius: 12, padding: '28px 32px', marginTop: 16 }}>
        <LeadForm title="Confidential case evaluation" sub="Your consultation is private and confidential. No obligation." compact />
      </div>
    </div>
  )
}

// ─── INSURANCE COVERAGE PAGE ──────────────────────────────────────────────────
function InsurancePage({ setPage }) {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 20px' }}>
      <h1 style={{ fontFamily: G.serif, fontSize: 32, marginBottom: 10, lineHeight: 1.2 }}>Uber & Lyft Insurance Coverage Explained</h1>
      <p style={{ color: '#666', fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>Rideshare insurance is confusing by design. This page explains exactly which policy applies depending on what the driver was doing at the time of your accident.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 40 }} className="three-col">
        {[
          { period: 'Period 0', status: 'App off', coverage: 'Personal auto insurance only', note: 'Rideshare company has zero liability', bg: '#fff5f5' },
          { period: 'Period 1', status: 'App on, no ride', coverage: '$50K per person / $100K per accident', note: 'Limited commercial coverage kicks in', bg: '#fffbf0' },
          { period: 'Periods 2 & 3', status: 'Active trip', coverage: '$1,000,000 commercial liability', note: 'Strongest coverage — covers all parties', bg: '#f0fbf6' },
        ].map(p => (
          <div key={p.period} style={{ background: p.bg, borderRadius: 10, padding: '20px 18px' }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: '#888', textTransform: 'uppercase', marginBottom: 4 }}>{p.period}</div>
            <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 8 }}>{p.status}</div>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: G.serif, color: G.orange, marginBottom: 6 }}>{p.coverage}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{p.note}</div>
          </div>
        ))}
      </div>
      <div style={{ background: '#f8f8f6', borderRadius: 12, padding: '28px 32px' }}>
        <LeadForm title="Not sure which policy applies to you?" sub="An attorney can review your case and identify all available coverage." compact />
      </div>
    </div>
  )
}

// ─── STATE PAGE ───────────────────────────────────────────────────────────────
function StatePage({ stateId, setPage }) {
  const state = STATE_PAGES.find(s => s.id === stateId)
  if (!state) return <NotFoundPage setPage={setPage} />
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 20px' }}>
      <h1 style={{ fontFamily: G.serif, fontSize: 32, marginBottom: 10 }}>{state.name} Rideshare Accident Attorney</h1>
      <p style={{ color: '#666', fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>{state.notes}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 32 }} className="two-col">
        <div style={{ background: '#f8f8f6', borderRadius: 10, padding: '18px 20px' }}>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>Statute of Limitations</div>
          <div style={{ fontFamily: G.serif, fontSize: 24, fontWeight: 700, color: G.orange }}>{state.sol}</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>from the date of your accident</div>
        </div>
        <div style={{ background: '#f8f8f6', borderRadius: 10, padding: '18px 20px' }}>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>Major cities we serve</div>
          {state.cities.map(c => (
            <div key={c} style={{ fontSize: 13, color: '#444', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: G.orange, display: 'inline-block' }} />{c}
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: '#f8f8f6', borderRadius: 12, padding: '28px 32px' }}>
        <LeadForm title={`Get a Free Case Evaluation in ${state.name}`} sub="A local rideshare accident attorney will review your situation within 24 hours." compact />
      </div>
    </div>
  )
}

// ─── NOT FOUND ────────────────────────────────────────────────────────────────
function NotFoundPage({ setPage }) {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1 style={{ fontFamily: G.serif, fontSize: 32, marginBottom: 12 }}>Page Not Found</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>The page you're looking for doesn't exist.</p>
      <button onClick={() => setPage('home')} style={{ background: G.orange, color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 6, fontSize: 14, cursor: 'pointer', fontFamily: G.sans }}>← Back to Home</button>
    </div>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState(() => urlToPage(window.location.pathname))

  useEffect(() => {
    const handlePop = () => setPage(urlToPage(window.location.pathname))
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  const navigate = (newPage) => {
    window.history.pushState({}, '', pageToUrl(newPage))
    setPage(newPage)
    window.scrollTo(0, 0)
  }

  // Update page title on navigation
  useEffect(() => {
    const titles = {
      home: 'Rideshare Accident Attorney | Free Case Evaluation',
      guides: 'Free Guides for Rideshare Accident Victims | RideShareAccidentAttorney.org',
      'uber-accident-attorney': 'Uber Accident Attorney | Free Case Review',
      'lyft-accident-attorney': 'Lyft Accident Attorney | Free Case Review',
      'rideshare-accident-settlement-calculator': 'Rideshare Settlement Calculator | Estimate Your Claim Value',
      'free-case-evaluation': 'Free Rideshare Accident Case Evaluation',
      'passenger-rights': 'Rideshare Passenger Rights | What You\'re Entitled To',
      'rideshare-assault-lawyer': 'Rideshare Assault Lawyer | Driver Misconduct Claims',
      'uber-lyft-insurance-coverage': 'Uber & Lyft Insurance Coverage Explained',
    }
    if (page.startsWith('guides/')) {
      const article = ARTICLES.find(a => a.id === page.replace('guides/', ''))
      document.title = article ? `${article.title} | RideShareAccidentAttorney.org` : 'Guide | RideShareAccidentAttorney.org'
    } else {
      document.title = titles[page] || 'RideShareAccidentAttorney.org'
    }
  }, [page])

  const renderPage = () => {
    if (page === 'home') return <HomePage setPage={navigate} />
    if (page === 'guides') return <GuidesPage setPage={navigate} />
    if (page.startsWith('guides/')) return <ArticlePage articleId={page.replace('guides/', '')} setPage={navigate} />
    if (page === 'rideshare-accident-settlement-calculator') return <CalculatorPage setPage={navigate} />
    if (page === 'free-case-evaluation') return <CaseEvalPage />
    if (page === 'uber-accident-attorney') return <UberPage setPage={navigate} />
    if (page === 'lyft-accident-attorney') return <LyftPage setPage={navigate} />
    if (page === 'passenger-rights') return <PassengerRightsPage setPage={navigate} />
    if (page === 'rideshare-assault-lawyer') return <AssaultPage setPage={navigate} />
    if (page === 'uber-lyft-insurance-coverage') return <InsurancePage setPage={navigate} />
    if (STATE_PAGES.find(s => s.id === page)) return <StatePage stateId={page} setPage={navigate} />
    return <NotFoundPage setPage={navigate} />
  }

  return (
    <>
      <style>{globalCSS}</style>
      <Nav page={page} setPage={navigate} />
      <TrustBar />
      <main>{renderPage()}</main>
      <Footer setPage={navigate} />
    </>
  )
}
