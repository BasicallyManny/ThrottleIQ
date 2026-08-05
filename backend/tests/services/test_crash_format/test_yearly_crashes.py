from app.services.crash_format import format_yearly_crashes
from types import SimpleNamespace


def create_test_rows(
    year:int,
    count:int,
    percentage:float
):
    """Create mock row for testing """
    return SimpleNamespace(
        _year=year,
        motorcycle_fatalities=count,
        percentage=percentage
    )
    
def test_yearly_zero_rows():
    """Test if the formater formats zeros correctly. It should return an empty list. If we failed to pull years then there is no data """
    result= format_yearly_crashes([])
    #check length of result
    assert len(result) == 0
        
#Check if the key holds the proper datatype values
def test_yearly_datatypes():
    test_row=[
        create_test_rows(2025,10,5.5)
    ]
    
    result = format_yearly_crashes(test_row)
    
    assert isinstance(result[0]["count"],int)
    assert isinstance(result[0]["percentage"],float)
    assert isinstance(result[0]["year"],int)
    
def test_yearly_order():
    """Test wether the hours list is returned in order from earliest to latest indicies 0-2"""
    test_row=[
        create_test_rows(2025,10,5.5),
        create_test_rows(2023,12,5),
        create_test_rows(2024,2,1),
    ]
    
    result = format_yearly_crashes(test_row)
    
    assert result[0]['year'] == 2023
    assert result[1]['year'] == 2024
    assert result[2]['year'] == 2025
    
def test_yearly_format():
    """Test the row is returned in the right format (year,count,percentage)"""
    test_data=[
        create_test_rows(2024,10,2.2)
    ]
    
    result=format_yearly_crashes(test_data)
    
    assert result[0] == {
        "year":2024,
        "count":10,
        "percentage":2.2
    }