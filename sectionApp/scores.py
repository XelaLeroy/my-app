from flask import Flask, jsonify, Blueprint, render_template
import requests
from bs4 import BeautifulSoup
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


scores = Blueprint('scores',__name__,template_folder='templates')

@scores.route('/top14_score')
def score():
        response = requests.get("https://top14.lnr.fr/club/pau/calendrier-resultats")
        content = response.content
        content = BeautifulSoup(content, 'html.parser')
        scores = content.find_all('div', class_='match-calendar-line')

        matches = []

        for match_element in scores:
            team_home = match_element.select('.club-line--reversed .club-line__name')[0].get_text(strip=True)
            team_logo_home = match_element.select('.club-line--reversed .club-line__icon-img')[0]['src']
            logo_tv_img_element = match_element.select_one('.match-line__broadcaster-link img')
            logo_tv_img = logo_tv_img_element['src'] if logo_tv_img_element else None
            heure_tv_element = match_element.select_one('.match-line__time')
            heure_tv = heure_tv_element.text.strip() if heure_tv_element else None

        # Équipe à l'extérieur (deuxième occurrence)
            team_away = match_element.select('.club-line--table-format .club-line__name')[1].get_text(strip=True)
            team_logo_away = match_element.select('.club-line--table-format .club-line__icon-img')[1]['src']
          
            score_element = match_element.select('.match-line__score')
            score_text = score_element[0].get_text(strip=True) if score_element else None

            day= match_element.select('.day-calendar-line__day-number')[0].text
            date= match_element.select('.day-calendar-line__date')[0].text
 

            match_info = {
                'team_home': {
                    'name': team_home,
                    'logo': team_logo_home,
                },
                'team_away': {
                    'name': team_away,
                    'logo': team_logo_away,
                },
                'score': {
                    'text': score_text,
                },
                'time': {
                      'journée' : day,
                      'date':date,
                      'heure' : heure_tv,
                },
                 'tv' :{
                       'logo':logo_tv_img,
                 }
            }

            matches.append(match_info)

        return jsonify(matches)




if __name__ == '__main__':
     app.run(debug=True)