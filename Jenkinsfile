pipeline{
    
    agent any
    
    environment{
        dockerImage = ''
        registry = 'jh7939/test' 
        registryCredential = 'dockerhub_id'
    }
    
    stages{
        stage('Checkout'){
            steps{
               checkout([$class: 'GitSCM', branches: [[name: '*/test']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/noddyc/MicroProject']]])
      
            }
        }
        stage('Build Docker image'){
            when {
                changeset "haproxy"
            }
            steps{
                script{
//                     sh 'cd haproxy'
//                     sh 'cd haproxy'
//                     sh 'ls'
                    dir('./haproxy'){
                        dockerImage = docker.build registry
                     }
//                        sh 'docker build -t jh7939/monolithic:haproxy ./haproxy'
//                     dockerImage = docker.build registry
                }
            }
        }
        
        stage("Uploading Image"){
            when {
                changeset "haproxy"
            }
            steps{
                script{
                        docker.withRegistry('', registryCredential){
                            dockerImage.push()
                    }
                }
            }
        }
    }
}
