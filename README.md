# nginx-cli

![Version](https://img.shields.io/npm/v/nginx-cli?color=%23009639)

![Nginx-Cli Logo](https://raw.githubusercontent.com/aykutkardas/nginx-cli/master/logo.png)

This tool makes it easier to manage nginx configurations and create new ones. It automates the linking of configurations between the `sites-available` and `sites-enabled` directories. It allows you to create templates to create new configurations and use them easily with cli.

## Install

```sh
npm install -g nginx-cli
```

### Initialize

```
➜  nnx init

? What's the path of NGINX? /etc/nginx
? What's the path of sites-available? /etc/nginx/sites-available/
? What's the path of sites-enabled? /etc/nginx/sites-enabled/
```

## Usage

### **Commands**

`create`

There are two ways to create a new configuration. Using the default template or by selecting a template.

### With Default Template

```
➜  nnx create
? What's the value of DOMAIN? example.com
? What's the value of ROOT? /home/app/example
? Enable conf file? Yes
```

**Default Template Detail:** `/etc/.nginx-cli/templates/default.conf`

```
server {
    listen 80;
    server_name {{DOMAIN}};

    access_log /var/log/nginx/{{DOMAIN}}_access.log;
    error_log  /var/log/nginx/{{DOMAIN}}_error.log;

    root {{ROOT}};
    index index.html index.htm index.php;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

### With Custom Template

When creating your own template so that it can be parsed, specify the parts you want to edit using the following format.

`{{KEY}}`

Copy this template file you created to the `/etc/.nginx-cli/templates` directory.

You can now call it using the name of this template.

```sh
➜  nnx create template.conf
```

`list`

### List Nginx Confs

```
➜  nnx list

┌──────────────────┬─────────┐
│ Conf Name        │ Status  │
├──────────────────┼─────────┤
│ example_com.conf │ enabled │
└──────────────────┴─────────┘
```

### List Nginx Templates

```
➜  nnx list template

┌───────────────┐
│ Template Name │
├───────────────┤
│ default.conf  │
└───────────────┘
```

`enable`

```
➜  nnx enable example_com.conf

┌──────────────────┬─────────┐
│ Conf Name        │ Status  │
├──────────────────┼─────────┤
│ example_com.conf │ enabled │
└──────────────────┴─────────┘
```

`disable`

```
➜  nnx disable example_com.conf

┌──────────────────┬────────┐
│ Conf Name        │ Status │
├──────────────────┼────────┤
│ example_com.conf │        │
└──────────────────┴────────┘
```
