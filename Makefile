# Makefile for JSKI Official Site
# 可在本地 Mac 和服务器上共用

# 服务器配置（与其他项目一致）
SERVER_IP   ?= 47.74.45.109
SERVER_USER ?= root
SSH_PORT    ?= 2222
DEPLOY_PATH ?= /opt/jski-official
SERVICE_NAME ?= officialsite
DOMAIN      ?= jcosa.net

RSYNC = rsync -avz -e 'ssh -p $(SSH_PORT)' --delete \
  --exclude='.git' --exclude='node_modules' --exclude='.env' \
  --exclude='.DS_Store' --exclude='*.log'

# ===== 本地开发 =====
.PHONY: install dev build up down logs

install:
	npm install

dev:
	npm run server

build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f

# ===== 部署：本地 → 服务器 =====
.PHONY: sync deploy

sync:
	$(RSYNC) . $(SERVER_USER)@$(SERVER_IP):$(DEPLOY_PATH)/

deploy: sync
	@echo "代码已同步到 $(SERVER_IP):$(DEPLOY_PATH)"
	@echo "在服务器上执行以下命令完成部署："
	@echo ""
	@echo "  ssh -p $(SSH_PORT) $(SERVER_USER)@$(SERVER_IP)"
	@echo "  cd $(DEPLOY_PATH) && docker compose up -d --build"
	@echo ""

# ===== 服务器端操作（在 /opt/jski-official 下执行）=====
.PHONY: prod-build prod-up prod-down prod-logs prod-restart prod-health nginx-setup certbot

prod-build:
	docker compose build

prod-up:
	docker compose up -d

prod-down:
	docker compose down

prod-logs:
	docker compose logs -f $(SERVICE_NAME)

prod-restart:
	docker compose down && docker compose up -d --build

prod-health:
	@curl -s http://127.0.0.1:8080/health | jq . 2>/dev/null || curl -s http://127.0.0.1:8080/health

nginx-setup:
	sudo cp deploy/nginx-jski-official.conf /etc/nginx/sites-available/jski-official
	sudo ln -sf /etc/nginx/sites-available/jski-official /etc/nginx/sites-enabled/
	sudo nginx -t && sudo nginx -s reload

certbot:
	sudo certbot --nginx -d $(DOMAIN)
