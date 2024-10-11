import yaml
from typing import Text, Callable, Optional, List, Any, Dict
import logging
import os
from collections import defaultdict
import pprint
import json


parent_directory = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
service_directory = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

business_models_directory = os.path.join(parent_directory, "business_models")
logical_models_directory = os.path.join(parent_directory, "datamart")
physical_models_directory = os.path.join(parent_directory, "entity")
physical_dimension_models_directory = os.path.join(physical_models_directory, "dimension")
physical_fact_models_directory = os.path.join(physical_models_directory, "fact")
physical_relationship_models_directory = os.path.join(physical_models_directory, "relationship")
ui_models_repo_directory = os.path.join(service_directory, "database")

print("Config directory is {}".format(ui_models_repo_directory))


class Attribute:
    def __init__(self, name, mapping=None, expr= None, type=None, description=None, enum_values=None):
        self.name = name
        self.mapping = mapping
        self.expr = expr
        self.type = type
        self.description = description
        self.enum_values = enum_values or []
    def __repr__(self):
        return (f"Attribute(name={self.name!r}, expr={self.expr!r}, mapping={self.mapping!r}, "
                f"type={self.type!r}, description={self.description!r}, "
                f"enum_values={self.enum_values!r})")

class HierarchicalEntity:
    def __init__(self, parent,  children: List[Attribute]):
        self.parent = parent
        self.children = children
    def __repr__(self):
        children_repr = ', '.join(repr(child) for child in self.children)
        return (f"HierarchicalEntity(parent={self.parent!r}, "
                f"children=[{children_repr!r}])")


class BusinessModelDefinition:
    def __init__(self, version, description, datamart, domain, attributes=None, hierarchical_entity=None):
        self.version = version
        self.description = description
        self.datamart = datamart
        self.domain = domain
        self.attributes = attributes or []
        self.hierarchical_entity = hierarchical_entity or []
    def __repr__(self):
        return (f"DataMartConfig(version={self.version!r}, description={self.description!r}, "
                f"datamart={self.datamart!r}, domain={self.domain!r}, "
                f"attributes={self.attributes!r}, hierarchical_entity={self.hierarchical_entity!r})")

class DataMartAttribute:
    def __init__(self, name, type=None, description=None, source=None):
        self.name = name
        self.type = type
        self.description = description
        self.source = source
    def __repr__(self):
        return (f"DataMartAttribute(name={self.name!r}, type={self.type!r}, "
                f"description={self.description!r}, source={self.source!r}, "
                )


class DataMartDefinition:
    def __init__(self, version, description, driver_entity, attributes):
        self.version = version
        self.description = description
        self.driver_entity = driver_entity
        self.attributes = attributes
    def __repr__(self):
        return (f"DataMartDefinition(version={self.version!r}, description={self.description!r}, "
                f"driver_entity={self.driver_entity!r}, attributes={self.attributes!r})")


def __get_business_model_definitions(
    relative_file_path: Text, section: Text, cls: Optional[Callable[..., Any]]
) -> List[Any]:
    file_path = relative_file_path
    with open(file_path, "r") as f:
        try:
            yaml_data = yaml.safe_load(f)
        except yaml.YAMLError as exc:
            print("**** Exception occured ***** ")
            print(exc)
            raise ValueError("Unable to parse YAML file - {} ".format(file_path))
    if section not in yaml_data:
        raise KeyError(
            "File `{}` doesn't contain `{}` section ".format(file_path, section)
        )
    if cls:
        data_model_config = cls(**yaml_data[section])
        attributes=[]
        for attr in data_model_config.attributes:
            attributes.append(Attribute(**attr))
        data_model_config.attributes = attributes
        hierachical_entities = []
        if not data_model_config.hierarchical_entity:
            return data_model_config
        for parent, child_list in data_model_config.hierarchical_entity.items():
            child_attr = []
            for child in child_list:
                try:
                    child_attr.append(Attribute(**child))
                except TypeError:
                    for sub_parent, sub_child_list in child.items():
                        nested_attr=[]
                        for sub_child in sub_child_list:
                            nested_attr.append(Attribute(**sub_child))
                        child_attr.append(HierarchicalEntity(sub_parent, nested_attr))
            hierachical_entities.append(HierarchicalEntity(parent, child_attr))
        data_model_config.hierarchical_entity = hierachical_entities
        return data_model_config
    return yaml_data[section]



