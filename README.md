### 部署步骤
#### ssh到服务器
1. 通过pm2停止任务```pm2 stop jski```
2. 进入jski文件夹```cd projects/jski```
3. 下载新代码```git checkout . && git pull```
4. 安装所需包文件```yarn```
5. 修改完成后，bundle成一个js文件```yarn run bundle:js```
6. 通过pm2部署```cd ../.. && pm2 start jski```
7. 保存pm2的任务列表```pm2 save```

---

### 支付模块配置（StarPay / NetStars）

#### 本地开发（无 NSS 凭证，mock 模式）
1. `config/config.env` 中设置 `NSS_MOCK=true`，并配置：
   - `SQLITE_PATH=./data/payment.db`
   - `PAY_FORM_SECRET=$(openssl rand -hex 32)`
2. 生成本地测试 RSA 密钥对（仅用于 mock 验签链路自测）：
   ```bash
   mkdir -p config/keys
   openssl genrsa -out config/keys/nss_private.pem 2048
   openssl rsa -in config/keys/nss_private.pem -pubout -out config/keys/nss_public.pem
   ```
3. `npm install && npm run server`，访问 `http://localhost:5000/products`

#### 服务器部署（真实 NSS 凭证）
1. 按 `.env.example` 在服务器 `.env` 中补齐所有 `NSS_*` 变量（`config/keys/` 与 `.env` 均不进 git，需手动放置）
2. **先备份**再操作：`cp .env .env.bak`、`docker volume inspect jski-official_payment-data`
3. `make prod-restart`（会先 `git pull` 再 `docker compose up -d --build`）
4. 启动日志中出现 `支付模式: StarPay 真实接口` 即配置生效；`docker logs jski-official` 可查

#### 注意事项
- `NSS_MOCK=true` 在生产环境（`NODE_ENV=production`）会**拒绝启动**，防止误配
- SQLite 数据在 `payment-data` volume 中，升级/重建容器不会丢失，但**不要**随意 `docker volume rm`
- 商品目录在 `config/products.js` 中维护，改价/上下架需重启生效
- 订单查询/退款 API 属 P2，后续迭代