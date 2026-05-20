pipeline {
    agent any

    environment {
        IMAGE_NAME = 'microservice-api'
        CONTAINER_NAME = 'microservice'
        PORT = '8000'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from GitLab (this assumes Jenkins is triggered by a webhook and knows the repo URL)
                checkout scm
            }
        }

        stage('Install Dependencies & Test') {
            steps {
                // Using a dockerized python environment to run tests, or local python if configured on Jenkins
                sh '''
                    python3 -m venv venv
                    . venv/bin/activate
                    pip install -r requirements.txt
                    pytest test_main.py -v
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image ${IMAGE_NAME}:${env.BUILD_ID}"
                    sh "docker build -t ${IMAGE_NAME}:latest -t ${IMAGE_NAME}:${env.BUILD_ID} ."
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    echo "Deploying container ${CONTAINER_NAME}"
                    // Stop and remove existing container if it exists
                    sh """
                        docker stop ${CONTAINER_NAME} || true
                        docker rm ${CONTAINER_NAME} || true
                    """
                    // Run the new container
                    sh "docker run -d -p ${PORT}:8000 --name ${CONTAINER_NAME} ${IMAGE_NAME}:latest"
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Check the logs."
        }
    }
}
