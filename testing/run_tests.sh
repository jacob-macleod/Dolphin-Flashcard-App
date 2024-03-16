python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt
pytest -k "not test_api" testing/