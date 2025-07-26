import React from "react";
import { motion } from "motion/react";
import {
  BookOpen,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Download,
  BarChart3,
  Briefcase,
  GraduationCap,
  Building2,
  Award,
  Clock,
  Target,
  Lightbulb,
  Smartphone,
  Cloud,
  Lock,
} from "lucide-react";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Solutions Section
export const SolutionsSection = () => {
  const solutions = [
    {
      icon: Briefcase,
      title: "Corporate Training",
      description:
        "Upskill your workforce with customized learning paths and enterprise-grade analytics.",
      features: [
        "Custom Learning Paths",
        "Team Management",
        "Progress Tracking",
        "Compliance Reporting",
      ],
    },
    {
      icon: GraduationCap,
      title: "Educational Institutions",
      description:
        "Enhance traditional education with modern digital learning tools and resources.",
      features: [
        "Student Management",
        "Grade Tracking",
        "Course Catalog",
        "Parent Portals",
      ],
    },
    {
      icon: Target,
      title: "Individual Growth",
      description:
        "Personal development through expert-curated courses and skill assessments.",
      features: [
        "Personalized Recommendations",
        "Skill Assessments",
        "Certificates",
        "Mobile Learning",
      ],
    },
  ];

  return (
    <section className="pb-20 bg-background">
      <div className="container">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="lg:text-4xl text-3xl tracking-tighter font-geist bg-clip-text text-transparent mx-auto bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]">
            Precision Learning: Designed for Every Goal, Every Scale.
          </h2>
          <p className="lg:text-lg text-base mt-2 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Whether you're an individual charting a new career path, a team
            striving for collective excellence.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-card border border-border rounded p-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <solution.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  {solution.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {solution.description}
                </p>
              </div>

              <ul className="space-y-3">
                {solution.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-muted-foreground"
                  >
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
