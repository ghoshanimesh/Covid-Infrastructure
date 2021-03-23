from flask import Flask
from flask import Flask, request, make_response, jsonify
from flask_cors import CORS, cross_origin
import json
import sys 
import pandas as pd
from pandas import json_normalize
import requests
import matplotlib.pyplot as plt 
from datetime import date, timedelta, datetime
import numpy as np
from catboost import CatBoostRegressor
from sklearn.model_selection import train_test_split 
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix
from sklearn.metrics import r2_score
from sklearn.metrics import mean_squared_error

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/", methods=['POST', 'GET'])
def hello():
    return "Hello World!"

@app.route("/getPredictionValueForDistrictH/<name>", methods=['POST', 'GET'])
def evalH(name):
	res = dict() 
	res['Hospitalized'] = predictH("http://api-infra-covid-tracker.herokuapp.com/getCountOfHospitalizedByDistrict/"+name)
	
	return res

def predictH(URL):
	r = requests.get(url = URL)
	data = json_normalize(r.json()[0])
	data.columns = ["date","count"]

	# Find missing dates
	new_data = data["date"].unique()
	dates_list = [datetime.strptime(date, '%d/%m/%Y').date() for date in new_data]
	# print(min(dates_list), " ----------- ", max(dates_list))

	edate = max(dates_list)
	sdate = min(dates_list)

	delta = edate - sdate
	df_final_hosp_data = pd.DataFrame(columns=['date', 'count'])

	for i in range(delta.days + 1):
		day = sdate + timedelta(days=i)
		if (day.strftime("%d/%m/%Y") in new_data):
			newcountdata = data[data["date"] == day.strftime("%d/%m/%Y")]
			df_tobeadded = pd.DataFrame({"date": day.strftime("%d/%m/%Y"), "count":newcountdata.iloc[0]['count']}, index=[0])
			df_final_hosp_data = df_final_hosp_data.append(df_tobeadded, ignore_index = True)  
		else:
			df_tobeadded = pd.DataFrame({"date": day.strftime("%d/%m/%Y"), "count":0}, index=[0])
			df_final_hosp_data = df_final_hosp_data.append(df_tobeadded, ignore_index = True)

	# pd.set_option('display.max_rows', df_final_hosp_data.shape[0]+1)
	print(df_final_hosp_data)

	X = np.arange(df_final_hosp_data["date"].count()).reshape(-1, 1)
	y = df_final_hosp_data.loc[:,"count"]
	y=y.astype('int')
	X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=1)
	data_pred_tom = (df_final_hosp_data["date"].count() + 1).reshape(-1, 1)
	print(data_pred_tom[0])

	#Catboost
	cb_model = CatBoostRegressor(iterations=100,learning_rate=0.05,depth=10,random_seed = 42,bagging_temperature = 0.2,od_type='Iter',metric_period = 50,od_wait=20)
	cb_model.fit(X, y)
	print("Accuracy is : " ,r2_score(cb_model.predict(X), y)*100)
	return (round(cb_model.predict(data_pred_tom)[0]))

@app.route("/getPredictionValueForDistrictD/<name>", methods=['POST', 'GET'])
def evalD(name):
	res = dict() 
	res['Death'] = predictD("http://api-infra-covid-tracker.herokuapp.com/getCountOfDeathByDistrict/"+name)
	
	return res

def predictD(URL):
	r = requests.get(url = URL)
	data = json_normalize(r.json()[0])
	data.columns = ["date","count"]

	# Find missing dates
	new_data = data["date"].unique()
	dates_list = [datetime.strptime(date, '%d/%m/%Y').date() for date in new_data]
	# print(min(dates_list), " ----------- ", max(dates_list))

	edate = max(dates_list)
	sdate = min(dates_list)

	delta = edate - sdate
	df_final_hosp_data = pd.DataFrame(columns=['date', 'count'])

	for i in range(delta.days + 1):
		day = sdate + timedelta(days=i)
		if (day.strftime("%d/%m/%Y") in new_data):
			newcountdata = data[data["date"] == day.strftime("%d/%m/%Y")]
			df_tobeadded = pd.DataFrame({"date": day.strftime("%d/%m/%Y"), "count":newcountdata.iloc[0]['count']}, index=[0])
			df_final_hosp_data = df_final_hosp_data.append(df_tobeadded, ignore_index = True)  
		else:
			df_tobeadded = pd.DataFrame({"date": day.strftime("%d/%m/%Y"), "count":0}, index=[0])
			df_final_hosp_data = df_final_hosp_data.append(df_tobeadded, ignore_index = True)

	# pd.set_option('display.max_rows', df_final_hosp_data.shape[0]+1)
	print(df_final_hosp_data)

	X = np.arange(df_final_hosp_data["date"].count()).reshape(-1, 1)
	y = df_final_hosp_data.loc[:,"count"]
	y=y.astype('int')
	X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=1)
	data_pred_tom = (df_final_hosp_data["date"].count() + 1).reshape(-1, 1)
	print(data_pred_tom[0])

	#Catboost
	cb_model = CatBoostRegressor(iterations=100,learning_rate=0.05,depth=10,random_seed = 42,bagging_temperature = 0.2,od_type='Iter',metric_period = 50,od_wait=20)
	cb_model.fit(X, y)
	print("Accuracy is : " ,r2_score(cb_model.predict(X), y)*100)
	return (round(cb_model.predict(data_pred_tom)[0]))

