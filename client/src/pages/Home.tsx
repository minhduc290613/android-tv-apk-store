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

type Category = "Tất cả" | "Giải trí" | "Công cụ" | "Trình phát" | "Trẻ em";

type AppItem = {
  id: string;
  name: string;
  category: Exclude<Category, "Tất cả">;
  version: string;
  size: string;
  updated: string;
  description: string;
  accent: string;
  glyph: string;
  featured?: boolean;
  tags: string[];
};

const apps: AppItem[] = [
  {
    id: "nova-stream",
    name: "Nova Stream TV",
    category: "Giải trí",
    version: "2.8.4",
    size: "38 MB",
    updated: "Hôm nay",
    description: "Tập hợp nội dung video yêu thích trong một giao diện tối ưu cho màn hình lớn.",
    accent: "#ffb000",
    glyph: "N",
    featured: true,
    tags: ["4K", "Android TV"],
  },
  {
    id: "cinema-box",
    name: "Cinema Box",
    category: "Giải trí",
    version: "5.1.0",
    size: "42 MB",
    updated: "2 ngày trước",
    description: "Thư viện phim cá nhân gọn gàng, bố cục trực quan cho điều khiển từ xa.",
    accent: "#d95828",
    glyph: "C",
    tags: ["TV remote", "HD"],
  },
  {
    id: "file-pilot",
    name: "File Pilot",
    category: "Công cụ",
    version: "1.9.7",
    size: "16 MB",
    updated: "3 ngày trước",
    description: "Duyệt tệp, USB và bộ nhớ mạng với thao tác đơn giản trên TV.",
    accent: "#33a6a5",
    glyph: "F",
    tags: ["SMB", "USB"],
  },
  {
    id: "screen-cast",
    name: "Screen Cast Now",
    category: "Công cụ",
    version: "3.2.1",
    size: "21 MB",
    updated: "5 ngày trước",
    description: "Trình chiếu nội dung trong nhà trên màn hình TV một cách nhanh chóng.",
    accent: "#5266df",
    glyph: "S",
    tags: ["Cast", "Nhanh"],
  },
  {
    id: "cloud-play",
    name: "Cloud Play",
    category: "Trình phát",
    version: "4.0.3",
    size: "57 MB",
    updated: "Hôm qua",
    description: "Trình phát nhẹ với hàng đợi rõ ràng, phụ đề và phím tắt điều khiển.",
    accent: "#8a62d3",
    glyph: "P",
    featured: true,
    tags: ["Subtitles", "4K"],
  },
  {
    id: "sound-room",
    name: "Sound Room",
    category: "Trình phát",
    version: "1.6.2",
    size: "31 MB",
    updated: "1 tuần trước",
    description: "Một không gian âm thanh tối giản cho danh sách nhạc ở phòng khách.",
    accent: "#e08437",
    glyph: "S",
    tags: ["Audio", "Remote"],
  },
  {
    id: "little-planet",
    name: "Little Planet",
    category: "Trẻ em",
    version: "2.4.0",
    size: "49 MB",
    updated: "6 ngày trước",
    description: "Các hoạt động học tập trực quan, dễ thao tác và thân thiện cho trẻ em.",
    accent: "#e15388",
    glyph: "L",
    tags: ["Gia đình", "Học tập"],
  },
  {
    id: "kidoodle-tv",
    name: "Kidoodle TV",
    category: "Trẻ em",
    version: "3.0.6",
    size: "35 MB",
    updated: "8 ngày trước",
    description: "Góc xem được thiết kế với nội dung phù hợp cho buổi tối gia đình.",
    accent: "#55a37b",
    glyph: "K",
    tags: ["Gia đình", "TV"],
  },
];

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
  }, [category, query]);

  const featured = apps.filter((app) => app.featured);
  const recommended = apps.filter((app) => app.category === "Công cụ" || app.category === "Trình phát");

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

  const handleDownload = (app: AppItem) => {
    toast.info(`Chưa có tệp APK hợp pháp cho ${app.name}`, {
      description: "Hãy thay link tải trong danh mục trước khi xuất bản website.",
    });
  };

  return (
    <div className="tvkho-shell">
      <aside className={`side-nav ${navOpen ? "side-nav--open" : ""}`} aria-label="Điều hướng chính">
        <a className="brand" href="#top" aria-label="TVKHO APK - đầu trang">
          <span className="brand-mark" aria-hidden="true"><span className="brand-mark__fallback"><i /></span><img src="/manus-storage/tvkho-logo-mark_3a36f3d5.png" alt="" onError={(event) => { event.currentTarget.style.display = "none"; }} /></span>
          <span className="brand-word">TV<span>KHO</span><small>APK</small></span>
        </a>
        <nav>
          <a className="side-nav__item side-nav__item--active" href="#top"><Sparkles size={19} /> Khám phá</a>
          <a className="side-nav__item" href="#library"><Grid2X2 size={19} /> Thư viện</a>
          <a className="side-nav__item" href="#new"><HardDriveDownload size={19} /> Mới cập nhật</a>
          <a className="side-nav__item" href="#safe"><ShieldCheck size={19} /> Hướng dẫn</a>
        </nav>
        <div className="side-nav__footer">
          <div className="remote-tip"><span className="remote-key">↑↓</span><p>Di chuyển</p></div>
          <div className="remote-tip"><span className="remote-key">OK</span><p>Chọn</p></div>
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
          <a className="safe-pill" href="#safe"><ShieldCheck size={16} /> Tải có kiểm soát</a>
        </header>

        <section className="hero" aria-labelledby="hero-title">
          <img className="hero__image" src="/manus-storage/tvkho-hero-living-room_e276c13e.jpg" alt="Không gian phòng khách với Android TV" />
          <div className="hero__shade" />
          <div className="hero__copy">
            <p className="eyebrow"><span /> KHO APK CHO ANDROID TV</p>
            <h1 id="hero-title">Ứng dụng đáng cài <em>tối nay.</em></h1>
            <p className="hero__lede">Tuyển chọn ứng dụng tối ưu cho màn hình lớn, thao tác mượt bằng điều khiển từ xa.</p>
            <div className="hero__actions">
              <a className="button button--amber" href="#library">Khám phá thư viện <ArrowRight size={18} /></a>
              <button className="button button--quiet" onClick={() => setSelectedApp(featured[0])}><Info size={18} /> Xem nổi bật</button>
            </div>
          </div>
          <div className="hero__counter"><strong>08</strong><span>ứng dụng<br />được chọn lọc</span></div>
        </section>

        <section className="category-section" aria-label="Danh mục ứng dụng">
          <div className="section-heading section-heading--compact"><p className="eyebrow"><span /> LỐI TẮT</p><h2>Chọn theo nhu cầu</h2></div>
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
                  <span>{item.name}</span>
                  <small>{item.description}</small>
                </button>
              );
            })}
          </div>
        </section>

        <section id="library" className="library-section" aria-labelledby="library-title">
          <div className="section-heading">
            <div><p className="eyebrow"><span /> THƯ VIỆN APK</p><h2 id="library-title">{category === "Tất cả" ? "Cửa hàng tuyển chọn" : category}</h2></div>
            <div className="heading-aside"><p className="section-heading__meta">{results.length} ứng dụng phù hợp</p><p className="focus-hint"><b>← →</b> Duyệt ray <b>OK</b> Xem</p></div>
          </div>
          {results.length > 0 ? (
            <div className="app-grid">
              {results.map((app) => <AppCard key={app.id} app={app} onOpen={setSelectedApp} />)}
            </div>
          ) : (
            <div className="empty-state"><Search size={28} /><p>Chưa tìm thấy ứng dụng phù hợp.</p><button onClick={() => { setQuery(""); setCategory("Tất cả"); }}>Xóa bộ lọc</button></div>
          )}
        </section>

        <section id="new" className="editorial-rail" aria-labelledby="editorial-title">
          <div className="editorial-rail__visual"><img src="/manus-storage/tvkho-streaming-visual_635ce444.jpg" alt="Minh hoạ ứng dụng giải trí" /></div>
          <div className="editorial-rail__content"><p className="eyebrow"><span /> CHỌN LỌC TRONG TUẦN</p><h2 id="editorial-title">Giải trí, vừa đúng chất TV.</h2><p>Từ xem video tới khám phá thư viện cá nhân, các ứng dụng ở đây ưu tiên chữ lớn, điều hướng rõ và trải nghiệm phòng khách.</p><button className="text-action" onClick={() => chooseCategory("Giải trí")}>Xem danh mục giải trí <ArrowRight size={17} /></button></div>
          <div className="editorial-rail__list">{featured.map((app) => <AppCard key={app.id} app={app} onOpen={setSelectedApp} />)}</div>
        </section>

        <section className="strip-section" aria-labelledby="utility-title">
          <div className="strip-section__visual"><img src="/manus-storage/tvkho-utility-visual_01a90a0e.jpg" alt="Minh hoạ tiện ích Android TV" /></div>
          <div className="section-heading"><div><p className="eyebrow"><span /> TỐI ƯU THIẾT BỊ</p><h2 id="utility-title">Công cụ hữu ích</h2></div><div className="rail-arrows"><ChevronLeft size={19} /><ChevronRight size={19} /></div></div>
          <div className="app-grid app-grid--compact">{recommended.map((app) => <AppCard key={app.id} app={app} onOpen={setSelectedApp} />)}</div>
        </section>

        <section id="safe" className="safety-note" aria-labelledby="safety-title">
          <ShieldCheck size={36} />
          <div><p className="eyebrow"><span /> GHI NHỚ TRƯỚC KHI CÀI</p><h2 id="safety-title">Chỉ thêm liên kết APK từ nguồn mà bạn có quyền phân phối.</h2><p>Website này là một giao diện tĩnh. Trước khi xuất bản, hãy chỉnh lại danh mục ứng dụng, phiên bản và các nút tải để trỏ tới tệp APK hợp pháp của bạn.</p></div>
        </section>

        <footer className="footer"><span>TVKHO APK · Giao diện cho Android TV</span><span>Điều hướng: Tab / Enter / ↑ ↓ ← →</span></footer>
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
