"use client";

import { useEffect, useRef, useState } from "react";
import {
  ExternalLink,
  GitHub,
  LinkedIn,
  Mail,
  Download,
  ArrowRight,
  Code,
  Palette,
  Zap,
  ChevronUp,
} from "../icons";
import TypeIt from "typeit-react";
import { useTheme } from "../contexts/ThemeContext";
import api from "../services/api";

const skills = [
  {
    name: "JavaScript",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 fill-amber-600 dark:fill-amber-400"
      >
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
      </svg>
    ),
  },
  {
    name: "React",
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 fill-cyan-600 dark:fill-cyan-400"
      >
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 fill-emerald-600 dark:fill-emerald-400"
      >
        <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 fill-blue-600 dark:fill-blue-400"
      >
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    color: "text-slate-800 dark:text-slate-300",
    bg: "bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 fill-slate-800 dark:fill-slate-300"
      >
        <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6017.4224 2.5008.5197.323.0441.8684.0369 1.1945-.0175.9827-.1641 1.9652-.4699 2.8223-.8789.47-.2238.871-.4893 1.378-.9123.0148-.0123.0216-.0066.0117.0095-.0398.0433-.381.4218-.876.9749-4.2249 4.7212-9.6753 7.5462-16.1244 8.3648l-.2267.0282-.0307-.0134c.0307-.0133.0341-.0167.0341-.0167C.5536 16.8765.0336 13.2794-.0002 9.7621-.0341 6.2446.6026 3.0422 2.3156 1.1044c.1671-.1889.3342-.3553.3342-.366.0-.0106.0175-.0212.0199-.0212-.0024.0014.0107-.0037.0163-.0036C4.7749.1568 7.8458.1556 12.0998.1556c4.6314 0 8.4722.0014 8.5226.0037l.0493.0023-.0001.0135c-.0001.0134-.0025.0264-.0053.0289-.0143.013-.0175.0212-.0175.0368-.0001.0218-.0142.0291-.0142.0291-.0024-.0137.0006-.0135.0024-.0136.0024.0001.0039.0001.0053-.0001.0014-.0001.0039-.0001.0053-.0001l.0226-.0035-.0026.0035c-.0026.0034-.0044.0067-.0044.0067-.0049.008-.008.0134-.008.0196 0 .0133.0027.0265.0046.0398.0023.016.0027.0265.0027.0398-.0001.0218-.0142.0291-.0142.0291 0 0 .0024.0014.0026.0037.0002.0023.0023.0063.0023.0063s.0011.0096.0011.0134c0 .0074-.0014.0148-.003.0222-.0016.0074-.0037.0148-.0037.0222 0 .0074.0014.0148.003.0222.0013.0058.0027.0108.0039.0162.0027.0121.0052.0242.0052.0363 0 .0121-.0025.0242-.0052.0363-.0012.0054-.0026.0104-.0039.0162-.0016.0074-.003.0148-.003.0222 0 .0074.0021.0148.0037.0222.0016.0074.003.0148.003.0222 0 .0038-.0011.0076-.0011.0134 0 .0059.0011.0097.0011.0134 0 .0074-.0014.0148-.0013.0222.0001.0071.0021.0141.0036.0211.0023.0105.0046.021.0046.0316 0 .0106-.0023.0211-.0046.0316-.0015.007-.0035.014-.0036.0211-.0001.0074.0013.0148.0013.0222 0 .0037-.0011.0075-.0011.0134 0 .0058.0011.0096.0011.0134 0 .0074-.0014.0148-.003.0222-.0016.0074-.003.0148-.003.0222 0 .0074.0021.0148.0037.0222.0016.0074.003.0148.003.0222 0 .0074-.0014.0148-.003.0222-.0013.0058-.0027.0108-.0039.0162-.0027.0121-.0052.0242-.0052.0363 0 .0121.0025.0242.0052.0363.0012.0054.0026.0104.0039.0162.0016.0074.003.0148.003.0222 0 .0074-.0021.0148-.0037.0222-.0016.0074-.003.0148-.003.0222 0 .0038.0011.0076.0011.0134 0 .0058-.0011.0096-.0011.0134 0 .0218.0142.0291.0142.0291z" />
      </svg>
    ),
  },
  {
    name: "MongoDB",
    color: "text-green-600 dark:text-green-400",
    bg: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 fill-green-600 dark:fill-green-400"
      >
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 fill-teal-600 dark:fill-teal-400"
      >
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
      </svg>
    ),
  },
];

