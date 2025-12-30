#!/bin/bash

# 工作站构建并部署
# 构建并运行 Nginx 镜像
IMAGE_TAG="lhy-ui-demo1:v1"
CONTAINER_NAME="lhy-ui-demo1"

# 停止并移除同名容器（如果存在）
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  docker rm -f ${CONTAINER_NAME} || true
fi

# 删除旧镜像
if docker images --format '{{.Repository}}:{{.Tag}}' | grep -q "^${IMAGE_TAG}$"; then
  docker rmi ${IMAGE_TAG} || true
fi
# 构建镜像
docker build -t ${IMAGE_TAG} .

# 运行容器
docker run -d -p 7004:3000 -v /lhy/ui/nginx/${CONTAINER_NAME}:/var/cache/nginx --name ${CONTAINER_NAME} ${IMAGE_TAG}
