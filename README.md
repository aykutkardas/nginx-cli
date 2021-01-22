# nginx-cli

Allows viewing and managing Nginx configuration files. It simplifies the relationship between `sites_available` and `sites_enabled` and makes it easy to manage.



### *Temporary Demo Preview* 
![nginx preview](https://github.com/aykutkardas/nginx-cli/blob/master/preview.gif?raw=true)

---

### Install

```sh
npm install -g nginx-cli
```

### Initialize

```sh
$ nnx init
```

### Commands

#### Create Conf
```sh
$ nnx create template.conf
```

#### Create Conf with Template 
```sh
$ nnx create template.conf
```

#### `nnx list`

```sh
$ nnx list

# Output #
┌───────────┬─────────┐
│ Conf Name │ Status  │
├───────────┼─────────┤
│ default   │ enabled │
├───────────┼─────────┤
│ test.conf │         │
└───────────┴─────────┘
```

#### `nnx enable <conf_name>`

```sh
$ nnx enable test.conf

# Output #
┌───────────┬─────────┐
│ Conf Name │ Status  │
├───────────┼─────────┤
│ default   │ enabled │
├───────────┼─────────┤
│ test.conf │ enabled │
└───────────┴─────────┘
```

#### `nnx disable <conf_name>`

```sh
$ nnx disable test.conf

# Output #
┌───────────┬─────────┐
│ Conf Name │ Status  │
├───────────┼─────────┤
│ default   │ enabled │
├───────────┼─────────┤
│ test.conf │         │
└───────────┴─────────┘
```

#### `nnx list template`

```sh
$ nnx list template

# Output #
┌───────────────┐
│ Template Name │
├───────────────┤
│ default.conf  │
└───────────────┘
```
