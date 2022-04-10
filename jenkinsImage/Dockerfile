FROM jenkins/jenkins:latest
ENV JAVA_OPTS -Djenkins.install.runSetupWizard=false
ENV CASC_JENKINS_CONFIG /var/jenkins_home/casc.yaml
ENV DOCKERVERSION=18.03.1-ce

USER root
RUN curl -fsSLO https://get.docker.com/builds/Linux/x86_64/docker-17.04.0-ce.tgz && tar xzvf docker-17.04.0-ce.tgz && mv docker/docker /usr/local/bin && rm -r docker docker-17.04.0-ce.tgz

RUN apt-get update && apt-get -y install sudo
RUN curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose

RUN curl -L -o /usr/bin/jq https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64
RUN chmod +x /usr/bin/jq

COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
COPY ./micro/config.xml /usr/share/jenkins/ref/jobs/jenkinsMicro/config.xml
COPY ./mono/config.xml /usr/share/jenkins/ref/jobs/jenkinsMono/config.xml
RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/ref/plugins.txt
COPY casc.yaml /var/jenkins_home/casc.yaml
COPY credentials.xml /var/jenkins_home/credentials.xml