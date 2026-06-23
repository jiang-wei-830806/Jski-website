# Makefile for JSKI Official Site
# 本地开发 + 服务器端 GitHub pull 部署

# 服务器配置（与其他项目一致）
SERVER_IP   ?= 47.74.45.109
SERVER_USER ?= root
SSH_PORT    ?= 2222
DEPLOY_PATH ?= /opt/jski-official
SERVICE_NAME ?= officialsite
DOMAIN      ?= jcosa.net

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

# ===== 部署：GitHub → 服务器 =====
# 流程：本地 git push → 服务器 make prod-restart
.PHONY: deploy

deploy:
	@echo "请先在本地执行：git push"
	@echo "然后在服务器上执行："
	@echo ""
	@echo "  ssh -p $(SSH_PORT) $(SERVER_USER)@$(SERVER_IP)"
	@echo "  cd $(DEPLOY_PATH) && make prod-restart"
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
	git pull origin main && docker compose down && docker compose up -d --build

prod-health:
	@curl -s http://127.0.0.1:8080/health | jq . 2>/dev/null || curl -s http://127.0.0.1:8080/health

nginx-setup:
	sudo cp deploy/nginx-jski-official.conf /etc/nginx/sites-available/jski-official
	sudo ln -sf /etc/nginx/sites-available/jski-official /etc/nginx/sites-enabled/
	sudo nginx -t && sudo nginx -s reload

certbot:
	sudo certbot --nginx -d $(DOMAIN)
