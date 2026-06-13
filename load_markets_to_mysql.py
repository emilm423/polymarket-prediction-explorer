import pandas as pd
from sqlalchemy import create_engine

MYSQL_USER = "root"
MYSQL_PASSWORD = "administrador"
MYSQL_HOST = "localhost"
MYSQL_PORT = "3306"
MYSQL_DATABASE = "polymarket_db"

df = pd.read_parquet("markets.parquet")

engine = create_engine(
    f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DATABASE}"
)

df.to_sql(
    name="markets",
    con=engine,
    if_exists="replace",
    index=False,
    chunksize=5000
)

print("Done. Loaded rows:", len(df))