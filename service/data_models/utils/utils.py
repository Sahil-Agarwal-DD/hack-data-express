import yaml
import os

def _get_development_from_yaml():
    try:
        dir_path = os.path.dirname(os.path.dirname((os.path.dirname(os.path.dirname(os.path.realpath(__file__))))))
        file_path = os.path.join(dir_path, "development.yaml")
        print("Opening file at path: ", file_path)
        with open(file_path) as f:
            development_dict = yaml.load(f, Loader=yaml.FullLoader)
            if development_dict is None:
                return {}
            else:
                return development_dict
    except FileNotFoundError:
        return {}

def get_sendgrid_token():
    development_dict = _get_development_from_yaml()
    return development_dict["sendgrid"]["api_key"]

def get_snowflake_config(profile):
    development_dict = _get_development_from_yaml()
    return development_dict.get(profile)

def get_trino_config():
    development_dict = _get_development_from_yaml()
    return development_dict["trino-prod"]

def get_genAi_portkey():
    development_dict = _get_development_from_yaml()
    return development_dict["gen-ai"]["PORTKEY_API_KEY"]

def get_genAi_virtual_key():
    development_dict = _get_development_from_yaml()
    return development_dict["gen-ai"]["PORTKEY_OPENAI_VIRTUAL_KEY"]