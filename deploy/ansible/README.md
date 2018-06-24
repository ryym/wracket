# Ansible Playbooks for single server deployment

This directory contains [Ansible](https://www.ansible.com/) playbooks
that setups a server and deploy the app.

Since this is a hobby project,
currently we are using a single CentOS 7 server to run all the necessary softwares - web app, database, and proxy server.

## Tools

### [rbenv](https://github.com/rbenv/rbenv)

- build and install latest Ruby
- manage several versions of Ruby

Though Yum provides a Ruby binary, it is too old!

### [PostgreSQL](https://www.postgresql.org/)

- persist application data

Currently there are no redundancy / backup system.

### [Nginx](https://www.nginx.com/)

- accept and filter requests
- terminate HTTPS connection

### [Let's Encrypt](https://letsencrypt.org/)

- manage and renew TLS certificate automatically

## Blue-Green like deployment

We runs two apps on a single server to achieve zero downtime deployment.
They are named `blue` and `green`, and Nginx proxies requests to either one.

For example if `blue` are serving requests, we deploys a new app by the following steps:

1. Update `green` (`git clone`, `db:migrate`, etc)
1. Restart `green`
1. Change Nginx configuration to proxy requests to `green`
1. Restart Nginx

By this way, we can update the app without downtime.
Also we can switch to the previous app (`blue`) quickly if a problem is found in `green`.

Note that this does not improve the app's availability at all
because they are running on the same server.

### Database compatibility

Since the `blue` and `green` apps share a same database,
we need to avoid database-incompatible update to prevent errors during a deployment.

For example, we need two releases to delete an existing column.

1. First, remove all code that uses the column
1. Next, delete the column from the database

If we do them at once, the old app could access the deleted column
between the time `db:migrate` runs and the app switches. 

## Misc

### If SSH connection failed by 'Too many authentication failures'

See <https://github.com/ansible/ansible/issues/26749>.

It seems that ssh-agent tries to using registered private keys
even if we specify a private key path explicitly.
We can avoid this by specifying `IdentitiesOnly` option using an environment variable:

```sh
ANSIBLE_SSH_ARGS="-o 'IdentitiesOnly yes'"
```
