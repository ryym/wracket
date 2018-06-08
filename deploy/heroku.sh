#!/usr/bin/env bash

# This is a simple script to deploy the app to Heroku.
# Need to be run at the repository root.

set -e

while getopts f OPT
do
    case $OPT in
        "f" ) PUSH_OPT="-f";;
    esac
done

yarn build:prod

git add -f public/assets

git commit -nm "Add precompiled assets"

git push $PUSH_OPT heroku HEAD:master

git reset --hard HEAD^
