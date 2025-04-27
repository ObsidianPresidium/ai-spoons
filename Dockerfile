FROM debian:bookworm-slim
ENV RELEASE=--dev
WORKDIR /ai-spoons
COPY . .
RUN cat bashrc | tee -a /root/.bashrc
RUN apt update && \
    apt upgrade -y && \
    apt install -y python3 python3-pip python3-venv git npm && \
    python3 -m venv venv && \
    source venv/bin/activate && \
    pip3 install -r requirements.txt && \
    ./exec-with-venv.sh setup.py
WORKDIR /ai-spoons/app
RUN npm i
WORKDIR /ai-spoons
EXPOSE 5173 443
STOPSIGNAL SIGINT
CMD [ "./pre-run.sh", "${RELEASE}" ]