# Hướng Dẫn Triển Khai CI/CD

## Tổng Quan

Dự án này đã được cấu hình với GitHub Actions để tự động hóa quá trình CI/CD. Pipeline bao gồm:

1. ✅ Kiểm tra code (Lint & Test)
2. 🔒 Quét bảo mật (Security Scan)
3. 🐳 Build Docker images
4. 🚀 Deploy tự động lên server

## Cấu Trúc Pipeline

### 1. Lint and Test

- Chạy cho cả frontend và backend
- Kiểm tra lỗi cú pháp
- Chạy test suite (nếu có)

### 2. Security Scan

- Sử dụng Trivy để quét vulnerabilities
- Báo cáo tự động lên GitHub Security

### 3. Build Docker Images

- Build images cho frontend và backend
- Push lên GitHub Container Registry
- Cache layers để tăng tốc độ build

### 4. Deploy (chỉ khi push lên branch main)

- Tự động deploy lên server production
- Pull images mới nhất
- Restart containers với docker-compose

## Cài Đặt

### Bước 1: Cấu Hình GitHub Secrets

Vào **Settings → Secrets and variables → Actions** của repository và thêm các secrets sau:

#### Secrets Bắt Buộc (cho Deploy):

```
DEPLOY_HOST         # IP hoặc domain của server (vd: 192.168.1.100)
DEPLOY_USER         # Username SSH (vd: root hoặc ubuntu)
DEPLOY_SSH_KEY      # Private SSH key để kết nối server
DEPLOY_PATH         # Đường dẫn project trên server (vd: /home/user/movie_booking)
```

#### Secrets Tùy Chọn:

```
DEPLOY_PORT         # Port SSH (mặc định: 22)
```

### Bước 2: Tạo SSH Key (nếu chưa có)

Trên máy local:

```bash
ssh-keygen -t ed25519 -C "github-actions@movie-booking"
```

Copy public key lên server:

```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@your-server
```

Copy private key (toàn bộ nội dung file) vào secret `DEPLOY_SSH_KEY`

### Bước 3: Chuẩn Bị Server

Trên server production, cần cài đặt:

```bash
# Cài Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Cài Docker Compose
sudo apt update
sudo apt install docker-compose-plugin -y

# Clone repository
cd /home/user
git clone https://github.com/your-username/movie-booking.git
cd movie-booking

# Tạo file .env nếu cần
# Thêm các biến môi trường production
```

### Bước 4: Cấu Hình Docker Compose cho Production

Tạo file `docker-compose.prod.yml` trên server (nếu cần khác với docker-compose.yaml):

```yaml
services:
  backend:
    image: ghcr.io/your-username/movie_booking/backend:latest
    ports:
      - "8080:8080"
    environment:
      MONGO_URL: ${MONGO_URL}
      JWT_SECRET: ${JWT_SECRET}
    restart: always

  frontend:
    image: ghcr.io/your-username/movie_booking/frontend:latest
    ports:
      - "3000:3000"
    restart: always

  mongo:
    image: mongo:latest
    volumes:
      - mongo_data:/data/db
    restart: always

volumes:
  mongo_data:
```

## Workflow CI/CD

### Khi Push Code:

1. **Push lên branch `develop` hoặc `main`:**
   - ✅ Chạy lint và test
   - 🔒 Quét bảo mật
   - 🐳 Build Docker images
   - 📦 Push images lên registry

2. **Push lên branch `main` (production):**
   - Làm tất cả các bước trên
   - 🚀 **Tự động deploy lên server**

3. **Tạo Pull Request:**
   - Chỉ chạy lint và test
   - Không build images hoặc deploy

## Kiểm Tra Deployment

### Xem logs của GitHub Actions:

1. Vào tab **Actions** trên GitHub
2. Click vào workflow run mới nhất
3. Xem chi tiết từng job

### Xem logs trên server:

```bash
# SSH vào server
ssh user@your-server

# Xem logs containers
cd /path/to/project
docker-compose logs -f

# Kiểm tra status
docker-compose ps
```

## Troubleshooting

### ❌ Lỗi Deploy "Permission denied"

```bash
# Trên server, kiểm tra quyền SSH
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

### ❌ Lỗi "Docker command not found"

```bash
# Thêm user vào docker group
sudo usermod -aG docker $USER
newgrp docker
```

### ❌ Lỗi "Cannot pull images"

```bash
# Login vào GitHub Container Registry trên server
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin
```

### ❌ Lỗi Build "npm ci failed"

- Đảm bảo có file `package-lock.json` trong cả frontend và backend
- Nếu không có, chạy `npm install` local và commit file lock

## Best Practices

### 1. Quản Lý Môi Trường

- Sử dụng file `.env` riêng cho từng môi trường
- Không commit secrets vào Git
- Sử dụng GitHub Secrets cho production

### 2. Versioning Images

- Pipeline tự động tag images với:
  - Branch name (vd: `main`, `develop`)
  - Commit SHA (vd: `main-abc1234`)
  - `latest` cho main branch

### 3. Rollback

```bash
# Xem các image versions
docker images | grep movie_booking

# Rollback bằng cách sử dụng image cũ
docker-compose down
docker run -d <old-image-id>
```

### 4. Monitoring

- Kiểm tra logs định kỳ
- Set up monitoring với Prometheus/Grafana nếu cần
- Sử dụng health checks trong docker-compose

## Mở Rộng

### Thêm Environments (Staging/Production)

Tạo file `.github/workflows/deploy-staging.yml`:

```yaml
name: Deploy to Staging

on:
  push:
    branches: [develop]

# ... similar to main workflow but deploy to staging server
```

### Thêm Tests

Cập nhật `backend/package.json` và `frontend/package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### Thêm Database Migrations

Thêm step trong workflow:

```yaml
- name: Run database migrations
  run: |
    docker-compose exec -T backend npm run migrate
```

## Support

Nếu gặp vấn đề, kiểm tra:

1. GitHub Actions logs
2. Server logs: `docker-compose logs`
3. GitHub Issues của repository

---

**Lưu ý:** Nhớ thay đổi các placeholder như `your-username`, `your-server` bằng giá trị thực tế của bạn.
