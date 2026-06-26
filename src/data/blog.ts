export interface BlogPost {
  slug: string
  title: string
  date: string
  dateISO: string
  category: 'Engineering' | 'Design' | 'Personal'
  readingTime: number
  excerpt: string
  tags: string[]
  content: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'architecture-resilient-distributed-systems',
    title: 'The Architecture of Resilient Distributed Systems',
    date: 'JULY 12, 2024',
    dateISO: '2024-07-12',
    category: 'Engineering',
    readingTime: 12,
    excerpt:
      'Exploring the trade-offs between consistency and availability in modern cloud-native environments and how to design for failure at scale.',
    tags: ['#Architecture', '#DistributedSystems', '#Reliability'],
    content: `
<h2>The Fundamental Tension</h2>
<p>Every distributed system exists in a state of permanent negotiation. The CAP theorem tells us we must choose between consistency and availability during a network partition — but the real engineering challenge is deciding <em>which</em> trade-off serves your users best.</p>
<p>In the past five years of building high-throughput systems, I have come to believe that most engineers default to strong consistency because it is conceptually simpler, not because it is correct for their workload.</p>
<blockquote>
  The goal is not to prevent failure. The goal is to make the system's reaction to failure predictable and bounded.
</blockquote>
<h2>Designing for Failure Modes</h2>
<p>A system that degrades gracefully is worth more than one that is theoretically perfect. When a downstream service becomes unavailable, your system should have a clear, pre-determined behavior — not a cascade of timeouts that consumes all available threads.</p>
<p>The circuit breaker pattern, popularized by Michael Nygard in <em>Release It!</em>, is the first primitive every distributed systems engineer should internalize. Its logic is deceptively simple:</p>
<pre>
async function withCircuitBreaker&lt;T&gt;(
  fn: () =&gt; Promise&lt;T&gt;,
  threshold = 5,
  timeout = 60_000
): Promise&lt;T&gt; {
  if (failureCount &gt;= threshold) {
    const elapsed = Date.now() - lastFailureTime;
    if (elapsed &lt; timeout) throw new Error('Circuit open');
    // Half-open: allow one probe request
  }
  try {
    const result = await fn();
    failureCount = 0;
    return result;
  } catch (err) {
    failureCount++;
    lastFailureTime = Date.now();
    throw err;
  }
}
</pre>
<h2>The Observability Imperative</h2>
<p>A resilient system without observability is a black box. You can design all the fault-tolerance primitives in the world, but without structured logging, distributed tracing, and meaningful SLIs, you are flying blind during the incidents that matter most.</p>
<p>The three pillars — logs, metrics, traces — are not optional luxuries. They are the interface between your system's internal behavior and the engineers who must understand and fix it at 3 AM.</p>
<ul>
  <li>Logs should be structured (JSON) and carry trace context</li>
  <li>Metrics should track SLI targets, not just raw infrastructure stats</li>
  <li>Traces should cross service boundaries and include database calls</li>
</ul>
`,
  },
  {
    slug: 'brutalist-ui-functional-clarity',
    title: 'Brutalist UI: A Return to Functional Clarity',
    date: 'JUNE 28, 2024',
    dateISO: '2024-06-28',
    category: 'Design',
    readingTime: 8,
    excerpt:
      "Why stripping away the 'veneer' of modern design might be the key to better accessibility and faster performance for power users.",
    tags: ['#Design', '#Brutalism', '#Accessibility'],
    content: `
<h2>The Tyranny of Decoration</h2>
<p>Modern UI design has accumulated an enormous amount of decoration. Gradients that do not communicate anything. Shadows that add depth without hierarchy. Micro-animations that signal interactivity while introducing latency.</p>
<p>Brutalist UI asks a single, uncomfortable question: <em>what would this look like if we removed everything that does not directly serve function?</em></p>
<blockquote>
  Ornament is crime. What remains when you remove the ornament is the actual product.
</blockquote>
<h2>Contrast as the Primary Tool</h2>
<p>When you cannot rely on gradients, drop shadows, or brand colors to create hierarchy, you are forced to use the oldest and most reliable tool available: contrast. The difference between black and white is absolute. There is no ambiguity about which element is more prominent.</p>
<p>This constraint-driven clarity is not just aesthetic. It is a direct accessibility improvement. High-contrast interfaces perform better for users with low vision, in bright environments, and on low-quality displays.</p>
<h2>Typography as Infrastructure</h2>
<p>In a stripped-back design system, typography carries the entire weight of information architecture. The choice between serif and monospace is not just aesthetic — it communicates <em>the register</em> of the content.</p>
<p>Serif for narrative and long-form content. Monospace for metadata, labels, and technical identifiers. This creates a clear visual grammar that the reader learns quickly and can navigate without conscious thought.</p>
`,
  },
  {
    slug: 'writing-as-compiler',
    title: 'Writing as a Compiler for Thinking',
    date: 'JUNE 15, 2024',
    dateISO: '2024-06-15',
    category: 'Personal',
    readingTime: 15,
    excerpt:
      'How structured long-form writing improves the quality of software architecture and helps in debugging complex mental models.',
    tags: ['#Writing', '#ThinkingTools', '#Engineering'],
    content: `
<h2>The Compilation Analogy</h2>
<p>A compiler does not evaluate your code at face value. It parses it, resolves ambiguities, identifies type errors, and generates an optimized representation. Writing performs the same function for thought.</p>
<p>When you write about a technical problem, you are compiling your mental model into a form that can be checked for consistency, communicated to others, and stored for later retrieval. The process of writing reveals the parts of your model that are underspecified.</p>
<blockquote>
  If you cannot explain it clearly in prose, your understanding has gaps. Writing surfaces them before production does.
</blockquote>
<h2>The Architecture Document as Forcing Function</h2>
<p>One of the most valuable practices I have developed is writing a two-page architecture document before writing any code for a non-trivial feature. Not a formal RFC — just a structured explanation of the problem, the chosen solution, and the trade-offs I consciously accepted.</p>
<p>The act of writing this document consistently reveals design problems I would otherwise discover only after writing thousands of lines of code. The cost of revising prose is an order of magnitude lower than refactoring an implementation.</p>
<h2>Writing and Debugging</h2>
<p>Rubber-duck debugging is well-known. Writing is its more rigorous cousin. When you write out the expected behavior of a system, the actual behavior observed, and your hypothesis for the discrepancy, you engage a different mode of reasoning than when you stare at code.</p>
<p>The constraint of forming complete sentences prevents the vague hand-waving that passes for thinking when you are exhausted and under pressure. It demands specificity.</p>
`,
  },
  {
    slug: 'optimization-embedded-systems',
    title: 'Optimization Lessons from Embedded Systems',
    date: 'MAY 22, 2024',
    dateISO: '2024-05-22',
    category: 'Engineering',
    readingTime: 10,
    excerpt:
      'What high-level web developers can learn from the memory-constrained world of firmware and bare-metal programming.',
    tags: ['#Embedded', '#Performance', '#Systems'],
    content: `
<h2>The Discipline of Constraint</h2>
<p>Embedded systems engineers operate under constraints that web developers rarely face: 64KB of RAM, no garbage collector, no dynamic memory allocation after initialization. These constraints are not limitations — they are design principles.</p>
<p>Spending time writing firmware forces you to understand exactly what your abstractions cost. Every byte of stack space, every function call overhead, every branch misprediction matters in an environment where the entire system might run on less compute than a 1970s pocket calculator.</p>
<h2>Lessons That Transfer</h2>
<p>The most transferable lesson is <em>static allocation by default, dynamic allocation by exception</em>. In web applications, we allocate freely and rely on the garbage collector to clean up. This works, but it creates unpredictable GC pauses and memory pressure that manifests as tail latency at scale.</p>
<pre>
// Embedded pattern: pre-allocated ring buffer
#define BUFFER_SIZE 256
typedef struct {
  uint8_t data[BUFFER_SIZE];
  uint16_t head;
  uint16_t tail;
} RingBuffer;

// No malloc. No free. No surprises.
</pre>
<p>The equivalent in a high-level language might be object pooling, pre-allocated arrays for hot paths, or avoiding closures that capture state in tight loops.</p>
<h2>Measuring Before Optimizing</h2>
<p>Embedded engineers have hardware cycle counters and logic analyzers. They cannot guess at performance — they must measure. This habit of instrumenting before optimizing transfers directly to web development, where the instinct to optimize based on intuition is common and expensive.</p>
`,
  },
  {
    slug: 'desk-setup-high-focus',
    title: 'Desk Setup for High-Focus Work',
    date: 'APRIL 04, 2024',
    dateISO: '2024-04-04',
    category: 'Personal',
    readingTime: 5,
    excerpt:
      'My personal environment for deep work: lighting, acoustics, and the reduction of cognitive friction.',
    tags: ['#Setup', '#DeepWork', '#Productivity'],
    content: `
<h2>The Environment as a Tool</h2>
<p>The physical workspace is not decoration. It is an instrument. Like any instrument, it can be tuned for a specific kind of performance. Mine is tuned for sustained, deep technical work over four to six hour sessions.</p>
<p>The three variables I have optimized most aggressively are lighting, acoustics, and display configuration. Everything else — chair, desk, peripherals — matters less than engineers typically assume.</p>
<h2>Lighting</h2>
<p>I use a single, large, indirect light source positioned behind and above the monitor. The goal is even ambient illumination with zero glare on the display. Bias lighting behind the monitor reduces eye strain by decreasing the contrast ratio between the screen and the surrounding environment.</p>
<p>I avoid ceiling lighting during focus sessions entirely. Overhead fluorescent light triggers a register in my nervous system that is incompatible with the depth of concentration I am trying to achieve.</p>
<h2>Acoustics and Focus</h2>
<p>A consistent auditory environment eliminates one source of context switching. I use a combination of noise-canceling headphones and a pink noise generator. Pink noise is spectrally shaped to mask the most cognitively disruptive frequency ranges — the human voice band.</p>
<p>Music with lyrics is architecturally incompatible with language-heavy work: writing, code review, and design documentation. Purely instrumental music — particularly music with a regular, predictable rhythmic structure — can be useful for implementation work.</p>
`,
  },
  {
    slug: 'physics-late-night-deployments',
    title: 'The Physics of Late-Night Deployments: Why Precision Matters at 3 AM',
    date: 'MARCH 18, 2024',
    dateISO: '2024-03-18',
    category: 'Engineering',
    readingTime: 12,
    excerpt:
      'On the specific conditions that make late-night production changes dangerous and what systems thinking reveals about human error under fatigue.',
    tags: ['#Architecture', '#SystemDesign', '#Minimalism'],
    content: `
<h2>The Entropy of Choice</h2>
<p>There is a specific stillness that descends upon the terminal after midnight. When the ambient noise of the office or the home fades, the relationship between the engineer and the codebase undergoes a phase shift. It is no longer just about shipping features; it becomes an exercise in structural integrity.</p>
<p>In a distributed system, these decisions are magnified by the latency of the network. We often talk about "eventual consistency," but we rarely discuss the emotional cost of the "eventual."</p>
<blockquote>
  True architectural rigor is not about preventing errors, but about making the system's reaction to those errors predictable.
</blockquote>
<p>Consider the following implementation of a retry mechanism with exponential backoff. At 3 AM, this is the only thing standing between a minor hiccup and a cascading failure.</p>
<pre>
// retry_logic.ts
async function persistentExecute&lt;T&gt;(
  task: () =&gt; Promise&lt;T&gt;,
  maxRetries = 5
): Promise&lt;T&gt; {
  for (let i = 0; i &lt; maxRetries; i++) {
    try {
      return await task();
    } catch (err) {
      const delay = Math.pow(2, i) * 100; // MS
      await new Promise(res =&gt; setTimeout(res, delay));
    }
  }
  throw new Error("Execution limit reached.");
}
</pre>
<h2>The Brutalist Path</h2>
<p>The utility of mono-spaced fonts in these environments cannot be overstated. When we strip away the decorative, we are left with the logic. The logic must be beautiful because the logic is all there is.</p>
<p>Brutalism in UI design is often misunderstood as a lack of care. In reality, it is the highest form of care. It is the refusal to distract the user from the content. In this article, you will notice the absence of sidebars, the lack of "Recommended for You" widgets, and the deliberate use of high-contrast white-on-black.</p>
<p>This is not an aesthetic choice; it is a functional requirement for deep focus. When the system is simple, the mind can be complex.</p>
`,
  },
  {
    slug: 'refactoring-architectural-monolith',
    title: 'Refactoring the Architectural Monolith',
    date: 'FEBRUARY 29, 2024',
    dateISO: '2024-02-29',
    category: 'Engineering',
    readingTime: 8,
    excerpt:
      'Strategies for decoupling services without losing vertical integrity.',
    tags: ['#Architecture', '#Refactoring', '#Microservices'],
    content: `
<h2>The Monolith Is Not the Enemy</h2>
<p>The architecture community has spent a decade demonizing the monolith. In doing so, it has sent countless teams on costly migrations toward microservices that introduced more problems than they solved. A well-structured monolith is not a technical debt — it is a conservative bet that preserves optionality.</p>
<p>The question is not "when should we move to microservices?" The question is "which boundaries, if extracted, would provide more value than the cost of the extraction?"</p>
<h2>Finding Natural Seams</h2>
<p>Before extracting any service, map the data flows. Draw a directed graph of every module and the data it reads and writes. Clusters with high internal coupling and low external coupling are your natural seam candidates.</p>
<blockquote>
  A good extraction is invisible to end users and reduces, not increases, operational surface area.
</blockquote>
<p>The most dangerous extractions are those driven by organizational pressure rather than technical merit. When a team wants to "own" a service, the boundary is drawn around Conway's Law rather than around technical cohesion. The result is a distributed monolith: all the complexity of microservices with none of the benefits.</p>
`,
  },
  {
    slug: 'rust-frontend-engineers',
    title: 'Rust for Frontend Engineers',
    date: 'JANUARY 15, 2024',
    dateISO: '2024-01-15',
    category: 'Engineering',
    readingTime: 7,
    excerpt:
      'Leveraging WASM to offload heavy computation in the browser.',
    tags: ['#Rust', '#WASM', '#Performance'],
    content: `
<h2>Why WASM Changes the Equation</h2>
<p>WebAssembly is not a replacement for JavaScript. It is a complement — a mechanism for running computationally intensive work in the browser without the overhead of the JavaScript runtime. Rust, with its zero-cost abstractions and absence of garbage collection, is the ideal language for targeting WASM.</p>
<p>The use cases are specific and high-value: image processing, audio/video codec implementations, cryptographic operations, and complex data transformations that would otherwise require a round-trip to the server.</p>
<h2>The Ownership Model as Design Constraint</h2>
<p>For frontend engineers coming from JavaScript, Rust's ownership model is initially disorienting. Data has a single owner. References are borrowed, not shared. Mutation requires explicit declaration.</p>
<p>These constraints feel restrictive until you realize they are eliminating an entire class of bugs. Null pointer dereferences, use-after-free errors, and data races are not just "handled" in Rust — they are made structurally impossible by the compiler.</p>
<pre>
// This will not compile — borrow checker prevents use-after-move
let s = String::from("hello");
let s2 = s; // s is moved to s2
println!("{}", s); // ERROR: value borrowed here after move
</pre>
<p>Learning to work within these constraints makes you a better programmer in every language. The patterns of clear ownership and explicit mutation are valuable in JavaScript, TypeScript, and beyond.</p>
`,
  },
]

export const POSTS_PER_PAGE = 5

export function getFilteredPosts(
  posts: BlogPost[],
  searchQuery: string,
  category: string,
  sortOrder: 'newest' | 'oldest'
): BlogPost[] {
  let filtered = posts.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      category === 'all' || p.category.toLowerCase() === category.toLowerCase()
    return matchesSearch && matchesCategory
  })

  filtered = [...filtered].sort((a, b) => {
    const diff = new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
    return sortOrder === 'newest' ? diff : -diff
  })

  return filtered
}
