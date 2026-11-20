import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Leaf, ScanLine, Package, ChefHat, MessageCircle, User, Home, History,
  Bell, Search, Plus, ArrowRight, ArrowLeft, Check, CheckCircle2, Clock,
  Thermometer, ShieldCheck, Send, Camera, Image as ImageIcon, LogOut,
  Eye, EyeOff, Menu, X, Sparkles, ShoppingCart, ClipboardList, Settings,
  ChevronRight, CircleHelp, Apple, Mail, Lock, Sprout
} from "lucide-react";
import "./styles.css";

const initialStock = [
  { id: 1, name: "Cabai Merah", amount: "3.2 kg", state: "Segar", tone: "fresh", emoji: "🌶️" },
  { id: 2, name: "Tomat", amount: "5.1 kg", state: "Segar", tone: "fresh", emoji: "🍅" },
  { id: 3, name: "Bayam", amount: "2.4 kg", state: "Cukup", tone: "mid", emoji: "🥬" },
  { id: 4, name: "Wortel", amount: "1.8 kg", state: "Hampir Habis", tone: "low", emoji: "🥕" }
];

const recipes = [
  { title: "Sambal Tomat", desc: "Cocok untuk tomat yang mulai layu", time: "15 menit", level: "Mudah", emoji: "🍅", color: "recipe-red" },
  { title: "Tumis Sayur Tomat", desc: "Segar dan bergizi untuk menu harian", time: "20 menit", level: "Mudah", emoji: "🥗", color: "recipe-green" },
  { title: "Sup Tomat Sederhana", desc: "Hangat dan menyegarkan", time: "25 menit", level: "Mudah", emoji: "🍲", color: "recipe-orange" }
];

function Brand({ compact = false }) {
  return <div className={`brand ${compact ? "brand-compact" : ""}`}>
    <span className="brand-mark"><Leaf size={compact ? 17 : 22} /></span>
    <span>Fresh<span>Detect</span> AI</span>
  </div>;
}

function Splash({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);
  return <div className="splash-screen">
    <div className="splash-orb orb-one" /><div className="splash-orb orb-two" />
    <div className="splash-content">
      <div className="splash-logo"><Leaf size={48} /></div>
      <Brand />
      <h1>Deteksi Kesegaran.<br /><span>Dukung Keberlanjutan.</span></h1>
      <div className="splash-illustration">
        <div className="phone-leaf"><ScanLine size={68} /><Leaf size={28} /></div>
        <span className="food food-tomato">🍅</span><span className="food food-carrot">🥕</span>
        <span className="food food-greens">🥬</span>
      </div>
      <div className="loading-track"><span /></div>
      <p>Menyiapkan aplikasi...</p>
    </div>
    <div className="splash-dots"><i /><i /><i /></div>
  </div>;
}

