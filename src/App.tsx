/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Wind, 
  BookOpen, 
  Zap, 
  Settings, 
  ChevronRight, 
  ExternalLink,
  Github,
  Twitter,
  Send,
  Heart,
  Brain,
  Calendar,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

// Types
interface ProblemSolution {
  id: string;
  title: string;
  shortDesc: string;
  fullExplanation: string;
  whyItHappens: string;
  solution: string;
  steps: string[];
  link: string;
  icon: any;
  color: string;
}

const mentalResources: ProblemSolution[] = [
  {
    id: "stress",
    title: "Feeling stressed or overwhelmed",
    shortDesc: "When pressure builds up and you feel like you can't keep up.",
    fullExplanation: "Stress is your body's reaction to help you deal with pressure. It's often referred to as the 'fight or flight' response. While some stress is normal, chronic stress can have significant effects on your health and well-being.",
    whyItHappens: "It happens when we perceive that the demands placed on us exceed our ability to cope. Your brain releases hormones like cortisol and adrenaline, preparing your body for immediate action.",
    solution: "Simple breathing exercises and relaxation techniques",
    steps: [
      "Find a quiet place to sit or lie down comfortably.",
      "Close your eyes and take a deep breath in through your nose for 4 seconds.",
      "Hold your breath gently for a moment.",
      "Exhale slowly through your mouth for 6 seconds.",
      "Repeat this cycle for 2-5 minutes."
    ],
    link: "https://www.headspace.com/meditation/breathing-exercises",
    icon: Wind,
    color: "from-blue-400 to-blue-600"
  },
  {
    id: "overthinking",
    title: "Overthinking too much",
    shortDesc: "When your mind gets stuck in a loop of repetitive thoughts.",
    fullExplanation: "Overthinking involves dwelling on the same thoughts or worries over and over again, often about the past or the future, preventing you from taking action in the present.",
    whyItHappens: "The brain is naturally wired to solve problems and anticipate threats. Sometimes this process gets stuck in a loop because we are trying to control things that are actually outside our control.",
    solution: "Journaling to clear thoughts and reduce mental pressure",
    steps: [
      "Set a timer for 10 minutes.",
      "Write down every single thought currently in your head, no matter how small.",
      "Don't worry about grammar, spelling, or making sense.",
      "Once the timer is up, look at the list and circle things you can actually influence today.",
      "Physically close the journal to signal to your brain that the thinking time is done."
    ],
    link: "https://dayoneapp.com/",
    icon: Brain,
    color: "from-purple-400 to-purple-600"
  },
  {
    id: "motivation",
    title: "Lack of motivation",
    shortDesc: "Feeling stuck and unable to start even simple tasks.",
    fullExplanation: "Motivation isn't just about 'willpower'. It's often linked to how our brain processes rewards and the perceived difficulty of a task compared to its value.",
    whyItHappens: "When tasks feel too big or unrewarding, our dopamine levels remain low. Fear of failure or feeling overwhelmed can also lead to a complete freeze in action.",
    solution: "Daily motivational quotes and small achievable goals",
    steps: [
      "Break your biggest goal into the smallest possible first step (e.g., just opening the document).",
      "Focus ONLY on that 5-minute task.",
      "Reward yourself immediately after completing it.",
      "Read one inspiring quote to shift your mental perspective.",
      "Commit to one 'win' per day to build momentum."
    ],
    link: "https://www.brainyquote.com/topics/motivational-quotes",
    icon: Sparkles,
    color: "from-yellow-400 to-orange-500"
  },
  {
    id: "routine",
    title: "Poor daily routine",
    shortDesc: "Feeling disorganized and lacking consistency in your life.",
    fullExplanation: "A lack of structure can lead to decision fatigue, where you exhaust your mental energy just trying to decide what to do next.",
    whyItHappens: "Our brains love patterns. Without them, we spend extra energy navigating through each day, which can lead to exhaustion and a feeling of aimlessness.",
    solution: "Simple habit tracking to build consistency",
    steps: [
      "Choose just one habit you want to start (e.g., drinking water first thing in the morning).",
      "Use a simple tracker to mark your progress daily.",
      "Focus on 'never missing twice' rather than being perfect.",
      "Anchor your new habit to an existing one (e.g., habit stacking).",
      "Start small—consistency is more important than intensity."
    ],
    link: "https://habitica.com/",
    icon: Calendar,
    color: "from-green-400 to-emerald-600"
  },
  {
    id: "calm-down",
    title: "Difficulty calming down quickly",
    shortDesc: "When anxiety or anger spikes and you need instant relief.",
    fullExplanation: "Emotional spikes can be physically intense, causing rapid heart rate and shallow breathing that reinforces the emotional state.",
    whyItHappens: "The amygdala (the brain's emotional center) can trigger an 'emotional hijack,' temporarily bypassing the logical part of your brain.",
    solution: "Quick breathing tool for instant calm",
    steps: [
      "Physically move to a different space if possible.",
      "Use a visual pacer to synchronize your breath.",
      "Focus your attention entirely on the sensation of air moving in and out.",
      "Label the emotion you're feeling to dampen the amygdala response.",
      "Splash cold water on your face to trigger the mammalian dive reflex for instant calming."
    ],
    link: "https://xhalr.com/",
    icon: Zap,
    color: "from-red-400 to-pink-600"
  },
  {
    id: "mentally-tired",
    title: "Feeling mentally tired",
    shortDesc: "Cognitive exhaustion after a long period of focus or stress.",
    fullExplanation: "Mental fatigue is a state of tiredness that results from prolonged periods of demanding cognitive activity.",
    whyItHappens: "Just like muscles, our brain's resources for self-control and focus are finite. When we use them up without rest, we experience 'brain fog' and irritability.",
    solution: "Mindfulness and short guided meditation",
    steps: [
      "Disconnect from all digital screens for 15 minutes.",
      "Gently close your eyes and bring your focus to your physical senses.",
      "Notice three sounds you can hear in the distance.",
      "Notice the feeling of your body touching the chair or floor.",
      "Allow thoughts to pass by like clouds without judging or engaging with them."
    ],
    link: "https://www.mindful.org/meditation/mindfulness-getting-started/",
    icon: Heart,
    color: "from-indigo-400 to-indigo-600"
  }
];

