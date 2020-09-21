import os
from terminaltables import AsciiTable
from colorama import Fore

sites_available_path = '/etc/nginx/sites-available';
sites_enabled_path = '/etc/nginx/sites-enabled';

sites_available = os.listdir(sites_available_path);
sites_enabled = os.listdir(sites_enabled_path);

# os.symlink(src, dst)

def list_conf():
  table_data = [['Conf File Name', 'Enabled?']];

  for i in range(len(sites_available)):
    table_data.append([ 
      sites_available[i], 
      "v" if sites_available[i] in sites_enabled else  ""]
    );

  table = AsciiTable(table_data)
  print table.table

def main():
	while(True):
		try:	
			print Fore.CYAN + "\n1.Hosts Discovery" +Fore.RESET
			print Fore.YELLOW+"Press ctrl+c to exit..." +Fore.RESET
			opt=int(input(Fore.CYAN+"\nEnter choice: "+Fore.RESET))
			if opt==1:
				list_conf()
			else:
				print Fore.RED+"\nEnter correct choice...!!" +Fore.RESET
		except KeyboardInterrupt:
			print Fore.RED+"\nABORTED PROGRAM....!!" +Fore.RESET
			sys.exit(0)
		except:
			print Fore.RED+"\nEnter correct choice...!!" +Fore.RESET
	
if __name__ == '__main__':
	main()