import { useState, useEffect, useRef } from "react";

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const MEAL_TYPES = ["Breakfast","Lunch","Dinner","Snack"];
const FILTERS = [
  {key:"all",label:"All",icon:"🍽️"},{key:"high-protein",label:"High Protein",icon:"💪"},
  {key:"vegan",label:"Vegan",icon:"🌱"},{key:"low-carb",label:"Low Carb",icon:"🥩"},
  {key:"quick",label:"Quick",icon:"⚡"},{key:"meal-prep",label:"Meal Prep",icon:"📦"},
  {key:"budget",label:"Budget",icon:"💰"},{key:"favorites",label:"Favorites",icon:"⭐"},
];

const BUILT_IN_MEALS = {
  Breakfast: [
    {name:"Greek Yogurt Parfait",ingredients:["Greek yogurt","Granola","Mixed berries","Honey"],calories:320,protein:18,carbs:42,fat:10,tags:["high-protein","quick"]},
    {name:"Avocado Toast + Eggs",ingredients:["Whole grain bread","Avocado","Eggs","Cherry tomatoes","Red pepper flakes"],calories:410,protein:22,carbs:30,fat:24,tags:["high-protein","balanced"]},
    {name:"Overnight Oats",ingredients:["Rolled oats","Almond milk","Chia seeds","Banana","Peanut butter"],calories:380,protein:14,carbs:52,fat:14,tags:["meal-prep","vegan"]},
    {name:"Smoothie Bowl",ingredients:["Frozen açaí","Banana","Spinach","Almond milk","Granola","Coconut flakes"],calories:350,protein:10,carbs:58,fat:10,tags:["vegan","quick"]},
    {name:"Veggie Egg Scramble",ingredients:["Eggs","Bell peppers","Spinach","Onion","Feta cheese"],calories:290,protein:24,carbs:8,fat:18,tags:["high-protein","low-carb"]},
    {name:"Banana Pancakes",ingredients:["Banana","Eggs","Oat flour","Maple syrup","Blueberries"],calories:340,protein:16,carbs:48,fat:10,tags:["quick","balanced"]},
    {name:"Chia Pudding",ingredients:["Chia seeds","Coconut milk","Mango","Lime zest"],calories:280,protein:8,carbs:30,fat:16,tags:["vegan","meal-prep"]},
    {name:"Protein Shake Bowl",ingredients:["Protein powder","Frozen banana","Almond butter","Almond milk","Granola"],calories:420,protein:32,carbs:40,fat:16,tags:["high-protein","quick"]},
  ],
  Lunch: [
    {name:"Chicken & Quinoa Bowl",ingredients:["Chicken breast","Quinoa","Cucumber","Cherry tomatoes","Lemon","Olive oil"],calories:480,protein:38,carbs:42,fat:16,tags:["high-protein","meal-prep"]},
    {name:"Mediterranean Wrap",ingredients:["Whole wheat tortilla","Hummus","Grilled chicken","Mixed greens","Feta cheese","Kalamata olives"],calories:520,protein:32,carbs:44,fat:22,tags:["balanced","quick"]},
    {name:"Asian Salad",ingredients:["Mixed greens","Edamame","Carrots","Red cabbage","Sesame seeds","Ginger dressing"],calories:310,protein:14,carbs:28,fat:18,tags:["vegan","budget"]},
    {name:"Turkey & Avocado Sandwich",ingredients:["Sourdough bread","Turkey breast","Avocado","Lettuce","Tomato","Mustard"],calories:450,protein:28,carbs:38,fat:20,tags:["quick","balanced"]},
    {name:"Lentil Soup",ingredients:["Red lentils","Carrots","Celery","Onion","Garlic","Cumin","Vegetable broth"],calories:320,protein:18,carbs:48,fat:4,tags:["vegan","meal-prep","budget"]},
    {name:"Poke Bowl",ingredients:["Sushi rice","Salmon","Avocado","Cucumber","Edamame","Soy sauce","Sesame seeds"],calories:510,protein:30,carbs:52,fat:18,tags:["high-protein","balanced"]},
    {name:"Grilled Chicken Caesar",ingredients:["Romaine lettuce","Grilled chicken","Parmesan","Croutons","Caesar dressing"],calories:440,protein:36,carbs:18,fat:26,tags:["high-protein","low-carb"]},
    {name:"Black Bean Tacos",ingredients:["Corn tortillas","Black beans","Avocado","Salsa","Cilantro","Lime"],calories:380,protein:16,carbs:52,fat:14,tags:["vegan","budget","quick"]},
  ],
  Dinner: [
    {name:"Grilled Salmon & Veggies",ingredients:["Salmon fillet","Asparagus","Sweet potato","Olive oil","Lemon","Dill"],calories:520,protein:40,carbs:32,fat:24,tags:["high-protein","balanced"]},
    {name:"Chicken Stir-Fry",ingredients:["Chicken breast","Broccoli","Bell peppers","Snap peas","Soy sauce","Brown rice","Ginger"],calories:460,protein:36,carbs:48,fat:12,tags:["high-protein","meal-prep"]},
    {name:"Veggie Pasta Primavera",ingredients:["Whole wheat pasta","Zucchini","Cherry tomatoes","Bell peppers","Garlic","Parmesan","Basil"],calories:420,protein:16,carbs:62,fat:12,tags:["balanced","budget"]},
    {name:"Turkey Taco Bowls",ingredients:["Ground turkey","Black beans","Brown rice","Corn","Salsa","Avocado","Lime"],calories:490,protein:34,carbs:50,fat:16,tags:["high-protein","meal-prep"]},
    {name:"Sheet Pan Tofu & Broccoli",ingredients:["Extra-firm tofu","Broccoli","Soy sauce","Sesame oil","Garlic","Rice"],calories:380,protein:22,carbs:44,fat:14,tags:["vegan","meal-prep"]},
    {name:"Herb-Crusted Chicken",ingredients:["Chicken thighs","Rosemary","Thyme","Garlic","Roasted potatoes","Green beans"],calories:530,protein:38,carbs:36,fat:24,tags:["high-protein","balanced"]},
    {name:"Cauliflower Steak",ingredients:["Cauliflower","Tahini","Lemon","Chickpeas","Cumin","Parsley"],calories:340,protein:14,carbs:30,fat:20,tags:["vegan","low-carb"]},
    {name:"Beef & Veggie Stew",ingredients:["Beef chuck","Potatoes","Carrots","Onion","Celery","Beef broth","Thyme"],calories:480,protein:36,carbs:38,fat:20,tags:["high-protein","meal-prep","budget"]},
  ],
  Snack: [
    {name:"Apple & Almond Butter",ingredients:["Apple","Almond butter"],calories:200,protein:6,carbs:24,fat:12,tags:["quick","budget"]},
    {name:"Trail Mix",ingredients:["Almonds","Walnuts","Dark chocolate chips","Dried cranberries"],calories:220,protein:7,carbs:20,fat:15,tags:["quick","meal-prep"]},
    {name:"Hummus & Veggies",ingredients:["Hummus","Carrots","Celery","Cucumber"],calories:160,protein:6,carbs:18,fat:8,tags:["vegan","quick","budget"]},
    {name:"Protein Energy Balls",ingredients:["Oats","Peanut butter","Honey","Dark chocolate chips","Flaxseed"],calories:180,protein:8,carbs:22,fat:8,tags:["meal-prep","quick"]},
    {name:"Cottage Cheese & Fruit",ingredients:["Cottage cheese","Pineapple","Walnuts"],calories:190,protein:16,carbs:14,fat:8,tags:["high-protein","quick"]},
    {name:"Edamame",ingredients:["Edamame","Sea salt"],calories:120,protein:12,carbs:8,fat:5,tags:["vegan","high-protein","budget"]},
    {name:"Rice Cakes & PB",ingredients:["Rice cakes","Peanut butter","Banana slices"],calories:210,protein:7,carbs:28,fat:10,tags:["quick","budget"]},
    {name:"Greek Yogurt & Honey",ingredients:["Greek yogurt","Honey","Walnuts"],calories:200,protein:14,carbs:22,fat:8,tags:["high-protein","quick"]},
  ],
};

