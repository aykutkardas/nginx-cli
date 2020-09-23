import os
import argparse
from terminaltables import AsciiTable
from colorama import Fore

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

        if (is_enabled):
            table_data.append([highlight(current_conf), highlight("enable")])
        else:
            table_data.append([current_conf, ""])

    table = AsciiTable(table_data).table
    print(table)


def main():
    parser = argparse.ArgumentParser(
        description='nginx-cli | show and manage configure file')
    parser.add_argument('operation')
    parser.add_argument('-n', '--name', required=False)
    args = parser.parse_args()

    if (args.operation == 'list'):
        list_conf()
    elif (args.operation == 'enable'):
        enable_conf(args.name)
    elif (args.operation == 'disable'):
        disable_conf(args.name)


if __name__ == '__main__':
    main()
