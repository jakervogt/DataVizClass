import os
import csv

csvpath = os.path.join('Resources', 'budget_data.csv')

with open(csvpath, newline='') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    next(csvreader)
    data = list(csvreader)

for row in data:
    date = []
    profit=[]
    length = sum(1 for row in data)
    total = sum(int(row[1]) for row in data)
    break

for row in data:
    date.append(row[0])
    profit.append(int(row[1]))

for i in profit:
    change = [profit[i + 1] - profit[i] for i in range(len(profit)-1)] 
    great = (max(change))
    least =(min(change))
    average=((sum(change))/(len(change)))
    roundaverage=(round(average,2))
    break

changes=dict(zip(date, change))

for key, value in changes.items():
    if 1926159 == value:
        maxmonth=key

for key, value in changes.items(): 
    if -2196167==value:
        minmonth=key

        print("Financial Analysis")
        print("----------------------------")
        print("Total Months:"+" " +str(length))
        print("Total:"+" " +"$"+str(total))
        print("Average Change:"+ str(roundaverage))
        print("Greatest Increase in Profits:"+" "+ maxmonth + " " + "($"+ str(great)+")")
        print("Greatest Decrease in Profits:"+" "+ minmonth + " " +"($"+ str(least)+")")