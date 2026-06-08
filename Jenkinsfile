pipeline {
    agent any

    stages {

        stage('Check Python') {
            steps {
                bat 'python --version'
                bat 'where python'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'python -m pip install -r requirements.txt'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'python -m pytest'
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