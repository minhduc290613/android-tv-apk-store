/**
 * Phòng chiếu số: nội dung ứng dụng là trung tâm, điều hướng remote rõ ràng,
 * màu hổ phách chỉ báo hành động trên nền than xanh đêm.
 */
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  Cast,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Gamepad2,
  Grid2X2,
  HardDriveDownload,
  Info,
  Menu,
  Music2,
  MonitorPlay,
  Search,
  Settings2,
  ShieldCheck,
  Shapes,
  Sparkles,
  Tv,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { loadAppCatalog, type AppItem, type Category } from "@/lib/app-catalog";
import { DEFAULT_SITE_CONFIG, loadSiteConfig } from "@/lib/site-config";

const categories: { name: Category; icon: typeof Grid2X2; description: string }[] = [
  { name: "Tất cả", icon: Grid2X2, description: "Toàn bộ thư viện" },
  { name: "Giải trí", icon: MonitorPlay, description: "Phim, chương trình" },
  { name: "Công cụ", icon: Settings2, description: "Tối ưu TV" },
  { name: "Trình phát", icon: Tv, description: "Video & âm thanh" },
  { name: "Trẻ em", icon: Gamepad2, description: "Góc gia đình" },
];

const coverSymbols = {
  "nova-stream": MonitorPlay,
  "cinema-box": Clapperboard,
  "file-pilot": Settings2,
  "screen-cast": Cast,
  "cloud-play": Tv,
  "sound-room": Music2,
  "little-planet": Shapes,
  "kidoodle-tv": Gamepad2,
} as const;

function AppCover({ app, large = false }: { app: AppItem; large?: boolean }) {
  const Symbol = coverSymbols[app.id as keyof typeof coverSymbols] ?? MonitorPlay;
  return (
    <div
      className={`app-cover app-cover--${app.id} ${large ? "app-cover--large" : ""}`}
      style={{ "--app-accent": app.accent } as CSSProperties}
      aria-hidden="true"
    >
      <div className="app-cover__rings" />
      <div className="app-cover__symbol"><Symbol strokeWidth={1.7} /></div>
      <span className="app-cover__caption">{app.category}</span>
      <i className="app-cover__signal" />
    </div>
  );
}

