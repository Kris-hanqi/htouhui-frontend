FROM centos:7
MAINTAINER hongxing<xing.hong@htouhui.com>

ARG PUBLISH_VERSION

RUN yum install -y epel-release && \
    yum install -y nginx

ADD nginx.conf /etc/nginx/nginx.conf
ADD release hth-frontend/

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
