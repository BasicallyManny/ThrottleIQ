from app.services.crash_format import format_crash_factor

def create_test_row(
    factor:str,
    count:int,
    percentage:float
):
    """Create mock row for testing"""
    return (factor, count, percentage)

def test_crash_factor_zero_rows():
    """Test if the formatter formats empty input correctly. It should return an empty list."""
    result = format_crash_factor([])

    assert result == []

def test_crash_factor_datatypes():
    """Check if the key holds the proper datatype values"""
    test_row = [
        create_test_row("Driver Inattention", 10, 5.5)
    ]

    result = format_crash_factor(test_row)

    assert isinstance(result[0]["factor"], str)
    assert isinstance(result[0]["count"], int)
    assert isinstance(result[0]["percentage"], float)

def test_crash_factor_format():
    """Test the row is returned in the right format (factor,count,percentage)"""
    test_row = [
        create_test_row("Driver Inattention", 10, 5.5)
    ]

    result = format_crash_factor(test_row)

    assert result[0] == {
        "factor": "Driver Inattention",
        "count": 10,
        "percentage": 5.5
    }

def test_crash_factor_preserves_row_order():
    """Test that rows are returned in the same order they were given, unlike the other formatters"""
    test_row = [
        create_test_row("Driver Inattention", 10, 5.5),
        create_test_row("Failure to Yield", 5, 2.5),
        create_test_row("Following Too Closely", 3, 1.5),
    ]

    result = format_crash_factor(test_row)

    factors = [row["factor"] for row in result]

    assert factors == ["Driver Inattention", "Failure to Yield", "Following Too Closely"]