import os
from terminaltables import AsciiTable
from colorama import Fore
import argparse

sites_available_path = '/etc/nginx/sites-available'
sites_enabled_path = '/etc/nginx/sites-enabled'

sites_available = os.listdir(sites_available_path)
sites_enabled = os.listdir(sites_enabled_path)

# os.symlink(src, dst)


def highlight(text):
    return Fore.GREEN + text + Fore.RESET


def list_conf():
    table_data = [['Conf File Name', 'Status']]

    for i in range(len(sites_available)):
        current_conf = sites_available[i]
        is_enabled = current_conf in sites_enabled

        if (is_enabled):
            table_data.append([highlight(current_conf), highlight("enable")])
        else:
            table_data.append([current_conf, ""])

    print AsciiTable(table_data).table


def main():
    parser = argparse.ArgumentParser(
        description='nginx-cli | show and manage configure file')
    parser.add_argument('list', metavar='N', help='List configure files')
    args = parser.parse_args()

    if (args.list):
        list_conf()


if __name__ == '__main__':
    main()
