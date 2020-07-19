import pandas as pd
from datetime import date, timedelta, datetime

data = pd.read_json("Hospitalized.json")
# print(data.columns)

print(data["date_admitted"].value_counts().sort_index())

data['date_admitted'] = pd.to_datetime(data['date_admitted']).dt.strftime('%d/%m/%Y')
data['date_released'] = pd.to_datetime(data['date_released']).dt.strftime('%d/%m/%Y')

print(data["district"].value_counts().sort_index())
print(data["type_of_bed"].value_counts())
data.to_csv("Hospitalized.csv")