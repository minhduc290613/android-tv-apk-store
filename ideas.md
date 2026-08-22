# Định hướng thiết kế — TVKHO APK

## Ba hướng phong cách

| Theme Name | Very Brief Intro | Probability |
|---|---|---:|
| Phòng chiếu số | Không gian tối kiểu màn hình rạp tại gia, làm nội dung ứng dụng nổi bật như những tựa phim tuyển chọn. | 0.07 |
| Vật liệu phát sóng | Bảng điều khiển đậm chất truyền hình công cộng với mảng màu điện ảnh, typography biên tập và thẻ nội dung có chiều sâu. | 0.03 |
| Neon Arcade | Một hệ thống thư viện tương lai với sắc đèn neon và chuyển động nhanh, tạo không khí sôi động. | 0.09 |

## Phương án đã chọn: Phòng chiếu số

### Design Movement

**Cinematic editorial interface**: giao diện biên tập lấy cảm hứng từ lớp phủ nội dung của các dịch vụ streaming cao cấp, kết hợp cảm giác không gian của màn hình TV phòng khách.

### Core Principles

1. **Nội dung là nhân vật chính**: ứng dụng, ảnh đại diện và thông tin tải được ưu tiên bằng tỷ lệ lớn, rõ ràng từ khoảng cách xa.
2. **Dẫn hướng theo hàng ngang**: các dải nội dung như một kho tuyển chọn, phù hợp thao tác phím điều hướng bốn chiều của remote.
3. **Tương phản có chủ đích**: nền than chì sâu và văn bản ngà ấm để giảm chói, chỉ dùng màu nhấn cho trạng thái có thể hành động.
4. **Thông tin biên tập, không ồn ào**: chỉ giữ lại thể loại, phiên bản, dung lượng và ghi chú tương thích cần thiết.

### Color Philosophy

Nền **than xanh đêm** tạo cảm giác tập trung, phù hợp phòng khách tối và giúp poster ứng dụng phát sáng tự nhiên. Tông **ngà ấm** giảm cảm giác lạnh của giao diện kỹ thuật số. **Cam hổ phách #FFB000** là sắc hiệu nhận diện, chỉ báo cho lựa chọn, tải xuống và nhãn đáng chú ý; cảm giác như ánh đèn dẫn lối trong rạp chiếu.

### Layout Paradigm

Trang vận hành như một **dải sân khấu dọc**: thanh điều hướng ở cạnh trái, hero chiếm trọn mảng đầu trang, sau đó là các ray nội dung ngang tràn mép phải. Tránh khung nội dung căn giữa đồng nhất; khoảng lùi của ray thay đổi nhẹ để tạo nhịp biên tập.

### Signature Elements

1. **Vệt hổ phách quét ngang** ở tiêu đề và trạng thái chọn.
2. **Thẻ ảnh vuông bo nhẹ** với viền sáng mềm, tiêu đề đặt trong dải gradient cuối ảnh.
3. **Chỉ báo remote** với nhãn phím mũi tên/Enter tối giản bên cạnh các khu vực thao tác.

### Interaction Philosophy

Điều hướng bàn phím là trải nghiệm hạng nhất: mọi mục tương tác có viền focus hổ phách rõ ràng, thứ tự tab hữu ích và khả năng mở chi tiết bằng Enter. Chuột chỉ là phương thức bổ sung. Nút tải mô phỏng một hành động rõ ràng, không có thao tác mơ hồ.

### Animation

Hover/focus sử dụng nâng nhẹ 4–6px, viền hổ phách và bóng mềm trong tối đa 180ms theo `cubic-bezier(0.23, 1, 0.32, 1)`. Các ray nội dung xuất hiện so le tinh tế 40ms/mục khi tải trang. Không dùng chuyển động liên tục gây xao nhãng; tôn trọng `prefers-reduced-motion`.

### Typography System

**Sora** dùng cho heading và nhãn điều hướng vì cấu trúc hình học, sắc nét ở kích thước lớn. **Manrope** dùng cho phần mô tả, metadata và điều khiển vì độ đọc tốt trên TV. Heading sử dụng trọng lượng 700–800, nội dung 400–500, metadata viết HOA có tracking rộng.

### Brand Essence

**TVKHO APK là kho ứng dụng Android TV được tuyển chọn để cài nhanh, nhìn rõ và điều khiển thoải mái từ ghế sofa.**

Tính cách thương hiệu: **tuyển chọn, rõ ràng, ấm áp**.

### Brand Voice

Giọng điệu ngắn gọn, chắc chắn và hướng hành động; nói như một người biên tập am hiểu Android TV, không dùng các lời chào chung chung.

> Ví dụ heading: “Ứng dụng đáng cài tối nay.”

> Ví dụ CTA: “Lấy APK an toàn”.

### Wordmark & Logo

Biểu tượng là một **màn hình TV tối giản lồng trong hình hộp mở**: hai chân đế gợi nét TV, phần khe mở tạo thành nút Play âm bản. Wordmark “TVKHO” đặt cạnh bằng Sora ExtraBold với chữ K có nhát cắt chéo như vệt chuyển cảnh.

### Signature Brand Color

**Amber Signal — #FFB000**.

## Style Decisions

- Bố cục luôn đọc như một bề mặt streaming trên TV: rail điều hướng bên trái và các ray nội dung ngang là cấu trúc chính; grid chỉ dùng cho khu vực tiện ích rất gọn.
- Thẻ ứng dụng phải là bìa nội dung điện ảnh, ưu tiên hình khối, biểu tượng chuyên biệt, dải tên gradient và ánh sáng mềm thay cho icon chữ cái chung chung.
- Wordmark TVKHO và biểu tượng TV/hộp mở/nút Play luôn xuất hiện ở khu vực header chính; Amber Signal chỉ dùng cho nhận diện, hành động chính, focus và các vệt biên tập.
