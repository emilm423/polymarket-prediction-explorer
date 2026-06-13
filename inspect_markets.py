import pandas as pd

df = pd.read_parquet("markets.parquet")

print(df.columns.tolist())
print(df.head())
print("Total rows:", len(df))