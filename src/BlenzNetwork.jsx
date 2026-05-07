import { useState } from "react";

const STAGES = ["DTM","MG One","Board Plan","Follow-Up 1","Board Plan 2","Follow-Up 2","Budget Session","Launch"];
const SPEED_COLORS = { Walk: "#FF3B30", Jog: "#FF9500", Run: "#34C759" };
const SPEED_ICONS = { Walk: "🔴", Jog: "🟡", Run: "🟢" };

const SAMPLE_PROSPECTS = [
  { id: 1, name: "Marcus Rivera", phone: "555-1234", occupation: "Teacher", metAt: "Gym", stage: "MG One", followUpDate: "2026-05-10", notes: "Very interested, asked a lot of questions." },
  { id: 2, name: "Jasmine Lee", phone: "555-5678", occupation: "Nurse", metAt: "Coffee shop", stage: "Follow-Up 1", followUpDate: "2026-05-07", notes: "Has concerns about time commitment." },
  { id: 3, name: "Derek Thompson", phone: "555-9012", occupation: "Engineer", metAt: "Church", stage: "DTM", followUpDate: "2026-05-12", notes: "" },
  { id: 4, name: "Aisha Johnson", phone: "555-3456", occupation: "Sales Rep", metAt: "Networking event", stage: "Board Plan", followUpDate: "2026-05-08", notes: "Excited about income potential." },
  { id: 5, name: "Carlos Mendez", phone: "555-7890", occupation: "Contractor", metAt: "Barbershop", stage: "Launch", followUpDate: "", notes: "Ready to go!" },
];

const SAMPLE_IBOS = [
  { id: 1, name: "Tanya Williams", phone: "555-1111", speed: "Run", lastCheckIn: "2026-05-03", notes: "Crushing it—recruited 2 people this week." },
  { id: 2, name: "Brian Scott", phone: "555-2222", speed: "Jog", lastCheckIn: "2026-04-25", notes: "Needs help with follow-up skills." },
  { id: 3, name: "Priya Patel", phone: "555-3333", speed: "Walk", lastCheckIn: "2026-04-20", notes: "Busy with family, checking in monthly." },
  { id: 4, name: "James O'Brien", phone: "555-4444", speed: "Run", lastCheckIn: "2026-05-04", notes: "Attending every board plan." },
];

const SAMPLE_CUSTOMERS = [
  { id: 1, name: "Sandra Kim", phone: "555-6666", preferences: ["Skin Care","Daily Foundation"], orders: ["Double X Multivitamin","Hydrating System Bundle"], notes: "" },
  { id: 2, name: "Mike Torres", phone: "555-7777", preferences: ["Sports Nutrition","Energy Drinks"], orders: ["XS Energy Drinks","XS Grass-Fed Whey Protein"], notes: "Orders every month." },
  { id: 3, name: "Linda Brown", phone: "555-8888", preferences: ["Immunity","Gut & Digestion"], orders: ["Immunity Pack","Balance Within Probiotic"], notes: "" },
];

const PRODUCTS = [
  { name: "Double X Multivitamin", brand: "Nutrilite", category: "Daily Foundation", price: "$57.60", pv: 16.79, cpd: "$0.96" },
  { name: "Hydrating System Bundle", brand: "Artistry", category: "Skin Care", price: "$90.00", pv: 26.23, cpd: "" },
  { name: "XS Energy Drinks (12 flavors)", brand: "XS", category: "Energy Drinks", price: "$29.70", pv: 8.66, cpd: "~$2.50" },
  { name: "XS Grass-Fed Whey Protein", brand: "XS", category: "Sports Nutrition", price: "$44.10", pv: 12.86, cpd: "" },
  { name: "Immunity Pack", brand: "Nutrilite", category: "Immunity", price: "$29.70", pv: 8.66, cpd: "$1.49" },
  { name: "Balance Within Probiotic", brand: "Nutrilite", category: "Gut & Digestion", price: "$28.00", pv: 8.16, cpd: "$0.93" },
  { name: "Perfect Pack", brand: "Nutrilite", category: "Daily Foundation", price: "$150.30", pv: 43.82, cpd: "$5.01" },
  { name: "Vitamin C Extended Release", brand: "Nutrilite", category: "Immunity", price: "$48.60", pv: 14.17, cpd: "$0.27" },
  { name: "Sleep Health", brand: "Nutrilite", category: "Stress & Sleep", price: "$25.20", pv: 7.35, cpd: "$0.84" },
  { name: "Lion's Mane Mushroom", brand: "Nutrilite Organics", category: "Brain & Focus", price: "$30.60", pv: 8.92, cpd: "$1.02" },
  { name: "Firming Ultra Lifting Cream", brand: "Artistry", category: "Skin Care", price: "$63.00", pv: 18.37, cpd: "" },
  { name: "XS Pre-Workout Boost", brand: "XS", category: "Sports Nutrition", price: "$35.10", pv: 10.23, cpd: "" },
  { name: "Digestive Enzyme", brand: "Nutrilite", category: "Gut & Digestion", price: "$35.10", pv: 10.23, cpd: "$0.59" },
  { name: "Balancing System Bundle", brand: "Artistry", category: "Skin Care", price: "$90.00", pv: 26.23, cpd: "" },
  { name: "XS Sports Protein Shakes", brand: "XS", category: "Sports Nutrition", price: "$44.10", pv: 12.86, cpd: "" },
];