export default function Home() {
  const { darkMode } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
        }
      });
    }, observerOptions);

    const elements = [
      heroRef.current,
      aboutRef.current,
      skillsRef.current,
      projectsRef.current,
      contactRef.current,
    ];
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle contact form input changes
  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      if (
        !contactForm.name.trim() ||
        !contactForm.email.trim() ||
        !contactForm.subject.trim() ||
        !contactForm.message.trim()
      ) {
        throw new Error("Please fill in all fields");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactForm.email)) {
        throw new Error("Please enter a valid email address");
      }

      const response = await api.post("/messages", {
        name: contactForm.name.trim(),
        email: contactForm.email.trim(),
        subject: contactForm.subject.trim(),
        message: contactForm.message.trim(),
      });

      if (response.data.success) {
        setSubmitStatus("success");
        setContactForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(response.data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await api.get("/projects");
        const data = response.data.data;
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Project carousel auto-rotation
  useEffect(() => {
    if (!projects.length) return;

    const featuredProjects = projects.filter((p) => p.featured);
    if (featuredProjects.length === 0) return;

    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % featuredProjects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [projects]);

  // Get unique categories from project tags
  const getUniqueCategories = () => {
    const allTags = projects.flatMap((project) => project.tags || []);
    const uniqueTags = [...new Set(allTags)];
    return ["All", ...uniqueTags];
  };

  const categories = getUniqueCategories();

  // Filter projects by category
  const filteredProjects =
    activeCategory === "All"
      ? projects.filter((p) => !p.featured)
      : projects.filter(
          (p) => !p.featured && p.tags && p.tags.includes(activeCategory)
        );

  // Featured projects
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-gray-900 dark:to-blue-950 text-gray-900 dark:text-gray-100 transition-all duration-500">
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .opacity-0 {
          opacity: 0;
        }

        .floating {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dark .gradient-text {
          background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-blue-500/25"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-4 pt-20 pb-16 opacity-0"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Profile Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative w-80 h-80 mx-auto lg:w-96 lg:h-96">
                {/* Animated background circles */}
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-spin"
                  style={{ animationDuration: "20s" }}
                ></div>
                <div
                  className="absolute inset-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-spin"
                  style={{
                    animationDuration: "15s",
                    animationDirection: "reverse",
                  }}
                ></div>

                {/* Profile image container */}
                <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                  <img
                    src="https://i.pinimg.com/736x/5c/6c/1c/5c6c1c7ad77e9ae20d997f89ba0e80db.jpg"
                    alt="Dhruv Soni - Full Stack Developer"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg floating">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg floating"
                  style={{ animationDelay: "2s" }}
                >
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div
                  className="absolute top-1/2 -left-8 w-12 h-12 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center shadow-lg floating"
                  style={{ animationDelay: "4s" }}
                >
                  <Palette className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="text-center lg:text-left order-1 lg:order-2">
              <div className="mb-8">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-blue-700 dark:text-blue-300 font-semibold text-sm mb-6">
                  👋 Welcome to my digital space
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  <span className="block mb-2 text-gray-900 dark:text-white">
                    Hello, I'm
                  </span>
                  <span className="gradient-text">
                    <TypeIt
                      options={{
                        strings: ["Dhruv Soni"],
                        speed: 100,
                        waitUntilVisible: true,
                        cursor: false,
                      }}
                    />
                  </span>
                </h1>
              </div>

              <div className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-300 mb-8 h-12">
                <TypeIt
                  options={{
                    strings: [
                      "Full Stack Developer",
                      "UI/UX Designer",
                      "Tech Innovator",
                      "Problem Solver",
                    ],
                    speed: 100,
                    breakLines: false,
                    loop: true,
                    waitUntilVisible: true,
                  }}
                />
              </div>

              <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Crafting exceptional digital experiences through innovative
                design and cutting-edge technology. Specializing in scalable web
                applications that drive business growth and user engagement.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-12">
                <a
                  href="#contact"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Let's Connect
                  <ArrowRight className="w-5 h-5" />
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-2 hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  Resume
                </a>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    50+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Projects
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    3+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Years Exp
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    98%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Satisfaction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        id="about"
        className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm opacity-0"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Passionate about creating digital solutions that make a difference
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
                  alt="Workspace"
                  className="w-full h-auto hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-6">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                <h3 className="text-2xl font-bold mb-6 gradient-text">
                  My Journey
                </h3>

                <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    My passion for technology ignited during my teenage years
                    when I built my first website. What began as curiosity has
                    evolved into a fulfilling career creating digital
                    experiences that solve real-world problems.
                  </p>

                  <p>
                    With expertise spanning modern web technologies, cloud
                    architecture, and user experience design, I bridge the gap
                    between technical complexity and user-friendly solutions.
                  </p>

                  <p>
                    Beyond coding, I'm deeply involved in the tech community,
                    contributing to open-source projects, mentoring aspiring
                    developers, and staying at the forefront of emerging
                    technologies.
                  </p>
                </div>

                {/* Skills preview */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    Core Expertise
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {["React", "Node.js", "TypeScript", "MongoDB", "AWS"].map(
                      (skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Quick links */}
              <div className="flex gap-4">
                <a
                  href="#skills"
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium text-center transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 shadow-lg"
                >
                  <Code className="w-5 h-5" />
                  View Skills
                </a>

                <a
                  href="#contact"
                  className="flex-1 px-6 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl font-medium text-center transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                >
                  <Mail className="w-5 h-5" />
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} id="skills" className="py-20 opacity-0">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              My Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Technologies and tools I work with
            </p>
          </div>

          {/* Skills grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`${skill.bg} p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm group`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${skill.color}`}>
                      {skill.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional skills */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-200">
              Also Experienced With
            </h3>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {["Docker", "Redux", "Python", "SQL", "Redis", "Java", "Php"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-all duration-300 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        ref={projectsRef}
        id="projects"
        className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm opacity-0"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Featured Work
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A showcase of projects that demonstrate my skills and passion for
              innovation
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            </div>
          ) : (
            <>
              {/* Featured projects carousel */}
              {featuredProjects.length > 0 && (
                <div className="mb-20">
                  <h3 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
                    Featured Projects
                  </h3>

                  <div className="relative">
                    <div className="overflow-hidden rounded-2xl">
                      <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{
                          transform: `translateX(-${activeProject * 100}%)`,
                        }}
                      >
                        {featuredProjects.map((project) => (
                          <div
                            key={project._id}
                            className="w-full flex-shrink-0"
                          >
                            <div className="grid lg:grid-cols-2 gap-8 items-center p-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                              {/* Project image */}
                              <div className="relative group">
                                <div className="relative overflow-hidden rounded-xl">
                                  <img
                                    src={
                                      project.image?.url ||
                                      "/placeholder.svg?height=400&width=600"
                                    }
                                    alt={project.title}
                                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                </div>

                                {/* Overlay buttons */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 rounded-xl">
                                  <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-colors duration-300 hover:scale-105"
                                  >
                                    View Live
                                  </a>
                                </div>
                              </div>

                              {/* Project details */}
                              <div className="space-y-6">
                                <div>
                                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                                    {project.category || "Project"}
                                  </div>
                                  <h4 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                                    {project.title}
                                  </h4>
                                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {project.description}
                                  </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                  {project.tags &&
                                    project.tags.map((tag, i) => (
                                      <span
                                        key={i}
                                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                </div>

                                <div className="flex gap-4 pt-4">
                                  <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                                  >
                                    <ExternalLink className="w-5 h-5" />
                                    View Project
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Carousel indicators */}
                    {featuredProjects.length > 1 && (
                      <div className="flex justify-center gap-3 mt-8">
                        {featuredProjects.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveProject(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              activeProject === index
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 scale-125"
                                : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Project category filter */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
                  {featuredProjects.length > 0
                    ? "More Projects"
                    : "My Projects"}
                </h3>

                {/* Category filters */}
                {categories.length > 1 && (
                  <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                          activeCategory === category
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}

                {/* All projects grid */}
                {filteredProjects.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                      <div
                        key={project._id}
                        className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50"
                      >
                        {/* Project image */}
                        <div className="relative overflow-hidden h-48">
                          <img
                            src={
                              project.image?.url ||
                              "/placeholder.svg?height=400&width=600"
                            }
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="flex gap-3">
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors duration-300 hover:scale-110"
                                aria-label="View project"
                              >
                                <ExternalLink className="w-5 h-5 text-gray-900" />
                              </a>
                              <a
                                href={project.github || project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors duration-300 hover:scale-110"
                                aria-label="View source code"
                              >
                                <GitHub className="w-5 h-5 text-white" />
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Project content */}
                        <div className="p-6">
                          <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                            {project.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags &&
                              project.tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                          </div>

                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                          >
                            View Project
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">
                      No projects available in this category.
                    </p>
                  </div>
                )}
              </div>

              {/* View all projects CTA */}
              <div className="text-center mt-16">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <GitHub className="w-6 h-6" />
                  View All Projects on GitHub
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="py-20 opacity-0">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Let's Connect
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Ready to bring your next project to life? Let's discuss how we can
              work together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact form */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Send me a message
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  I'll get back to you within 24 hours.
                </p>
              </div>

              {/* Success/Error Messages */}
              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-green-700 dark:text-green-300 font-medium">
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <p className="text-red-700 dark:text-red-300 font-medium">
                      Failed to send message. Please try again.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 disabled:opacity-50"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 disabled:opacity-50"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 disabled:opacity-50"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactInputChange}
                    required
                    disabled={isSubmitting}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 resize-none disabled:opacity-50"
                    placeholder="Tell me about your project or just say hello..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:scale-105 shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact info and social links */}
            <div className="space-y-8">
              {/* Contact methods */}
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Get in Touch
                </h3>

                <div className="space-y-6">
                  <a
                    href="mailto:sonidhruv557@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        Email
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        sonidhruv557@gmail.com
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com/in/dhruvsoni"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-700 to-blue-600 rounded-xl flex items-center justify-center">
                      <LinkedIn className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        LinkedIn
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        Connect with me
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://github.com/dhruvsoni"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-600 dark:to-gray-500 rounded-xl flex items-center justify-center">
                      <GitHub className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        GitHub
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        View my code
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Availability status */}
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Current Status
                </h3>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                    Available for new projects
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  I'm currently accepting new freelance projects and would love
                  to help bring your ideas to life. Let's discuss how we can
                  work together to create something amazing.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Response time: Within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Project start: 1-2 weeks</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Free consultation available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* Logo and brand */}
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">DS</span>
            </div>
            <h3 className="text-2xl font-bold mb-2 gradient-text">
              Dhruv Soni
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Full Stack Developer crafting exceptional digital experiences with
              passion and precision.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm">
            <a
              href="#about"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium"
            >
              About
            </a>
            <a
              href="#skills"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium"
            >
              Contact
            </a>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="mailto:sonidhruv557@gmail.com"
              className="w-12 h-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-xl flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </a>
            <a
              href="https://github.com/dhruvsoni"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-xl flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <GitHub className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </a>
            <a
              href="https://linkedin.com/in/dhruvsoni"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-xl flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <LinkedIn className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </a>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-8">
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              © {new Date().getFullYear()} Dhruv Soni. Crafted with ❤️ and lots
              of coffee.
            </p>
            <p className="text-gray-400 dark:text-gray-600 text-xs mt-2">
              All rights reserved. Made with React, Tailwind CSS, and modern web
              technologies.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
