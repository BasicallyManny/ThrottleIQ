"""
Test file to test the crash_format service
"""

from types import SimpleNamespace
from app.services.crash_format import format_hourly_stats

def create_row(
    hour:int,
    count:int,
    percentage:float
):
    """
    Create a mock database row for testing
    """
    
    return SimpleNamespace (
        hour_of_day=hour,
        crash_count=count,
        percentage=percentage
    )
    
def test_empty_rows_return_24_zero_hours():
    """Test if the formater formats zeros correctly. It should return hours set to 0"""
    
    #assuming the database query returns nothing
    result= format_hourly_stats([])
    
    assert len(result) == 24
    
    for hour, item in enumerate(result):
        assert item == {
            "hour": hour,
            "count":0,
            "percentage":0
        }
        
def test_key_data_types():
    """Check if the key holds the proper datatype values"""
    
    test_data=[
        create_row(10,5,25),
    ]
    
    result= format_hourly_stats(test_data)
    
    assert isinstance(result[10]["percentage"],float)
    assert isinstance(result[10]["hour"],int)
    assert isinstance(result[10]["count"],int)


def test_correct_hourly_format():
    """Test if the formatter returns the correct output"""
    
    test_row=[
        create_row(
            hour=13,
            count=50,
            percentage=10.0
        )
    ]
    
    result = format_hourly_stats(test_row)
    
    assert result[13] =={
        "hour":13,
        "count":50,
        "percentage":10.0
    }
    

def test_perserved_hours():
    """Checking to see if each row is associated with the correct hour."""
    test_row=[
        create_row(0,10,1.5),
        create_row(6,5,0.5),
        create_row(12,10,2.0)
    ]
    
    result= format_hourly_stats(test_row)
    
    #check count
    assert result[0]["count"] == 10
    assert result[6]["count"] == 5
    assert result[12]["count"] == 10  
    #check percentage
    assert result[0]["percentage"] == 1.5
    assert result[6]["percentage"] == 0.5
    assert result[12]["percentage"] == 2.0
      

def test_hours_returned_in_order():
    """
    Test wether the hours list is returned in order from 0-23
    """
    
    test_row=[
        create_row(6,10,1.5),
        create_row(12,5,0.5),
        create_row(0,10,2.0)
    ]
    
    result = format_hourly_stats(test_row)
    
    hours = [
        row["hour"] for row in result
    ]
    
    #make sure all of the hours are in order
    assert hours == list(range(24))
        