function getSuggested(customer) {
  return PRODUCTS.filter(p => customer.preferences.includes(p.category) && !customer.orders.includes(p.name)).slice(0, 4);
}

function daysSince(d) {
  if (!d) return 999;
  return Math.floor((Date.now() - new Date(d)) / 86400000);
}

const S = {
  wrap: { maxWidth: 430, margin: "0 auto", background: "#F2F2F7", minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif", paddingBottom: 80, position: "relative" },
  header: { background: "linear-gradient(135deg, #007AFF 0%, #0055CC 100%)", padding: "20px 16px 16px", position: "sticky", top: 0, zIndex: 10 },
  appName: { fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: -0.5 },
  appSub: { fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 2 },
  card: { background: "#fff", borderRadius: 14, padding: 14, marginBottom: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" },
  row: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", borderRadius: 12, padding: "12px 14px", marginBottom: 6, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", cursor: "pointer" },
  label: { fontSize: 12, fontWeight: 600, color: "#8E8E93", minWidth: 85 },
  input: { flex: 1, border: "1px solid #E5E5EA", borderRadius: 8, padding: "7px 10px", fontSize: 14, background: "#F9F9F9", outline: "none", fontFamily: "inherit" },
  textarea: { flex: 1, border: "1px solid #E5E5EA", borderRadius: 8, padding: "7px 10px", fontSize: 14, background: "#F9F9F9", outline: "none", fontFamily: "inherit", width: "100%", minHeight: 80, resize: "vertical", boxSizing: "border-box" },
  primaryBtn: { background: "#007AFF", color: "#fff", border: "none", borderRadius: 10, padding: "11px 0", fontWeight: 700, fontSize: 14, cursor: "pointer", flex: 1 },
  ghostBtn: { background: "#F2F2F7", color: "#3A3A3C", border: "none", borderRadius: 10, padding: "11px 0", fontWeight: 600, fontSize: 14, cursor: "pointer", flex: 1 },
  addBtn: { background: "#007AFF", color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer" },
  backBtn: { background: "none", border: "none", color: "#007AFF", fontSize: 15, fontWeight: 600, cursor: "pointer", padding: 0, marginBottom: 12 },
  tag: { background: "#F2F2F7", borderRadius: 6, padding: "3px 8px", fontSize: 12, fontWeight: 600, color: "#3A3A3C" },
  sectionTitle: { fontSize: 22, fontWeight: 800, margin: 0, color: "#1C1C1E" },
  stageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#E5E5EA", borderRadius: 10, padding: "8px 12px", marginBottom: 4 },
  fieldRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 },
  tabBar: { position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)", borderTop: "1px solid #E5E5EA", display: "flex", zIndex: 20 },
};

function ProspectsTab() {
  const [prospects, setProspects] = useState(SAMPLE_PROSPECTS);
  const [selected, setSelected] = useState(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name:"", phone:"", occupation:"", metAt:"", stage:"DTM", followUpDate:"", notes:"" });

  function upd(field, val) {
    const u = { ...selected, [field]: val };
    setSelected(u);
    setProspects(prospects.map(p => p.id === u.id ? u : p));
  }

  function save() {
    if (!form.name) return;
    setProspects([...prospects, { ...form, id: Date.now() }]);
    setForm({ name:"", phone:"", occupation:"", metAt:"", stage:"DTM", followUpDate:"", notes:"" });
    setAdding(false);
  }

  function advance() {
    const i = STAGES.indexOf(selected.stage);
    if (i < STAGES.length - 1) upd("stage", STAGES[i + 1]);
  }

  function remove(id) { setProspects(prospects.filter(p => p.id !== id)); setSelected(null); }

  if (selected) return (
    <div style={{ padding: 16 }}>
      <button onClick={() => setSelected(null)} style={S.backBtn}>← Prospects</button>
      <div style={S.card}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 12 }}>
          <input value={selected.name} onChange={e => upd("name", e.target.value)} style={{ ...S.input, fontSize: 19, fontWeight: 800, border:"none", background:"transparent", padding:0, flex:1 }} />
          <span style={{ background:"#1C1C1E", color:"#fff", borderRadius:8, padding:"4px 10px", fontSize:11, fontWeight:700, marginLeft:8 }}>{selected.stage}</span>
        </div>
        {[["📞","Phone","phone"],["💼","Occupation","occupation"],["📍","Met At","metAt"]].map(([icon,label,key]) => (
          <div key={key} style={S.fieldRow}>
            <span style={S.label}>{icon} {label}</span>
            <input value={selected[key]} onChange={e => upd(key, e.target.value)} style={S.input} />
          </div>
        ))}
        <div style={S.fieldRow}>
          <span style={S.label}>📅 Follow-Up</span>
          <input type="date" value={selected.followUpDate} onChange={e => upd("followUpDate", e.target.value)} style={S.input} />
        </div>
        <div style={{ marginTop: 4 }}>
          <div style={S.label}>📝 Notes</div>
          <textarea value={selected.notes} onChange={e => upd("notes", e.target.value)} style={{ ...S.textarea, marginTop:6 }} placeholder="Add notes..." />
        </div>
        <div style={{ marginTop: 12 }}>
          <div style={S.label}>Move Stage</div>
          <select value={selected.stage} onChange={e => upd("stage", e.target.value)} style={{ ...S.input, marginTop:6, width:"100%" }}>
            {STAGES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div style={{ display:"flex", gap:8, marginTop:12 }}>
          {selected.stage !== "Launch" && <button onClick={advance} style={S.primaryBtn}>Next Stage →</button>}
          <button onClick={() => remove(selected.id)} style={{ ...S.ghostBtn, color:"#FF3B30" }}>Delete</button>
        </div>
      </div>
    </div>
  );

  const stageCounts = STAGES.map(s => ({ stage: s, people: prospects.filter(p => p.stage === s) }));

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <h2 style={S.sectionTitle}>Prospects</h2>
        <button onClick={() => setAdding(!adding)} style={S.addBtn}>+ Add</button>
      </div>
      {adding && (
        <div style={{ ...S.card, marginBottom:16 }}>
          <div style={{ fontWeight:700, fontSize:15, marginBottom:10 }}>New Prospect</div>
          {[["Name","name"],["Phone","phone"],["Occupation","occupation"],["Met At","metAt"]].map(([label,key]) => (
            <div key={key} style={S.fieldRow}>
              <span style={S.label}>{label}</span>
              <input value={form[key]} onChange={e => setForm({...form,[key]:e.target.value})} style={S.input} placeholder={label} />
            </div>
          ))}
          <div style={S.fieldRow}>
            <span style={S.label}>Stage</span>
            <select value={form.stage} onChange={e => setForm({...form,stage:e.target.value})} style={S.input}>
              {STAGES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div style={S.fieldRow}>
            <span style={S.label}>Follow-Up</span>
            <input type="date" value={form.followUpDate} onChange={e => setForm({...form,followUpDate:e.target.value})} style={S.input} />
          </div>
          <div style={{ display:"flex", gap:8, marginTop:10 }}>
            <button onClick={save} style={S.primaryBtn}>Save</button>
            <button onClick={() => setAdding(false)} style={S.ghostBtn}>Cancel</button>
          </div>
        </div>
      )}
      {stageCounts.map(({ stage, people }) => (
        <div key={stage} style={{ marginBottom:10 }}>
          <div style={S.stageHeader}>
            <span style={{ fontWeight:700, fontSize:13, color:"#1C1C1E" }}>{stage}</span>
            <span style={{ background:"#fff", borderRadius:20, padding:"2px 10px", fontSize:12, fontWeight:700 }}>{people.length}</span>
          </div>
          {people.length === 0 && <div style={{ fontSize:12, color:"#C7C7CC", padding:"6px 12px" }}>No prospects at this stage</div>}
          {people.map(p => (
            <div key={p.id} onClick={() => setSelected(p)} style={S.row}>
              <div>
                <div style={{ fontWeight:600, fontSize:15 }}>{p.name}</div>
                <div style={{ fontSize:12, color: p.followUpDate ? "#007AFF" : "#8E8E93" }}>
                  {p.followUpDate ? `📅 Follow-up: ${p.followUpDate}` : "No follow-up set"}
                </div>
              </div>
              <span style={{ color:"#C7C7CC", fontSize:18 }}>›</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function IBOsTab() {
  const [ibos, setIbos] = useState(SAMPLE_IBOS);
  const [selected, setSelected] = useState(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name:"", phone:"", speed:"Walk", lastCheckIn:"", notes:"" });

  function upd(field, val) {
    const u = { ...selected, [field]: val };
    setSelected(u);
    setIbos(ibos.map(i => i.id === u.id ? u : i));
  }

  function save() {
    if (!form.name) return;
    setIbos([...ibos, { ...form, id: Date.now() }]);
    setForm({ name:"", phone:"", speed:"Walk", lastCheckIn:"", notes:"" });
    setAdding(false);
  }

  function remove(id) { setIbos(ibos.filter(i => i.id !== id)); setSelected(null); }

  if (selected) {
    const days = daysSince(selected.lastCheckIn);
    return (
      <div style={{ padding:16 }}>
        <button onClick={() => setSelected(null)} style={S.backBtn}>← IBOs</button>
        <div style={S.card}>
          <input value={selected.name} onChange={e => upd("name", e.target.value)} style={{ ...S.input, fontSize:19, fontWeight:800, border:"none", background:"transparent", padding:0, width:"100%", marginBottom:10 }} />
          {days >= 7 && <div style={{ background:"#FF9500", color:"#fff", borderRadius:8, padding:"6px 10px", fontSize:12, fontWeight:600, marginBottom:10 }}>⚠️ Check-in overdue · {days} days ago</div>}
          <div style={S.fieldRow}>
            <span style={S.label}>📞 Phone</span>
            <input value={selected.phone} onChange={e => upd("phone", e.target.value)} style={S.input} />
          </div>
          <div style={S.fieldRow}>
            <span style={S.label}>📅 Last Check-In</span>
            <input type="date" value={selected.lastCheckIn} onChange={e => upd("lastCheckIn", e.target.value)} style={S.input} />
          </div>
          <div style={{ marginTop:10 }}>
            <div style={{ ...S.label, marginBottom:8 }}>Speed Level</div>
            <div style={{ display:"flex", gap:8 }}>
              {["Walk","Jog","Run"].map(sp => (
                <button key={sp} onClick={() => upd("speed", sp)} style={{ flex:1, padding:"11px 0", borderRadius:10, border:"none", cursor:"pointer", fontWeight:800, fontSize:14, background: selected.speed === sp ? SPEED_COLORS[sp] : "#E5E5EA", color: selected.speed === sp ? "#fff" : "#8E8E93" }}>
                  {SPEED_ICONS[sp]} {sp}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginTop:12 }}>
            <div style={{ ...S.label, marginBottom:6 }}>📝 Notes & Updates</div>
            <textarea value={selected.notes} onChange={e => upd("notes", e.target.value)} style={S.textarea} placeholder="Track progress, what they need help with..." />
          </div>
          <div style={{ display:"flex", gap:8, marginTop:12 }}>
            <button onClick={() => setSelected(null)} style={S.primaryBtn}>Done</button>
            <button onClick={() => remove(selected.id)} style={{ ...S.ghostBtn, color:"#FF3B30" }}>Delete</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <h2 style={S.sectionTitle}>IBOs</h2>
        <button onClick={() => setAdding(!adding)} style={S.addBtn}>+ Add</button>
      </div>
      {adding && (
        <div style={{ ...S.card, marginBottom:16 }}>
          <div style={{ fontWeight:700, fontSize:15, marginBottom:10 }}>New IBO</div>
          {[["Name","name"],["Phone","phone"]].map(([label,key]) => (
            <div key={key} style={S.fieldRow}>
              <span style={S.label}>{label}</span>
              <input value={form[key]} onChange={e => setForm({...form,[key]:e.target.value})} style={S.input} placeholder={label} />
            </div>
          ))}
          <div style={S.fieldRow}>
            <span style={S.label}>Speed</span>
            <select value={form.speed} onChange={e => setForm({...form,speed:e.target.value})} style={S.input}>
              {["Walk","Jog","Run"].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div style={S.fieldRow}>
            <span style={S.label}>Last Check-In</span>
            <input type="date" value={form.lastCheckIn} onChange={e => setForm({...form,lastCheckIn:e.target.value})} style={S.input} />
          </div>
          <div style={{ display:"flex", gap:8, marginTop:10 }}>
            <button onClick={save} style={S.primaryBtn}>Save</button>
            <button onClick={() => setAdding(false)} style={S.ghostBtn}>Cancel</button>
          </div>
        </div>
      )}
      {["Run","Jog","Walk"].map(speed => {
        const group = ibos.filter(i => i.speed === speed);
        if (!group.length) return null;
        return (
          <div key={speed} style={{ marginBottom:14 }}>
            <div style={{ ...S.stageHeader, background: SPEED_COLORS[speed] }}>
              <span style={{ fontWeight:800, fontSize:13, color:"#fff" }}>{SPEED_ICONS[speed]} {speed}</span>
              <span style={{ background:"rgba(255,255,255,0.3)", color:"#fff", borderRadius:20, padding:"2px 10px", fontSize:12, fontWeight:700 }}>{group.length}</span>
            </div>
            {group.map(ibo => {
              const days = daysSince(ibo.lastCheckIn);
              return (
                <div key={ibo.id} onClick={() => setSelected(ibo)} style={S.row}>
                  <div>
                    <div style={{ fontWeight:600, fontSize:15 }}>{ibo.name}</div>
                    <div style={{ fontSize:12, color: days >= 7 ? "#FF3B30" : "#8E8E93" }}>
                      {ibo.lastCheckIn ? `Last check-in: ${ibo.lastCheckIn}${days >= 7 ? " ⚠️" : ""}` : "No check-in recorded"}
                    </div>
                  </div>
                  <span style={{ color:"#C7C7CC", fontSize:18 }}>›</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function CustomersTab() {
  const [customers, setCustomers] = useState(SAMPLE_CUSTOMERS);
  const [selected, setSelected] = useState(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name:"", phone:"", preferences:[], orders:[], notes:"" });
  const [prefInput, setPrefInput] = useState("");
  const [orderInput, setOrderInput] = useState("");

  function upd(field, val) {
    const u = { ...selected, [field]: val };
    setSelected(u);
    setCustomers(customers.map(c => c.id === u.id ? u : c));
  }

  function save() {
    if (!form.name) return;
    setCustomers([...customers, { ...form, id: Date.now() }]);
    setForm({ name:"", phone:"", preferences:[], orders:[], notes:"" });
    setAdding(false);
  }

  function remove(id) { setCustomers(customers.filter(c => c.id !== id)); setSelected(null); }

  if (selected) {
    const suggested = getSuggested(selected);
    return (
      <div style={{ padding:16 }}>
        <button onClick={() => setSelected(null)} style={S.backBtn}>← Customers</button>
        <div style={S.card}>
          <input value={selected.name} onChange={e => upd("name", e.target.value)} style={{ ...S.input, fontSize:19, fontWeight:800, border:"none", background:"transparent", padding:0, width:"100%", marginBottom:10 }} />
          <div style={S.fieldRow}>
            <span style={S.label}>📞 Phone</span>
            <input value={selected.phone} onChange={e => upd("phone", e.target.value)} style={S.input} />
          </div>
          <div style={{ marginTop:8 }}>
            <div style={{ ...S.label, marginBottom:6 }}>🏷 Preferences</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:8 }}>
              {selected.preferences.map(p => (
                <span key={p} style={{ ...S.tag, cursor:"pointer" }} onClick={() => upd("preferences", selected.preferences.filter(x => x !== p))}>
                  {p} ✕
                </span>
              ))}
            </div>
            <div style={{ display:"flex", gap:6 }}>
              <input value={prefInput} onChange={e => setPrefInput(e.target.value)} style={{ ...S.input, fontSize:13 }} placeholder="Add preference..." />
              <button onClick={() => { if (prefInput) { upd("preferences", [...selected.preferences, prefInput]); setPrefInput(""); }}} style={{ ...S.addBtn, padding:"7px 12px", fontSize:12 }}>Add</button>
            </div>
          </div>
          <div style={{ marginTop:12 }}>
            <div style={{ ...S.label, marginBottom:6 }}>📦 Order History</div>
            {selected.orders.map(o => (
              <div key={o} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:14, color:"#3A3A3C", marginBottom:4 }}>
                <span>• {o}</span>
                <span style={{ cursor:"pointer", color:"#FF3B30", fontSize:12 }} onClick={() => upd("orders", selected.orders.filter(x => x !== o))}>Remove</span>
              </div>
            ))}
            <div style={{ display:"flex", gap:6, marginTop:6 }}>
              <input value={orderInput} onChange={e => setOrderInput(e.target.value)} style={{ ...S.input, fontSize:13 }} placeholder="Add product ordered..." />
              <button onClick={() => { if (orderInput) { upd("orders", [...selected.orders, orderInput]); setOrderInput(""); }}} style={{ ...S.addBtn, padding:"7px 12px", fontSize:12 }}>Add</button>
            </div>
          </div>
          <div style={{ marginTop:12 }}>
            <div style={{ ...S.label, marginBottom:6 }}>📝 Notes</div>
            <textarea value={selected.notes} onChange={e => upd("notes", e.target.value)} style={S.textarea} placeholder="Notes about this customer..." />
          </div>
          <button onClick={() => remove(selected.id)} style={{ ...S.ghostBtn, color:"#FF3B30", marginTop:12, width:"100%" }}>Delete Customer</button>
        </div>
        {suggested.length > 0 && (
          <div style={{ marginTop:4 }}>
            <div style={{ fontWeight:800, fontSize:17, marginBottom:10, color:"#1C1C1E" }}>✨ Suggested Products</div>
            {suggested.map(p => (
              <div key={p.name} style={{ ...S.card, marginBottom:8 }}>
                <div style={{ fontWeight:700, fontSize:15 }}>{p.name}</div>
                <div style={{ fontSize:12, color:"#8E8E93", marginTop:2 }}>{p.brand} · {p.category}</div>
                <div style={{ display:"flex", gap:6, marginTop:8, flexWrap:"wrap" }}>
                  <span style={{ ...S.tag, background:"#E3F2FF", color:"#007AFF" }}>{p.price}</span>
                  <span style={S.tag}>PV: {p.pv}</span>
                  {p.cpd && <span style={{ ...S.tag, background:"#E8F8ED", color:"#34C759" }}>{p.cpd}/day</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <h2 style={S.sectionTitle}>Customers</h2>
        <button onClick={() => setAdding(!adding)} style={S.addBtn}>+ Add</button>
      </div>
      {adding && (
        <div style={{ ...S.card, marginBottom:16 }}>
          <div style={{ fontWeight:700, fontSize:15, marginBottom:10 }}>New Customer</div>
          {[["Name","name"],["Phone","phone"]].map(([label,key]) => (
            <div key={key} style={S.fieldRow}>
              <span style={S.label}>{label}</span>
              <input value={form[key]} onChange={e => setForm({...form,[key]:e.target.value})} style={S.input} placeholder={label} />
            </div>
          ))}
          <div style={{ display:"flex", gap:8, marginTop:10 }}>
            <button onClick={save} style={S.primaryBtn}>Save</button>
            <button onClick={() => setAdding(false)} style={S.ghostBtn}>Cancel</button>
          </div>
        </div>
      )}
      {customers.map(c => (
        <div key={c.id} onClick={() => setSelected(c)} style={S.row}>
          <div>
            <div style={{ fontWeight:600, fontSize:15 }}>{c.name}</div>
            <div style={{ fontSize:12, color:"#8E8E93" }}>{c.preferences.join(", ") || "No preferences set"}</div>
          </div>
          <span style={{ color:"#C7C7CC", fontSize:18 }}>›</span>
        </div>
      ))}
    </div>
  );
}

function CalendarTab() {
  const [events, setEvents] = useState([
    { id:1, title:"MGOne - Marcus Rivera", date:"2026-05-10", time:"10:00", location:"Starbucks on Main", notes:"" },
    { id:2, title:"Board Plan - John's Seminar", date:"2026-05-08", time:"18:00", location:"Marriott Hotel", notes:"Bring Jasmine & Derek" },
    { id:3, title:"Follow-Up 1 - Aisha Johnson", date:"2026-05-07", time:"14:00", location:"Coffee Bean", notes:"" },
  ]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title:"", date:"", time:"", location:"", notes:"" });

  function save() {
    if (!form.title || !form.date) return;
    setEvents([...events, { ...form, id: Date.now() }]);
    setForm({ title:"", date:"", time:"", location:"", notes:"" });
    setAdding(false);
  }

  function remove(id) { setEvents(events.filter(e => e.id !== id)); }

  const sorted = [...events].sort((a,b) => new Date(`${a.date}T${a.time||"00:00"}`) - new Date(`${b.date}T${b.time||"00:00"}`));

  return (
    <div style={{ padding:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <h2 style={S.sectionTitle}>Calendar</h2>
        <button onClick={() => setAdding(!adding)} style={S.addBtn}>+ Event</button>
      </div>
      {adding && (
        <div style={{ ...S.card, marginBottom:16 }}>
          <div style={{ fontWeight:700, fontSize:15, marginBottom:10 }}>New Event</div>
          {[["Title","title","text"],["Date","date","date"],["Time","time","time"],["Location","location","text"]].map(([label,key,type]) => (
            <div key={key} style={S.fieldRow}>
              <span style={S.label}>{label}</span>
              <input type={type} value={form[key]} onChange={e => setForm({...form,[key]:e.target.value})} style={S.input} placeholder={label} />
            </div>
          ))}
          <div style={S.fieldRow}>
            <span style={S.label}>Notes</span>
            <textarea value={form.notes} onChange={e => setForm({...form,notes:e.target.value})} style={{ ...S.textarea, minHeight:50 }} placeholder="Notes..." />
          </div>
          <div style={{ display:"flex", gap:8, marginTop:10 }}>
            <button onClick={save} style={S.primaryBtn}>Save</button>
            <button onClick={() => setAdding(false)} style={S.ghostBtn}>Cancel</button>
          </div>
        </div>
      )}
      {sorted.map(e => (
        <div key={e.id} style={{ ...S.card, borderLeft:`4px solid #007AFF` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div style={{ fontWeight:700, fontSize:15, flex:1 }}>{e.title}</div>
            <button onClick={() => remove(e.id)} style={{ background:"none", border:"none", color:"#FF3B30", cursor:"pointer", fontSize:12, padding:0, marginLeft:8 }}>✕</button>
          </div>
          <div style={{ fontSize:13, color:"#007AFF", marginTop:4, fontWeight:600 }}>📅 {e.date}{e.time && ` at ${e.time}`}</div>
          {e.location && <div style={{ fontSize:13, color:"#8E8E93", marginTop:2 }}>📍 {e.location}</div>}
          {e.notes && <div style={{ fontSize:13, color:"#3A3A3C", marginTop:4 }}>📝 {e.notes}</div>}
        </div>
      ))}
    </div>
  );
}

export default function BlenzNetwork() {
  const [tab, setTab] = useState("prospects");
  const tabs = [
    { id:"prospects", label:"Prospects", icon:"👥" },
    { id:"ibos", label:"IBOs", icon:"🚀" },
    { id:"customers", label:"Customers", icon:"🛍️" },
    { id:"calendar", label:"Calendar", icon:"📅" },
  ];

  return (
    <div style={S.wrap}>
      <div style={S.header}>
        <div style={S.appName}>Blenz Network</div>
        <div style={S.appSub}>Your Business Command Center</div>
      </div>
      <div>
        {tab === "prospects" && <ProspectsTab />}
        {tab === "ibos" && <IBOsTab />}
        {tab === "customers" && <CustomersTab />}
        {tab === "calendar" && <CalendarTab />}
      </div>
      <div style={S.tabBar}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex:1, border:"none", background:"none", padding:"10px 0 16px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
            <span style={{ fontSize:22 }}>{t.icon}</span>
            <span style={{ fontSize:10, fontWeight:700, color: tab === t.id ? "#007AFF" : "#8E8E93" }}>{t.label}</span>
            {tab === t.id && <div style={{ width:4, height:4, borderRadius:"50%", background:"#007AFF", marginTop:1 }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
