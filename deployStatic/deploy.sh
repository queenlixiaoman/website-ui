#!/bin/bash

# 本地打包部署至工作站
# 构建并运行 Nginx 镜像
IMAGE_TAG="lhy-ui-static-demo1:v1"
CONTAINER_NAME="lhy-ui-static-demo1"

# 清理旧产物
rm -rf ./dist

# 在项目根目录进行构建
cp -r ../out ./dist

# 开始部署
rm -rf dist.zip
zip -r dist.zip ./dist
sshpass -p fund123. scp dist.zip root@192.168.29.2:/lhy/ui/hh-website-static-demo1
