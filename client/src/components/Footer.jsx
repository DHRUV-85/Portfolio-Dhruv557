import React from "react";
import { GitHub, LinkedIn, Mail } from "../icons"; // Adjust import as needed

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-12 bg-gradient-to-r from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <span className="font-semibold text-blue-600 dark:text-cyan-400">Your Name</span>
          <span className="mx-2 text-gray-400 dark:text-gray-600">|</span>
          <span className="text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
        <div className="flex gap-4">
          <a
            href="mailto:your@email.com"
            className="hover:text-blue-600 dark:hover:text-cyan-400 transition"
            aria-label="Email"
          >
            <Mail size={22} />
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-cyan-400 transition"
            aria-label="GitHub"
          >
            <GitHub size={22} />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-cyan-400 transition"
            aria-label="LinkedIn"
          >
            <LinkedIn size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
}