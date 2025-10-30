import os
import json
import sys
import subprocess

def get_plan_config():
    try:
        with open('./config.json') as config_file:
            return json.load(config_file)
    except FileNotFoundError as e:
        print(f'Error: {e}')
        sys.exit(1)

def apply_infra(config):
    terraform_dir = os.path.join(os.getcwd(), 'infra')
    terraform_bin = os.environ.get('TF_CLI_ARGS_init', 'terraform')

    os.chdir(terraform_dir)
    subprocess.run([terraform_bin, 'init'], check=True)
    subprocess.run([terraform_bin, 'fmt'], check=True)
    subprocess.run([terraform_bin, 'validate'], check=True)
    subprocess.run([terraform_bin, 'apply', '-auto-approve'], check=True)

def main():
    config = get_plan_config()
    apply_infra(config)

if __name__ == "__main__":
    main()