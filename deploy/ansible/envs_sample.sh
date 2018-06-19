# XXX: Should be true.
export ANSIBLE_HOST_KEY_CHECKING=false

# See README.
export ANSIBLE_SSH_ARGS="-o 'IdentitiesOnly yes'"

export ANSIBLE_SSH_USER="vagrant"
export ANSIBLE_SSH_PRIVATE_KEY_FILE="path/to/your/vagrant/private-key"
