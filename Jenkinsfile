pipeline {
    agent any

    stages {

        stage('Check Python') {
            steps {
                bat '"C:\\Users\\jeeva\\OneDrive\\Documents\\Desktop\\microservice-project\\venv\\Scripts\\python.exe" --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '"C:\\Users\\jeeva\\OneDrive\\Documents\\Desktop\\microservice-project\\venv\\Scripts\\python.exe" -m pip install -r requirements.txt'
            }
        }

        stage('Run Tests') {
            steps {
                bat '"C:\\Users\\jeeva\\OneDrive\\Documents\\Desktop\\microservice-project\\venv\\Scripts\\python.exe" -m pytest'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker version'
                bat 'docker build -t microservice-app .'
            }
        }
    }
}