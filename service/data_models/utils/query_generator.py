from data_model_parser import get_all_data_mart_definitions
from data_model_parser import get_business_model_definitions
import json

class SelectiContext:
    def __init__(self, filed, name, alias, calculated_field_statement=None):
        self.filed = filed
        self.name = name
        self.alias = alias
        self.calculated_field_statement = calculated_field_statement
    def __repr__(self):
        return f"SelectiContext(filed={self.filed}, name={self.name}, alias={self.alias}, calculated_field_statement={self.calculated_field_statement})"


class QueryFilterContext:
    def __init__(self, field, operator, value):
        self.field = field
        self.operator = operator
        self.value = value
    def __repr__(self):
        return f"QueryFilterContext(field={self.field}, operator={self.operator}, value={self.value})"



def generate_query_from_user_contex(context_json):
    pass


def generate_where_clause(query):
    """Recursively generate a SQL WHERE clause from the query rules."""

    def process_rule(rule):
        """Process a single rule to generate a condition."""
        field = rule.get('field')
        operator = rule.get('operator')
        value = rule.get('value')

        # Handle string values with quotes
        if isinstance(value, str):
            value = f"'{value}'"

        # Return the condition
        return f"{field} {operator} {value}"

    def process_group(group):
        """Process a group of rules with combinators."""
        combinator = group.get('combinator', 'and').upper()
        rules = group.get('rules', [])

        conditions = []
        for rule in rules:
            # Check if the rule is a group (nested rules)
            if 'rules' in rule:
                conditions.append(f"({process_group(rule)})")
            else:
                conditions.append(process_rule(rule))

        # Join all conditions in the group with the combinator
        return f" {combinator} ".join(conditions)

    # Start processing the query
    return process_group(query)


# Example query data
query = {
    "combinator": "and",
    "rules": [
        {
            "id": "624fae13-a80a-4ff1-988c-d219c29b4d5e",
            "field": "lob",
            "operator": "=",
            "valueSource": "value",
            "value": "Subscription - CAV"
        },
        {
            "id": "d058bf43-322a-45a0-a01d-d7300defb208",
            "field": "Active Date",
            "operator": ">=",
            "valueSource": "value",
            "value": "2024-10-01"
        }
    ],
    "id": "3defe683-8c29-4a85-a926-6768bb8fd052"
}

# Generate the WHERE clause
where_clause = generate_where_clause(query)
print("WHERE " + where_clause)
