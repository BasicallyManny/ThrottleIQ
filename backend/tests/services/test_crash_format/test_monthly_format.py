from app.services.crash_format import format_monthly_stats
from types import SimpleNamespace

def create_test_row(
    month: int,
    count:int,
    percentage:float 
):
    """Create mock row for testing"""
    return SimpleNamespace (
        month_of_year=month,
        crash_count=count,
        percentage=percentage
    )
    
def test_monthly_zeros():
    """Test wether or not empty values would still return a list of dictionaries with keys 0-11"""
    result= format_monthly_stats([])
    #check if all 12 rows exists
    assert len(result) == 12
    #check if all items of each row are 0
    for month, item in enumerate(result):
        assert item =={
            "month": month,
            "count":0,
            "percentage":0.0
        }

def test_key_value_datatypes():
    """test all keys have the proper data types"""
    test_row=[
        create_test_row(10,6,1.1)
    ]
    
    result = format_monthly_stats(test_row)
    assert isinstance(result[10]["count"],int)
    assert isinstance(result[10]["month"],int)
    assert isinstance(result[10]["percentage"],float)
    
#test if each row has the correct associated month
def test_preserved_month():
    """test all keys have the proper data types"""
    test_row=[
        create_test_row(10,6,1.1),
        create_test_row(7,4,2),
        create_test_row(11,5,2.3)
    ]
    
    result = format_monthly_stats(test_row)
    #check count
    assert result[10]["count"] == 6
    assert result[7]["count"] == 4
    assert result[11]["count"] == 5
    #check percentage
    assert result[10]["percentage"] == 1.1
    assert result[7]["percentage"] == 2
    assert result[11]["percentage"] == 2.3
        
#test correct format
def test_monthly_format():
    """test correct format"""
    
    test_row=[
        create_test_row(10,4,5)
    ]
    
    result= format_monthly_stats(test_row)
    
    assert result[10] == {
        "month":10,
        "count":4,
        "percentage":5
    }
#test monthly order
def test_monthly_order():
    """Test the output is in order from 0-11"""
    test_rows=[
        create_test_row(10,5,2.5),
        create_test_row(3,6,3.5),
        create_test_row(11,3,1.5)
    ]
    
    result = format_monthly_stats(test_rows)
    
    months=[row["month"] for row in result]
    
    assert months == list(range(12))
