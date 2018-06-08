echo $PATH | grep -q rbenv
if [ $? -eq 1 ]; then
    # Add rbenv bin and shims to PATH.
    export PATH="/home/{{app_user}}/.rbenv/bin:/home/{{app_user}}/.rbenv/shims:$PATH"
fi
