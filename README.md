# ai-spoons

An energy management app to detect patterns in energy usage and help make daily life easier to overcome

## Building

This app runs in a docker container. To build it, ensure Docker is installed on your machine, and execute the following docker command:

    docker build -t ai-spoons .

## Development

There are two ways to run development builds of this app. The first one does not involve long build times, but shouldn't be used if anything related to the Docker build process has been changed. The second one is more accurate to the production environment.

### Method 1: Running on local machine

#### Dependencies

You will need the following dependencies installed on your machine to run development builds locally:

* `nodejs`
* `npm`
* `python3`
* `python3-pip`
* `python3-venv`
* `git`

```
sudo apt install nodejs npm python3 python3-pip python3-venv git
```

Clone this repository, and cd into the repository folder.

---

Next, setup the environment.

**If using VSCode**, make sure you have the *Python* extension installed, then open the command palette and search for Python: Create Environment. Use this command to setup a venv environment. Make sure to check the `requirements.txt` file in step 3 of the guide. Then run this command to setup the rest of the Python environment:

```
python3 setup.py
```


**If not**, in the root of the project, run these commands:

```
python3 -m venv .venv
source .venv/bin/activate
pip3 install -r requirements.txt
python3 setup.py
```

---

Finally, install Node server dependencies. Cd into `app/` and run

```
npm install
```

#### Running the development server

You may now run the development server with

```
python3 run.py
```

Make sure you're in the project root.

---

### Method 2: Running in Docker container

You must build the app first as described in Building. Then, execute this command:

    docker run -e RELEASE=--dev ai-spoons

Or simply:

    docker run ai-spoons

to run both the Python and Node servers.

## Deploying

Deploying the node server is not yet supported. In the future, to deploy it, execute this command:

    docker run -e RELEASE=--prod ai-spoons