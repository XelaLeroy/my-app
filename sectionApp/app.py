from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup
import json
from flask_cors import CORS
from itertools import groupby
from scores import scores
from player_stats import stats
from team_stats import team_stats 
from classement import classement



app = Flask(__name__)
app.register_blueprint(scores)
app.register_blueprint(classement)
app.register_blueprint(stats)
app.register_blueprint(team_stats)
CORS(app)


@app.route('/top14_stats')
def index():
    response = requests.get("https://top14.lnr.fr/club/pau/statistiques")
    print(response.status_code)  # Ajout de cette ligne pour vérifier le code d'état de la requête
    content = response.content
    content = BeautifulSoup(content, 'html.parser')
    players = content.find_all('players-ranking')


    player_info_list = []
    
    for player in players:
        player_data = json.loads(player[':ranking'])

        for i in range(len(player_data)):
            player_name = player_data[i]['player']['name']
            player_image = player_data[i]['player']['image']['original']
            player_position = player_data[i]['position']

           # Ajoutez les informations du joueur à la liste
            player_info_list.append({"name": player_name, "image": player_image, "position": player_position})

    # Utilisez jsonify pour renvoyer la liste complète des informations des joueurs
    return jsonify(player_info_list)



if __name__ == '__main__':
    app.run(debug=True)