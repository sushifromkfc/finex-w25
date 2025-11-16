from typing import Iterable, Mapping, Any


def cast_fields_to_float(record: Mapping[str, Any], fields: Iterable[str]):
    for field in fields:
        value = record.get(field)
        if value is None:
            continue
        try:
            record[field] = float(value)
        except (TypeError, ValueError):
            continue
