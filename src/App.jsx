import { useState, useEffect, useRef } from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";
import { FaPepperHot, FaStar, FaRupeeSign, FaBolt, FaUsers, FaUtensils } from "react-icons/fa";
import { GiChicken, GiSheep, GiFishCooked, GiChickenLeg, GiShrimp, GiCheeseWedge } from "react-icons/gi";

const NAV_LINKS = ["Home", "About", "Menu", "Gallery", "Reviews", "Contact"];
const SIGNATURE_DISHES = [
  {
    name: "Chicken Dum Biryani",
    desc: "Slow-cooked basmati rice with tender chicken, saffron & whole spices.",
    image: "./Dumbiryani.png",
    tag: "Bestseller",
    tagColor: "text-black-700 bg-red-700",
    Icon: GiChicken
  },
  {
    name: "Mutton Biryani",
    desc: "Juicy mutton dum-cooked with hand-ground masalas in rich, royal gravy.",
    image: "./MuttonBiryani.png",
    tag: "Must Try",
    tagColor: "text-black-700 bg-red-700",
    Icon: GiSheep
  },
  {
    name: "Apollo Fish",
    desc: "Crispy fried fish tossed in spicy Andhra masala — a legendary starter.",
    image: "./ApolloFish.png",
    tag: "Andhra Special",
    tagColor: "text-black-600 bg-red-700",
    Icon: GiFishCooked
  },
  {
    name: "Chicken 65",
    desc: "Deep-fried marinated chicken in bold red spices & curry leaves.",
    image: "./Chicken65.png",
    tag: "All-Time Fav",
    tagColor: "text-black-600 bg-red-700",
    Icon: GiChickenLeg
  },
  {
    name: "Prawns Fry",
    desc: "Fresh prawns tossed with coastal spices, perfectly crisped & aromatic.",
    image: "./PrawnsFry.png",
    tag: "Coastal Special",
    tagColor: "text-black-600 bg-red-700",
    Icon: GiShrimp
  },
  {
    name: "Paneer Tikka",
    desc: "Smoky grilled cottage cheese with bell peppers & mint chutney.",
    image: "./PaneerTikka.png",
    tag: "Veg Favourite",
    tagColor: "text-black-600 bg-green-600",
    Icon: GiCheeseWedge
  }
];
const MENU_CATEGORIES = [
  {
    cat: "Starters", icon: "🔥",
    items: [
      { name: "Veg Manchuria", price: "₹120", type: "veg" },
      { name: "Paneer 65", price: "₹160", type: "veg" },
      { name: "Mushroom Fry", price: "₹140", type: "veg" },
      { name: "Chicken 65", price: "₹180", type: "nonveg" },
      { name: "Apollo Fish", price: "₹200", type: "nonveg" },
      { name: "Egg Fry", price: "₹100", type: "nonveg" },
    ],
  },
  {
    cat: "Biryani Specials", icon: "🍛",
    items: [
      { name: "Veg Biryani", price: "₹130", type: "veg" },
      { name: "Egg Biryani", price: "₹150", type: "nonveg" },
      { name: "Chicken Dum Biryani", price: "₹180", type: "nonveg" },
      { name: "Mutton Biryani", price: "₹240", type: "nonveg" },
      { name: "Prawns Biryani", price: "₹260", type: "nonveg" },
      { name: "Special Family Biryani", price: "₹480", type: "nonveg" },
    ],
  },
  {
    cat: "Seafood Specials", icon: "🦞",
    items: [
      { name: "Prawns Fry", price: "₹240", type: "nonveg" },
      { name: "Fish Curry", price: "₹160", type: "nonveg" },
      { name: "Crab Masala", price: "₹280", type: "nonveg" },
      { name: "Royyala Vepudu", price: "₹260", type: "nonveg" },
      { name: "Fish Fry (Andhra Style)", price: "₹180", type: "nonveg" },
      { name: "Chepala Pulusu", price: "₹170", type: "nonveg" },
    ],
  },
  {
    cat: "Chinese", icon: "🥡",
    items: [
      { name: "Veg Fried Rice", price: "₹110", type: "veg" },
      { name: "Veg Hakka Noodles", price: "₹110", type: "veg" },
      { name: "Chicken Fried Rice", price: "₹150", type: "nonveg" },
      { name: "Egg Noodles", price: "₹140", type: "nonveg" },
      { name: "Veg Spring Rolls", price: "₹120", type: "veg" },
      { name: "Chicken Chilly", price: "₹180", type: "nonveg" },
    ],
  },
];