function Login({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return setError("Isi email dan password terlebih dahulu.");
    onLogin(email.split("@")[0] || "Pemilik UMKM");
  };
  return <main className="auth-wrap">
    <div className="auth-art">
      <div className="art-badge"><Sprout size={16} /> UMKM lebih berkelanjutan</div>
      <div className="art-copy"><h1>Kelola bahan pangan<br /><span>lebih cerdas.</span></h1><p>Pantau kesegaran, kurangi pemborosan, dan temukan ide olahan bersama FreshDetect AI.</p></div>
      <div className="auth-food-art"><div className="scan-frame"><Leaf size={56} /></div><span>🍅</span><span>🥕</span><span>🥬</span></div>
      <div className="art-footer">Teknologi AI untuk keberlanjutan UMKM</div>
    </div>
    <section className="auth-card">
      <Brand />
      <div className="auth-heading"><p className="eyebrow">SELAMAT DATANG</p><h2>{mode === "login" ? "Masuk ke akun Anda" : "Buat akun baru"}</h2><p>Masuk untuk melanjutkan ke layanan FreshDetect AI.</p></div>
      <form onSubmit={submit}>
        <label className="field-label">Email atau Username</label>
        <div className="input-wrap"><Mail size={18} /><input value={email} onChange={e => setEmail(e.target.value)} placeholder="nama@email.com" /></div>
        <label className="field-label">Password</label>
        <div className="input-wrap"><Lock size={18} /><input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Masukkan password" /><button type="button" className="icon-button" onClick={() => setShowPass(!showPass)}>{showPass ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div>
        {error && <p className="form-error">{error}</p>}
        <button className="btn-primary full-btn" type="submit">{mode === "login" ? "Masuk" : "Daftar"} <ArrowRight size={17}/></button>
      </form>
      <div className="or-line"><span>atau masuk dengan</span></div>
      <div className="social-row"><button onClick={() => onLogin("Pengguna Google")}><span className="google-g">G</span> Google</button><button onClick={() => onLogin("Pengguna Apple")}><Apple size={17}/> Apple</button></div>
      <p className="switch-auth">{mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"} <button onClick={() => {setMode(mode === "login" ? "register" : "login"); setError("");}}>{mode === "login" ? "Daftar di sini" : "Masuk"}</button></p>
      <p className="demo-note">Demo prototype · gunakan email dan password apa saja</p>
    </section>
  </main>;
}

function Sidebar({ page, setPage, user, onLogout }) {
  const links = [
    ["home", "Beranda", Home], ["inventory", "Inventori", Package],
    ["scan", "Scan bahan", ScanLine], ["results", "Hasil analisis", ClipboardList],
    ["recipes", "Resep", ChefHat], ["consult", "Konsultasi", MessageCircle]
  ];
  return <aside className="sidebar">
    <Brand />
    <div className="side-label">MENU UTAMA</div>
    <nav>{links.map(([id, label, Icon]) => <button key={id} className={page === id ? "active" : ""} onClick={() => setPage(id)}><Icon size={18}/>{label}{id === "consult" && <span className="new-dot"/>}</button>)}</nav>
    <div className="sidebar-bottom"><div className="profile-mini"><div className="avatar">👩🏻‍🍳</div><div><b>{user}</b><small>Pemilik UMKM</small></div></div><button className="logout-btn" onClick={onLogout}><LogOut size={17}/> Keluar</button></div>
  </aside>;
}

function Header({ title, subtitle, user, onHelp }) {
  return <header className="topbar"><div><div className="mobile-brand"><Brand compact/></div><h1>{title}</h1><p>{subtitle}</p></div><div className="top-actions"><button className="help-button" onClick={onHelp}><CircleHelp size={17}/> Bantuan</button><button className="notification"><Bell size={19}/><i/></button><div className="top-avatar">👩🏻‍🍳</div><span className="top-user">{user}</span></div></header>;
}

function HomePage({ setPage, stock }) {
  return <>
    <div className="welcome-banner"><div><span className="eyebrow light">DASHBOARD UMKM</span><h2>Halo, {window.currentUser || "Pemilik UMKM"}! 👋</h2><p>Siap memantau kesegaran bahan baku hari ini?</p></div><div className="welcome-plant">🌿</div></div>
    <div className="stat-grid">
      <div className="stat-card"><div className="stat-icon green"><Package/></div><span>Total stok bahan</span><strong>12 <small>jenis</small></strong><em>+2 bahan minggu ini</em></div>
      <div className="stat-card"><div className="stat-icon mint"><ShieldCheck/></div><span>Bahan dalam kondisi segar</span><strong>8 <small>bahan</small></strong><em>67% dari inventori</em></div>
      <div className="stat-card"><div className="stat-icon amber"><Clock/></div><span>Perlu diperiksa</span><strong>2 <small>bahan</small></strong><em>Periksa hari ini</em></div>
    </div>
    <div className="content-grid">
      <section className="panel stock-panel"><div className="panel-heading"><div><h3>Inventori Bahan</h3><p>Pantau kondisi bahan baku Anda</p></div><button className="text-link" onClick={() => setPage("inventory")}>Lihat semua <ArrowRight size={15}/></button></div><StockList stock={stock.slice(0,4)}/></section>
      <section className="panel scan-promo"><div className="promo-icon"><ScanLine size={25}/></div><span className="eyebrow">FITUR AI</span><h3>Periksa kesegaran bahan</h3><p>Ambil foto bahan pangan dan dapatkan analisis kesegarannya.</p><button className="btn-primary" onClick={() => setPage("scan")}>Mulai Scan <ArrowRight size={16}/></button><div className="promo-leaf">🍃</div></section>
    </div>
    <section className="panel quick-panel"><div className="panel-heading"><div><h3>Akses cepat</h3><p>Fitur yang sering digunakan</p></div></div><div className="quick-grid"><QuickAction icon={Package} title="Inventori" desc="Kelola stok bahan" onClick={() => setPage("inventory")}/><QuickAction icon={ScanLine} title="Scan bahan" desc="Deteksi kesegaran" onClick={() => setPage("scan")}/><QuickAction icon={ChefHat} title="Resep" desc="Cari ide olahan" onClick={() => setPage("recipes")}/><QuickAction icon={MessageCircle} title="Konsultasi" desc="Chat admin gratis" onClick={() => setPage("consult")}/></div></section>
  </>;
}

function QuickAction({ icon: Icon, title, desc, onClick }) { return <button className="quick-action" onClick={onClick}><span><Icon size={21}/></span><b>{title}</b><small>{desc}</small><ChevronRight size={16}/></button>; }

function StockList({ stock, onScan }) {
  return <div className="stock-list">{stock.map(item => <div className="stock-row" key={item.id}><div className="stock-emoji">{item.emoji}</div><div className="stock-info"><b>{item.name}</b><small>{item.amount}</small></div><span className={`status ${item.tone}`}>{item.state}</span>{onScan && <button className="row-action" onClick={() => onScan(item.name)}>Scan</button>}</div>)}</div>;
}

function InventoryPage({ stock, setStock, setPage, setSelected }) {
  const [query, setQuery] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const filtered = stock.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));
  const add = (e) => { e.preventDefault(); if (!name.trim() || !amount.trim()) return; setStock([...stock, {id: Date.now(), name, amount, state:"Segar", tone:"fresh", emoji:"🥦"}]); setName(""); setAmount(""); setShowAdd(false); };
  return <><div className="page-tools"><div className="search-box"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari bahan pangan..."/></div><button className="btn-primary" onClick={()=>setShowAdd(!showAdd)}><Plus size={17}/> Tambah bahan</button></div>
    {showAdd && <form className="panel add-form" onSubmit={add}><h3>Tambah bahan inventori</h3><input value={name} onChange={e=>setName(e.target.value)} placeholder="Nama bahan"/><input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Jumlah (contoh: 2 kg)"/><button className="btn-primary">Simpan bahan</button></form>}
    <section className="panel"><div className="panel-heading"><div><h3>Daftar Inventori</h3><p>{filtered.length} bahan terdaftar dalam inventori</p></div><span className="soft-pill">Diperbarui hari ini</span></div><StockList stock={filtered} onScan={(n)=>{setSelected(n);setPage("scan");}}/></section>
  </>;
}

