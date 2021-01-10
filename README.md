# nginx-cli

Allows viewing and managing Nginx configuration files. It simplifies the relationship between `sites_available` and `sites_enabled` and makes it easy to manage.

![ngnx preview](https://github.com/aykutkardas/nginx-cli/blob/master/preview.gif?raw=true)

---

### Install
```sh
npm install -g nginx-cli
```


### Initialize
You must install it as sudo.

```sh
$ sudo ngnx init
```

### Commands

#### `ngnx list`
```sh
$ ngnx list

# Output #
┌───────────┬─────────┐
│ Conf Name │ Status  │
├───────────┼─────────┤
│ default   │ enabled │
├───────────┼─────────┤
│ test.conf │         │
└───────────┴─────────┘
```

#### `ngnx enable <conf_name>`
```sh
$ ngnx enable test.conf

# Output #
┌───────────┬─────────┐
│ Conf Name │ Status  │
├───────────┼─────────┤
│ default   │ enabled │
├───────────┼─────────┤
│ test.conf │ enabled │
└───────────┴─────────┘
```

#### `ngnx disable <conf_name>`
```sh
$ ngnx disable test.conf

# Output #
┌───────────┬─────────┐
│ Conf Name │ Status  │
├───────────┼─────────┤
│ default   │ enabled │
├───────────┼─────────┤
│ test.conf │         │
└───────────┴─────────┘
```