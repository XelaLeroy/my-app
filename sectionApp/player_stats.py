from flask import Flask, jsonify, Blueprint, render_template
import requests
from bs4 import BeautifulSoup
import json
from selenium import webdriver 
from selenium.webdriver.chrome.options import Options
from flask_cors import CORS
from itertools import groupby



app = Flask(__name__)
CORS(app)

stats = Blueprint('stats',__name__,template_folder='templates')



@stats.route('/top14_player_stats')
def fetch_player_details(link):
    response = requests.get(link)
    content = response.content
    content = BeautifulSoup(content, 'html.parser')
        
      # Trouver toutes les divs avec la classe 'player-infos__row'
    infos_row = content.find_all('div', class_='player-infos__row')[1]


    height = infos_row.find_all('span', class_='player-infos__attribute')[0].get_text(strip=True)
    weight = infos_row.find_all('span', class_='player-infos__attribute')[1].get_text(strip=True)
    age = infos_row.find_all('span', class_='player-infos__attribute')[2].get_text(strip=True)

    print(infos_row)
    
    return {
        'age': age,
        'height': height,
        'weight': weight
    }


def fetch_player_stats():
    chrome_driver_path = "C:/Users/leroy/Desktop/SectionPaloise/my-app/sectionApp/chromedriver-win64/chromedriver.exe"
    driver = webdriver.Chrome(executable_path=chrome_driver_path)
    driver.get("https://top14.lnr.fr/club/pau/statistiques") 
    content = driver.page_source
    soup = BeautifulSoup(content, 'html.parser')
    players = soup.find_all('div', class_='player-cell')
    numbers = soup.find_all('div', class_='player-row--11')
    numbers_all =numbers[1:]
    
  


    player_stats = []
    
    for player,number in zip(players,numbers_all):      
        player_name = player.select('.player-cell__name')[0].get_text(strip=True)
        link = player.select('.player-cell__name')[0]['href']
        player_image = player.select('.player-cell__image')[0]['src']
        player_tries = number.select('.player-row__cell--nbEssais')[0].get_text(strip=True)
        player_position = number.select('.player-row__cell--position')[0].get_text(strip=True)
        player_games = number.select('.player-row__cell--nbMatchs')[0].get_text(strip=True)
        player_minutes = number.select('.player-row__cell--minutesPlayed')[0].get_text(strip=True)
        player_points = number.select('.player-row__cell--nbPoints')[0].get_text(strip=True)
        player_tackles = number.select('.player-row__cell--totalSuccessfulTackles')[0].get_text(strip=True)
        player_yellowCard = number.select('.player-row__cell--nbCartonsJaunes')[0].get_text(strip=True)
        player_redCard = number.select('.player-row__cell--nbCartonsRouges')[0].get_text(strip=True)
        player_steals = number.select('.player-row__cell--breakdownSteals')[0].get_text(strip=True)
        player_offload = number.select('.player-row__cell--offload')[0].get_text(strip=True)
        player_lineBreak = number.select('.player-row__cell--lineBreak')[0].get_text(strip=True)
        details = fetch_player_details(link)


        player_info = {
                "name" : player_name,
                "photo" : player_image,
                "essais": player_tries,
                "points": player_points,
                "grattages" : player_steals,
                "position" : player_position,
                "games": player_games,
                "minutes" : player_minutes,
                "redCard" : player_redCard,
                "yellowCard": player_yellowCard,
                "offload": player_offload,
                "franchissements": player_lineBreak,
                "plaquages": player_tackles,
                "age": details['age'],
                "height": details['height'],
                "weight": details['weight']
            }
                
        player_stats.append(player_info)
    
    driver.quit()


    # # Utilisez jsonify pour renvoyer la liste complète des informations des joueurs
    return player_stats


@stats.route('/top14_player_stats/<string:nom>', methods=['GET'])
def get_joueur(nom):
    player_stats = fetch_player_stats()
    nom_recherche = nom.lower().replace(" ", "")

    joueur = next((joueur for joueur in player_stats if joueur["name"].lower().replace(" ", "") == nom_recherche), None)
    
    if joueur:
        return jsonify(joueur)
    else:
        return jsonify({"message": "Joueur non trouvé"}), 404




if __name__ == '__main__':
    app.run(debug=True)