function ScanPage({ setPage, selected, setSelected, setResult }) {
  const [scanning, setScanning] = useState(false);
  const [done, setDone] = useState(false);
  const runScan = () => { setScanning(true); setDone(false); setTimeout(() => { setScanning(false); setDone(true); setResult({name:selected || "Tomat", score:94, status:"Sangat Segar", shelf:"± 3 Hari"}); }, 1800); };
  return <div className="scan-layout"><section className="panel scan-panel"><div className="panel-heading"><div><h3>Scan Kesegaran Bahan</h3><p>Arahkan kamera atau pilih gambar bahan pangan</p></div><span className="ai-chip"><Sparkles size={14}/> AI Vision</span></div><div className={`camera-stage ${scanning ? "is-scanning" : ""}`}><div className="camera-bg"><div className="produce-basket"><span>🍅</span><span>🥬</span><span>🌶️</span></div></div><div className="scan-corners"/>{scanning && <div className="scan-line"/>}<div className="camera-hint">{scanning ? "AI sedang menganalisis..." : "Posisikan bahan di dalam bingkai"}</div></div><div className="scan-controls"><select value={selected || "Tomat"} onChange={e=>setSelected(e.target.value)}><option>Tomat</option><option>Cabai Merah</option><option>Bayam</option><option>Wortel</option></select><button className="btn-primary scan-button" onClick={runScan} disabled={scanning}>{scanning ? <><span className="spinner"/> Menganalisis</> : <><Camera size={18}/> {done ? "Scan Ulang" : "Mulai Scan"}</>}</button></div>{done && <div className="success-inline"><CheckCircle2 size={18}/> Analisis selesai. Hasil simulasi siap dilihat. <button onClick={()=>setPage("results")}>Lihat hasil</button></div>}</section><aside className="panel scan-tips"><div className="tip-icon"><Sparkles/></div><h3>Tips mendapatkan hasil terbaik</h3><ul><li>Pastikan pencahayaan cukup.</li><li>Ambil gambar dari jarak dekat.</li><li>Pastikan bahan terlihat jelas.</li><li>Gunakan latar yang tidak ramai.</li></ul><div className="privacy-note"><ShieldCheck size={17}/> Gambar hanya digunakan dalam demo ini.</div></aside></div>;
}

