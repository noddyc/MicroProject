pipeline{
    
    agent any
    
    environment{
        dockerImage = ''
        registry = 'jh7939/monolithic:haproxy' 
        registryCredential = 'dockerhub_id'
    }
    
    stages{
        stage('Checkout'){
            steps{

                   checkout([$class: 'GitSCM', branches: [[name: '*/tools']], extensions: [[$class: 'SparseCheckoutPaths', sparseCheckoutPaths: [[path: '\'haproxy\'']]]], userRemoteConfigs: [[url: 'https://github.com/noddyc/MicroProject']]])
                
            }
        }
        stage('Build Docker image'){
            steps{
                script{
                    dockerImage = docker.build registry
                }
            }
        }
        
        stage("Uploading Image"){
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
