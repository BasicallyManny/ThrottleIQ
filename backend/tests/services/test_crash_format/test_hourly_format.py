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
        crash_percentage=percentage
    )
    
def test_empty_rows_reutrn_24_zero_hours():
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
    


