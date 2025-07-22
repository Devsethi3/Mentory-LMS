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

// Features Section
export const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Expert-Led Courses",
      description:
        "Learn from industry leaders with hands-on experience and proven track records in their fields.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Create learning paths for teams, track progress, and foster collaborative learning environments.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Detailed insights into learning patterns, completion rates, and skill development progress.",
    },
    {
      icon: Smartphone,
      title: "Mobile Learning",
      description:
        "Access courses anywhere, anytime with our responsive mobile platform and offline capabilities.",
    },
    {
      icon: Cloud,
      title: "Self-Hosted Control",
      description:
        "Full control over your data and customizations with our self-hosted deployment options.",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description:
        "Bank-level security with SSO integration, role-based access, and compliance certifications.",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything you need to
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}
              scale learning
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover powerful features designed to accelerate individual and
            team growth through expert-led education.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-6">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
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
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Tailored solutions for
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}
              every need
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Whether you're scaling a team, running an institution, or pursuing
            personal growth, we have the perfect solution.
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
              className="bg-card border border-border rounded-3xl p-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <solution.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
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
