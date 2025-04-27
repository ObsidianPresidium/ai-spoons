from webpush import VAPID
import os

os.makedirs(".env/webpush-keys", exist_ok=True)
private_key, public_key, application_server_key = VAPID.generate_keys()
with open(".env/webpush-keys/private_key.pem", "wb") as fd:
    fd.write(private_key)

with open(".env/webpush-keys/public_key.pem", "wb") as fd:
    fd.write(public_key)

with open(".env/webpush-keys/applicationServerKey", "w") as fd:
    fd.write(application_server_key)

print("keys saved in private_key.pem and public_key.pem")
print(f"{application_server_key=}")