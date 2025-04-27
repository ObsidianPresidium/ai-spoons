#!/bin/bash
MODE=${1:-}
RELATIVE_DIRECTORY=$(dirname "$0")
pushd "$RELATIVE_DIRECTORY"
SERVER_PATH=$(pwd)
AI_SPOONS_PATH=$(dirname "$SERVER_PATH/../../")
popd

if [ -d "$AI_SPOONS_PATH/venv" ]; then
    VENV_DIR="$AI_SPOONS_PATH/venv"
else
    VENV_DIR="$AI_SPOONS_PATH/.venv"
fi

if [ -v $VIRTUAL_ENV_PROMPT ]; then
    fastapi $MODE "$SERVER_PATH/server.py"
else
    source "$VENV_DIR/bin/activate"
    fastapi $MODE "$SERVER_PATH/server.py"
fi