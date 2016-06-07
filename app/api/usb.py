import subprocess
import json
import re
import pyudev
def list_usb():

    usb_list=filter(None, re.split('\n',subprocess.check_output('lsusb')))


    temp_list=[]
    data={}
    for list in usb_list:
        temp_list.append(filter(None,re.split(':',list)))
    for sub in temp_list:



         data[sub[2]]=sub[1]

    finaldata= { "result": [{'VendorID': key, "ProductID": value} for key, value in data.items()]}
    print finaldata


    return (finaldata)

print list_usb()



