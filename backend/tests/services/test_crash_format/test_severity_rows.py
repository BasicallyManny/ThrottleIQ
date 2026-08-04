from app.services.crash_format import format_severity_rows
from types import SimpleNamespace
import pytest


###Mock test row for severity formatter   
@pytest.fixture
def test_rows():
    return [
        SimpleNamespace(
            motorcycle_involved=True,
            severity="fatal",
            crash_count=111,
            percentage=1.05
        ),
        SimpleNamespace(
            motorcycle_involved=True,
            severity="injury",
            crash_count=7680,
            percentage=72.93
        ),
        SimpleNamespace(
            motorcycle_involved=True,
            severity="property damage",
            crash_count=2740,
            percentage=26.02
        ),
        SimpleNamespace(
            motorcycle_involved=False,
            severity="fatal",
            crash_count=499,
            percentage=0.22
        ),
        SimpleNamespace(
            motorcycle_involved=False,
            severity="injury",
            crash_count=96999,
            percentage=41.97
        ),
        SimpleNamespace(
            motorcycle_involved=False,
            severity="property damage",
            crash_count=133623,
            percentage=57.82
        ),
    ]

@pytest.fixture
def zero_rows():
    return [
        SimpleNamespace(
            motorcycle_involved=True,
            severity="fatal",
            crash_count=0,
            percentage=0.0
        ),
        SimpleNamespace(
            motorcycle_involved=True,
            severity="injury",
            crash_count=0,
            percentage=0.0
        ),
        SimpleNamespace(
            motorcycle_involved=True,
            severity="property damage",
            crash_count=0,
            percentage=0.0
        ),
        SimpleNamespace(
            motorcycle_involved=False,
            severity="fatal",
            crash_count=0,
            percentage=0.0
        ),
        SimpleNamespace(
            motorcycle_involved=False,
            severity="injury",
            crash_count=0,
            percentage=0.0
        ),
        SimpleNamespace(
            motorcycle_involved=False,
            severity="property damage",
            crash_count=0,
            percentage=0.0
        ),
    ]
def test_severity_format(test_rows):
    """ Test if the output format is proper"""
    result = format_severity_rows(test_rows)
    
    assert result["motorcycle"]["fatal"]["count"] == 111
    assert result["motorcycle"]["injury"]["count"] == 7680
    assert result["motorcycle"]["property_damage"]["count"] == 2740
    assert result["non_motorcycle"]["fatal"]["count"] == 499
    assert result["non_motorcycle"]["injury"]["count"] == 96999
    assert result["non_motorcycle"]["property_damage"]["count"] == 133623 
    
def test_severity_categories(test_rows):
    """Test if all severity categories exists"""
    result = format_severity_rows(test_rows)
    #loop through vechicle_type and severity of the formatted results
    for vechicle_type in ["motorcycle","non_motorcycle"]:
        assert vechicle_type in result
        for severity in ["fatal","injury","property_damage"]:
            assert severity in result[vechicle_type]
            assert "count" in result[vechicle_type][severity]
            assert "percentage" in result[vechicle_type][severity]
            
def test_preserved_zeros(zero_rows):
    """Empty,deleted,null values should always result in 0 in the output"""
    result= format_severity_rows(zero_rows)
    
    for vechical_type in ["motorcycle", "non_motorcycle"]:
        for severity in ["fatal","injury","property_damage"]:
            assert result[vechical_type][severity]["count"] == 0
            assert result[vechical_type][severity]["percentage"] == 0.0
            
def test_count_percentage_data_types(test_rows):
    """Test if count and percentage has the proper type"""
    result= format_severity_rows(test_rows)
    for vechical_type in ["motorcycle", "non_motorcycle"]:
        for severity in ["fatal","injury","property_damage"]:
            assert isinstance(result[vechical_type][severity]["count"], int)
            assert isinstance(result[vechical_type][severity]["percentage"],float)

