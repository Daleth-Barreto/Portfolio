export const profile = {
  name: 'Alan Daleth Hernández Barreto',
  shortName: 'Daleth',
  role: 'B.S. Computer Systems Engineering · TecNM Zacatepec',
  tagline: 'Robotics · Quantum Computing · Competitive Programming',
  headline:
    'Systems engineering student and independent researcher in quantum and neuromorphic computing. ' +
    'From competitive robotics arenas to papers accepted at IEEE, Springer and COMIA.',
  email: 'alandaleth.hb@gmail.com',
  schoolEmail: 'L23090959@zacatepec.tecnm.mx',
  phone: '+52 735 263 6562',
  location: 'Zacatepec, Morelos, Mexico',
  resume: '/resume-daleth.pdf',
  links: {
    github: { label: 'GitHub', url: 'https://github.com/Daleth-Barreto', handle: 'Daleth-Barreto' },
    linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/dalethhernandez/', handle: 'dalethhernandez' },
    orcid: { label: 'ORCID', url: 'https://orcid.org/0009-0007-7439-1920', handle: '0009-0007-7439-1920' },
    huggingface: { label: 'Hugging Face', url: 'https://huggingface.co/Daleth-hb', handle: 'Daleth-hb' },
    codeforces: { label: 'Codeforces', url: 'https://codeforces.com/profile/Daleth.hb', handle: 'Daleth.hb' },
    kofi: { label: 'Ko-fi', url: 'https://ko-fi.com/s/4adcfba3ca', handle: 'Robot Maze' },
    pcbway: { label: 'PCBWay', url: 'https://www.pcbway.com/project/shareproject/Robot_Maze_Robot_8700700f.html', handle: 'Robot Maze Robot' },
  },
};

export const journey = [
  {
    id: 'robots',
    step: '01',
    period: '2016 – 2023',
    title: 'The robot era',
    text: 'Twelve years of competitive robotics: mazes, sumo, line followers and insect bots. Gold, silver and bronze medals in national and international circuits, from Talent Land to RIOTRONIC Ecuador.',
    badge: '35+ medals',
    accent: 'ink',
  },
  {
    id: 'circuits',
    step: '02',
    period: '2023 – 2025',
    title: 'Circuits & firmware',
    text: 'PCB design, embedded systems and home-built robots. The "Robot Maze" controller (Arduino Nano + TB6612FNG + Sharp) supported 35+ medals and is published on PCBWay.',
    badge: 'PCB → shipped',
    accent: 'ink',
  },
  {
    id: 'quantum',
    step: '03',
    period: '2024 – present',
    title: 'Quantum leap',
    text: 'SNN and GCN decoders for quantum error correction (Surface Codes d=3–7), nanosecond-scale neuromorphic kernels, and a personal pipeline: Stim → ML/SNN → RTL → FPGA.',
    badge: 'IEEE qCCL 2026',
    accent: 'ink',
  },
  {
    id: 'fpga',
    step: '04',
    period: '2025 – present',
    title: 'RTL & FPGA',
    text: 'From simulation to real hardware: architectures described in Amaranth HDL and Verilog, validated on FPGAs. Because if it doesn’t run on real hardware, it isn’t done.',
    badge: 'Amaranth · Verilog',
    accent: 'ink',
  },
  {
    id: 'chips',
    step: '05',
    period: '2025 – present',
    title: 'Microprocessors',
    text: 'Microprocessor design for autonomous navigation, presented at the 1st National Oblea Multiproyecto TecNM Congress (CONAOM) with chip microfabrication alongside CIDESI.',
    badge: 'CONAOM-TecNM',
    accent: 'ink',
  },
  {
    id: 'mind',
    step: '06',
    period: '2025 – present',
    title: 'The awake mind',
    text: 'Competitive programming and sovereign AI: 19th nationally at the 2025 ICPC Mexico Finals, 1st at Coding Cup Sinaloa, and Senior AI Engineer at IAMEX redesigning the RAG of the I’AM assistant.',
    badge: 'ICPC · IAMEX',
    accent: 'ink',
  },
];

export const stats = [
  { value: '35+', label: 'robotics medals' },
  { value: '19th', label: 'nationally · ICPC MX 2025' },
  { value: '1st', label: 'Coding Cup Sinaloa' },
  { value: '10+', label: 'publications' },
  { value: '36', label: 'GitHub repos' },
  { value: '-10%', label: 'RAG hallucinations · IAMEX' },
];

export const awards = [
  { year: '2025', title: 'ICPC Mexico Finals', detail: '19th nationally · best team from Morelos ("Full-Time Plis")' },
  { year: '2025', title: 'Coding Cup Sinaloa', detail: '1st place, ICPC Invited category + Top 5 overall' },
  { year: '2025', title: 'Coding Cup TecNM', detail: '4th place nationally' },
  { year: '2025', title: 'Google Programming Community Cup', detail: '14th nationally · 2nd regionally' },
  { year: '2024', title: 'Google Programming Community Cup', detail: '2nd overall · 24th nationally' },
  { year: '2024', title: 'Latin American Science & Tech Olympiad', detail: 'Gold and Silver medals' },
  { year: '2023', title: 'RIOTRONIC · Ecuador', detail: 'Gold, Silver and Bronze medals (1,000+ students, 3 countries)' },
  { year: '2023', title: 'Youth Science & Tech Career', detail: 'Recognition from the Morelos State Congress (also 2024)' },
  { year: '2022', title: 'OMI / National tournaments', detail: 'Silver (OMI Morelos) · Gold at INTELIBOTS and Valle de Bravo' },
  { year: '2018', title: 'Early days', detail: 'Talent Land · OMRI · Cotorra Math Olympiad' },
];