function AdUnit({ slot, className = "" }: { slot: string, className?: string }) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Ads might be blocked or failing to load
    }
  }, []);

  return (
    <div className={`flex justify-center w-full overflow-hidden max-w-7xl mx-auto px-6 py-6 ${className}`}>
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-7508765483045871"
           data-ad-slot={slot}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'detail'>('home');
  const [selectedProblem, setSelectedProblem] = useState<ProblemSolution | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleLearnMore = (problem: ProblemSolution) => {
    setSelectedProblem(problem);
    setCurrentPage('detail');
  };

  const handleBack = () => {
    setCurrentPage('home');
    setSelectedProblem(null);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-linear-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] overflow-x-hidden">
      {/* Background Orbs */}
      <div className="orb w-[400px] h-[400px] bg-blue-500/10 -top-[100px] -left-[100px]" />
      <div className="orb w-[300px] h-[300px] bg-purple-500/10 bottom-[100px] -right-[50px]" />
      <div className="orb w-[200px] h-[200px] bg-blue-400/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Header */}
      <header className="sticky top-0 z-50 glass px-6 py-4 grid grid-cols-3 items-center h-20 shadow-2xl">
        {/* Left: Menu Button */}
        <div className="flex justify-start">
          <button 
            className="text-white hover:text-blue-400 transition-colors p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Center: App Title/Logo */}
        <div 
          className="flex items-center justify-center gap-3 cursor-pointer group"
          onClick={() => setCurrentPage('home')}
        >
          <div className="w-8 h-8 rounded-lg btn-grad shadow-lg shadow-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Brain className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-display font-black tracking-tighter uppercase">MindEase</span>
        </div>
        
        {/* Right: Analytics Button */}
        <div className="flex justify-end">
          <a 
            href="https://analytics.vgdh.io/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-grad px-4 py-2 md:px-6 md:py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] md:text-xs shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all flex items-center gap-2 glow"
          >
            Analytics <Zap size={14} className="hidden sm:inline" />
          </a>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#020617]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-12 md:hidden"
          >
            <button 
              onClick={() => {
                setCurrentPage('home');
                setIsMenuOpen(false);
              }} 
              className="text-3xl font-black uppercase tracking-tighter hover:text-blue-400 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => {
                setCurrentPage('home');
                setIsMenuOpen(false);
                setTimeout(() => {
                  document.getElementById('problem-grid')?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              }} 
              className="text-3xl font-black uppercase tracking-tighter hover:text-blue-400 transition-colors"
            >
              Exercises
            </button>
            <button 
              onClick={() => {
                setCurrentPage('home');
                setIsMenuOpen(false);
                setTimeout(() => {
                  document.getElementById('problem-grid')?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              }} 
              className="text-3xl font-black uppercase tracking-tighter hover:text-blue-400 transition-colors"
            >
              Resources
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {currentPage === 'home' ? (
          <div id="home-page" className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 lg:gap-24">
            {/* Left Section: Hero */}
            <section className="lg:w-[320px] flex flex-col justify-between py-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6">
                    Take Care of<br /><span className="text-blue-400">Your Mind</span>
                  </h1>
                  <p className="text-sm md:text-base text-muted leading-relaxed max-w-sm">
                    Stress, overthinking, and daily struggles are part of life. 
                    We provide practical tools to help you navigate them with ease and resilience.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    const el = document.getElementById('problem-grid');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-grad px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 w-max"
                >
                  Start Now
                </button>
              </motion.div>

              {/* Sidebar Ad Unit */}
              <div className="mt-12 hidden lg:block">
                <AdUnit slot="7775553331" className="!px-0" />
              </div>
            </section>

            {/* Right Section: Problem & Solution Grid */}
            <section id="problem-grid" className="flex-1 scroll-mt-24">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 h-full">
                {mentalResources.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProblemCard 
                      resource={item} 
                      onLearnMore={() => handleLearnMore(item)} 
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div id="detail-page" className="max-w-4xl mx-auto px-6 py-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to home
              </button>

              <div className={`w-20 h-20 rounded-2xl bg-linear-to-br ${selectedProblem?.color} flex items-center justify-center mb-8 glow`}>
                {selectedProblem && <selectedProblem.icon className="text-white w-10 h-10" />}
              </div>

              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                {selectedProblem?.title}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
                <div className="md:col-span-2 space-y-12">
                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-calm-soft-blue">Full Explanation</h2>
                    <p className="text-lg text-white/80 leading-relaxed">
                      {selectedProblem?.fullExplanation}
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-calm-purple">Why it happens</h2>
                    <p className="text-lg text-white/80 leading-relaxed">
                      {selectedProblem?.whyItHappens}
                    </p>
                  </section>

                  <AdUnit slot="6664442220" className="!px-0" />

                  <section className="glass rounded-3xl p-8 border-l-4 border-l-calm-accent">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      Your Step-by-Step Guide
                    </h2>
                    <div className="space-y-6">
                      {selectedProblem?.steps.map((step, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-calm-accent">
                            {i + 1}
                          </div>
                          <p className="text-white/80 pt-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="space-y-6">
                  <div className="glass rounded-3xl p-6 sticky top-32">
                    <h3 className="text-xl font-bold mb-4">Recommended Tool</h3>
                    <p className="text-white/60 mb-6">
                      {selectedProblem?.solution}
                    </p>
                    <a 
                      href={selectedProblem?.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-white text-calm-dark hover:bg-white/90 px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                      Try Now <ExternalLink size={18} />
                    </a>
                    
                    <div className="mt-8 pt-8 border-t border-white/10">
                      <p className="text-sm text-white/40 italic">
                        "Your mental health is a priority. Your happiness is an essential. Your self-care is a necessity."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="h-20 border-t border-white/10 mt-20 flex flex-col md:flex-row justify-between items-center px-8 text-[11px] text-muted bg-[#0f172a]/50">
        <div className="flex gap-6">
          <span>&copy; 2026 MindEase Wellness</span>
          <span className="hover:text-blue-300 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-blue-300 cursor-pointer">Terms of Use</span>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-center mt-4 md:mt-0">
          <span>Telegram: <span className="text-white">@Getverse</span></span>
          <span>X: <span className="text-white">@VerseEcosystem</span></span>
          <div className="flex gap-3 ml-0 md:ml-4">
            <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-500/20 transition-colors">
              <Twitter className="w-3 h-3" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProblemCard({ resource, onLearnMore }: { resource: ProblemSolution, onLearnMore: () => void }) {
  return (
    <div className="glass p-8 rounded-[2.5rem] flex flex-col justify-between h-full group border-2">
      <div className="space-y-5">
        <h4 className="text-blue-400 font-black text-sm uppercase tracking-[0.2em]">{resource.id}</h4>
        <p className="text-base font-medium leading-relaxed text-white/90 group-hover:text-white transition-colors">
          {resource.shortDesc}
        </p>
      </div>
      
      <div className="flex gap-4 mt-10">
        <button 
          onClick={onLearnMore}
          className="flex-1 py-3.5 glass rounded-2xl hover:bg-white/10 transition-all font-black uppercase tracking-widest text-xs border-2 border-white/20"
        >
          Learn More
        </button>
        <a 
          href={resource.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 text-center py-3.5 btn-grad rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-1 shadow-xl"
        >
          Try Now
        </a>
      </div>
    </div>
  );
}
