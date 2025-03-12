-- Thêm dữ liệu vào bảng users
INSERT INTO users (userName, passwordHash, email, createdAt, updatedAt) VALUES
('Alice', 'hashed_password1', 'alice@example.com', NOW(), NOW()),
('Bob', 'hashed_password2', 'bob@example.com', NOW(), NOW()),
('Charlie', 'hashed_password3', 'charlie@example.com', NOW(), NOW()),
('David', 'hashed_password4', 'david@example.com', NOW(), NOW()),
('Emma', 'hashed_password5', 'emma@example.com', NOW(), NOW());

-- Thêm dữ liệu vào bảng productlines
INSERT INTO productlines (productLineName, textDescription, imageUrl, createdAt, updatedAt) VALUES
('Skincare', 'Sản phẩm chăm sóc da', 'skincare.jpg', NOW(), NOW()),
('Makeup', 'Sản phẩm trang điểm', 'makeup.jpg', NOW(), NOW()),
('Haircare', 'Sản phẩm chăm sóc tóc', 'haircare.jpg', NOW(), NOW()),
('Fragrance', 'Nước hoa', 'fragrance.jpg', NOW(), NOW()),
('Bodycare', 'Sản phẩm chăm sóc cơ thể', 'bodycare.jpg', NOW(), NOW());

-- Thêm dữ liệu vào bảng products
INSERT INTO products (productName, ProductLine, productVendor, productDescription, quantityInstock, price, createdAt, updatedAt) VALUES
('Kem dưỡng ẩm', 1, 'L\'Oreal', 'Kem dưỡng ẩm da ban đêm', 100, 500000, NOW(), NOW()),
('Son môi đỏ', 2, 'MAC', 'Son môi đỏ quyến rũ', 150, 450000, NOW(), NOW()),
('Dầu gội thảo dược', 3, 'Pantene', 'Dầu gội chiết xuất thảo dược', 200, 250000, NOW(), NOW()),
('Nước hoa Chanel No.5', 4, 'Chanel', 'Nước hoa cao cấp', 80, 2500000, NOW(), NOW()),
('Sữa dưỡng thể', 5, 'Nivea', 'Dưỡng thể làm mềm da', 120, 300000, NOW(), NOW());

-- Thêm dữ liệu vào bảng productimages
INSERT INTO productimages (productID, imageUrl, createdAt, updatedAt) VALUES
(1, 'kem_duong_am_1.jpg', NOW(), NOW()),
(1, 'kem_duong_am_2.jpg', NOW(), NOW()),
(1, 'kem_duong_am_3.jpg', NOW(), NOW()),
(1, 'kem_duong_am_4.jpg', NOW(), NOW()),
(1, 'kem_duong_am_5.jpg', NOW(), NOW()),
(2, 'son_moi_do.jpg', NOW(), NOW()),
(3, 'dau_goi_thao_duoc.jpg', NOW(), NOW()),
(4, 'nuoc_hoa_chanel_no5.jpg', NOW(), NOW()),
(5, 'sua_duong_the.jpg', NOW(), NOW());

-- Thêm dữ liệu vào bảng orders
INSERT INTO orders (userID, orderDate, status, shippedDate, totalAmount, createdAt, updatedAt) VALUES
(1, NOW(), 'Processing', NULL, 500000, NOW(), NOW()),
(2, NOW(), 'Completed', NOW(), 450000, NOW(), NOW()),
(3, NOW(), 'Shipped', NOW(), 250000, NOW(), NOW()),
(4, NOW(), 'Pending', NULL, 2500000, NOW(), NOW()),
(5, NOW(), 'Cancelled', NULL, 300000, NOW(), NOW());

-- Thêm dữ liệu vào bảng orderdetails
INSERT INTO orderdetails (productID, orderID, quantity, priceAtOrder, createdAt, updatedAt) VALUES
(1, 1, 1, 500000, NOW(), NOW()),
(2, 2, 1, 450000, NOW(), NOW()),
(3, 3, 1, 250000, NOW(), NOW()),
(4, 4, 1, 2500000, NOW(), NOW()),
(5, 5, 1, 300000, NOW(), NOW());

-- Thêm dữ liệu vào bảng carts
INSERT INTO carts (userID, productID, quantity, createdAt, updatedAt) VALUES
(1, 1, 2, NOW(), NOW()),
(2, 2, 1, NOW(), NOW()),
(3, 3, 3, NOW(), NOW()),
(4, 4, 1, NOW(), NOW()),
(5, 5, 2, NOW(), NOW());

-- Thêm dữ liệu vào bảng reviews
INSERT INTO reviews (userID, productID, Rating, reviewText, createdAt, updatedAt) VALUES
(1, 1, 5, 'Rất tốt, tôi thích sản phẩm này!', NOW(), NOW()),
(2, 2, 4, 'Màu đẹp nhưng hơi khô môi', NOW(), NOW()),
(3, 3, 5, 'Dầu gội mùi thơm, tóc mượt hơn', NOW(), NOW()),
(4, 4, 5, 'Mùi hương sang trọng, giữ mùi lâu', NOW(), NOW()),
(5, 5, 3, 'Cũng được nhưng không quá đặc biệt', NOW(), NOW());

INSERT INTO `new_db`.`discounts` (`id`, `startDate`, `endDate`, `productID`, `productlineID`) VALUES
(1, '2025-03-15', '2025-03-31', 1, 1),
(2, '2025-04-01', '2025-04-15', 2, 2),
(3, '2025-04-05', '2025-04-20', 3, 1),
(4, '2025-03-10', '2025-03-25', 4, 3),
(5, '2025-05-01', '2025-05-15', 5, 2);

