# Ansible Playbooks for single server deployment

This is still at an early stage.

## Note

### If SSH connection failed by 'Too many authentication failures'

See <https://github.com/ansible/ansible/issues/26749>.

It seems that ssh-agent tries to using registered private keys
even if we specify a private key path explicitly.
We can avoid this by specifying `IdentitiesOnly` option using an environment variable:

```sh
ANSIBLE_SSH_ARGS="-o 'IdentitiesOnly yes'"
```
