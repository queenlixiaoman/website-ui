#!/bin/bash

# 本地打包部署至工作站
# 构建并运行 Nginx 镜像
IMAGE_TAG="lhy-ui-demo1:v1"
CONTAINER_NAME="lhy-ui-demo1"

# 清理旧产物
rm -rf ./standalone ./static ./public

# 在项目根目录进行构建
cp -r ../.next/standalone ./standalone
cp -r ../.next/static ./static
cp -r ../public ./public

# 开始部署
rm -rf dist.zip
zip -r dist.zip ./standalone ./static ./public bash.sh Dockerfile
sshpass -p fund123. scp dist.zip root@192.168.29.2:/lhy/ui/hh-website-demo1
