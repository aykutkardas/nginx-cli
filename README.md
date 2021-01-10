# nginx-cli

Allows viewing and managing Nginx configuration files. It simplifies the relationship between `sites_available` and `sites_enabled` and makes it easy to manage.

![ngx preview](https://github.com/aykutkardas/nginx-cli/blob/master/preview.gif?raw=true)

---

### Install
```sh
npm install -g nginx-cli
```


### Initialize
You must install it as sudo.

```sh
$ sudo ngx init
```

### Commands

#### `ngx list`
```sh
$ ngx list

# Output #
┌───────────┬─────────┐
│ Conf Name │ Status  │
├───────────┼─────────┤
│ default   │ enabled │
├───────────┼─────────┤
│ test.conf │         │
└───────────┴─────────┘
```

#### `ngx enable <conf_name>`
```sh
$ ngx enable test.conf

# Output #
┌───────────┬─────────┐
│ Conf Name │ Status  │
├───────────┼─────────┤
│ default   │ enabled │
├───────────┼─────────┤
│ test.conf │ enabled │
└───────────┴─────────┘
```

#### `ngx disable <conf_name>`
```sh
$ ngx disable test.conf

# Output #
┌───────────┬─────────┐
│ Conf Name │ Status  │
├───────────┼─────────┤
│ default   │ enabled │
├───────────┼─────────┤
│ test.conf │         │
└───────────┴─────────┘
```