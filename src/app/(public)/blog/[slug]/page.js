import BlogPostContent from "./BlogPostContent";

// import Link from "next/link";
// import { useRouter } from "next/navigation";

// Placeholder data — replace with Supabase fetch in getStaticProps / getServerSideProps
const posts = [
  {
    slug: "annual-muster-2025",
    tag: "Announcement",
    date: "March 15, 2025",
    title: "Annual National Muster — Registration Now Open",
    author: "Col. James Whitfield",
    authorRole: "Commander, OCS",
    readTime: "3 min read",
    excerpt:
      "Join hundreds of brothers from across the country for three days of training, fellowship, and worship.",
    content: [
      {
        type: "paragraph",
        text: "Brothers, it is with great joy that we announce the opening of registration for the 2025 Annual National Muster. This year, we return to Camp Covenant in Georgia — a place that has become sacred ground for our brotherhood.",
      },
      {
        type: "quote",
        text: "For where two or three gather in my name, there am I with them.",
        reference: "Matthew 18:20",
      },
      {
        type: "paragraph",
        text: "The Muster is the heartbeat of OCS. It is where Recruits become brothers, where Privates see what Colonels are made of, and where all of us are reminded that we do not fight alone. Last year's Muster drew 280 members from five regions. This year, we expect to exceed 350.",
      },
      {
        type: "heading",
        text: "What to Expect",
      },
      {
        type: "paragraph",
        text: "Three days of structured programming including morning PT, Scripture-centred worship sessions, leadership workshops led by senior staff, and the annual rank promotion ceremony on the final evening. Evenings are reserved for unstructured fellowship — the conversations around the fire that change lives.",
      },
      {
        type: "heading",
        text: "Dates & Location",
      },
      {
        type: "paragraph",
        text: "The Muster runs from Friday 18th July to Sunday 20th July 2025. Camp Covenant is located in Blue Ridge, Georgia. Transport from the nearest airport can be arranged through your regional chapter coordinator.",
      },
      {
        type: "heading",
        text: "How to Register",
      },
      {
        type: "paragraph",
        text: "Registration is open to all active members in good standing. Contact your chapter Captain or reach out directly through the Contact page. Early registration closes April 30th — after which a late fee applies. Scholarships are available for members with financial need; speak to your commanding officer.",
      },
      {
        type: "paragraph",
        text: "Do not miss this. See you on the field, brothers.",
      },
    ],
    related: ["february-rank-ceremony", "new-chapter-announcement"],
  },
  {
    slug: "february-rank-ceremony",
    tag: "Ranks",
    date: "February 28, 2025",
    title: "New Promotions — February Rank Ceremony",
    author: "Maj. Samuel Okafor",
    authorRole: "Deputy Commander, OCS",
    readTime: "4 min read",
    excerpt:
      "Fifteen members were elevated in rank following their rigorous evaluation boards.",
    content: [
      {
        type: "paragraph",
        text: "On Saturday 22nd February, fifteen members of OCS were formally elevated in rank at the quarterly promotion ceremony held at our national headquarters. It was a solemn and joyful occasion, as these brothers stood before their commanding officers and before God to receive the insignia they had earned.",
      },
      {
        type: "quote",
        text: "Well done, good and faithful servant.",
        reference: "Matthew 25:23",
      },
      {
        type: "paragraph",
        text: "Promotions were awarded across multiple tiers — from four new Privates completing their probationary period, to the historic elevation of two members to the rank of Captain. Each was reviewed through our standard evaluation process: time in rank, character assessment, peer and officer review, and where required, a formal evaluation board.",
      },
      {
        type: "heading",
        text: "Promoted Members",
      },
      {
        type: "paragraph",
        text: "A full list of promoted members has been distributed to regional chapter coordinators. We do not publish names publicly without consent, but brothers who were promoted are encouraged to share the news within their communities.",
      },
      {
        type: "heading",
        text: "A Word from the Commander",
      },
      {
        type: "paragraph",
        text: "Col. Whitfield addressed the assembled members with characteristic directness: rank is not a reward for time served — it is a weight of responsibility added to those who have proven they can bear it. To those promoted, the expectation rises with the insignia.",
      },
    ],
    related: ["annual-muster-2025", "armor-of-god-series"],
  },
];

export async function generateStaticParams() {
  const slugs = [
    "annual-muster-2025",
    "february-rank-ceremony",
    "shelter-outreach-january",
    "armor-of-god-series",
    "leadership-training-q1",
    "christmas-service-recap",
    "new-chapter-announcement",
    "physical-fitness-standards",
  ];
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post)
    return (
      <div className="min-h-screen bg[#0a0f1e] flex items-center justify-center">
        <p className="text-white/40 font-['Cormorant_Garamond'] text-2xl italic">
          Blog not found
        </p>
      </div>
    );

  const relatedPosts = posts.filter((p) => post.related?.includes(p.slug));
  return <BlogPostContent post={post} relatedPosts={relatedPosts} />;
}

// export async function getStaticProps({ params }) {
// TODO: replace with Supabase fetch
// const { data } = await supabase.from('posts').select('*').eq('slug', params.slug).single()
// return { props: {} };
// }
