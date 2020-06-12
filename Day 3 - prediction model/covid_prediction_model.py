# -*- coding: utf-8 -*-
"""Covid Prediction Model.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1Y54Xet9oaaidmS1Cxd6b9Tx5GC-RmkuH
"""

import json 
import pandas as pd

f = open('data.json') 
data = json.load(f)
f.close() 

# print(data["hospitalized"])
df_hospitalized = pd.DataFrame(columns=['date', 'count'])
df_recovered = pd.DataFrame(columns=['date', 'count'])
df_deceased = pd.DataFrame(columns=['date', 'count'])

for row in data["hospitalized"]:
  df_tobeadded = pd.DataFrame({"date": row["date"], "count":row["count"]}, index=[0])
  df_hospitalized = df_hospitalized.append(df_tobeadded, ignore_index = True)

for row in data["recovered"]:
  df_tobeadded = pd.DataFrame({"date": row["date"], "count":row["count"]}, index=[0])
  df_recovered = df_recovered.append(df_tobeadded, ignore_index = True)

for row in data["deceased"]:
  df_tobeadded = pd.DataFrame({"date": row["date"], "count":row["count"]}, index=[0])
  df_deceased = df_deceased.append(df_tobeadded, ignore_index = True)

new_data = df_hospitalized["date"].unique()
print(df_hospitalized)

import matplotlib.pyplot as plt 

df_hospitalized.plot(x='date', y='count', style='o')  
plt.show()

# Find missing dates
from datetime import date, timedelta, datetime

edate = datetime.strptime(new_data[len(new_data) -1], '%d-%m-%Y').date()
sdate = datetime.strptime(new_data[0], '%d-%m-%Y').date()

delta = edate - sdate
df_final_hosp_data = pd.DataFrame(columns=['date', 'count'])


for i in range(delta.days + 1):
  day = sdate + timedelta(days=i)
  if (day.strftime("%d-%m-%Y") in new_data):
    newcountdata = df_hospitalized[df_hospitalized["date"] == day.strftime("%d-%m-%Y")]
    df_tobeadded = pd.DataFrame({"date": day.strftime("%d/%m/%Y"), "count":newcountdata.iloc[0]['count']}, index=[0])
    df_final_hosp_data = df_final_hosp_data.append(df_tobeadded, ignore_index = True)  
  else:
    df_tobeadded = pd.DataFrame({"date": day.strftime("%d/%m/%Y"), "count":0}, index=[0])
    df_final_hosp_data = df_final_hosp_data.append(df_tobeadded, ignore_index = True)

print(df_final_hosp_data)

# https://www.kaggle.com/vanshjatana/applied-machine-learning
!pip install -q catboost

import numpy as np
from sklearn import linear_model
from sklearn.neighbors import KNeighborsRegressor
from catboost import CatBoostRegressor
from sklearn.model_selection import train_test_split 
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix
from sklearn.metrics import r2_score

X = np.arange(df_final_hosp_data["date"].count()).reshape(-1, 1)
y = df_final_hosp_data.loc[:,"count"]
y=y.astype('int')
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=1)

#Linear Regression
model_lr = linear_model.LinearRegression() 
model_lr.fit(X_train, y_train) 
print("Linear Regression Score ",model_lr.score(X_test, y_test)*100)
y_pred = model_lr.predict((df_final_hosp_data["date"].count() + 1).reshape(-1, 1))
print(round(y_pred[0]))
print(r2_score(model_lr.predict(X), y)*100)

#KN Regressor
model = KNeighborsRegressor(n_neighbors=12)
model.fit(X_train, y_train)
data = (df_final_hosp_data["date"].count() + 1).reshape(-1, 1)
print(model.predict(data))
y_pred = model.predict(X_test)
accuracy = model.score(X_test, y_test)
print(accuracy*100)

#Catboost
cb_model = CatBoostRegressor(iterations=500,learning_rate=0.05,depth=10,random_seed = 42,bagging_temperature = 0.2,od_type='Iter',metric_period = 50,od_wait=20)
cb_model.fit(X, y)
print(r2_score(cb_model.predict(X), y)*100)
print(round(cb_model.predict(data_pred_tom)[0]))