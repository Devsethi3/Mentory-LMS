"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Shield,
  Award,
  Globe,
} from "lucide-react";
import Image from "next/image";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { name: "Course Builder", href: "/course-builder" },
      { name: "Analytics Dashboard", href: "/analytics" },
      { name: "Mobile App", href: "/mobile" },
      { name: "Integrations", href: "/integrations" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { name: "Enterprise", href: "/enterprise" },
      { name: "Education", href: "/education" },
      { name: "Corporate Training", href: "/corporate" },
      { name: "Certification", href: "/certification" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/api" },
      { name: "Help Center", href: "/help" },
      { name: "Community", href: "/community" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press Kit", href: "/press" },
      { name: "Contact Sales", href: "/contact" },
    ],
  },
];

const certifications = [
  { name: "SOC 2 Type II", icon: Shield },
  { name: "ISO 27001", icon: Award },
  { name: "GDPR Compliant", icon: Globe },
];

const contactInfo = [
  {
    icon: Mail,
    text: "enterprise@mentory.com",
    href: "mailto:enterprise@mentory.com",
  },
  {
    icon: Phone,
    text: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    text: "San Francisco, CA",
    href: "https://maps.google.com",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      // className="relative bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-slate-800 dark:to-slate-950 text-slate-700 dark:text-slate-300 overflow-hidden border-t"
      className="relative bg-gradient-to-br from-primary/5 overflow-hidden border-t"
    >
      {/* Background Pattern - Adaptive to theme */}

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-4">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link href="/" className="inline-flex items-center group gap-3">
                <div className="relative">
                  <Image
                    src="/logo.svg"
                    width={45}
                    height={45}
                    alt="Mentory LMS logo"
                    className="group-hover:scale-105 transition-transform duration-200"
                  />
                  {/* Glow effect for dark mode */}
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md opacity-0 dark:opacity-100 group-hover:opacity-30 transition-opacity duration-300" />
                </div>
                <span className="text-2xl font-bold">Mentory LMS</span>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-md"
            >
              Empowering organizations worldwide with cutting-edge learning
              management solutions. Transform your training programs with our
              enterprise-grade platform.
            </motion.p>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-3"
            >
              {contactInfo.map((contact, index) => (
                <Link
                  key={index}
                  href={contact.href}
                  className="flex items-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group"
                >
                  <contact.icon className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm">{contact.text}</span>
                  <ArrowUpRight className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinks.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + sectionIndex * 0.1 }}
                className="space-y-4"
              >
                <h4 className="text-slate-900 dark:text-white font-semibold text-sm uppercase tracking-wider">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.2 + linkIndex * 0.05,
                      }}
                    >
                      <Link
                        href={link.href}
                        className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 text-sm group inline-flex items-center"
                      >
                        {link.name}
                        <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="border-t border-slate-200 dark:border-slate-800 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
              <span>© {currentYear} Mentory LMS. All rights reserved.</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
              <span>Made with</span>
              <span className="text-red-500 animate-pulse">❤️</span>
              <span>for learners worldwide</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
