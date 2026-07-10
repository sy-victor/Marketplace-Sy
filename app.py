from flask import Flask, jsonify, send_from_directory, request
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import os

app = Flask(__name__, static_folder='.', static_url_path='')

# ... (suas rotas antigas ficam aqui) ...

# ==========================================
# Rota de Login com Google
# ==========================================
CLIENT_ID = "704235450097-hoar8uomae9ciq2vp71kln7er12dl085.apps.googleusercontent.com"

@app.route('/api/v1/auth/login/google', methods=['POST'])
def login_google():
    # Pega o token que o HTML enviou
    dados = request.get_json()
    token = dados.get('token')

    try:
        # Pede pro Google verificar se o token é verdadeiro
        idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), CLIENT_ID)

        # Extrai o email do usuário
        email = idinfo['email']

        # A MÁGICA ACONTECE AQUI: A restrição de domínio
        if not email.endswith('@sympla.com.br'):
            return jsonify({"erro": "Acesso negado. Use seu email corporativo da Sympla."}), 403

        # Se passou, o login foi sucesso!
        # Aqui no futuro você buscaria o usuário no banco de dados.
        return jsonify({
            "mensagem": "Login aprovado!",
            "usuario": {
                "nome": idinfo['name'],
                "email": email,
                "avatar_url": idinfo['picture']
            }
        }), 200

    except ValueError:
        return jsonify({"erro": "Token do Google inválido"}), 401
    
    