# Currency Converter App

Une application de conversion de devises simple et réactive, construite avec **React** et **Next.js**.

## Fonctionnalités

- Conversion de montants entre plusieurs devises populaires.
- Affichage des résultats en temps réel.
- Gestion intuitive des erreurs (par exemple, API manquante ou problèmes de connexion).
- Interface utilisateur élégante et facile à utiliser.

## Technologies utilisées

- **React** avec les hooks (`useState`) pour la gestion de l'état.
- **Next.js** pour la structure et le déploiement.
- **API Exchangerate-API** pour récupérer les taux de change en direct.

## Installation et configuration

1. Clonez le projet :
    ```bash
    git clone https://github.com/votre-nom-utilisateur/currency-converter-app.git
    cd currency-converter-app
    ```

2. Installez les dépendances :
    ```bash
    npm install
    ```

3. Configurez votre clé API pour les taux de change :

    - Créez un fichier .env.local à la racine du projet.
    - Ajoutez-y votre clé API Exchangerate-API :

    ```makefile
    NEXT_PUBLIC_API_KEY=Votre_Clé_API
    ```

4. Lancez le serveur de développement :
    ```bash
    npm run dev
    ```
    Accédez à l'application dans votre navigateur à l'adresse `http://localhost:3000`

## Demo