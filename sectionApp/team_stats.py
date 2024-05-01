from flask import Flask, jsonify, Blueprint
import requests
from bs4 import BeautifulSoup
import json
from flask_cors import CORS
from selenium import webdriver 
from selenium.webdriver.chrome.options import Options
from itertools import groupby

app= Flask(__name__)
CORS(app)

team_stats = Blueprint('team_stats',__name__,template_folder='templates')

@team_stats.route('/team_stats')
def stats():
    chrome_driver_path = "C:/Users/leroy/Desktop/SectionPaloise/my-app/sectionApp/chromedriver-win64/chromedriver.exe"
    driver = webdriver.Chrome(executable_path=chrome_driver_path)
    driver.get("https://top14.lnr.fr/club/pau/statistiques") 
    content = driver.page_source
    content = BeautifulSoup(content,'html.parser')

    classement = content.find('div', {"class":"club-record-card__ranking"}).get_text(strip=True)
    ptsScored = content.find('div', {"class":"stat-badge__count"}).get_text(strip=True)
    ptsTaken = content.find_all('div', {"class":"stat-badge__count"})[1].get_text(strip=True)
    nbBonus = content.find_all('div', {"class":"stat-badge__count"})[2].get_text(strip=True)
    namePoints = content.find_all('a', {"class":"player-stats-card-line__name"})[0].get_text(strip=True)
    nbPoints = content.find_all('div', {"class":"player-stats-card-line__stat-number"})[0].get_text(strip=True)
    nameTries = content.find_all('a', {"class":"player-stats-card-line__name"})[3].get_text(strip=True)
    nbTries = content.find_all('div', {"class":"player-stats-card-line__stat-number"})[3].get_text(strip=True)
    nameBallons = content.find_all('a', {"class":"player-stats-card-line__name"})[6].get_text(strip=True)
    nbBallons = content.find_all('div', {"class":"player-stats-card-line__stat-number"})[6].get_text(strip=True)
    attackTries = content.find_all('p', {"class":"club-stats-card__stat-line"})[0].get_text(strip=True)
    attackPenalty = content.find_all('p', {"class":"club-stats-card__stat-line"})[1].get_text(strip=True)
    defenseTries = content.find_all('p', {"class":"club-stats-card__stat-line"})[2].get_text(strip=True)
    defensePenalty = content.find_all('p', {"class":"club-stats-card__stat-line"})[3].get_text(strip=True)
    bonusOffensif = content.find_all('p', {"class":"club-stats-card__stat-line"})[4].get_text(strip=True)
    bonusDefensif = content.find_all('p', {"class":"club-stats-card__stat-line"})[5].get_text(strip=True)



    team_infos = {
        'global': {
            'attaque' : {
                'points' : ptsScored,
                'essais' : attackTries,
                'penalites' : attackPenalty,
            },
            'defense' : {
                'points' : ptsTaken,
                'essais' : defenseTries,
                'penalites' : defensePenalty,
            },
            'bonus' : {
                'nombre' : nbBonus,
                'defensif' : bonusDefensif,
                'offensif' : bonusOffensif,
            },
            'rank' : classement,
        },
        'players' : {
            'realisateur' : {
                'nom' : namePoints,
                'points' : nbPoints
            },
            'marqueur' : {
                'nom' : nameTries,
                'essais' : nbTries

            },
            'gratteur' : {
                'nom' : nameBallons,
                'grattages' : nbBallons

            }

        }


    }





    return jsonify(team_infos)

if __name__ == '__main__':
    app.run(debug=True)