function ResultsPage({ result, setPage }) {
  return <div className="results-layout"><section className="panel result-main"><div className="panel-heading"><div><h3>Hasil Analisis Kesegaran</h3><p>Ringkasan pemeriksaan bahan pangan</p></div><span className="success-tag"><CheckCircle2 size={15}/> Analisis selesai</span></div><div className="score-area"><div className="score-ring"><div><strong>{result.score}</strong><small>/100</small></div></div><h2>{result.status}</h2><p>{result.name} terdeteksi dalam kondisi baik berdasarkan simulasi prototype.</p></div><div className="result-metrics"><div><span><Clock/></span><small>Estimasi umur simpan</small><b>{result.shelf}</b></div><div><span><Thermometer/></span><small>Suhu penyimpanan</small><b>4–8°C</b></div><div><span><ShieldCheck/></span><small>Kondisi bahan</small><b>Layak diperiksa</b></div></div><div className="recommend-box"><h3>Rekomendasi tindakan</h3><button onClick={()=>setPage("inventory")}><span><Package/></span><div><b>Simpan dengan benar</b><small>Simpan dalam wadah bersih dan sesuai suhu.</small></div><ChevronRight/></button><button onClick={()=>setPage("recipes")}><span><ChefHat/></span><div><b>Lihat rekomendasi resep</b><small>Temukan ide olahan dari bahan yang tersedia.</small></div><ChevronRight/></button></div></section><aside className="panel result-side"><div className="result-leaf">🌱</div><h3>Jaga kualitas bahan</h3><p>Periksa inventori secara berkala agar bahan pangan dapat dimanfaatkan dengan lebih optimal.</p><button className="btn-outline full-btn" onClick={()=>setPage("scan")}>Scan bahan lain</button><button className="text-link centered" onClick={()=>setPage("consult")}>Tanya admin gratis <ArrowRight size={15}/></button></aside></div>;
}

function RecipesPage({ setPage }) {
  return <><div className="recipe-intro"><div><span className="eyebrow">IDE OLAHAN CERDAS</span><h2>Jangan biarkan bahan terbuang 🌿</h2><p>Manfaatkan bahan yang tersedia menjadi hidangan lezat dan bernilai tambah.</p></div><button className="btn-outline" onClick={()=>setPage("inventory")}>Lihat inventori <Package size={16}/></button></div><div className="recipe-grid">{recipes.map((r,i)=><article className="recipe-card" key={r.title}><div className={`recipe-art ${r.color}`}><span>{r.emoji}</span><i>FreshDetect Choice</i></div><div className="recipe-body"><span className="eyebrow">REKOMENDASI RESEP</span><h3>{r.title}</h3><p>{r.desc}</p><div className="recipe-meta"><span><Clock size={14}/>{r.time}</span><span><ChefHat size={14}/>{r.level}</span></div><button className="recipe-link" onClick={()=>setPage("consult")}>Tanya cara mengolah <ArrowRight size={15}/></button></div></article>)}</div></>;
}

