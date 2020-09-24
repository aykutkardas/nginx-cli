import os
import click
from terminaltables import AsciiTable
from colorama import Fore

sites_available_path = '/sites-available/'
sites_enabled_path = '/sites-enabled/'
nginx_default_path = '/etc/nginx'


def highlight(text):
    return Fore.GREEN + text + Fore.RESET


def enable_conf(conf_name, nginx_path):
    conf_enabled_path = nginx_path + sites_enabled_path + conf_name
    conf_available_path = nginx_path + sites_available_path + conf_name

    is_exists = os.path.exists(conf_enabled_path)

    if is_exists:
        return list_conf(nginx_path)

    os.symlink(conf_available_path, conf_enabled_path)
    list_conf(nginx_path)


def disable_conf(conf_name, nginx_path):
    conf_enabled_path = nginx_path + sites_enabled_path + conf_name
    is_exists = os.path.exists(conf_enabled_path)
    if not is_exists:
        return list_conf(nginx_path)

    os.remove(conf_enabled_path)
    list_conf(nginx_path)


def list_conf(nginx_path):
    sites_available = os.listdir(nginx_path + sites_available_path)
    sites_enabled = os.listdir(nginx_path + sites_enabled_path)

    table_data = [['Conf File Name', 'Status']]

    for i in range(len(sites_available)):
        current_conf = sites_available[i]
        is_enabled = current_conf in sites_enabled

        if is_enabled:
            table_data.append([highlight(current_conf), highlight("enable")])
        else:
            table_data.append([current_conf, ""])

    table = AsciiTable(table_data).table
    print(table)


@click.command()
@click.option('--nginx_path', default=nginx_default_path, prompt='Nginx Path?',
              type=click.Path())
@click.option('--operation', default="list", prompt='Operation Type?',
              type=click.Choice(['list', 'enable', 'disable'], case_sensitive=False))
@click.option('--name', prompt='Operation Name?',
              help='The person to greet.')
def manage(nginx_path, operation, name):
    if operation == 'list':
        list_conf(nginx_path)
    elif operation == 'enable':
        enable_conf(name, nginx_path)
    elif operation == 'disable':
        disable_conf(name, nginx_path)


if __name__ == '__main__':
    click.echo(Fore.LIGHTGREEN_EX + """
                   _                           _  _ 
     _ __    __ _ (_) _ __  __  __        ___ | |(_)
    | '_ \  / _` || || '_ \ \ \/ /_____  / __|| || |
    | | | || (_| || || | | | >  <|_____|| (__ | || |
    |_| |_| \__, ||_||_| |_|/_/\_\       \___||_||_|
            |___/  
    NGINX-CLI                           AYKUT KARDAS
       """ + Fore.RESET)
    manage()
