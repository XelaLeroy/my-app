from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup
import json
from flask_cors import CORS
from itertools import groupby
from scores import scores



app = Flask(__name__)
app.register_blueprint(scores)
CORS(app)


@app.route('/top14_stats')
def index():
    response = requests.get("https://top14.lnr.fr/club/pau/statistiques")
    print(response.status_code)  # Ajout de cette ligne pour vérifier le code d'état de la requête
    content = response.content
    content = BeautifulSoup(content, 'html.parser')
    players = content.find_all('players-ranking')
    print(players)


    player_info_list = []
    
    for player in players:
        player_data = json.loads(player[':ranking'])

        for i in range(len(player_data)):
            player_name = player_data[i]['player']['name']
            player_image = player_data[i]['player']['image']['original']
           # Ajoutez les informations du joueur à la liste
            player_info_list.append({"name": player_name, "image": player_image})

    # Utilisez jsonify pour renvoyer la liste complète des informations des joueurs
    return jsonify(player_info_list)



if __name__ == '__main__':
    app.run(debug=True)