#THe output from APINinjas Motorcycle API everything is mapped to a string value. We will need parsers to parse the string value into numeric numbers we can run calulations with

from decimal import Decimal
import re

def extract_number(text:str|None)->Decimal|None:
    """Take a string and extract the number from string"""
    if text is None:
        return None
    #re.match(pattern, string)
    match = re.search(r"\d+(\.\d+)?", text)
    
    if not match:
        return None
    
    return round(Decimal(match.group()),1)

def parse_specs(raw_specs:dict|None)->dict|None:
    
    if raw_specs is None:
        return None
    
    field_map={
        "horsepower":"power",
        "torque_nm":"torque",
        "weight_kg":"total_weight"
    }
    
    # return {
    #     "horsepower": extract_number(raw_specs.get("power")),
    #     "torque_nm": extract_number(raw_specs.get("torque")),
    #     "weight_kg": extract_number(raw_specs.get("total_weight"))
    # }
    
    return{
        target_key: extract_number(raw_specs.get(source_key))
        for target_key,source_key in field_map.items()   
    }

def main():
    test_dict={
        "power": "52.3 HP (38.2  kW)) @ 8000 RPM",
        "torque": "56.0 Nm (5.7 kgf-m or 41.3 ft.lbs) @ 4000 RPM",
        "total_weight": "192.1 kg (423.4 pounds)",
    }
    print(parse_specs(test_dict))
    
if __name__ == "__main__":
    main()
    