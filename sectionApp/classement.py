from flask import Flask, jsonify, Blueprint
import requests
from bs4 import BeautifulSoup
import json
from selenium import webdriver 
from selenium.webdriver.chrome.options import Options
from flask_cors import CORS
from itertools import groupby



app = Flask(__name__)
CORS(app)


classement = Blueprint('classement',__name__,template_folder='templates')


@classement.route('/top14_classement')
def index():
    chrome_driver_path = "C:/Users/leroy/Desktop/SectionPaloise/my-app/sectionApp/chromedriver-win64/chromedriver.exe"
    driver = webdriver.Chrome(executable_path=chrome_driver_path)
    driver.get("https://top14.lnr.fr/classement") 
    content = driver.page_source
    soup = BeautifulSoup(content, 'html.parser')
    classement = soup.find_all('div', class_='table-line--ranking-fixed')
    classement2= soup.find_all('div', class_='table-line--ranking-scrollable')


    teams = []
    
    for positions, numbers in zip(classement, classement2):
        rank = positions.select('.ranking-item__rank')[0].get_text(strip=True)
        team_logo = positions.select('.table-line__cell--imaged .table-line__cell-image')[0]['src']
        team_name = numbers.select('.table-line__cell-wrapper--club-name .base-link')[0].get_text(strip=True)
        points= numbers.select('.table-line__cell--small')[0].get_text(strip=True)
        gamesPlayed= numbers.select('.table-line__cell-wrapper--small')[1].get_text(strip=True)
        victories= numbers.select('.table-line__cell-wrapper--small')[2].get_text(strip=True)
        equality= numbers.select('.table-line__cell-wrapper--small')[3].get_text(strip=True)
        defeats= numbers.select('.table-line__cell-wrapper--small')[4].get_text(strip=True)
        bonus = numbers.select('.table-line__cell-wrapper--small')[5].get_text(strip=True)
        PtsScored= numbers.select('.table-line__cell-wrapper--small')[6].get_text(strip=True)
        PtsTaken= numbers.select('.table-line__cell-wrapper--small')[7].get_text(strip=True)
        diff= numbers.select('.table-line__cell-wrapper--small')[8].get_text(strip=True)        
        streak = numbers.select('.matches-history')[0].get_text(strip=True)

        team = {
            'team_infos': {
                "rank" : rank,
                "logo": team_logo,
                "name": team_name,
            },
            'team_stats' : {
                "Pts" : points,
                'victoires' : victories,
                'defaites' : defeats,
                'nuls' : equality,
                'matchsJoues' : gamesPlayed,
                "PtsMarques" : PtsScored,
                "PtsEncaisses" : PtsTaken,
                "Difference" : diff,
                'forme' : streak,
                'bonus' : bonus,

            },
        }
        teams.append(team)

    driver.quit()


    return jsonify(teams)



if __name__ == '__main__':
    app.run(debug=True)