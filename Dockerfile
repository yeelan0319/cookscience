# Pull base image.
FROM ubuntu:latest
MAINTAINER Yiran Mao <yiranmao@gmail.com> 

# Install base packages
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install git nodejs nodejs-legacy npm imagemagick build-essential -y

# Prepare directory
RUN mkdir -p /usr/src/cookscience
WORKDIR /usr/src/cookscience

# Expose ports
EXPOSE 4567

