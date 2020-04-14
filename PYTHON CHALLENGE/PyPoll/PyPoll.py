import os
import csv

csvpath = os.path.join('Resources', 'election_data.csv')

with open(csvpath, newline='') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    next(csvreader)
    data = list(csvreader)

for row in data:
    VoterID = []
    County=[]
    Candidate=[]
    totalvotes = sum(1 for row in data)
    break
for row in data:
    VoterID.append(int(row[0]))
    County.append((row[1]))
    Candidate.append(row[2])
for i in Candidate:
    Khan=Candidate.count("Khan")
    Correy=Candidate.count("Correy")
    Li=Candidate.count("Li")
    OTooley=Candidate.count("O'Tooley")
    break
Khanpercent=((Khan/totalvotes)*100)
Correypercent=((Correy/totalvotes)*100)
Lipercent=((Li/totalvotes)*100)
OTooleypercent=((OTooley/totalvotes)*100)
roundedKhan=round(Khanpercent,4)
roundedCorrey=round(Correypercent,4)
roundedLi=round(Lipercent,4)
roundedOTool=round(OTooleypercent,4)
print ("Election Results")
print ("-------------------------")
print("Total Votes:"+ str(totalvotes))
print ("-------------------------")
print("Khan:"+" "+ str(roundedKhan)+"%"+" "+"("+str(Khan)+")")
print("Correy:"+" "+ str(roundedCorrey)+"%"+" "+"("+str(Correy)+")")
print("Li:"+" "+ str(roundedLi)+"%"+" "+"("+str(Li)+")")
print("O'Tooley:"+" "+ str(roundedOTool)+"%"+" "+"("+str(OTooley)+")")
print ("-------------------------")
print("Winner: Khan")
print ("-------------------------")