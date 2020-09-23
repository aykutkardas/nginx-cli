import os
from terminaltables import AsciiTable
from colorama import Fore
import click

sites_available_path = '/etc/nginx/sites-available/'
sites_enabled_path = '/etc/nginx/sites-enabled/'


def highlight(text):
    return Fore.GREEN + text + Fore.RESET


def enable_conf(conf_name):
    conf_enabled_path = sites_enabled_path + conf_name
    conf_available_path = sites_available_path + conf_name

    is_exists = os.path.exists(conf_enabled_path)

    if is_exists:
        return list_conf()

    os.symlink(conf_available_path, conf_enabled_path)
    list_conf()


def disable_conf(conf_name):
    conf_enabled_path = sites_enabled_path + conf_name
    is_exists = os.path.exists(conf_enabled_path)
    if not is_exists:
        return list_conf()

    os.remove(conf_enabled_path)
    list_conf()


def list_conf():
    sites_available = os.listdir(sites_available_path)
    sites_enabled = os.listdir(sites_enabled_path)

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
@click.option('--enabled_path', default=sites_enabled_path,  prompt='Sites Enabled Path?',
              type=click.Path(dir_okay=True, exists=True))
@click.option('--available_path', default=sites_available_path, prompt='Sites Available Path?',
              type=click.Path(dir_okay=True, exists=True))
@click.option('--operation', default="list", prompt='Operation Type?',
              type=click.Choice(['list', 'enable', 'disable'], case_sensitive=False))
@click.option('--name', prompt='Operation Name?',
              help='The person to greet.')
def manage(enabled_path, available_path, operation, name):
    print(enabled_path, available_path)
    if operation == 'list':
        list_conf()
    elif operation == 'enable':
        enable_conf(name)
    elif operation == 'disable':
        disable_conf(name)


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
