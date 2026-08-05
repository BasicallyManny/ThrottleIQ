from app.services.crash_format import format_total_accident_per_borough
from types import SimpleNamespace

BOROUGH_ORDER = [
    "BRONX",
    "BROOKLYN",
    "MANHATTAN",
    "QUEENS",
    "STATEN ISLAND"
]

#create mock rows function
def create_test_row(
    borough:str,
    count:int,
    percentage:float
):
    """Create mock row for testing"""

    return SimpleNamespace(
        borough=borough,
        total_moto_accidents=count,
        percentage=percentage
    )

def test_borough_zero_rows():
    """Test if the formatter formats empty input correctly. It should return an empty list."""
    result = format_total_accident_per_borough([])

    assert result == []

def test_borough_datatypes():
    """Check if the key holds the proper datatype values"""
    test_row = [
        create_test_row("BRONX", 10, 5.5)
    ]

    result = format_total_accident_per_borough(test_row)

    assert isinstance(result[0]["borough"], str)
    assert isinstance(result[0]["count"], int)
    assert isinstance(result[0]["percentage"], float)

def test_borough_format():
    """Test the row is returned in the right format (borough,count,percentage)"""
    test_row = [
        create_test_row("BRONX", 10, 5.5)
    ]

    result = format_total_accident_per_borough(test_row)

    assert result[0] == {
        "borough": "BRONX",
        "count": 10,
        "percentage": 5.5
    }

def test_borough_order():
    """Test whether all 5 boroughs are always returned in a fixed order regardless of input order"""
    test_row = [
        create_test_row("QUEENS", 5, 1.0),
        create_test_row("BRONX", 10, 2.0),
        create_test_row("STATEN ISLAND", 1, 0.5),
        create_test_row("MANHATTAN", 20, 4.0),
        create_test_row("BROOKLYN", 15, 3.0),
    ]

    result = format_total_accident_per_borough(test_row)

    boroughs = [row["borough"] for row in result]

    assert boroughs == BOROUGH_ORDER

def test_borough_missing_defaults_to_zero():
    """Boroughs with no matching row should still appear with count 0 and percentage 0.0"""
    test_row = [
        create_test_row("BRONX", 10, 5.5)
    ]

    result = format_total_accident_per_borough(test_row)

    missing = {row["borough"]: row for row in result if row["borough"] != "BRONX"}

    assert len(missing) == 4
    for data in missing.values():
        assert data["count"] == 0
        assert data["percentage"] == 0.0

def test_borough_preserved_counts():
    """Test if each row is associated with the correct borough"""
    test_row = [
        create_test_row("BRONX", 10, 1.5),
        create_test_row("QUEENS", 5, 0.5),
        create_test_row("MANHATTAN", 20, 2.0),
    ]

    result = format_total_accident_per_borough(test_row)
    by_borough = {row["borough"]: row for row in result}

    assert by_borough["BRONX"]["count"] == 10
    assert by_borough["QUEENS"]["count"] == 5
    assert by_borough["MANHATTAN"]["count"] == 20
    assert by_borough["BRONX"]["percentage"] == 1.5
    assert by_borough["QUEENS"]["percentage"] == 0.5
    assert by_borough["MANHATTAN"]["percentage"] == 2.0

def test_borough_unexpected_value_excluded():
    """Unknown/unexpected borough values should be excluded from the results instead of raising"""
    test_row = [
        create_test_row("BRONX", 10, 5.5),
        create_test_row("OUTER SPACE", 3, 1.0),
    ]

    result = format_total_accident_per_borough(test_row)
    boroughs = [row["borough"] for row in result]

    assert boroughs == BOROUGH_ORDER
    assert "OUTER SPACE" not in boroughs