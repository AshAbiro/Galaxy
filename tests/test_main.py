from galaxy.main import greet


def test_greet() -> None:
    assert greet() == "Welcome to Galaxy."