const REVIEWS = [
  { name: "Ravi Kumar", loc: "Kakinada", text: "Best biryani in Kakinada! The chicken dum biryani is outstanding — perfectly cooked, great aroma, and generous portions. Worth every rupee!", stars: 5, init: "RK" },
  { name: "Lakshmi Devi", loc: "Sriram Nagar", text: "We come here every Sunday as a family. The variety is amazing — something for everyone including kids. Affordable and tasty. Highly recommended!", stars: 5, init: "LD" },
  { name: "Suresh Babu", loc: "Kakinada", text: "Apollo fish and prawns fry are absolute fire! The Andhra spice level is perfect. Quick service and hygienic kitchen. Great experience overall.", stars: 5, init: "SB" },
  { name: "Priya Reddy", loc: "Peddapuram", text: "Visited for a group lunch. The family biryani was superb and the Chinese starters were delicious. Good quantity and quality at very affordable prices!", stars: 4, init: "PR" },
  { name: "Mohammad Farooq", loc: "Kakinada", text: "The mutton biryani here is on another level. Rich gravy, tender meat, and authentic Andhra masalas. This is my go-to spot whenever I'm craving biryani.", stars: 5, init: "MF" },
];

const WHY_CHOOSE = [
  {
    icon: FaPepperHot,
    title: "Authentic Andhra Flavors",
    desc: "Hand-ground masalas and traditional recipes passed down through generations."
  },
  {
    icon: FaStar,
    title: "Hygienic Kitchen",
    desc: "Stringent cleanliness standards with fresh ingredients sourced daily."
  },
  {
    icon: FaRupeeSign,
    title: "Affordable Pricing",
    desc: "Restaurant-quality meals at prices that every family can enjoy."
  },
  {
    icon: FaBolt,
    title: "Quick Service",
    desc: "Efficient service ensuring your food arrives hot and fresh, every time."
  },
  {
    icon: FaUsers,
    title: "Family-Friendly",
    desc: "A warm, welcoming atmosphere perfect for families and large groups."
  },
  {
    icon: FaUtensils,
    title: "Generous Portions",
    desc: "Big portions that satisfy — because good food should never leave you hungry."
  },
];

const GALLERY_ITEMS = [
  { image: "./Dumbiryani.png", label: "Dum Biryani" },
  { image: "./PrawnsFry.png", label: "Prawns Fry" },
  { image: "./ApolloFish.png", label: "Apollo Fish" },
  { image: "./Chicken65.png", label: "Chicken 65" },
  { image: "./MuttonBiryani.png", bg: "from-orange-950 to-stone-950", label: "Mutton Biryani" },
  { image: "./PaneerTikka.png", bg: "from-green-950 to-stone-950", label: "Paneer Tikka" },
  { image: "./CrabMasala.png", bg: "from-rose-950 to-stone-950", label: "Crab Masala" },
  { image: "./Noodles.png", bg: "from-blue-950 to-stone-950", label: "Noodles" },
  { image: "./FreshIngredients.png", bg: "from-emerald-950 to-stone-950", label: "Fresh Ingredients" },
];

