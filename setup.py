from distutils.core import setup

setup(name='NginxCli',
      version='0.1',
      description='Nginx Cli',
      author='Aykut Kardas',
      url='https://github.com/aykutkardas/nginx-cli',
      py_modules=['nginxcli'],
      install_requires=[
          'terminaltables',
          'colorama',
          'click'
      ]
      )
