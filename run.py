import threading
import subprocess
import sys
import logging
import os
import datetime
from signal import SIGINT
from time import sleep
from getopt import getopt

logger = logging.getLogger(__name__)
logging.getLogger(__name__).addHandler(logging.StreamHandler(sys.stdout))

dev = True
python_process = None
node_process = None
if not os.path.exists("./logs"):
    os.makedirs("./logs", exist_ok=True)

today = datetime.datetime.today()
log_file = f"./logs/run-{today.strftime('%Y-%m-%d %H_%M_%S')}.log"

logging.basicConfig(filename=log_file, level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger.info("Started")

def parseargs():
    global dev
    opts, args = getopt(sys.argv[1:], "dp", [ "dev", "prod" ])
    for opt, arg in opts:
        if opt in ("-d", "--dev"):
            dev = True
            logger.info("-d or --dev parameter registered")
        elif opt in ("-p", "--prod"):
            dev = False
            logger.info("-p or --prod parameter registered")


def get_stdout(process, program_name="Application"):
    for line in iter(process.stdout.readline, b""):
        yield line.decode("utf-8")
    process.stdout.close()
    return_code = process.wait()
    if return_code:
        logger.error(f"{program_name} exited with code {return_code}")
    else:
        logger.info(f"{program_name} exited successfully")


def python_server():
    global python_process
    python_process = subprocess.Popen(["/usr/bin/python3", "./server/server.py"], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    logger.info("Python server started")
    for line in get_stdout(python_process, "Python server"):
        logger.info(f"python -> {line.rstrip()}")


def node_server():
    global node_process
    if dev:
        logger.info("Using dev Node.js server")
        node_process = subprocess.Popen(["/usr/bin/npm", "--prefix", "./app", "run", "dev"], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    else:
        node_process = build_and_run_vite()
    
    logger.info("Node.js server started")
    for line in get_stdout(node_process, "Python server"):
        logger.info(f"node -> {line.rstrip()}")


def build_and_run_vite():
    logger.info("Building app.. TODO!")
    return subprocess.Popen(["/usr/bin/sh", "-c", "echo App builder process activated && sleep 1m"], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)



if __name__ == "__main__":
    parseargs()
    
    python_thread = threading.Thread(target=python_server)
    node_thread = threading.Thread(target=node_server)

    python_thread.start()
    node_thread.start()
    while True:
        try:
            sleep(1)
        except KeyboardInterrupt:
            logger.info("Keyboard interrupt received, shutting down all threads...")
            break

    if not isinstance(node_process, subprocess.CompletedProcess):
        node_process.send_signal(SIGINT)
    node_thread.join()
    logger.info("Node.js server stopped")
    if not isinstance(python_process, subprocess.CompletedProcess):
        python_process.send_signal(SIGINT)
    python_thread.join()
    logger.info("Python server stopped")