def get_business_model_definitions(model_name: Text) -> List[BusinessModelDefinition]:
    """
    :param relative_file_path:
    :return: Parses the Yaml and Returns list of  ColumnDefinition objects.
    """
    schema_file_path = "%s/%s" % (business_models_directory, model_name)
    return __get_business_model_definitions(
        schema_file_path, "business_model", BusinessModelDefinition
    )

def _convert_attr_to_ui_model(attr):
    return {
            "name": attr.name,
            "type": attr.type,
            "description": attr.description,
            "alias": "",
            "is_calculated_field": True if attr.expr else False,
            "calculated_field_statement": attr.expr if attr.expr else "",
            "enum_values": attr.enum_values,
            "children": []
        }

def _convert_parent_child_to_ui_model(parent, child):
    sub_children = []
    for sub_child in child:
        if type(sub_child)==Attribute:
            sub_children.append(_convert_attr_to_ui_model(sub_child))
        else:
            sub_children.append(_convert_parent_child_to_ui_model(sub_child.parent, sub_child.children))
    return {
        "name": parent,
        "type": "parent",
        "description": "",
        "alias": "",
        "is_calculated_field": False,
        "calculated_field_statement": "",
        "enum_values": [],
        "children": sub_children
    }

def transform_config_to_ui_model(business_model_def: BusinessModelDefinition) -> Dict[Any, Any]:
    """
    :param business_model_def:
    :return: Returns the UI Model
    """
    business_model_filed_map = defaultdict(list)
    ui_fields=[]
    for attr in business_model_def.attributes:
        ui_fields.append(_convert_attr_to_ui_model(attr))
    for hrchy_data in business_model_def.hierarchical_entity:
        if type(hrchy_data)== HierarchicalEntity:
            ui_fields.append(_convert_parent_child_to_ui_model(hrchy_data.parent, hrchy_data.children))
    return {
            "{}-{}".format(business_model_def.domain, business_model_def.datamart):
                {
                    "fields": ui_fields,
                }
    }

ALLOWED_LIST = ["unit_economics.yaml"]

def get_business_models():
    """
    :return: Returns the list of Business Models
    """
    business_models = []
    for file in os.listdir(business_models_directory):
        if file.endswith(".yaml"):
            if file in ALLOWED_LIST:
                model_obj = get_business_model_definitions(file)
                transformed_ui_model = transform_config_to_ui_model(model_obj)
                business_models.append(transformed_ui_model)
    return {"business_model": business_models}


def save_all_models_to_file_for_ui(data, filename):
    with open(filename, 'w') as json_file:
        json.dump(data, json_file, indent=4)

models = get_business_models()
save_all_models_to_file_for_ui(models, "{}/{}".format(ui_models_repo_directory, "business-model.json"))



"""
#ata =get_business_model_definitions("unit_economics.yaml")
#print(transform_config_to_ui_model(data))
#print(data)
#pprint.pprint(transform_config_to_ui_model(data))

for hrchy in data:
    for child in hrchy.children:
        print(hrchy.parent, child)
print(get_business_model_definitions("unit_economics.yaml").hierarchical_entity)

print("****************")
data = get_business_model_definitions("unit_economics.yaml").hierarchical_entity
for hrchy_pair in data:
    print(hrchy_pair.parent, hrchy_pair.children)
    print(_convert_parent_child_to_ui_model(hrchy_pair.parent, hrchy_pair.children))
"""