const TC={
  "high-protein":{bg:"#fef3c7",text:"#92400e"},"quick":{bg:"#dbeafe",text:"#1e40af"},
  "vegan":{bg:"#d1fae5",text:"#065f46"},"vegetarian":{bg:"#d1fae5",text:"#065f46"},
  "meal-prep":{bg:"#ede9fe",text:"#5b21b6"},"balanced":{bg:"#fce7f3",text:"#9d174d"},
  "low-carb":{bg:"#fee2e2",text:"#991b1b"},"budget":{bg:"#f0fdf4",text:"#166534"},
  "comfort":{bg:"#fff7ed",text:"#9a3412"},"omega-3":{bg:"#cffafe",text:"#155e75"},
  "energy":{bg:"#fefce8",text:"#854d0e"},"whole-food":{bg:"#ecfdf5",text:"#064e3b"},
  "custom":{bg:"#f0f0ff",text:"#4338ca"},
};

const F="'DM Sans', sans-serif", PF="'Playfair Display', serif";
const DEF_TARGETS={calories:2000,protein:120,carbs:250,fat:65};

// ─── Storage helpers (localStorage) ───
function loadData(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function saveData(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) { console.error("Save error:", e); }
}

// ─── Progress Ring ───
function Ring({value,max,size=54,stroke=5,color,label,unit=""}) {
  const pct=Math.min(value/Math.max(max,1),1), over=value>max;
  const r=(size-stroke)/2, c=2*Math.PI*r;
  return (
    <div style={{textAlign:"center"}}>
      <div style={{position:"relative",width:size,height:size,margin:"0 auto"}}>
        <svg width={size} height={size} style={{transform:"rotate(-90deg)",position:"absolute",top:0,left:0}}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#ede8e0" strokeWidth={stroke}/>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={over?"#e74c3c":color}
            strokeWidth={stroke} strokeDasharray={c} strokeDashoffset={c*(1-pct)}
            strokeLinecap="round" style={{transition:"stroke-dashoffset 0.6s ease"}}/>
        </svg>
        <div style={{position:"absolute",top:0,left:0,width:size,height:size,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <span style={{fontSize:11,fontWeight:700,color:over?"#e74c3c":"#2d2418",fontFamily:F}}>{value}</span>
        </div>
      </div>
      <div style={{fontSize:9,color:"#8a7e72",fontWeight:600,marginTop:3,fontFamily:F}}>{label}</div>
      <div style={{fontSize:8,color:"#b5a898",fontFamily:F}}>/{max}{unit}</div>
    </div>
  );
}

// ─── Meal Card ───
function MealCard({meal,onRemove,onAdd,onFav,isFav,compact}) {
  if (!meal) return null;
  return (
    <div style={{
      background:"white",borderRadius:12,padding:compact?"10px 12px":"14px 16px",
      boxShadow:"0 1px 4px rgba(0,0,0,0.06)",border:"1px solid #e8e0d8",
      position:"relative",transition:"box-shadow 0.2s, transform 0.2s",
    }}
      onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.1)";e.currentTarget.style.transform="translateY(-1px)";}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.06)";e.currentTarget.style.transform="translateY(0)";}}
    >
      <div style={{position:"absolute",top:6,right:8,display:"flex",gap:1}}>
        {onFav && <button onClick={()=>onFav(meal)} style={{background:"none",border:"none",cursor:"pointer",fontSize:14,padding:"2px 3px",color:isFav?"#f59e0b":"#d0c8be",transition:"color 0.2s"}}
          onMouseEnter={e=>e.currentTarget.style.color="#f59e0b"} onMouseLeave={e=>{if(!isFav)e.currentTarget.style.color="#d0c8be";}}>★</button>}
        {onAdd && <button onClick={()=>onAdd(meal)} style={{background:"none",border:"none",cursor:"pointer",color:"#6b8f71",fontSize:17,lineHeight:1,padding:"2px 3px"}}
          onMouseEnter={e=>e.currentTarget.style.color="#3d5a40"} onMouseLeave={e=>e.currentTarget.style.color="#6b8f71"}>+</button>}
        {onRemove && <button onClick={onRemove} style={{background:"none",border:"none",cursor:"pointer",color:"#b0a090",fontSize:15,lineHeight:1,padding:"2px 3px"}}
          onMouseEnter={e=>e.currentTarget.style.color="#c0392b"} onMouseLeave={e=>e.currentTarget.style.color="#b0a090"}>×</button>}
      </div>
      <div style={{fontFamily:F,fontWeight:600,fontSize:compact?12.5:14,color:"#2d2418",marginBottom:3,paddingRight:54}}>{meal.name}</div>
      <div style={{display:"flex",gap:7,fontSize:10.5,color:"#8a7e72",fontFamily:F,marginBottom:5,flexWrap:"wrap"}}>
        <span>{meal.calories} cal</span><span>{meal.protein}g P</span>
        {meal.carbs!=null&&<span>{meal.carbs}g C</span>}{meal.fat!=null&&<span>{meal.fat}g F</span>}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
        {meal.tags?.map(t=>(
          <span key={t} style={{fontSize:9,padding:"2px 7px",borderRadius:20,background:TC[t]?.bg||"#f5f0eb",color:TC[t]?.text||"#6b5e50",fontFamily:F,fontWeight:500}}>{t}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Meal Slot ───
function MealSlot({day,mealType,meal,onAdd,onRemove,onSwap,activeFilter,allMeals,favorites,onFav}) {
  const [open,setOpen]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{
    const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    if(open)document.addEventListener("mousedown",h);
    return()=>document.removeEventListener("mousedown",h);
  },[open]);

  const pool=allMeals[mealType]||[];
  const filtered=pool.filter(m=>{
    if(activeFilter==="all") return true;
    if(activeFilter==="favorites") return favorites.has(m.name);
    return m.tags.includes(activeFilter);
  });

  return (
    <div style={{position:"relative"}}>
      {meal ? (
        <div style={{position:"relative"}}>
          <MealCard meal={meal} onRemove={()=>onRemove(day,mealType)} onFav={onFav} isFav={favorites.has(meal.name)} compact/>
          <button onClick={()=>setOpen(!open)} style={{
            position:"absolute",bottom:8,right:8,background:"none",border:"none",cursor:"pointer",
            fontSize:10,color:"#8a7e72",fontFamily:F,fontWeight:600,textDecoration:"underline",
          }}>swap</button>
        </div>
      ) : (
        <button onClick={()=>setOpen(!open)} style={{
          width:"100%",padding:"16px 12px",border:"2px dashed #d9d0c5",borderRadius:12,
          background:"transparent",cursor:"pointer",color:"#b5a898",fontFamily:F,fontSize:13,transition:"all 0.2s",
        }} onMouseEnter={e=>{e.currentTarget.style.borderColor="#6b8f71";e.currentTarget.style.color="#6b8f71";}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor="#d9d0c5";e.currentTarget.style.color="#b5a898";}}>+ Add {mealType}</button>
      )}
      {open && (
        <div ref={ref} style={{
          position:"absolute",top:"100%",left:0,right:0,zIndex:100,
          background:"white",borderRadius:12,boxShadow:"0 8px 30px rgba(0,0,0,0.15)",
          border:"1px solid #e8e0d8",padding:8,marginTop:4,minWidth:240,maxHeight:300,overflowY:"auto",
        }}>
          <div style={{padding:"6px 8px 6px",fontFamily:F,fontSize:10,fontWeight:600,color:"#8a7e72",textTransform:"uppercase",letterSpacing:"0.05em"}}>
            {meal?"Swap":"Choose"} {mealType}{activeFilter!=="all"?` · ${activeFilter}`:""}
          </div>
          {filtered.length===0&&<div style={{padding:"14px 10px",fontSize:12,color:"#b5a898",textAlign:"center"}}>No meals match</div>}
          {filtered.map((m,i)=>(
            <div key={i} onClick={()=>{onAdd(day,mealType,m);setOpen(false);}} style={{
              padding:"9px 10px",borderRadius:8,cursor:"pointer",transition:"background 0.15s",marginBottom:1,
            }} onMouseEnter={e=>e.currentTarget.style.background="#f5f0eb"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                {favorites.has(m.name)&&<span style={{fontSize:10,color:"#f59e0b"}}>★</span>}
                <span style={{fontFamily:F,fontWeight:600,fontSize:12.5,color:"#2d2418"}}>{m.name}</span>
              </div>
              <div style={{fontSize:10.5,color:"#8a7e72",fontFamily:F,marginTop:2}}>{m.calories} cal · {m.protein}g P · {m.carbs}g C · {m.fat}g F</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Week Overview Grid ───
function WeekGrid({plan,onDayClick}) {
  return (
    <div style={{overflowX:"auto",paddingBottom:8}}>
      <div style={{display:"grid",gridTemplateColumns:`80px repeat(${DAYS.length}, 1fr)`,gap:2,minWidth:700}}>
        <div/>
        {DAYS.map(d=>(
          <div key={d} onClick={()=>onDayClick(d)} style={{
            textAlign:"center",fontFamily:F,fontSize:11,fontWeight:700,color:"#6b5e50",
            padding:"8px 4px",cursor:"pointer",borderRadius:8,transition:"background 0.15s",
          }} onMouseEnter={e=>e.currentTarget.style.background="#f5f0eb"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{d.slice(0,3)}</div>
        ))}
        {MEAL_TYPES.map(type=>(
          <React.Fragment key={type}>
            <div style={{fontFamily:F,fontSize:10,fontWeight:700,color:"#a09484",textTransform:"uppercase",letterSpacing:"0.06em",padding:"10px 4px 10px 0",textAlign:"right"}}>{type}</div>
            {DAYS.map(day=>{
              const m=plan[`${day}-${type}`];
              return (
                <div key={`${day}-${type}`} onClick={()=>onDayClick(day)} style={{
                  background:m?"#e8f0e8":"#f8f5f0",borderRadius:8,padding:"8px 6px",
                  minHeight:46,cursor:"pointer",transition:"all 0.15s",border:"1px solid",
                  borderColor:m?"#c8dcc8":"#ede8e0",
                }} onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.02)";e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.08)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="none";}}>
                  {m ? (
                    <>
                      <div style={{fontFamily:F,fontSize:10.5,fontWeight:600,color:"#2d2418",lineHeight:1.3,marginBottom:2}}>{m.name}</div>
                      <div style={{fontSize:9,color:"#6b8f71",fontWeight:600}}>{m.calories} cal</div>
                    </>
                  ) : (
                    <div style={{fontSize:16,color:"#d9d0c5",textAlign:"center",lineHeight:"28px"}}>+</div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ─── Custom Meal Creator ───
function MealCreator({onSave,onClose}) {
  const [name,setName]=useState("");
  const [type,setType]=useState("Lunch");
  const [cal,setCal]=useState("");
  const [prot,setProt]=useState("");
  const [carbs,setCarbs]=useState("");
  const [fat,setFat]=useState("");
  const [ings,setIngs]=useState("");
  const [tags,setTags]=useState([]);
  const allTags=["high-protein","vegan","low-carb","quick","meal-prep","budget","balanced","comfort"];

  const handleSave=()=>{
    if(!name.trim()||!cal) return;
    onSave({
      name:name.trim(), mealType:type,
      calories:parseInt(cal)||0, protein:parseInt(prot)||0, carbs:parseInt(carbs)||0, fat:parseInt(fat)||0,
      ingredients:ings.split(",").map(s=>s.trim()).filter(Boolean),
      tags:[...tags,"custom"],
    });
    onClose();
  };

  const inp={padding:"10px 14px",borderRadius:8,border:"1px solid #d9d0c5",fontFamily:F,fontSize:13,outline:"none",width:"100%",boxSizing:"border-box"};

  return (
    <div style={{background:"white",borderRadius:16,border:"1px solid #e0d8ce",padding:24,marginBottom:20,boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <h3 style={{fontFamily:PF,fontSize:18,fontWeight:700,color:"#2d2418",margin:0}}>Create Custom Meal</h3>
        <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:"#8a7e72"}}>×</button>
      </div>
      <div style={{display:"grid",gap:12}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 140px",gap:10}}>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Meal name" style={inp}/>
          <select value={type} onChange={e=>setType(e.target.value)} style={{...inp,cursor:"pointer"}}>
            {MEAL_TYPES.map(t=><option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
          <input value={cal} onChange={e=>setCal(e.target.value)} placeholder="Calories" type="number" style={inp}/>
          <input value={prot} onChange={e=>setProt(e.target.value)} placeholder="Protein (g)" type="number" style={inp}/>
          <input value={carbs} onChange={e=>setCarbs(e.target.value)} placeholder="Carbs (g)" type="number" style={inp}/>
          <input value={fat} onChange={e=>setFat(e.target.value)} placeholder="Fat (g)" type="number" style={inp}/>
        </div>
        <input value={ings} onChange={e=>setIngs(e.target.value)} placeholder="Ingredients (comma separated)" style={inp}/>
        <div>
          <div style={{fontSize:11,fontWeight:600,color:"#8a7e72",marginBottom:6}}>Tags</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {allTags.map(t=>(
              <button key={t} onClick={()=>setTags(p=>p.includes(t)?p.filter(x=>x!==t):[...p,t])} style={{
                padding:"5px 12px",borderRadius:20,border:"1px solid",cursor:"pointer",fontFamily:F,fontSize:11,fontWeight:500,transition:"all 0.2s",
                borderColor:tags.includes(t)?"#3d5a40":"#d9d0c5",
                background:tags.includes(t)?"#3d5a40":"white",
                color:tags.includes(t)?"white":"#6b5e50",
              }}>{t}</button>
            ))}
          </div>
        </div>
        <button onClick={handleSave} disabled={!name.trim()||!cal} style={{
          padding:"12px 24px",borderRadius:10,border:"none",cursor:"pointer",
          background:(!name.trim()||!cal)?"#d9d0c5":"#3d5a40",color:"white",
          fontFamily:F,fontWeight:700,fontSize:14,transition:"all 0.2s",alignSelf:"flex-start",
        }}>Save Meal</button>
      </div>
    </div>
  );
}

// ─── AI Advisor ───
function AIAdvisor({onAddMeal,activeDay}) {
  const [query,setQuery]=useState("");
  const [loading,setLoading]=useState(false);
  const [suggestions,setSuggestions]=useState(null);
  const [error,setError]=useState(null);
  const [history,setHistory]=useState([]);

  const askAI=async()=>{
    if(!query.trim()||loading) return;
    setLoading(true);setError(null);
    const msg=query.trim();setQuery("");
    try {
      const res=await fetch("/api/ai-advisor",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          message: msg,
          history: history,
        }),
      });
      const data=await res.json();
      if(data.error) throw new Error(data.error);
      const parsed = data;
      setSuggestions(parsed);
      setHistory(p=>[...p,{role:"user",content:msg},{role:"assistant",content:JSON.stringify(parsed)}]);
    } catch(err) {
      setError("Couldn't get suggestions. Try again or use the manual picker.");
    } finally {setLoading(false);}
  };

  return (
    <div style={{background:"linear-gradient(135deg,#f8f5f0,#f0ebe3)",borderRadius:16,border:"1px solid #e0d8ce",padding:20,marginBottom:20}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
        <span style={{fontSize:20}}>🤖</span>
        <h3 style={{fontFamily:PF,fontSize:17,fontWeight:700,color:"#2d2418",margin:0}}>AI Meal Advisor</h3>
        <span style={{fontSize:9,fontWeight:600,padding:"3px 10px",borderRadius:20,background:"linear-gradient(135deg,#3d5a40,#6b8f71)",color:"white",fontFamily:F}}>CLAUDE</span>
      </div>
      <p style={{fontSize:12,color:"#8a7e72",margin:"0 0 12px",fontFamily:F}}>Describe goals, restrictions, or cravings for personalized meal ideas.</p>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&askAI()}
          placeholder="e.g. High protein meals under 500 cal, no dairy..."
          style={{flex:1,padding:"11px 14px",borderRadius:10,border:"1px solid #d9d0c5",fontFamily:F,fontSize:13,outline:"none",background:"white"}}/>
        <button onClick={askAI} disabled={loading||!query.trim()} style={{
          padding:"11px 18px",borderRadius:10,border:"none",cursor:loading?"wait":"pointer",
          background:loading?"#a7c4a0":"#3d5a40",color:"white",fontFamily:F,fontWeight:600,fontSize:13,opacity:!query.trim()?0.5:1,
        }}>{loading?"Thinking...":"Ask AI"}</button>
      </div>
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:suggestions?14:0}}>
        {["High protein muscle building","Vegan under 400 cal","Quick 15-min dinners","Anti-inflammatory meals"].map(p=>(
          <button key={p} onClick={()=>setQuery(p)} style={{
            padding:"4px 10px",borderRadius:20,border:"1px solid #d9d0c5",background:"white",cursor:"pointer",fontFamily:F,fontSize:10.5,color:"#6b5e50",transition:"all 0.2s",
          }} onMouseEnter={e=>{e.currentTarget.style.borderColor="#6b8f71";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#d9d0c5";}}>{p}</button>
        ))}
      </div>
      {error&&<div style={{padding:"10px 14px",borderRadius:10,background:"#fef2f2",border:"1px solid #fecaca",fontSize:12,color:"#b91c1c",fontFamily:F}}>{error}</div>}
      {suggestions&&(
        <div>
          <div style={{padding:"10px 14px",borderRadius:10,background:"#e8f0e8",marginBottom:12,fontSize:13,color:"#2d2418",fontFamily:F,fontWeight:500}}>{suggestions.message}</div>
          <div style={{display:"grid",gap:8,gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))"}}>
            {suggestions.meals?.map((m,i)=>(
              <MealCard key={i} meal={m} onAdd={meal=>{
                const mt=MEAL_TYPES.includes(meal.mealType)?meal.mealType:"Lunch";
                onAddMeal(activeDay,mt,meal);
              }} compact/>
            ))}
          </div>
          <div style={{fontSize:10,color:"#b5a898",marginTop:6,fontFamily:F}}>Click + to add to {activeDay}'s plan</div>
        </div>
      )}
    </div>
  );
}

// ─── Onboarding ───
function Onboarding({onComplete}) {
  const [step,setStep]=useState(0);
  const [name,setName]=useState("");
  const [goal,setGoal]=useState("");
  const [diet,setDiet]=useState("");

  const goals=[
    {key:"lose",label:"Lose weight",icon:"📉",cals:1600,p:130,c:150,f:55},
    {key:"maintain",label:"Maintain weight",icon:"⚖️",cals:2000,p:120,c:250,f:65},
    {key:"gain",label:"Build muscle",icon:"💪",cals:2500,p:160,c:300,f:80},
    {key:"health",label:"Just eat healthier",icon:"🌿",cals:2000,p:100,c:250,f:65},
  ];
  const diets=[
    {key:"none",label:"No restrictions",icon:"🍽️"},
    {key:"vegan",label:"Vegan",icon:"🌱"},
    {key:"high-protein",label:"High Protein",icon:"💪"},
    {key:"low-carb",label:"Low Carb",icon:"🥩"},
  ];

  const finish=()=>{
    const g=goals.find(x=>x.key===goal)||goals[1];
    onComplete({name:name.trim()||"",goal:g.key,diet:diet||"none",targets:{calories:g.cals,protein:g.p,carbs:g.c,fat:g.f}});
  };

  const cardStyle=(selected)=>({
    padding:"20px",borderRadius:14,border:"2px solid",
    borderColor:selected?"#3d5a40":"#e8e0d8",
    background:selected?"#e8f0e8":"white",
    cursor:"pointer",transition:"all 0.2s",textAlign:"center",
    boxShadow:selected?"0 2px 12px rgba(61,90,64,0.15)":"none",
  });

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#faf7f2,#f0ebe3 40%,#e8f0e8 100%)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet"/>
      <div style={{maxWidth:520,width:"100%",padding:"40px 24px",textAlign:"center"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:32}}>
          <span style={{fontSize:32}}>🌿</span>
          <span style={{fontFamily:PF,fontSize:30,fontWeight:800,color:"#2d2418"}}>Nourish</span>
        </div>
        {/* Progress dots */}
        <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:36}}>
          {[0,1,2].map(i=>(
            <div key={i} style={{width:step===i?24:8,height:8,borderRadius:4,background:step>=i?"#3d5a40":"#d9d0c5",transition:"all 0.3s"}}/>
          ))}
        </div>

        {step===0 && (
          <div style={{animation:"fadeIn 0.4s ease"}}>
            <h2 style={{fontFamily:PF,fontSize:28,fontWeight:700,color:"#1a1a1a",margin:"0 0 8px"}}>Welcome! What's your name?</h2>
            <p style={{color:"#8a7e72",fontSize:15,margin:"0 0 28px"}}>Let's personalize your experience.</p>
            <input value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&setStep(1)}
              placeholder="Your first name" autoFocus
              style={{width:"100%",maxWidth:320,padding:"14px 20px",borderRadius:12,border:"2px solid #d9d0c5",fontFamily:F,fontSize:16,outline:"none",textAlign:"center",boxSizing:"border-box"}}/>
            <div style={{marginTop:24}}>
              <button onClick={()=>setStep(1)} style={{padding:"14px 40px",borderRadius:12,border:"none",background:"#3d5a40",color:"white",fontWeight:700,fontSize:15,cursor:"pointer",fontFamily:F}}>Continue</button>
            </div>
          </div>
        )}

        {step===1 && (
          <div style={{animation:"fadeIn 0.4s ease"}}>
            <h2 style={{fontFamily:PF,fontSize:28,fontWeight:700,color:"#1a1a1a",margin:"0 0 8px"}}>What's your main goal?</h2>
            <p style={{color:"#8a7e72",fontSize:15,margin:"0 0 28px"}}>This helps us set your daily targets.</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,maxWidth:400,margin:"0 auto"}}>
              {goals.map(g=>(
                <div key={g.key} onClick={()=>setGoal(g.key)} style={cardStyle(goal===g.key)}>
                  <div style={{fontSize:28,marginBottom:8}}>{g.icon}</div>
                  <div style={{fontWeight:600,fontSize:14,color:"#2d2418"}}>{g.label}</div>
                  <div style={{fontSize:11,color:"#8a7e72",marginTop:4}}>{g.cals} cal/day</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:24,display:"flex",gap:12,justifyContent:"center"}}>
              <button onClick={()=>setStep(0)} style={{padding:"12px 28px",borderRadius:10,border:"1px solid #d9d0c5",background:"white",color:"#6b5e50",fontWeight:600,fontSize:14,cursor:"pointer",fontFamily:F}}>Back</button>
              <button onClick={()=>{if(goal)setStep(2);}} disabled={!goal} style={{padding:"12px 28px",borderRadius:10,border:"none",background:goal?"#3d5a40":"#d9d0c5",color:"white",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:F}}>Continue</button>
            </div>
          </div>
        )}

        {step===2 && (
          <div style={{animation:"fadeIn 0.4s ease"}}>
            <h2 style={{fontFamily:PF,fontSize:28,fontWeight:700,color:"#1a1a1a",margin:"0 0 8px"}}>Any dietary preference?</h2>
            <p style={{color:"#8a7e72",fontSize:15,margin:"0 0 28px"}}>We'll filter your meal suggestions.</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,maxWidth:400,margin:"0 auto"}}>
              {diets.map(d=>(
                <div key={d.key} onClick={()=>setDiet(d.key)} style={cardStyle(diet===d.key)}>
                  <div style={{fontSize:28,marginBottom:8}}>{d.icon}</div>
                  <div style={{fontWeight:600,fontSize:14,color:"#2d2418"}}>{d.label}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:24}}>
              <button onClick={finish} disabled={!diet} style={{padding:"14px 40px",borderRadius:12,border:"none",background:diet?"linear-gradient(135deg,#3d5a40,#5a7d5e)":"#d9d0c5",color:"white",fontWeight:700,fontSize:15,cursor:"pointer",fontFamily:F,boxShadow:diet?"0 4px 14px rgba(61,90,64,0.3)":"none"}}>
                Start Planning →
              </button>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════
export default function NourishApp() {
  const [loaded,setLoaded]=useState(false);
  const [profile,setProfile]=useState(null);
  const [plan,setPlan]=useState({});
  const [activeDay,setActiveDay]=useState("Monday");
  const [view,setView]=useState("planner");
  const [subView,setSubView]=useState("day"); // day | week
  const [fadeIn,setFadeIn]=useState(true);
  const [activeFilter,setActiveFilter]=useState("all");
  const [targets,setTargets]=useState(DEF_TARGETS);
  const [editTargets,setEditTargets]=useState(false);
  const [checkedItems,setCheckedItems]=useState({});
  const [copied,setCopied]=useState(false);
  const [customMeals,setCustomMeals]=useState([]);
  const [showCreator,setShowCreator]=useState(false);
  const [favorites,setFavorites]=useState(new Set());

  // Load from storage
  useEffect(()=>{
    const p = loadData("nourish-profile", null);
    const pl = loadData("nourish-plan", {});
    const t = loadData("nourish-targets", DEF_TARGETS);
    const cm = loadData("nourish-custom-meals", []);
    const fv = loadData("nourish-favorites", []);
    const ch = loadData("nourish-checked", {});
    if(p) setProfile(p);
    setPlan(pl); setTargets(t); setCustomMeals(cm); setFavorites(new Set(fv)); setCheckedItems(ch);
    setLoaded(true);
  },[]);

  // Auto-save
  useEffect(()=>{if(loaded)saveData("nourish-plan",plan);},[plan,loaded]);
  useEffect(()=>{if(loaded)saveData("nourish-targets",targets);},[targets,loaded]);
  useEffect(()=>{if(loaded)saveData("nourish-custom-meals",customMeals);},[customMeals,loaded]);
  useEffect(()=>{if(loaded)saveData("nourish-favorites",[...favorites]);},[favorites,loaded]);
  useEffect(()=>{if(loaded)saveData("nourish-checked",checkedItems);},[checkedItems,loaded]);

  useEffect(()=>{setFadeIn(false);const t=setTimeout(()=>setFadeIn(true),30);return()=>clearTimeout(t);},[activeDay,view,subView]);

  // Merge custom meals into pool
  const allMeals={};
  MEAL_TYPES.forEach(t=>{
    allMeals[t]=[...BUILT_IN_MEALS[t],...customMeals.filter(m=>m.mealType===t)];
  });

  const addMeal=(day,mealType,meal)=>setPlan(p=>({...p,[`${day}-${mealType}`]:meal}));
  const removeMeal=(day,mealType)=>setPlan(p=>{const n={...p};delete n[`${day}-${mealType}`];return n;});

  const autoFillDay=(day)=>{
    const u={};
    MEAL_TYPES.forEach(type=>{
      if(!plan[`${day}-${type}`]){
        const pool=allMeals[type].filter(m=>activeFilter==="all"||activeFilter==="favorites"?true:m.tags.includes(activeFilter));
        if(pool.length) u[`${day}-${type}`]=pool[Math.floor(Math.random()*pool.length)];
      }
    });
    setPlan(p=>({...p,...u}));
  };
  const autoFillWeek=()=>{
    const u={};
    DAYS.forEach(day=>MEAL_TYPES.forEach(type=>{
      if(!plan[`${day}-${type}`]){
        const pool=allMeals[type].filter(m=>activeFilter==="all"||activeFilter==="favorites"?true:m.tags.includes(activeFilter));
        if(pool.length) u[`${day}-${type}`]=pool[Math.floor(Math.random()*pool.length)];
      }
    }));
    setPlan(p=>({...p,...u}));
  };
  const clearAll=()=>{setPlan({});setCheckedItems({});};

  const toggleFav=(meal)=>{
    setFavorites(prev=>{const n=new Set(prev);if(n.has(meal.name))n.delete(meal.name);else n.add(meal.name);return n;});
  };
  const saveCustomMeal=(meal)=>setCustomMeals(p=>[...p,meal]);

  const handleOnboard=(data)=>{
    setProfile(data);
    setTargets(data.targets);
    if(data.diet&&data.diet!=="none") setActiveFilter(data.diet);
    saveData("nourish-profile",data);
  };

  // Grocery
  const groceryMap={};
  Object.values(plan).forEach(meal=>meal?.ingredients?.forEach(ing=>{
    const k=ing.toLowerCase();
    if(!groceryMap[k]) groceryMap[k]={name:ing,count:0};
    groceryMap[k].count+=1;
  }));
  const groceryList=Object.values(groceryMap).sort((a,b)=>a.name.localeCompare(b.name));

  // Stats
  const totalMeals=Object.keys(plan).length;
  const totalSlots=DAYS.length*MEAL_TYPES.length;
  const completionPct=Math.round((totalMeals/totalSlots)*100);
  const dm=Object.entries(plan).filter(([k])=>k.startsWith(activeDay));
  const dayCals=dm.reduce((s,[,m])=>s+(m?.calories||0),0);
  const dayProt=dm.reduce((s,[,m])=>s+(m?.protein||0),0);
  const dayCarbs=dm.reduce((s,[,m])=>s+(m?.carbs||0),0);
  const dayFat=dm.reduce((s,[,m])=>s+(m?.fat||0),0);
  const weekCals=Object.values(plan).reduce((s,m)=>s+(m?.calories||0),0);
  const weekProt=Object.values(plan).reduce((s,m)=>s+(m?.protein||0),0);

  const toggleChecked=(name)=>setCheckedItems(p=>({...p,[name]:!p[name]}));
  const shareGroceryList=()=>{
    const lines=groceryList.map(i=>`${checkedItems[i.name]?"✅":"⬜"} ${i.name}${i.count>1?` (×${i.count})`:""}`);
    const text=`🌿 Nourish — Grocery List\n${groceryList.length} items · ${totalMeals} meals\n${"─".repeat(28)}\n${lines.join("\n")}\n${"─".repeat(28)}\nMade with Nourish 🌿`;
    navigator.clipboard?.writeText(text).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);});
  };

  if(!loaded) return <div style={{minHeight:"100vh",background:"#faf7f2",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F}}>
    <div style={{textAlign:"center"}}><span style={{fontSize:40}}>🌿</span><div style={{marginTop:12,color:"#8a7e72",fontWeight:500}}>Loading your plan...</div></div>
  </div>;

  if(!profile) return <Onboarding onComplete={handleOnboard}/>;

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#faf7f2 0%,#f0ebe3 40%,#e8f0e8 100%)",fontFamily:F}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet"/>

      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,#3d5a40 0%,#5a7d5e 50%,#6b8f71 100%)",padding:"24px 28px 20px",color:"white",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-60,right:-40,width:200,height:200,borderRadius:"50%",background:"rgba(255,255,255,0.05)"}}/>
        <div style={{position:"relative",maxWidth:900,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:24}}>🌿</span>
              <h1 style={{fontFamily:PF,fontSize:24,fontWeight:700,margin:0}}>Nourish</h1>
              <span style={{fontSize:9,fontWeight:600,padding:"3px 8px",borderRadius:20,background:"rgba(255,255,255,0.2)"}}>PRO</span>
            </div>
            <div style={{fontSize:13,opacity:0.85,fontWeight:500}}>
              {profile.name?`Hey ${profile.name}! 👋`:"Welcome!"}
            </div>
          </div>
          <div style={{display:"flex",gap:20,marginTop:14,flexWrap:"wrap"}}>
            {[{l:"Planned",v:`${completionPct}%`},{l:"Meals",v:totalMeals},{l:"Week cal",v:weekCals.toLocaleString()},{l:"Week protein",v:`${weekProt}g`}].map((s,i)=>(
              <div key={i} style={{minWidth:70}}>
                <div style={{fontSize:18,fontWeight:700}}>{s.v}</div>
                <div style={{fontSize:10,opacity:0.7,fontWeight:500}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NAV */}
      <div style={{maxWidth:900,margin:"0 auto",padding:"0 16px"}}>
        <div style={{display:"flex",gap:6,padding:"14px 0 10px",borderBottom:"1px solid #e0d8ce",alignItems:"center",flexWrap:"wrap"}}>
          <div style={{display:"flex",background:"#eae4dc",borderRadius:10,padding:3}}>
            {[{k:"planner",l:"📅 Plan"},{k:"grocery",l:"🛒 Grocery"},{k:"ai",l:"🤖 AI"},{k:"custom",l:"✏️ My Meals"}].map(tab=>(
              <button key={tab.k} onClick={()=>setView(tab.k)} style={{
                padding:"7px 14px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:F,fontWeight:600,fontSize:12,
                background:view===tab.k?"white":"transparent",color:view===tab.k?"#2d2418":"#8a7e72",
                boxShadow:view===tab.k?"0 1px 4px rgba(0,0,0,0.08)":"none",transition:"all 0.2s",
              }}>{tab.l}</button>
            ))}
          </div>
          <div style={{flex:1}}/>
          <button onClick={autoFillWeek} style={{
            padding:"7px 14px",borderRadius:8,border:"1px solid #6b8f71",background:"transparent",cursor:"pointer",color:"#6b8f71",
            fontFamily:F,fontWeight:600,fontSize:11,transition:"all 0.2s",
          }} onMouseEnter={e=>{e.currentTarget.style.background="#6b8f71";e.currentTarget.style.color="white";}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#6b8f71";}}>✨ Auto-fill</button>
          <button onClick={clearAll} style={{
            padding:"7px 14px",borderRadius:8,border:"1px solid #c9b8a8",background:"transparent",cursor:"pointer",color:"#8a7e72",
            fontFamily:F,fontWeight:600,fontSize:11,transition:"all 0.2s",
          }} onMouseEnter={e=>e.currentTarget.style.background="#f5f0eb"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>Clear</button>
        </div>

        {/* CONTENT */}
        <div style={{opacity:fadeIn?1:0,transform:fadeIn?"translateY(0)":"translateY(6px)",transition:"opacity 0.25s,transform 0.25s"}}>

          {/* ═══ PLANNER ═══ */}
          {view==="planner"&&(
            <div style={{paddingTop:14,paddingBottom:40}}>
              {/* Filters */}
              <div style={{display:"flex",gap:5,marginBottom:12,overflowX:"auto",paddingBottom:4}}>
                {FILTERS.map(f=>(
                  <button key={f.key} onClick={()=>setActiveFilter(f.key)} style={{
                    padding:"6px 12px",borderRadius:20,border:"1px solid",
                    borderColor:activeFilter===f.key?"#3d5a40":"#d9d0c5",
                    background:activeFilter===f.key?"#3d5a40":"white",
                    color:activeFilter===f.key?"white":"#6b5e50",
                    fontFamily:F,fontWeight:600,fontSize:11,cursor:"pointer",transition:"all 0.2s",whiteSpace:"nowrap",
                  }}>{f.icon} {f.label}</button>
                ))}
              </div>

              {/* Day / Week toggle */}
              <div style={{display:"flex",gap:6,marginBottom:14,alignItems:"center"}}>
                <div style={{display:"flex",background:"#eae4dc",borderRadius:8,padding:2}}>
                  {[{k:"day",l:"Day View"},{k:"week",l:"Week View"}].map(v=>(
                    <button key={v.k} onClick={()=>setSubView(v.k)} style={{
                      padding:"6px 14px",borderRadius:6,border:"none",cursor:"pointer",fontFamily:F,fontWeight:600,fontSize:11,
                      background:subView===v.k?"white":"transparent",color:subView===v.k?"#2d2418":"#8a7e72",transition:"all 0.2s",
                    }}>{v.l}</button>
                  ))}
                </div>
              </div>

              {subView==="week" ? (
                <WeekGrid plan={plan} onDayClick={(d)=>{setActiveDay(d);setSubView("day");}}/>
              ) : (
                <>
                  {/* Day tabs */}
                  <div style={{display:"flex",gap:4,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
                    {DAYS.map(day=>{
                      const count=MEAL_TYPES.filter(t=>plan[`${day}-${t}`]).length;
                      const active=activeDay===day;
                      return (
                        <button key={day} onClick={()=>setActiveDay(day)} style={{
                          padding:"9px 14px",borderRadius:10,border:"none",cursor:"pointer",
                          background:active?"#3d5a40":"#f5f0eb",color:active?"white":"#6b5e50",
                          fontFamily:F,fontWeight:600,fontSize:12,transition:"all 0.2s",whiteSpace:"nowrap",position:"relative",
                          boxShadow:active?"0 2px 8px rgba(61,90,64,0.25)":"none",
                        }}>
                          {day.slice(0,3)}
                          {count>0&&<span style={{position:"absolute",top:-4,right:-4,background:active?"#a7c4a0":"#6b8f71",color:"white",borderRadius:"50%",width:16,height:16,fontSize:9,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{count}</span>}
                        </button>
                      );
                    })}
                  </div>

                  {/* Day header + rings */}
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:14}}>
                    <div>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <h2 style={{fontFamily:PF,fontSize:20,fontWeight:700,color:"#2d2418",margin:0}}>{activeDay}</h2>
                        <button onClick={()=>setEditTargets(!editTargets)} style={{background:"none",border:"none",cursor:"pointer",fontSize:10,color:"#6b8f71",fontFamily:F,fontWeight:600,textDecoration:"underline"}}>{editTargets?"Done":"Set targets"}</button>
                      </div>
                      <p style={{margin:"3px 0 0",fontSize:12,color:"#8a7e72"}}>
                        {dayCals>0?`${dayCals} cal · ${dayProt}g P · ${dayCarbs}g C · ${dayFat}g F`:"No meals yet"}
                      </p>
                    </div>
                    <div style={{display:"flex",gap:12}}>
                      <Ring value={dayCals} max={targets.calories} color="#3d5a40" label="Cal"/>
                      <Ring value={dayProt} max={targets.protein} color="#d97706" label="Protein" unit="g"/>
                      <Ring value={dayCarbs} max={targets.carbs} color="#2563eb" label="Carbs" unit="g"/>
                      <Ring value={dayFat} max={targets.fat} color="#dc2626" label="Fat" unit="g"/>
                    </div>
                  </div>

                  {editTargets&&(
                    <div style={{background:"white",borderRadius:12,border:"1px solid #e8e0d8",padding:"12px 16px",marginBottom:14,display:"flex",gap:14,flexWrap:"wrap",alignItems:"center"}}>
                      <span style={{fontSize:11,fontWeight:600,color:"#8a7e72"}}>Daily:</span>
                      {[{k:"calories",l:"Cal"},{k:"protein",l:"P(g)"},{k:"carbs",l:"C(g)"},{k:"fat",l:"F(g)"}].map(t=>(
                        <div key={t.k} style={{display:"flex",alignItems:"center",gap:4}}>
                          <label style={{fontSize:11,color:"#6b5e50",fontWeight:500}}>{t.l}</label>
                          <input type="number" value={targets[t.k]} onChange={e=>setTargets(p=>({...p,[t.k]:parseInt(e.target.value)||0}))}
                            style={{width:58,padding:"5px 6px",borderRadius:6,border:"1px solid #d9d0c5",fontFamily:F,fontSize:12,textAlign:"center",outline:"none"}}/>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{display:"flex",justifyContent:"flex-end",marginBottom:10}}>
                    <button onClick={()=>autoFillDay(activeDay)} style={{
                      padding:"6px 12px",borderRadius:8,border:"1px solid #d9d0c5",background:"white",cursor:"pointer",color:"#6b5e50",
                      fontFamily:F,fontWeight:500,fontSize:11,transition:"all 0.2s",
                    }} onMouseEnter={e=>{e.currentTarget.style.borderColor="#6b8f71";e.currentTarget.style.color="#6b8f71";}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor="#d9d0c5";e.currentTarget.style.color="#6b5e50";}}>✨ Auto-fill {activeDay}</button>
                  </div>

                  <div style={{display:"grid",gap:12}}>
                    {MEAL_TYPES.map(type=>(
                      <div key={type}>
                        <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:"#a09484",marginBottom:6,paddingLeft:2}}>{type}</div>
                        <MealSlot day={activeDay} mealType={type} meal={plan[`${activeDay}-${type}`]}
                          onAdd={addMeal} onRemove={removeMeal} activeFilter={activeFilter}
                          allMeals={allMeals} favorites={favorites} onFav={toggleFav}/>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ═══ GROCERY ═══ */}
          {view==="grocery"&&(
            <div style={{paddingTop:18,paddingBottom:40}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:10}}>
                <div>
                  <h2 style={{fontFamily:PF,fontSize:20,fontWeight:700,color:"#2d2418",margin:0}}>Grocery List</h2>
                  <p style={{margin:"3px 0 0",fontSize:12,color:"#8a7e72"}}>{groceryList.length} items · {totalMeals} meals</p>
                </div>
                {groceryList.length>0&&(
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <span style={{fontSize:11,color:"#8a7e72",fontWeight:500}}>{Object.values(checkedItems).filter(Boolean).length}/{groceryList.length}</span>
                    <button onClick={shareGroceryList} style={{
                      padding:"7px 14px",borderRadius:8,border:"1px solid #6b8f71",
                      background:copied?"#6b8f71":"transparent",color:copied?"white":"#6b8f71",
                      fontFamily:F,fontWeight:600,fontSize:11,cursor:"pointer",transition:"all 0.2s",
                    }} onMouseEnter={e=>{if(!copied){e.currentTarget.style.background="#6b8f71";e.currentTarget.style.color="white";}}}
                      onMouseLeave={e=>{if(!copied){e.currentTarget.style.background="transparent";e.currentTarget.style.color="#6b8f71";}}}>{copied?"✓ Copied!":"📋 Share"}</button>
                  </div>
                )}
              </div>
              {groceryList.length===0?(
                <div style={{textAlign:"center",padding:"50px 20px",color:"#b5a898",background:"white",borderRadius:16,border:"1px solid #e8e0d8"}}>
                  <div style={{fontSize:36,marginBottom:10}}>🛒</div>
                  <div style={{fontWeight:600,fontSize:14,marginBottom:4}}>No items yet</div>
                  <div style={{fontSize:12}}>Add meals and your list builds itself</div>
                </div>
              ):(
                <div style={{background:"white",borderRadius:16,border:"1px solid #e8e0d8",overflow:"hidden"}}>
                  {groceryList.map((item,i)=>(
                    <div key={item.name} onClick={()=>toggleChecked(item.name)} style={{
                      display:"flex",alignItems:"center",gap:12,padding:"12px 16px",
                      borderBottom:i<groceryList.length-1?"1px solid #f0ebe3":"none",
                      cursor:"pointer",transition:"background 0.15s",background:checkedItems[item.name]?"#f8f6f2":"white",
                    }} onMouseEnter={e=>{if(!checkedItems[item.name])e.currentTarget.style.background="#faf8f5";}}
                      onMouseLeave={e=>{e.currentTarget.style.background=checkedItems[item.name]?"#f8f6f2":"white";}}>
                      <div style={{
                        width:20,height:20,borderRadius:6,border:`2px solid ${checkedItems[item.name]?"#6b8f71":"#d0c8be"}`,
                        background:checkedItems[item.name]?"#6b8f71":"white",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",flexShrink:0,
                      }}>{checkedItems[item.name]&&<span style={{color:"white",fontSize:12,fontWeight:700}}>✓</span>}</div>
                      <span style={{flex:1,fontSize:13,fontWeight:500,color:checkedItems[item.name]?"#b5a898":"#2d2418",textDecoration:checkedItems[item.name]?"line-through":"none",transition:"all 0.2s"}}>{item.name}</span>
                      {item.count>1&&<span style={{fontSize:10,fontWeight:600,color:"#6b8f71",background:"#e8f0e8",padding:"2px 8px",borderRadius:20}}>×{item.count}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ AI ═══ */}
          {view==="ai"&&(
            <div style={{paddingTop:18,paddingBottom:40}}>
              <AIAdvisor onAddMeal={addMeal} activeDay={activeDay}/>
              <div style={{background:"white",borderRadius:12,border:"1px solid #e8e0d8",padding:14}}>
                <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:"#a09484",marginBottom:8}}>{activeDay}'s plan</div>
                {MEAL_TYPES.map(type=>{
                  const meal=plan[`${activeDay}-${type}`];
                  return (
                    <div key={type} style={{marginBottom:5}}>
                      <span style={{fontSize:10,color:"#b5a898",fontWeight:600}}>{type}: </span>
                      <span style={{fontSize:12,color:meal?"#2d2418":"#d0c8be",fontWeight:meal?500:400}}>{meal?`${meal.name} (${meal.calories} cal)`:"Empty"}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═══ CUSTOM MEALS ═══ */}
          {view==="custom"&&(
            <div style={{paddingTop:18,paddingBottom:40}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
                <div>
                  <h2 style={{fontFamily:PF,fontSize:20,fontWeight:700,color:"#2d2418",margin:0}}>My Meals</h2>
                  <p style={{margin:"3px 0 0",fontSize:12,color:"#8a7e72"}}>{customMeals.length} custom meals · {favorites.size} favorites</p>
                </div>
                <button onClick={()=>setShowCreator(!showCreator)} style={{
                  padding:"8px 16px",borderRadius:8,border:"none",background:showCreator?"#f5f0eb":"#3d5a40",
                  color:showCreator?"#6b5e50":"white",fontFamily:F,fontWeight:600,fontSize:12,cursor:"pointer",transition:"all 0.2s",
                }}>{showCreator?"Cancel":"+ Create Meal"}</button>
              </div>

              {showCreator&&<MealCreator onSave={saveCustomMeal} onClose={()=>setShowCreator(false)}/>}

              {/* Favorites */}
              {favorites.size>0&&(
                <div style={{marginBottom:20}}>
                  <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:"#f59e0b",marginBottom:10}}>⭐ Favorites</div>
                  <div style={{display:"grid",gap:8,gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))"}}>
                    {[...allMeals.Breakfast,...allMeals.Lunch,...allMeals.Dinner,...allMeals.Snack]
                      .filter((m,i,a)=>favorites.has(m.name)&&a.findIndex(x=>x.name===m.name)===i)
                      .map((m,i)=><MealCard key={i} meal={m} onFav={toggleFav} isFav={true} compact/>)}
                  </div>
                </div>
              )}

              {/* Custom meals */}
              {customMeals.length>0 ? (
                <div>
                  <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:"#a09484",marginBottom:10}}>Custom Meals</div>
                  <div style={{display:"grid",gap:8,gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))"}}>
                    {customMeals.map((m,i)=>(
                      <MealCard key={i} meal={m} onRemove={()=>setCustomMeals(p=>p.filter((_,j)=>j!==i))}
                        onFav={toggleFav} isFav={favorites.has(m.name)} compact/>
                    ))}
                  </div>
                </div>
              ) : !showCreator && (
                <div style={{textAlign:"center",padding:"50px 20px",color:"#b5a898",background:"white",borderRadius:16,border:"1px solid #e8e0d8"}}>
                  <div style={{fontSize:36,marginBottom:10}}>✏️</div>
                  <div style={{fontWeight:600,fontSize:14,marginBottom:4}}>No custom meals yet</div>
                  <div style={{fontSize:12}}>Create your own meals and they'll appear in the planner</div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
