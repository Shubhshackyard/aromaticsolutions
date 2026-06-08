const modules = import.meta.glob('../../content/blog/*.md', { eager: true });

export const blogsData = Object.values(modules)
  .map(({ default: { data, content } }) => ({
    ...data,
    id: data.slug,
    body: content,
  }))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

/* ── Legacy static fallback kept below for reference only ─────────────────
   Delete this block once you confirm the markdown files load correctly.
   ─────────────────────────────────────────────────────────────────────── */
const _legacy = [
  {
    id: 1,
    slug: 'science-of-aromatherapy-terpenes-cognition',
    title: 'The Science of Aromatherapy: How Terpenes Impact Human Cognition',
    category: 'Science',
    excerpt:
      'Modern neuroscience is validating what ancient healers understood intuitively — aromatic compounds directly modulate brain chemistry. We dive deep into the mechanisms behind terpene-receptor interactions.',
    author: 'Dr. Priya Menon',
    authorRole: 'Lead Research Scientist',
    date: 'May 28, 2026',
    readTime: '8 min read',
    coverImage: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&auto=format&fit=crop',
    featured: true,
    content: [
      {
        type: 'paragraph',
        text: 'For millennia, cultures across the world have burned resins, diffused botanical oils, and applied herbal balms as medicine for both the body and mind. Now, modern neuroscience is providing the molecular evidence for why this works. At the heart of aromatherapy\'s efficacy lies a remarkable class of organic compounds: terpenes.',
      },
      {
        type: 'heading',
        text: 'What Are Terpenes?',
      },
      {
        type: 'paragraph',
        text: 'Terpenes are the largest and most diverse class of naturally occurring organic chemicals. Synthesised primarily by plants as secondary metabolites, they serve as evolutionary defense mechanisms against pests, pathogens, and herbivores — and as attractants for pollinators. In essential oils, terpenes can constitute 60–90% of the total chemical composition. The most studied include Linalool (found abundantly in lavender), Limonene (citrus peels), α-Pinene (pine and rosemary), β-Caryophyllene (black pepper, cloves), and Geraniol (rose, palmarosa).',
      },
      {
        type: 'heading',
        text: 'The Olfactory-Brain Axis',
      },
      {
        type: 'paragraph',
        text: 'When inhaled, terpene molecules travel through the nasal passage and bind to olfactory receptor neurons. Unlike other sensory signals, olfactory signals bypass the thalamus — the brain\'s sensory relay station — and project directly to the amygdala and hippocampus via the olfactory bulb. These are the brain\'s primary centres for emotional processing and memory consolidation. This direct pathway explains why a scent can trigger a vivid memory or an immediate emotional state change faster than any other sensory input.',
      },
      {
        type: 'heading',
        text: 'Key Terpenes and Their Neurological Effects',
      },
      {
        type: 'paragraph',
        text: 'Linalool has been shown in peer-reviewed studies to modulate GABA-A receptors, producing anxiolytic (anti-anxiety) and sedative effects comparable to low doses of benzodiazepines, but without the risk of dependence. Limonene elevates serotonin and dopamine levels in key brain regions, producing measurable anti-depressant and stress-relieving effects. α-Pinene acts as an acetylcholinesterase inhibitor, meaning it slows the breakdown of acetylcholine — a neurotransmitter critical for memory, attention, and learning. β-Caryophyllene, uniquely among terpenes, is a full agonist of the CB2 endocannabinoid receptor, activating the body\'s internal neuromodulatory system to produce anti-inflammatory and neuroprotective effects.',
      },
      {
        type: 'heading',
        text: 'GC/MS Testing: The Foundation of Efficacy',
      },
      {
        type: 'paragraph',
        text: 'At Aromatic Solutions, every batch of essential oil undergoes rigorous Gas Chromatography-Mass Spectrometry (GC/MS) testing. This analytical technique separates and identifies every chemical constituent in an oil, confirming the presence and concentration of therapeutic terpenes while detecting any adulteration, contamination, or synthetic dilution. A certified GC/MS report is the gold standard of quality in the aromatherapy and pharmaceutical industries, and it is what separates genuine therapeutic-grade oils from commercial-grade imitations.',
      },
      {
        type: 'paragraph',
        text: 'The frontier of terpene science is moving toward personalised aromatherapy formulations, where individual neurochemical profiles are matched to specific terpene blends for targeted therapeutic outcomes. This is the future Aromatic Solutions is actively participating in through ongoing research collaborations with pharmaceutical and wellness institutions.',
      },
    ],
  },
  {
    id: 2,
    slug: 'sourcing-sustainable-vetiver-south-india',
    title: 'Sourcing Sustainable Vetiver: Supporting Farming Communities in South India',
    category: 'Sourcing',
    excerpt:
      'Vetiver oil is one of the most complex and precious essential oils in the world. Our journey to source it sustainably takes us deep into the farming communities of Tamil Nadu, where ancient cultivation meets modern ethics.',
    author: 'Rahul Krishnaswamy',
    authorRole: 'Head of Sustainable Sourcing',
    date: 'April 14, 2026',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&auto=format&fit=crop',
    featured: false,
    content: [
      {
        type: 'paragraph',
        text: 'Known as "khus" in Hindi and revered as the "oil of tranquility" in Ayurvedic medicine, vetiver (Chrysopogon zizanioides) is a perennial grass whose roots produce one of the most complex, earthy, and sought-after essential oils in the world. A single kilogram of vetiver oil requires approximately 100 kilograms of dried roots and 18 to 24 months of cultivation — a testament to why sustainable sourcing is not just an ethical choice but an existential necessity for the supply chain.',
      },
      {
        type: 'heading',
        text: 'The Ecological Role of Vetiver',
      },
      {
        type: 'paragraph',
        text: 'Vetiver is a remarkable ecological asset. Its deep, fibrous root system — which can penetrate 3 to 4 metres into the soil — provides exceptional erosion control, making it a vital crop for slope stabilisation and watershed management in rain-prone regions. Unlike monoculture crops that deplete soil, vetiver actually replenishes it by fixing nitrogen and increasing water retention capacity. This means that sustainable vetiver farming actively restores degraded land, which is why we prioritise farmers who practice it.',
      },
      {
        type: 'heading',
        text: 'Our Partnership Model in Tamil Nadu',
      },
      {
        type: 'paragraph',
        text: 'Aromatic Solutions directly contracts with a cooperative network of over 200 smallholder farming families across the Salem, Namakkal, and Dharmapuri districts of Tamil Nadu — historically the epicentre of Indian vetiver cultivation. Our partnership model goes beyond a simple buyer-seller transaction. We provide advance financing to cover cultivation costs, eliminating the debt cycle that traps many farmers with local money-lenders. We co-invest in steam distillation units at the village level, so farmers capture more of the value chain rather than selling raw roots at commodity prices. We facilitate ISO and organic certification training, enabling farmers to access premium international markets.',
      },
      {
        type: 'heading',
        text: 'Quality from the Ground Up',
      },
      {
        type: 'paragraph',
        text: 'Indian vetiver oil (also called "ruh khus") is chemically distinct from its Haitian or Réunion counterparts. The Indian variety is richer in khusimol and isovalencenol, giving it a deeper, more complex woody-earthy profile prized by luxury perfumers in France, the UAE, and Japan. By controlling the supply chain from soil to still, Aromatic Solutions guarantees the provenance, chemical profile, and purity of every batch — something simply not possible through intermediary trading.',
      },
      {
        type: 'paragraph',
        text: 'Sustainability, for us, is not a marketing tagline. It is the only viable business model for long-term quality and supply security in natural aromatics. We are committed to publishing an annual Sustainability Impact Report, detailing farmer income metrics, land restoration data, and certification progress — holding ourselves publicly accountable to the communities and ecosystems that make our products possible.',
      },
    ],
  },
  {
    id: 3,
    slug: 'formulating-the-future-2026-cosmetics-fragrances',
    title: 'Formulating the Future: 2026 Trends in Natural Cosmetics and Fragrances',
    category: 'Industry Trends',
    excerpt:
      'The global natural cosmetics market is undergoing a structural transformation. From AI-assisted formulation to biotechnology-derived naturals, we analyse the five defining trends reshaping the industry in 2026.',
    author: 'Sneha Agarwal',
    authorRole: 'Senior Formulation Consultant',
    date: 'March 5, 2026',
    readTime: '7 min read',
    coverImage: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop',
    featured: false,
    content: [
      {
        type: 'paragraph',
        text: 'The global natural and organic cosmetics market is projected to exceed $54 billion by 2027. But behind this headline number lies a complex, rapidly evolving landscape where consumer intelligence, regulatory pressure, and biotechnological innovation are converging to fundamentally change what "natural" means in formulation. Here are the five trends our formulation consultants are tracking most closely in 2026.',
      },
      {
        type: 'heading',
        text: '1. The Rise of Biofermented Ingredients',
      },
      {
        type: 'paragraph',
        text: 'Biotechnology is enabling the production of nature-identical aromatic compounds through microbial fermentation — eliminating the need for land-intensive agriculture or solvent extraction. Fermentation-derived linalool, geraniol, and even complex aroma molecules previously exclusive to rare botanicals are now achievable at commercial scale with consistent purity. This is revolutionising ingredient accessibility without compromising the "natural" claim — provided brands communicate the science transparently to consumers.',
      },
      {
        type: 'heading',
        text: '2. Waterless and Concentrated Formulas',
      },
      {
        type: 'paragraph',
        text: 'Water scarcity awareness is pushing formulation chemistry toward anhydrous (waterless) systems. Solid perfumes, concentrated fragrance oils, and waterless serum sticks are growing at 32% CAGR. For essential oil suppliers, this represents a significant opportunity: these formats require higher concentrations of botanical actives, elevating the quality and provenance standards demanded from suppliers. Our carrier oil range — including jojoba, sea buckthorn, and marula — is specifically curated for anhydrous formulation compatibility.',
      },
      {
        type: 'heading',
        text: '3. Skin Microbiome-Conscious Fragrances',
      },
      {
        type: 'paragraph',
        text: 'Research into the skin microbiome has revealed that certain fragrance compounds — particularly synthetic musks and halogenated compounds — disrupt the delicate balance of skin microflora. This is accelerating demand for fragrance formulations built from microbiome-friendly essential oils and botanical extracts. Aromatic Solutions is working with dermatological research partners to develop a certified microbiome-safe fragrance palette.',
      },
      {
        type: 'heading',
        text: '4. AI-Assisted Sensory Formulation',
      },
      {
        type: 'paragraph',
        text: 'Machine learning models trained on vast olfactory datasets are now capable of predicting how specific combinations of aromatic molecules will be perceived by human sensory panels. This is dramatically reducing the R&D timeline for new fragrance development — from 18-month iterative testing cycles down to weeks. For brand owners, this means faster go-to-market for trend-responsive products. Our custom formulation service is integrating AI-assisted prediction tools for clients in the personal care and home care sectors.',
      },
      {
        type: 'heading',
        text: '5. Radical Ingredient Transparency',
      },
      {
        type: 'paragraph',
        text: 'The era of vague "fragrance" or "parfum" declarations on ingredient lists is ending. Regulatory frameworks in the EU, and increasingly in India under the Bureau of Indian Standards (BIS) cosmetic regulations, are mandating full fragrance ingredient disclosure. Brands that have already built transparent supply chains with traceable, certified botanical ingredients — like those sourced from Aromatic Solutions — will have a significant competitive advantage in this new regulatory environment.',
      },
    ],
  },
]; // end _legacy
