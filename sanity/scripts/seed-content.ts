import { getCliClient } from 'sanity/cli'

// --- 1. DATA PACK (FULL ARTICLES) ---
const POSTS = [
  {
    title: "The Death of the Smartphone: Ambient Computing is Here",
    slug: "death-of-smartphone",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&fm=jpg&fit=crop", 
    excerpt: "Screens are disappearing. From AI pins to AR glasses, we analyze the shift away from the rectangular slab.",
    catSlug: "future-tech",
    seo: {
      metaTitle: "Ambient Computing: Why Smartphones are Dying",
      metaDescription: "An in-depth look at the post-smartphone era and privacy nightmares."
    },
    // FULL CONTENT (Use '###' for Headings)
    content: [
      "Look around you right now. Everyone is hunched over a black rectangle. It’s depressing. But if you talk to anyone in Silicon Valley deep R&D, they’ll tell you the same thing: The rectangle is dying.",
      "### The Invisible Shift",
      "It started with the Apple Vision Pro. Yes, it was heavy. Yes, it looked goofy. But it proved that screens don't need to be held in your hand. Now, we are in the 'messy middle' of a revolution.",
      "Ambient Computing isn't about strapping a computer to your face. It's about the computer disappearing entirely. It’s the voice in your ear translating French instantly. It’s the glasses that highlight the path to your Uber.",
      "### Why 2026?",
      "Three things are converging to make this possible: Micro-OLEDs are getting smaller, On-Device AI is getting smarter, and battery density is finally catching up.",
      "By 2026, pulling a phone out of your pocket will feel as outdated as unfolding a paper map. The question isn't if it will happen. The question is: Are we ready to be watched by everyone's glasses?"
    ]
  },
  {
    title: "The 'Creator Middle Class' is Shrinking",
    slug: "creator-middle-class",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&fm=jpg&fit=crop", 
    excerpt: "New algorithms favor the ultra-famous or the micro-niche. How mid-sized creators are pivoting.",
    catSlug: "digital-culture",
    seo: {
      metaTitle: "Creator Economy 2026: The Middle Class Crisis",
      metaDescription: "Data from 10,000 accounts shows the algorithm is killing mid-sized creators."
    },
    content: [
      "I spoke to a YouTuber yesterday who has 500,000 subscribers. He’s broke. Three years ago, he was making $15,000 a month from AdSense. Today? He’s lucky to hit $3,000. He isn't alone.",
      "### The Barbell Effect",
      "We analyzed data from 10,000 creator accounts, and the results are terrifying. The distribution of views has become a barbell. On one end, you have the Superstars like MrBeast capturing 80% of the attention. On the other end, you have the Micro-Niche creators with loyal, paying audiences.",
      "The 'Middle Class' of creators—those posting generic lifestyle vlogs or tech reviews—is being wiped out.",
      "### The Pivot",
      "If you rely on TikTok for your rent, you don't have a business. You have a gambling addiction. The smart creators are moving to owned platforms like newsletters (Substack) and private communities. They are firing the algorithm before it fires them."
    ]
  },
  {
    title: "7 Passive Income Streams That Actually Work",
    slug: "passive-income-2026",
    imageUrl: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?q=80&w=2070&fm=jpg&fit=crop", 
    excerpt: "No surveys. No crypto scams. Real assets that generate cash flow while you sleep.",
    catSlug: "money-moves",
    seo: {
      metaTitle: "Real Passive Income Streams for 2026",
      metaDescription: "Forget dropshipping. These are the 7 asset classes generating real cash flow."
    },
    content: [
      "Let's be honest: 'Passive Income' is mostly a lie sold by guys with rented Lamborghinis. But income decoupled from time? That is real. Here are the streams I trust.",
      "### 1. Digital Templates",
      "Don't sell a course. Nobody has time to watch 10 hours of video. Sell the tool. Notion templates, Excel budget trackers, Lightroom presets. Build it once, sell it forever.",
      "### 2. High-Yield REITs",
      "Real Estate Investment Trusts. It’s like being a landlord without the 3 AM phone calls about a leaking toilet. You get the dividends without the headaches.",
      "### 3. The 'Boring' Newsletter",
      "Find a niche so boring nobody else wants it. 'HVAC Repair News.' 'Commercial Plumbing Trends.' Charge $10/month. If you save a business owner one hour, they will pay you forever."
    ]
  },
  {
    title: "Why I Returned My CyberTruck After 3 Days",
    slug: "returned-cybertruck",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&fm=jpg&fit=crop", 
    excerpt: "It turns heads, but it doesn't fit in my garage. A brutally honest review.",
    catSlug: "future-tech",
    seo: {
      metaTitle: "CyberTruck Owner Review: Why I Returned It",
      metaDescription: "The engineering is incredible. The lifestyle is impossible."
    },
    content: [
      "It arrived on a Tuesday. By Friday, I was calling for a pickup. The CyberTruck is an engineering marvel, but a lifestyle disaster.",
      "### The Parking Anxiety",
      "I went to Trader Joe's. That was my first mistake. The turning radius is actually good, but the width? It barely fits in a standard American lane. I spent 10 minutes trying to park it, while people filmed me on TikTok.",
      "### The Verdict",
      "If you live on a ranch in Texas, get one. It's invincible. But if you live in a suburb with a standard 1970s garage, do yourself a favor: Measure first. I didn't, and now I'm back in my Model Y."
    ]
  },
  {
    title: "The End of the 'Clean Girl' Aesthetic",
    slug: "end-of-clean-girl",
    imageUrl: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1974&fm=jpg&fit=crop", 
    excerpt: "Maximalism is back. Why Gen Z is ditching beige interiors for chaotic clutter.",
    catSlug: "digital-culture",
    seo: {
      metaTitle: "Maximalism Rising: The End of Beige",
      metaDescription: "Trend analysis: Why culture is shifting from sterile minimalism to chaotic self-expression."
    },
    content: [
      "Look at your Instagram feed. The beige walls are gone. In their place? Chaos. Clutter. Personality. The 'Clean Girl' aesthetic is officially dead.",
      "### Why the Shift?",
      "People are tired of living in a showroom. The pandemic made us stare at our blank walls for two years. Now, Gen Z is embracing 'Cluttercore'.",
      "It's about showing who you actually are. It's about displaying your weird mug collection, your piles of books, and your mismatched furniture. Minimalism said 'less is more'. Maximalism says 'more is fun'."
    ]
  }
]

