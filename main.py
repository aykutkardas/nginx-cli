import os
import click
from terminaltables import AsciiTable
from colorama import Fore
from subprocess import Popen, PIPE
from re import search

sites_available_path = 'sites-available'
sites_enabled_path = 'sites-enabled'


def detect_nginx():
    try:
        process = Popen(['nginx', '-V'], stderr=PIPE)
    except OSError:
        click.echo(Fore.RED + 'Nginx not found. Perhaps Nginx is not in your PATH?\n' + Fore.RESET)
        return False

    stdout, stderr = process.communicate()
    version_output = stderr.decode('utf-8')
    conf_path_match = search(r'--conf-path=(\S*)', version_output)
    if conf_path_match:
        return conf_path_match.expand(r"\1").replace("/nginx.conf", "")

    return False


def detect_directories(nginx_path):
    path_a = "%s/%s" % (nginx_path, sites_available_path)
    path_e = "%s/%s" % (nginx_path, sites_enabled_path)

    if os.path.exists(path_a) is False or os.path.exists(path_e) is False:
        os.mkdir(os.path.join(nginx_path, sites_available_path))
        os.mkdir(os.path.join(nginx_path, sites_enabled_path))


def highlight(text):
    return Fore.GREEN + text + Fore.RESET


def enable_conf(conf_name):
    nginx_path = detect_nginx()
    if nginx_path is False:
        pass
    detect_directories(nginx_path)

    path_a = "%s/%s/%s" % (nginx_path, sites_available_path, conf_name)
    path_e = "%s/%s/%s" % (nginx_path, sites_enabled_path, conf_name)

    if os.path.exists(path_a):
        return list_conf()

    os.symlink(path_a, path_e)
    list_conf()


def disable_conf(conf_name):
    nginx_path = detect_nginx()
    if nginx_path is False:
        pass

    detect_directories(nginx_path)

    path_e = "%s/%s/%s" % (nginx_path, sites_enabled_path, conf_name)

    is_exists = os.path.exists(path_e)
    if not is_exists:
        return list_conf()

    os.remove(path_e)
    list_conf()


def list_conf():
    nginx_path = detect_nginx()
    if nginx_path is False:
        pass
    detect_directories(nginx_path)

    sites_available = os.listdir("%s/%s" % (nginx_path, sites_available_path))
    sites_enabled = os.listdir("%s/%s" % (nginx_path, sites_enabled_path))

    table_header = {'Conf File Name': 'Status'}
    table_data = dict(
        map(
            lambda conf: (highlight(conf), highlight("enable")) if conf in sites_enabled else (conf, ""),
            sites_available)
    )
    table_header.update(table_data)
    click.echo(AsciiTable(table_header.items()).table)


@click.group()
def cli():
    pass


@cli.command()
def list():
    list_conf()


@cli.command()
@click.option('--name', '-n', prompt='Conf File Name?',
              help='Name of the configuration file to be affected')
def enable(name):
    enable_conf(name)


@cli.command()
@click.option('--name', '-n', prompt='Conf File Name?',
              help='Name of the configuration file to be affected')
def disable(name):
    disable_conf(name)


if __name__ == '__main__':
    click.echo(Fore.LIGHTGREEN_EX + """
                   _                           _  _ 
     _ __    __ _ (_) _ __  __  __        ___ | |(_)
    | '_ \  / _` || || w'_ \ \ \/ /_____  / __|| || |
    | | | || (_| || || | | | >  <|_____|| (__ | || |
    |_| |_| \__, ||_||_| |_|/_/\_\       \___||_||_|
            |___/  
    NGINX-CLI                           AYKUT KARDAS
       """ + Fore.RESET)
    detect_nginx()
    cli()
