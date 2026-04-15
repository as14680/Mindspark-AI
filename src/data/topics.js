export const CATEGORIES = [
  { id: 'foundations',          label: 'Foundations',          color: '#6172f3' },
  { id: 'machine-learning',     label: 'Machine Learning',     color: '#34d399' },
  { id: 'deep-learning',        label: 'Deep Learning',        color: '#f97316' },
  { id: 'nlp',                  label: 'NLP',                  color: '#06b6d4' },
  { id: 'computer-vision',      label: 'Computer Vision',      color: '#ec4899' },
  { id: 'generative-ai',        label: 'Generative AI',        color: '#a855f7' },
  { id: 'ai-ethics',            label: 'AI Ethics',            color: '#fbbf24' },
  { id: 'tools-frameworks',     label: 'Tools & Frameworks',   color: '#ef4444' },
]

export const TOPICS = [
  {
    id: 'what-is-ai',
    title: 'What is AI?',
    tagline: 'The foundation of everything you will learn',
    category: 'foundations',
    difficulty: 'beginner',
    estimatedMinutes: 15,
    icon: '🤖',
    color: '#6172f3',
    lessons: [
      {
        id: 'ai-definition',
        title: 'Defining Artificial Intelligence',
        order: 1,
        xpReward: 30,
        content: [
          { type: 'paragraph', text: 'Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, particularly computer systems. These processes include learning, reasoning, and self-correction.' },
          { type: 'callout', variant: 'info', text: 'AI is not a single technology — it is a collection of techniques, methods, and approaches that enable machines to mimic aspects of human cognition.' },
          { type: 'heading', text: 'Types of AI' },
          { type: 'paragraph', text: 'AI is often categorized into three types: Narrow AI (ANI) which excels at one specific task, General AI (AGI) which matches human-level intelligence across all domains, and Super AI (ASI) which surpasses human intelligence — the latter two remain theoretical.' },
          { type: 'keypoint', text: 'All AI you use today — from search engines to voice assistants — is Narrow AI.' },
        ]
      },
      {
        id: 'ai-history',
        title: 'A Brief History of AI',
        order: 2,
        xpReward: 30,
        content: [
          { type: 'paragraph', text: 'AI as a field was formally born in 1956 at the Dartmouth Conference, where John McCarthy coined the term "Artificial Intelligence." But the roots go back further to Alan Turing\'s 1950 paper "Computing Machinery and Intelligence."' },
          { type: 'heading', text: 'Key Milestones' },
          { type: 'paragraph', text: '1950: Alan Turing proposes the Turing Test. 1956: Dartmouth Conference — AI is born. 1997: Deep Blue beats world chess champion. 2012: AlexNet wins ImageNet, launching the deep learning era. 2017: Transformer architecture introduced. 2022: ChatGPT launches, bringing AI to mainstream.' },
          { type: 'keypoint', text: 'AI has gone through multiple "winters" (periods of reduced funding and interest) before the current boom driven by deep learning.' },
        ]
      },
      {
        id: 'ai-vs-ml',
        title: 'AI vs Machine Learning vs Deep Learning',
        order: 3,
        xpReward: 30,
        content: [
          { type: 'paragraph', text: 'These three terms are often used interchangeably but they have distinct meanings. Think of them as nested circles: AI is the broadest concept, ML is a subset of AI, and Deep Learning is a subset of ML.' },
          { type: 'callout', variant: 'tip', text: 'Analogy: AI is the goal (making machines smart), ML is one approach (learning from data), and Deep Learning is one technique within ML (using neural networks with many layers).' },
          { type: 'keypoint', text: 'Not all AI uses machine learning — rule-based expert systems are AI but not ML.' },
        ]
      },
    ],
    quizId: 'quiz-what-is-ai',
  },
  {
    id: 'machine-learning-basics',
    title: 'Machine Learning Basics',
    tagline: 'How machines learn from data',
    category: 'machine-learning',
    difficulty: 'beginner',
    estimatedMinutes: 25,
    icon: '📊',
    color: '#34d399',
    lessons: [
      {
        id: 'ml-intro',
        title: 'What is Machine Learning?',
        order: 1,
        xpReward: 30,
        content: [
          { type: 'paragraph', text: 'Machine Learning is a subset of AI where systems learn from data and improve their performance over time without being explicitly programmed. Instead of writing rules, you feed data and the algorithm discovers the rules.' },
          { type: 'callout', variant: 'info', text: 'Traditional programming: Data + Rules → Output. Machine Learning: Data + Output → Rules.' },
          { type: 'keypoint', text: 'The core idea: algorithms find patterns in data to make predictions or decisions.' },
        ]
      },
      {
        id: 'ml-types',
        title: 'Supervised, Unsupervised & Reinforcement Learning',
        order: 2,
        xpReward: 30,
        content: [
          { type: 'heading', text: 'Supervised Learning' },
          { type: 'paragraph', text: 'The algorithm is trained on labeled data (input-output pairs). It learns to map inputs to outputs. Examples: spam detection, image classification, price prediction.' },
          { type: 'heading', text: 'Unsupervised Learning' },
          { type: 'paragraph', text: 'The algorithm finds hidden patterns in unlabeled data. Examples: customer segmentation, anomaly detection, topic modeling.' },
          { type: 'heading', text: 'Reinforcement Learning' },
          { type: 'paragraph', text: 'An agent learns by interacting with an environment and receiving rewards or penalties. Examples: game playing (AlphaGo), robot navigation, recommendation systems.' },
          { type: 'keypoint', text: 'Most real-world ML applications use supervised learning because labeled data is available.' },
        ]
      },
      {
        id: 'ml-workflow',
        title: 'The ML Workflow',
        order: 3,
        xpReward: 30,
        content: [
          { type: 'paragraph', text: 'Every ML project follows a similar workflow: define the problem, collect and prepare data, choose and train a model, evaluate performance, iterate, and deploy.' },
          { type: 'callout', variant: 'tip', text: 'Data scientists spend 60-80% of their time on data collection and preparation — it is the most critical step.' },
          { type: 'heading', text: 'Key Metrics' },
          { type: 'paragraph', text: 'How you measure success depends on the problem: accuracy for classification, RMSE for regression, precision/recall for imbalanced datasets.' },
          { type: 'keypoint', text: 'Garbage in, garbage out — model quality is bounded by data quality.' },
        ]
      },
    ],
    quizId: 'quiz-ml-basics',
  },
  {
    id: 'neural-networks',
    title: 'Neural Networks',
    tagline: 'How machines learn to think like brains',
    category: 'deep-learning',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    icon: '🧠',
    color: '#f97316',
    lessons: [
      {
        id: 'nn-intro',
        title: 'What is a Neural Network?',
        order: 1,
        xpReward: 30,
        content: [
          { type: 'paragraph', text: 'A neural network is a computational model loosely inspired by the human brain. It consists of layers of interconnected nodes (neurons) that transform input data through learned weights to produce an output.' },
          { type: 'callout', variant: 'info', text: 'Despite the biological inspiration, artificial neural networks work very differently from real brains. The analogy is useful conceptually, not mechanistically.' },
          { type: 'keypoint', text: 'Neural networks are universal function approximators — given enough neurons and data, they can learn any function.' },
        ]
      },
      {
        id: 'nn-layers',
        title: 'Layers, Neurons & Weights',
        order: 2,
        xpReward: 30,
        content: [
          { type: 'heading', text: 'Architecture' },
          { type: 'paragraph', text: 'A typical neural network has: Input layer (raw data), Hidden layers (learned representations), Output layer (prediction). Each neuron receives inputs, multiplies by weights, adds a bias, and passes through an activation function.' },
          { type: 'code', language: 'python', text: '# Simple neuron\noutput = activation(sum(weight * input) + bias)' },
          { type: 'keypoint', text: 'The "deep" in deep learning refers to networks with many hidden layers.' },
        ]
      },
      {
        id: 'nn-training',
        title: 'How Training Works',
        order: 3,
        xpReward: 30,
        content: [
          { type: 'paragraph', text: 'Training a neural network involves two phases: forward pass (compute predictions) and backward pass (update weights using backpropagation). The goal is to minimize a loss function.' },
          { type: 'heading', text: 'Gradient Descent' },
          { type: 'paragraph', text: 'Gradient descent is the optimization algorithm that adjusts weights in the direction that reduces the loss. The learning rate controls how large each step is.' },
          { type: 'callout', variant: 'warning', text: 'Too high a learning rate → overshooting the minimum. Too low → very slow training. Finding the right learning rate is an art.' },
          { type: 'keypoint', text: 'Backpropagation efficiently computes gradients using the chain rule of calculus.' },
        ]
      },
    ],
    quizId: 'quiz-neural-networks',
  },
  {
    id: 'nlp-fundamentals',
    title: 'NLP Fundamentals',
    tagline: 'Teaching machines to understand language',
    category: 'nlp',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    icon: '💬',
    color: '#06b6d4',
    lessons: [
      {
        id: 'nlp-intro',
        title: 'What is NLP?',
        order: 1,
        xpReward: 30,
        content: [
          { type: 'paragraph', text: 'Natural Language Processing (NLP) is a branch of AI that deals with the interaction between computers and human language. It enables machines to read, understand, and generate human text.' },
          { type: 'callout', variant: 'info', text: 'NLP powers everything from search engines and spam filters to chatbots and machine translation.' },
          { type: 'heading', text: 'Core NLP Tasks' },
          { type: 'paragraph', text: 'Text classification, named entity recognition (NER), sentiment analysis, machine translation, question answering, text summarization, and language generation.' },
          { type: 'keypoint', text: 'Language is ambiguous, context-dependent, and constantly evolving — making NLP one of the hardest problems in AI.' },
        ]
      },
      {
        id: 'nlp-tokenization',
        title: 'Tokenization & Embeddings',
        order: 2,
        xpReward: 30,
        content: [
          { type: 'paragraph', text: 'Before a model can process text, it must be converted to numbers. Tokenization splits text into tokens (words, subwords, or characters). Embeddings map tokens to dense vectors in a high-dimensional space.' },
          { type: 'heading', text: 'Word Embeddings' },
          { type: 'paragraph', text: 'Word2Vec and GloVe were pioneering embedding methods that captured semantic similarity — "king" - "man" + "woman" ≈ "queen". Modern transformers use contextual embeddings that change based on surrounding words.' },
          { type: 'keypoint', text: 'Similar words have similar embedding vectors — this is how models understand meaning.' },
        ]
      },
      {
        id: 'nlp-transformers',
        title: 'The Transformer Revolution',
        order: 3,
        xpReward: 30,
        content: [
          { type: 'paragraph', text: 'The 2017 paper "Attention is All You Need" introduced the Transformer architecture, which replaced RNNs and LSTMs as the dominant NLP model. Transformers use self-attention to process all tokens in parallel.' },
          { type: 'callout', variant: 'tip', text: 'BERT (2018), GPT (2018), and their successors are all transformer-based models. The transformer is arguably the most important invention in recent AI history.' },
          { type: 'keypoint', text: 'Self-attention allows a model to weigh the importance of every other token when encoding each token.' },
        ]
      },
    ],
    quizId: 'quiz-nlp',
  },
  {
    id: 'generative-ai',
    title: 'Generative AI',
    tagline: 'AI that creates text, images, and more',
    category: 'generative-ai',
    difficulty: 'intermediate',
    estimatedMinutes: 25,
    icon: '✨',
    color: '#a855f7',
    lessons: [
      {
        id: 'genai-intro',
        title: 'What is Generative AI?',
        order: 1,
        xpReward: 30,
        content: [
          { type: 'paragraph', text: 'Generative AI refers to AI systems that can create new content — text, images, audio, video, code — rather than just classifying or predicting. These models learn the underlying distribution of training data and sample from it.' },
          { type: 'callout', variant: 'info', text: 'Examples: ChatGPT generates text, DALL-E generates images, Sora generates video, GitHub Copilot generates code.' },
          { type: 'keypoint', text: 'The key insight: if a model truly understands data, it can generate new, coherent examples of that data.' },
        ]
      },
      {
        id: 'genai-llms',
        title: 'Large Language Models (LLMs)',
        order: 2,
        xpReward: 30,
        content: [
          { type: 'paragraph', text: 'LLMs are transformer-based models trained on massive text corpora to predict the next token. With enough scale (parameters and data), they develop emergent abilities like reasoning, code generation, and in-context learning.' },
          { type: 'heading', text: 'How LLMs Work' },
          { type: 'paragraph', text: 'LLMs are trained with next-token prediction on the internet, books, and code. During inference, they autoregressively generate one token at a time, conditioning each on all previous tokens.' },
          { type: 'callout', variant: 'tip', text: 'GPT-4 has ~1.8 trillion parameters. For reference, the human brain has ~100 trillion synapses.' },
          { type: 'keypoint', text: 'Scale matters: performance on many tasks improves predictably as model size and training data grow.' },
        ]
      },
      {
        id: 'genai-prompting',
        title: 'Prompt Engineering',
        order: 3,
        xpReward: 30,
        content: [
          { type: 'paragraph', text: 'Prompt engineering is the practice of crafting input prompts to get the best outputs from LLMs. It is both an art and a science, and has become a key skill in the AI era.' },
          { type: 'heading', text: 'Key Techniques' },
          { type: 'paragraph', text: 'Zero-shot: ask directly. Few-shot: provide examples in the prompt. Chain-of-thought: ask the model to reason step by step. Role prompting: tell the model who to be. System prompts: set context and constraints.' },
          { type: 'keypoint', text: 'Better prompts → better outputs. Clear, specific, contextual prompts consistently outperform vague ones.' },
        ]
      },
    ],
    quizId: 'quiz-generative-ai',
  },
  {
    id: 'ai-ethics',
    title: 'AI Ethics & Safety',
    tagline: 'Building AI that is fair, safe, and beneficial',
    category: 'ai-ethics',
    difficulty: 'beginner',
    estimatedMinutes: 20,
    icon: '⚖️',
    color: '#fbbf24',
    lessons: [
      {
        id: 'ethics-intro',
        title: 'Why AI Ethics Matters',
        order: 1,
        xpReward: 30,
        content: [
          { type: 'paragraph', text: 'As AI systems become more powerful and widely deployed, their failures have real consequences for real people. Ethics in AI is not a philosophical luxury — it is a practical necessity.' },
          { type: 'callout', variant: 'warning', text: 'Real examples of AI harm: biased hiring algorithms, facial recognition misidentifying people of color, loan denial algorithms discriminating by race.' },
          { type: 'keypoint', text: 'AI systems reflect the values and biases of their creators and training data. Responsible AI design requires active effort to identify and mitigate harms.' },
        ]
      },
      {
        id: 'ethics-bias',
        title: 'Bias, Fairness & Accountability',
        order: 2,
        xpReward: 30,
        content: [
          { type: 'paragraph', text: 'AI bias occurs when a system produces systematically unfair outcomes. Bias can enter through biased training data, biased labels, biased problem formulation, or biased evaluation metrics.' },
          { type: 'heading', text: 'Types of Fairness' },
          { type: 'paragraph', text: 'Demographic parity: equal outcomes across groups. Equalized odds: equal error rates. Individual fairness: similar individuals treated similarly. These definitions can be mathematically incompatible.' },
          { type: 'keypoint', text: 'There is no single definition of fairness. Different stakeholders may have legitimately different fairness requirements.' },
        ]
      },
      {
        id: 'ethics-alignment',
        title: 'AI Alignment & Safety',
        order: 3,
        xpReward: 30,
        content: [
          { type: 'paragraph', text: 'AI alignment is the challenge of ensuring AI systems behave in accordance with human values and intentions. As AI becomes more capable, misaligned systems could cause harm at scale.' },
          { type: 'callout', variant: 'info', text: 'RLHF (Reinforcement Learning from Human Feedback) is a key technique used to align LLMs with human preferences. It is what makes ChatGPT helpful rather than merely predicting text.' },
          { type: 'keypoint', text: 'The alignment problem: how do we specify what we want well enough that a very capable system will pursue it safely?' },
        ]
      },
    ],
    quizId: 'quiz-ai-ethics',
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision',
    tagline: 'Teaching machines to see and understand images',
    category: 'computer-vision',
    difficulty: 'intermediate',
    estimatedMinutes: 25,
    icon: '👁️',
    color: '#ec4899',
    lessons: [
      {
        id: 'cv-intro',
        title: 'What is Computer Vision?',
        order: 1,
        xpReward: 30,
        content: [
          { type: 'paragraph', text: 'Computer Vision is a field of AI that trains computers to interpret and understand visual information from the world — images, videos, and camera feeds. It enables machines to identify objects, detect faces, read text, and understand scenes.' },
          { type: 'callout', variant: 'info', text: 'Applications: self-driving cars, medical imaging, facial recognition, augmented reality, quality control in manufacturing.' },
          { type: 'keypoint', text: 'The ImageNet competition (2010-2017) drove major advances in computer vision — AlexNet\'s 2012 win marked the start of the deep learning era.' },
        ]
      },
      {
        id: 'cv-cnns',
        title: 'Convolutional Neural Networks (CNNs)',
        order: 2,
        xpReward: 30,
        content: [
          { type: 'paragraph', text: 'CNNs are the dominant architecture for computer vision. They use convolutional layers to detect local patterns (edges, textures, shapes) and pooling layers to build spatial hierarchy.' },
          { type: 'heading', text: 'How Convolutions Work' },
          { type: 'paragraph', text: 'A convolution slides a small filter (kernel) over the image, computing a dot product at each position. Early layers detect edges, middle layers detect shapes, and deep layers detect high-level features like faces or cars.' },
          { type: 'keypoint', text: 'CNNs are translation-invariant: they can recognize a cat regardless of where it appears in the image.' },
        ]
      },
      {
        id: 'cv-tasks',
        title: 'Vision Tasks & Modern Architectures',
        order: 3,
        xpReward: 30,
        content: [
          { type: 'paragraph', text: 'Core CV tasks: Image classification (what is this?), Object detection (where are things?), Semantic segmentation (which pixels belong to which class?), Instance segmentation (individual object boundaries).' },
          { type: 'callout', variant: 'tip', text: 'Vision Transformers (ViT) have largely replaced CNNs at the frontier — they treat images as sequences of patches and apply transformer self-attention.' },
          { type: 'keypoint', text: 'Modern CV models like SAM (Segment Anything Model) can segment any object in any image with zero-shot generalization.' },
        ]
      },
    ],
    quizId: 'quiz-computer-vision',
  },
  {
    id: 'ai-tools',
    title: 'AI Tools & Frameworks',
    tagline: 'The ecosystem of modern AI development',
    category: 'tools-frameworks',
    difficulty: 'beginner',
    estimatedMinutes: 20,
    icon: '🛠️',
    color: '#ef4444',
    lessons: [
      {
        id: 'tools-overview',
        title: 'The AI Tooling Landscape',
        order: 1,
        xpReward: 30,
        content: [
          { type: 'paragraph', text: 'The AI ecosystem has a rich set of tools for every stage of the ML pipeline: data processing, model building, training, evaluation, deployment, and monitoring.' },
          { type: 'heading', text: 'Core Frameworks' },
          { type: 'paragraph', text: 'PyTorch (Meta) and TensorFlow (Google) are the two dominant deep learning frameworks. PyTorch dominates research; TensorFlow is widely used in production. Hugging Face provides pre-trained models and datasets.' },
          { type: 'keypoint', text: 'Most new AI research uses PyTorch. If you are learning, start with PyTorch.' },
        ]
      },
      {
        id: 'tools-data',
        title: 'Data Science & ML Libraries',
        order: 2,
        xpReward: 30,
        content: [
          { type: 'paragraph', text: 'Python is the language of AI/ML. Key libraries: NumPy (numerical computing), Pandas (data manipulation), Matplotlib/Seaborn (visualization), Scikit-learn (classical ML), and Jupyter (interactive notebooks).' },
          { type: 'callout', variant: 'tip', text: 'Hugging Face Transformers lets you use state-of-the-art models like BERT, GPT-2, and Llama with just a few lines of code.' },
          { type: 'keypoint', text: 'You do not need to build models from scratch. Hugging Face has thousands of pre-trained models ready to fine-tune.' },
        ]
      },
      {
        id: 'tools-apis',
        title: 'AI APIs & Platforms',
        order: 3,
        xpReward: 30,
        content: [
          { type: 'paragraph', text: 'For most applications, you do not need to train your own model. AI APIs let you call powerful models via HTTP. Key platforms: OpenAI (GPT-4, DALL-E), Anthropic (Claude), Google (Gemini), and AWS Bedrock.' },
          { type: 'heading', text: 'When to Use APIs vs Train' },
          { type: 'paragraph', text: 'Use APIs when: you need fast results, have limited compute, working on a standard task. Train/fine-tune when: you have specialized domain data, need data privacy, require lower latency, or want cost control at scale.' },
          { type: 'keypoint', text: 'The skill of the future: knowing how to orchestrate and prompt AI APIs, not just knowing how to train models.' },
        ]
      },
    ],
    quizId: 'quiz-ai-tools',
  },
]
