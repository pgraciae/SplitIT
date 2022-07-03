import requests
import os
import argparse
from bs4 import BeautifulSoup
import urllib.request


def get_data(item):
    url = "https://www.allrecipes.com/search/results/?search=" + item
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    job_elements = soup.find_all("div", class_="card__detailsContainer-left")
    ingredients=list()
    for el in job_elements:
        for k in el.find_all("a", href=True):
            url_new = k['href']
            response = requests.get(url_new)
            soup = BeautifulSoup(response.content, "html.parser")
            list_items = soup.find_all("span", class_="ingredients-item-name elementFont__body")
            for l in list_items:
                ingredients.append(l.text)

            # list_items = soup.find_all("ul", class_="ingredients-section")

            # for l in list_items:
            #     print(l.find("input")['data-ingredient'])
            #     ingredients.append(l.find("input")['data-ingredient'])
                 
            break
        break
    return(str(ingredients))
                    
