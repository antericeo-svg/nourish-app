import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function NourishLanding() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const [visible, setVisible] = useState({});
  const sectionRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => setActiveFeature(p => (p + 1) % 4), 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setVisible(p => ({ ...p, [e.target.dataset.idx]: true })); });
    }, { threshold: 0.15 });
    sectionRefs.current.forEach(el => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const features = [
    { icon: "🤖", title: "AI-Powered Suggestions", desc: "Tell Claude your goals and get personalized meal ideas instantly. High protein? Vegan? Under 500 calories? Just ask." },
    { icon: "📊", title: "Smart Macro Tracking", desc: "Visual progress rings track your daily calories, protein, carbs, and fat against your custom targets." },
    { icon: "🛒", title: "Auto Grocery Lists", desc: "Your grocery list builds itself as you plan. Check off items, see quantities, and share with one tap." },
    { icon: "⚡", title: "One-Click Meal Plans", desc: "Auto-fill a day or an entire week with meals that match your dietary preferences. Customizable in seconds." },
  ];

  const testimonials = [
    { name: "Sarah M.", role: "Fitness Coach", quote: "I used to spend 2 hours every Sunday planning meals. Now it takes me 10 minutes.", avatar: "🏋️‍♀️" },
    { name: "James K.", role: "Busy Parent", quote: "The grocery list feature alone is worth it. No more wandering the store wondering what I forgot.", avatar: "👨‍👧‍👦" },
    { name: "Priya R.", role: "Nutritionist", quote: "I recommend Nourish to all my clients. The macro tracking makes accountability effortless.", avatar: "🥗" },
  ];

  const pricing = [
    { name: "Free", price: "$0", period: "forever", features: ["3 days per week", "Manual meal selection", "Basic grocery list", "Community recipes"], cta: "Get Started Free", highlight: false },
    { name: "Pro", price: "$7", period: "/month", features: ["Full 7-day planning", "AI Meal Advisor (unlimited)", "Smart macro tracking", "Shareable grocery lists", "Dietary filters & presets", "Priority support"], cta: "Start Free Trial", highlight: true },
    { name: "Family", price: "$12", period: "/month", features: ["Everything in Pro", "Up to 5 family members", "Shared grocery lists", "Kid-friendly meal tags", "Family calorie presets", "Meal prep batch planning"], cta: "Start Free Trial", highlight: false },
  ];

  const s = (idx) => ({
    opacity: visible[idx] ? 1 : 0,
    transform: visible[idx] ? "translateY(0)" : "translateY(30px)",
    transition: "opacity 0.7s ease, transform 0.7s ease",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#faf7f2", fontFamily: "'DM Sans', sans-serif", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700;800&display=swap" rel="stylesheet" />

      {/* ── NAV ── */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 32px", maxWidth: 1100, margin: "0 auto",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 24 }}>🌿</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#2d2418" }}>Nourish</span>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["Features", "Pricing", "Testimonials"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ textDecoration: "none", color: "#6b5e50", fontSize: 14, fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#3d5a40"} onMouseLeave={e => e.currentTarget.style.color = "#6b5e50"}>{l}</a>
          ))}
          <button onClick={() => navigate("/app")} style={{
            padding: "9px 20px", borderRadius: 8, border: "none", background: "#3d5a40",
            color: "white", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          }}>Get Started</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        maxWidth: 1100, margin: "0 auto", padding: "60px 32px 80px",
        display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap",
      }}>
        <div style={{ flex: "1 1 440px" }}>
          <div style={{
            display: "inline-block", padding: "6px 16px", borderRadius: 20,
            background: "#e8f0e8", color: "#3d5a40", fontSize: 12, fontWeight: 600, marginBottom: 20, letterSpacing: "0.02em",
          }}>✨ AI-POWERED MEAL PLANNING</div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 800,
            color: "#1a1a1a", lineHeight: 1.1, margin: "0 0 20px", letterSpacing: "-0.02em",
          }}>
            Eat better.<br />
            <span style={{ color: "#3d5a40" }}>Think less.</span>
          </h1>
          <p style={{ fontSize: 18, color: "#6b5e50", lineHeight: 1.6, margin: "0 0 32px", maxWidth: 460 }}>
            Nourish plans your meals, tracks your macros, and builds your grocery list — powered by AI that learns what you love.
          </p>

          {/* Beehiiv Email Capture */}
          <div style={{ maxWidth: 460 }}>
            <iframe
              src="https://subscribe-forms.beehiiv.com/e6c75e01-7ac6-425f-845f-46ffd4ce1f27"
              data-test-id="beehiiv-embed"
              frameBorder="0"
              scrolling="no"
              style={{ width: "100%", height: 200, margin: 0, borderRadius: 12, backgroundColor: "transparent", border: "none", maxWidth: "100%" }}
            /></div>
          <p style={{ fontSize: 12, color: "#b5a898", marginTop: 12 }}>Free forever plan available. No credit card required.</p>
        </div>

        {/* Hero visual - app preview */}
        <div style={{
          flex: "1 1 380px", background: "linear-gradient(135deg, #3d5a40 0%, #6b8f71 100%)",
          borderRadius: 24, padding: 28, minHeight: 420, position: "relative", overflow: "hidden",
          boxShadow: "0 20px 60px rgba(61,90,64,0.25)",
        }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
          <div style={{ position: "absolute", bottom: -20, left: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
          <div style={{ position: "relative" }}>
            <div style={{ color: "white", fontSize: 12, fontWeight: 600, opacity: 0.7, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Monday's Plan</div>
            {[
              { type: "Breakfast", meal: "Avocado Toast + Eggs", cal: 410, p: 22 },
              { type: "Lunch", meal: "Chicken & Quinoa Bowl", cal: 480, p: 38 },
              { type: "Dinner", meal: "Grilled Salmon & Veggies", cal: 520, p: 40 },
              { type: "Snack", meal: "Greek Yogurt & Honey", cal: 200, p: 14 },
            ].map((m, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.12)", borderRadius: 12, padding: "12px 16px",
                marginBottom: 8, backdropFilter: "blur(10px)",
                animation: `fadeSlideIn 0.5s ease ${i * 0.15}s both`,
              }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{m.type}</div>
                <div style={{ color: "white", fontWeight: 600, fontSize: 14, marginTop: 2 }}>{m.meal}</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 2 }}>{m.cal} cal · {m.p}g protein</div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, padding: "0 4px" }}>
              {[{ l: "Calories", v: "1,610" }, { l: "Protein", v: "114g" }].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ color: "white", fontSize: 20, fontWeight: 700 }}>{s.v}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: 500 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ── */}
      <div style={{ background: "#f0ebe3", padding: "20px 32px", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "#8a7e72", fontWeight: 500 }}>
          Trusted by <strong style={{ color: "#3d5a40" }}>2,000+</strong> health-conscious planners · Rated <strong style={{ color: "#3d5a40" }}>4.9/5</strong> by early users
        </span>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" ref={el => sectionRefs.current[0] = el} data-idx="0" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 32px", ...s(0) }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "#1a1a1a", margin: "0 0 12px" }}>Everything you need to eat well</h2>
          <p style={{ fontSize: 16, color: "#8a7e72", maxWidth: 500, margin: "0 auto" }}>Simple tools that make healthy eating the path of least resistance.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: activeFeature === i ? "linear-gradient(135deg, #3d5a40, #6b8f71)" : "white",
              borderRadius: 16, padding: 28, border: activeFeature === i ? "none" : "1px solid #e8e0d8",
              transition: "all 0.5s ease", cursor: "pointer",
              boxShadow: activeFeature === i ? "0 8px 30px rgba(61,90,64,0.2)" : "0 1px 4px rgba(0,0,0,0.04)",
              transform: activeFeature === i ? "translateY(-4px)" : "translateY(0)",
            }} onClick={() => setActiveFeature(i)}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{
                fontSize: 17, fontWeight: 700, margin: "0 0 8px",
                color: activeFeature === i ? "white" : "#2d2418",
                fontFamily: "'DM Sans', sans-serif",
              }}>{f.title}</h3>
              <p style={{
                fontSize: 13, lineHeight: 1.6, margin: 0,
                color: activeFeature === i ? "rgba(255,255,255,0.8)" : "#8a7e72",
              }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section ref={el => sectionRefs.current[1] = el} data-idx="1" style={{ background: "#f0ebe3", padding: "80px 32px", ...s(1) }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "#1a1a1a", margin: "0 0 12px" }}>Three steps to a better week</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
            {[
              { step: "01", title: "Set your goals", desc: "Tell us your calorie target, dietary preference, and how many meals you want to plan." },
              { step: "02", title: "Fill your week", desc: "Pick from curated meals, use AI suggestions, or auto-fill in one click. Adjust as you go." },
              { step: "03", title: "Shop & eat", desc: "Grab your auto-generated grocery list, hit the store, and enjoy a week of meals you actually want to eat." },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%", background: "#3d5a40",
                  color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, fontWeight: 700, margin: "0 auto 16px",
                  fontFamily: "'Playfair Display', serif",
                }}>{s.step}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#2d2418", margin: "0 0 8px" }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "#8a7e72", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" ref={el => sectionRefs.current[2] = el} data-idx="2" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 32px", ...s(2) }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "#1a1a1a", margin: "0 0 12px" }}>People are loving Nourish</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              background: "white", borderRadius: 16, padding: 28, border: "1px solid #e8e0d8",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{t.avatar}</div>
              <p style={{ fontSize: 15, color: "#2d2418", lineHeight: 1.6, margin: "0 0 16px", fontStyle: "italic" }}>"{t.quote}"</p>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#3d5a40" }}>{t.name}</div>
              <div style={{ fontSize: 12, color: "#8a7e72" }}>{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" ref={el => sectionRefs.current[3] = el} data-idx="3" style={{ background: "#f0ebe3", padding: "80px 32px", ...s(3) }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "#1a1a1a", margin: "0 0 12px" }}>Simple, honest pricing</h2>
            <p style={{ fontSize: 16, color: "#8a7e72" }}>Start free. Upgrade when you're ready.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, maxWidth: 900, margin: "0 auto" }}>
            {pricing.map((p, i) => (
              <div key={i} style={{
                background: "white", borderRadius: 20, padding: 32,
                border: p.highlight ? "2px solid #3d5a40" : "1px solid #e8e0d8",
                boxShadow: p.highlight ? "0 8px 30px rgba(61,90,64,0.15)" : "0 2px 8px rgba(0,0,0,0.04)",
                position: "relative", transform: p.highlight ? "scale(1.04)" : "scale(1)",
              }}>
                {p.highlight && (
                  <div style={{
                    position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                    background: "#3d5a40", color: "white", padding: "4px 16px", borderRadius: 20,
                    fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
                  }}>MOST POPULAR</div>
                )}
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#2d2418", margin: "0 0 8px" }}>{p.name}</h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 20 }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: "#1a1a1a" }}>{p.price}</span>
                  <span style={{ fontSize: 14, color: "#8a7e72" }}>{p.period}</span>
                </div>
                <div style={{ marginBottom: 24 }}>
                  {p.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: 13, color: "#4a4a4a" }}>
                      <span style={{ color: "#6b8f71", fontWeight: 700, fontSize: 14 }}>✓</span>
                      {f}
                    </div>
                  ))}
                </div>
                <button style={{
                  width: "100%", padding: "13px 0", borderRadius: 10, border: "none",
                  background: p.highlight ? "linear-gradient(135deg, #3d5a40, #5a7d5e)" : "#f5f0eb",
                  color: p.highlight ? "white" : "#3d5a40",
                  fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  transition: "transform 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >{p.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        background: "linear-gradient(135deg, #3d5a40 0%, #5a7d5e 50%, #6b8f71 100%)",
        padding: "72px 32px", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "white", margin: "0 0 14px" }}>
            Ready to take the guesswork out of eating well?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, margin: "0 0 32px", lineHeight: 1.6 }}>
            Join thousands who plan smarter, eat better, and stress less about food.
          </p>
          <button onClick={() => navigate("/app")} style={{
            padding: "16px 40px", borderRadius: 12, border: "none",
            background: "white", color: "#3d5a40",
            fontWeight: 700, fontSize: 16, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)", transition: "transform 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >Get Started Free →</button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#1a1a1a", padding: "40px 32px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 20 }}>🌿</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "white" }}>Nourish</span>
        </div>
        <p style={{ fontSize: 12, color: "#666", margin: 0 }}>© 2026 Nourish. Made with care for your health.</p>
      </footer>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