function AppCard({ app, onOpen }: { app: AppItem; onOpen: (app: AppItem) => void }) {
  return (
    <button className={`app-card ${app.featured ? "app-card--featured" : ""}`} onClick={() => onOpen(app)} aria-label={`Xem ${app.name}`}>
      <div className="app-card__glow" style={{ background: app.accent }} />
      <AppCover app={app} />
      <div className="app-card__copy">
        <h3>{app.name}</h3>
        <p>{app.category} · {app.size}</p>
      </div>
      <ArrowRight className="app-card__arrow" size={18} />
    </button>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("Tất cả");
  const [apps, setApps] = useState<AppItem[]>([]);
  const [site, setSite] = useState(DEFAULT_SITE_CONFIG);
  const [catalogState, setCatalogState] = useState<"loading" | "ready" | "error">("loading");
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("vi-VN");
    return apps.filter((app) => {
      const byCategory = category === "Tất cả" || app.category === category;
      const byQuery = !normalized || [app.name, app.category, ...app.tags].join(" ").toLowerCase().includes(normalized);
      return byCategory && byQuery;
    });
  }, [apps, category, query]);

  const featured = apps.filter((app) => app.featured);
  const recommended = apps.filter((app) => app.category === "Công cụ" || app.category === "Trình phát");

  useEffect(() => {
    let isCurrent = true;
    loadSiteConfig().then((config) => {
      if (isCurrent) setSite(config);
    }).catch(() => undefined);
    return () => { isCurrent = false; };
  }, []);

  useEffect(() => {
    document.title = site.metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", site.metadata.description);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", site.brand.themeColor);
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon && site.brand.faviconUrl) favicon.setAttribute("href", site.brand.faviconUrl);
  }, [site]);

  useEffect(() => {
    let isCurrent = true;
    loadAppCatalog()
      .then((catalog) => {
        if (!isCurrent) return;
        setApps(catalog);
        setCatalogState("ready");
      })
      .catch(() => {
        if (!isCurrent) return;
        setCatalogState("error");
      });
    return () => { isCurrent = false; };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape") {
        setSelectedApp(null);
        setNavOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const chooseCategory = (name: Category) => {
    setCategory(name);
    setNavOpen(false);
    document.getElementById("library")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const resetFilters = () => {
    setQuery("");
    setCategory("Tất cả");
  };

  const handleDownload = (app: AppItem) => {
    if (app.downloadUrl.trim()) {
      window.open(app.downloadUrl, "_blank", "noopener,noreferrer");
      return;
    }
    toast.info(`Chưa có tệp APK hợp pháp cho ${app.name}`, {
      description: "Hãy thêm downloadUrl cho ứng dụng này trong tệp apps.json.",
    });
  };

  return (
    <div className="tvkho-shell">
      <aside className={`side-nav ${navOpen ? "side-nav--open" : ""}`} aria-label="Điều hướng chính">
        <a className="brand" href="#top" aria-label={`${site.brand.name} - đầu trang`}>
          <span className="brand-mark" aria-hidden="true"><span className="brand-mark__fallback"><i /></span>{site.brand.logoUrl && <img src={site.brand.logoUrl} alt="" onError={(event) => { event.currentTarget.style.display = "none"; }} />}</span>
          <span className="brand-word">{site.brand.wordmarkPrefix}<span>{site.brand.wordmarkAccent}</span><small>{site.brand.wordmarkSuffix}</small></span>
        </a>
        <nav>
          <a className="side-nav__item side-nav__item--active" href="#top"><Sparkles size={19} /> Khám phá</a>
          <a className="side-nav__item" href="#library"><Grid2X2 size={19} /> Thư viện</a>
          <a className="side-nav__item" href="#new"><HardDriveDownload size={19} /> Mới cập nhật</a>
          <a className="side-nav__item" href="#safe"><ShieldCheck size={19} /> Hướng dẫn</a>
        </nav>
        <div className="side-nav__footer">
          <div className="remote-tip"><span className="remote-key">↑↓</span><p>{site.labels.move}</p></div>
          <div className="remote-tip"><span className="remote-key">OK</span><p>{site.labels.select}</p></div>
        </div>
      </aside>

      <main id="top" className="main-stage">
        <header className="topbar">
          <button className="menu-button" onClick={() => setNavOpen((value) => !value)} aria-label="Mở menu">
            <Menu size={22} />
          </button>
          <div className="search-wrap">
            <Search size={20} />
            <input
              ref={searchRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm tên ứng dụng hoặc thể loại"
              aria-label="Tìm kiếm ứng dụng"
            />
            <kbd>Ctrl K</kbd>
          </div>
          <a className="safe-pill" href="#safe"><ShieldCheck size={16} /> {site.labels.safeDownload}</a>
        </header>

        <section className="hero" aria-labelledby="hero-title">
          {site.hero.imageUrl && <img className="hero__image" src={site.hero.imageUrl} alt={site.hero.imageAlt} />}
          <div className="hero__shade" />
          <div className="hero__copy">
            <p className="eyebrow"><span /> {site.hero.eyebrow}</p>
            <h1 id="hero-title">{site.hero.title} <em>{site.hero.titleAccent}</em></h1>
            <p className="hero__lede">{site.hero.description}</p>
            <div className="hero__actions">
              <a className="button button--amber" href="#library">{site.hero.primaryCta} <ArrowRight size={18} /></a>
              <button className="button button--quiet" onClick={() => featured[0] && setSelectedApp(featured[0])} disabled={!featured[0]}><Info size={18} /> {site.appLabels.featuredButton}</button>
            </div>
          </div>
          <div className="hero__counter"><strong>{String(apps.length).padStart(2, "0")}</strong><span>{site.appLabels.selectedApps}</span></div>
        </section>

        <section className="category-section" aria-label="Danh mục ứng dụng">
          <div className="section-heading section-heading--compact"><p className="eyebrow"><span /> {site.labels.categoryEyebrow}</p><h2>{site.labels.categoryTitle}</h2></div>
          <div className="category-rail">
            {categories.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  className={`category-tile ${category === item.name ? "category-tile--active" : ""}`}
                  onClick={() => chooseCategory(item.name)}
                >
                  <Icon size={22} />
                  <span>{item.name === "Tất cả" ? site.appLabels.allApps : item.name}</span>
                  <small>{item.description}</small>
                </button>
              );
            })}
          </div>
        </section>

        <section id="library" className="library-section" aria-labelledby="library-title">
          <div className="section-heading">
            <div><p className="eyebrow"><span /> {site.labels.libraryEyebrow}</p><h2 id="library-title">{category === "Tất cả" ? site.labels.libraryTitle : category}</h2></div>
            <div className="heading-aside"><p className="section-heading__meta">{results.length} ứng dụng phù hợp</p><p className="focus-hint"><b>← →</b> {site.labels.remoteHint} <b>OK</b> {site.labels.viewHint}</p></div>
          </div>
          {catalogState === "loading" ? (
            <div className="empty-state"><p>Đang tải danh mục ứng dụng…</p></div>
          ) : results.length > 0 ? (
            <div className="app-grid">
              {results.map((app) => <AppCard key={app.id} app={app} onOpen={setSelectedApp} />)}
            </div>
          ) : (
            <div className="empty-state"><Search size={28} /><p>{catalogState === "error" ? "Không thể tải apps.json. Hãy kiểm tra cấu trúc tệp dữ liệu." : "Chưa tìm thấy ứng dụng phù hợp."}</p>{catalogState === "ready" && <button onClick={resetFilters}>Xóa bộ lọc</button>}</div>
          )}
        </section>

        <section id="new" className="editorial-rail" aria-labelledby="editorial-title">
          <div className="editorial-rail__visual">{site.editorial.imageUrl && <img src={site.editorial.imageUrl} alt={site.editorial.imageAlt} />}</div>
          <div className="editorial-rail__content"><p className="eyebrow"><span /> {site.editorial.eyebrow}</p><h2 id="editorial-title">{site.editorial.title}</h2><p>{site.editorial.description}</p><button className="text-action" onClick={() => chooseCategory("Giải trí")}>{site.editorial.cta} <ArrowRight size={17} /></button></div>
          <div className="editorial-rail__list">{featured.map((app) => <AppCard key={app.id} app={app} onOpen={setSelectedApp} />)}</div>
        </section>

        <section className="strip-section" aria-labelledby="utility-title">
          <div className="strip-section__visual">{site.utility.imageUrl && <img src={site.utility.imageUrl} alt={site.utility.imageAlt} />}</div>
          <div className="section-heading"><div><p className="eyebrow"><span /> {site.utility.eyebrow}</p><h2 id="utility-title">{site.utility.title}</h2></div><div className="rail-arrows"><ChevronLeft size={19} /><ChevronRight size={19} /></div></div>
          <div className="app-grid app-grid--compact">{recommended.map((app) => <AppCard key={app.id} app={app} onOpen={setSelectedApp} />)}</div>
        </section>

        <section id="safe" className="safety-note" aria-labelledby="safety-title">
          <ShieldCheck size={36} />
          <div><p className="eyebrow"><span /> {site.notice.eyebrow}</p><h2 id="safety-title">{site.notice.title}</h2><p>{site.notice.description}</p></div>
        </section>

        <footer className="footer"><span>{site.footer.left}</span><span>{site.footer.madeWithLove}</span><span>{site.footer.right}</span></footer>
      </main>

      {selectedApp && (
        <div className="app-modal-backdrop" role="presentation" onMouseDown={() => setSelectedApp(null)}>
          <section className="app-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedApp(null)} aria-label="Đóng"><X size={21} /></button>
            <div className="modal-app"><AppCover app={selectedApp} large /><div><p className="eyebrow"><span /> {selectedApp.category}</p><h2 id="modal-title">{selectedApp.name}</h2><p>{selectedApp.description}</p></div></div>
            <div className="modal-meta"><div><span>Phiên bản</span><b>{selectedApp.version}</b></div><div><span>Dung lượng</span><b>{selectedApp.size}</b></div><div><span>Cập nhật</span><b>{selectedApp.updated}</b></div></div>
            <div className="modal-tags">{selectedApp.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <button className="button button--amber button--full" onClick={() => handleDownload(selectedApp)}><ArrowDownToLine size={19} /> Lấy APK an toàn</button>
          </section>
        </div>
      )}
    </div>
  );
}
