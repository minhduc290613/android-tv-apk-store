# Trạng thái GitHub Pages

Repository `minhduc290613/android-tv-apk-store` đã được chuyển sang **Public** theo xác nhận của chủ sở hữu. Trong **Settings → Pages**, nguồn triển khai đã được đổi sang **GitHub Actions**. Workflow có sẵn `Deploy static site to GitHub Pages` sẽ được chạy lại từ nhánh `main` để xuất bản thư mục `dist/public`.

Workflow run `32568418540` đã hoàn tất thành công: các bước build, `configure-pages`, upload artifact và `deploy-pages` đều đạt trạng thái thành công.

Lần kiểm tra đầu tiên tại URL GitHub Pages trả về màn 404 của ứng dụng do router nhận đường dẫn `/android-tv-apk-store/` thay vì `/`. Router đã được cập nhật để dùng base path repository khi hostname kết thúc bằng `.github.io`.

Workflow run `32568554622` triển khai bản sửa router đã hoàn tất thành công. Website hiện hiển thị trang chủ tại `https://minhduc290613.github.io/android-tv-apk-store/`.

Ảnh minh hoạ ban đầu dùng đường dẫn tuyệt đối từ gốc `/manus-storage/...`, khiến GitHub Pages diễn giải chúng là `minhduc290613.github.io/manus-storage/...`. Cấu hình ảnh được chuyển sang URL tuyệt đối tại tên miền triển khai Manus, nơi đã xác minh ảnh banner có thể truy cập công khai.

Sau workflow run `32568846343` thành công, kiểm tra trực tiếp GitHub Pages xác nhận logo và banner hero hiển thị đúng tại URL công khai.

Workflow run `32569112207` đã triển khai thành công bản sửa bộ lọc. Bản xem trước xác nhận thư viện hiển thị đầy đủ 8 ứng dụng ngay sau khi danh mục tải xong.

Kiểm tra trực tiếp trên GitHub Pages: tìm kiếm với từ không khớp trả về trạng thái rỗng, sau đó nút **Xóa bộ lọc** khôi phục thành công danh sách 8 ứng dụng.

Workflow run `32569726630` đã triển khai thành công trải nghiệm tìm kiếm mở rộng. Kiểm tra trực tiếp xác nhận truy vấn `nova` lọc còn 1 ứng dụng, nút xoá nhanh xuất hiện và khôi phục lại danh sách 8 ứng dụng.

Workflow run `32570079358` đã triển khai thành công phiên bản tài nguyên tự chủ. Kiểm tra GitHub Pages xác nhận logo và banner hiển thị từ GitHub Release `tvkho-assets-v1`; không còn yêu cầu runtime tới Google Fonts, Manus Storage hoặc analytics ngoài.
