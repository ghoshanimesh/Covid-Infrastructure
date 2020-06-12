# -*- coding: utf-8 -*-
"""Vesit Cases Parser.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1s9evqG2urAgA5LvEfAQ8Xh26w2yM3-kG

Main CSV
"""

#@title Default title text
import pandas as pd
import random 
from datetime import date 
from datetime import timedelta

#cloumn needed from dataset
df_final = pd.DataFrame(columns=['case_date', 'status', 'district'])
gender_list = ['M', 'F']

#not needed of loop
for x in range(5):
  #the data no we need to read
  df = pd.read_csv("raw_data" +str(x+1)+ ".csv")
  print("-----------raw_data" +str(x+1)+ ".csv---------------")
  #converting all to lower
  df.columns = df.columns.str.lower()
  #extracting data
  df = df[['date announced', 'detected district', 'detected state','current status', 'num cases']]
  # print(df.columns)
  # data cleaning where state is maharashtra and district is eith mumbai, thane or pune
  df = df.loc[df['detected state'] == 'Maharashtra']
  df = df.loc[(df['detected district'] == 'Mumbai') | (df['detected district'] == 'Thane') | (df['detected district'] == 'Pune')]
  df['num cases'] = df['num cases'].astype('int64')
  # print(df)
  for j,row in df.iterrows():
    # print(row['num cases'])
    for i in range(row['num cases']):
      case_date = row['date announced']
      x = date.today() - timedelta(days = 1)
      x = x.strftime("%d/%m/%Y")
      #if case if of yesteray then only add
      #if x == case_date:
      #z = input()
      #if z >= x:
      age = random.randrange(3, 75)
      gender = random.choice(gender_list)
      status = row['current status']
      district = row['detected district']
      df_tobeadded = pd.DataFrame({"case_date": case_date, "status":status, "district" : district,"age":age,"gender":gender}, index=[0])
      df_final = df_final.append(df_tobeadded, ignore_index = True)

#adding all the data to csv
df_final.to_csv('Final_Cases_With_Age_Gender.csv', index = False,mode='a', header= False)

"""Aditional CSVs"""

import pandas as pd
import random 
from datetime import date,datetime 
from datetime import timedelta
import time
import numpy as np 
timestr = time.strftime("%Y%m%d")

#cloumn needed from dataset
df_final = pd.DataFrame(columns=['case_date', 'status', 'district','age','gender'])
gender_list = ['M', 'F']
#z = input("Enter the last date encountered in dd/mm/yy\n")
z = "4/6/2020"
df = pd.read_csv("raw_data6.csv")
df.columns = df.columns.str.lower()
df = df[['date announced', 'detected district', 'detected state','current status', 'num cases']]
df = df.loc[df['detected state'] == 'Maharashtra']
df = df.loc[(df['detected district'] == 'Mumbai') | (df['detected district'] == 'Thane') | (df['detected district'] == 'Pune')]
df['num cases'] = df['num cases'].astype('int64')
li= []
for j,row in df.iterrows():
    for i in range(row['num cases']):
      case_date = row['date announced']
      cs_object = datetime.strptime(case_date, '%d/%m/%Y')
      z_object = datetime.strptime(z, '%d/%m/%Y')
      if z_object < cs_object:
        age = random.randrange(3, 75)
        gender = random.choice(gender_list)
        status = row['current status']
        district = row['detected district']
        df_tobeadded = pd.DataFrame({"case_date": case_date, "status":status, "district" : district,"age":age,"gender":gender}, index=[0])
        df_final = df_final.append(df_tobeadded, ignore_index = True)

print(df_final)

import random
h_df=pd.read_csv("https://raw.githubusercontent.com/ghoshanimesh/Cases-Predictor/master/hospital_mh.csv?token=AHH7UAOJG2YXWO4AUSSFAKK65R7B2")
dict = {}
for k,rows in h_df.iterrows():
  dict[rows['Hospital']] = pd.DataFrame(columns=['case_date', 'status', 'district','age','gender'])

#print(h_df.loc[78,'Hospital'])


for k,rows in df_final.iterrows():
  
  if rows['district'] == "Mumbai":
    #0-37 - mumbai
    n = random.randint(0,37)
  elif rows['district'] == "Pune":
    #38-53 - pune
    n = random.randint(38,53)
  else:
    #54-79 - thane
    n = random.randint(54,78)
  if (h_df.loc[n,'Hospital']) in dict:
    #print(type(dict.get(h_df.loc[n,'Hospital'])))
    df_tobeadded = pd.DataFrame({"case_date": rows["case_date"], "status":rows["status"], "district" : rows["district"],"age":rows["age"],"gender":rows["gender"]}, index=[0])
    z = dict.get(h_df.loc[n,'Hospital'])
    z = z.append(df_tobeadded, ignore_index = True)
    dict[h_df.loc[n,'Hospital']] = z

print(dict)

i = 0
for csvs in dict: 
  z = dict.get(csvs)
  name = csvs.replace('/','_')
  #z.to_csv(name+'.csv', index = False)
  z.to_csv('hospitalwisecsv/' + str(i++)+'.csv', index = False)