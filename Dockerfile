FROM debian:bookworm-slim
ENV RELEASE=--dev
WORKDIR /ai-spoons
COPY . .
RUN cat bashrc | tee -a /root/.bashrc
RUN apt update && \
    apt upgrade -y && \
    apt install -y python3 python3-pip git npm
WORKDIR /ai-spoons/app
RUN npm i
WORKDIR /ai-spoons
EXPOSE 5173 443
STOPSIGNAL SIGINT
CMD [ "sh", "-c", "python3 run.py ${RELEASE}" ]