function useScrollAnimation() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function AnimSection({ children, className = "", delay = 0 }) {
  const [ref, vis] = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [menuCat, setMenuCat] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", nameError: "", phone: "", phoneError: "", guests: "", date: "", time: "" });
  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", phone: "", guests: "2", date: "", time: "" });
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  return (
    <div className="font-serif bg-stone-950 text-amber-100 min-h-screen overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Nunito:wght@300;400;600;700&display=swap');
        .playfair { font-family: 'Playfair Display', serif; }
        .nunito { font-family: 'Nunito', sans-serif; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        .float { animation: float 4s ease-in-out infinite; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1c1008; }
        ::-webkit-scrollbar-thumb { background: #d4a017; border-radius: 3px; }
        .gold-text { background: linear-gradient(135deg, #d4a017, #f0c040, #c97c2e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .section-divider { height:2px; background:linear-gradient(90deg,transparent,#d4a017,transparent); width:60%; margin:0 auto; }
        input, select { background:#1a1308; border:1px solid #3a2a14; color:#f5e6c8; font-family:'Nunito',sans-serif; border-radius:8px; padding:12px 16px; width:100%; outline:none; transition:border-color 0.3s; font-size:14px; }
        input:focus, select:focus { border-color:#d4a017; }
        input::placeholder { color:#7a6040; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-stone-950/90 backdrop-blur-xl border-b border-amber-500/20 shadow-lg shadow-black/30 py-3"
        : "bg-transparent py-5"
        }`} >

        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="cursor-pointer flex items-center gap-3" onClick={() => scrollTo("home")}>
            <div className=" text-3xl"><img src="/Amrutham.png" alt="Amrutham" className="w-12 h-12" /></div>
            <div className="flex flex-col leading-tight">
              <span className="playfair text-amber-400 text-2xl font-black">
                AMRUTHAM
              </span>
              <span className="nunito text-white text-xs tracking-widest uppercase -mt-1">
                Family Restaurant
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase())}
                className="nunito text-amber-300/80 hover:text-amber-300 text-sm font-semibold tracking-widest uppercase transition-colors duration-300 relative group"
              >
                {l}
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="nunito bg-gradient-to-r from-amber-500 to-amber-700 text-stone-900 font-bold text-sm px-6 py-2.5 rounded-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
            >
              Reserve Table
            </button>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="md:hidden border border-amber-500 rounded-lg px-3 py-2 text-amber-500 text-xl"
          >
            {navOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {
          navOpen && (
            <div className="md:hidden bg-stone-900 border-t border-amber-900/40 px-6 py-4">
              {NAV_LINKS.map((l) => (
                <div
                  key={l}
                  onClick={() => scrollTo(l.toLowerCase())}
                  className="nunito text-amber-300/70 font-semibold tracking-widest uppercase text-sm py-3 border-b border-stone-800 cursor-pointer hover:text-amber-400 transition-colors"
                >
                  {l}
                </div>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="nunito mt-4 w-full bg-gradient-to-r from-amber-500 to-amber-700 text-stone-900 font-bold text-sm py-3 rounded-full"
              >
                Reserve Table
              </button>
            </div>
          )
        }
      </nav >

      {/* ── HERO ── */}
      <section
        id="home"
        className="relative h-lvh flex items-center justify-center overflow-visible pt-20"
      >
        {/* Background Image */}
        <img
          src="./Hero.png"
          alt="Amrutham"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay (IMPORTANT) */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Optional Gradient Overlay for Premium Look */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>

        {/* Content */}
        <div className="text-center max-w-3xl px-6 relative z-10 w-full">
          <div className="nunito text-amber-400 text-xs tracking-[0.3em] uppercase mb-5 opacity-90">
            ✦ Since Kakinada ✦
          </div>

          <h1 className=" text-4xl sm:text-2xl md:text-6xl font-black leading-tight p-3 w-full">
            <span className="text-amber-50">అమృతం </span>
            <span className="gold-text p-6 mb-10">ఫ్యామిలీ</span>
            <br />
            <span className="text-amber-50 text-2xl mt-5 sm:text-3xl md:text-4xl">రెస్టారెంట్</span>
          </h1>

          <p className="nunito text-lg text-amber-300/80 mb-3">
            Biryani · Kebabs · Seafood · South Indian · Chinese
          </p>

          <p className="nunito text-sm text-amber-400 mb-10">
            📍 Bhanugudi Junction, Kakinada
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollTo("explore-menu")}
              className="bg-gradient-to-r from-amber-500 to-amber-700 text-black font-bold px-8 py-3 rounded-full"
            >
              🍽️ View Menu
            </button>


            <button
              onClick={() => scrollTo("contact")}
              className="border border-amber-500 text-amber-400 px-8 py-3 rounded-full"
            >
              📞 Order Now
            </button>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        id="about"
        className="relative py-24 px-6 mb-18 overflow-hidden"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5E6C8] via-[#EAD7B0] to-[#F5E6C8]"></div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto">

          {/* Corner Icons */}
          <div className="absolute top-[-100px] left-[-60px] text-[140px] opacity-10 pointer-events-none select-none rotate-12">🍛</div>
          <div className="absolute top-[-60px] right-[-60px] text-[140px] opacity-10 pointer-events-none select-none -rotate-12">🌶️</div>
          <div className="absolute bottom-[-120px] md:bottom-[-140px] left-[30px] md:left-[-10px] text-[80px] md:text-[140px] opacity-10 pointer-events-none select-none -rotate-12">🦐</div>
          <div className="absolute bottom-[-120px] md:bottom-[-140px] right-[-10px] text-[80px] md:text-[140px] opacity-20 pointer-events-none select-none rotate-12">🍽️</div>

          <div className="max-w-7xl mx-auto">
            <AnimSection>
              <div className="text-center mb-14">
                <div className="nunito text-amber-600 text-xs tracking-[0.3em] uppercase mb-3">
                  ✦ Our Story ✦
                </div>
                <h2 className="playfair text-4xl font-bold text-black">
                  More Than a <span className="gold-text">Restaurant</span>
                </h2>
              </div>
            </AnimSection>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-center justify-items-center w-full">

              {/* Card 1 - BIG */}
              <AnimSection delay={0.1} className="md:col-span-2 w-full">
                <div className="relative rounded-2xl border border-amber-900/30 mr-4 overflow-hidden h-[100px] md:h-[250px] w-full">
                  <img
                    src="/Chef.png"
                    alt="Chef"
                    className="absolute inset-0 w-full h-full object-fit"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="relative z-10 h-full flex items-center justify-center text-center p-6">
                    <h3 className="playfair text-2xl md:text-3xl text-amber-50">
                      Cooked with Passion
                    </h3>
                  </div>
                </div>
              </AnimSection>

              {/* Quote - SMALL */}
              <AnimSection delay={0.2} className="md:col-span-1 px-2 w-full">
                <div className="text-center px-4">
                  <blockquote className="playfair text-lg md:text-xl text-amber-700 italic">
                    "Where every meal feels like home and every bite tells a story of authentic Andhra flavors."
                  </blockquote>
                </div>
              </AnimSection>

              {/* Card 2 - BIG */}
              <AnimSection delay={0.3} className="md:col-span-2 w-full">
                <div className="relative rounded-2xl border border-amber-900/30 overflow-hidden h-[120px] md:h-[250px] w-full">
                  <img
                    src="/family.png"
                    alt="Family Dining"
                    className="absolute inset-0 w-full h-full object-fit"
                  />
                  <div className="absolute inset-0 bg-black/50 w-full h-full" />
                  <div className="relative z-10 h-full flex items-center justify-center text-center p-6">
                    <h3 className="playfair text-2xl md:text-3xl text-amber-50">
                      A Family Destination
                    </h3>
                  </div>
                </div>
              </AnimSection>

            </div>
          </div>
        </div>
      </section>

      {/* ── SIGNATURE DISHES ── */}
      <section
        id="menu"
        className="relative py-24 px-6 overflow-hidden"
      >
        {/* Background Gradient (same as About) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5E6C8] via-[#EAD7B0] to-[#F5E6C8]"></div>
        {/* Decorative Background Icons */}
        <div className="absolute top-[-10px] left-[10px] text-[140px] opacity-15 pointer-events-none select-none rotate-12">
          🍲
        </div>

        <div className="absolute top-[40px] right-[10px] text-[140px] opacity-15 pointer-events-none select-none -rotate-12">
          🍗
        </div>

        <div className="absolute bottom-[10px] md:bottom-[-60px] left-[10px] text-[80px] md:text-[140px]  opacity-15 pointer-events-none select-none -rotate-12">
          🦐
        </div>

        <div className="absolute bottom-[10px] md:bottom-[-60px] right-[10px] text-[80px] md:text-[140px] opacity-15 pointer-events-none select-none rotate-12">
          🍽️
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="max-w-6xl mx-auto">
            <AnimSection>
              <div className="text-center mb-16">
                <div className="nunito text-black text-xs tracking-[0.3em] uppercase mb-3">✦ Fan Favourites ✦</div>
                <h2 className="playfair text-5xl font-bold text-black">
                  Signature <span className="gold-text">Dishes</span>
                </h2>
                <p className="nunito text-amber-700 mt-4 text-base">Hand-picked favourites that define the Amrutham experience</p>
              </div>
            </AnimSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SIGNATURE_DISHES.map((dish, i) => (
                <AnimSection key={dish.name} delay={i * 0.08}>
                  <div className="relative bg-gradient-to-br from-stone-900 to-stone-950 rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300" style={{ minHeight: "260px" }}>

                    {/* IMAGE */}
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Gradient Overlay — stronger at bottom for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20"></div>

                    {/* Tag */}
                    <div className={`absolute top-0 right-0 px-3 py-1.5 rounded-bl-xl rounded-tr-2xl nunito text-xs font-bold tracking-wide ${dish.tagColor}`}>
                      {dish.tag}
                    </div>

                    {/* Content — pinned to bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                      <h3 className="playfair text-lg text-amber-50 mb-1 flex items-center gap-2">
                        <dish.Icon className="text-amber-400 text-xl flex-shrink-0" />
                        {dish.name}
                      </h3>
                      <p className="nunito text-amber-200/80 text-xs leading-relaxed">
                        {dish.desc}
                      </p>
                    </div>

                  </div>
                </AnimSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FULL MENU ── */}
      {/* ── FULL MENU ── */}
      <section id="explore-menu" className="relative py-24 px-6 overflow-hidden" style={{ background: '#0d0905' }}>

        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(180,100,20,0.15) 0%, transparent 70%)'
        }} />

        {/* Floating food icons from MENU_CATEGORIES data */}
        {[
          { icon: '🔥', top: '6%', left: '4%', size: '2rem', opacity: 0.10, rotate: -10 },
          { icon: '🍛', top: '12%', left: '20%', size: '1.5rem', opacity: 0.09, rotate: 15 },
          { icon: '🥡', top: '8%', left: '40%', size: '1.6rem', opacity: 0.11, rotate: -8 },
          { icon: '🦞', top: '5%', left: '65%', size: '1.4rem', opacity: 0.10, rotate: 20 },
          { icon: '🍜', top: '10%', left: '82%', size: '1.7rem', opacity: 0.12, rotate: -15 },
          { icon: '🍲', top: '35%', left: '2%', size: '1.5rem', opacity: 0.09, rotate: 12 },
          { icon: '🥘', top: '50%', left: '14%', size: '1.3rem', opacity: 0.08, rotate: -20 },
          { icon: '🍱', top: '38%', left: '88%', size: '1.6rem', opacity: 0.10, rotate: -12 },
          { icon: '🥗', top: '60%', left: '78%', size: '1.4rem', opacity: 0.09, rotate: 18 },
          { icon: '🍗', top: '72%', left: '5%', size: '1.5rem', opacity: 0.10, rotate: 8 },
          { icon: '🥩', top: '78%', left: '28%', size: '1.3rem', opacity: 0.08, rotate: -14 },
          { icon: '🍝', top: '82%', left: '52%', size: '1.6rem', opacity: 0.09, rotate: 22 },
          { icon: '🦐', top: '76%', left: '72%', size: '1.4rem', opacity: 0.11, rotate: -6 },
          { icon: '🍴', top: '85%', left: '90%', size: '1.5rem', opacity: 0.10, rotate: 30 },
          { icon: '🧆', top: '45%', left: '48%', size: '1.2rem', opacity: 0.06, rotate: 45 },
        ].map((f, i) => (
          <div
            key={i}
            className="absolute pointer-events-none select-none"
            style={{
              top: f.top, left: f.left, fontSize: f.size, opacity: f.opacity,
              transform: `rotate(${f.rotate}deg)`,
              filter: 'sepia(1) saturate(0.5) brightness(1.4)',
            }}
          >
            {f.icon}
          </div>
        ))}

        <div className="max-w-4xl mx-auto relative z-10">
          <AnimSection>
            <div className="text-center mb-12">
              <div className="nunito text-amber-400 text-xs tracking-[0.3em] uppercase mb-3">✦ Full Menu ✦</div>
              <h2 className="playfair text-5xl font-bold text-amber-50">
                Explore Our <span className="gold-text">Menu</span>
              </h2>
            </div>
          </AnimSection>

          {/* Tabs */}
          <AnimSection delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2.5 mb-10">
              {MENU_CATEGORIES.map((cat, i) => (
                <button
                  key={cat.cat}
                  onClick={() => setMenuCat(i)}
                  className={`nunito px-6 py-2.5 rounded-full font-bold text-sm border transition-all duration-300 ${menuCat === i
                    ? "bg-gradient-to-r from-amber-500 to-amber-700 text-stone-900 border-transparent"
                    : "bg-stone-950/60 text-amber-700 border-amber-900/40 hover:border-amber-700"
                    }`}
                >
                  {cat.icon} {cat.cat}
                </button>
              ))}
            </div>
          </AnimSection>

          <AnimSection delay={0.2}>
            <div className="bg-stone-950/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-900/25">
              <div className="grid sm:grid-cols-2 gap-0.5">
                {MENU_CATEGORIES[menuCat].items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between px-3 py-4 border-b border-stone-800/50 hover:bg-stone-800/30 transition-colors duration-200 rounded"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.type === "veg" ? "bg-green-500" : "bg-red-500"}`} />
                      <span className="nunito text-amber-100 text-sm">{item.name}</span>
                    </div>
                    <span className="nunito text-amber-400 font-bold text-sm">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="nunito mt-6 text-xs text-amber-900 flex flex-wrap gap-6">
                <span><span className="text-green-500">●</span> Vegetarian</span>
                <span><span className="text-red-500">●</span> Non-Vegetarian</span>
                <span className="ml-auto">* Prices may vary. Taxes applicable.</span>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── WHY CHOOSE US ── */}
      {/* ── WHY CHOOSE US ── */}
      <section className="relative py-24 px-6 overflow-hidden" style={{ background: '#0d0905' }}>

        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(180,100,20,0.15) 0%, transparent 70%)'
        }} />

        {/* Floating icons derived from WHY_CHOOSE titles */}
        {[
          { icon: '🌶️', top: '5%', left: '3%', size: '2rem', opacity: 0.10, rotate: -12 },
          { icon: '⭐', top: '10%', left: '22%', size: '1.5rem', opacity: 0.09, rotate: 10 },
          { icon: '💰', top: '7%', left: '45%', size: '1.4rem', opacity: 0.10, rotate: -5 },
          { icon: '⚡', top: '4%', left: '68%', size: '1.6rem', opacity: 0.11, rotate: 18 },
          { icon: '👨‍👩‍👧‍👦', top: '9%', left: '84%', size: '1.5rem', opacity: 0.09, rotate: -8 },
          { icon: '🍽️', top: '38%', left: '1%', size: '1.7rem', opacity: 0.10, rotate: 15 },
          { icon: '🧂', top: '52%', left: '10%', size: '1.3rem', opacity: 0.08, rotate: -18 },
          { icon: '🫙', top: '40%', left: '91%', size: '1.5rem', opacity: 0.09, rotate: -10 },
          { icon: '🔪', top: '58%', left: '82%', size: '1.4rem', opacity: 0.08, rotate: 35 },
          { icon: '🥄', top: '70%', left: '4%', size: '1.5rem', opacity: 0.10, rotate: 8 },
          { icon: '🫕', top: '78%', left: '24%', size: '1.3rem', opacity: 0.09, rotate: -14 },
          { icon: '🍲', top: '83%', left: '50%', size: '1.6rem', opacity: 0.10, rotate: 20 },
          { icon: '🥘', top: '75%', left: '72%', size: '1.4rem', opacity: 0.09, rotate: -7 },
          { icon: '🍛', top: '87%', left: '88%', size: '1.5rem', opacity: 0.10, rotate: 25 },
          { icon: '🌿', top: '46%', left: '48%', size: '1.2rem', opacity: 0.06, rotate: 45 },
        ].map((f, i) => (
          <div
            key={i}
            className="absolute pointer-events-none select-none"
            style={{
              top: f.top, left: f.left, fontSize: f.size, opacity: f.opacity,
              transform: `rotate(${f.rotate}deg)`,
              filter: 'sepia(1) saturate(0.5) brightness(1.4)',
            }}
          >
            {f.icon}
          </div>
        ))}

        <div className="max-w-5xl mx-auto relative z-10">
          <AnimSection>
            <div className="text-center mb-16">
              <div className="nunito text-amber-400 text-xs tracking-[0.3em] uppercase mb-3">
                ✦ Why Amrutham ✦
              </div>
              <h2 className="playfair text-5xl font-bold text-amber-50">
                Why Choose <span className="gold-text">Us</span>
              </h2>
            </div>
          </AnimSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE.map((w, i) => {
              const Icon = w.icon;
              return (
                <AnimSection key={w.title} delay={i * 0.07}>
                  <div className="bg-stone-950/70 backdrop-blur-sm rounded-2xl p-7 border border-amber-900/25 text-center hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300">
                    <Icon className="text-amber-500 text-4xl mb-4 mx-auto" />
                    <h3 className="playfair text-lg text-amber-50 mb-2.5">{w.title}</h3>
                    <p className="nunito text-amber-700 text-sm leading-relaxed">{w.desc}</p>
                  </div>
                </AnimSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="relative rounded py-24 px-6 overflow-hidden" style={{ background: '#1a0e05' }}>

        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(180,100,20,0.18) 0%, transparent 70%)'
        }} />

        {/* Floating food icons */}
        {[
          { icon: '🍽️', top: '8%', left: '5%', size: '2rem', opacity: 0.12, rotate: -15 },
          { icon: '🥘', top: '15%', left: '18%', size: '1.4rem', opacity: 0.10, rotate: 10 },
          { icon: '🍷', top: '6%', left: '35%', size: '1.6rem', opacity: 0.13, rotate: -8 },
          { icon: '🫕', top: '20%', left: '55%', size: '1.3rem', opacity: 0.09, rotate: 20 },
          { icon: '🍴', top: '10%', left: '72%', size: '1.8rem', opacity: 0.14, rotate: 30 },
          { icon: '🥗', top: '5%', left: '88%', size: '1.5rem', opacity: 0.11, rotate: -5 },
          { icon: '🍲', top: '40%', left: '2%', size: '1.6rem', opacity: 0.10, rotate: 12 },
          { icon: '🧆', top: '55%', left: '12%', size: '1.3rem', opacity: 0.09, rotate: -20 },
          { icon: '🍛', top: '35%', left: '90%', size: '1.7rem', opacity: 0.12, rotate: -10 },
          { icon: '🥩', top: '60%', left: '80%', size: '1.4rem', opacity: 0.10, rotate: 15 },
          { icon: '🍜', top: '75%', left: '6%', size: '1.5rem', opacity: 0.11, rotate: 8 },
          { icon: '🧁', top: '80%', left: '25%', size: '1.3rem', opacity: 0.09, rotate: -12 },
          { icon: '🍱', top: '85%', left: '50%', size: '1.6rem', opacity: 0.10, rotate: 18 },
          { icon: '🥂', top: '78%', left: '70%', size: '1.4rem', opacity: 0.12, rotate: -7 },
          { icon: '🍰', top: '82%', left: '88%', size: '1.5rem', opacity: 0.11, rotate: 22 },
          { icon: '🔪', top: '45%', left: '50%', size: '1.2rem', opacity: 0.07, rotate: 45 },
          { icon: '🫙', top: '30%', left: '75%', size: '1.3rem', opacity: 0.08, rotate: -18 },
          { icon: '🥄', top: '65%', left: '40%', size: '1.4rem', opacity: 0.08, rotate: 35 },
        ].map((f, i) => (
          <div
            key={i}
            className="absolute pointer-events-none select-none"
            style={{
              top: f.top,
              left: f.left,
              fontSize: f.size,
              opacity: f.opacity,
              transform: `rotate(${f.rotate}deg)`,
              filter: 'sepia(1) saturate(0.5) brightness(1.4)',
            }}
          >
            {f.icon}
          </div>
        ))}

        <div className="max-w-5xl mx-auto relative z-10">
          <AnimSection>
            <div className="text-center mb-16">
              <div className="nunito text-amber-400 text-xs tracking-[0.3em] uppercase mb-3">✦ Visual Feast ✦</div>
              <h2 className="playfair text-5xl font-bold text-white">
                Food <span className="gold-text">Gallery</span>
              </h2>
            </div>
          </AnimSection>

          <AnimSection delay={0.2}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {GALLERY_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative aspect-square rounded-xl overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="relative z-10 flex items-end justify-center h-full pb-2">
                    <span className="text-amber-200 text-xs font-semibold">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── REVIEWS ── */}
      <section id="reviews" className="bg-stone-950 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimSection>
            <div className="text-center mb-16">
              <div className="nunito text-amber-400 text-xs tracking-[0.3em] uppercase mb-3">✦ What People Say ✦</div>
              <h2 className="playfair text-5xl font-bold text-amber-50">
                Customer <span className="gold-text">Reviews</span>
              </h2>
            </div>
          </AnimSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <AnimSection key={r.name} delay={i * 0.08}>
                <div className="relative bg-stone-900 rounded-2xl p-7 border border-amber-900/25 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300">
                  <div className="absolute top-4 right-5 text-amber-500/15 text-5xl playfair leading-none select-none">"</div>
                  <div className="flex gap-1 mb-3.5">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className={`text-base ${j < r.stars ? "text-amber-400" : "text-stone-700"}`}>★</span>
                    ))}
                  </div>
                  <p className="nunito text-amber-700 text-sm leading-relaxed mb-5 italic">"{r.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center playfair font-bold text-stone-900 text-sm flex-shrink-0">
                      {r.init}
                    </div>
                    <div>
                      <div className="nunito text-amber-100 font-bold text-sm">{r.name}</div>
                      <div className="nunito text-amber-800 text-xs">📍 {r.loc}</div>
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT & RESERVATION ── */}
      <section id="contact" className="bg-stone-900 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimSection>
            <div className="text-center mb-16">
              <div className="nunito text-amber-400 text-xs tracking-[0.3em] uppercase mb-3">✦ Visit Us ✦</div>
              <h2 className="playfair text-5xl font-bold text-amber-50">
                Reserve a <span className="gold-text">Table</span>
              </h2>
            </div>
          </AnimSection>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Info */}
            <AnimSection delay={0.1}>
              <div>
                <h3 className="playfair text-2xl text-amber-50 mb-7">Contact & Location</h3>

                {[
                  { icon: FaMapMarkerAlt, label: "Address", val: "Bhanugudi Junction, Railway Station Road, Sriram Nagar, Kakinada – 533 001, Andhra Pradesh, India" },
                  { icon: FaPhoneAlt, label: "Phone", val: "+91 98765 43210" },
                  { icon: FaClock, label: "Hours", val: "Mon–Sun: 7:00 AM – 11:00 PM" },
                  { icon: FaUtensils, label: "Type", val: "A/C Veg & Non-Veg Restaurant" },
                ].map((info) => {
                  const Icon = info.icon;

                  return (
                    <div key={info.label} className="flex gap-4 mb-5">

                      {/* ICON */}
                      <Icon className="text-white text-xl flex-shrink-0 mt-1" />

                      {/* TEXT */}
                      <div>
                        <div className="nunito text-amber-400 text-xs tracking-widest uppercase mb-1">
                          {info.label}
                        </div>
                        <div className="nunito text-amber-600 text-sm leading-relaxed">
                          {info.val}
                        </div>
                      </div>

                    </div>
                  );
                })}

                <div className="mt-6 rounded-2xl overflow-hidden border border-amber-900/30">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.1234567890!2d82.2475!3d16.9891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37a3c5e8a5f5b5%3A0x5e5e5e5e5e5e5e5e!2sBhanugudi+Junction%2C+Kakinada!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                    width="100%" height="220" style={{ border: 0, display: "block" }}
                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    title="Amrutham Restaurant Location"
                  />
                </div>
              </div>
            </AnimSection>

            {/* Form */}
            <AnimSection delay={0.2}>
              <div className="bg-stone-950 rounded-2xl p-9 border border-amber-900/25">
                <h3 className="playfair text-2xl text-amber-50 mb-2">Make a Reservation</h3>
                <p className="nunito text-amber-800 text-sm mb-7">We'll confirm your booking via phone.</p>

                {submitted ? (
                  <div className="text-center py-10">
                    <div className="text-6xl mb-4">🎉</div>
                    <div className="playfair text-xl text-amber-400 mb-2">Reservation Received!</div>
                    <div className="nunito text-amber-700 text-sm">We'll call you to confirm your table shortly.</div>
                  </div>
                ) : (
                  <form onSubmit={handleForm} className="flex flex-col gap-4">

                    {/* Name */}
                    <div>
                      <label className="nunito text-xs text-amber-700 tracking-widest uppercase block mb-1.5">
                        Your Name *
                      </label>
                      <input
                        placeholder="Full Name"
                        value={form.name}
                        required
                        onChange={e => {
                          const val = e.target.value;
                          if (/^[a-zA-Z\s]*$/.test(val)) {
                            setForm({ ...form, name: val, nameError: '' });
                          } else {
                            setForm({ ...form, nameError: 'Name must contain only letters' });
                          }
                        }}
                        className={`w-full bg-black/40 border  text-white placeholder:text-slate-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-amber-600`}
                      />
                      {form.nameError && (
                        <p className="text-red-500 text-xs mt-1">{form.nameError}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="nunito text-xs text-amber-700 tracking-widest uppercase block mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        placeholder="+91 XXXXX XXXXX"
                        type="tel"
                        value={form.phone}
                        required
                        onChange={e => {
                          const val = e.target.value;
                          if (/^[0-9+\s]*$/.test(val)) {
                            setForm({ ...form, phone: val, phoneError: '' });
                          } else {
                            setForm({ ...form, phoneError: 'Phone number must contain only digits' });
                          }
                        }}
                        onBlur={() => {
                          if (form.phone && form.phone.replace(/\D/g, '').length < 10) {
                            setForm({ ...form, phoneError: 'Phone number must be at least 10 digits' });
                          }
                        }}
                        maxLength={15}
                        className={`w-full bg-black/40 border text-white placeholder:text-slate-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-amber-600`}
                      />
                      {form.phoneError && (
                        <p className="text-red-500 text-xs mt-1">{form.phoneError}</p>
                      )}
                    </div>

                    {/* Guests + Date */}
                    <div className="grid grid-cols-2 gap-3">

                      {/* Guests */}
                      <div>
                        <label className="nunito text-xs text-amber-700 tracking-widest uppercase block mb-1.5">
                          Guests
                        </label>
                        <select
                          value={form.guests}
                          onChange={e => setForm({ ...form, guests: e.target.value })}
                          className="w-full bg-black/40 border border-amber-900/30 text-slate-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-amber-600 appearance-none"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23d97706' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 12px center',
                            paddingRight: '36px'
                          }}
                        >
                          <option value="" disabled hidden className="bg-black  placeholder:text-slate-500">
                            Select Guests
                          </option>
                          {["1", "2", "3", "4", "5", "6", "7", "8", "10+"].map(n => (
                            <option key={n} value={n} className="bg-black text-slate-500">
                              {n} {n === "1" ? "Guest" : "Guests"}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Date */}
                      <div>
                        <label className="nunito text-xs text-amber-700 tracking-widest uppercase block mb-1.5">
                          Date
                        </label>
                        <input
                          type="date"
                          value={form.date}
                          required
                          onChange={e => setForm({ ...form, date: e.target.value })}
                          style={{ colorScheme: 'dark' }}
                          className="w-full bg-black/40 border border-amber-900/30 text-slate-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-amber-600"
                        />
                      </div>
                    </div>

                    {/* Time */}
                    <div>
                      <label className="nunito text-xs text-amber-700 tracking-widest uppercase block mb-1.5">
                        Preferred Time
                      </label>
                      <input
                        type="time"
                        value={form.time}
                        onChange={e => setForm({ ...form, time: e.target.value })}
                        style={{ colorScheme: 'dark' }}
                        className="w-full bg-black/40 border border-amber-900/30 text-slate-300 placeholder:text-slate-500 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-amber-600"
                      />
                    </div>

                    {/* Button */}
                    <button
                      type="submit"
                      className="nunito mt-2 bg-gradient-to-r from-amber-500 to-amber-700 text-stone-900 font-bold text-base py-4 rounded-xl hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300"
                    >
                      🍽️ Reserve My Table
                    </button>

                  </form>
                )}
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-stone-950/80 border-t border-amber-900/20 pt-14 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="playfair text-amber-400 text-2xl font-black">AMRUTHAM</div>
              <div className="nunito text-amber-900 text-xs tracking-widest uppercase mb-4">Family Restaurant</div>
              <p className="nunito text-white text-sm leading-relaxed">Authentic Andhra flavors served with love. A/C Veg & Non-Veg restaurant in Kakinada.</p>
              <div className="flex gap-3 mt-5">
                {[FaFacebookF, FaInstagram, FaYoutube, FaTwitter].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-stone-900 border border-amber-900/40 flex items-center justify-center cursor-pointer hover:border-amber-500 hover:bg-stone-800 transition-all duration-300 text-sm"
                  >
                    <Icon className="text-white text-sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="playfair text-amber-400 text-lg mb-5">Quick Links</div>
              <div className="flex flex-col gap-2.5">
                {NAV_LINKS.map((l) => (
                  <span
                    key={l}
                    onClick={() => scrollTo(l.toLowerCase())}
                    className="nunito text-white text-sm cursor-pointer hover:text-amber-400 transition-colors duration-300"
                  >
                    → {l}
                  </span>
                ))}
              </div>
            </div>

            {/* Cuisines */}
            <div>
              <div className="playfair text-amber-400 text-lg mb-5">Our Cuisines</div>
              <div className="flex flex-wrap gap-2">
                {["South Indian", "Andhra", "North Indian", "Chinese", "Mughlai", "Seafood", "Biryani", "Kebabs"].map(c => (
                  <span key={c} className="nunito bg-stone-900 border border-amber-900/30 px-3 py-1 rounded-full text-white text-xs">{c}</span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="playfair text-amber-400 text-lg mb-5">Contact</div>

              <div className="nunito text-white text-sm leading-8">
                <div className="flex items-start gap-2">
                  <FaMapMarkerAlt className="text-amber-500 mt-1" />
                  <div>
                    <div>Bhanugudi Junction</div>
                    <div>Railway Station Road</div>
                    <div>Kakinada, AP – 533001</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <FaPhoneAlt className="text-amber-500" />
                  <span>+91 98765 43210</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaClock className="text-amber-500" />
                  <span>7 AM – 11 PM (All Days)</span>
                </div>
              </div>
            </div>
            <div className="border-t border-stone-800/60 pt-6 flex flex-wrap justify-between items-center gap-3">
              <div className="nunito text-white text-xs">© 2025 Amrutham Family Restaurant, Kakinada. All Rights Reserved.</div>
              <div className="nunito text-white text-xs">Made with ❤️ for food lovers of Andhra</div>
            </div>
          </div>
        </div>
      </footer >
    </div >
  );
}