function ConsultPage() {
  const [messages, setMessages] = useState([{from:"admin", text:"Halo! 👋 Selamat datang di konsultasi FreshDetect AI. Ada yang bisa kami bantu terkait kesegaran bahan, penyimpanan, atau penggunaan aplikasi?"}]);
  const [draft, setDraft] = useState("");
  const send = (e) => { e.preventDefault(); if (!draft.trim()) return; const value=draft.trim(); setMessages(m=>[...m,{from:"user",text:value}]); setDraft(""); setTimeout(()=>setMessages(m=>[...m,{from:"admin",text:"Terima kasih sudah menghubungi FreshDetect AI! Ini masih demo chat. Tim admin dapat membantu menjawab pertanyaan seputar kesegaran dan penyimpanan bahan pangan."}]),700); };
  return <div className="chat-layout"><section className="panel chat-panel"><div className="chat-head"><div className="admin-avatar">👩🏻‍💼<i/></div><div><b>Admin FreshDetect AI</b><small><span/> Online · Konsultasi gratis</small></div><span className="free-badge">GRATIS</span></div><div className="chat-banner"><MessageCircle size={20}/><div><b>Butuh bantuan untuk usaha Anda?</b><p>Konsultasikan kesegaran bahan, penyimpanan, dan rekomendasi olahan bersama tim kami.</p></div></div><div className="chat-messages">{messages.map((m,i)=><div key={i} className={`message ${m.from}`}>{m.from==="admin"&&<span className="message-logo"><Leaf size={14}/></span>}<div>{m.text}<small>{m.from==="admin"?"Admin · ":"Anda · "}09:{String(40+i).padStart(2,"0")}</small></div></div>)}</div><form className="chat-compose" onSubmit={send}><input value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Ketik pesan Anda..." /><button aria-label="Kirim pesan"><Send size={18}/></button></form></section><aside className="panel consult-info"><div className="consult-illustration">💬</div><span className="eyebrow">LAYANAN PENDAMPINGAN</span><h3>Konsultasi tanpa biaya</h3><p>Tim FreshDetect AI siap membantu Anda memahami hasil analisis dan mengelola bahan pangan.</p><div className="consult-topic"><CheckCircle2/> Tips penyimpanan bahan</div><div className="consult-topic"><CheckCircle2/> Tanya hasil deteksi AI</div><div className="consult-topic"><CheckCircle2/> Ide resep dan pengolahan</div><div className="hours-note"><Clock size={16}/> Jam layanan admin dapat disesuaikan.</div></aside></div>;
}

function App() {
  const [splash, setSplash] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("Pemilik UMKM");
  const [page, setPage] = useState("home");
  const [stock, setStock] = useState(initialStock);
  const [selected, setSelected] = useState("Tomat");
  const [result, setResult] = useState({name:"Tomat",score:94,status:"Sangat Segar",shelf:"± 3 Hari"});
  const [mobileMenu, setMobileMenu] = useState(false);
  const titles = {
    home:["Dashboard","Ringkasan kondisi bahan pangan dan aktivitas usaha Anda."],
    inventory:["Inventori Bahan","Kelola dan pantau seluruh stok bahan baku UMKM."],
    scan:["Scan Bahan","Periksa kesegaran bahan pangan dengan bantuan AI."],
    results:["Hasil Analisis","Lihat ringkasan kondisi dan rekomendasi penyimpanan."],
    recipes:["Rekomendasi Resep","Temukan inspirasi olahan dari bahan yang Anda miliki."],
    consult:["Konsultasi Gratis","Dapatkan bantuan langsung dari admin FreshDetect AI."]
  };
  const login = (name) => { setUser(name); window.currentUser=name; setLoggedIn(true); };
  const logout = () => { setLoggedIn(false); setPage("home"); setSplash(false); };
  const help = () => setPage("consult");
  if (splash) return <Splash onDone={()=>setSplash(false)}/>;
  if (!loggedIn) return <Login onLogin={login}/>;
  const [title, subtitle] = titles[page];
  return <div className="app-shell">
    <div className={`mobile-overlay ${mobileMenu ? "show":""}`} onClick={()=>setMobileMenu(false)} />
    <div className={`sidebar-holder ${mobileMenu ? "open":""}`}><Sidebar page={page} setPage={p=>{setPage(p);setMobileMenu(false);}} user={user} onLogout={logout}/></div>
    <main className="main-area"><Header title={title} subtitle={subtitle} user={user} onHelp={help}/><div className="mobile-menu-button"><button onClick={()=>setMobileMenu(!mobileMenu)}>{mobileMenu?<X/>:<Menu/>}</button></div><div className="page-content">
      {page==="home" && <HomePage setPage={setPage} stock={stock}/>}
      {page==="inventory" && <InventoryPage stock={stock} setStock={setStock} setPage={setPage} setSelected={setSelected}/>}
      {page==="scan" && <ScanPage setPage={setPage} selected={selected} setSelected={setSelected} setResult={setResult}/>}
      {page==="results" && <ResultsPage result={result} setPage={setPage}/>}
      {page==="recipes" && <RecipesPage setPage={setPage}/>}
      {page==="consult" && <ConsultPage/>}
    </div><footer className="app-footer">© 2025 FreshDetect AI <span>•</span> Solusi cerdas untuk UMKM berkelanjutan</footer></main>
  </div>;
}

createRoot(document.getElementById("root")).render(<App/>);