@app.route("/getPredictionValueForDistrictR/<name>", methods=['POST', 'GET'])
def evalR(name):
	res = dict() 
	res['Recovered'] = predictR("http://api-infra-covid-tracker.herokuapp.com/getCountOfRecoveredByDistrict/"+name)
	
	return res

def predictR(URL):
	r = requests.get(url = URL)
	data = json_normalize(r.json()[0])
	data.columns = ["date","count"]

	# Find missing dates
	new_data = data["date"].unique()
	dates_list = [datetime.strptime(date, '%d/%m/%Y').date() for date in new_data]
	# print(min(dates_list), " ----------- ", max(dates_list))

	edate = max(dates_list)
	sdate = min(dates_list)

	delta = edate - sdate
	df_final_hosp_data = pd.DataFrame(columns=['date', 'count'])

	for i in range(delta.days + 1):
		day = sdate + timedelta(days=i)
		if (day.strftime("%d/%m/%Y") in new_data):
			newcountdata = data[data["date"] == day.strftime("%d/%m/%Y")]
			df_tobeadded = pd.DataFrame({"date": day.strftime("%d/%m/%Y"), "count":newcountdata.iloc[0]['count']}, index=[0])
			df_final_hosp_data = df_final_hosp_data.append(df_tobeadded, ignore_index = True)  
		else:
			df_tobeadded = pd.DataFrame({"date": day.strftime("%d/%m/%Y"), "count":0}, index=[0])
			df_final_hosp_data = df_final_hosp_data.append(df_tobeadded, ignore_index = True)

	# pd.set_option('display.max_rows', df_final_hosp_data.shape[0]+1)
	print(df_final_hosp_data)

	X = np.arange(df_final_hosp_data["date"].count()).reshape(-1, 1)
	y = df_final_hosp_data.loc[:,"count"]
	y=y.astype('int')
	X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=1)
	data_pred_tom = (df_final_hosp_data["date"].count() + 1).reshape(-1, 1)
	print(data_pred_tom[0])

	#Catboost
	cb_model = CatBoostRegressor(iterations=100,learning_rate=0.05,depth=10,random_seed = 42,bagging_temperature = 0.2,od_type='Iter',metric_period = 50,od_wait=20)
	cb_model.fit(X, y)
	print("Accuracy is : " ,r2_score(cb_model.predict(X), y)*100)
	return (round(cb_model.predict(data_pred_tom)[0]))


@app.route("/getPredictionValueForDistrict/<name>", methods=['POST', 'GET'])
@cross_origin()
def eval(name):
	res = dict() 
	res['Hospitalized'] = predicts("http://api-infra-covid-tracker.herokuapp.com/getCountOfHospitalizedByDistrict/"+name)
	res['Recovered'] = predicts("http://api-infra-covid-tracker.herokuapp.com/getCountOfRecoveredByDistrict/"+name)
	res['Death'] = predicts("http://api-infra-covid-tracker.herokuapp.com/getCountOfDeathByDistrict/"+name)
	return res

