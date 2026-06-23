### 部署步骤
#### ssh到服务器
1. 通过pm2停止任务```pm2 stop jski```
2. 进入jski文件夹```cd projects/jski```
3. 下载新代码```git checkout . && git pull```
4. 安装所需包文件```yarn```
5. 修改完成后，bundle成一个js文件```yarn run bundle:js```
6. 通过pm2部署```cd ../.. && pm2 start jski```
7. 保存pm2的任务列表```pm2 save```