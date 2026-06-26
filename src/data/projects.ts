export interface Project {
  id: string
  title: string
  category: string
  status: 'LIVE DEMO' | 'STABLE' | 'WIP' | 'ARCHIVE'
  description: string
  techStack: string[]
  links: {
    source?: string
    demo?: string
    docs?: string
    paper?: string
  }
  featured: boolean
  number: string
}

export const PROJECTS: Project[] = [
  {
    id: 'syntax-shell',
    title: 'Syntax Shell',
    category: 'SYSTEMS ENGINE',
    status: 'STABLE',
    number: '01',
    description:
      'A custom terminal emulator optimized for low-latency text rendering and complex syntax highlighting. Built with WASM acceleration for parser logic.',
    techStack: ['RUST', 'WASM', 'OPENGL'],
    links: { source: '#', demo: '#' },
    featured: true,
  },
  {
    id: 'monolith-core',
    title: 'Monolith Core',
    category: 'INFRASTRUCTURE',
    status: 'STABLE',
    number: '02',
    description:
      'A distributed state-management engine for real-time collaborative editors. Implements CRDT-based conflict resolution with sub-10ms sync latency.',
    techStack: ['TYPESCRIPT', 'GO', 'REDIS'],
    links: { source: '#', demo: '#' },
    featured: true,
  },
  {
    id: 'nebula-core',
    title: 'Nebula-Core v4.0',
    category: 'SYSTEMS ENGINE',
    status: 'LIVE DEMO',
    number: '03',
    description:
      'A distributed event-mesh architecture designed for high-throughput telemetry processing in low-latency environments.',
    techStack: ['RUST', 'GRPC', 'KAFKA'],
    links: { source: '#', demo: '#' },
    featured: false,
  },
  {
    id: 'mono-ui-kit',
    title: 'Mono-UI Kit',
    category: 'FRONTEND LABS',
    status: 'STABLE',
    number: '04',
    description:
      'An unstyled, brutalist-inspired component library focused on pure semantic HTML and high-contrast typography.',
    techStack: ['TYPESCRIPT', 'TAILWIND', 'RADIX'],
    links: { docs: '#' },
    featured: false,
  },
  {
    id: 'syntax-llm',
    title: 'Syntax-LLM',
    category: 'ML RESEARCH',
    status: 'WIP',
    number: '05',
    description:
      'Fine-tuned transformer models specialized in generating idiomatic systems code for embedded devices.',
    techStack: ['PYTHON', 'PYTORCH', 'C++'],
    links: { paper: '#' },
    featured: false,
  },
  {
    id: 'edge-router-x',
    title: 'Edge-Router X',
    category: 'INFRASTRUCTURE',
    status: 'LIVE DEMO',
    number: '06',
    description:
      'A custom BGP implementation for edge computing clusters, minimizing hop-latency for global asset delivery.',
    techStack: ['GO', 'EBPF', 'LINUX'],
    links: { source: '#' },
    featured: false,
  },
  {
    id: 'zero-vault',
    title: 'Zero-Vault',
    category: 'CRYPTO',
    status: 'STABLE',
    number: '07',
    description:
      'A zero-knowledge proof implementation for privacy-preserving asset verification without data disclosure.',
    techStack: ['CIRCOM', 'ZK-SNARKS', 'SOLIDITY'],
    links: { demo: '#' },
    featured: false,
  },
]
