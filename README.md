# nginx-cli

Allows viewing and managing Nginx configuration files. It simplifies the relationship between sites_available and sites_enabled and makes it easy to manage.



List all configurations with their statuses

```sh
ngx list
```
```sh
+-----------------+--------+
| Conf File Name  | Status |
+-----------------+--------+
| default         | enable |
| github.com.conf | enable |
| google.com.conf |        |
| test.conf       |        |
+-----------------+--------+
```

Enable a configuration. This adds a symlink of the enabled configuration file to the sites_enabled directory.

```sh
ngx enable -n test.conf
```
```sh
+-----------------+--------+
| Conf File Name  | Status |
+-----------------+--------+
| default         | enable |
| github.com.conf | enable |
| google.com.conf |        |
| test.conf       | enable |
+-----------------+--------+
```

Disable a configuration. This deletes the symlink of the disabled configuration file from the sites_enabled directory.
```sh
ngx disable -n test.conf
```
```sh
+-----------------+--------+
| Conf File Name  | Status |
+-----------------+--------+
| default         | enable |
| github.com.conf | enable |
| google.com.conf |        |
| test.conf       |        |
+-----------------+--------+
```