const client = getCliClient()

// ✅ HELPER: Generates a random string for Sanity keys
const generateKey = () => Math.random().toString(36).substring(2, 9)

async function uploadImage(url: string) {
  console.log(`Downloading image: ${url}...`)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`)
  
  const buffer = await res.arrayBuffer()
  const asset = await client.assets.upload('image', Buffer.from(buffer), {
    filename: url.split('/').pop(),
    contentType: 'image/jpeg' 
  })
  return asset._id
}

// ✅ HELPER: Converts text array to Sanity Blocks
function createBodyBlocks(lines: string[]) {
  return lines.map(line => {
    const isHeading = line.startsWith('### ')
    const text = isHeading ? line.replace('### ', '') : line
    
    return {
      _key: generateKey(),
      _type: 'block',
      style: isHeading ? 'h3' : 'normal',
      children: [{ 
        _key: generateKey(), 
        _type: 'span', 
        text: text 
      }]
    }
  })
}

async function cleanSlate() {
  console.log('🧹 Cleaning Slate...')
  await client.delete({query: '*[_type in ["post", "category"]]'})
  console.log('✨ Old data cleared.')
}

async function seed() {
  await cleanSlate()
  
  console.log('🌱 Starting Long-Form Seed...')

  // 1. Categories
  const categories = [
    { title: 'Future Tech', slug: 'future-tech' },
    { title: 'Digital Culture', slug: 'digital-culture' },
    { title: 'Money Moves', slug: 'money-moves' }
  ]

  for (const cat of categories) {
    await client.createOrReplace({
      _type: 'category',
      _id: `cat-${cat.slug}`, 
      title: cat.title,
      slug: { _type: 'slug', current: cat.slug }
    })
  }

  // 2. Posts
  for (const post of POSTS) {
    const imageId = await uploadImage(post.imageUrl)
    
    await client.createOrReplace({
      _id: `post-${post.slug}`,
      _type: 'post',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      excerpt: post.excerpt,
      publishedAt: new Date().toISOString(),
      mainImage: {
        _type: 'image',
        asset: { _ref: imageId }
      },
      seo: {
        metaTitle: post.seo.metaTitle,
        metaDescription: post.seo.metaDescription,
        openGraphImage: { 
          _type: 'image',
          asset: { _ref: imageId } 
        }
      },
      categories: [
        { 
          _key: generateKey(), 
          _type: 'reference', 
          _ref: `cat-${post.catSlug}` 
        }
      ],
      // ✅ FIX: Use the helper to generate full body blocks
      body: createBodyBlocks(post.content)
    })
    console.log(`✅ Synced Post: ${post.title}`)
  }

  console.log('🎉 Seeding Complete! Full articles uploaded.')
}

seed().catch(console.error)