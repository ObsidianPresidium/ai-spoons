#!/bin/bash
RELATIVE_DIRECTORY=$(dirname "$0")
pushd "$RELATIVE_DIRECTORY"
AI_SPOONS_PATH=$(pwd)
popd

if [ -d "$AI_SPOONS_PATH/.venv" ]; then
    VENV_DIR="$AI_SPOONS_PATH/.venv"
else
    VENV_DIR="$AI_SPOONS_PATH/venv"
fi

if [ -v $VIRTUAL_ENV_PROMPT ]; then
    python3 ${1:-}
else
    source "$VENV_DIR/bin/activate"
    python3 ${1:-}
fi