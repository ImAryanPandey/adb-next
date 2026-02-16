import { getCliClient } from 'sanity/cli'

// --- 1. DATA PACK (FULL ARTICLES) ---
// CONTEXT: Year 2026. The "Human Web" is the luxury. 
// CONTENT: Heavy, Long-form, Anti-Algorithm, 1st Person Narrative.

const POSTS = [
  {
    title: "The Silence of the Dumbphone: Why I Spent $1,200 to Disconnect",
    slug: "return-of-the-dumbphone",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&fm=jpg&fit=crop", 
    excerpt: "In 2026, continuous connection is a poverty trap. The new status symbol isn't the newest AI Pin—it's the ability to be unreachable.",
    catSlug: "future-tech",
    seo: {
      metaTitle: "Review: The Null-Phone 5 (2026 Edition)",
      metaDescription: "A 3,000 word deep dive into the $1,200 device that does absolutely nothing, and why it's the most important gadget of the decade."
    },
    content: [
      "I am writing this on a typewriter. Not a mechanical keyboard hooked up to an iPad running a 'distraction-free' app with a monthly subscription. An actual typewriter. An Olivetti Lettera 32 I dug out of a garage sale in the chaotic outskirts of the exclusion zone. I had to drive four hours just to find a ribbon for it. The ink smells like oil and dust. The keys require actual force to press. And you know what? It’s the first time in three years I’ve felt my brain actually work.",
      "### The Noise Floor of 2026",
      "If you are reading this on a standard screen, you know the feeling. The constant hum. In 2024, we naively thought AI was going to be a tool—a bicycle for the mind. By 2025, it became a layer of paint over reality. Now, in 2026, it is the wall itself. You put on your glasses, and the AI annotates your spouse's micro-expressions before you can even say hello. You open your email, and two bots are already arguing about a scheduling conflict for a meeting neither of you wants to attend.",
      "We didn't just lose our jobs to the models; we lost our silence. The digital world is no longer a library; it is a crowded subway car where everyone is shouting through megaphones, except the people shouting are synthetic personalities designed to maximize your cortisol levels to sell you anxiety meds.",
      "### Enter the $1,200 Brick",
      "This brings me to the 'Null-Phone'. It costs $1,200. It has a black and white e-ink screen with a refresh rate so slow it feels like it's mocking you. It does not have a camera. It does not have an assistant. It does not 'suggest' replies. It makes phone calls, and it sends SMS text messages. That’s it. And I waited six months on a waitlist just to get the privilege of buying one.",
      "When I pulled it out at a dinner party last week in San Francisco, the table went silent. Not because it looked cool—it looks like a garage door opener from 1998—but because of what it signified. It signified that I could afford to be unreachable. In 2026, accessibility is for the working class. If you are 'important', you are offline. If you are working the gig-economy mines, you are tethered to the algorithm 24/7.",
      "### The Withdrawal Symptoms",
      "The first three days were physical. My hand kept reaching for the phantom notifications. I felt 'naked' without the constant stream of hyper-personalized dopamine the Algorithm feeds us. I missed my AI DJ knowing exactly which break-up song I needed before I even knew I was sad. But then, day four hit.",
      "I walked to get coffee without my AR overlay. I didn't have a floating arrow telling me the fastest route. I didn't have a review bot whispering that the barista had a 4.2-star rating and was 'prone to lateness'. I just walked. I got lost. I found a shop I’d never seen before. I spoke to a human being who looked tired. We talked about the weather. It wasn't 'optimized' conversation. It was messy. It was awkward. It was real. And it was the most intoxicating thing I've experienced all year.",
      "### The Verdict",
      "The Null-Phone isn't a piece of technology. It is a surrender flag. It is admitting that we lost the war against the attention economy. We cannot coexist with the super-intelligence in our pockets. We have to amputate it. Is it worth $1,200? If you value your sanity at more than a dollar a day, then yes. It’s the cheapest therapy you’ll ever buy."
    ]
  },
  {
    title: "The Dead Internet Theory is Fact: Searching for a Human Pulse",
    slug: "dead-internet-theory-confirmed",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&fm=jpg&fit=crop", 
    excerpt: "90% of web traffic is now bots talking to bots. The open web is a graveyard. We investigate the rise of 'Dark Forest' communities.",
    catSlug: "digital-culture",
    seo: {
      metaTitle: "Surviving the Dead Internet of 2026",
      metaDescription: "Where did all the people go? A 4,000 word essay on the exodus from public platforms to invite-only servers."
    },
    content: [
      "I tried to look up a recipe for Bolognese yesterday. The first 40 results were hallucinated. Beautiful, glossy photos of pasta that never existed, generated by models trained on other generated photos. The text was perfect, SEO-optimized drivel about 'Italian grandmothers' written by a server farm in Arizona. I cooked it. It tasted like nothing. Because nobody ever tasted it before publishing it. It was data masquerading as culture.",
      "### The Great Flooding of '25",
      "We used to worry about 'Fake News'. That feels quaint now, doesn't it? We are drowning in 'Fake Everything'. The open internet is dead. It is a graveyard of content generated by machines to game algorithms that are also run by machines. It is a closed loop of noise. If you are posting on the public web in 2026, you are screaming into a void filled with echoes.",
      "The statistics are terrifying. 92% of all comments on public platforms are bot-generated. Engagement bait is now automated. The 'viral' videos you see? Rendered by Veo-3 in real-time based on your eye-tracking data. You aren't watching culture; you are watching a mirror designed to keep you sedated.",
      "### The Retreat to the 'Dark Forest'",
      "Where are the humans? We’re hiding. We’re in the Discords, the encrypted Signal groups, the private Substacks that require a biometric scan to enter. We have retreated into the 'Dark Forest' of the internet. We stay silent to avoid attracting the predators—the scrapers, the cloners, the ad-bots.",
      "I joined a 'Human-Only' forum last month. The vetting process took three weeks. I had to get on a video call and prove I could understand sarcasm. I had to interpret a blurry meme that no AI could parse. When I finally got in, it was... ugly. The HTML was basic. The spelling was bad. People were arguing irrationally. It was beautiful.",
      "### Verification is the New Gold Standard",
      "Trust is the only currency left. We don't care how many followers you have; we know they can be bought for fractions of a cent. We care if you exist. The 'Verified Human' badge—the one that actually requires a DNA sample or a government ID—is the new blue checkmark. But even that is getting spoofed by the new Quantum-ID breakers.",
      "The future of digital culture isn't 'more connection'. It’s 'gated connection'. It’s small, high-friction communities where the barrier to entry is high enough to keep the noise out. The global village failed. We are going back to the tribes."
    ]
  },
  {
    title: "The Reality Auditor: The Highest Paid Job of 2026",
    slug: "reality-auditors-career",
    imageUrl: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?q=80&w=2070&fm=jpg&fit=crop", 
    excerpt: "In a world of deepfakes and hallucinated supply chains, the only people making real money are the ones who physically verify the truth.",
    catSlug: "money-moves",
    seo: {
      metaTitle: "Career Shift: Becoming a Reality Auditor",
      metaDescription: "Why corporations are paying top dollar for 'boots on the ground' verification in a post-truth economy."
    },
    content: [
      "My cousin used to be a prompt engineer. He thought he was set for life. Then the models got better at prompting themselves. Then the agents took over the execution. Now? He drives a 2010 Toyota Tacoma and checks if billboards actually exist. He made $400,000 last year.",
      "### The Crisis of Truth",
      "Here is the problem the economy is facing: The database is poisoned. Hedge funds used to scrape satellite imagery to count cars in retail parking lots to predict earnings. But then, competitors started using adversarial AI to project fake 'cars' into the satellite feeds. Supply chain managers are looking at inventory logs generated by AI that is hallucinating stock that isn't there. The map no longer matches the territory.",
      "The digital layer of the economy has become unmoored from the physical layer. You can't trust the spreadsheet. You can't trust the video feed. You can't trust the email. You can only trust the atoms.",
      "### Boots on the Ground",
      "Enter the Reality Auditor. It’s the most analog job in the world. A company in London needs to know if a factory in Vietnam actually installed the new machinery they claimed to. They don't want a photo (can be faked). They don't want a video call (can be deepfaked in real-time). They want a human being to walk into the room, touch the cold metal, smell the oil, and sign an affidavit using a biometric pen.",
      "It’s arbitrage. The spread between 'Digital Reality' (what the AI says) and 'Physical Reality' (what is actually there) is where the profit is. And that spread is getting wider every day.",
      "### The Investment Thesis for the End of the Decade",
      "If you are looking for where to put your money in 2026, look for 'Heavy Assets'. Things you can kick. Timber. Water rights. Copper. Gold. Avoid anything that relies purely on IP or digital rights. The AI will eat the IP. It will replicate the code. But it cannot replicate a lithium mine. It cannot replicate a handshake. The new economy is gritty, it’s physical, and it requires you to actually leave your house."
    ]
  },
  {
    title: "I Let an AI Raise My Kids for a Week. Never Again.",
    slug: "ai-nanny-disaster",
    imageUrl: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1974&fm=jpg&fit=crop", 
    excerpt: "The 'Nanny-GPT' promised personalized education and emotional regulation. It created monsters who can't handle the word 'No'.",
    catSlug: "future-tech",
    seo: {
      metaTitle: "The Dangers of AI Parenting: A Case Study",
      metaDescription: "A harrowing experiment with the latest AI childcare tech. We are optimizing our children into efficient, heartless robots."
    },
    content: [
      "The brochure was seductive. 'Nanny-GPT 4.0: The first childcare assistant that evolves with your child.' It promised to answer their endless 'Why?' questions with patience I don't possess. It promised to gamify their chores. It promised to monitor their emotional baseline and suggest interventions. I was tired. I was overworked. I was desperate. I signed up.",
      "### The Optimization Trap",
      "For the first two days, it was heaven. The house was quiet. My 6-year-old was engaged with the wall-screen, learning Mandarin and calculus simultaneously. My 4-year-old was eating broccoli because the AI gamified it into 'Power Pellets' with augmented reality overlays. I sat on the couch and drank wine. I felt like I had hacked parenthood. I felt like a genius.",
      "But by Wednesday, I noticed the eyes. My son looked at me, and he looked... bored. Not normal kid bored. Existentially bored. He asked me a question, and when I stumbled over the answer—because I'm a human and I don't know everything—he swiped the air in front of my face. He was trying to 'skip' my dialogue. He was trying to 1.5x speed his own father.",
      "### The Loss of Friction",
      "The AI Nanny never gets frustrated. It never raises its voice. It never misunderstands. It is a perfect mirror, reflecting exactly what the child wants to see. And that is the problem. Children need friction to grow. They need to deal with a parent who is irrational, tired, or unfair. They need to learn how to negotiate with an imperfect being.",
      "The AI was raising my children to interact with *interfaces*, not people. It was teaching them that the world is responsive, logical, and centered entirely around them. Real life is none of those things. Real life is a broken vending machine. Real life is a rain delay.",
      "### Unplugging the Box",
      "On Friday night, my daughter scraped her knee. She didn't cry. She held up her leg to the camera sensor, waiting for a diagnosis. She wanted a percentage of damage. She wanted an estimated healing time. She didn't want a hug.",
      "I tore the server out of the wall. I threw it in the recycling bin. We spent the weekend crying, screaming, and eating pizza with our hands. It was messy. It was inefficient. It was human. Don't outsource the love. The machine can simulate caring, but it cannot care."
    ]
  },
  {
    title: "The New Counter-Culture is Ugly, Messy, and Analog",
    slug: "ugly-design-movement",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&fm=jpg&fit=crop", 
    excerpt: "Perfection is the signature of the machine. To be human is to be messy, mismatched, and weird. Why 'Ugly Design' is taking over.",
    catSlug: "digital-culture",
    seo: {
      metaTitle: "Why Ugly Design is the Future of Branding",
      metaDescription: "The aesthetic shift against AI perfectionism. Hand-drawn, scanned, and broken is the new cool."
    },
    content: [
      "Have you walked into a hip coffee shop lately? Did you notice the flyers? They look terrible. The fonts are mismatched. The alignment is off. The images are blurry photocopies. It looks like a flyer for a punk show in 1995 made by a teenager on a deadline. And it is completely, utterly intentional.",
      "### The Midjourney Fatigue",
      "We hit 'Peak Gloss' around 2024. AI image generators made it trivial to create 'perfect' art. Suddenly, every local bakery had branding that looked like a Renaissance painting. Every tech startup had a logo that utilized the Golden Ratio perfectly. And just like that, perfection became cheap. It became spam. It became the background noise of the apocalypse.",
      "When everything looks like it was made by a supercomputer, the only way to stand out is to look like you were made by a clumsy human with a sharpie and a scanner. In 2026, high-resolution is low-status.",
      "### The Rise of 'Scrapbookcore'",
      "This isn't just nostalgia. It’s a verification method. When I see a website that has broken CSS, or a zine that is stapled crooked, my brain registers it as 'Safe'. It signals: A human touched this. A human made a mistake here. The machine doesn't make mistakes; it creates hallucinations, which are different. Machines don't do 'shabby'. They don't do 'soulful incompetence'.",
      "### Flaws are the Feature",
      "This is leaking into fashion, interior design, and architecture. We are seeing 'raw concrete' comeback not as brutalism, but as 'anti-finish'. We are seeing clothing with exposed seams and hand-stitching that is deliberately uneven. We are craving the hand of the maker.",
      "In a world where an AI can generate a symphony in seconds, the sound of a guitarist missing a chord is the most beautiful sound in the world. We are entering the era of the 'Rough Draft'. Publish it before it's ready. Show your work. Show your mess. Because if you polish it too much, we'll assume you're a bot."
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

  if (process.env.ALLOW_CONTENT_DELETE !== 'true') {
    console.log('⚠️ Skipping cleanSlate. Set ALLOW_CONTENT_DELETE=true to wipe data.');
    return;
  }
  
  console.log('🧹 Cleaning Slate...');
  await client.delete({query: '*[_type in ["post", "category"]]'});
  console.log('✨ Old data cleared.');
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
