# Simple Flask App
###### - Versions
- Python 3.9.7
- Flask 2.0.2
- Werkzeug 2.0.3


#### Run App
```sh
pip install Flask
export FLASK_APP=main.py
flask run
```
If you want to make changes while running the application, run the application in development mode.
```sh
export FLASK_ENV=development
```
#### Use venv
```sh
apt install python3-venv
python3 -m venv venv
```
Activate venv
```sh
source venv/bin/activate
```
Deactivate venv
```sh
deactivate
```

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:5000
```

## License

MIT