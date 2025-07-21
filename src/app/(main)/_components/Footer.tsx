"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const footerLinks = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Blog", "Contact"],
  },
  {
    title: "Resources",
    links: ["Docs", "Guides", "API", "Support"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border-t border-muted text-muted-foreground"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and Social */}
        <div className="col-span-1 space-y-4">
          <Link href="/" className="text-xl font-bold text-primary">
            Mentory LMS
          </Link>
          <p className="text-sm text-muted-foreground">
            We craft modern web experiences that drive results.
          </p>
          <div className="flex gap-4 pt-2">
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5 hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-5 w-5 hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>

        {/* Footer Links */}
        {footerLinks.map((section) => (
          <div key={section.title} className="space-y-3">
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wide">
              {section.title}
            </h4>
            <ul className="space-y-2 text-sm">
              {section.links.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom section */}
      <div className="border-t border-muted text-xs text-muted text-center py-6 px-4">
        © {new Date().getFullYear()} YourAgency. All rights reserved.
      </div>
    </motion.footer>
  );
}