def predicts(URL):
	r = requests.get(url = URL)
	data = json_normalize(r.json()[0])
	data.columns = ["date","count"]

	# Find missing dates
	new_data = data["date"].unique()
	dates_list = [datetime.strptime(date, '%d/%m/%Y').date() for date in new_data]
	# print(min(dates_list), " ----------- ", max(dates_list))

	edate = max(dates_list)
	sdate = min(dates_list)

	delta = edate - sdate
	df_final_hosp_data = pd.DataFrame(columns=['date', 'count'])

	for i in range(delta.days + 1):
		day = sdate + timedelta(days=i)
		if (day.strftime("%d/%m/%Y") in new_data):
			newcountdata = data[data["date"] == day.strftime("%d/%m/%Y")]
			df_tobeadded = pd.DataFrame({"date": day.strftime("%d/%m/%Y"), "count":newcountdata.iloc[0]['count']}, index=[0])
			df_final_hosp_data = df_final_hosp_data.append(df_tobeadded, ignore_index = True)  
		else:
			df_tobeadded = pd.DataFrame({"date": day.strftime("%d/%m/%Y"), "count":0}, index=[0])
			df_final_hosp_data = df_final_hosp_data.append(df_tobeadded, ignore_index = True)

	# pd.set_option('display.max_rows', df_final_hosp_data.shape[0]+1)
	print(df_final_hosp_data)

	X = np.arange(df_final_hosp_data["date"].count()).reshape(-1, 1)
	y = df_final_hosp_data.loc[:,"count"]
	y=y.astype('int')
	X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=1)
	data_pred_tom = (df_final_hosp_data["date"].count() + 1).reshape(-1, 1)
	print(data_pred_tom[0])

	#Catboost
	cb_model = CatBoostRegressor(iterations=100,learning_rate=0.05,depth=10,random_seed = 42,bagging_temperature = 0.2,od_type='Iter',metric_period = 50,od_wait=20)
	cb_model.fit(X, y)
	print("Accuracy is : " ,r2_score(cb_model.predict(X), y)*100)
	return (round(cb_model.predict(data_pred_tom)[0]))

@app.route('/getPredictionValue/<id>') 
def evaluate(id):
	res = dict() 
	res['Hospitalized'] = predict("http://api-infra-covid-tracker.herokuapp.com/getCountOfHospitalized/"+id)
	res['Recovered'] = predict("http://api-infra-covid-tracker.herokuapp.com/getCountOfRecovered/"+id)
	res['Death'] = predict("http://api-infra-covid-tracker.herokuapp.com/getCountOfDeath/"+id)
	return res

def predict(URL):
	r = requests.get(url = URL)
	data = json_normalize(r.json()[0])
	data.columns = ["date","count"]

	# Find missing dates
	new_data = data["date"].unique()
	dates_list = [datetime.strptime(date, '%d/%m/%Y').date() for date in new_data]
	# print(min(dates_list), " ----------- ", max(dates_list))

	edate = max(dates_list)
	sdate = min(dates_list)

	delta = edate - sdate
	df_final_hosp_data = pd.DataFrame(columns=['date', 'count'])

	for i in range(delta.days + 1):
	  day = sdate + timedelta(days=i)
	  if (day.strftime("%d/%m/%Y") in new_data):
	    newcountdata = data[data["date"] == day.strftime("%d/%m/%Y")]
	    df_tobeadded = pd.DataFrame({"date": day.strftime("%d/%m/%Y"), "count":newcountdata.iloc[0]['count']}, index=[0])
	    df_final_hosp_data = df_final_hosp_data.append(df_tobeadded, ignore_index = True)  
	  else:
	    df_tobeadded = pd.DataFrame({"date": day.strftime("%d/%m/%Y"), "count":0}, index=[0])
	    df_final_hosp_data = df_final_hosp_data.append(df_tobeadded, ignore_index = True)

	# pd.set_option('display.max_rows', df_final_hosp_data.shape[0]+1)
	print(df_final_hosp_data)

	X = np.arange(df_final_hosp_data["date"].count()).reshape(-1, 1)
	y = df_final_hosp_data.loc[:,"count"]
	y=y.astype('int')
	X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=1)
	data_pred_tom = (df_final_hosp_data["date"].count() + 1).reshape(-1, 1)
	print(data_pred_tom[0])

	#Catboost
	cb_model = CatBoostRegressor(iterations=100,learning_rate=0.05,depth=10,random_seed = 42,bagging_temperature = 0.2,od_type='Iter',metric_period = 50,od_wait=20)
	cb_model.fit(X, y)
	print("Accuracy is : " ,r2_score(cb_model.predict(X), y)*100)
	return (round(cb_model.predict(data_pred_tom)[0]))

def listToString(s):  
    
    # initialize an empty string 
    str1 = ""  
    
    # traverse in the string   
    for ele in s:  
        str1 += ele   
    
    # return string   
    return str1  

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True) 