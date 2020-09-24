import os
import click
from terminaltables import AsciiTable
from colorama import Fore
from subprocess import Popen, PIPE
from configparser import ConfigParser

config = ConfigParser()

sites_available_path = '/sites-available/'
sites_enabled_path = '/sites-enabled/'
nginx_default_path = '/etc/nginx'

if os.path.exists('config.ini'):
    config.read('config.ini')
    if config['nginx']:
        sites_available_path = config['nginx']['sites_available'] + '/'
        sites_enabled_path = config['nginx']['sites_enabled'] + '/'
        nginx_default_path = config['nginx']['nginx_root']


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


def generate_conf(data, alias):
    config[alias] = data
    with open('config.ini', 'w') as conf:
        config.write(conf)

    print(highlight("Configuration '" + alias + "' set."))


def auto_init():
    process = Popen('which nginx', shell=True, stdout=PIPE)
    (output, err) = process.communicate()
    exit_code = process.wait()

    if exit_code is not 0:
        print(Fore.RED + 'No nginx installation found. Please try manuel mode.' + Fore.RESET)
        exit()

    if output:
        executable = output.strip()
        print(highlight("Nginx executable found: " + executable))

        conf_detect = Popen(executable
                            + " -V 2>&1 | grep -o '\-\-conf-path=\(.*conf\)' | cut -d '=' -f2 | sed 's/\/nginx.conf//g'",
                            shell=True, stdout=PIPE)
        (conf_output, conf_err) = conf_detect.communicate()
        conf_code = conf_detect.wait()

        if conf_code is not 0:
            print(Fore.RED + 'Nginx root path detection failed. Please try manuel mode.' + Fore.RESET)
            exit()

        if conf_output:
            root_path = conf_output.strip()
            print(highlight("Nginx root path detected: " + root_path))

            if not os.path.exists(root_path + '/sites-available') and \
                    os.path.exists(root_path + '/sites-enabled'):
                print(Fore.RED + 'Nginx sites-available or sites-enabled folder is not exist. Please try manuel mode.'
                      + Fore.RESET)
                exit()

            generate_conf({
                'executable': executable,
                'nginx_root': root_path,
                'sites_available': '/sites-available',
                'sites_enabled': '/sites-enabled'
            }, 'nginx')


@click.group()
def cli():
    pass


@cli.command()
def init():
    auto_init()


@cli.command()
def list():
    list_conf(nginx_default_path)


@cli.command()
@click.option('--name', '-n', prompt='Conf File Name?',
              help='Name of the configuration file to be affected')
def enable(name):
    enable_conf(name, nginx_default_path)


@cli.command()
@click.option('--name', '-n', prompt='Conf File Name?',
              help='Name of the configuration file to be affected')
def disable(name):
    disable_conf(name, nginx_default_path)


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
    cli()
