# TVKHO APK

Website tĩnh giới thiệu kho ứng dụng APK dành cho Android TV. Dự án sử dụng React, HTML/CSS và có sẵn quy trình xuất bản lên GitHub Pages.

## Chạy trên máy

```bash
pnpm install
pnpm dev
```

## Tùy chỉnh danh mục

Website tải danh mục khi chạy từ tệp `client/public/apps.json`. Bạn chỉ cần sửa tệp JSON này, không cần chỉnh giao diện. Mỗi ứng dụng gồm tên, thể loại, phiên bản, dung lượng, ngày cập nhật, mô tả, màu nhận diện, nhãn, trạng thái nổi bật và trường `downloadUrl`.

Ví dụ, để thêm đường dẫn tải cho một mục, thay giá trị rỗng bằng URL HTTPS hợp lệ:

```json
"downloadUrl": "https://ten-mien-cua-ban.example/tai/xung-dung.apk"
```

Khi người dùng nhấn **Lấy APK an toàn**, website sẽ mở `downloadUrl` trong một tab mới. Chỉ thêm liên kết tới tệp APK hoặc trang tải mà bạn có quyền phân phối.

## Tùy chỉnh nhận diện và nội dung chung

Tệp `client/public/site-config.json` chứa thông tin chung của website. Bạn có thể thay tên trang, wordmark, URL logo, favicon, ảnh banner, phần giới thiệu, CTA, tiêu đề của các khu vực, thông tin hiển thị dưới chân trang và metadata SEO trong tệp này.

Nhóm `appLabels` dùng để thay đổi tập trung nhãn **Xem nổi bật**, **Các ứng dụng được chọn lọc** và **Tất cả ứng dụng**. Trong `footer`, trường `madeWithLove` dùng cho dòng ghi công ở cuối trang, mặc định là `minhduc290613 made with love`.

Nhóm `search` trong `site-config.json` dùng để thay đổi placeholder, nhãn trợ năng, nhãn nút xoá và cách hiển thị số kết quả của ô tìm kiếm ứng dụng.

## Tài nguyên phục vụ từ GitHub

Các ảnh logo và minh hoạ của website được lưu trong GitHub Release `tvkho-assets-v1`; `site-config.json` dùng URL tải trực tiếp từ release này. Danh mục và cấu hình cũng nằm trong `client/public/`, nên GitHub Pages phục vụ trực tiếp cùng website. Phông chữ đã dùng fallback hệ thống, không còn tải từ Google Fonts.

Tập lệnh analytics ngoài cũng đã được bỏ khỏi trang tĩnh. Sau khi triển khai, các yêu cầu tài nguyên nội dung chỉ còn trỏ đến GitHub Pages hoặc GitHub Release của chính repository.

Các trường ảnh như `logoUrl`, `faviconUrl`, `hero.imageUrl`, `editorial.imageUrl` và `utility.imageUrl` cần là URL ảnh hợp lệ. Website tự cập nhật tiêu đề trình duyệt, mô tả và favicon theo cấu hình này. Nếu một URL ảnh bị để trống, giao diện vẫn giữ màu nền phù hợp thay vì lỗi hiển thị.

## Xuất bản bằng GitHub Pages

1. Đẩy mã nguồn lên nhánh `main` của một repository GitHub.
2. Trên GitHub, mở **Settings → Pages**.
3. Chọn **Source: GitHub Actions**.
4. Đẩy một commit mới hoặc chạy workflow **Deploy static site to GitHub Pages** từ tab **Actions**.
5. Sau khi workflow hoàn tất, địa chỉ website sẽ hiện trong phần Pages của repository.

Tệp `.github/workflows/deploy-pages.yml` đã tự động build và triển khai thư mục tĩnh. Cấu hình `base: "./"` giúp các tệp CSS/JavaScript hoạt động cả khi website được đặt ở đường dẫn repository, ví dụ `https://tennguoidung.github.io/ten-repository/`.

## Lưu ý phân phối APK

Giao diện hiện có dữ liệu minh hoạ để bạn thay thế. Không đưa liên kết tải hoặc tệp APK mà bạn không được phép phân phối. Luôn cung cấp thông tin phiên bản, dung lượng và nguồn tải rõ ràng cho người dùng.
