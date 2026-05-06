import EventContent from "./EventContent";

const events = [
  {
    slug: "national-muster-2025",
    title: "Annual National Muster",
    type: "Muster",
    startDate: "2025-07-18",
    endDate: "2025-07-20",
    location: "Camp Covenant, Blue Ridge, GA",
    chapter: "National",
    featured: true,
    spots: 40,
    spotsTotal: 350,
    description:
      "The flagship annual gathering of the OCS brotherhood. Three days of training, worship, fellowship, and the rank promotion ceremony.",
    body: [
      {
        type: "paragraph",
        text: "The Annual National Muster is the most significant event in the OCS calendar. It is where the brotherhood gathers as one — from every chapter, every rank, every background — united under a single mission and a single commanding officer.",
      },
      {
        type: "quote",
        text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
        reference: "Joshua 1:9",
      },
      { type: "heading", text: "Programme Overview" },
      {
        type: "paragraph",
        text: "Friday evening begins with a formal assembly and opening address from the Commander. Saturday is the most intensive day: PT at 0600, followed by Scripture study in platoon groups, leadership seminars, a community lunch open to local guests, and the evening panel discussion with senior staff. Sunday morning is given to worship, reflection, and the formal rank promotion ceremony — the highlight of the Muster.",
      },
      { type: "heading", text: "Accommodation" },
      {
        type: "paragraph",
        text: "Camp Covenant offers full bunkhouse accommodation for all registered members. A limited number of family accommodation units are available for members bringing spouses and children. All meals are provided from Friday dinner through Sunday lunch.",
      },
      { type: "heading", text: "Registration" },
      {
        type: "paragraph",
        text: "All active members in good standing are eligible to register. Contact your regional chapter Captain or reach out via the Contact page. Early registration closes April 30th. Scholarships for members with financial need are available through the Commander's discretionary fund.",
      },
    ],
    schedule: [
      {
        day: "Friday 18 July",
        items: [
          "18:00 — Arrival & registration",
          "19:30 — Opening assembly & Commander's address",
          "21:00 — Evening fellowship",
        ],
      },
      {
        day: "Saturday 19 July",
        items: [
          "06:00 — Morning PT",
          "07:30 — Breakfast",
          "09:00 — Scripture study (platoon groups)",
          "11:00 — Leadership seminars",
          "13:00 — Lunch",
          "15:00 — Workshops & training rotations",
          "18:00 — Dinner",
          "20:00 — Senior staff panel discussion",
        ],
      },
      {
        day: "Sunday 20 July",
        items: [
          "08:00 — Morning worship",
          "10:00 — Reflection & testimony",
          "12:00 — Rank promotion ceremony",
          "14:00 — Lunch & closing assembly",
          "15:30 — Departure",
        ],
      },
    ],
    related: ["spring-rank-ceremony", "q2-leadership-training"],
  },
  {
    slug: "spring-rank-ceremony",
    title: "Spring Rank Promotion Ceremony",
    type: "Ceremony",
    startDate: "2025-04-05",
    endDate: "2025-04-05",
    location: "OCS National HQ, Atlanta, GA",
    chapter: "National",
    featured: false,
    spots: null,
    spotsTotal: null,
    description:
      "Formal promotion ceremony for Q1 evaluation board graduates. Open to all members and immediate family.",
    body: [
      {
        type: "paragraph",
        text: "The Spring Rank Promotion Ceremony marks the formal elevation of members who passed their Q1 evaluation boards. This is a solemn and celebratory occasion — family members and the full chapter community are welcome to attend.",
      },
      {
        type: "paragraph",
        text: "Promotions will be awarded across all eligible tiers. The Chaplain General will lead an opening prayer, followed by individual commendations from commanding officers and the formal presentation of insignia.",
      },
    ],
    schedule: [
      {
        day: "Saturday 5 April",
        items: [
          "14:00 — Doors open",
          "15:00 — Opening prayer & address",
          "15:30 — Promotion presentations",
          "16:30 — Reception & fellowship",
        ],
      },
    ],
    related: ["national-muster-2025", "q2-leadership-training"],
  },
];

export async function generateStaticParams() {
  const slugs = [
    "national-muster-2025",
    "q2-leadership-training",
    "easter-outreach-2025",
    "spring-rank-ceremony",
    "brotherhood-night-march",
    "recruit-orientation-q2",
    "lagos-chapter-launch",
    "physical-fitness-assessment",
  ];
  return slugs.map((slug) => ({ slug }));
}

export default async function EventDetail({ params }) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!events) {
    return (
      <div className="min-h-screen bg[#0a0f1e] flex items-center justify-center">
        <p className="text-white/40 font-['Cormorant_Garamond'] text-2xl italic">
          Event not found
        </p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg[#0a0f1e] flex items-center justify-center">
        <p className="text-white/40 font-['Cormorant_Garamond'] text-2xl italic">
          Event not found
        </p>
      </div>
    );
  }

  const relatedEvents =
    events.filter((e) => event.related?.includes(e.slug)) ?? [];

  return <EventContent event={event} relatedEvents={relatedEvents} />;
}

// export async function getStaticProps({ params }) {
// TODO: replace with Supabase fetch
// const { data } = await supabase.from('events').select('*').eq('slug', params.slug).single()
// return { props: {} };
// }
