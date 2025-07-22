import { motion } from "motion/react";
import { BookOpen, Users, Trophy, TrendingUp, Star, Award } from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";

const mentoryCards = [
  {
    icon: <BookOpen className="size-4 text-primary" />,
    title: "Expert-Led Courses",
    description: "Learn from industry professionals",
    date: "1000+ Courses",
    iconClassName: "text-primary",
    titleClassName: "text-foreground",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Users className="size-4 text-secondary" />,
    title: "Team Learning",
    description: "Scale your organization's growth",
    date: "50k+ Teams",
    iconClassName: "text-secondary",
    titleClassName: "text-foreground",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Trophy className="size-4 text-accent" />,
    title: "Certification Ready",
    description: "Earn industry-recognized certificates",
    date: "Verified",
    iconClassName: "text-accent",
    titleClassName: "text-foreground",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];

const DisplayCardsSection = () => {
  return (
    <div className="bg-background min-h-[70vh] pb-24 overflow-x-hidden">
      {/* Main Content Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Column - Content */}
          <motion.div
            className="w-full lg:w-[45%] space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Transform Your Learning Experience
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover a comprehensive learning management system that empowers
              organizations and individuals to unlock their potential through
              expert-guided education.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                <TrendingUp className="size-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">
                    98% Success Rate
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Course completion
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                <Star className="size-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">4.9/5 Rating</p>
                  <p className="text-sm text-muted-foreground">
                    User satisfaction
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                <Award className="size-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">500+ Experts</p>
                  <p className="text-sm text-muted-foreground">
                    Industry professionals
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                <BookOpen className="size-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">24/7 Access</p>
                  <p className="text-sm text-muted-foreground">Learn anytime</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Display Cards */}
          <motion.div
            className="w-full lg:w-[55%]"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <DisplayCards cards={mentoryCards} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DisplayCardsSection;