export const publications = [
  { year: '2026', title: 'Nanosecond-Scale Neuromorphic Processing Kernels for Quantum Error Correction', venue: 'IEEE qCCL 2026 · Aalborg, Denmark', status: 'Accepted', url: null },
  { year: '2026', title: 'Overthinking the Obstacle: GCN-SNN for Robots that Prefer Not to Crash', venue: 'MEXCIR 2026 · Zacatecas', status: 'Accepted', url: 'https://femexrobotica.org/mexcir2026/index.php/program/' },
  { year: '2026', title: 'Dual-Memory Graph Attention Networks for Robust Hub Protein Detection', venue: 'Trajectories 2026', status: 'Accepted', url: null },
  { year: '2026', title: 'AFM-GAT: Adaptive Feature Modulation in Graph Attention Networks', venue: 'Trajectories 2026', status: 'Accepted', url: null },
  { year: '2026', title: 'Overcoming the Computational Bottleneck in QEC: Ultra-Low Latency SNN Decoders', venue: 'COMIA 2026 · SMIA / Springer', status: 'Accepted', url: 'https://comia.com.mx/' },
  { year: '2026', title: 'My LLM Needs a Therapist', venue: 'ICAIMH 2026', status: 'Accepted', url: null },
  { year: '2026', title: 'Outsourcing Arithmetic: Stateful Sandboxes and Entropy-Weighted Consensus for Olympiad Math', venue: 'CITCA 2026 · oral presentation', status: 'Accepted', url: null },
  { year: '2025', title: 'Dynamic Drone Mesh Network for Scalable Quantum Key Distribution', venue: 'Tecnología y Ciencia Aplicada 8(2) · ISSN 2992-8338', status: 'Published', url: 'https://jcyta.cenidet.tecnm.mx/revistas/tycap/15-Vol_8_Num_2_Julio-Diciembre_2025.pdf' },
  { year: '2025', title: 'Design and Modeling of Integrated Circuits for Environmental Sensing, Biomedical and Microfluidic Applications', venue: 'CITCA 2025', status: 'Published', url: null },
  { year: '2025', title: 'Simulation of Secure Mobile Robot Communications Using QKD', venue: 'CITCA 2025', status: 'Published', url: 'https://jcyta.cenidet.tecnm.mx/revistas/memorias/Memorias_5to_CITCA_nov_2025.pdf' },
];

export const skills = [
  { group: 'AI / LLMs', items: ['RAG', 'LangChain', 'LangGraph', 'LoRA', 'SNN', 'GNN', 'Hugging Face', 'OpenCV', 'MediaPipe'] },
  { group: 'Languages', items: ['Python', 'C++', 'Node.js', 'React', 'Astro', 'Vite', 'LLVM'] },
  { group: 'Hardware', items: ['Amaranth HDL', 'Verilog', 'KLayout', 'FPGA', 'PCB', 'Embedded'] },
  { group: 'Competitive', items: ['ICPC', 'Codeforces', 'Algorithms', 'Data Structures', 'Math'] },
];

export const projects = [
  { name: 'qwen-cuda2hip-lora', desc: 'Toolkit for automatic CUDA → ROCm migration. 263 downloads on Hugging Face.', tags: ['CUDA', 'ROCm', 'LoRA'], url: 'https://huggingface.co/Daleth-hb' },
  { name: 'AFM-GAT', desc: 'Adaptive feature modulation in graph attention networks for protein–protein interaction prediction.', tags: ['GNN', 'Bioinformatics'], url: 'https://github.com/Daleth-Barreto' },
  { name: 'Robot-Maze-Arduino', desc: 'Maze robot controller: Arduino Nano + TB6612FNG + Sharp sensors. 35+ medals.', tags: ['Arduino', 'PCB'], url: 'https://github.com/Daleth-Barreto/Robot-Maze-Arduino' },
  { name: 'QuantumPatterns', desc: 'Quantum pattern generator with Qiskit + FastAPI.', tags: ['Qiskit', 'FastAPI'], url: 'https://github.com/Daleth-Barreto' },
  { name: 'icpc-prep', desc: 'ICPC preparation and editorials in C++.', tags: ['C++', 'ICPC'], url: 'https://github.com/Daleth-Barreto' },
  { name: 'nodo', desc: 'Driver drowsiness detector with MediaPipe and risk-scored events.', tags: ['MediaPipe', 'ML'], url: 'https://github.com/Daleth-Barreto' },
  { name: 'zenithPM', desc: 'Full-stack project management web tool.', tags: ['Full-stack'], url: 'https://github.com/Daleth-Barreto' },
  { name: 'grupo-fenix', desc: 'Website built with Astro.', tags: ['Astro'], url: 'https://github.com/Daleth-Barreto' },
];
